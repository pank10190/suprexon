import { useEffect, useRef } from "react";

export default function WaterCursor() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const points = useRef([]);

  const MAX_POINTS = 40;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add point
      points.current.push({
        x: mouse.current.x,
        y: mouse.current.y,
        vx: 0,
        vy: 0,
      });

      if (points.current.length > MAX_POINTS) points.current.shift();

      // Smooth physics
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        const prev = points.current[i - 1];
        if (prev) {
          p.vx += (prev.x - p.x) * 0.04;
          p.vy += (prev.y - p.y) * 0.04;
        }
        p.vx *= 0.75;
        p.vy *= 0.75;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw river
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        const size = 18 - i * 0.3;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          size
        );

        gradient.addColorStop(0, "rgba(120,220,255,0.9)");
        gradient.addColorStop(0.4, "rgba(60,160,255,0.45)");
        gradient.addColorStop(1, "rgba(60,160,255,0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999]"
    />
  );
}