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
    'nav.interior': 'Interior',
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
    
    // Interior Categories
    'interior.categories.shop-all-interior': 'SHOP ALL INTERIOR',
    'interior.categories.living-room': 'LIVING ROOM',
    'interior.categories.all-living-room': 'All Living Room',
    'interior.categories.sofas-&-seating': 'Sofas & Seating',
    'interior.categories.coffee-tables': 'Coffee Tables',
    'interior.categories.side-tables': 'Side Tables',
    'interior.categories.tv-units': 'TV Units',
    'interior.categories.dining-room': 'DINING ROOM',
    'interior.categories.all-dining-room': 'All Dining Room',
    'interior.categories.dining-tables': 'Dining Tables',
    'interior.categories.dining-chairs': 'Dining Chairs',
    'interior.categories.sideboards': 'Sideboards',
    'interior.categories.bedroom': 'BEDROOM',
    'interior.categories.all-bedroom': 'All Bedroom',
    'interior.categories.beds': 'Beds',
    'interior.categories.wardrobes': 'Wardrobes',
    'interior.categories.dressers': 'Dressers',
    'interior.categories.nightstands': 'Nightstands',
    'interior.categories.office': 'OFFICE',
    'interior.categories.all-office': 'All Office',
    'interior.categories.desks': 'Desks',
    'interior.categories.office-chairs': 'Office Chairs',
    'interior.categories.storage-solutions': 'Storage Solutions',
    
    // Interior Banner
    'interior.banner.title': 'Our Interior Collection',
    'interior.banner.shopNow': 'Shop Now',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We are here to help you with all your questions and inquiries.',
    'contact.form.title': 'Send us a message',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'your.email@example.com',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'What is your inquiry about?',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Write your message here...',
    'contact.form.submit': 'Send Message',
    'contact.store.title': 'Visit our store',
    'contact.store.address': 'Address',
    'contact.store.hours': 'Opening Hours',
    'contact.store.weekdays': 'Monday - Friday: 10:00 - 18:00',
    'contact.store.saturday': 'Saturday: 10:00 - 16:00',
    'contact.store.sunday': 'Sunday: Closed',
    'contact.info.title': 'Contact Information',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.support': 'Customer Service',
    'contact.info.support.hours': 'Monday - Friday: 09:00 - 17:00',
    'contact.emergency.title': 'Urgent Inquiries',
    'contact.emergency.message': 'For urgent inquiries outside our opening hours, please send an email to urgent@kiil.no',

    // Service Banner
    'service.banner.title': 'DESIGN CONSULTATION',
    'service.banner.learnMore': 'LEARN MORE',
    'service.design.tagline': 'Design your dream space with our expert consultation services',
    'service.intro.text': 'Our experienced design consultants are here to help you create the perfect living space that reflects your personal style and meets your functional needs.',
    'service.connect.text': 'Connect with us today to start your design journey.',
    
    // In-store consultation
    'service.store.title': 'IN-STORE CONSULTATION',
    'service.store.description': 'Visit our showroom for personalized design consultation with our experts.',
    'service.store.titleHeader': 'In-Store Consultation',
    'service.store.subtitle': 'Visit our showroom for personalized design consultation',
    'service.store.whatYouGet': 'What You\'ll Get:',
    'service.store.howItWorks': 'How It Works:',
    'service.store.benefit1': 'Hands-on experience with our furniture and decor',
    'service.store.benefit2': 'Expert guidance from our design consultants',
    'service.store.benefit3': 'See and feel materials, textures, and finishes',
    'service.store.benefit4': 'Immediate answers to your design questions',
    'service.store.benefit5': 'Access to our full product catalog',
    'service.store.benefit6': 'Personalized recommendations based on your style',
    'service.store.step1': 'Visit our showroom during business hours',
    'service.store.step2': 'Meet with one of our design consultants',
    'service.store.step3': 'Explore our furniture and decor collections',
    'service.store.step4': 'Discuss your space and design goals',
    'service.store.step5': 'Get expert recommendations and styling tips',
    'service.store.step6': 'Take home samples and product information',
    
    // In-home consultation
    'service.home.title': 'IN-HOME CONSULTATION',
    'service.home.description': 'Our design experts will visit your home to provide tailored advice.',
    'service.home.titleHeader': 'In-Home Consultation',
    'service.home.subtitle': 'Expert design consultation in the comfort of your home',
    'service.home.whatYouGet': 'What You\'ll Get:',
    'service.home.howItWorks': 'How It Works:',
    'service.home.benefit1': 'Personalized consultation in your own space',
    'service.home.benefit2': 'Expert measurements and space planning',
    'service.home.benefit3': 'Hands-on material and color selection',
    'service.home.benefit4': 'Immediate visualization of design ideas',
    'service.home.benefit5': 'Detailed project planning',
    'service.home.benefit6': 'Custom solutions for your specific needs',
    'service.home.step1': 'Book your preferred 2-hour time slot',
    'service.home.step2': 'Provide your address and contact details',
    'service.home.step3': 'Our expert arrives at scheduled time',
    'service.home.step4': 'Walk through your space together',
    'service.home.step5': 'Discuss design options and solutions',
    'service.home.step6': 'Receive detailed recommendations and next steps',
    
    'service.phone.title': 'ON PHONE CONSULTATION',
    'service.phone.description': 'Book a phone consultation with your personal design expert to explore your vision and goals for your space. Together we will create something remarkable.',
    'service.online.description': 'Connect with us online for a virtual consultation. Share your ideas and get expert guidance from anywhere.',
    'service.button.choose': 'CHOOSE THIS',

    // Montana page translations
    'montana.hero.title': 'Montana',
    'montana.hero.subtitle': 'Storage that elevates your home with Danish design excellence',
    'montana.about.title': 'About Montana',
    'montana.about.description1': 'Montana is a Danish furniture company founded in 1982, renowned for creating modular storage systems that combine functionality with timeless Scandinavian design. Each piece is crafted with precision and attention to detail, offering endless possibilities for customization.',
    'montana.about.description2': 'From minimalist shelving to sophisticated storage solutions, Montana furniture adapts to your lifestyle and space, growing with your needs while maintaining its elegant aesthetic.',
    'montana.about.feature1': 'Modular design system',
    'montana.about.feature2': 'Sustainable materials',
    'montana.about.feature3': 'Danish craftsmanship',
    'montana.about.feature4': 'Endless customization options',
    'montana.products.title': 'Montana Furniture Collection',
    'montana.cta.title': 'Ready to Transform Your Space?',
    'montana.cta.subtitle': 'Discover the full Montana collection and find the perfect storage solution for your home.',
    'montana.cta.browse': 'Browse Collection',
    'montana.cta.contact': 'Contact Us',
    'montana.variants.title': 'Color Variants',
    'montana.viewDetails': 'View Details',
    
    // Montana product translations
    'montana.storage.name': 'Montana Storage System',
    'montana.storage.description': 'Modular storage solutions that adapt to your space',
    'montana.collection2017.name': 'Montana Collection 2017',
    'montana.collection2017.description': 'Complete furniture collection with multiple styles',
    'montana.pantonwire.name': 'Montana Panton Wire Extended',
    'montana.pantonwire.description': 'Iconic wire furniture with modern aesthetics',
    'montana.monterey.name': 'Montana Monterey',
    'montana.monterey.description': 'Contemporary storage with clean lines',
    'montana.office.name': 'Montana Office Solutions',
    'montana.office.description': 'Professional workspace storage and organization',
    'montana.mini.name': 'Montana Mini Collection',
    'montana.mini.description': 'Compact storage solutions for smaller spaces',
    'montana.bureau.name': 'Montana Bureau',
    'montana.bureau.description': 'Sophisticated desk and workspace solutions',
    'montana.home.name': 'Montana Home Collection',
    'montana.home.description': 'Residential furniture for every room',
    'montana.campaign.name': 'Montana Campaign Collection',
    'montana.campaign.description': 'Featured campaign furniture pieces',
  },
  no: {
    // Navigation
    'nav.news': 'Nyheter',
    'nav.sale': 'Salg',
    'nav.interior': 'Interiør',
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
    
    // Interior Categories
    'interior.categories.shop-all-interior': 'HANDLE ALLE INTERIØR',
    'interior.categories.living-room': 'STUE',
    'interior.categories.furniture': 'Møbler',
    'interior.categories.chairs': 'Stoler',
    'interior.categories.sofa': 'Sofa',
    'interior.categories.lamp-&-illumination': 'Lampe & Belysning',
    'interior.categories.dining-&-kitchen': 'SPISESTUE & KJØKKEN',
    'interior.categories.dining-tables': 'Spisebord',
    'interior.categories.dining-chairs': 'Spisestoler',
    'interior.categories.bathroom': 'BAD',
    'interior.categories.mirrors': 'Speil',
    'interior.categories.towels': 'Håndklær',
    'interior.categories.bathrobe-&-accessories': 'Badekåpe & Tilbehør',
    'interior.categories.cabinets': 'Skap',
    'interior.categories.toilet-essentials': 'Toalett Essensielle',
    'interior.categories.bedroom': 'SOVEROM',
    'interior.categories.beds': 'Senger',
    'interior.categories.dressers': 'Kommoder',
    'interior.categories.nightstand': 'Nattbord',
    'interior.categories.home-office': 'HJEMMEKONTOR',
    'interior.categories.desk-&-cabinets': 'Skrivebord & Skap',
    'interior.categories.home-organisation': 'HJEMMEORGANISERING',
    'interior.categories.storage': 'Oppbevaring',
    
    // Interior Banner
    'interior.banner.title': 'Vår Interiør Kolleksjon',
    'interior.banner.shopNow': 'Handle Nå',

    // Contact Page
    'contact.title': 'Kontakt Oss',
    'contact.subtitle': 'Vi er her for å hjelpe deg med alle dine spørsmål og henvendelser.',
    'contact.form.title': 'Send oss en melding',
    'contact.form.name': 'Navn',
    'contact.form.name.placeholder': 'Ditt navn',
    'contact.form.email': 'E-post',
    'contact.form.email.placeholder': 'din.epost@example.com',
    'contact.form.subject': 'Emne',
    'contact.form.subject.placeholder': 'Hva gjelder henvendelsen?',
    'contact.form.message': 'Melding',
    'contact.form.message.placeholder': 'Skriv din melding her...',
    'contact.form.submit': 'Send Melding',
    'contact.store.title': 'Besøk vår butikk',
    'contact.store.address': 'Adresse',
    'contact.store.hours': 'Åpningstider',
    'contact.store.weekdays': 'Mandag - Fredag: 10:00 - 18:00',
    'contact.store.saturday': 'Lørdag: 10:00 - 16:00',
    'contact.store.sunday': 'Søndag: Stengt',
    'contact.info.title': 'Kontaktinformasjon',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-post',
    'contact.info.support': 'Kundeservice',
    'contact.info.support.hours': 'Mandag - Fredag: 09:00 - 17:00',
    'contact.emergency.title': 'Hastehenvendelser',
    'contact.emergency.message': 'For hastehenvendelser utenfor våre åpningstider, vennligst send en e-post til haster@kiil.no',

    // Service Banner
    'service.banner.title': 'DESIGNKONSULTASJON',
    'service.banner.learnMore': 'LES MER',
    'service.design.tagline': 'Design ditt drømmerom med våre ekspertkonsultasjonstjenester',
    'service.intro.text': 'Våre erfarne designkonsulenter er her for å hjelpe deg med å skape det perfekte rommet som gjenspeiler din personlige stil og møter dine funksjonelle behov.',
    'service.connect.text': 'Ta kontakt med oss i dag for å starte din designreise.',
    
    // In-store consultation
    'service.store.title': 'BUTIKKONSULTASJON',
    'service.store.description': 'Besøk vårt showroom for personlig designkonsultasjon med våre eksperter.',
    'service.store.titleHeader': 'Butikkonsultasjon',
    'service.store.subtitle': 'Besøk vårt showroom for personlig designkonsultasjon',
    'service.store.whatYouGet': 'Dette får du:',
    'service.store.howItWorks': 'Slik fungerer det:',
    'service.store.benefit1': 'Praktisk erfaring med våre møbler og interiør',
    'service.store.benefit2': 'Ekspertveiledning fra våre designkonsulenter',
    'service.store.benefit3': 'Se og føl materialer, teksturer og finish',
    'service.store.benefit4': 'Umiddelbare svar på dine designspørsmål',
    'service.store.benefit5': 'Tilgang til vår komplette produktkatalog',
    'service.store.benefit6': 'Personlige anbefalinger basert på din stil',
    'service.store.step1': 'Besøk vårt showroom i åpningstiden',
    'service.store.step2': 'Møt en av våre designkonsulenter',
    'service.store.step3': 'Utforsk våre møbel- og interiørkolleksjoner',
    'service.store.step4': 'Diskuter ditt rom og designmål',
    'service.store.step5': 'Få ekspertanbefalinger og stylingtips',
    'service.store.step6': 'Ta med prøver og produktinformasjon hjem',
    
    // In-home consultation
    'service.home.title': 'HJEMMEKONSULTASJON',
    'service.home.description': 'Våre designeksperter vil besøke hjemmet ditt for å gi skreddersydde råd.',
    'service.home.titleHeader': 'Hjemmekonsultasjon',
    'service.home.subtitle': 'Ekspert designkonsultasjon i ditt eget hjem',
    'service.home.whatYouGet': 'Dette får du:',
    'service.home.howItWorks': 'Slik fungerer det:',
    'service.home.benefit1': 'Personlig konsultasjon i ditt eget rom',
    'service.home.benefit2': 'Ekspertmålinger og romplanlegging',
    'service.home.benefit3': 'Praktisk material- og fargeutvalg',
    'service.home.benefit4': 'Umiddelbar visualisering av designideer',
    'service.home.benefit5': 'Detaljert prosjektplanlegging',
    'service.home.benefit6': 'Skreddersydde løsninger for dine behov',
    'service.home.step1': 'Bestill din foretrukne 2-timers tid',
    'service.home.step2': 'Oppgi din adresse og kontaktinformasjon',
    'service.home.step3': 'Vår ekspert ankommer til avtalt tid',
    'service.home.step4': 'Gå gjennom rommet ditt sammen',
    'service.home.step5': 'Diskuter designmuligheter og løsninger',
    'service.home.step6': 'Motta detaljerte anbefalinger og neste steg',
    
    'service.phone.title': 'TELEFONKONSULTASJON',
    'service.phone.description': 'Bestill en telefonkonsultasjon med din personlige designekspert for å utforske din visjon og mål for ditt rom. Sammen vil vi skape noe bemerkelsesverdig.',
    'service.online.description': 'Koble til oss online for en virtuell konsultasjon. Del dine ideer og få ekspertveiledning hvor som helst.',
    'service.button.choose': 'VELG DENNE',

    // Montana page translations
    'montana.hero.title': 'Montana',
    'montana.hero.subtitle': 'Oppbevaring som løfter hjemmet ditt med dansk designekspertise',
    'montana.about.title': 'Om Montana',
    'montana.about.description1': 'Montana er et dansk møbelselskap grunnlagt i 1982, kjent for å skape modulære oppbevaringssystemer som kombinerer funksjonalitet med tidløs skandinavisk design. Hvert stykke er laget med presisjon og oppmerksomhet på detaljer, og tilbyr uendelige muligheter for tilpasning.',
    'montana.about.description2': 'Fra minimalistiske hyller til sofistikerte oppbevaringsløsninger, Montana-møbler tilpasser seg din livsstil og ditt rom, og vokser med dine behov samtidig som de opprettholder sin elegante estetikk.',
    'montana.about.feature1': 'Modulært designsystem',
    'montana.about.feature2': 'Bærekraftige materialer',
    'montana.about.feature3': 'Dansk håndverk',
    'montana.about.feature4': 'Uendelige tilpasningsmuligheter',
    'montana.products.title': 'Montana Møbelkolleksjon',
    'montana.cta.title': 'Klar til å Transformere Rommet Ditt?',
    'montana.cta.subtitle': 'Oppdag hele Montana-kolleksjonen og finn den perfekte oppbevaringsløsningen for hjemmet ditt.',
    'montana.cta.browse': 'Bla Gjennom Kolleksjon',
    'montana.cta.contact': 'Kontakt Oss',
    'montana.variants.title': 'Fargevarianter',
    'montana.viewDetails': 'Se Detaljer',
    
    // Montana product translations
    'montana.storage.name': 'Montana Oppbevaringssystem',
    'montana.storage.description': 'Modulære oppbevaringsløsninger som tilpasser seg ditt rom',
    'montana.collection2017.name': 'Montana Kolleksjon 2017',
    'montana.collection2017.description': 'Komplett møbelkolleksjon med flere stiler',
    'montana.pantonwire.name': 'Montana Panton Wire Extended',
    'montana.pantonwire.description': 'Ikoniske ståltråd møbler med moderne estetikk',
    'montana.monterey.name': 'Montana Monterey',
    'montana.monterey.description': 'Moderne oppbevaring med rene linjer',
    'montana.office.name': 'Montana Kontorløsninger',
    'montana.office.description': 'Profesjonell arbeidsplassoppbevaring og organisering',
    'montana.mini.name': 'Montana Mini Kolleksjon',
    'montana.mini.description': 'Kompakte oppbevaringsløsninger for mindre rom',
    'montana.bureau.name': 'Montana Bureau',
    'montana.bureau.description': 'Sofistikerte skrivebord og arbeidsplassløsninger',
    'montana.home.name': 'Montana Hjemmekolleksjon',
    'montana.home.description': 'Boligmøbler for alle rom',
    'montana.campaign.name': 'Montana Kampanjekolleksjon',
    'montana.campaign.description': 'Utvalgte kampanjemøbler',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('no'); // Default to Norwegian

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation !== undefined ? translation : key;
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
