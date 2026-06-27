import { useEffect, useRef } from "react";
import * as THREE from "three";

type WaveSurface = {
  geometry: THREE.PlaneGeometry;
  mesh: THREE.Mesh;
  basePositions: Float32Array;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
};

function createWaveSurface({
  width,
  height,
  color,
  emissive,
  opacity,
  position,
  rotation,
  amplitude,
  frequency,
  speed,
  phase
}: {
  width: number;
  height: number;
  color: string;
  emissive: string;
  opacity: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
}): WaveSurface {
  // The previous 92 x 34 mesh recalculated thousands of vertices every frame.
  // A lighter grid keeps the same visual character with much less CPU/GPU work.
  const geometry = new THREE.PlaneGeometry(width, height, 44, 16);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.12,
    metalness: 0.05,
    roughness: 0.44,
    transparent: true,
    opacity,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  mesh.rotation.copy(rotation);
  mesh.castShadow = false;
  mesh.receiveShadow = false;

  return {
    geometry,
    mesh,
    basePositions: new Float32Array(geometry.attributes.position.array),
    amplitude,
    frequency,
    speed,
    phase
  };
}

function updateWaveSurface(surface: WaveSurface, time: number) {
  const position = surface.geometry.attributes.position as THREE.BufferAttribute;
  const values = position.array as Float32Array;

  for (let index = 0; index < position.count; index += 1) {
    const x = surface.basePositions[index * 3];
    const y = surface.basePositions[index * 3 + 1];
    const ridge =
      Math.sin(x * surface.frequency + time * surface.speed + surface.phase) * surface.amplitude +
      Math.cos((x + y) * 0.7 + time * surface.speed * 0.55 + surface.phase) * surface.amplitude * 0.55;

    values[index * 3 + 2] = ridge;
  }

  position.needsUpdate = true;
}

function createFlowLine(color: string, points: THREE.Vector3[]) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 42, 0.038, 6, false);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.16,
    roughness: 0.38,
    metalness: 0.08,
    transparent: true,
    opacity: 0.7
  });

  return new THREE.Mesh(geometry, material);
}

