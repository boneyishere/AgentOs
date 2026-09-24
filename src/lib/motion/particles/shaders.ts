export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uHover;
uniform float uAspect;
uniform float uPixelRatio;
uniform float uSize;
uniform float uCamDist;
uniform vec2 uMouse;
uniform float uMouseActive;
uniform vec3 uP0;
uniform vec3 uP1;

attribute vec3 aScatter;
attribute vec4 aRand;
attribute vec4 aParams;

varying float vAlpha;
varying float vAccent;
varying float vGrad;

const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;

vec3 rotX(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z); }
vec3 rotY(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z); }
vec3 rotZ(vec3 p, float a) { float c = cos(a); float s = sin(a); return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z); }

vec3 bezier(vec3 a, vec3 b, vec3 c, float t) { return mix(mix(a, b, t), mix(b, c, t), t); }

void main() {
  float t = uTime;
  float h = uHover;
  vec3 p = position;
  float alpha = 1.0;
  float accent = 0.0;
  float size = 1.0;
  float grad = -1.0;

#if MODE == 0
  // Voice: a tilted terrain of points rippling like a live waveform.
  float env = exp(-pow(p.x / (uAspect * 0.62), 2.0));
  float depth = 1.0 - abs(p.z) / 0.95;
  float w = sin(p.x * 2.4 - t * 1.7) * 0.55
          + sin(p.x * 5.1 + p.z * 3.2 + t * 2.4) * 0.28
          + sin(p.x * 10.3 - p.z * 1.7 - t * 3.3) * 0.14;
  float amp = (0.2 + 0.3 * h) * env;
  p.y = w * amp * (0.35 + 0.65 * depth);
  accent = smoothstep(0.03, 0.2, abs(p.y)) * env;
  float edge = 1.0 - smoothstep(uAspect * 0.72, uAspect * 1.05, abs(p.x));
  p = rotX(p, 1.02);
  p.y += 0.04;
  alpha = (0.16 + 0.84 * depth * depth) * edge;
  size = 0.8 + 0.5 * depth;

#elif MODE == 1
  // Chat: the customer's message lifts off and re-forms as the agent's reply.
  float kind = aParams.x;
  vec2 jitter = (aRand.xy - 0.5) * 0.01 * sin(t * 2.0 + aRand.z * TAU);
  if (kind < 0.5) {
    p.xy += jitter;
    alpha = 0.5;
  } else if (kind < 1.5) {
    p.xy += jitter;
    alpha = 0.8;
  } else if (kind < 2.5) {
    p.xy += jitter;
    alpha = 0.55;
    accent = 1.0;
  } else {
    float cycle = fract(t * 0.13);
    float start = 0.12 + aParams.y * 0.42;
    float tr = smoothstep(start, start + 0.22, cycle);
    vec3 src = vec3(aParams.z, aParams.w, 0.0);
    vec3 mid = (src + p) * 0.5 + vec3(0.35 * (aRand.x - 0.3), 0.18 + aRand.y * 0.25, 0.6 * aRand.z);
    p = bezier(src, mid, p, tr);
    float fly = sin(tr * PI);
    p.xy += (aRand.zw - 0.5) * 0.06 * fly;
    alpha = smoothstep(0.0, 0.05, cycle) * (1.0 - smoothstep(0.9, 1.0, cycle)) * clamp(tr + fly, 0.0, 1.0);
    accent = tr;
    size = 1.0 + 0.6 * fly;
  }

#elif MODE == 2
  // Knowledge: document sheets stream into a rotating knowledge core.
  vec3 core = uP0;
  float spin = t * 0.35;
  if (aParams.w > 0.5) {
    vec3 o = rotY(rotX(position, 0.4), spin);
    p = core + o * (1.0 + 0.05 * sin(t * 2.0 + aRand.x * TAU) * (0.4 + h));
    float front = smoothstep(-0.4, 0.4, o.z);
    alpha = 0.3 + 0.7 * front;
    accent = 0.3 + 0.7 * front;
  } else {
    vec3 docP = rotY(position - uP1, 0.45) + uP1;
    docP.y += sin(t * 0.8 + position.x * 2.0) * 0.012;
    vec3 target = core + rotY(rotX(aParams.xyz, 0.4), spin);
    float c = fract(t * 0.09 + aRand.x);
    float travel = smoothstep(0.55, 0.82, c);
    vec3 mid = mix(docP, target, 0.5) + vec3(0.0, 0.3 + aRand.y * 0.35, 0.3);
    p = bezier(docP, mid, target, travel);
    alpha = smoothstep(0.0, 0.06, c) * (1.0 - smoothstep(0.93, 1.0, c)) * mix(0.55, 1.0, travel);
    accent = smoothstep(0.4, 1.0, travel);
    size = 1.0 + 0.4 * sin(travel * PI);
  }

#elif MODE == 3
  // Memory: comet trails orbiting a core, like recalled context circling the agent.
  float kind = aParams.w;
  if (kind < 0.5) {
    float ring = aParams.y;
    float dir = mod(ring, 2.0) < 0.5 ? 1.0 : -1.0;
    float r = aParams.x * (1.0 - 0.1 * h);
    float ang = aParams.z + t * (0.35 + ring * 0.16) * dir;
    vec3 q = vec3(cos(ang) * r, sin(ang) * r, (aRand.x - 0.5) * 0.03);
    q.xy *= 1.0 + (aRand.y - 0.5) * 0.035;
    q = rotX(q, 1.15 + ring * 0.24);
    q = rotZ(q, ring * 1.1 + 0.3);
    q = rotY(q, t * 0.12);
    p = q;
    float phase = fract(aParams.z / TAU * 2.0);
    float trail = dir > 0.0 ? phase : 1.0 - phase;
    float head = pow(trail, 4.0);
    float depthK = smoothstep(-0.8, 0.8, q.z);
    alpha = (0.1 + 0.9 * head) * (0.45 + 0.55 * depthK);
    accent = pow(trail, 5.0);
    grad = ring / 2.0;
    size = 0.7 + 0.9 * head;
  } else if (kind < 1.5) {
    p = rotY(position, t * 0.5) * (1.0 + 0.1 * sin(t * 2.4) + 0.15 * h);
    alpha = 0.9;
    grad = 0.5;
    accent = 0.9;
  } else {
    p = position + vec3(sin(t * 0.3 + aRand.x * TAU), cos(t * 0.25 + aRand.y * TAU), 0.0) * 0.05;
    alpha = 0.14;
    size = 0.8;
  }

#elif MODE == 4
  // Actions: a signal pulse travels the integration chain and lights each system.
  float kind = aParams.x;
  float idx = aParams.y;
  float cyc = fract(t * 0.16);
  float headPos = cyc * 4.2 - 0.3;
  float endFade = 1.0 - smoothstep(0.9, 1.0, cyc);
  if (kind < 0.5) {
    float act = smoothstep(idx - 0.05, idx + 0.1, headPos) * endFade;
    float hit = exp(-pow((headPos - idx) * 3.0, 2.0));
    vec3 o = rotY(rotX(position, 0.5), t * 0.6 + idx);
    o *= 1.0 + 0.3 * hit * act + 0.06 * h;
    p = vec3(uP0.x + idx * uP0.y, 0.0, 0.0) + o;
    accent = idx < 0.5 ? max(act, 0.35) : act;
    grad = idx / 3.0;
    alpha = 0.4 + 0.6 * smoothstep(-0.17, 0.17, o.z);
  } else if (kind < 1.5) {
    float along = idx + aParams.z;
    float lit = smoothstep(0.0, 0.15, headPos - along) * endFade;
    alpha = mix(0.2, 0.75, lit);
    accent = lit * 0.8;
    grad = along / 3.0;
    size = 0.8;
  } else {
    float along = headPos - aParams.z * 0.6;
    p = vec3(uP0.x + clamp(along, 0.0, 3.0) * uP0.y,
             (aRand.y - 0.5) * 0.05 * (1.0 + aParams.z * 4.0),
             (aRand.z - 0.5) * 0.06);
    float inRange = step(0.0, along) * step(along, 3.0);
    alpha = inRange * (1.0 - aParams.z) * endFade;
    accent = 1.0;
    size = 1.4 - aParams.z * 0.7;
    grad = clamp(along / 3.0, 0.0, 1.0);
  }

#elif MODE == 5
  // Intelligence: raw conversation noise sorts itself into structured lanes.
  float lane = aParams.x;
  float s = fract(t * 0.06 + aRand.x);
  float x = mix(uP0.x, uP0.y, s);
  float chaos = (aRand.y - 0.5) * 1.5 + sin(t * 1.1 + aRand.z * TAU) * 0.14 + sin(x * 3.0 + t) * 0.08;
  float laneY = (1.0 - lane) * 0.5;
  float sortK = smoothstep(0.3, 0.72, s);
  float y = mix(chaos, laneY + (aRand.w - 0.5) * 0.07, sortK);
  float z = mix((aRand.z - 0.5) * 0.9, 0.0, sortK);
  p = vec3(x, y, z);
  alpha = smoothstep(0.0, 0.08, s) * (1.0 - smoothstep(0.94, 1.0, s)) * mix(0.3, 0.9, sortK);
  accent = sortK * (lane < 0.5 ? 1.0 : 0.85);
  grad = lane / 2.0;
  size = mix(0.8, 1.15, sortK);
#endif

  if (grad < 0.0) grad = clamp(p.x / (uAspect * 2.0) + 0.5, 0.0, 1.0);

  // Cursor parallax + repulsion, applied in world space after each scene's motion.
  p = rotY(p, uMouse.x / max(uAspect, 1.0) * 0.14 * uMouseActive);
  p = rotX(p, -uMouse.y * 0.1 * uMouseActive);
  vec2 d = p.xy - uMouse;
  float dist = length(d);
  float force = (1.0 - smoothstep(0.0, 0.45, dist)) * 0.16 * uMouseActive;
  if (dist > 0.0001) p.xy += normalize(d) * force;

  // Intro: particles fly in from a scattered cloud, staggered per particle.
  float intro = clamp(uProgress * 1.6 - aRand.w * 0.6, 0.0, 1.0);
  intro = 1.0 - pow(1.0 - intro, 3.0);
  p = mix(aScatter, p, intro);
  alpha *= smoothstep(0.0, 0.6, intro);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * size * uPixelRatio * (uCamDist / -mv.z);
  vAlpha = alpha;
  vAccent = clamp(accent, 0.0, 1.0);
  vGrad = grad;
}
`;

export const fragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
varying float vAlpha;
varying float vAccent;
varying float vGrad;

vec3 ramp(float t) {
  return t < 0.5 ? mix(uC1, uC2, t * 2.0) : mix(uC2, uC3, t * 2.0 - 1.0);
}

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.18, d) * vAlpha;
  gl_FragColor = vec4(mix(uColor, ramp(vGrad), vAccent), a);
}
`;
