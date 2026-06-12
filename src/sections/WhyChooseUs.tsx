import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    number: '01',
    title: 'Tajribali Mutaxassislar Jamoasi',
    description:
      "Bizning jamoamiz quyosh energetikasi sohasida 5+ yillik tajribaga ega muhandislar va loyiha menejerlaridan iborat. Har bir loyiha uchun maxsus loyiha guruhi tashkil etiladi.",
    image: '/images/team-engineers.jpg',
    imageAlt: 'Tajribali muhandislar quyosh panellarini tekshirmoqda',
  },
  {
    number: '02',
    title: 'Sifatli va Sertifikatlangan Jihozlar',
    description:
      "Faqat dunyoning yetakchi brendlaridan (JinkoSolar, LONGi, Solis, AUXSOL, Sungrow, Leader) O'zbekiston uchun sertifikatlangan jihozlarni yetkazib beramiz. Har bir komponent to'liq kafolat bilan ta'minlanadi.",
    image: '/images/solar-panels-quality.jpg',
    imageAlt: 'Sifatli sertifikatlangan quyosh panellari',
  },
  {
    number: '03',
    title: "Kalit Topshirish (Turnkey) Tamoyili",
    description:
      "Barcha jarayonni — loyihalashdan qurilishgacha, ruxsatnomalardan ishga tushirishgacha — o'z zimmamizga olamiz. Siz faqat tayyor natijani qabul qilasiz.",
    image: '/images/solar-farm-aerial.jpg',
    imageAlt: 'Toliq qurilgan quyosh elektr stansiyasi',
  },
  {
    number: '04',
    title: "Mahalliy Bozor Bilimi va Tajribasi",
    description:
      "O'zbekiston energetika qonunchiligi, davlat sotib olish jarayonlari va hududiy xususiyatlarini chuqur bilamiz. Bu loyihalarni tezroq va samaraliroq amalga oshirish imkonini beradi.",
    image: '/images/uzbek-solar.jpg',
    imageAlt: "O'zbekiston manzarasi va quyosh panellari",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const isEven = i % 2 === 0;
        const textCol = item.querySelector('.text-col');
        const imgCol = item.querySelector('.img-col');

        gsap.fromTo(
          textCol,
          { opacity: 0, x: isEven ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );

        gsap.fromTo(
          imgCol,
          { opacity: 0, x: isEven ? 30 : -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );

        const numEl = item.querySelector('.adv-number');
        gsap.fromTo(
          numEl,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="bg-warm-white py-20 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-golden-yellow" />
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-golden-yellow">
              Nimaga aynan APEX POWER?
            </span>
          </div>
          <h2
            className="font-heading font-bold text-dark-navy leading-[1.2]"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Sizning Ishonchingiz — Bizning Eng Katta Yutug&apos;imiz
          </h2>
        </div>

        {/* Advantages */}
        <div className="space-y-16">
          {advantages.map((adv, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={adv.number}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={`grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center ${
                  i < advantages.length - 1 ? 'pb-16 border-b border-dark-navy/[0.08]' : ''
                }`}
              >
                {/* Text */}
                <div
                  className={`text-col md:col-span-3 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                  <span className="adv-number font-mono text-4xl md:text-5xl text-golden-yellow/30 block mb-3">
                    {adv.number}
                  </span>
                  <h3 className="font-heading font-bold text-dark-navy text-2xl mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-text-dark leading-[1.7]">{adv.description}</p>
                </div>

                {/* Image */}
                <div
                  className={`img-col md:col-span-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                >
                  <img
                    src={adv.image}
                    alt={adv.imageAlt}
                    className="w-full aspect-[3/2] object-cover rounded-2xl shadow-card"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
