import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Location() {
  const { t } = useLanguage();

  return (
    <section id="location" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-cursive text-brand-500 mb-4 tracking-wide">{t.location.title}</h2>
          <p className="text-lg text-stone-400 flex items-center justify-center gap-2 mb-6">
            <MapPin className="text-brand-500" />
            {t.location.subtitle}
          </p>
          
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=32.321621,-9.255725" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/30"
          >
            <Navigation className="w-5 h-5" />
            {t.location.directions}
          </a>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] border-4 border-dark-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.435741604085!2d-9.25572548482967!3d32.32162118111166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac21beb2d26a47%3A0x704837ab84b25acd!2sO'Pizza!5e0!3m2!1sen!2sma!4v1650000000000!5m2!1sen!2sma" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="O'Pizza Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
