import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function Tech() {
  const techs = [
    { name: "React", icon: "⚛️", detail: "A JavaScript library for building UI." },
    { name: "Node.js", icon: "🟢", detail: "JavaScript runtime built on Chrome’s V8 engine." },
    { name: "MERN Stack", icon: "💻", detail: "Full-stack development with MongoDB, Express, React, Node.js." },
    { name: "Laravel", icon: "🟥", detail: "PHP framework for secure and scalable web apps." },
    { name: "PHP", icon: "🐘", detail: "Server-side scripting language for web development." },
    { name: "JavaScript", icon: "🧠", detail: "Programming language for web interactivity." },
    { name: "SQL / MySQL", icon: "🛢️", detail: "Relational database management." },
    { name: "Android", icon: "📱", detail: "Mobile application development platform." },
    { name: "Android Studio", icon: "🧪", detail: "Official IDE for Android app development." },
    { name: "Tailwind", icon: "🎨", detail: "Utility-first CSS framework." },
    { name: "Bootstrap", icon: "🧩", detail: "Responsive design CSS framework." },
    { name: "Java", icon: "☕", detail: "Object-oriented programming language." },
    { name: "HTML", icon: "📄", detail: "Markup language for web pages." },
    { name: "jQuery", icon: "⚡", detail: "Library for DOM manipulation." },
    { name: "AJAX", icon: "🌐", detail: "Asynchronous web requests." },
  ];

  const containerRef = useRef(null);
  const threeRef = useRef(null);
  const [activeTech, setActiveTech] = useState(null);

  // Auto-scroll cards
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let scrollAmount = 0;
    const scrollWidth = container.scrollWidth / 2;
    const speed = 3;

    const interval = setInterval(() => {
      scrollAmount += speed;
      if (scrollAmount >= scrollWidth) scrollAmount = 0;
      container.scrollLeft = scrollAmount;
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Three.js robotic tech visualization
  useEffect(() => {
    const mount = threeRef.current;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting (glow & tech feel)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00ffff, 1, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Central "robot core"
    const coreGeometry = new THREE.IcosahedronGeometry(0.8, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    // Orbiting tech sprites
    const techGroup = new THREE.Group();
    techs.forEach((tech) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#00ffff";
      ctx.font = "64px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tech.icon, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);

      const radius = 2 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      sprite.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      sprite.scale.set(0.6, 0.6, 0.6);
      techGroup.add(sprite);
    });
    scene.add(techGroup);

    // Connecting lines (tech circuitry vibe)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, opacity: 0.2, transparent: true });
    techGroup.children.forEach((a, i) => {
      techGroup.children.forEach((b, j) => {
        if (i < j) {
          const points = [a.position, b.position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
        }
      });
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      core.rotation.x += 0.01;
      core.rotation.y += 0.01;
      techGroup.rotation.y += 0.001;
      techGroup.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [techs]);

  return (
    <section className="relative py-20 overflow-hidden" id="tech">
      {/* Three.js robotic 3D background */}
      <div ref={threeRef} className="absolute inset-0 w-full h-full z-0"></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-12">
          Technologies we Use
        </h2>

        {/* Horizontal scroll cards */}
        <div ref={containerRef} className="flex gap-6 overflow-x-auto px-6 py-4 hide-scrollbar relative z-10">
          {[...techs, ...techs].map((tech, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-32 sm:w-36 md:w-40 bg-[#12172b] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-md hover:shadow-cyan-500 transform hover:-translate-y-1 hover:scale-105 transition-all duration-500 cursor-pointer text-sm"
              onClick={() => setActiveTech(tech)}
            >
              <span className="text-4xl">{tech.icon}</span>
              <span className="font-medium text-gray-300 mt-1 text-center text-xs sm:text-sm">
                {tech.name}
              </span>
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-xl opacity-0 hover:opacity-25 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
  <p className="mt-8 max-w-3xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed animate-fadeInUp" style={{ animationDelay: '1s' }}>
          <span className="font-extrabold text-white">SupreXon Technologies</span> – Professional Software & Website Development.
          We leverage modern technologies to deliver{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold drop-shadow-[0_0_8px_rgba(149,167,255,0.45)]">
            high-quality web & mobile applications
          </span>{' '}
          for our clients.
        </p>
        {/* Modal */}
        {activeTech && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
            <div className="bg-[#0f1629] p-6 rounded-3xl max-w-sm w-full relative shadow-2xl">
              <button
                onClick={() => setActiveTech(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{activeTech.icon}</span>
                <h3 className="text-2xl font-bold text-yellow-400">{activeTech.name}</h3>
              </div>
              <p className="text-gray-300 text-sm">{activeTech.detail}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}