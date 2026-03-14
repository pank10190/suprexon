// src/components/CustomCursor.jsx
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const trail = useRef([]);
  const hue = useRef(220);

  const TRAIL_LENGTH = 10;
  const trailDivs = useRef([]);
  const cursorDiv = useRef(null);

  // Detect mobile
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  useEffect(() => {
    if (isMobile) return;

    // Create trail divs dynamically
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.pointerEvents = "none";
      div.style.borderRadius = "50%";
      div.style.zIndex = "55"; // header z-50 ke upar
      div.style.width = div.style.height = "8px";
      div.style.filter = "blur(4px)";
      document.body.appendChild(div);
      trailDivs.current.push(div);
    }

    // Create main cursor div
    const mainCursor = document.createElement("div");
    mainCursor.style.position = "fixed";
    mainCursor.style.pointerEvents = "none";
    mainCursor.style.borderRadius = "50%";
    mainCursor.style.zIndex = "60"; // sabse upar
    mainCursor.style.width = "18px";
    mainCursor.style.height = "18px";
    mainCursor.style.border = "1px solid rgba(255,255,255,0.35)";
    mainCursor.style.transition = "all 0.2s ease-out";
    document.body.appendChild(mainCursor);
    cursorDiv.current = mainCursor;

    let hoverTarget = null;
    let hover = false;

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const hoverOn = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      hover = true;
      hoverTarget = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };
    const hoverOff = () => {
      hover = false;
      hoverTarget = null;
    };

    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", hoverOn);
      el.addEventListener("mouseleave", hoverOff);
    });

    const animate = () => {
      // Magnetic / smooth target
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;

      if (hover && hoverTarget) {
        const dx = hoverTarget.x - cursor.current.x;
        const dy = hoverTarget.y - cursor.current.y;
        targetX += dx * 0.35;
        targetY += dy * 0.35;
      }

      // Smooth follow
      cursor.current.x += (targetX - cursor.current.x) * 0.18;
      cursor.current.y += (targetY - cursor.current.y) * 0.18;

      hue.current = (hue.current + 0.6) % 360;

      // Update trail
      trail.current.push({ x: cursor.current.x, y: cursor.current.y });
      if (trail.current.length > TRAIL_LENGTH) trail.current.shift();

      // Render trail divs directly
      trail.current.forEach((p, i) => {
        const size = 4 + i * 1.5;
        const stretch = hover ? i * 0.7 : 0;
        const div = trailDivs.current[i];
        if (div) {
          div.style.left = p.x - stretch + "px";
          div.style.top = p.y - stretch / 2 + "px";
          div.style.width = size + stretch + "px";
          div.style.height = size + "px";
          div.style.background = `radial-gradient(circle,
            hsla(${hue.current + i * 20},90%,70%,0.8),
            transparent 70%)`;
          div.style.opacity = i / TRAIL_LENGTH;
        }
      });

      // Render main cursor
      if (cursorDiv.current) {
        cursorDiv.current.style.left = cursor.current.x + "px";
        cursorDiv.current.style.top = cursor.current.y + "px";
        cursorDiv.current.style.width = hover ? "28px" : "18px";
        cursorDiv.current.style.height = hover ? "28px" : "18px";
        cursorDiv.current.style.background = `linear-gradient(135deg,
          hsl(${hue.current},90%,60%),
          hsl(${hue.current + 40},90%,65%))`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", hoverOn);
        el.removeEventListener("mouseleave", hoverOff);
      });
      trailDivs.current.forEach((div) => document.body.removeChild(div));
      if (cursorDiv.current) document.body.removeChild(cursorDiv.current);
    };
  }, []);

  return null; // no React JSX → direct DOM
}