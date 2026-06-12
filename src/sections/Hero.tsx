import { useRef, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';

const SolarScene = lazy(() => import('@/components/SolarScene'));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      0.2
    )
      .fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      )
      .fromTo(
        line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power4.out' },
        0.4
      )
      .fromTo(
        line2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power4.out' },
        0.55
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.7
      )
      .fromTo(
        ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        0.9
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        1.1
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF7ED 0%, #FDE68A 40%, #FBBF24 70%, #F59E0B 100%)',
      }}
    >
      {/* Three.js Canvas */}
      <Suspense fallback={null}>
        <SolarScene />
      </Suspense>

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-end pb-24 md:pb-32 min-h-[100dvh] px-6"
      >
        <div className="max-w-[700px] text-center">
          <p
            ref={labelRef}
            className="text-[13px] font-medium uppercase tracking-[0.15em] text-dark-navy/60 mb-4"
          >
            Quyosh Energiyasi EPC Kompaniyasi
          </p>

          <h1 className="font-display text-dark-navy leading-[1.1]" style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}>
            <span ref={line1Ref} className="block" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              Kelajakni
            </span>
            <span ref={line2Ref} className="block" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              Quyosh Energiyasi Bilan Yoriting
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg text-text-dark max-w-[540px] mx-auto mt-5 leading-relaxed"
          >
            APEX POWER — O&apos;zbekistonda quyosh elektr stansiyalarini loyihalash, qurish va ishga
            tushirish bo&apos;yicha yetakchi EPC kompaniya.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-9">
            <button
              onClick={scrollToContact}
              className="px-8 py-3.5 bg-golden-yellow text-dark-navy text-xs font-medium uppercase tracking-[0.05em] rounded-3xl hover:scale-[1.03] hover:shadow-glow transition-all duration-300"
            >
              Bepul maslahat olish
            </button>
            <button
              onClick={scrollToServices}
              className="px-8 py-3.5 border-2 border-dark-navy text-dark-navy text-xs font-medium uppercase tracking-[0.05em] rounded-3xl hover:bg-dark-navy hover:text-warm-white transition-all duration-300"
            >
              Xizmatlar bilan tanishish
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="relative w-px h-10 bg-dark-navy/30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-golden-yellow animate-scroll-dot" />
          </div>
          <span className="text-[11px] text-text-muted uppercase tracking-[0.1em]">
            Pastga aylantiring
          </span>
        </div>
      </div>
    </section>
  );
}
