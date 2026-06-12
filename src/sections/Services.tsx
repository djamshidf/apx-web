import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Package, HardHat, ShieldCheck, Monitor, Wrench, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const mainServices = [
  {
    icon: Compass,
    title: 'Loyihalash va Texnik Hujjatlar',
    description:
      "Quyosh elektr stansiyalarining to'liq loyihalash, geologik va topografik tadqiqotlar, quvvat hisob-kitoblari, elektr tarmoqlariga ulash sxemalari va barcha zarur texnik hujjatlarni tayyorlash.",
  },
  {
    icon: Package,
    title: 'Jihozlar va Komponentlar',
    description:
      "Dunyoning yetakchi ishlab chiqaruvchilaridan sifatli quyosh panellari, invertorlar, konstruksiyalar va kabel mahsulotlarini tanlash va yetkazib berish. Eng yaxshi narxlarda sifat kafolati.",
  },
  {
    icon: HardHat,
    title: 'Montaj va Qurilish Ishlari',
    description:
      "Professional mutaxassislar jamoasi tomonidan stansiyaning to'liq qurilishi, panellar o'rnatilishi, elektr tizimlari montaji va tekshirilishi. Ishlar O'zbekiston me'yorlari va xalqaro standartlar asosida.",
  },
];

const additionalServices = [
  { icon: ShieldCheck, label: "Kafolat va Sug'urta" },
  { icon: Monitor, label: 'Masofadan Monitoring' },
  { icon: Wrench, label: 'Texnik Xizmat' },
  { icon: Zap, label: 'Energiya Samaradorligi' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        extraRef.current?.children || [],
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: extraRef.current, start: 'top 90%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-cool-mint py-20 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-golden-yellow" />
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-golden-yellow">
              Xizmatlarimiz
            </span>
          </div>
          <h2
            className="font-heading font-bold text-dark-navy leading-[1.2] max-w-[600px]"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Quyosh Energiyasida To&apos;liq Xizmat Ko&apos;rsatish
          </h2>
          <p className="text-text-dark leading-relaxed max-w-[560px] mt-3">
            Loyiha boshlang&apos;ich konsepsiyasidan to&apos;liq ishga tushirilishigacha — biz har bir
            bosqichda sizning yoningizdamiz.
          </p>
        </div>

        {/* Main Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainServices.map((service) => (
            <div
              key={service.title}
              className="bg-warm-white rounded-2xl p-8 border border-dark-navy/[0.08] group hover:-translate-y-1.5 hover:shadow-card-hover hover:border-golden-yellow/30 transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            >
              <service.icon className="w-10 h-10 text-golden-yellow mb-5" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-dark-navy text-xl mb-3">{service.title}</h3>
              <p className="text-text-muted text-[15px] leading-[1.6]">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div
          ref={extraRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {additionalServices.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-golden-yellow/10 flex items-center justify-center mb-2">
                <item.icon className="w-6 h-6 text-golden-yellow" strokeWidth={1.5} />
              </div>
              <span className="text-sm text-text-dark">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
