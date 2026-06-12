import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    label: 'Telefon',
    value: '+998 (50) 500-00-33',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@apexpower.uz',
  },
  {
    icon: MapPin,
    label: 'Manzil',
    value: "Namangan shaxri, A.Temur ko'chasi, 78-uy",
  },
  {
    icon: Clock,
    label: 'Ish vaqti',
    value: 'Dushanba-Shanba: 09:00 - 19:00',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);

      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  } catch (error) {
    console.error(error);
    alert('Xatolik yuz berdi');
  }
};
  };

  const inputClasses =
    "w-full h-[52px] rounded-lg border border-warm-white/20 bg-warm-white/5 text-warm-white placeholder:text-warm-white/30 px-4 text-sm outline-none transition-colors duration-300 focus:border-golden-yellow";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-deep-blue py-24 md:py-28 px-6 md:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left - Form */}
          <div ref={formRef} className="md:col-span-7">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-golden-yellow block mb-4">
              Aloqa
            </span>
            <h2
              className="font-display text-warm-white leading-[1.15] mb-4"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Quyosh Energiyasiga O&apos;tishni Rejalashtiryapsizmi?
            </h2>
            <p className="text-lg text-warm-white/70 max-w-[480px] mb-8">
              Biz bilan bog&apos;laning va quyosh elektr stansiyasi o&apos;rnatish imkoniyatlari haqida bepul
              maslahat oling.
            </p>

            {submitted ? (
              <div className="bg-golden-yellow/10 border border-golden-yellow/30 rounded-2xl p-8 text-center">
                <p className="text-golden-yellow font-heading font-bold text-xl mb-2">
                  Rahmat!
                </p>
                <p className="text-warm-white/70">
                  Xabaringiz qabul qilindi. Tez orada siz bilan bog&apos;lanamiz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs text-warm-white/60 uppercase tracking-wider mb-1.5">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    placeholder="Ismingizni kiriting"
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-warm-white/60 uppercase tracking-wider mb-1.5">
                      Telefon raqamingiz
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 XX XXX XX XX"
                      className={inputClasses}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-warm-white/60 uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className={inputClasses}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-warm-white/60 uppercase tracking-wider mb-1.5">
                    Xabar
                  </label>
                  <textarea
                    placeholder="Qanday yordam bera olamiz?"
                    className={`${inputClasses} h-[120px] py-3 resize-none`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-[52px] bg-golden-yellow text-dark-navy text-sm font-medium uppercase tracking-wider rounded-lg hover:scale-[1.01] hover:shadow-glow transition-all duration-300"
                >
                  Xabar yuborish
                </button>
              </form>
            )}
          </div>

          {/* Right - Contact Info */}
          <div ref={infoRef} className="md:col-span-5 flex flex-col justify-center">
            <div className="space-y-7">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-golden-yellow/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-golden-yellow" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs text-warm-white/50 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-warm-white text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
