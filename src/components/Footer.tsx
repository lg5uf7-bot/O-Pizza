import { Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../i18n';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-dark-900 text-stone-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link to={`/${lang}`} className="flex items-center justify-start mb-6">
              <img src="/logo.png" alt="O'Pizza Logo" className="h-16 w-auto" loading="lazy" />
            </Link>
            <p className="text-stone-400 leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61557458747633" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/opi_zza/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@opizzasafi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t.footer.links}</h4>
            <ul className="space-y-4">
              <li><Link to={`/${lang}`} className="text-stone-400 hover:text-brand-500 transition-colors">{t.nav.home}</Link></li>
              <li><Link to={`/${lang}#menu`} className="text-stone-400 hover:text-brand-500 transition-colors">{t.nav.menu}</Link></li>
              <li><Link to={`/${lang}#about`} className="text-stone-400 hover:text-brand-500 transition-colors">{t.nav.about}</Link></li>
            </ul>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t.footer.menu}</h4>
            <ul className="space-y-4">
              <li><Link to={`/${lang}#menu`} className="text-stone-400 hover:text-brand-500 transition-colors">O'Pizza</Link></li>
              <li><Link to={`/${lang}#menu`} className="text-stone-400 hover:text-brand-500 transition-colors">O'Tacos</Link></li>
              <li><Link to={`/${lang}#menu`} className="text-stone-400 hover:text-brand-500 transition-colors">O'Panini</Link></li>
              <li><Link to={`/${lang}#menu`} className="text-stone-400 hover:text-brand-500 transition-colors">O'Sandwichs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold">{t.contact.address}:</span>
                <span className="text-stone-400">{t.location.subtitle}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold">{t.contact.phone}:</span>
                <div className="flex flex-col gap-2">
                  <a href="tel:0690562171" className="text-stone-400 hover:text-brand-500 transition-colors flex items-center gap-2" dir="ltr">
                    0690562171
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            &copy; {new Date().getFullYear()} O'Pizza. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