export function LavaScene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrowScreen = window.matchMedia("(max-width: 760px)").matches;

    // Mobile devices already have the illustrated CSS background. Avoid opening a
    // WebGL context there, which makes touch scrolling noticeably heavier.
    if (coarsePointer || narrowScreen) {
      canvas.style.display = "none";
      return undefined;
    }

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio <= 1.5,
        canvas,
        powerPreference: "high-performance"
      });
    } catch {
      canvas.style.display = "none";
      return undefined;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.3, 9);

    const group = new THREE.Group();
    scene.add(group);

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(-2, 4, 5);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8fd3d7, 0.62);
    fill.position.set(4, 1.8, 3);
    scene.add(fill);

    const ambient = new THREE.AmbientLight(0xfff3e4, 1.08);
    scene.add(ambient);

    const surfaces = [
      createWaveSurface({
        width: 7.4,
        height: 2.3,
        color: "#df705d",
        emissive: "#c85543",
        opacity: 0.56,
        position: new THREE.Vector3(1.7, -0.45, -0.35),
        rotation: new THREE.Euler(-0.24, -0.26, -0.18),
        amplitude: 0.24,
        frequency: 1.1,
        speed: 0.62,
        phase: 0
      }),
      createWaveSurface({
        width: 6.5,
        height: 1.55,
        color: "#2f8f98",
        emissive: "#2f8f98",
        opacity: 0.4,
        position: new THREE.Vector3(2.95, 0.95, -0.85),
        rotation: new THREE.Euler(-0.08, 0.12, 0.15),
        amplitude: 0.18,
        frequency: 1.45,
        speed: 0.5,
        phase: 1.7
      }),
      createWaveSurface({
        width: 5.8,
        height: 1.15,
        color: "#f0c7a7",
        emissive: "#df705d",
        opacity: 0.32,
        position: new THREE.Vector3(3.45, -1.55, -0.1),
        rotation: new THREE.Euler(-0.36, -0.02, 0.08),
        amplitude: 0.13,
        frequency: 1.8,
        speed: 0.46,
        phase: 3.2
      })
    ];

    surfaces.forEach((surface) => group.add(surface.mesh));

    const flowLines = [
      createFlowLine("#df705d", [
        new THREE.Vector3(-0.3, -1.1, 0.1),
        new THREE.Vector3(1.1, -0.8, 0.55),
        new THREE.Vector3(2.5, -1.25, 0.25),
        new THREE.Vector3(4.1, -0.65, 0.5)
      ]),
      createFlowLine("#2f8f98", [
        new THREE.Vector3(0.2, 1.1, -0.1),
        new THREE.Vector3(1.5, 0.7, 0.35),
        new THREE.Vector3(2.7, 1.15, 0.1),
        new THREE.Vector3(4.25, 0.6, 0.36)
      ])
    ];

    flowLines.forEach((line) => group.add(line));

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    let lastWidth = 0;
    let lastHeight = 0;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      const roundedWidth = Math.max(1, Math.round(width));
      const roundedHeight = Math.max(1, Math.round(height));

      if (roundedWidth === lastWidth && roundedHeight === lastHeight) return;
      lastWidth = roundedWidth;
      lastHeight = roundedHeight;

      renderer.setSize(roundedWidth, roundedHeight, false);
      camera.aspect = roundedWidth / roundedHeight;
      camera.updateProjectionMatrix();
      camera.position.z = 8.4;
      group.position.set(1.35, -0.04, -0.25);
      group.scale.setScalar(1.08);
      renderer.render(scene, camera);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    parent.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();

    let frameId = 0;
    let scrollTimer = 0;
    let lastFrameTime = 0;
    let visible = true;
    let scrolling = false;
    let disposed = false;
    const frameInterval = 1000 / 30;

    const scheduleFrame = () => {
      if (disposed || reducedMotion || !visible || document.hidden || scrolling || frameId) return;
      frameId = window.requestAnimationFrame(render);
    };

    const render = (frameTime = 0) => {
      frameId = 0;
      if (disposed || !visible || document.hidden || scrolling) return;

      if (frameTime - lastFrameTime < frameInterval) {
        scheduleFrame();
        return;
      }

      lastFrameTime = frameTime;
      const time = frameTime * 0.001;
      pointer.x += (pointerTarget.x - pointer.x) * 0.07;
      pointer.y += (pointerTarget.y - pointer.y) * 0.07;

      surfaces.forEach((surface) => updateWaveSurface(surface, time));
      group.rotation.y = pointer.x * 0.1 + Math.sin(time * 0.23) * 0.045;
      group.rotation.x = -pointer.y * 0.038 + Math.cos(time * 0.2) * 0.026;
      group.rotation.z = Math.sin(time * 0.18) * 0.02;
      flowLines.forEach((line, index) => {
        line.rotation.z = Math.sin(time * 0.38 + index) * 0.03;
      });

      renderer.render(scene, camera);
      scheduleFrame();
    };

    const onScroll = () => {
      scrolling = true;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
        scheduleFrame();
      }, 140);
    };

    const onVisibilityChange = () => {
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        scheduleFrame();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible && frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        } else {
          scheduleFrame();
        }
      },
      { rootMargin: "80px 0px", threshold: 0.01 }
    );

    intersectionObserver.observe(parent);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Always paint one complete frame. Motion then runs only when the hero is
    // visible, the page is not scrolling and reduced-motion is not requested.
    surfaces.forEach((surface) => updateWaveSurface(surface, reducedMotion ? 0.4 : 0));
    renderer.render(scene, camera);
    scheduleFrame();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      parent.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      surfaces.forEach((surface) => {
        surface.geometry.dispose();
        (surface.mesh.material as THREE.Material).dispose();
      });
      flowLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return <canvas className="lava-scene" ref={canvasRef} aria-hidden="true" />;
}
