export type ParticleMode =
  | "voice"
  | "chat"
  | "knowledge"
  | "memory"
  | "actions"
  | "intelligence";

export const MODE_INDEX: Record<ParticleMode, number> = {
  voice: 0,
  chat: 1,
  knowledge: 2,
  memory: 3,
  actions: 4,
  intelligence: 5,
};

type Vec3 = [number, number, number];

export type SceneData = {
  count: number;
  position: Float32Array;
  scatter: Float32Array;
  rand: Float32Array;
  params: Float32Array;
  size: number;
  p0: Vec3;
  p1: Vec3;
};

// Seeded so a resize-triggered rebuild keeps the same layout instead of reshuffling.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Cloud {
  pos: number[] = [];
  par: number[] = [];
  add(x: number, y: number, z: number, a = 0, b = 0, c = 0, d = 0) {
    this.pos.push(x, y, z);
    this.par.push(a, b, c, d);
  }
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

function fibPoint(i: number, n: number, r: number): Vec3 {
  const y = 1 - (i / Math.max(n - 1, 1)) * 2;
  const rad = Math.sqrt(Math.max(0, 1 - y * y));
  const th = GOLDEN * i;
  return [Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r];
}

function roundedRect(
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number,
  spacing: number,
  cb: (x: number, y: number) => void
) {
  const sw = w - 2 * r;
  const sh = h - 2 * r;
  const arc = (Math.PI / 2) * r;
  const segs: { len: number; at: (u: number) => [number, number] }[] = [
    { len: sw, at: (u) => [cx - sw / 2 + u * sw, cy + h / 2] },
    { len: arc, at: (u) => corner(cx + sw / 2, cy + sh / 2, Math.PI / 2 - u * (Math.PI / 2)) },
    { len: sh, at: (u) => [cx + w / 2, cy + sh / 2 - u * sh] },
    { len: arc, at: (u) => corner(cx + sw / 2, cy - sh / 2, -u * (Math.PI / 2)) },
    { len: sw, at: (u) => [cx + sw / 2 - u * sw, cy - h / 2] },
    { len: arc, at: (u) => corner(cx - sw / 2, cy - sh / 2, -Math.PI / 2 - u * (Math.PI / 2)) },
    { len: sh, at: (u) => [cx - w / 2, cy - sh / 2 + u * sh] },
    { len: arc, at: (u) => corner(cx - sw / 2, cy + sh / 2, Math.PI - u * (Math.PI / 2)) },
  ];
  function corner(ox: number, oy: number, ang: number): [number, number] {
    return [ox + Math.cos(ang) * r, oy + Math.sin(ang) * r];
  }
  const total = segs.reduce((s, g) => s + g.len, 0);
  const n = Math.floor(total / spacing);
  for (let i = 0; i < n; i++) {
    let d = (i / n) * total;
    for (const seg of segs) {
      if (d <= seg.len) {
        const [x, y] = seg.at(seg.len === 0 ? 0 : d / seg.len);
        cb(x, y);
        break;
      }
      d -= seg.len;
    }
  }
}

function voice(a: number, c: Cloud) {
  const cols = Math.min(180, Math.round(70 + a * 38));
  const rows = 22;
  for (let r = 0; r < rows; r++) {
    const z = -0.95 + (r / (rows - 1)) * 1.9;
    for (let i = 0; i < cols; i++) {
      c.add((-1.08 + (i / (cols - 1)) * 2.16) * a, 0, z);
    }
  }
  return { size: 1.8, p0: [0, 0, 0] as Vec3, p1: [0, 0, 0] as Vec3 };
}

function textLines(
  x0: number,
  yTop: number,
  maxLen: number,
  lengths: number[],
  gap: number,
  spacing: number,
  cb: (x: number, y: number, line: number, u: number) => void
) {
  lengths.forEach((f, line) => {
    const len = maxLen * f;
    const n = Math.max(2, Math.floor(len / spacing));
    for (let i = 0; i <= n; i++) {
      cb(x0 + (i / n) * len, yTop - line * gap, line, i / n);
    }
  });
}

// Chat: the customer's message (A) lifts off and re-forms as the agent's reply (B).
function chat(a: number, c: Cloud, R: () => number) {
  const wA = Math.min(a * 0.95, 1.55);
  const hA = 0.46;
  const cA: Vec3 = [-a * 0.9 + wA / 2, -0.4, 0];
  const wB = Math.min(a * 1.1, 1.8);
  const hB = 0.62;
  const cB: Vec3 = [a * 0.9 - wB / 2, 0.3, 0];

  roundedRect(cA[0], cA[1], wA, hA, 0.16, 0.016, (x, y) => c.add(x, y, 0, 0));
  const aText: [number, number][] = [];
  textLines(cA[0] - wA / 2 + 0.16, cA[1] + 0.07, wA - 0.32, [0.92, 0.55], 0.14, 0.018, (x, y) => {
    for (const dy of [-0.012, 0.012]) {
      c.add(x, y + dy, 0, 1);
      aText.push([x, y + dy]);
    }
  });

  roundedRect(cB[0], cB[1], wB, hB, 0.18, 0.016, (x, y) => c.add(x, y, 0, 2));
  const bLengths = [0.94, 0.8, 0.42];
  textLines(cB[0] - wB / 2 + 0.17, cB[1] + 0.14, wB - 0.34, bLengths, 0.14, 0.016, (x, y, line, u) => {
    for (const dy of [-0.012, 0.012]) {
      const [sx, sy] = aText[Math.floor(R() * aText.length)];
      c.add(x, y + dy, 0, 3, (line + u) / bLengths.length, sx, sy);
    }
  });

  return { size: 2.2, p0: cA, p1: cB };
}

