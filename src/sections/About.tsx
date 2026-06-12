import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  suffix?: string;
  trigger: boolean;
}

function CountUp({ end, suffix = '', trigger }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: 1.5,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val) + suffix;
        }
      },
    });
  }, [trigger, end]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => setStatsVisible(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-warm-white py-20 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left - Text */}
        <div ref={leftRef}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-golden-yellow" />
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-golden-yellow">
              Biz haqimizda
            </span>
          </div>

          <h2
            className="font-heading font-bold text-dark-navy leading-[1.2] mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            O&apos;zbekiston Respublikasiga sifatli yashil energiya mahsulotlarini o'rnatadigan jamoa!
          </h2>

          <div className="space-y-4 text-text-dark leading-[1.7] max-w-[520px]">
            <p>
              APEX POWER — bu O&apos;zbekiston bo&apos;ylab quyosh elektr stansiyalarini tashkil etish
              bo&apos;yicha maxsus EPC (Engineering, Procurement, Construction) kompaniyasi. Biz 2022-yildan
              beri faoliyat yuritib kelmoqdamiz va shu vaqt ichida 300 dan ortiq muvaffaqiyatli loyihalarni
              yakunladik.
            </p>
            <p>
              Bizning jamoamiz yashil energetika sohasida 5 yillik tajribaga ega mutaxassislar,
              loyihalash muhandislari va qurilish menejerlaridan tashkil topgan. Har bir loyiha biz uchun
              nafaqat biznes, balki kelajak avlodlar uchun toza muhitni ta&apos;minlash imkoniyati.
            </p>
            <p>
              O&apos;zbekiston yillik 300 dan ortiq quyoshli kunlarga ega — bu quyosh energetikasini
              rivojlantirish uchun mukammal sharoit. APEX POWER sifatida biz ushbu tabiiy boylikdan
              unumli foydalanish va mamlakatni barqaror energiya manbalari bilan ta&apos;minlash missiyasini
              o&apos;z zimmamizga oldik.
            </p>
          </div>

          {/* Stats Mini-Row */}
          <div ref={statsRef} className="flex flex-wrap items-center gap-6 md:gap-10 mt-9">
            <div>
              <p className="font-mono text-2xl md:text-[28px] text-golden-yellow">
                <CountUp end={300} suffix="+" trigger={statsVisible} />
              </p>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Yakunlangan loyihalar</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-dark-navy/10" />
            <div>
              <p className="font-mono text-2xl md:text-[28px] text-golden-yellow">
                <CountUp end={8} suffix="+ MW" trigger={statsVisible} />
              </p>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">O&apos;rnatilgan quvvat</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-dark-navy/10" />
            <div>
              <p className="font-mono text-2xl md:text-[28px] text-golden-yellow">
                <CountUp end={5} suffix=" yil+" trigger={statsVisible} />
              </p>
              <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Mutaxassis tajribasi</p>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div ref={rightRef} className="relative">
          <img
            src="/images/about-solar.jpg"
            alt="Quyosh elektr stansiyasi — O'zbekiston manzarasi"
            className="w-full aspect-[4/3] object-cover rounded-2xl shadow-card"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
