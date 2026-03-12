import { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X, ShoppingBag, Globe, Pizza, MapPin, Phone } from 'lucide-react';
import { useLanguage, Language } from '../i18n';
import { useCart } from '../CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { items, setIsCartOpen } = useCart();
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRefMobile = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (!langMenuRef.current || !langMenuRef.current.contains(target)) &&
        (!langMenuRefMobile.current || !langMenuRefMobile.current.contains(target))
      ) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: t.nav.home, href: `/${lang}` },
    { name: t.nav.menu, href: `/${lang}#menu` },
    { name: t.nav.about, href: `/${lang}#about` },
  ];

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setLangMenuOpen(false);
    
    // Replace the language part of the URL
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && ['ar', 'en', 'fr'].includes(pathParts[0])) {
      pathParts[0] = newLang;
      navigate(`/${pathParts.join('/')}${location.search}${location.hash}`);
    } else {
      navigate(`/${newLang}${location.pathname}${location.search}${location.hash}`);
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg py-3 border-b border-white/5' : 'bg-transparent py-5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="w-1/4 flex items-center">
            <Link to={`/${lang}`} className="flex items-center justify-start group">
              <img 
                src="/logo.png" 
                alt="O'Pizza Logo" 
                className="h-10 md:h-12 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className={`flex items-center space-x-6 lg:space-x-10 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-bold text-stone-300 hover:text-brand-500 transition-colors text-sm lg:text-base uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Icons - Right Aligned */}
          <div className="hidden md:flex w-1/4 justify-end items-center gap-2 lg:gap-4 border-s border-white/10 ps-4 lg:ps-6">
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 text-stone-300 hover:text-brand-500 transition-colors flex items-center gap-1"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-black uppercase">{lang}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-32 bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 z-[100]">
                  {(['ar', 'en', 'fr'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLangChange(l)}
                      className={`w-full text-center px-4 py-2 text-sm font-bold transition-colors ${
                        lang === l ? 'bg-brand-500/10 text-brand-500' : 'text-stone-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {l === 'ar' ? 'العربية' : l === 'en' ? 'English' : 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to={`/${lang}/location`}
              className="p-2 text-stone-300 hover:text-brand-500 transition-colors flex items-center gap-1"
              title={t.location.title}
            >
              <MapPin className="w-6 h-6" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-300 hover:text-brand-500 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-brand-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-brand-500/20">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Language Switcher */}
            <div className="relative" ref={langMenuRefMobile}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 text-white hover:text-brand-500 transition-colors flex items-center gap-1"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-black uppercase">{lang}</span>
              </button>
              
              {langMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-32 bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 z-[100]">
                  {(['ar', 'en', 'fr'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => handleLangChange(l)}
                      className={`w-full text-center px-4 py-2 text-sm font-bold transition-colors ${
                        lang === l ? 'bg-brand-500/10 text-brand-500' : 'text-stone-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {l === 'ar' ? 'العربية' : l === 'en' ? 'English' : 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to={`/${lang}/location`}
              className="p-2 text-white hover:text-brand-500 transition-colors flex items-center gap-1"
              title={t.location.title}
            >
              <MapPin className="w-6 h-6" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-brand-500 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-brand-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

    </nav>

    {/* Mobile Menu Drawer */}
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 ${lang === 'ar' ? 'left-0 border-r' : 'right-0 border-l'} w-[280px] bg-dark-900 border-white/10 shadow-2xl z-[110] flex flex-col md:hidden`}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5 shrink-0">
              <img src="/logo.png" alt="O'Pizza Logo" className="h-8 w-auto" />
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 px-5 py-6 flex flex-col gap-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-4 text-lg font-bold text-stone-200 hover:text-brand-500 transition-colors border-b border-white/5 last:border-0"
                >
                  <span>{link.name}</span>
                </Link>
              ))}
              
              <div className="mt-auto pt-8 shrink-0">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">{t.footer.contact}</h4>
                  <a 
                    href="tel:+212690562111" 
                    className="flex items-center gap-3 text-brand-500 font-bold mb-3 text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+212 690-562111</span>
                  </a>
                  <Link 
                    to={`/${lang}/location`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-stone-400 text-xs hover:text-white transition-colors"
                  >
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Safi, Morocco</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
}
