import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
  delay: number;
}

function StatItem({ value, suffix, label, trigger, delay }: StatItemProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const timeout = setTimeout(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        delay,
        ease: 'power2.out',
        snap: suffix.includes('%') ? undefined : { val: 1 },
        onUpdate: () => {
          if (ref.current) {
            if (suffix.includes('%')) {
              ref.current.textContent = Math.round(obj.val) + suffix;
            } else {
              ref.current.textContent = Math.round(obj.val) + suffix;
            }
          }
        },
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [trigger, value, suffix, delay]);

  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref}
        className="font-mono text-golden-yellow leading-none"
        style={{ fontSize: 'clamp(48px, 8vw, 80px)' }}
      >
        0{suffix}
      </span>
      <span className="text-sm uppercase tracking-wider text-warm-white/60 mt-2">{label}</span>
    </div>
  );
}

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => setTrigger(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 300, suffix: '+', label: 'Yakunlangan loyiha' },
    { value: 8, suffix: '+', label: "MW o'rnatilgan quvvat" },
    { value: 3, suffix: '', label: 'Yillik kafolat' },
    { value: 98, suffix: '%', label: 'Mijozlar mamnuniyati' },
  ];

  return (
    <section ref={sectionRef} className="bg-deep-blue py-24 md:py-28 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef} className="text-center mb-14">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-golden-yellow block mb-4">
            Raqamlarda
          </span>
          <h2
            className="font-display text-warm-white"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            Bizning Yutuqlarimiz
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative flex justify-center">
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                trigger={trigger}
                delay={i * 0.2}
              />
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[60px] bg-warm-white/15" />
              )}
            </div>
          ))}
        </div>

        <p className="text-warm-white/50 text-center max-w-[480px] mx-auto mt-12 leading-relaxed">
          Har bir raqam bizning mijozlarimizga bergan va&apos;damiz va professional yondashuvimizning
          natijasi.
        </p>
      </div>
    </section>
  );
}
