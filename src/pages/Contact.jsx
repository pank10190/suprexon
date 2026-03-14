import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "Website", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const threeRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", service: "Website", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Three.js Particle Background
  useEffect(() => {
    const mount = threeRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < particlesCount; i++) {
      positions.push((Math.random() - 0.5) * 10);
      positions.push((Math.random() - 0.5) * 6);
      positions.push((Math.random() - 0.5) * 10);
    }
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines connecting particles
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.2 });
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    const connectDistance = 1.5;
    const positionsArray = geometry.attributes.position.array;
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < connectDistance) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(positionsArray[i*3], positionsArray[i*3+1], positionsArray[i*3+2]),
            new THREE.Vector3(positionsArray[j*3], positionsArray[j*3+1], positionsArray[j*3+2])
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          linesGroup.add(line);
        }
      }
    }

    // Animate particles rotation
    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0005;
      linesGroup.rotation.y += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

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
  }, []);

  return (
    <section
      id="contact"
      className="relative py-20 text-white overflow-hidden"
    >
      {/* Three.js particle background */}
      <div ref={threeRef} className="absolute inset-0 w-full h-full z-0"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-yellow-400 text-center mb-12">
          Free Consultation
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Info Card */}
          <div className="flex-1 flex flex-col justify-center gap-8 bg-gradient-to-br from-[#151a33]/80 to-[#0f1326]/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-400/20 rounded-full blur-3xl"></div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-wide relative z-10">
              Contact Information
            </h3>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">📞</div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-200">+91 89822 42338</p>
              </div>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center text-xl">✉️</div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg sm:text-xl font-semibold text-gray-200">contact@suprexon.com</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed relative z-10">
              Get in touch with us for a <span className="text-yellow-400 font-semibold">free consultation</span>. Our experts will respond quickly.
            </p>
          </div>

          {/* Contact Form */}
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="relative bg-gradient-to-br from-[#151a33]/80 to-[#0f1326]/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-indigo-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col gap-5 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>

              <h3 className="relative z-10 text-2xl font-extrabold text-yellow-400 mb-2">
                Send Your Enquiry
              </h3>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="👤 Your Name"
                required
                className="relative z-10 px-4 py-3 rounded-xl border border-gray-700 bg-[#0f1629] focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 shadow-sm w-full"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="✉️ Your Email"
                required
                className="relative z-10 px-4 py-3 rounded-xl border border-gray-700 bg-[#0f1629] focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 shadow-sm w-full"
              />
              <div className="relative z-10">
                <label className="block text-sm text-gray-300 font-semibold mb-2">
                  Select Service
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0f1629] border border-gray-700 cursor-pointer hover:border-yellow-400 transition">
                    <input
                      type="radio"
                      name="service"
                      value="Website"
                      checked={form.service === "Website"}
                      onChange={handleChange}
                      className="accent-yellow-400"
                    />
                    <span className="text-gray-200">🌐 Website</span>
                  </label>
                  <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0f1629] border border-gray-700 cursor-pointer hover:border-yellow-400 transition">
                    <input
                      type="radio"
                      name="service"
                      value="App"
                      checked={form.service === "App"}
                      onChange={handleChange}
                      className="accent-yellow-400"
                    />
                    <span className="text-gray-200">📱 Mobile App</span>
                  </label>
                </div>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="📝 Tell us about your project"
                rows="5"
                required
                className="relative z-10 px-4 py-3 rounded-xl border border-gray-700 bg-[#0f1629] focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200 shadow-sm resize-none w-full"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black py-3 rounded-full font-bold text-sm shadow-lg hover:scale-105 hover:shadow-yellow-400/40 transition"
              >
                {loading ? "Submitting..." : "Send Enquiry"}
              </button>
              {status === "success" && <p className="relative z-10 text-green-400 text-center font-semibold mt-2">✅ Thank you! Your enquiry has been submitted.</p>}
              {status === "error" && <p className="relative z-10 text-red-400 text-center font-semibold mt-2">❌ Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}