import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef   = useRef();
  const innerRef = useRef();
  const outerRef = useRef();
  const glowRef  = useRef();

  const mouse       = useRef({ x: -999, y: -999 });
  const dot         = useRef({ x: -999, y: -999 }); // lerps with inner — always centred in the ring
  const inner       = useRef({ x: -999, y: -999 });
  const outer       = useRef({ x: -999, y: -999 });
  const glow        = useRef({ x: -999, y: -999 });
  const innerScale  = useRef(1);
  const outerScale  = useRef(1);
  const dotRotation = useRef(0);
  const hovering    = useRef(false);
  const rafId       = useRef();

  useEffect(() => {
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };

    const onOver = (e) => {
      if (!hovering.current && e.target.closest('a,button,[role="button"],input,select,textarea')) {
        hovering.current = true;
        dotRef.current?.classList.add('cur-hover');
        innerRef.current?.classList.add('cur-hover');
        outerRef.current?.classList.add('cur-hover');
      }
    };
    const onOut = (e) => {
      if (hovering.current && e.target.closest('a,button,[role="button"],input,select,textarea')) {
        hovering.current = false;
        dotRef.current?.classList.remove('cur-hover');
        innerRef.current?.classList.remove('cur-hover');
        outerRef.current?.classList.remove('cur-hover');
      }
    };

    const loop = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Crosshair + inner ring share the same lerp so crosshair is always centred in the ring
      const LERP_INNER = 0.22;
      dot.current.x   += (mx - dot.current.x)   * LERP_INNER;
      dot.current.y   += (my - dot.current.y)   * LERP_INNER;
      inner.current.x += (mx - inner.current.x) * LERP_INNER;
      inner.current.y += (my - inner.current.y) * LERP_INNER;

      dotRotation.current += ((hovering.current ? 45 : 0) - dotRotation.current) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${dot.current.x - 9}px, ${dot.current.y - 9}px) rotate(${dotRotation.current.toFixed(1)}deg)`;
      }
      innerScale.current += ((hovering.current ? 1.4 : 1) - innerScale.current) * 0.14;
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${inner.current.x - 14}px, ${inner.current.y - 14}px) scale(${innerScale.current})`;
      }

      // Outer ring: slower lerp + scale
      outer.current.x += (mx - outer.current.x) * 0.13;
      outer.current.y += (my - outer.current.y) * 0.13;
      outerScale.current += ((hovering.current ? 1.45 : 1) - outerScale.current) * 0.11;
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${outer.current.x - 24}px, ${outer.current.y - 24}px) scale(${outerScale.current})`;
      }

      // Glow blob: very slow trail
      glow.current.x += (mx - glow.current.x) * 0.07;
      glow.current.y += (my - glow.current.y) * 0.07;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.current.x - 175}px, ${glow.current.y - 175}px)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"   ref={dotRef}   />
      <div id="cursor-inner" ref={innerRef}><div className="cur-arc" /></div>
      <div id="cursor-outer" ref={outerRef}><div className="cur-arc" /></div>
      <div id="cursor-glow"  ref={glowRef}  />
    </>
  );
}
