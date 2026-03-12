/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Footer from './components/Footer';
import LocationPage from './components/LocationPage';
import { LanguageProvider, useLanguage, Language } from './i18n';
import { CartProvider } from './CartContext';
import Cart from './components/Cart';

function AppContent() {
  const { lang, setLang } = useLanguage();
  const { lang: urlLang } = useParams();
  const location = useLocation();

  if (urlLang && !['ar', 'en', 'fr'].includes(urlLang)) {
    return <Navigate to={`/${lang}${location.pathname.replace(`/${urlLang}`, '')}`} replace />;
  }

  useEffect(() => {
    if (urlLang && ['ar', 'en', 'fr'].includes(urlLang)) {
      if (urlLang !== lang) {
        setLang(urlLang as Language);
      }
    }
  }, [urlLang, lang, setLang]);

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-dark-900 font-sans text-stone-200 selection:bg-brand-500 selection:text-white overflow-x-hidden flex flex-col"
    >
      <Navbar />
      <Cart />
      <main className="flex-grow">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Menu />
      <About />
    </>
  );
}

function MenuPage() {
  return (
    <div className="pt-20">
      <Menu />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-20">
      <About />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <CartProvider>
          <Routes>
            <Route path="/:lang/*" element={<AppContent />} />
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

function RootRedirect() {
  const { lang } = useLanguage();
  const location = useLocation();
  return <Navigate to={`/${lang}${location.pathname}`} replace />;
}
