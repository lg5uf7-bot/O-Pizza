import { MapPin, Phone, Truck, Clock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../i18n';
import { Link } from 'react-router-dom';

export default function LocationPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to={`/${lang}`}
          className="flex items-center gap-2 text-brand-500 hover:text-brand-600 transition-colors mb-8 font-bold"
        >
          <ArrowLeft className={lang === 'ar' ? 'rotate-180' : ''} />
          {lang === 'ar' ? 'العودة' : lang === 'fr' ? 'Retour' : 'Back'}
        </Link>


        <h1 className="text-4xl md:text-6xl font-cursive text-brand-500 mb-8 text-center">{t.location.title}</h1>

        <div className="rounded-3xl overflow-hidden h-[600px] shadow-2xl border border-white/10 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.435741604085!2d-9.25572548482967!3d32.32162118111166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac21beb2d26a47%3A0x704837ab84b25acd!2sO'Pizza!5e0!3m2!1sen!2sma!4v1650000000000!5m2!1sen!2sma" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="O'Pizza Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
