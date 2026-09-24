import type * as ThreeNS from "three";
import { gsap } from "../gsap-setup";
import { buildScene, MODE_INDEX, type ParticleMode, type SceneData } from "./scenes";
import { vertexShader, fragmentShader } from "./shaders";

type Three = typeof ThreeNS;

const FOV = 30;
const CAM_DIST = 1 / Math.tan(((FOV / 2) * Math.PI) / 180);
const INTRO_SECONDS = 1.8;
// Frozen scene time under reduced motion, picked so each scene shows its end state
// (chat reply fully formed, action chain completed) rather than a mid-flight frame.
const REDUCED_TIME: Record<ParticleMode, number> = {
  voice: 4,
  chat: 6.2,
  knowledge: 4,
  memory: 4,
  actions: 5.3,
  intelligence: 4,
};

// Each scene's three-stop colour ramp from the muted signal hues. Where the ramp
// is sampled is scene-specific (x position, ring, lane, chain step).
const PALETTES: Record<ParticleMode, [string, string, string]> = {
  voice: ["--accent", "--accent", "--iris"],
  chat: ["--iris", "--rose", "--rose"],
  knowledge: ["--amber", "--amber", "--rose"],
  memory: ["--accent", "--iris", "--iris"],
  actions: ["--accent", "--iris", "--teal"],
  intelligence: ["--accent", "--iris", "--amber"],
};

const FALLBACK: Record<string, string> = {
  "--accent": "#2f69f1",
  "--iris": "#7470e8",
  "--teal": "#1fa596",
  "--amber": "#d99440",
  "--rose": "#d8607e",
};

// Raw sRGB triplets: the ShaderMaterial writes gl_FragColor straight to the
// canvas, so these must bypass three's linear colour management.
function srgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function cssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return /^#[0-9a-f]{6}$/i.test(v) ? v : fallback;
}

export type ViewInit = {
  el: HTMLElement;
  hoverEl: HTMLElement;
  mode: ParticleMode;
  reducedMotion: boolean;
};

type GL = {
  scene: ThreeNS.Scene;
  camera: ThreeNS.PerspectiveCamera;
  points: ThreeNS.Points;
  material: ThreeNS.ShaderMaterial;
};

export type ParticleViewHandle = ViewInit & {
  visible: boolean;
  started: boolean;
  time: number;
  progress: number;
  hover: number;
  hoverTarget: number;
  mouse: { x: number; y: number };
  mouseTarget: { x: number; y: number };
  mouseActive: number;
  mouseActiveTarget: number;
  aspect: number;
  gl: GL | null;
  detach: () => void;
};

class ParticleStage {
  private views = new Set<ParticleViewHandle>();
  private three: Three | null = null;
  private renderer: ThreeNS.WebGLRenderer | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private loading: Promise<void> | null = null;
  private failed = false;
  private running = false;
  private io: IntersectionObserver | null = null;
  private canHover = true;
  private width = 0;
  private height = 0;

  add(init: ViewInit): ParticleViewHandle {
    const view: ParticleViewHandle = {
      ...init,
      visible: false,
      started: false,
      time: init.reducedMotion ? REDUCED_TIME[init.mode] : 0,
      progress: init.reducedMotion ? 1 : 0,
      hover: 0,
      hoverTarget: 0,
      mouse: { x: 0, y: 0 },
      mouseTarget: { x: 0, y: 0 },
      mouseActive: 0,
      mouseActiveTarget: 0,
      aspect: 0,
      gl: null,
      detach: () => {},
    };

    this.canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    view.detach = this.bindPointer(view);
    this.views.add(view);
    this.observer().observe(init.el);

    if (this.three) this.createGL(view);
    else void this.load();
    return view;
  }

  remove(view: ParticleViewHandle) {
    view.detach();
    this.io?.unobserve(view.el);
    if (view.gl) {
      view.gl.points.geometry.dispose();
      view.gl.material.dispose();
    }
    this.views.delete(view);
    this.syncLoop();
  }

