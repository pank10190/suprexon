import { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three-stdlib/postprocessing/EffectComposer.js";
import { RenderPass } from "three-stdlib/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three-stdlib/postprocessing/UnrealBloomPass.js";

export default function GalaxyBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Stars
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Portal Torus Rings
    const toruses = [];
    for (let i = 0; i < 3; i++) {
      const t = new THREE.Mesh(
        new THREE.TorusGeometry(6 + i * 2, 0.5, 32, 200),
        new THREE.MeshStandardMaterial({
          color: 0x00ffff,
          emissive: 0x00ffff,
          emissiveIntensity: 0.8,
        })
      );
      t.scale.set(1, 0.5, 1);
      t.rotationSpeed = 0.004 + i * 0.002;
      scene.add(t);
      toruses.push(t);
    }

    // Vortex
    const vortexCount = 1200;
    const vortexGeometry = new THREE.BufferGeometry();
    const vortexPositions = new Float32Array(vortexCount * 3);
    vortexGeometry.setAttribute("position", new THREE.BufferAttribute(vortexPositions, 3));
    const vortexMaterial = new THREE.PointsMaterial({
      color: 0x33ffff,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const vortex = new THREE.Points(vortexGeometry, vortexMaterial);
    scene.add(vortex);

    const vortexData = Array(vortexCount)
      .fill()
      .map(() => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.04 + Math.random() * 0.03,
        distance: 0,
        maxDistance: 15 + Math.random() * 10,
      }));

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const light = new THREE.PointLight(0x66ffff, 3, 100);
    light.position.set(15, 15, 15);
    scene.add(light);

    // Bloom
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 2, 0.8, 0.1);
    composer.addPass(bloom);

    // Mouse
    let mouseX = 0,
      mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animate
    let time = 0;
    const animate = () => {
      time += 0.01;
      toruses.forEach((t) => {
        t.rotation.y += t.rotationSpeed;
        const hue = (time * 0.05) % 1;
        t.material.color.setHSL(hue, 1, 0.6);
        t.material.emissive.setHSL(hue, 1, 0.5);
      });

      camera.position.x = Math.sin(time * 0.2) * 20;
      camera.position.z = Math.cos(time * 0.2) * 20;
      camera.position.y = Math.sin(time * 0.1) * 5;
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Vortex animation
      const pos = vortex.geometry.attributes.position.array;
      for (let i = 0; i < vortexCount; i++) {
        const d = vortexData[i];
        d.distance += d.speed;
        const angle = d.angle + time;
        pos[i * 3] = Math.cos(angle) * d.distance;
        pos[i * 3 + 1] = Math.sin(angle) * d.distance;
        pos[i * 3 + 2] = Math.sin(angle) * d.distance;
        if (d.distance > d.maxDistance) d.distance = 0;
      }
      vortex.geometry.attributes.position.needsUpdate = true;

      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0"></div>;
}