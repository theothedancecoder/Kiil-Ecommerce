// Norwegian translations for product names and common terms
export const productTranslations: Record<string, string> = {
  // Furniture types
  "chair": "stol",
  "table": "bord",
  "sofa": "sofa",
  "lamp": "lampe",
  "mirror": "speil",
  "candlestick": "lysestake",
  "rug": "teppe",
  "carpet": "teppe",
  "cushion": "pute",
  "pillow": "pute",
  "blanket": "pledd",
  "vase": "vase",
  "bowl": "bolle",
  "plate": "tallerken",
  "drinking_glass": "glass",
  "cup": "kopp",
  "mug": "krus",
  "bottle": "flaske",
  "basket": "kurv",
  "box": "boks",
  "shelf": "hylle",
  "cabinet": "skap",
  "drawer": "skuff",
  "wardrobe": "garderobe",
  "bed": "seng",
  "mattress": "madrass",
  "bedding": "sengetøy",
  "curtain": "gardin",
  "blind": "rullegardin",
  
  // Colors
  "black": "svart",
  "white": "hvit",
  "red": "rød",
  "blue": "blå",
  "green": "grønn",
  "yellow": "gul",
  "orange": "oransje",
  "purple": "lilla",
  "pink": "rosa",
  "brown": "brun",
  "grey": "grå",
  "gray": "grå",
  "beige": "beige",
  "cream": "krem",
  "gold": "gull",
  "silver": "sølv",
  "metallic": "metallisk",
  
  // Materials
  "wood": "tre",
  "metal": "metall",
  "glass": "glass",
  "plastic": "plast",
  "fabric": "stoff",
  "leather": "lær",
  "cotton": "bomull",
  "wool": "ull",
  "silk": "silke",
  "linen": "lin",
  "velvet": "fløyel",
  "ceramic": "keramikk",
  "stone": "stein",
  "marble": "marmor",
  "granite": "granitt",
  
  // Specific product names (add more as needed)
  "AJ vegglampe med ledning": "AJ vegglampe med ledning",
  "Abbracciato candlestick": "Abbracciato lysestake",
  "Abernethy Pimento Wool": "Abernethy Pimento Ull",
  "All saints metallic speil": "All saints metallisk speil",
  
  // Common terms
  "with": "med",
  "and": "og",
  "or": "eller",
  "for": "for",
  "in": "i",
  "on": "på",
  "at": "på",
  "by": "av",
  "from": "fra",
  "to": "til",
  "of": "av",
  "the": "",
  "a": "en",
  "an": "en",
  "collection": "kolleksjon",
  "series": "serie",
  "set": "sett",
  "piece": "stykke",
  "design": "design",
  "style": "stil",
  "modern": "moderne",
  "classic": "klassisk",
  "vintage": "vintage",
  "contemporary": "samtidig",
  "traditional": "tradisjonell",
  "scandinavian": "skandinavisk",
  "nordic": "nordisk",
  "luxury": "luksus",
  "premium": "premium",
  "handmade": "håndlaget",
  "handcrafted": "håndverket",
  "artisan": "håndverker",
  "designer": "designer",
  "limited": "begrenset",
  "edition": "utgave",
  "exclusive": "eksklusiv",
  "unique": "unik",
  "original": "original",
  "authentic": "autentisk",
  "genuine": "ekte",
  "quality": "kvalitet",
  "durable": "holdbar",
  "sustainable": "bærekraftig",
  "eco-friendly": "miljøvennlig",
  "natural": "naturlig",
  "organic": "organisk",
  
  // Outdoor specific terms
  "outdoor": "utendørs",
  "our outdoor collection": "vår utendørs kolleksjon",
  "shop now": "handle nå",

  // Service page translations
  "service.banner.title": "DESIGN CONSULTATION",
  "service.banner.learnMore": "LEARN MORE",
  "service.design.tagline": "Design your dream space with our expert consultation services",
  "service.intro.text": "Our experienced design consultants are here to help you create the perfect living space that reflects your personal style and meets your functional needs.",
  "service.connect.text": "Connect with us today to start your design journey.",
  "service.store.title": "IN-STORE CONSULTATION",
  "service.store.description": "Visit our showroom for personalized design consultation with our experts.",
  "service.home.title": "IN-HOME CONSULTATION", 
  "service.home.description": "Our design experts will visit your home to provide tailored advice.",
  "service.phone.title": "ON PHONE CONSULTATION",
  "service.phone.description": "Book a phone consultation with your personal design expert to explore your vision and goals for your space. Together we will create something remarkable.",
  "service.button.choose": "CHOOSE THIS",

  // Interior category translations
  "interior.categories.shop all interior": "SE ALLE INTERIØR",
  "interior.categories.living room": "STUE",
  "interior.categories.furniture": "Møbler",
  "interior.categories.chairs": "Stoler",
  "interior.categories.sofa": "Sofa",
  "interior.categories.lamp & illumination": "Lampe & Belysning",
  "interior.categories.dining & kitchen": "SPISESTUE & KJØKKEN",
  "interior.categories.dining tables": "Spisebord",
  "interior.categories.dining chairs": "Spisestoler",
  "interior.categories.bathroom": "BAD",
  "interior.categories.mirrors": "Speil",
  "interior.categories.towels": "Håndklær",
  "interior.categories.bathrobe & accessories": "Badekåpe & Tilbehør",
  "interior.categories.cabinets": "Skap",
  "interior.categories.toilet essentials": "Toalett Essensielle",
  "interior.categories.bedroom": "SOVEROM",
  "interior.categories.beds": "Senger",
  "interior.categories.dressers": "Kommoder",
  "interior.categories.nightstand": "Nattbord",
  "interior.categories.home office": "HJEMMEKONTOR",
  "interior.categories.desk & cabinets": "Skrivebord & Skap",
  "interior.categories.home organisation": "HJEMMEORGANISERING",
  "interior.categories.storage": "Oppbevaring"
};

export function translateToNorwegian(text: string): string {
  if (!text) return text;
  
  let translatedText = text.toLowerCase();
  
  // Replace words with Norwegian equivalents
  Object.entries(productTranslations).forEach(([english, norwegian]) => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translatedText = translatedText.replace(regex, norwegian);
  });
  
  // Capitalize first letter of each word
  return translatedText
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
