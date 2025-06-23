'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'no';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.news': 'News',
    'nav.sale': 'Sale',
    'nav.indoor': 'Indoor',
    'nav.outdoor': 'Outdoor',
    'nav.furniture': 'Furniture',
    'nav.services': 'Services',
    'nav.brands': 'Brands',
    'nav.company': 'Company',
    'nav.contact': 'Contact',
    
    // Product related
    'product.outOfStock': 'Out of Stock',
    'product.noDescription': 'No description available',
    'product.shopNow': 'Shop Now',
    
    // Banner text
    'banner.madeFor': 'Made For',
    'banner.summer': 'Summer',
    'banner.collection': 'Our Scandia collection are made to be enjoyed this summer',
    'banner.off': 'OFF',
    
    // Promotional
    'promo.online': 'Online and in shop.',
    'promo.offAll': 'off all',
    
    // Common
    'common.search': 'Search',
    'common.cart': 'Cart',
    'common.stores': 'Stores',
    'common.orders': 'Orders',
    'common.welcome': 'Welcome',
    'common.signIn': 'Sign In',
    
    // Partners
    'partners.title': 'Our Partners',
    'partners.box1.title': 'Kartell',
    'partners.box1.description': 'Luxurious beauty in the Home.',
    'partners.box2.title': 'Montana',
    'partners.box2.description': 'Storage that elevates your home.',

    // Outdoor Categories
    'outdoor.categories.shop-all-outdoor': 'SHOP ALL OUTDOOR',
    'outdoor.categories.outdoor-furniture': 'OUTDOOR FURNITURE',
    'outdoor.categories.all-outdoor-furniture': 'All Outdoor Furniture',
    'outdoor.categories.outdoor-seating-sets': 'Outdoor Seating Sets',
    'outdoor.categories.outdoor-furniture-collections': 'Outdoor Furniture Collections',
    'outdoor.categories.dining-sets': 'Dining Sets',
    'outdoor.categories.chaise-lounges': 'Chaise Lounges',
    'outdoor.categories.sofas-&-seating': 'Sofas & Seating',
    'outdoor.categories.outdoor-furniture-cover': 'Outdoor Furniture Cover',
    'outdoor.categories.dining-tables': 'Dining Tables',
    'outdoor.categories.stools': 'Stools',
    'outdoor.categories.outdoor-cushions-&-pillows': 'OUTDOOR CUSHIONS & PILLOWS',
    'outdoor.categories.cushions': 'Cushions',
    'outdoor.categories.pillows': 'Pillows',
    'outdoor.categories.outdoor-umbrellas-and-stands': 'OUTDOOR UMBRELLAS AND STANDS',
    
    // Outdoor Banner
    'outdoor.banner.title': 'Our Outdoor Collection',
    'outdoor.banner.shopNow': 'Shop Now',
  },
  no: {
    // Navigation
    'nav.news': 'Nyheter',
    'nav.sale': 'Salg',
    'nav.indoor': 'Innendørs',
    'nav.outdoor': 'Utendørs',
    'nav.furniture': 'Møbler',
    'nav.services': 'Tjenester',
    'nav.brands': 'Merker',
    'nav.company': 'Selskap',
    'nav.contact': 'Kontakt',
    
    // Product related
    'product.outOfStock': 'Ikke på lager',
    'product.noDescription': 'Ingen beskrivelse tilgjengelig',
    'product.shopNow': 'Kjøp nå',
    
    // Banner text
    'banner.madeFor': 'Laget for',
    'banner.summer': 'Sommer',
    'banner.collection': 'Vår Scandia-kolleksjon er laget for å nytes denne sommeren',
    'banner.off': 'RABATT',
    
    // Promotional
    'promo.online': 'På nett og i butikk.',
    'promo.offAll': 'rabatt på alle',
    
    // Common
    'common.search': 'Søk',
    'common.cart': 'Handlekurv',
    'common.stores': 'Butikker',
    'common.orders': 'Bestillinger',
    'common.welcome': 'Velkommen',
    'common.signIn': 'Logg inn',
    
    // Partners
    'partners.title': 'Våre Partnere',
    'partners.box1.title': 'Kartell',
    'partners.box1.description': 'Luksuriøs skjønnhet i hjemmet.',
    'partners.box2.title': 'Montana',
    'partners.box2.description': 'Oppbevaring som løfter hjemmet ditt.',

    // Outdoor Categories
    'outdoor.categories.shop-all-outdoor': 'HANDLE ALLE UTENDØRS',
    'outdoor.categories.outdoor-furniture': 'UTENDØRSMØBLER',
    'outdoor.categories.all-outdoor-furniture': 'Alle Utendørsmøbler',
    'outdoor.categories.outdoor-seating-sets': 'Utendørs Sittegrupper',
    'outdoor.categories.outdoor-furniture-collections': 'Utendørsmøbler Kolleksjoner',
    'outdoor.categories.dining-sets': 'Spisesett',
    'outdoor.categories.chaise-lounges': 'Solsenger',
    'outdoor.categories.sofas-&-seating': 'Sofaer & Sitteplasser',
    'outdoor.categories.outdoor-furniture-cover': 'Utendørsmøbel Trekk',
    'outdoor.categories.dining-tables': 'Spisebord',
    'outdoor.categories.stools': 'Krakker',
    'outdoor.categories.outdoor-cushions-&-pillows': 'UTENDØRS PUTER & PUTER',
    'outdoor.categories.cushions': 'Puter',
    'outdoor.categories.pillows': 'Puter',
    'outdoor.categories.outdoor-umbrellas-and-stands': 'UTENDØRS PARASOLLER OG STATIV',
    
    // Outdoor Banner
    'outdoor.banner.title': 'Vår Utendørs Kolleksjon',
    'outdoor.banner.shopNow': 'Handle Nå',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('no'); // Default to Norwegian

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
