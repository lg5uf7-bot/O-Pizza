import { useState, useEffect } from 'react';
import { Star, Utensils, Phone, ExternalLink, Check, ShoppingBag, ArrowDown } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useCart } from '../CartContext';
import { reviews } from '../reviews';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t, lang } = useLanguage();
  const { setIsCartOpen } = useCart();
  
  // Filter and categorize reviews to ensure a mix of Arabic and other languages
  const validReviews = reviews.filter(r => r.text && r.text.trim().length > 0);
  const arabicReviews = validReviews.filter(r => /[\u0600-\u06FF]/.test(r.text!));
  const otherReviews = validReviews.filter(r => !/[\u0600-\u06FF]/.test(r.text!));
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 6000); // Change every 6 seconds for smooth reading
    return () => clearInterval(timer);
  }, []);

  // Always show 1 Arabic review and 1 non-Arabic review
  const displayedReviews = [
    arabicReviews[currentIndex % arabicReviews.length],
    otherReviews[currentIndex % otherReviews.length]
  ];

  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-dark-900 pt-12 lg:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/second-one.jpg"
          alt="O'Pizza Background"
          className="w-full h-full object-cover object-top opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/40 via-dark-900/80 to-dark-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-8 lg:py-12">
        
        {/* Logo & Text Content (Left on Desktop, Top on Mobile) */}
        <div className="text-center flex flex-col items-center order-1 w-full mt-16 lg:mt-0">
          {/* Logo */}
          <div className="relative mb-6">
            <img src="/logo.png" alt="O'Pizza Logo" className="h-32 md:h-48 w-auto drop-shadow-2xl" />
          </div>

          <h1 className="text-5xl md:text-7xl font-cursive text-brand-500 mb-4 leading-tight">
            O'Pizza
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-10 font-medium leading-relaxed max-w-xl mx-auto">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 w-full relative">
            <Link
              to={`/${lang}#menu`}
              className="btn-view-menu"
            >
              {t.hero.btnMenu}
              <Utensils className="w-4 h-4" />
            </Link>
          </div>

          {/* Verified Reviews Badge & Scroll Indicator (Mobile Only) */}
          <div className="flex flex-col items-center justify-center gap-6 w-full mt-6 lg:hidden">
            <div className="flex items-center gap-2.5 py-2 px-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm shadow-xl">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">{t.hero.verifiedByGoogle}</span>
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <Check className="w-2.5 h-2.5 text-emerald-500" strokeWidth={4} />
              </div>
            </div>
            <div 
              className="text-center mt-4 animate-bounce-custom cursor-pointer"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ArrowDown className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Reviews (Right on Desktop, Bottom on Mobile) */}
        <div className="flex flex-col items-center gap-6 order-2 w-full lg:max-w-[700px] ltr:lg:ml-auto rtl:lg:mr-auto mt-10 lg:mt-0">
          
          {/* Status & Reviews Header (Desktop Only) */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-4 w-full">
            {/* Verified Reviews Badge */}
            <div className="flex items-center gap-2.5 py-2 px-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm shadow-xl">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">{t.hero.verifiedByGoogle}</span>
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <Check className="w-2.5 h-2.5 text-emerald-500" strokeWidth={4} />
              </div>
            </div>
          </div>

          <div className="w-full relative min-h-[320px] lg:min-h-[440px] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 w-full absolute inset-0 will-change-[opacity]"
              >
                {displayedReviews.map((review, index) => (
                  <a 
                    href={review.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`${review.name}-${index}`} 
                    className="w-full flex flex-col justify-between bg-dark-800/90 p-5 lg:p-6 rounded-2xl border border-white/5 shadow-2xl hover:bg-dark-700/90 transition-all hover:scale-[1.01] group min-h-[150px] lg:min-h-[160px] transform-gpu"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(review.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] lg:text-xs font-black text-stone-500 group-hover:text-brand-500 transition-colors uppercase tracking-[0.2em]">
                          <span>Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                      <p className="text-stone-300 font-medium text-sm lg:text-base leading-relaxed line-clamp-2 mb-3 lg:mb-4" dir="auto">
                        "{review.text}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-500 font-black text-[10px] lg:text-xs uppercase shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-stone-300 font-black text-[10px] lg:text-xs uppercase tracking-widest">
                          {review.name}
                        </p>
                        <p className="text-[9px] lg:text-[10px] text-stone-600 font-bold uppercase tracking-wider">Local Guide</p>
                      </div>
                    </div>
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Desktop Only) */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-custom cursor-pointer z-20 hidden lg:block"
        onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
}
