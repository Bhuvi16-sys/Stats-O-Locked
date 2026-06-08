import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef();
  const pos = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });
  const rafId = useRef();

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };

    const loop = () => {
      // Lerp toward target for butter-smooth trailing
      current.current.x += (pos.current.x - current.current.x) * 0.12;
      current.current.y += (pos.current.y - current.current.y) * 0.12;
      if (glowRef.current) {
        // transform-only: zero layout cost, GPU composited
        glowRef.current.style.transform = `translate(${current.current.x - 175}px, ${current.current.y - 175}px)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div id="cursor-glow" ref={glowRef} />;
}