function knowledge(a: number, c: Cloud, R: () => number) {
  const docs: Vec3 = [-a * 0.5, 0.02, 0];
  const coreR = Math.min(0.44, a * 0.26);
  const core: Vec3 = [a * 0.52, 0, 0];

  const docPts: [number, number, number][] = [];
  for (let s = 0; s < 3; s++) {
    const ox = docs[0] + (s - 1) * 0.12;
    const oy = docs[1] + (1 - s) * 0.1;
    const oz = (s - 1) * 0.18;
    roundedRect(ox, oy, 0.62, 0.84, 0.05, 0.03, (x, y) => docPts.push([x, y, oz]));
    const lengths = Array.from({ length: 7 }, () => 0.35 + R() * 0.65);
    textLines(ox - 0.21, oy + 0.28, 0.42, lengths, 0.09, 0.028, (x, y) => docPts.push([x, y, oz]));
  }
  const n = docPts.length;
  docPts.forEach(([x, y, z]) => {
    const [tx, ty, tz] = fibPoint(Math.floor(R() * n), n, coreR);
    c.add(x, y, z, tx, ty, tz, 0);
  });

  const coreN = 650;
  for (let i = 0; i < coreN; i++) {
    const [x, y, z] = fibPoint(i, coreN, coreR);
    c.add(x, y, z, 0, 0, 0, 1);
  }
  return { size: 2.1, p0: core, p1: docs };
}

function memory(_a: number, c: Cloud, R: () => number) {
  const rings = [
    { r: 0.86, n: 540 },
    { r: 0.66, n: 440 },
    { r: 0.47, n: 340 },
  ];
  rings.forEach(({ r, n }, ring) => {
    for (let i = 0; i < n; i++) {
      c.add(0, 0, 0, r, ring, (i / n) * Math.PI * 2, 0);
    }
  });
  const coreN = 260;
  for (let i = 0; i < coreN; i++) {
    const [x, y, z] = fibPoint(i, coreN, 0.13);
    c.add(x, y, z, 0, 0, 0, 1);
  }
  for (let i = 0; i < 240; i++) {
    const u = R() * Math.PI * 2;
    const v = Math.acos(2 * R() - 1);
    const rr = 0.3 + Math.cbrt(R()) * 0.9;
    c.add(Math.sin(v) * Math.cos(u) * rr * 1.6, Math.cos(v) * rr, Math.sin(v) * Math.sin(u) * rr, 0, 0, 0, 2);
  }
  return { size: 2.0, p0: [0, 0, 0] as Vec3, p1: [0, 0, 0] as Vec3 };
}

function actions(a: number, c: Cloud, R: () => number) {
  const xStart = -a * 0.78;
  const xStep = (a * 1.56) / 3;
  const nodeN = 210;
  for (let node = 0; node < 4; node++) {
    for (let i = 0; i < nodeN; i++) {
      const [x, y, z] = fibPoint(i, nodeN, 0.16);
      c.add(x, y, z, 0, node);
    }
  }
  for (let e = 0; e < 3; e++) {
    const from = xStart + e * xStep + 0.24;
    const to = xStart + (e + 1) * xStep - 0.24;
    const n = Math.max(2, Math.floor((to - from) / 0.03));
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      c.add(from + u * (to - from), 0, 0, 1, e, (0.24 + u * (xStep - 0.48)) / xStep);
    }
  }
  for (let i = 0; i < 260; i++) {
    c.add(0, 0, 0, 2, 0, Math.pow(R(), 1.6));
  }
  return { size: 2.2, p0: [xStart, xStep, 0] as Vec3, p1: [0, 0, 0] as Vec3 };
}

function intelligence(a: number, c: Cloud, R: () => number) {
  const n = Math.min(3400, Math.round(1400 + a * 420));
  for (let i = 0; i < n; i++) {
    c.add(0, 0, 0, Math.floor(R() * 3));
  }
  return { size: 2.0, p0: [-a * 1.05, a * 0.55, 0] as Vec3, p1: [0, 0, 0] as Vec3 };
}

export function buildScene(mode: ParticleMode, aspect: number): SceneData {
  const R = rng(MODE_INDEX[mode] * 977 + 13);
  const c = new Cloud();
  const meta =
    mode === "voice"
      ? voice(aspect, c)
      : mode === "chat"
        ? chat(aspect, c, R)
        : mode === "knowledge"
          ? knowledge(aspect, c, R)
          : mode === "memory"
            ? memory(aspect, c, R)
            : mode === "actions"
              ? actions(aspect, c, R)
              : intelligence(aspect, c, R);

  const count = c.pos.length / 3;
  const rand = new Float32Array(count * 4);
  const scatter = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    rand[i * 4] = R();
    rand[i * 4 + 1] = R();
    rand[i * 4 + 2] = R();
    rand[i * 4 + 3] = R();
    scatter[i * 3] = (R() * 2 - 1) * aspect * 1.8;
    scatter[i * 3 + 1] = (R() * 2 - 1) * 1.8;
    scatter[i * 3 + 2] = (R() * 2 - 1) * 1.5;
  }

  return {
    count,
    position: new Float32Array(c.pos),
    params: new Float32Array(c.par),
    rand,
    scatter,
    ...meta,
  };
}
