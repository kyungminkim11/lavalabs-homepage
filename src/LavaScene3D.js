import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import * as THREE from "three";
function createWaveSurface({ width, height, color, emissive, opacity, position, rotation, amplitude, frequency, speed, phase }) {
    const geometry = new THREE.PlaneGeometry(width, height, 92, 34);
    const material = new THREE.MeshPhysicalMaterial({
        color,
        emissive,
        emissiveIntensity: 0.14,
        metalness: 0.08,
        roughness: 0.38,
        transmission: 0.08,
        thickness: 0.4,
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
function updateWaveSurface(surface, time) {
    const position = surface.geometry.attributes.position;
    const values = position.array;
    for (let index = 0; index < position.count; index += 1) {
        const x = surface.basePositions[index * 3];
        const y = surface.basePositions[index * 3 + 1];
        const ridge = Math.sin(x * surface.frequency + time * surface.speed + surface.phase) * surface.amplitude +
            Math.cos((x + y) * 0.7 + time * surface.speed * 0.55 + surface.phase) * surface.amplitude * 0.55;
        values[index * 3 + 2] = ridge;
    }
    position.needsUpdate = true;
    surface.geometry.computeVertexNormals();
}
function createFlowLine(color, points) {
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 72, 0.038, 8, false);
    const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.18,
        roughness: 0.32,
        metalness: 0.12,
        transparent: true,
        opacity: 0.74
    });
    return new THREE.Mesh(geometry, material);
}
export function LavaScene3D() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent) {
            return undefined;
        }
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas,
                preserveDrawingBuffer: true
            });
        }
        catch {
            canvas.style.display = "none";
            return undefined;
        }
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0.3, 9);
        const group = new THREE.Group();
        scene.add(group);
        const key = new THREE.DirectionalLight(0xffffff, 1.35);
        key.position.set(-2, 4, 5);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0x8fd3d7, 0.72);
        fill.position.set(4, 1.8, 3);
        scene.add(fill);
        const ambient = new THREE.AmbientLight(0xfff3e4, 1.15);
        scene.add(ambient);
        const surfaces = [
            createWaveSurface({
                width: 7.4,
                height: 2.3,
                color: "#df705d",
                emissive: "#c85543",
                opacity: 0.58,
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
                opacity: 0.42,
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
                opacity: 0.34,
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
        const resize = () => {
            const { width, height } = parent.getBoundingClientRect();
            renderer.setSize(width, height, false);
            camera.aspect = width / Math.max(height, 1);
            camera.updateProjectionMatrix();
            const isMobile = width < 700;
            camera.position.z = isMobile ? 10.6 : 8.4;
            group.position.set(isMobile ? 0.72 : 1.35, isMobile ? -0.15 : -0.04, -0.25);
            group.scale.setScalar(isMobile ? 0.86 : 1.08);
        };
        const onPointerMove = (event) => {
            pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 2;
            pointerTarget.y = (event.clientY / window.innerHeight - 0.5) * 2;
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(parent);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        resize();
        let frameId = 0;
        let disposed = false;
        const render = (frameTime = 0) => {
            const time = frameTime * 0.001;
            pointer.x += (pointerTarget.x - pointer.x) * 0.045;
            pointer.y += (pointerTarget.y - pointer.y) * 0.045;
            if (!reducedMotion) {
                surfaces.forEach((surface) => updateWaveSurface(surface, time));
                group.rotation.y = pointer.x * 0.13 + Math.sin(time * 0.23) * 0.05;
                group.rotation.x = -pointer.y * 0.045 + Math.cos(time * 0.2) * 0.03;
                group.rotation.z = Math.sin(time * 0.18) * 0.025;
                flowLines.forEach((line, index) => {
                    line.rotation.z = Math.sin(time * 0.38 + index) * 0.035;
                });
            }
            else {
                surfaces.forEach((surface) => updateWaveSurface(surface, 0.4));
            }
            renderer.render(scene, camera);
            if (!reducedMotion && !disposed) {
                frameId = window.requestAnimationFrame(render);
            }
        };
        render();
        return () => {
            disposed = true;
            window.cancelAnimationFrame(frameId);
            window.removeEventListener("pointermove", onPointerMove);
            resizeObserver.disconnect();
            surfaces.forEach((surface) => {
                surface.geometry.dispose();
                surface.mesh.material.dispose();
            });
            flowLines.forEach((line) => {
                line.geometry.dispose();
                line.material.dispose();
            });
            renderer.dispose();
        };
    }, []);
    return _jsx("canvas", { className: "lava-scene", ref: canvasRef, "aria-hidden": "true" });
}
