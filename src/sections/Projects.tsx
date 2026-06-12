import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/images/project-tashkent.jpg",
    name: "Suv nasoslari uchun",
    location: "Namangan viloyati",
    capacity: "180 kW",
    description:
      "Aholining yirik qismini hamda fermer xo'jaliklari uchun suv yetkazib berish stansiyasi. Yillik 288 MWh toza energiya ishlab chiqaradi.",
  },
  {
    image: "/images/project-samarkand.jpg",
    name: "Kosonsoy yashil maydon fermer xo'jaligi",
    location: "Namangan viloyati",
    capacity: "140 kW",
    description:
      "Kosonsoy tumanida qurilgan 140 kW quvvatli yer ustidagi quyosh elektr stansiyasi. Fermer xo'jaligini to'liq suv bilan ta'minlaydi, qolgan payt esa passiv daromad olib keladi.",
  },
  {
    image: "/images/project-bukhara.jpg",
    name: "Isparon qishlog'iga yordamchi energiya stansiyasi",
    location: "Namangan viloyati",
    capacity: "400 kW",
    description:
      "Isparon qishloq aholisi uchun 400 kW quvvatli quyosh stansiyasi. 150 ga yaqin xonadonlarni elektr bilan ta'minlashga yordamlashadi.",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        gridRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-warm-white py-20 md:py-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-golden-yellow" />
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-golden-yellow">
              Loyihalarimiz
            </span>
          </div>
          <h2
            className="font-heading font-bold text-dark-navy leading-[1.2]"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Oxirgi Amalga Oshirilgan Loyihalar
          </h2>
          <p className="text-text-dark leading-relaxed max-w-[560px] mt-3">
            Bizning loyihalarimiz O&apos;zbekistonning turli viloyatlarida joylashgan va turli
            miqyosdagi iste&apos;molchilarga xizmat qiladi.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Default overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/85 via-transparent to-transparent" />

              {/* Default content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-400 group-hover:opacity-0">
                <p className="text-xs uppercase tracking-wider text-warm-white/70 mb-1">
                  {project.location}
                </p>
                <h3 className="font-heading font-bold text-xl text-warm-white">
                  {project.name}
                </h3>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                <p className="font-mono text-2xl text-golden-yellow mb-2">
                  {project.capacity}
                </p>
                <p className="text-sm text-warm-white/80 leading-relaxed max-w-[80%] mb-3">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-golden-yellow">
                  <span className="text-xs font-medium uppercase tracking-wider">Batafsil</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.05em] text-golden-yellow hover:gap-3 transition-all duration-300">
            Barcha loyihalarni ko&apos;rish
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
