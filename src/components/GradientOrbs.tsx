import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GradientOrbs() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbs = [
      { ref: orb1Ref, start: { x: '-10%', y: '-10%' }, end: { x: 'calc(100% - 400px)', y: 'calc(100% - 400px)' }, color: '#FBBF24' },
      { ref: orb2Ref, start: { x: '-15%', y: '30%' }, end: { x: 'calc(100% - 400px)', y: '30%' }, color: '#1E3A5F' },
      { ref: orb3Ref, start: { x: '-10%', y: '70%' }, end: { x: 'calc(100% - 400px)', y: '70%' }, color: '#E0F2F1' },
    ];

    const animations: gsap.core.Tween[] = [];

    orbs.forEach((orb) => {
      if (!orb.ref.current) return;
      const anim = gsap.to(orb.ref.current, {
        left: orb.end.x,
        top: orb.end.y,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
      animations.push(anim);
    });

    return () => {
      animations.forEach((a) => a.kill());
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === document.body) st.kill();
      });
    };
  }, []);

  const orbStyle = (color: string): React.CSSProperties => ({
    position: 'fixed',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    filter: 'blur(100px)',
    opacity: 0.15,
    zIndex: 0,
    pointerEvents: 'none',
    background: color,
  });

  return (
    <>
      <div
        ref={orb1Ref}
        style={{
          ...orbStyle('#FBBF24'),
          left: '-10%',
          top: '-10%',
        }}
      />
      <div
        ref={orb2Ref}
        style={{
          ...orbStyle('#1E3A5F'),
          left: '-15%',
          top: '30%',
        }}
      />
      <div
        ref={orb3Ref}
        style={{
          ...orbStyle('#E0F2F1'),
          left: '-10%',
          top: '70%',
        }}
      />
    </>
  );
}
