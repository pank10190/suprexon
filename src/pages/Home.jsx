import { useEffect, useRef } from "react";
import Services from "./Services";
import Tech from "./Tech";
import Contact from "./Contact";
// import Career from "./Career";
import { FaWhatsapp } from "react-icons/fa";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export default function Home() {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    // -------------------- STARS --------------------
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // -------------------- PORTAL RINGS --------------------
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

    // -------------------- VORTEX --------------------
    const vortexCount = 1200;
    const vortexGeometry = new THREE.BufferGeometry();
    const vortexPositions = new Float32Array(vortexCount * 3);
    vortexGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vortexPositions, 3)
    );
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

    // -------------------- LIGHTS --------------------
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const light = new THREE.PointLight(0x66ffff, 3, 100);
    light.position.set(15, 15, 15);
    scene.add(light);

    // -------------------- BLOOM --------------------
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      2,
      0.8,
      0.1
    );
    composer.addPass(bloom);

    // -------------------- MOUSE --------------------
    let mouseX = 0,
      mouseY = 0;
    const handleMouse = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", handleMouse);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // portal rotation
      toruses.forEach((t) => {
        t.rotation.y += t.rotationSpeed;
        const hue = (time * 0.05) % 1;
        t.material.color.setHSL(hue, 1, 0.6);
        t.material.emissive.setHSL(hue, 1, 0.5);
      });

      // camera movement
      camera.position.x = Math.sin(time * 0.2) * 20;
      camera.position.z = Math.cos(time * 0.2) * 20;
      camera.position.y = Math.sin(time * 0.1) * 5;
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // vortex animation
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
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative min-h-screen flex items-center text-white overflow-hidden"
      >
        {/* Three.js Canvas */}
        <div
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-10"></div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-indigo-500/20 text-indigo-300">
              🚀 Trusted Web & App Development Partner
            </span>
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
              We Build&nbsp;
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Websites & Mobile Apps
              </span>
              <br />
              <span className="text-white">That Grow Your Business</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed">
              <span className="font-semibold text-white">SupreXon Technologies</span>{" "}
              delivers scalable, secure, and high-performance{" "}
              <span className="text-indigo-300 font-medium">
                web, mobile & custom software solutions
              </span>{" "}
              for startups and growing enterprises.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center
               px-8 py-4 rounded-2xl font-extrabold text-lg
               bg-gradient-to-r from-yellow-400 to-yellow-300
               text-black shadow-[0_20px_40px_rgba(250,204,21,0.45)]
               transition-all duration-300
               hover:scale-105 hover:shadow-[0_30px_60px_rgba(250,204,21,0.6)]"
              >
                <span className="relative z-10">Get Free Consultation</span>
                <span className="ml-2 relative z-10 transition-transform group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute inset-0 rounded-2xl bg-yellow-400 blur-xl opacity-40 group-hover:opacity-70 transition"></span>
              </a>
              <a
                href="#services"
                className="group relative inline-flex items-center justify-center
               px-8 py-4 rounded-2xl font-bold text-lg
               text-white border border-white/30
               backdrop-blur-md bg-white/5
               transition-all duration-300
               hover:bg-white hover:text-black hover:scale-105"
              >
                <span className="relative z-10">Explore Services</span>
                <span className="absolute inset-0 rounded-2xl border border-white/20
                     group-hover:border-yellow-400/60 transition"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTIONS ================= */}
      <Services />
      <Tech />
      <Contact />
      {/* <Career /> */}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918982242338"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed bottom-6 right-6 z-50
          bg-green-500 text-white p-4 rounded-full
          shadow-lg shadow-green-400/50
          hover:shadow-2xl hover:shadow-green-500/70
          transform hover:scale-110
          transition-all duration-300
          ring-2 ring-green-400/30 hover:ring-green-500/50
        "
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
}