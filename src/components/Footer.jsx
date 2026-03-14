import { useEffect, useState, useRef } from "react";
import logo from "/images/suprexon_logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import * as THREE from "three";

export default function Footer() {
  const [bgIndex, setBgIndex] = useState(0);
  const threeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % 4);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Three.js particle effect
  useEffect(() => {
    const mount = threeRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const particlesCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < particlesCount; i++) {
      positions.push((Math.random() - 0.5) * 10);
      positions.push((Math.random() - 0.5) * 6);
      positions.push((Math.random() - 0.5) * 10);
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines between nearby particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.15,
    });
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    const posArray = geometry.attributes.position.array;
    const connectDistance = 1.5;
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < connectDistance) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(
              posArray[i * 3],
              posArray[i * 3 + 1],
              posArray[i * 3 + 2]
            ),
            new THREE.Vector3(
              posArray[j * 3],
              posArray[j * 3 + 1],
              posArray[j * 3 + 2]
            ),
          ]);
          const line = new THREE.Line(lineGeo, lineMaterial);
          linesGroup.add(line);
        }
      }
    }

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
    <footer className="relative overflow-hidden text-gray-400">
      {/* Three.js Particle Background */}
      <div ref={threeRef} className="absolute inset-0 w-full h-full z-0"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 animate-fadeInUp">
        {/* Logo & About */}
        <div className="space-y-4">
          <img src={logo} alt="SUPREXON Logo" className="w-32 mx-auto md:mx-0" />
          <p className="text-center sm:text-left max-w-md mx-auto sm:mx-0 text-sm sm:text-base leading-relaxed text-gray-300">
            <span className="font-semibold text-white text-base sm:text-lg">SUPREXON Technologies</span> is a professional{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium drop-shadow-md">
              software & app development company
            </span>{' '}
            delivering <span className="text-indigo-300 font-medium">scalable</span> and{' '}
            <span className="text-pink-400 font-medium">innovative digital solutions</span>.
          </p>

          <div className="flex gap-4 pt-2 justify-center md:justify-start">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full
                           bg-gray-800 hover:bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                           text-gray-300 hover:text-white transition-all duration-500 transform hover:scale-110"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h3 className="text-yellow-400 font-bold text-xl">Services</h3>
          <ul className="space-y-3">
            {["Website Development","Software Solutions","Mobile App Development","UI / UX Design"].map((service,i)=>(
              <li key={i} className="relative group flex items-center gap-2 cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:animate-pulse transition-all"></span>
                <span className="font-medium text-gray-300 group-hover:text-gradient bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-500">{service}</span>
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-500"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h3 className="text-yellow-400 font-extrabold text-2xl tracking-wide">Contact</h3>
          <a href="tel:+918982242338" className="flex items-center gap-2 p-2 rounded-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-gray-300 hover:text-white font-medium transition-all duration-500 transform hover:scale-105">
            <span className="text-xl">📞</span>
            <span>+91 89822-42338</span>
          </a>
          <a href="mailto:contact@suprexon.com" className="flex items-center gap-2 p-2 rounded-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-gray-300 hover:text-white font-medium transition-all duration-500 transform hover:scale-105">
            <span className="text-xl">✉️</span>
            <span>contact@suprexon.com</span>
          </a>
          <div className="flex items-center gap-2 p-2 rounded-2xl shadow-lg text-gray-300 font-medium">
            <span className="text-xl">📍</span>
            <span>Pune, Maharashtra, India</span>
          </div>
          <div className="space-y-2 p-2 rounded-2xl shadow-lg text-gray-400 font-medium">
            <p className="flex items-center gap-2">⏰ Mon – Fri: <span className="text-gray-200 font-semibold">08:00 PM – 01:00 AM</span></p>
            <p className="flex items-center gap-2">⏰ Sat – Sun: <span className="text-gray-200 font-semibold">11:00 AM – 06:00 PM</span></p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 mt-6">
        <div className="h-[2px] w-24 mx-auto mb-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse opacity-70"></div>
        <p className="text-center text-gray-400 text-xs sm:text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-white hover:text-gradient hover:bg-clip-text hover:text-transparent from-indigo-400 via-purple-400 to-pink-400 transition-all duration-500">SUPREXON Technologies</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}