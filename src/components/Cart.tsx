import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useLanguage } from '../i18n';
import { X, Minus, Plus, ShoppingBag, MapPin, ExternalLink } from 'lucide-react';

export default function Cart() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { t, lang } = useLanguage();
  const [isCheckout, setIsCheckout] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'mastercard' | 'paypal'>('visa');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the order to a server or WhatsApp
    setIsSuccess(true);
    clearCart();
    setTimeout(() => {
      setIsSuccess(false);
      setIsCheckout(false);
      setOrderType('delivery');
      setCardData({ number: '', expiry: '', cvc: '' });
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-md bg-dark-800 h-full shadow-2xl flex flex-col transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-3xl font-cursive text-brand-500 flex items-center gap-2 tracking-wide">
            <ShoppingBag className="text-brand-500" />
            {t.cart.title}
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-stone-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          {showClearConfirm && (
            <div className="absolute inset-0 z-10 bg-dark-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-6">{t.cart.clearConfirm}</h3>
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-dark-700 hover:bg-dark-600 transition-colors"
                >
                  {t.cart.close}
                </button>
                <button 
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                  {t.cart.clearCart}
                </button>
              </div>
            </div>
          )}
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t.cart.success}</h3>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-500 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="text-lg">{t.cart.empty}</p>
            </div>
          ) : isCheckout ? (
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">{t.cart.orderType}</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    orderType === 'delivery' 
                      ? 'bg-brand-500/10 border-brand-500 text-brand-500' 
                      : 'bg-dark-900 border-white/10 text-stone-400 hover:border-white/30'
                  }`}
                >
                  {t.cart.delivery}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    orderType === 'pickup' 
                      ? 'bg-brand-500/10 border-brand-500 text-brand-500' 
                      : 'bg-dark-900 border-white/10 text-stone-400 hover:border-white/30'
                  }`}
                >
                  {t.cart.pickup}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-400 mb-1">{t.contact.name}</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-400 mb-1">{t.contact.phoneInput}</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                  dir="ltr"
                />
              </div>
              
              {orderType === 'delivery' && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <label className="block text-sm font-medium text-stone-400 mb-1">{t.cart.address}</label>
                  <textarea 
                    required
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors h-24 resize-none"
                  ></textarea>
                </div>
              )}

              {orderType === 'pickup' && (
                <div className="animate-in fade-in slide-in-from-top-2 bg-brand-500/10 border border-brand-500/20 rounded-lg p-4 mt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium mb-1">{t.cart.pickupLocation}</p>
                      <p className="text-stone-300 text-sm mb-2">Avenue Moulay Youssef, Safi, Morocco</p>
                      <a 
                        href="https://maps.google.com/?q=O'Pizza+Safi" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-500 text-sm font-bold hover:underline inline-flex items-center gap-1"
                      >
                        {t.cart.pickupLocationLink}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">{t.cart.paymentMethod}</h3>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('visa')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'visa' 
                        ? 'bg-brand-500/10 border-brand-500 text-brand-500 shadow-lg shadow-brand-500/10' 
                        : 'bg-dark-900 border-white/10 text-stone-400 hover:border-white/30'
                    }`}
                  >
                    <div className="h-6 flex items-center">
                      <svg className="w-10 h-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.15 31.5H14.55L16.8 16.5H20.4L18.15 31.5ZM31.2 16.8C30.45 16.5 29.25 16.2 27.9 16.2C24.15 16.2 21.45 18.15 21.45 21.15C21.45 23.25 23.25 24.45 24.75 25.2C26.25 25.95 26.7 26.4 26.7 27.15C26.7 28.2 25.35 28.65 24.15 28.65C22.65 28.65 21.45 28.2 20.55 27.9L20.1 27.75L19.5 31.35C20.55 31.8 22.2 32.25 23.85 32.25C27.9 32.25 30.6 30.3 30.6 27.15C30.6 24.45 28.95 23.25 26.4 21.9C24.9 21.15 24.15 20.7 24.15 19.95C24.15 19.2 24.9 18.45 26.4 18.45C27.6 18.45 28.5 18.75 29.1 19.05L29.4 19.2L30 15.75L31.2 16.8ZM41.4 16.5H37.8C36.75 16.5 36 16.8 35.55 17.85L30 31.5H33.75L34.5 29.25H38.85L39.3 31.5H42.75L39.75 16.5H41.4ZM35.55 26.25L37.2 21.6L38.1 26.25H35.55ZM11.85 16.5L8.25 26.85L7.8 24.75C7.2 22.65 5.25 18.75 3.15 17.55L2.7 17.25L6.15 31.5H10.05L15.9 16.5H11.85Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Visa</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mastercard')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'mastercard' 
                        ? 'bg-brand-500/10 border-brand-500 text-brand-500 shadow-lg shadow-brand-500/10' 
                        : 'bg-dark-900 border-white/10 text-stone-400 hover:border-white/30'
                    }`}
                  >
                    <div className="h-6 flex items-center">
                      <svg className="w-10 h-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="24" r="12" fill="currentColor" fillOpacity="0.8"/>
                        <circle cx="30" cy="24" r="12" fill="currentColor" fillOpacity="0.8"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Mastercard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      paymentMethod === 'paypal' 
                        ? 'bg-brand-500/10 border-brand-500 text-brand-500 shadow-lg shadow-brand-500/10' 
                        : 'bg-dark-900 border-white/10 text-stone-400 hover:border-white/30'
                    }`}
                  >
                    <div className="h-6 flex items-center">
                      <svg className="w-10 h-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 10.5C14.5 9.5 15.5 8.5 17 8.5H31C35.5 8.5 38 11 38 15.5C38 20 35.5 22.5 31 22.5H23L21.5 32.5H14.5L16.5 18.5H14.5V10.5ZM23.5 18.5H28C30.5 18.5 31.5 17.5 31.5 15.5C31.5 13.5 30.5 12.5 28 12.5H21.5L20.5 18.5H23.5Z" fill="currentColor"/>
                        <path d="M21.5 22.5L20 32.5C19.5 35.5 17.5 37.5 14.5 37.5H8.5L10.5 22.5H21.5Z" fill="currentColor" fillOpacity="0.5"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">PayPal</span>
                  </button>
                </div>

                {paymentMethod !== 'paypal' ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <label className="block text-sm font-medium text-stone-400 mb-1">{t.cart.cardNumber}</label>
                      <input 
                        required
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        value={cardData.number}
                        onChange={e => setCardData({...cardData, number: e.target.value})}
                        className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                        dir="ltr"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">{t.cart.expiry}</label>
                        <input 
                          required
                          type="text" 
                          placeholder="MM/YY"
                          value={cardData.expiry}
                          onChange={e => setCardData({...cardData, expiry: e.target.value})}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-400 mb-1">{t.cart.cvc}</label>
                        <input 
                          required
                          type="text" 
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={e => setCardData({...cardData, cvc: e.target.value})}
                          className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-dark-900 p-6 rounded-xl border border-white/5 text-center animate-in fade-in slide-in-from-top-2">
                    <p className="text-stone-400 text-sm mb-4">
                      {lang === 'ar' ? 'سيتم توجيهك إلى PayPal لإكمال عملية الدفع بأمان.' : lang === 'fr' ? 'Vous serez redirigé vers PayPal pour compléter votre paiement en toute sécurité.' : 'You will be redirected to PayPal to complete your payment securely.'}
                    </p>
                    <div className="inline-flex items-center gap-2 text-brand-500 font-bold">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>
                      paypal@opizza.ma
                    </div>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-dark-900 p-3 rounded-xl border border-white/5">
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {item.name[lang as keyof typeof item.name]}
                      {item.size && <span className="text-brand-500 ml-2 text-sm">({item.size})</span>}
                    </h4>
                    <div className="text-brand-500 font-bold mt-1" dir="ltr">{item.price} {t.menu.dh}</div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-dark-800 rounded-lg p-1 border border-white/10" dir="ltr">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-4 text-center font-medium text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 rounded-xl font-bold text-brand-500 bg-brand-500/10 hover:bg-brand-500/20 transition-colors border border-brand-500/20"
                >
                  {t.cart.continueShopping}
                </button>
                <button 
                  onClick={() => setShowClearConfirm(true)}
                  className="w-full py-3 rounded-xl font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors border border-red-500/20"
                >
                  {t.cart.clearCart}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSuccess && items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-dark-900">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-400">{t.cart.total}</span>
              <span className="text-2xl font-bold text-white" dir="ltr">{total} {t.menu.dh}</span>
            </div>
            
            {isCheckout ? (
              <button 
                type="submit"
                form="checkout-form"
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-colors"
              >
                {t.cart.confirm}
              </button>
            ) : (
              <button 
                onClick={() => setIsCheckout(true)}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-colors"
              >
                {t.cart.checkout}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
