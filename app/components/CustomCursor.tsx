"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = -200, ty = -200;
    let rx = -200, ry = -200;
    let gx = -200, gy = -200;
    let visible = false;
    let raf: number;

    const setT3d = (el: HTMLDivElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };

    const tick = () => {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      gx += (tx - gx) * 0.055;
      gy += (ty - gy) * 0.055;

      if (dotRef.current)  setT3d(dotRef.current,  tx - 3,   ty - 3);
      if (ringRef.current) setT3d(ringRef.current,  rx - 17,  ry - 17);
      if (glowRef.current) setT3d(glowRef.current,  gx - 160, gy - 160);

      raf = requestAnimationFrame(tick);
    };

    const show = () => {
      if (visible) return;
      visible = true;
      dotRef.current  && (dotRef.current.style.opacity  = "1");
      ringRef.current && (ringRef.current.style.opacity = "1");
      glowRef.current && (glowRef.current.style.opacity = "1");
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      show();
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", () => {
      visible = false;
      dotRef.current  && (dotRef.current.style.opacity  = "0");
      ringRef.current && (ringRef.current.style.opacity = "0");
      glowRef.current && (glowRef.current.style.opacity = "0");
    });

    const onEnter = () => {
      ringRef.current && Object.assign(ringRef.current.style, {
        width: "52px", height: "52px",
        borderColor: "#E91E8C",
        backgroundColor: "rgba(233,30,140,0.08)",
      });
      dotRef.current && Object.assign(dotRef.current.style, {
        background: "#E91E8C",
        boxShadow: "0 0 14px #E91E8C, 0 0 28px rgba(233,30,140,0.4)",
      });
    };
    const onLeave = () => {
      ringRef.current && Object.assign(ringRef.current.style, {
        width: "34px", height: "34px",
        borderColor: "rgba(255,255,255,0.35)",
        backgroundColor: "transparent",
      });
      dotRef.current && Object.assign(dotRef.current.style, {
        background: "#FF6BB5",
        boxShadow: "0 0 6px #FF6BB5",
      });
    };

    const bind = () => {
      document.querySelectorAll("a,button,input,textarea,select").forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    bind();
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0, left: 0,
    borderRadius: "50%",
    pointerEvents: "none",
    willChange: "transform",
    opacity: 0,
    transform: "translate3d(-200px,-200px,0)",
  };

  return (
    <>
      <div ref={glowRef} style={{
        ...base,
        width: 320, height: 320,
        background: "radial-gradient(circle, rgba(233,30,140,0.18) 0%, rgba(37,99,235,0.10) 45%, transparent 70%)",
        mixBlendMode: "screen",
        zIndex: 9996,
        transition: "opacity 0.3s",
      }} />
      <div ref={ringRef} style={{
        ...base,
        width: 34, height: 34,
        border: "1px solid rgba(255,255,255,0.35)",
        zIndex: 9998,
        transition: "opacity 0.3s, width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
      }} />
      <div ref={dotRef} style={{
        ...base,
        width: 6, height: 6,
        background: "#FF6BB5",
        boxShadow: "0 0 6px #FF6BB5",
        zIndex: 9999,
        transition: "opacity 0.3s, background 0.2s ease, box-shadow 0.2s ease",
      }} />
    </>
  );
}
