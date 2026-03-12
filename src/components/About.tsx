import { ChefHat, Clock, UtensilsCrossed, Bike, CalendarDays, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n';
import { Link } from 'react-router-dom';

export default function About() {
  const { t, lang } = useLanguage();

  const features = [
    { icon: <ChefHat className="w-5 h-5 text-brand-500" />, title: t.about.f1, description: t.about.f1d },
    { icon: <UtensilsCrossed className="w-5 h-5 text-brand-500" />, title: t.about.f2, description: t.about.f2d },
    { icon: <Clock className="w-5 h-5 text-brand-500" />, title: t.about.f3, description: t.about.f3d },
    { icon: <Bike className="w-5 h-5 text-brand-500" />, title: t.about.f4, description: t.about.f4d },
    { icon: <CalendarDays className="w-5 h-5 text-brand-500" />, title: t.about.f5, description: t.about.f5d },
    { icon: <MapPin className="w-5 h-5 text-brand-500" />, title: t.about.f6, description: t.about.f6d, link: `/${lang}/location` }
  ];

  return (
    <section id="about" className="py-12 lg:py-16 bg-dark-800 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Small Image Side */}
          <div className="w-48 md:w-64 shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] border border-white/10">
              <img 
                src="/picture front shop.png" 
                alt="O'Pizza Shop Front" 
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Text & Features Side */}
          <div className="flex-1 text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="w-8 h-1 bg-brand-500 rounded-full"></span>
              <h2 className="text-brand-500 font-cursive text-2xl md:text-3xl tracking-wide">{t.about.title}</h2>
            </div>
            
            <h3 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight">
              {t.about.subtitle}
            </h3>
            
            <p className="text-stone-400 text-sm mb-8 leading-relaxed max-w-2xl">
              {t.about.desc}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const content = (
                  <>
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-dark-900 border border-white/5 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{feature.title}</h4>
                      <p className="text-stone-400 text-[11px] leading-snug">{feature.description}</p>
                    </div>
                  </>
                );

                return feature.link ? (
                  <Link to={feature.link} key={index} className="flex items-start gap-3 text-start hover:opacity-80 transition-opacity cursor-pointer">
                    {content}
                  </Link>
                ) : (
                  <div key={index} className="flex items-start gap-3 text-start">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
