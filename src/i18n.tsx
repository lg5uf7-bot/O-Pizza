import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en' | 'fr';

export const translations = {
  ar: {
    nav: { home: 'الرئيسية', about: 'من نحن', menu: 'القائمة', location: 'الموقع', contact: 'اتصل بنا', order: 'اطلب الآن' },
    hero: { tagline: 'المذاق الأصلي للبيتزا', desc: 'نقدم لكم أشهى أنواع البيتزا، الطاكوس، والسندويشات المحضرة يومياً بمكونات طازجة وعناية فائقة.', btnMenu: 'عرض القائمة', btnContact: 'اتصل بنا', verifiedByGoogle: 'موثق من جوجل' },
    about: { title: 'من نحن', subtitle: 'شغفنا هو تقديم أفضل طعم لعملائنا', desc: 'في أوبيتزا، نحن لا نصنع الطعام فقط، بل نصنع تجربة تذوق فريدة. بدأنا رحلتنا بشغف كبير لتقديم أشهى المأكولات في مدينة آسفي.', f1: 'وصفات أصلية', f1d: 'نعتمد على وصفاتنا الخاصة', f2: 'مكونات طازجة', f2d: 'نختار أفضل المكونات يومياً', f3: 'خدمة سريعة', f3d: 'نلبي طلباتكم بأسرع وقت', f4: 'توصيل سريع', f4d: 'نصل إليكم أينما كنتم في آسفي', f5: 'مفتوح 24/7', f5d: 'في خدمتكم دائماً', f6: 'موقعنا', f6d: 'عرض على الخريطة' },
    menu: { title: 'قائمة الطعام', subtitle: 'استمتع بتجربة طعام استثنائية مع تشكيلتنا المختارة بعناية', instruction: 'انقر على + للإضافة إلى السلة', sizeL: 'L', sizeXL: 'XL', dh: 'dh', gratine: 'كراتيني +3 دراهم', add: 'إضافة' },
    location: { title: 'موقعنا', subtitle: 'آسفي، المغرب', directions: 'احصل على الاتجاهات' },
    contact: { title: 'تواصل معنا', subtitle: 'نحن دائماً سعداء بتواصلكم معنا.', address: 'العنوان', phone: 'رقم الهاتف', hours: 'ساعات العمل', hoursVal: 'مفتوح 24 ساعة', formTitle: 'أرسل رسالة', name: 'الاسم', phoneInput: 'رقم الهاتف', msg: 'الرسالة', send: 'إرسال', deliveryNote: 'اتصل بنا للتوصيل' },
    footer: { desc: 'أشهى المأكولات المحضرة بعناية.', links: 'روابط سريعة', menu: 'القائمة', contact: 'تواصل معنا', rights: 'جميع الحقوق محفوظة.' },
    cart: { title: 'سلة المشتريات', empty: 'السلة فارغة', total: 'المجموع', checkout: 'إتمام الطلب', orderType: 'نوع الطلب', delivery: 'توصيل', pickup: 'استلام من المطعم', pickupLocation: 'موقع المطعم:', pickupLocationLink: 'عرض على الخريطة', address: 'عنوان التوصيل', confirm: 'تأكيد الطلب', success: 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.', close: 'إغلاق', paymentMethod: 'طريقة الدفع', cash: 'الدفع عند الاستلام', card: 'بطاقة ائتمان', cardNumber: 'رقم البطاقة', expiry: 'تاريخ الانتهاء', cvc: 'CVC', continueShopping: 'إضافة عنصر آخر', clearCart: 'إفراغ السلة', clearConfirm: 'هل أنت متأكد أنك تريد إزالة جميع العناصر؟' }
  },
  en: {
    nav: { home: 'Home', about: 'About', menu: 'Menu', location: 'Location', contact: 'Contact', order: 'Order Now' },
    hero: { tagline: 'The Original Pizza Taste', desc: 'Serving the most delicious pizzas, tacos, and sandwiches prepared daily with fresh ingredients and great care.', btnMenu: 'View Menu', btnContact: 'Contact Us', verifiedByGoogle: 'Verified By Google' },
    about: { title: 'About Us', subtitle: 'Our passion is serving the best taste', desc: 'At O\'Pizza, we don\'t just make food, we create a unique tasting experience. We started our journey with a great passion for serving the most delicious food in Safi.', f1: 'Original Recipes', f1d: 'We rely on our special recipes', f2: 'Fresh Ingredients', f2d: 'We choose the best ingredients daily', f3: 'Fast Service', f3d: 'We fulfill your orders quickly', f4: 'Fast Delivery', f4d: 'We reach you anywhere in Safi', f5: 'Open 24/7', f5d: 'Always at your service', f6: 'Our Location', f6d: 'View on map' },
    menu: { title: 'Our Menu', subtitle: 'Experience exceptional dining with our carefully curated selection', instruction: 'Click + to add to cart', sizeL: 'L', sizeXL: 'XL', dh: 'dh', gratine: 'Gratiné +3dh', add: 'Add' },
    location: { title: 'Location', subtitle: 'Safi, Morocco', directions: 'Get Directions' },
    contact: { title: 'Contact Us', subtitle: 'We are always happy to hear from you.', address: 'Address', phone: 'Phone', hours: 'Working Hours', hoursVal: 'Open 24 hours', formTitle: 'Send a Message', name: 'Name', phoneInput: 'Phone Number', msg: 'Message', send: 'Send', deliveryNote: 'Contact us for delivery' },
    footer: { desc: 'Delicious food prepared with care.', links: 'Quick Links', menu: 'Menu', contact: 'Contact Us', rights: 'All rights reserved.' },
    cart: { title: 'Shopping Cart', empty: 'Cart is empty', total: 'Total', checkout: 'Checkout', orderType: 'Order Type', delivery: 'Delivery', pickup: 'Pickup', pickupLocation: 'Shop Location:', pickupLocationLink: 'View on map', address: 'Delivery Address', confirm: 'Confirm Order', success: 'Order received successfully! We will contact you soon.', close: 'Close', paymentMethod: 'Payment Method', cash: 'Cash on Delivery', card: 'Credit Card', cardNumber: 'Card Number', expiry: 'Expiry Date', cvc: 'CVC', continueShopping: 'Add another item', clearCart: 'Clear Cart', clearConfirm: 'Are you sure you want to remove all items?' }
  },
  fr: {
    nav: { home: 'Accueil', about: 'À Propos', menu: 'Menu', location: 'Emplacement', contact: 'Contact', order: 'Commander' },
    hero: { tagline: 'Le Goût Original de la Pizza', desc: 'Nous servons les plus délicieuses pizzas, tacos et sandwichs préparés quotidiennement avec des ingrédients frais et grand soin.', btnMenu: 'Voir le Menu', btnContact: 'Contactez-nous', verifiedByGoogle: 'Vérifié Par Google' },
    about: { title: 'À Propos', subtitle: 'Notre passion est de servir le meilleur goût', desc: 'Chez O\'Pizza, nous ne faisons pas que préparer de la nourriture, nous créons une expérience gustative unique. Nous avons commencé notre voyage avec une grande passion pour servir les plats les plus délicieux à Safi.', f1: 'Recettes Originales', f1d: 'Nous nous appuyons sur nos recettes', f2: 'Ingrédients Frais', f2d: 'Nous choisissons les meilleurs ingrédients', f3: 'Service Rapide', f3d: 'Nous répondons rapidement', f4: 'Livraison Rapide', f4d: 'Nous vous livrons partout à Safi', f5: 'Ouvert 24/7', f5d: 'Toujours à votre service', f6: 'Notre Emplacement', f6d: 'Voir sur la carte' },
    menu: { title: 'Notre Menu', subtitle: 'Vivez une expérience culinaire exceptionnelle avec notre sélection soigneusement choisie', instruction: 'Cliquez sur + pour ajouter au panier', sizeL: 'L', sizeXL: 'XL', dh: 'dh', gratine: 'Gratiné +3dh', add: 'Ajouter' },
    location: { title: 'Emplacement', subtitle: 'Safi, Maroc', directions: 'Obtenir l\'itinéraire' },
    contact: { title: 'Contactez-nous', subtitle: 'Nous sommes toujours heureux de vous entendre.', address: 'Adresse', phone: 'Téléphone', hours: 'Heures d\'ouverture', hoursVal: 'Ouvert 24h/24', formTitle: 'Envoyer un message', name: 'Nom', phoneInput: 'Numéro de téléphone', msg: 'Message', send: 'Envoyer', deliveryNote: 'Contactez-nous pour la livraison' },
    footer: { desc: 'Une nourriture délicieuse préparée avec soin.', links: 'Liens Rapides', menu: 'Menu', contact: 'Contactez-nous', rights: 'Tous droits réservés.' },
    cart: { title: 'Panier', empty: 'Le panier est vide', total: 'Total', checkout: 'Commander', orderType: 'Type de commande', delivery: 'Livraison', pickup: 'À emporter', pickupLocation: 'Emplacement du restaurant:', pickupLocationLink: 'Voir sur la carte', address: 'Adresse de livraison', confirm: 'Confirmer la commande', success: 'Commande reçue avec succès ! Nous vous contacterons bientôt.', close: 'Fermer', paymentMethod: 'Méthode de paiement', cash: 'Paiement à la livraison', card: 'Carte de crédit', cardNumber: 'Numéro de carte', expiry: 'Date d\'expiration', cvc: 'CVC', continueShopping: 'Ajouter un autre article', clearCart: 'Vider le panier', clearConfirm: 'Êtes-vous sûr de vouloir supprimer tous les articles ?' }
  }
};

export const menuData = [
  {
    category: 'sandwich',
    title: "O'Sandwichs",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5WJzZ9Qfo_0JFJ1BXWMF5f-xJa7HYUPp21g&s',
    hasSizes: false,
    items: [
      { name: { ar: 'نقانق', en: 'Saucisse', fr: 'Saucisse' }, price: '15' },
      { name: { ar: 'تونة', en: 'Thon', fr: 'Thon' }, price: '15' },
      { name: { ar: 'دجاج', en: 'Poulet', fr: 'Poulet' }, price: '17' },
      { name: { ar: 'ديك رومي', en: 'Dinde', fr: 'Dinde' }, price: '17' },
      { name: { ar: 'كفتة', en: 'Kefta', fr: 'Kefta' }, price: '17' },
      { name: { ar: 'ميكست', en: 'Mixte', fr: 'Mixte' }, price: '20' },
      { name: { ar: 'باناشي', en: 'Panaché', fr: 'Panaché' }, price: '20' },
      { name: { ar: 'أوبيتزا', en: "O'pizza", fr: "O'pizza" }, price: '20' },
    ]
  },
  {
    category: 'pizza',
    title: "O'Pizza",
    image: 'https://img.freepik.com/psd-gratuit/delicieuse-pizza-aux-pepperoni-delice-culinaire_632498-24206.jpg?semt=ais_hybrid&w=740&q=80',
    hasSizes: true,
    items: [
      { name: { ar: 'مارغريتا', en: 'Margarita', fr: 'Margarita' }, priceL: '15', priceXL: '20' },
      { name: { ar: 'نباتية', en: 'Végétarienne', fr: 'Végétarienne' }, priceL: '20', priceXL: '25' },
      { name: { ar: 'تونة', en: 'Thon', fr: 'Thon' }, priceL: '25', priceXL: '30' },
      { name: { ar: 'دجاج', en: 'Poulet', fr: 'Poulet' }, priceL: '25', priceXL: '30' },
      { name: { ar: 'كفتة', en: 'Kefta', fr: 'Kefta' }, priceL: '25', priceXL: '30' },
      { name: { ar: 'أجبان', en: 'Fromage', fr: 'Fromage' }, priceL: '30', priceXL: '40' },
      { name: { ar: 'ميكست', en: 'Mixte', fr: 'Mixte' }, priceL: '30', priceXL: '40' },
      { name: { ar: 'بيشور', en: 'Pêcheur', fr: 'Pêcheur' }, priceL: '35', priceXL: '45' },
      { name: { ar: 'أوبيتزا', en: "O'pizza", fr: "O'pizza" }, priceL: '40', priceXL: '50' },
      { name: { ar: 'فواكه البحر', en: 'Fruits de mer', fr: 'Fruits de mer' }, priceL: '45', priceXL: '55' },
    ]
  },
  {
    category: 'panini',
    title: "O'Panini",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKpMrmEIavf-tLGaPpCNqP3w_xAYOajn7ZnA&s',
    hasSizes: false,
    items: [
      { name: { ar: 'جبن', en: 'Fromage', fr: 'Fromage' }, price: '8' },
      { name: { ar: 'كاشير', en: 'Cachir', fr: 'Cachir' }, price: '10' },
      { name: { ar: 'تونة', en: 'Thon', fr: 'Thon' }, price: '12' },
      { name: { ar: 'دجاج', en: 'Poulet', fr: 'Poulet' }, price: '15' },
      { name: { ar: 'ديك رومي', en: 'Dinde', fr: 'Dinde' }, price: '15' },
      { name: { ar: 'كفتة', en: 'Kefta', fr: 'Kefta' }, price: '15' },
      { name: { ar: 'ميكست', en: 'Mixte', fr: 'Mixte' }, price: '17' },
      { name: { ar: 'ناجت', en: 'Nugget', fr: 'Nugget' }, price: '15' },
    ]
  },
  {
    category: 'tacos',
    title: "O'Tacos",
    image: 'https://i.redd.it/w7c6r5kiv5wd1.png',
    hasSizes: true,
    items: [
      { name: { ar: 'نقانق', en: 'Saucisse', fr: 'Saucisse' }, priceL: '20', priceXL: '25' },
      { name: { ar: 'دجاج', en: 'Poulet', fr: 'Poulet' }, priceL: '20', priceXL: '25' },
      { name: { ar: 'ديك رومي', en: 'Dinde', fr: 'Dinde' }, priceL: '20', priceXL: '25' },
      { name: { ar: 'كفتة', en: 'Kefta', fr: 'Kefta' }, priceL: '20', priceXL: '25' },
      { name: { ar: 'ميكست', en: 'Mixte', fr: 'Mixte' }, priceL: '25', priceXL: '30' },
      { name: { ar: 'ناجت', en: 'Nugget', fr: 'Nugget' }, priceL: '25', priceXL: '30' },
      { name: { ar: 'شاركوتري', en: 'Charcuterie', fr: 'Charcuterie' }, priceL: '25', priceXL: '30' },
    ]
  },
  {
    category: 'calzone',
    title: "Sandwichs Calzone",
    image: 'https://img.freepik.com/premium-photo/opened-open-calzone-italian-pizza-sandwich-with-cheese-plate-homemade-lithuania_530796-736.jpg',
    hasSizes: false,
    items: [
      { name: { ar: 'كلاسيكو (مارغريتا)', en: 'Classico (margarita)', fr: 'Classico (margarita)' }, price: '15' },
      { name: { ar: 'تونة وبطاطس', en: 'Thon-frite', fr: 'Thon-frite' }, price: '20' },
      { name: { ar: 'دجاج وبطاطس', en: 'Poulet-frite', fr: 'Poulet-frite' }, price: '20' },
      { name: { ar: 'كفتة', en: 'Kefta', fr: 'Kefta' }, price: '20' },
      { name: { ar: 'ميكست وبطاطس', en: 'Mixte-frite', fr: 'Mixte-frite' }, price: '25' },
      { name: { ar: 'ناجت وبطاطس', en: 'Nugget-frite', fr: 'Nugget-frite' }, price: '20' },
      { name: { ar: 'شاركوتري وبطاطس', en: 'Charcuterie-frite', fr: 'Charcuterie-frite' }, price: '20' },
    ]
  },
  {
    category: 'pasticcio',
    title: "O'Pasticcio",
    image: 'https://api.allonaya.ma/assets/files/Media/vmEpDbND6QNkmtnay/small/LJF.png',
    hasSizes: false,
    items: [
      { name: { ar: 'دجاج', en: 'Poulet', fr: 'Poulet' }, price: '25' },
      { name: { ar: 'كفتة', en: 'Kefta', fr: 'Kefta' }, price: '27' },
      { name: { ar: 'ناجت', en: 'Nugget', fr: 'Nugget' }, price: '28' },
      { name: { ar: 'ميكست', en: 'Mixte', fr: 'Mixte' }, price: '30' },
      { name: { ar: 'شاركوتري', en: 'Charcuterie', fr: 'Charcuterie' }, price: '30' },
    ]
  },
  {
    category: 'gratin',
    title: "O'Gratin",
    image: 'https://png.pngtree.com/png-vector/20241109/ourmid/pngtree-potato-gratin-baked-with-cream-and-cheese-on-white-bowl-transparent-png-image_14327586.png',
    hasSizes: false,
    items: [
      { name: { ar: 'ديك رومي', en: 'Dinde', fr: 'Dinde' }, price: '20' },
      { name: { ar: 'دجاج', en: 'Poulet', fr: 'Poulet' }, price: '20' },
      { name: { ar: 'كفتة', en: 'Kefta', fr: 'Kefta' }, price: '22' },
      { name: { ar: 'ميكست', en: 'Mixte', fr: 'Mixte' }, price: '25' },
    ]
  },
  {
    category: 'potchi',
    title: "Potchi",
    image: 'https://api.allonaya.ma/assets/files/Media/jadoZ9wsaPmEun9RC/large/paninijambon.jpg',
    hasSizes: false,
    items: [
      { name: { ar: 'باتاتي تونة', en: 'Patati Thon', fr: 'Patati Thon' }, price: '15' },
      { name: { ar: 'باتاتي ديك رومي', en: 'Patati Dinde', fr: 'Patati Dinde' }, price: '20' },
      { name: { ar: 'باتاتي كفتة', en: 'Patati Kefta', fr: 'Patati Kefta' }, price: '20' },
      { name: { ar: 'باتاتي ميكست', en: 'Patati Mixte', fr: 'Patati Mixte' }, price: '25' },
    ]
  },
  {
    category: 'drinks',
    title: "Boissons",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8iOYDdvIB5Fn3p0K4hIupGxoaXNXY3iZxKQ&s',
    hasSizes: false,
    items: [
      { name: { ar: 'مشروبات غازية', en: 'Canette', fr: 'Canette' }, price: '5 / 6 / 8' },
      { name: { ar: 'ماء معدني', en: 'Eau', fr: 'Eau' }, price: '3 / 5 / 10' },
    ]
  },
  {
    category: 'salade',
    title: "Salade",
    image: 'https://img.freepik.com/free-photo/salmon-avocado-salad-isolated-white-background_123827-20214.jpg?semt=ais_hybrid&w=740&q=80',
    hasSizes: false,
    items: [
      { name: { ar: 'سلطة خاصة', en: 'Salade Special', fr: 'Salade Special' }, price: '15' },
    ]
  }
];

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const getInitialLang = (): Language => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'ar' || savedLang === 'en' || savedLang === 'fr') return savedLang as Language;
    
    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('en')) return 'en';
    return 'ar'; // Default to Arabic
  };

  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = (newLang: Language) => {
    localStorage.setItem('lang', newLang);
    setLangState(newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
