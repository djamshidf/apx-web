import { useState, useEffect } from 'react';
import { Menu, X, Sun } from 'lucide-react';

const navLinks = [
  { label: 'Bosh sahifa', href: '#hero' },
  { label: 'Xizmatlar', href: '#services' },
  { label: "Nima uchun biz?", href: '#why-us' },
  { label: 'Aloqa', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-400 ${
          scrolled
            ? 'bg-warm-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <button onClick={() => scrollTo('#hero')} className="flex items-center gap-2 group">
          <Sun className="w-4 h-4 text-golden-yellow" />
          <span className="font-heading font-bold text-xl text-dark-navy tracking-tight">
            APEX POWER
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-xs font-medium uppercase tracking-[0.05em] text-dark-navy hover:text-golden-yellow transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="px-6 py-2.5 bg-golden-yellow text-dark-navy text-xs font-medium uppercase tracking-[0.05em] rounded-3xl hover:scale-[1.03] hover:shadow-glow transition-all duration-300"
          >
            Bepul maslahat
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-dark-navy"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-warm-white/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-2xl font-heading font-bold text-dark-navy hover:text-golden-yellow transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-4 px-8 py-3 bg-golden-yellow text-dark-navy text-sm font-medium rounded-3xl"
          >
            Bepul maslahat olish
          </button>
        </div>
      </div>
    </>
  );
}
