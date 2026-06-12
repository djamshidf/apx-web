import { Sun, Phone, Mail, MapPin } from 'lucide-react';

// Inline SVG icons for social platforms
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const serviceLinks = [
  'Quyosh elektr stansiyalari',
  'Enginiring xizmatlari',
  'Montaj va qurilish',
  'Monitoring va texnik xizmat',
];

export default function Footer() {
  return (
    <footer className="bg-deep-blue">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-4 h-4 text-golden-yellow" />
              <span className="font-heading font-bold text-xl text-warm-white">
                APEX POWER
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Yashil energetika sohasida ishonchli hamkoringiz
            </p>
            <div className="flex items-center gap-4">
              <a href="#https://t.me/apex_power" className="text-text-muted hover:text-golden-yellow transition-colors duration-300">
                <TelegramIcon className="w-5 h-5" />
              </a>
              <a href="#https://www.instagram.com/apexpower.uz/" className="text-text-muted hover:text-golden-yellow transition-colors duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="font-heading font-bold text-warm-white mb-4">Xizmatlar</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a href="#services" className="text-text-muted text-sm hover:text-warm-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="font-heading font-bold text-warm-white mb-4">Aloqa</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-golden-yellow flex-shrink-0" />
                <span className="text-text-muted text-sm">+998 (55) 500-00-33</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-golden-yellow flex-shrink-0" />
                <span className="text-text-muted text-sm">info@apexpower.uz</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-golden-yellow flex-shrink-0" />
                <span className="text-text-muted text-sm">Namangan shaxri, A.Temur, 78-uy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-text-muted uppercase tracking-[0.05em]">
            &copy; 2026 APEX POWER. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
