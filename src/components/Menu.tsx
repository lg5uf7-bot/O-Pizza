import { useLanguage, menuData } from '../i18n';
import { useCart } from '../CartContext';
import { Plus, Info, Sparkles } from 'lucide-react';

export default function Menu() {
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any, size?: 'L' | 'XL') => {
    const priceStr = size === 'L' ? item.priceL : size === 'XL' ? item.priceXL : item.price;
    const price = parseInt(priceStr.split('/')[0].trim());
    addToCart({
      name: item.name,
      price,
      size
    });
  };

  return (
    <section id="menu" className="py-8 md:py-24 bg-dark-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-cursive text-brand-500 mb-4 md:mb-6 tracking-wide drop-shadow-sm">{t.menu.title}</h2>
          <div className="w-16 md:w-24 h-1 bg-brand-500 mx-auto mb-4 md:mb-6 rounded-full opacity-50"></div>
          <p className="text-lg md:text-xl text-stone-300 font-medium leading-relaxed">
            {t.menu.subtitle}
          </p>
          
          {/* Subtle Hint */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center px-6 py-2 border-x border-brand-500/30">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-200 font-bold">
                {t.menu.instruction}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Grid - Masonry style layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-20">
          {menuData.map((category, idx) => (
            <div key={idx} className="flex flex-col">
              
              {/* Category Title & Thumbnail */}
              <div className="mb-4 md:mb-6 flex items-center gap-4" dir="ltr">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-cursive text-brand-500 text-3xl md:text-5xl tracking-wide">{category.title}</h3>
                <div className="flex-grow h-px bg-gradient-to-r from-brand-500/50 to-transparent"></div>
              </div>

              {/* Size Headers - Moved Down */}
              {category.hasSizes && (
                <div className="flex justify-end mb-2">
                  <div className="flex justify-center items-center text-white text-xs font-black gap-1 md:gap-2 uppercase tracking-tighter min-w-[130px] md:min-w-[150px]" dir="ltr">
                    <div className="w-14 md:w-16 text-center bg-white/10 rounded py-0.5 border border-white/20">{t.menu.sizeL}</div>
                    <span className="text-transparent text-sm">|</span>
                    <div className="w-14 md:w-16 text-center bg-white/10 rounded py-0.5 border border-white/20">{t.menu.sizeXL}</div>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-2 md:space-y-3">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center w-full group">
                    <h4 className="text-white text-base md:text-lg font-medium whitespace-nowrap flex-shrink-0 text-start">
                      {item.name[lang as keyof typeof item.name]}
                    </h4>
                    
                    <div className="mx-2 md:mx-4 flex-grow border-b-2 border-dotted border-white/10 group-hover:border-brand-500/30 transition-colors h-1 relative -top-1"></div>
                    
                    <div className="text-brand-500 font-bold whitespace-nowrap flex gap-1 md:gap-2 items-center min-w-[130px] md:min-w-[150px] justify-center flex-shrink-0" dir="ltr">
                      {category.hasSizes ? (
                        <>
                          <button 
                            onClick={() => handleAddToCart(item, 'L')}
                            className="w-14 md:w-16 text-sm md:text-base text-center bg-brand-500/10 hover:bg-brand-500 text-brand-500 hover:text-white rounded-md transition-colors py-1 flex items-center justify-center gap-1 group border border-brand-500/30"
                            title={t.menu.add}
                          >
                            <span>{item.priceL}</span>
                            <Plus size={14} className="text-white transition-colors" />
                          </button>
                          <span className="text-stone-500 font-normal text-sm">|</span>
                          <button 
                            onClick={() => handleAddToCart(item, 'XL')}
                            className="w-14 md:w-16 text-sm md:text-base text-center bg-brand-500/10 hover:bg-brand-500 text-brand-500 hover:text-white rounded-md transition-colors py-1 flex items-center justify-center gap-1 group border border-brand-500/30"
                            title={t.menu.add}
                          >
                            <span>{item.priceXL}</span>
                            <Plus size={14} className="text-white transition-colors" />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="min-w-[80px] md:min-w-[100px] text-sm md:text-base bg-brand-500/10 hover:bg-brand-500 text-brand-500 hover:text-white rounded-md px-2 md:px-3 py-1 transition-colors flex items-center justify-center gap-1 group border border-brand-500/30"
                          title={t.menu.add}
                        >
                          <span>{item.price} {t.menu.dh}</span>
                          <Plus size={14} className="text-white transition-colors" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Special note for Tacos Gratiné */}
                {category.category === 'tacos' && (
                  <div className="flex items-end w-full mt-4">
                    <h4 className="text-brand-500 text-lg font-bold whitespace-nowrap">
                      {t.menu.gratine}
                    </h4>
                  </div>
                )}
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
