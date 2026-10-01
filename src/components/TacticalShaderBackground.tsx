"use client";

import { useEffect, useRef } from "react";

export default function TacticalShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      console.warn("WebGL not supported for background shader");
      return;
    }

    const vsSource = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    
    // Exact Shader from ShadowTrace landing page mockup (1).html
    const fsSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;
uniform float t;

float h(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}

float n(vec2 p){
  vec2 i=floor(p);
  vec2 f=fract(p);
  f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);
}

float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){
    v+=a*n(p);
    p=p*2.02+vec2(1.7,9.2);
    a*=.5;
  }
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/r;
  uv.x*=r.x/r.y;
  uv+=vec2(sin(uv.y*2.2+t*.15),cos(uv.x*1.8-t*.12))*.18;
  vec2 q=vec2(fbm(uv*1.3+t*.04),fbm(uv*1.3+vec2(5.2,1.3)-t*.035));
  float f=fbm(uv*1.1+2.2*q+vec2(t*.03,-t*.02));
  
  vec3 obs=vec3(.039,.047,.067);
  vec3 tea=vec3(.02,.17,.22);
  vec3 cy=vec3(.13,.88,1.);
  vec3 am=vec3(1.,.69,.12);
  
  vec3 col=mix(obs,tea,smoothstep(.25,.65,f));
  col=mix(col,cy*.62,smoothstep(.55,.92,f)*smoothstep(.35,.8,q.x));
  col=mix(col,am*.55,smoothstep(.6,.95,q.y)*smoothstep(.45,.75,f)*.8);
  
  vec2 s=gl_FragCoord.xy/r;
  float vig=smoothstep(1.15,.25,length(s-vec2(.5,.45)));
  col*=.45+.55*vig;
  col+=(h(gl_FragCoord.xy+t)-.5)*.025;
  
  gl_FragColor=vec4(col,1.);
}
`;

    function createShader(type: number, src: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vShader || !fShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "r");
    const uTime = gl.getUniformLocation(program, "t");

    const resize = () => {
      if (!canvas) return;
      const k = 0.5; // Half resolution for optimal 60fps performance
      canvas.width = Math.max(2, Math.floor(window.innerWidth * k));
      canvas.height = Math.max(2, Math.floor(window.innerHeight * k));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (ms: number) => {
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, ms / 1000 + 20);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (ms: number) => {
      draw(ms);
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      if (prefersReducedMotion) {
        draw(4000);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      if (vShader) gl.deleteShader(vShader);
      if (fShader) gl.deleteShader(fShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block"
      }}
    />
  );
}