  private observer() {
    if (!this.io) {
      this.io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            for (const view of this.views) {
              if (view.el !== entry.target) continue;
              view.visible = entry.isIntersecting;
              if (entry.intersectionRatio > 0.25 || entry.intersectionRect.height > 120) {
                view.started = true;
              }
            }
          }
          this.syncLoop();
        },
        { rootMargin: "80px 0px", threshold: [0, 0.25, 0.5] }
      );
    }
    return this.io;
  }

  private bindPointer(view: ParticleViewHandle) {
    const { hoverEl } = view;
    const enter = () => {
      view.hoverTarget = 1;
    };
    const leave = () => {
      view.hoverTarget = 0;
      view.mouseActiveTarget = 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = view.el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      view.mouseTarget.x = nx * (r.width / r.height);
      view.mouseTarget.y = -ny;
      view.mouseActiveTarget = 1;
    };
    hoverEl.addEventListener("pointerenter", enter);
    hoverEl.addEventListener("pointerleave", leave);
    hoverEl.addEventListener("pointermove", move);
    return () => {
      hoverEl.removeEventListener("pointerenter", enter);
      hoverEl.removeEventListener("pointerleave", leave);
      hoverEl.removeEventListener("pointermove", move);
    };
  }

  private load() {
    if (this.loading || this.failed) return this.loading;
    this.loading = import("three")
      .then((three) => {
        this.three = three;
        const canvas = document.createElement("canvas");
        canvas.setAttribute("aria-hidden", "true");
        Object.assign(canvas.style, {
          position: "fixed",
          inset: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: "40",
        });
        document.body.appendChild(canvas);
        const renderer = new three.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.autoClear = false;
        this.canvas = canvas;
        this.renderer = renderer;
        for (const view of this.views) this.createGL(view);
        this.syncLoop();
      })
      .catch(() => {
        this.failed = true;
      });
    return this.loading;
  }

  private createGL(view: ParticleViewHandle) {
    const three = this.three;
    if (!three || view.gl) return;
    const rect = view.el.getBoundingClientRect();
    const aspect = rect.width && rect.height ? rect.width / rect.height : 1.6;

    const material = new three.ShaderMaterial({
      vertexShader,
      fragmentShader,
      defines: { MODE: MODE_INDEX[view.mode] },
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uHover: { value: 0 },
        uAspect: { value: aspect },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 2 },
        uCamDist: { value: CAM_DIST },
        uMouse: { value: new three.Vector2() },
        uMouseActive: { value: 0 },
        uP0: { value: new three.Vector3() },
        uP1: { value: new three.Vector3() },
        uColor: { value: new three.Vector3(...srgb(cssVar("--foreground", "#1a1a1a"))) },
        ...Object.fromEntries(
          PALETTES[view.mode].map((token, i) => [
            `uC${i + 1}`,
            { value: new three.Vector3(...srgb(cssVar(token, FALLBACK[token]))) },
          ])
        ),
      },
    });

    const points = new three.Points(new three.BufferGeometry(), material);
    points.frustumCulled = false;
    const scene = new three.Scene();
    scene.add(points);
    const camera = new three.PerspectiveCamera(FOV, aspect, 0.1, 20);
    camera.position.z = CAM_DIST;

    view.gl = { scene, camera, points, material };
    this.rebuild(view, aspect);
  }

  private rebuild(view: ParticleViewHandle, aspect: number) {
    const three = this.three;
    const gl = view.gl;
    if (!three || !gl) return;
    const data: SceneData = buildScene(view.mode, aspect);
    const geo = new three.BufferGeometry();
    geo.setAttribute("position", new three.BufferAttribute(data.position, 3));
    geo.setAttribute("aScatter", new three.BufferAttribute(data.scatter, 3));
    geo.setAttribute("aRand", new three.BufferAttribute(data.rand, 4));
    geo.setAttribute("aParams", new three.BufferAttribute(data.params, 4));
    gl.points.geometry.dispose();
    gl.points.geometry = geo;

    const u = gl.material.uniforms;
    u.uAspect.value = aspect;
    u.uSize.value = data.size;
    u.uP0.value.set(...data.p0);
    u.uP1.value.set(...data.p1);
    gl.camera.aspect = aspect;
    gl.camera.updateProjectionMatrix();
    view.aspect = aspect;
  }

  private syncLoop() {
    const shouldRun = !!this.renderer && [...this.views].some((v) => v.visible && v.gl);
    if (shouldRun && !this.running) {
      // Appended after Lenis's ticker callback so card rects are read post-scroll.
      gsap.ticker.add(this.tick);
      this.running = true;
    } else if (!shouldRun && this.running) {
      gsap.ticker.remove(this.tick);
      this.running = false;
      this.renderer?.setScissorTest(false);
      this.renderer?.clear();
    }
  }

  private tick = (_time: number, deltaMs: number) => {
    const renderer = this.renderer;
    const canvas = this.canvas;
    if (!renderer || !canvas) return;
    const dt = Math.min(deltaMs / 1000, 0.05);

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w !== this.width || h !== this.height) {
      this.width = w;
      this.height = h;
      renderer.setSize(w, h, false);
    }

    renderer.setScissorTest(false);
    renderer.clear();
    renderer.setScissorTest(true);

    for (const view of this.views) {
      const gl = view.gl;
      if (!view.visible || !gl) continue;
      const r = view.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > h || r.width < 2 || r.height < 2) continue;

      const aspect = r.width / r.height;
      if (Math.abs(aspect - view.aspect) / view.aspect > 0.04) this.rebuild(view, aspect);

      this.step(view, dt);

      const u = gl.material.uniforms;
      u.uTime.value = view.time;
      u.uProgress.value = view.progress;
      u.uHover.value = view.hover;
      u.uMouse.value.set(view.mouse.x, view.mouse.y);
      u.uMouseActive.value = view.mouseActive;

      const y = h - r.bottom;
      renderer.setViewport(r.left, y, r.width, r.height);
      renderer.setScissor(r.left, y, r.width, r.height);
      renderer.render(gl.scene, gl.camera);
    }
  };

  private step(view: ParticleViewHandle, dt: number) {
    if (view.reducedMotion) {
      view.progress = 1;
      view.time = REDUCED_TIME[view.mode];
      view.mouseActive = 0;
      return;
    }
    const hoverGoal = this.canHover ? view.hoverTarget : 0.35;
    const ease = (rate: number) => 1 - Math.exp(-dt * rate);
    view.hover += (hoverGoal - view.hover) * ease(4);
    view.mouse.x += (view.mouseTarget.x - view.mouse.x) * ease(8);
    view.mouse.y += (view.mouseTarget.y - view.mouse.y) * ease(8);
    view.mouseActive += (view.mouseActiveTarget - view.mouseActive) * ease(5);
    if (view.started) {
      view.progress = Math.min(1, view.progress + dt / INTRO_SECONDS);
      view.time += dt * (1 + 0.9 * view.hover);
    }
  }
}

let stage: ParticleStage | null = null;

export function getParticleStage() {
  stage ??= new ParticleStage();
  return stage;
}
