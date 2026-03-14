import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

// Background galaxy settings
const galaxyParams = {
  particleCount: 5000,
  galaxyRadius: 5,
};

const serviceBackgrounds = [
  "bg-gradient-to-b from-[#0f0f25] via-[#0b0b1f] to-[#0b0f1a]",
  "bg-gradient-to-b from-[#020617] via-[#1e293b] to-[#020617]",
  "bg-gradient-to-b from-[#09090b] via-[#18181b] to-[#020617]",
  "bg-gradient-to-b from-[#020617] via-[#020617] to-[#1e293b]",
];

export default function Services() {
  const [activePlan, setActivePlan] = useState(null);
  const containerRef = useRef(null);
  const galaxyRef = useRef(null);

  const [bgIndex, setBgIndex] = useState(0);

  const plans = [
    {
      category: "Website Development",
      title: "Basic One-Page Website",
      price: "₹15,000",
      details: [
        "Single-page website (Home, About, Services, Contact in one page)",
        "Responsive Design (Mobile + Desktop)",
        "Contact Form with Email Notifications",
        "Basic SEO Optimization",
        "Free 1 Month Support",
      ],
      extras: [
        "Additional Section: ₹1,500/section",
        "Custom Logo Design: ₹5,000",
        "Advanced SEO: ₹3,000",
        "Blog Section: ₹4,000",
      ],
    },
    {
      category: "Website Development",
      title: "Basic Website (5 Pages)",
      price: "₹20,000",
      details: [
        "5 Pages: Home, About, Services, Contact, Blog/Gallery",
        "Responsive Design (Mobile + Desktop)",
        "Contact Form with Email Notifications",
        "Basic SEO Optimization",
        "Free 1 Month Support",
      ],
      extras: [
        "Additional Page: ₹2,500/page",
        "Custom Logo Design: ₹5,000",
        "Advanced SEO: ₹3,000",
        "Blog System / CMS: ₹4,000",
      ],
    },
    {
      category: "Website Development",
      title: "Business Website",
      price: "₹35,000",
      details: [
        "10–15 Pages with Premium UI Design",
        "Admin Panel for easy content management",
        "WhatsApp & Social Media Integration",
        "SEO Optimized Pages",
        "1 Month Free Support",
      ],
      extras: [
        "Additional Page: ₹3,000/page",
        "Advanced Logo / Branding: ₹6,000",
        "Advanced SEO Package: ₹5,000",
      ],
    },
    {
      category: "Website Development",
      title: "E-Commerce Website",
      price: "₹60,000",
      details: [
        "Product Management & Inventory",
        "Payment Gateway Integration",
        "Order Management System",
        "Admin Dashboard",
        "Security Setup & SSL",
      ],
      extras: [
        "Extra Payment Gateways: ₹3,500 each",
        "Advanced Analytics: ₹4,500",
        "Custom Design: ₹6,500",
      ],
    },
    {
      category: "Website Development",
      title: "Admin Panel",
      price: "₹45,000",
      details: [
        "User & Role Management",
        "Reports & Analytics Dashboard",
        "Data Management & Export",
        "API Integrations",
        "Advanced Security",
      ],
      extras: [
        "Custom Reports: ₹5,500",
        "API Extensions: ₹7,500",
      ],
    }, {
      category: "Android App Development",
      title: "Basic Android App",
      price: "₹40,000",
      details: [
        "Android App (Android Studio)",
        "Java / Kotlin Based App",
        "PHP REST API Integration",
        "MySQL / SQL Database",
        "Basic Admin Panel",
      ],
      extras: [
        "Firebase Push Notifications: ₹4,000",
        "Play Store Upload Support: ₹3,000",
        "Maintenance: ₹5,000 / month",
      ],
    },
    {
      category: "Android App Development",
      title: "Business Android App",
      price: "₹70,000",
      details: [
        "Advanced Android App (Android Studio)",
        "User Login, Roles & Permissions",
        "PHP API + MySQL Database",
        "Admin Dashboard (Web)",
        "Security & Performance Optimization",
      ],
      extras: [
        "Payment Gateway Integration: ₹6,000",
        "Advanced Reports & Analytics: ₹5,000",
        "Cloud Hosting Setup: ₹4,000",
      ],
    },
  ];
useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollWidth = container.scrollWidth / 2;

    const interval = setInterval(() => {
      scrollAmount += 1;
      if (scrollAmount >= scrollWidth) scrollAmount = 0;

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Background gradient change
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % serviceBackgrounds.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Three.js Galaxy Background
  useEffect(() => {
    const mount = galaxyRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < galaxyParams.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * galaxyParams.galaxyRadius;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 2;
      const z = Math.sin(angle) * radius;
      positions.push(x, y, z);
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
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
  }, []);

  return (
    <section
      id="services"
      className="relative py-24 text-white overflow-hidden"
    >
      {/* 3D Galaxy Background */}
      <div
        ref={galaxyRef}
        className="absolute inset-0 w-full h-full z-0"
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-[1]"></div>

      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-yellow-400 mb-16 relative z-10">
        Website & Android App Development Plans
      </h2>

      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="relative z-10 flex gap-6 overflow-x-auto px-6 sm:px-12 py-8 scroll-smooth snap-x snap-mandatory hide-scrollbar"
      >
        {[...plans, ...plans].map((plan, i) => (
          <div
            key={i}
            className={`flex-shrink-0 w-[80%] sm:w-[45%] lg:w-[30%] bg-gradient-to-br from-[#1b1f38]/60 to-[#12172b]/80 backdrop-blur-md border border-gray-700 rounded-3xl p-6 flex flex-col justify-between shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-transform duration-500 cursor-pointer snap-start mx-auto sm:mx-0`}
          >
            <span className="text-xs text-indigo-300 font-semibold">
              {plan.category}
            </span>

            <h3 className="mb-3 text-lg sm:text-xl font-bold text-yellow-400 text-center">
              {plan.title}
            </h3>

            <span className="mx-auto inline-flex items-center justify-center bg-yellow-400/90 text-black px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-[0_0_12px_rgba(250,204,21,0.6)]">
              {plan.price}
            </span>

            <ul className="mb-4 text-gray-300 text-sm space-y-1">
              {plan.details.slice(0, 3).map((item, index) => (
                <li key={index}>✔ {item}</li>
              ))}
              {plan.details.length > 3 && (
                <li className="text-indigo-300 font-semibold">…and more</li>
              )}
            </ul>

            <button
              onClick={() => setActivePlan(plan)}
              className="mt-auto bg-indigo-500 hover:bg-indigo-400 text-white text-center py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-indigo-300"
            >
              View Full Plan →
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activePlan && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4">
          <div className="bg-[#0f1629] p-8 rounded-3xl max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setActivePlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-2 text-yellow-400">
              {activePlan.title}
            </h3>
            <p className="font-bold mb-4">{activePlan.price}</p>

            <h4 className="font-semibold mb-2 text-indigo-300">Features:</h4>
            <ul className="space-y-2 text-sm text-gray-300 mb-4">
              {activePlan.details.map((item, index) => (
                <li key={index}>✔ {item}</li>
              ))}
            </ul>

            {activePlan.extras && (
              <>
                <h4 className="font-semibold mb-2 text-indigo-300">Optional Add-ons:</h4>
                <ul className="space-y-2 text-sm text-gray-400 mb-4">
                  {activePlan.extras.map((item, index) => (
                    <li key={index}>➕ {item}</li>
                  ))}
                </ul>
              </>
            )}

            <a
              href="#contact"
              onClick={() => setActivePlan(null)}
              className="block mt-4 bg-yellow-400 text-black text-center py-3 rounded-full font-bold hover:scale-105 transition"
            >
              Get This Plan
            </a>
          </div>
        </div>
      )}
    </section>
  );
}