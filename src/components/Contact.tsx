import { Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-cursive text-brand-500 mb-8 tracking-wide">{t.contact.title}</h2>
            <p className="text-lg text-stone-400 mb-12 leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-dark-700 border border-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{t.contact.address}</h4>
                  <p className="text-stone-400 mb-2">{t.location.subtitle}</p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=O'Pizza&query_place_id=ChIJR2rSsr4hrA0RzVqyhKs3SHA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-500 text-sm font-bold hover:underline flex items-center gap-1"
                  >
                    {t.nav.location} <MapPin size={14} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/30">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{t.contact.phone}</h4>
                  <p className="text-brand-500 font-bold text-2xl" dir="ltr">+212 6 90 56 21 11</p>
                  <p className="text-stone-500 text-sm mt-1">{t.contact.deliveryNote}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-dark-700 border border-white/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{t.contact.hours}</h4>
                  <p className="text-stone-400">{t.contact.hoursVal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-900 p-8 md:p-10 rounded-3xl shadow-lg border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6">{t.contact.formTitle}</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-400 mb-2">{t.contact.name}</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors bg-dark-800 text-white outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-400 mb-2">{t.contact.phoneInput}</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors bg-dark-800 text-white outline-none text-right"
                  dir="ltr"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-400 mb-2">{t.contact.msg}</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors bg-dark-800 text-white outline-none resize-none"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-colors shadow-md"
              >
                {t.contact.send}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
