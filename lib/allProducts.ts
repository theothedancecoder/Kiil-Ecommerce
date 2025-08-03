export interface ProductVariant {
  name: string;
  image: string;
  color?: string;
  material?: string;
  size?: string;
  price?: number;
}

export interface StaticProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  image: string;
  href: string;
  variants?: ProductVariant[];
  lifestyleImages?: string[];
  inStock?: boolean;
  roomCategory?: string; // Added for furniture page filtering
}

// Lazy load products to reduce initial bundle size
let _allProducts: StaticProduct[] | null = null;

const loadProducts = (): StaticProduct[] => {
  if (_allProducts) return _allProducts;

  _allProducts = [
    // HAY PRODUCTS
    {
      id: 'hay-dont-leave-me-dlm-side-table',
      name: "Don't Leave Me - DLM Side Table",
      description: 'Playful and functional side table with vibrant colors and high-quality finish options.',
      price: 2649,
      brand: 'HAY',
      category: 'Tables',
      image: '/HAY/Don`t-leave me-DLM-side-table /HAY Don`t leave me - DLM side table kr  2 649  Color -  Black.jpg',
      href: '/hay/hay-dont-leave-me-dlm-side-table',
      variants: [
        { name: 'Black', image: '/HAY/Don`t-leave me-DLM-side-table /HAY Don`t leave me - DLM side table kr  2 649  Color -  Black.jpg', color: 'Black' },
        { name: 'Cherry Red High Gloss', image: '/HAY/Don`t-leave me-DLM-side-table /Don`t leave me - DLM side table kr  2 649  Color -  Cherry Red High Gloss.jpg', color: 'Cherry Red High Gloss' },
        { name: 'Grey', image: '/HAY/Don`t-leave me-DLM-side-table /Don`t leave me - DLM side table kr  2 649  Color -  Grey.jpg', color: 'Grey' },
        { name: 'Deep Blue High Gloss', image: '/HAY/Don`t-leave me-DLM-side-table /Don`t leave me – DLM- sidebord kr 2 649  Farge - Deep Blue High Gloss.jpg', color: 'Deep Blue High Gloss' },
        { name: 'Sun Yellow', image: '/HAY/Don`t-leave me-DLM-side-table /Don`t leave me – DLM- sidebord kr 2 649  Farge - Sun Yellow.jpg', color: 'Sun Yellow' },
        { name: 'Toffee', image: '/HAY/Don`t-leave me-DLM-side-table /Don`t leave me – DLM- sidebord kr 2 649  Farge - Toffee.jpg', color: 'Toffee' },
        { name: 'White', image: '/HAY/Don`t-leave me-DLM-side-table /Don`t leave me – DLM- sidebord kr 2 649  Farge - White.jpg', color: 'White' }
      ],
      lifestyleImages: [
        '/HAY/Don`t-leave me-DLM-side-table /lifestyle/10509796r_3.jpg'
      ],
      inStock: true,
    },

    // Sibast Furniture PRODUCTS
    {
      id: 'sibast-no-2-1-dining-table',
      name: 'No.2.1 Dining Table',
      description: 'Elegant dining table with two extensions, crafted from walnut and designed for timeless appeal.',
      price: 45000,
      brand: 'Sibast Furniture',
      category: 'Tables',
      image: '/Sibast-Furniture/No.2.1-dining-table/main.jpg',
      href: '/sibast/no-2-1-dining-table',
      variants: [
        { name: 'Walnut', image: '/Sibast-Furniture/No.2.1-dining-table/variants/walnut.jpg', material: 'Walnut' },
        { name: 'Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/variants/oiled-oak.jpg', material: 'Oiled Oak' }
      ],
      lifestyleImages: [
        '/Sibast-Furniture/No.2.1-dining-table/lifestyle/Sibast-No-2-1-dining-table-2-extensions-walnut-in-setting.webp'
      ],
      inStock: true,
    },
    {
      id: 'sibast-no-7-dining-chair',
      name: 'No.7 Dining Chair',
      description: 'Classic dining chair with leather upholstery, combining comfort and Scandinavian design.',
      price: 12000,
      brand: 'Sibast Furniture',
      category: 'Chair',
      image: '/Sibast-Furniture/No.7-dining-chair/main.jpg',
      href: '/sibast/no-7-dining-chair',
      variants: [
        { name: 'Leather Cognac', image: '/Sibast-Furniture/No.7-dining-chair/variants/leather-cognac.jpg', material: 'Leather Cognac' },
        { name: 'Leather Aniline', image: '/Sibast-Furniture/No.7-dining-chair/variants/leather-aniline.jpg', material: 'Leather Aniline' }
      ],
      lifestyleImages: [
        '/Sibast-Furniture/No.7-dining-chair/lifestyle/Sibast-No-7-Dining-Chair-Leather-Cognac-Aniline.webp'
      ],
      inStock: true,
    },
    {
      id: 'sibast-no-8-dining-chair',
      name: 'No.8 Dining Chair',
      description: 'Elegant dining chair with a white oil oak frame and grey aniline leather seat.',
      price: 13000,
      brand: 'Sibast Furniture',
      category: 'Chair',
      image: '/Sibast-Furniture/No.8-dining-chair/main.jpg',
      href: '/sibast/no-8-dining-chair',
      variants: [
        { name: 'White Oil Oak', image: '/Sibast-Furniture/No.8-dining-chair/variants/white-oil-oak.jpg', material: 'White Oil Oak' },
        { name: 'Grey Aniline Leather', image: '/Sibast-Furniture/No.8-dining-chair/variants/grey-aniline-leather.jpg', material: 'Grey Aniline Leather' }
      ],
      lifestyleImages: [
        '/Sibast-Furniture/No.8-dining-chair/lifestyle/Sibast-No-8-Dining-Chair-White-Oil-Oak-Grey-Aniline-Leather.webp'
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-regatta-chair',
      name: 'Regatta Lounge Chair',
      description: 'Contemporary outdoor lounge chair with clean lines and comfortable proportions.',
      price: 12999,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg',
      href: '/fritz-hansen/regatta-chair',
      variants: [
        {
          name: 'Standard',
          image: '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg',
          price: 12999,
        },
      ],
      lifestyleImages: [
        '/Fritz Hansen/Regatta-Chair/lifestyle/Regatta_Cam01_Main_v06.jpg',
        '/Fritz Hansen/Regatta-Chair/lifestyle/Regatta-Set.jpg'
      ],
      inStock: true,
    },

    // FREDERICIA PRODUCTS
    {
      id: 'fredericia-bm71-library-table',
      name: 'BM71 Library Table',
      description: 'Elegant library table designed with clean lines and premium materials. Perfect for modern workspaces and home offices.',
      price: 75750,
      brand: 'Fredericia',
      category: 'Tables',
      image: '/fredericia/bm71-library-table/main.jpg',
      href: '/fredericia/bm71-library-table',
      variants: [
        { name: 'Standard', image: '/fredericia/bm71-library-table/main.jpg', material: 'Premium oak' }
      ],
      lifestyleImages: [
        '/fredericia/bm71-library-table/lifestyle1.jpg'
      ],
      inStock: true,
    },

    {
      id: 'fredericia-wegner-ox-chair',
      name: 'Wegner Ox Chair',
      description: 'Iconic Ox Chair designed by Hans J. Wegner. A masterpiece of Danish furniture design with exceptional comfort and style.',
      price: 139995,
      brand: 'Fredericia',
      category: 'Chair',
      image: '/fredericia/wegner-ox-chair/main.jpg',
      href: '/fredericia/wegner-ox-chair',
      variants: [
        { name: 'Essene Cognac', image: '/fredericia/wegner-ox-chair/main.jpg', material: 'Premium leather' }
      ],
      inStock: true,
    },

    {
      id: 'fredericia-delphi-elements-sofa',
      name: 'Delphi Elements Sofa',
      description: 'Modular sofa system offering endless configuration possibilities. Contemporary design meets exceptional comfort.',
      price: 125000,
      brand: 'Fredericia',
      category: 'Seating',
      image: '/fredericia/delphi-elements-sofa/main.jpg',
      href: '/fredericia/delphi-elements-sofa',
      variants: [
        { name: 'Steelcut Trio 213', image: '/fredericia/delphi-elements-sofa/main.jpg', material: 'Steelcut Trio fabric' }
      ],
      inStock: true,
    },

    {
      id: 'fredericia-ej220-sofa-2-seater',
      name: 'EJ220 Sofa 2 Seater',
      description: 'Elegant two-seater sofa with refined proportions and premium materials. Available in various upholstery options.',
      price: 98000,
      brand: 'Fredericia',
      category: 'Seating',
      image: '/fredericia/ej220-sofa/main.jpg',
      href: '/fredericia/ej220-sofa-2-seater',
      variants: [
        { name: 'Leather Max 95 Cognac', image: '/fredericia/ej220-sofa/main.jpg', material: 'Leather Max 95' },
        { name: 'Erik 9998 Broken Grey', image: '/fredericia/ej220-sofa/variant1.jpg', material: 'Erik fabric' }
      ],
      lifestyleImages: [
        '/fredericia/ej220-sofa/lifestyle1.jpg'
      ],
      inStock: true,
    },

    // Additional HAY products for better furniture selection
    {
      id: 'hay-palisade-chair',
      name: 'Palisade Chair',
      description: 'Contemporary dining chair with distinctive slatted design, available in multiple colors.',
      price: 4149,
      brand: 'HAY',
      category: 'Chair',
      image: '/HAY/Palisade-Chair/Palisade Chair kr  4 149  Color -  Anthracite.jpg',
      href: '/hay/hay-palisade-chair',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palisade-Chair/Palisade Chair kr  4 149  Color -  Anthracite.jpg', color: 'Anthracite', price: 4149 },
        { name: 'Cream White', image: '/HAY/Palisade-Chair/Palisade Chair kr  4 149  Color -  Cream white.jpg', color: 'Cream White', price: 4149 },
        { name: 'Iron Red', image: '/HAY/Palisade-Chair/Palisade Chair kr  4 149  Color -  Iron Red.jpg', color: 'Iron Red', price: 4149 },
        { name: 'Olive', image: '/HAY/Palisade-Chair/Palisade Chair kr  4 149  Color -  Olive.jpg', color: 'Olive', price: 4149 },
        { name: 'Sky Grey', image: '/HAY/Palisade-Chair/Palisade Chair kr  4 149  Color -  Sky grey.jpg', color: 'Sky Grey', price: 4149 }
      ],
      inStock: true,
    },

    {
      id: 'hay-kofi-coffee-table-60x60',
      name: 'Kofi Coffee Table 60×60',
      description: 'Modern coffee table with elegant glass top and premium wood frame construction.',
      price: 6099,
      brand: 'HAY',
      category: 'Tables',
      image: '/HAY/Kofi-coffee-table-60×60/Kofi coffee table 60×60, H-36 NOK  6,099  Variants -  Clear glass Clear glass Grooved glass Color -  Black lacquered oak.jpg',
      href: '/hay/hay-kofi-coffee-table-60x60',
      variants: [
        { name: 'Clear Glass - Black Lacquered Oak', image: '/HAY/Kofi-coffee-table-60×60/Kofi coffee table 60×60, H-36 NOK  6,099  Variants -  Clear glass Clear glass Grooved glass Color -  Black lacquered oak.jpg', color: 'Black Lacquered Oak', material: 'Clear Glass', price: 6099 },
        { name: 'Clear Glass - Lacquered Oak', image: '/HAY/Kofi-coffee-table-60×60/Kofi coffee table 60×60, H-36 NOK  6,099  Variants -  Clear glass Clear glass Grooved glass Color -  Lacquered Oak.jpg', color: 'Lacquered Oak', material: 'Clear Glass', price: 6099 }
      ],
      inStock: true,
    },

    // Additional HAY Products
    {
      id: 'hay-dont-leave-me-xl-dlm-side-table',
      name: "Don't Leave Me XL - DLM Side Table",
      description: 'Larger version of the popular DLM side table with vibrant colors and high-quality finish options.',
      price: 3149,
      brand: 'HAY',
      category: 'Tables',
      image: '/HAY/Don`t-leave-me XL–DLM-side-table/Don`t leave me XL – DLM side table kr  3 149  Color -  Black.jpg',
      href: '/hay/hay-dont-leave-me-xl-dlm-side-table',
      variants: [
        { name: 'Black', image: '/HAY/Don`t-leave-me XL–DLM-side-table/Don`t leave me XL – DLM side table kr  3 149  Color -  Black.jpg', color: 'Black' },
        { name: 'Grey', image: '/HAY/Don`t-leave-me XL–DLM-side-table/Don`t leave me XL – DLM side table kr  3 149  Color -  Grey.jpg', color: 'Grey' },
        { name: 'White', image: '/HAY/Don`t-leave-me XL–DLM-side-table/Don`t leave me XL – DLM- sidebord kr 3 149  Farge - White.jpg', color: 'White' }
      ],
      inStock: true,
    },

    {
      id: 'hay-palissade-armchair',
      name: 'Palissade Armchair',
      description: 'Contemporary outdoor armchair with distinctive slatted design, available in multiple colors.',
      price: 4999,
      brand: 'HAY',
      category: 'Chair',
      image: '/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Anthracite.jpg',
      href: '/hay/hay-palissade-armchair',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Anthracite.jpg', color: 'Anthracite' },
        { name: 'Cream White', image: '/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Cream white.jpg', color: 'Cream White' },
        { name: 'Iron Red', image: '/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Iron Red.jpg', color: 'Iron Red' },
        { name: 'Olive', image: '/HAY/Palissade-Armchair/Palissade Armchair NOK  4,999  Color -  Olive.jpg', color: 'Olive' },
        { name: 'Sky Grey', image: '/HAY/Palissade-Armchair/Palissade Armchair kr 4 999  Farge - Sky grey.jpg', color: 'Sky Grey' },
        { name: 'Hot Galvanized Steel', image: '/HAY/Palissade-Armchair/Palissade Armchair NOK  7,099  Color -  Hot galvanized steel.jpg', color: 'Hot Galvanized Steel', price: 7099 }
      ],
      inStock: true,
    },

    {
      id: 'hay-palissade-dining-chair',
      name: 'Palissade Dining Chair',
      description: 'Elegant outdoor dining chair with armrests, perfect for outdoor dining spaces.',
      price: 6049,
      brand: 'HAY',
      category: 'Chair',
      image: '/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Anthracite.jpg',
      href: '/hay/hay-palissade-dining-chair',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Anthracite.jpg', color: 'Anthracite' },
        { name: 'Cream White', image: '/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Cream white.jpg', color: 'Cream White' },
        { name: 'Iron Red', image: '/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Iron Red.jpg', color: 'Iron Red' },
        { name: 'Sky Grey', image: '/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  6,049  Color -  Sky grey.jpg', color: 'Sky Grey' },
        { name: 'Olive', image: '/HAY/Palissade-Dining-Chair/Palissade Dining Armchair kr 6 049  Farge - Olive.jpg', color: 'Olive' },
        { name: 'Hot Galvanized Steel', image: '/HAY/Palissade-Dining-Chair/Palissade Dining Chair NOK  10,049  Color -  Hot galvanized steel.jpg', color: 'Hot Galvanized Steel', price: 10049 }
      ],
      inStock: true,
    },

    {
      id: 'hay-palissade-bench-l120',
      name: 'Palissade Bench L-120',
      description: 'Contemporary outdoor bench with clean lines, perfect for gardens and patios.',
      price: 6549,
      brand: 'HAY',
      category: 'Benches',
      image: '/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Anthracite.jpg',
      href: '/hay/hay-palissade-bench-l120',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Anthracite.jpg', color: 'Anthracite' },
        { name: 'Olive', image: '/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Olive.jpg', color: 'Olive' },
        { name: 'Sky Grey', image: '/HAY/Palissade-Bench-L-120/Palissade Bench L-120 NOK  6,549  Color -  Sky grey.jpg', color: 'Sky Grey' },
        { name: 'Cream White', image: '/HAY/Palissade-Bench-L-120/Palissade Sittebenk L-120 kr 6 549  Farge - Cream white.jpg', color: 'Cream White' },
        { name: 'Iron Red', image: '/HAY/Palissade-Bench-L-120/Palissade Sittebenk L-120 kr 6 549  Farge - Iron Red.jpg', color: 'Iron Red' },
        { name: 'Hot Galvanised Steel', image: '/HAY/Palissade-Bench-L-120/Palissade Sittebenk L-120 kr 8 649  Farge - Hot galvanised steel.jpg', color: 'Hot Galvanised Steel', price: 8649 }
      ],
      inStock: true,
    },

    {
      id: 'hay-palissade-lounge-chair',
      name: 'Palissade Lounge Chair',
      description: 'Comfortable outdoor lounge chair with modern design and weather-resistant construction.',
      price: 8499,
      brand: 'HAY',
      category: 'Chair',
      image: '/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Anthracite.jpg',
      href: '/hay/hay-palissade-lounge-chair',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Anthracite.jpg', color: 'Anthracite' },
        { name: 'Cream White', image: '/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Cream white.jpg', color: 'Cream White' },
        { name: 'Iron Red', image: '/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Iron Red.jpg', color: 'Iron Red' },
        { name: 'Olive', image: '/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Olive.jpg', color: 'Olive' },
        { name: 'Sky Grey', image: '/HAY/Palissade-Lounge-Chair/Palissade Lounge Chair High NOK  8,499  Color -  Sky grey.jpg', color: 'Sky Grey' }
      ],
      inStock: true,
    },

    {
      id: 'hay-palissade-cone-table-60',
      name: 'Palissade Cone Table Ø-60',
      description: 'Round outdoor table with distinctive cone base, perfect for cafés and outdoor dining.',
      price: 6549,
      brand: 'HAY',
      category: 'Tables',
      image: '/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Anthracite.jpg',
      href: '/hay/hay-palissade-cone-table-60',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Anthracite.jpg', color: 'Anthracite' },
        { name: 'Cream White', image: '/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Cream white.jpg', color: 'Cream White' },
        { name: 'Iron Red', image: '/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Iron Red.jpg', color: 'Iron Red' },
        { name: 'Olive', image: '/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Olive.jpg', color: 'Olive' },
        { name: 'Sky Grey', image: '/HAY/Palissade-Cone-Table-Ø-60/Palissade Cone Table Ø-60 NOK  6,549  Color -  Sky grey.jpg', color: 'Sky Grey' }
      ],
      inStock: true,
    },

    {
      id: 'hay-palissade-low-table',
      name: 'Palissade Low Table',
      description: 'Low outdoor coffee table perfect for lounge areas and outdoor relaxation spaces.',
      price: 7799,
      brand: 'HAY',
      category: 'Tables',
      image: '/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Anthracite.jpg',
      href: '/hay/hay-palissade-low-table',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Anthracite.jpg', color: 'Anthracite' },
        { name: 'Cream White', image: '/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Cream white.jpg', color: 'Cream White' },
        { name: 'Iron Red', image: '/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Iron Red.jpg', color: 'Iron Red' },
        { name: 'Sky Grey', image: '/HAY/Palissade-Low-Table/Palissade Low Table NOK  7,799  Color -  Sky grey.jpg', color: 'Sky Grey' },
        { name: 'Hot Galvanized Steel', image: '/HAY/Palissade-Low-Table/Palissade Low Table NOK  11,799  Color -  Hot galvanized steel.jpg', color: 'Hot Galvanized Steel', price: 11799 }
      ],
      inStock: true,
    },

    {
      id: 'hay-neu-table-high',
      name: 'Neu Table High',
      description: 'Modern high table with clean geometric design, perfect for standing meetings and casual dining.',
      price: 4599,
      brand: 'HAY',
      category: 'Tables',
      image: '/HAY/Neu-table-high/Neu table high NOK  4,599  Color -  Anthracite Anthracite Sky grey Variants -  60x60.jpg',
      href: '/hay/hay-neu-table-high',
      variants: [
        { name: 'Anthracite 60x60', image: '/HAY/Neu-table-high/Neu table high NOK  4,599  Color -  Anthracite Anthracite Sky grey Variants -  60x60.jpg', color: 'Anthracite', size: '60x60' },
        { name: 'Sky Grey 60x60', image: '/HAY/Neu-table-high/ NOK  4,599  Color -  Sky grey Anthracite Sky grey Variants -  60x60.jpg', color: 'Sky Grey', size: '60x60' },
        { name: 'Anthracite Ø-70', image: '/HAY/Neu-table-high/Neu table high NOK  4,599  Color -  Anthracite Anthracite Sky grey Variants -  Ø-70.jpg', color: 'Anthracite', size: 'Ø-70' },
        { name: 'Sky Grey Ø-70', image: '/HAY/Neu-table-high/Neu table high NOK  4,599  Color -  Sky grey Anthracite Sky grey Variants -  Ø-70.jpg', color: 'Sky Grey', size: 'Ø-70' }
      ],
      inStock: true,
    },

    {
      id: 'hay-neu-table-low',
      name: 'Neu Table Low',
      description: 'Modern low table with clean geometric design, perfect for coffee tables and side tables.',
      price: 4599,
      brand: 'HAY',
      category: 'Tables',
      image: '/HAY/Neu-table-low/Neu table low NOK  4,599  Color -  04 Anthracite 04 Anthracite Sky grey Variants -  60x60.jpg',
      href: '/hay/hay-neu-table-low',
      variants: [
        { name: 'Anthracite 60x60', image: '/HAY/Neu-table-low/Neu table low NOK  4,599  Color -  04 Anthracite 04 Anthracite Sky grey Variants -  60x60.jpg', color: 'Anthracite', size: '60x60' },
        { name: 'Sky Grey 60x60', image: '/HAY/Neu-table-low/Neu table low NOK  4,599  Color -  Sky grey 04 Anthracite Sky grey Variants -  60x60.jpg', color: 'Sky Grey', size: '60x60' },
        { name: 'Anthracite Ø-60', image: '/HAY/Neu-table-low/Neu table low NOK  4,599  Color -  04 Anthracite 04 Anthracite Sky grey Variants -  Ø-60.jpg', color: 'Anthracite', size: 'Ø-60' },
        { name: 'Sky Grey Ø-60', image: '/HAY/Neu-table-low/Neu table low NOK  4,599  Color -  Sky grey 04 Anthracite Sky grey Variants -  Ø-60.jpg', color: 'Sky Grey', size: 'Ø-60' },
        { name: 'Anthracite Ø-70', image: '/HAY/Neu-table-low/Neu table low NOK  4,949  Color -  04 Anthracite 04 Anthracite Sky grey Variants -  Ø-70.jpg', color: 'Anthracite', size: 'Ø-70', price: 4949 },
        { name: 'Sky Grey Ø-70', image: '/HAY/Neu-table-low/Neu bord lavt kr 4 949  Farge - Sky grey 04 Anthracite Sky grey Varianter - Ø-70.jpg', color: 'Sky Grey', size: 'Ø-70', price: 4949 }
      ],
      inStock: true,
    },

    {
      id: 'hay-palisade-bar-stool',
      name: 'Palisade Bar Stool',
      description: 'Contemporary outdoor bar stool with distinctive slatted design, perfect for outdoor bars and high tables.',
      price: 4999,
      brand: 'HAY',
      category: 'Chair',
      image: '/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Anthracite.jpg',
      href: '/hay/hay-palisade-bar-stool',
      variants: [
        { name: 'Anthracite', image: '/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Anthracite.jpg', color: 'Anthracite' },
        { name: 'Cream White', image: '/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Cream white.jpg', color: 'Cream White' },
        { name: 'Iron Red', image: '/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Iron Red.jpg', color: 'Iron Red' },
        { name: 'Olive', image: '/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Olive.jpg', color: 'Olive' },
        { name: 'Sky Grey', image: '/HAY/Palisade-Bar-Stool/Palisade Bar Stool NOK  4,999  Color -  Sky grey.jpg', color: 'Sky Grey' }
      ],
      inStock: true,
    },

    // FRITZ HANSEN FURNITURE PRODUCTS
    {
      id: 'fritz-hansen-series-7-3107-chair',
      name: 'Series 7™ 3107 Chair',
      description: 'Iconic chair designed by Arne Jacobsen, featuring elegant curves and premium upholstery options.',
      price: 10999,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Series-7™-3107-chair/Series 7™ 3107 chair front upholstered with chrome legs NOK  10,999  Color -  Oak veneer:Hallingdal 65 Light Grey 103.png',
      href: '/fritz-hansen/fritz-hansen-series-7-3107-chair',
      variants: [
        { name: 'Oak Veneer - Hallingdal Light Grey', image: '/Fritz Hansen/Series-7™-3107-chair/Series 7™ 3107 chair front upholstered with chrome legs NOK  10,999  Color -  Oak veneer:Hallingdal 65 Light Grey 103.png', color: 'Oak Veneer', material: 'Hallingdal Light Grey', price: 10999 },
        { name: 'Oak Veneer - Sunniva Light Beige', image: '/Fritz Hansen/Series-7™-3107-chair/Series 7™ 3107 chair front upholstered with chrome legs NOK  10,999  Color -  Oak veneer:Sunniva Light Beige 233.png', color: 'Oak Veneer', material: 'Sunniva Light Beige', price: 10999 },
        { name: 'Ash Veneer - Grace Leather Walnut', image: '/Fritz Hansen/Series-7™-3107-chair/Series 7™ 3107 chair front upholstered with chrome legs NOK  19,999  Color -  Ash veneer:Grace leather Walnut.png', color: 'Ash Veneer', material: 'Grace Leather Walnut', price: 19999 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-swan-chair-leather',
      name: 'Swan Chair in Leather',
      description: 'Legendary chair designed by Arne Jacobsen, featuring luxurious leather upholstery and timeless design.',
      price: 77499,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  89,999  Color -  Aura Leather : Black.png',
      href: '/fritz-hansen/fritz-hansen-swan-chair-leather',
      variants: [
        { name: 'Essential Leather - Light Grey', image: '/Fritz Hansen/Swan-chair-in-leather/Svanen stol i skinn kr 77 499  Farge - Essential leather : Light Grey.png', color: 'Light Grey', material: 'Essential Leather', price: 77499 },
        { name: 'Essential Leather - Walnut', image: '/Fritz Hansen/Swan-chair-in-leather/Svanen stol i skinn kr 77 499  Farge - Essential leather : Walnut.png', color: 'Walnut', material: 'Essential Leather', price: 77499 },
        { name: 'Aura Leather - Black', image: '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  89,999  Color -  Aura Leather : Black.png', color: 'Black', material: 'Aura Leather', price: 89999 },
        { name: 'Embrace Leather - Concrete Grey', image: '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  105,499  Color -  Embrace leather : Concrete Grey.png', color: 'Concrete Grey', material: 'Embrace Leather', price: 105499 }
      ],
      inStock: true,
    },

    // KARTELL FURNITURE PRODUCTS
    {
      id: 'kartell-componibili-classic-2',
      name: 'Componibili Classic 2',
      description: 'Iconic modular storage unit with 2 compartments, perfect for modern interiors.',
      price: 3299,
      brand: 'Kartell',
      category: 'Storage',
      image: '/Kartell/Kartell -Componibili classic 2/white.png',
      href: '/kartell/kartell-componibili-classic-2',
      variants: [
        { name: 'White', image: '/Kartell/Kartell -Componibili classic 2/white.png', color: 'White', price: 3299 },
        { name: 'Black', image: '/Kartell/Kartell -Componibili classic 2/black.png', color: 'Black', price: 3299 },
        { name: 'Silver', image: '/Kartell/Kartell -Componibili classic 2/Silver.png', color: 'Silver', price: 3299 },
        { name: 'Red', image: '/Kartell/Kartell -Componibili classic 2/Red.png', color: 'Red', price: 3299 }
      ],
      inStock: true,
    },

    {
      id: 'kartell-componibili-classic-3',
      name: 'Componibili Classic 3',
      description: 'Modular storage system with 3 compartments. Larger version of the iconic cylindrical design.',
      price: 3490,
      brand: 'Kartell',
      category: 'Storage',
      image: '/kartell-Componibili classic 3/blue.webp',
      href: '/kartell/componibili-classic-3',
      variants: [
        { name: 'White', image: '/kartell-Componibili classic 3/white.webp', color: 'White', price: 3490 },
        { name: 'Black', image: '/kartell-Componibili classic 3/black.avif', color: 'Black', price: 3490 },
        { name: 'Red', image: '/kartell-Componibili classic 3/red.webp', color: 'Red', price: 3490 },
        { name: 'Blue', image: '/kartell-Componibili classic 3/blue.webp', color: 'Blue', price: 3490 },
        { name: 'Green', image: '/kartell-Componibili classic 3/green.webp', color: 'Green', price: 3490 },
        { name: 'Orange', image: '/kartell-Componibili classic 3/orange.webp', color: 'Orange', price: 3490 },
        { name: 'Silver', image: '/kartell-Componibili classic 3/silver.webp', color: 'Silver', price: 3490 }
      ],
      inStock: true,
    },

    {
      id: 'kartell-hhh-stool',
      name: 'H.H.H Stool',
      description: 'Stackable stool with ergonomic design. Perfect for modern interiors and versatile seating.',
      price: 1890,
      brand: 'Kartell',
      category: 'Chair',
      image: '/Kartell H.H.H /Orange.webp',
      href: '/kartell/hhh-stool',
      variants: [
        { name: 'White', image: '/Kartell H.H.H /White.webp', color: 'White', price: 1890 },
        { name: 'Black', image: '/Kartell H.H.H /Black.webp', color: 'Black', price: 1890 },
        { name: 'Blue', image: '/Kartell H.H.H /Blue.webp', color: 'Blue', price: 1890 },
        { name: 'Green', image: '/Kartell H.H.H /Green.webp', color: 'Green', price: 1890 },
        { name: 'Orange', image: '/Kartell H.H.H /Orange.webp', color: 'Orange', price: 1890 },
        { name: 'Bordeaux', image: '/Kartell H.H.H /Bordeaux.webp', color: 'Bordeaux', price: 1890 },
        { name: 'Mustard', image: '/Kartell H.H.H /Mustard.webp', color: 'Mustard', price: 1890 }
      ],
      inStock: true,
    },

    {
      id: 'kartell-liberty-2-seater',
      name: 'Liberty 2 Seater Outdoor',
      description: 'Outdoor sofa with weather-resistant materials. Modern design for contemporary outdoor spaces.',
      price: 12900,
      brand: 'Kartell',
      category: 'Sofa',
      image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp',
      href: '/kartell/liberty-2-seater',
      variants: [
        { name: 'Beige', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/beige.webp', color: 'Beige', price: 12900 },
        { name: 'Russet', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/russet.webp', color: 'Russet', price: 12900 },
        { name: 'Sage', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp', color: 'Sage', price: 12900 },
        { name: 'Yellow', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/yellow.webp', color: 'Yellow', price: 12900 }
      ],
      inStock: true,
    },

    {
      id: 'kartell-liberty-3-seater',
      name: 'Liberty 3 Seater Outdoor',
      description: 'Larger outdoor sofa for spacious terraces and gardens. Weather-resistant and stylish.',
      price: 16900,
      brand: 'Kartell',
      category: 'Sofa',
      image: '/kartell-furniture/Plastics outdoor liberty 3 seater/russet.webp',
      href: '/kartell/liberty-3-seater',
      variants: [
        { name: 'Beige', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/beige.webp', color: 'Beige', price: 16900 },
        { name: 'Russet', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/russet.webp', color: 'Russet', price: 16900 },
        { name: 'Sage', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/Sage.webp', color: 'Sage', price: 16900 },
        { name: 'Yellow', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/yellow.webp', color: 'Yellow', price: 16900 }
      ],
      inStock: true,
    },

    // MONTANA FURNITURE PRODUCTS
    {
      id: 'montana-bureau-desk',
      name: 'Bureau Desk',
      description: 'Modular desk system with clean Scandinavian design. Available in multiple colors and configurations.',
      price: 15999,
      brand: 'Montana',
      category: 'Desks',
      image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Snow_Suspended_Perspective.png',
      href: '/montana/bureau-desk',
      variants: [
        { name: 'Snow', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Snow_Suspended_Perspective.png', color: 'Snow', price: 15999 },
        { name: 'Black', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Black_Suspended_Perspective.png', color: 'Black', price: 15999 },
        { name: 'Anthracite', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Anthracite_Suspended_Perspective.png', color: 'Anthracite', price: 15999 },
        { name: 'Amber', image: '/Montana/BUREAU/Montana_Selection_BUREAU_Desk_Amber_Suspended_Perspective.png', color: 'Amber', price: 15999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-carry-chest-of-drawers',
      name: 'Carry Chest of Drawers',
      description: 'Versatile storage solution with multiple mounting options. Danish design meets functionality.',
      price: 12999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Flint_Perspective.png',
      href: '/montana/carry-chest-of-drawers',
      variants: [
        { name: 'Monarch with Flint Legs', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Monarch_Legs_Flint_Perspective.png', color: 'Monarch', material: 'Flint Legs', price: 12999 },
        { name: 'Snow with Flint Legs', image: '/Montana/Carry-chest-of-drawers/5714322947862_Montana_Selection_CARRY_38_Snow_Legs_148_Flint_Perspective.png', color: 'Snow', material: 'Flint Legs', price: 12999 },
        { name: 'Acacia with Black Legs', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Acacia_Legs_Black_Perspective.png', color: 'Acacia', material: 'Black Legs', price: 12999 },
        { name: 'Anthracite with Brass Legs', image: '/Montana/Carry-chest-of-drawers/Montana_Selection_CARRY_Anthracite_Legs_Brass_Perspective.png', color: 'Anthracite', material: 'Brass Legs', price: 12999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-compile-module',
      name: 'Compile Module',
      description: 'Modular storage system with multiple mounting options and color choices. Perfect for creating custom storage solutions.',
      price: 8999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Compile-module/Montana_Selection_COMPILE_Anthracite_Legs_Black_Perspective.jpg',
      href: '/montana/compile-module',
      variants: [
        { name: 'Anthracite with Black Legs', image: '/Montana/Compile-module/Montana_Selection_COMPILE_Anthracite_Legs_Black_Perspective.jpg', color: 'Anthracite', material: 'Black Legs', price: 8999 },
        { name: 'Monarch with Chrome Legs', image: '/Montana/Compile-module/Montana_Selection_COMPILE_Monarch_Legs_Chrome_Perspective.png', color: 'Monarch', material: 'Chrome Legs', price: 8999 },
        { name: 'New White with Brass Legs', image: '/Montana/Compile-module/Montana_Selection_COMPILE_NewWhite_Legs_Brass_Perspective.png', color: 'New White', material: 'Brass Legs', price: 8999 },
        { name: 'Nordic with Chrome Legs', image: '/Montana/Compile-module/Montana_Selection_COMPILE_Nordic_Legs_Chrome_Perspective.jpg', color: 'Nordic', material: 'Chrome Legs', price: 8999 }
      ],
      lifestyleImages: [
        '/Montana/Compile-module/lifestyle/Montana_Home20_21_COMPILE_Camomile_Turmeric_Detail_H-scaled.jpg'
      ],
      inStock: true,
    },

    {
      id: 'montana-loom-bookshelf',
      name: 'Loom Bookshelf',
      description: 'Modern bookshelf with clean lines and multiple mounting options. Available in various colors and configurations.',
      price: 11999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_NewWhite_Suspended_Perspective.png',
      href: '/montana/loom-bookshelf',
      variants: [
        { name: 'New White Suspended', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_NewWhite_Suspended_Perspective.png', color: 'New White', material: 'Suspended', price: 11999 },
        { name: 'Monarch Suspended', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Monarch_Suspended_Perspective.png', color: 'Monarch', material: 'Suspended', price: 11999 },
        { name: 'Anthracite Suspended', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Anthracite_Suspended_Perspective.jpg', color: 'Anthracite', material: 'Suspended', price: 11999 },
        { name: 'Nordic Suspended', image: '/Montana/Loom-bookshelf/Montana_Selection_LOOM_Nordic_Suspended_Perspective.jpg', color: 'Nordic', material: 'Suspended', price: 11999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-panton-wire-extended-18-8',
      name: 'Panton Wire Extended Ø18.8',
      description: 'Extended wire storage system designed by Verner Panton. Perfect for organizing and displaying items with modern aesthetic.',
      price: 2999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Black_perspective-scaled.jpg',
      href: '/montana/panton-wire-extended-18-8',
      variants: [
        { name: 'Black', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Black_perspective-scaled.jpg', color: 'Black', price: 2999 },
        { name: 'Monarch', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Monarch_perspective-scaled.jpg', color: 'Monarch', price: 2999 },
        { name: 'Chrome', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Chrome_perspective-scaled.jpg', color: 'Chrome', price: 2999 },
        { name: 'Snow', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D18.8_Snow_perspective-scaled.jpg', color: 'Snow', price: 2999 }
      ],
      lifestyleImages: [
        '/Montana/Panton-wire-system/lifestyle/Montana_Home21_22_PantonWire_Extended_Black_Snow_Detail_H.jpg'
      ],
      inStock: true,
    },

    {
      id: 'montana-panton-wire-extended-34-8',
      name: 'Panton Wire Extended Ø34.8',
      description: 'Larger extended wire storage system designed by Verner Panton. Ideal for bigger storage needs with iconic design.',
      price: 3999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Chrome_perspective-scaled.jpg',
      href: '/montana/panton-wire-extended-34-8',
      variants: [
        { name: 'Chrome', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Chrome_perspective-scaled.jpg', color: 'Chrome', price: 3999 },
        { name: 'Monarch', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Monarch_perspective-scaled.jpg', color: 'Monarch', price: 3999 },
        { name: 'Black', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Black_perspective-scaled.jpg', color: 'Black', price: 3999 },
        { name: 'Snow', image: '/Montana/Panton-wire-system/Montana_PantonWire_Extended_D34.8_Snow_perspective-scaled.jpg', color: 'Snow', price: 3999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-panton-wire-single-18-8',
      name: 'Panton Wire Single Ø18.8',
      description: 'Single wire storage unit designed by Verner Panton. Minimalist storage solution with iconic design heritage.',
      price: 1999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Snow_perspective-scaled.jpg',
      href: '/montana/panton-wire-single-18-8',
      variants: [
        { name: 'Snow', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Snow_perspective-scaled.jpg', color: 'Snow', price: 1999 },
        { name: 'Monarch', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Monarch_perspective-scaled.jpg', color: 'Monarch', price: 1999 },
        { name: 'Black', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Black_perspective-scaled.jpg', color: 'Black', price: 1999 },
        { name: 'Chrome', image: '/Montana/Panton-wire-system/Montana_PantonWire_Single_D18.8_Chrome_perspective-scaled.jpg', color: 'Chrome', price: 1999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-show-module-1112',
      name: 'Show Module 1112',
      description: 'Versatile display module perfect for showcasing items. Available in multiple colors and mounting options.',
      price: 7999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_Black_Perspective.png',
      href: '/montana/show-module-1112',
      variants: [
        { name: 'New White with Black Legs', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_NewWhite_Legs_Black_Perspective.png', color: 'New White', material: 'Black Legs', price: 7999 },
        { name: 'Monarch with Black Legs', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Monarch_Legs_Black_Perspective.png', color: 'Monarch', material: 'Black Legs', price: 7999 },
        { name: 'Nordic with Snow Legs', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Nordic_Legs_Snow_Perspective-2.png', color: 'Nordic', material: 'Snow Legs', price: 7999 },
        { name: 'Mushroom with Snow Legs', image: '/Montana/SHOW-Module(1112)/Montana_Selections_SHOW_Mushroom_Legs_Snow_Perspective-1.png', color: 'Mushroom', material: 'Snow Legs', price: 7999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-unlock-key-cabinet',
      name: 'Unlock Key Cabinet',
      description: 'Secure key storage cabinet with modern design. Perfect for organizing keys and small items.',
      price: 4999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Anthracite_Suspended_Perspective.png',
      href: '/montana/unlock-key-cabinet',
      variants: [
        { name: 'Anthracite Suspended', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Anthracite_Suspended_Perspective.png', color: 'Anthracite', material: 'Suspended', price: 4999 },
        { name: 'Monarch Suspended', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Monarch_Suspended_Perspective.png', color: 'Monarch', material: 'Suspended', price: 4999 },
        { name: 'New White Suspended', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_NewWhite_Suspended_Perspective.png', color: 'New White', material: 'Suspended', price: 4999 },
        { name: 'Nordic Suspended', image: '/Montana/Unlock-key-cabinet/Montana_Selection_UNLOCK_Nordic_Suspended_Perspective.jpg', color: 'Nordic', material: 'Suspended', price: 4999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-read-bookshelf',
      name: 'Read Bookshelf',
      description: 'Modern bookshelf designed for book lovers. Available in multiple colors and mounting configurations.',
      price: 9999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Read-bookshelf/Montana_Selection_READ_Nordic_Suspended_Perspective.jpg',
      href: '/montana/read-bookshelf',
      variants: [
        { name: 'Nordic Suspended', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Nordic_Suspended_Perspective.jpg', color: 'Nordic', material: 'Suspended', price: 9999 },
        { name: 'Monarch Suspended', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Monarch_Suspended_Perspective.png', color: 'Monarch', material: 'Suspended', price: 9999 },
        { name: 'Anthracite Suspended', image: '/Montana/Read-bookshelf/Montana_Selection_READ_Anthracite_Suspended_Perspective.jpg', color: 'Anthracite', material: 'Suspended', price: 9999 },
        { name: 'New White Suspended', image: '/Montana/Read-bookshelf/Montana_Selection_READ_NewWhite_Suspended_Perspective.png', color: 'New White', material: 'Suspended', price: 9999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-perfume-cabinet',
      name: 'Perfume Cabinet',
      description: 'Elegant cabinet designed for storing perfumes and cosmetics. Compact design with premium finishes.',
      price: 5999,
      brand: 'Montana',
      category: 'Storage',
      image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_New_White_Perspective.jpg',
      href: '/montana/perfume-cabinet',
      variants: [
        { name: 'New White', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_New_White_Perspective.jpg', color: 'New White', price: 5999 },
        { name: 'Monarch', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Monarch_Perspective.jpg', color: 'Monarch', price: 5999 },
        { name: 'Anthracite', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Anthracite_Perspective.png', color: 'Anthracite', price: 5999 },
        { name: 'Nordic', image: '/Montana/Perfume-cabinet/Montana_Selection_PERFUME_Nordic_Perspective.jpg', color: 'Nordic', price: 5999 }
      ],
      inStock: true,
    },

    // MONTANA TABLE PRODUCTS
    {
      id: 'montana-dash-nightstand',
      name: 'Dash Nightstand',
      description: 'Sleek nightstand with suspended design. Perfect bedside storage solution available in multiple colors.',
      price: 6999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Nordic_Suspended_Perspective.jpg',
      href: '/montana/dash-nightstand',
      variants: [
        { name: 'Nordic', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Nordic_Suspended_Perspective.jpg', color: 'Nordic', price: 6999 },
        { name: 'Monarch', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Monarch_Suspended_Perspective.jpg', color: 'Monarch', price: 6999 },
        { name: 'Anthracite', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_Anthracite.jpg', color: 'Anthracite', price: 6999 },
        { name: 'New White', image: '/Montana-DASH-Nightstand/Montana_Selection_DASH_NewWhite_Suspended_Perspective.jpg', color: 'New White', price: 6999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-dream-bedside-table',
      name: 'Dream Bedside Table',
      description: 'Versatile bedside table with multiple mounting options. Available with legs, plinth, or suspended mounting.',
      price: 8999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Black_Perspective.jpg',
      href: '/montana/dream-bedside-table',
      variants: [
        { name: 'New White with Black Legs', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_NewWhite_Legs_Black_Perspective.jpg', color: 'New White', material: 'Black Legs', price: 8999 },
        { name: 'Monarch with Snow Legs', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Monarch_Legs_Snow_Perspective.png', color: 'Monarch', material: 'Snow Legs', price: 8999 },
        { name: 'Anthracite with Matt Chrome Legs', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Anthracite_Legs_MattChrome_Perspective.png', color: 'Anthracite', material: 'Matt Chrome Legs', price: 8999 },
        { name: 'Nordic with Matt Chrome Legs', image: '/Montana/Dream-Bedside-Table/Montana_Selection_DREAM_Nordic_Legs_MattChrome_Perspective.png', color: 'Nordic', material: 'Matt Chrome Legs', price: 8999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-drift-bedside-table',
      name: 'Drift Bedside Table',
      description: 'Mobile bedside table with castors option. Flexible storage solution for modern bedrooms.',
      price: 7999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_NewWhite_Legs_Brass_Perspective.png',
      href: '/montana/drift-bedside-table',
      variants: [
        { name: 'New White with Brass Legs', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_NewWhite_Legs_Brass_Perspective.png', color: 'New White', material: 'Brass Legs', price: 7999 },
        { name: 'Monarch with Snow Legs', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Monarch_Legs_Snow_Perspective.png', color: 'Monarch', material: 'Snow Legs', price: 7999 },
        { name: 'Anthracite with Black Legs', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Anthracite_Legs_Black_Perspective.jpg', color: 'Anthracite', material: 'Black Legs', price: 7999 },
        { name: 'Nordic with Matt Chrome Legs', image: '/Montana/Drift-Bedside-Table/Montana_Selection_DRIFT_Nordic_Legs_MattChrome_Perspective.png', color: 'Nordic', material: 'Matt Chrome Legs', price: 7999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-line-bench',
      name: 'Line Bench',
      description: 'Versatile bench that can function as seating or side table. Available with various leg and mounting options.',
      price: 9999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana/Line-Bench/Montana_Selection_LINE_Anthracite_Legs_Black_Perspective.png',
      href: '/montana/line-bench',
      variants: [
        { name: 'Anthracite with Black Legs', image: '/Montana/Line-Bench/Montana_Selection_LINE_Anthracite_Legs_Black_Perspective.png', color: 'Anthracite', material: 'Black Legs', price: 9999 },
        { name: 'Monarch with Snow Legs', image: '/Montana/Line-Bench/Montana_Selection_LINE_Monarch_Legs_Snow_Perspective.png', color: 'Monarch', material: 'Snow Legs', price: 9999 },
        { name: 'New White with Brass Legs', image: '/Montana/Line-Bench/Montana_Selection_LINE_NewWhite_Legs_Brass_Perspective.png', color: 'New White', material: 'Brass Legs', price: 9999 },
        { name: 'Nordic with Matt Chrome Legs', image: '/Montana/Line-Bench/Montana_Selection_LINE_Nordic_Legs_MattChrome_Perspective.png', color: 'Nordic', material: 'Matt Chrome Legs', price: 9999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-pair-sideboard',
      name: 'Pair Sideboard',
      description: 'Elegant sideboard perfect for dining rooms and living spaces. Multiple mounting and leg options available.',
      price: 14999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Legs_Black_Perspective.png',
      href: '/montana/pair-sideboard',
      variants: [
        { name: 'Nordic with Black Legs', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Nordic_Legs_Black_Perspective.png', color: 'Nordic', material: 'Black Legs', price: 14999 },
        { name: 'Monarch with Snow Legs', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Monarch_Legs_Snow_Perspective.png', color: 'Monarch', material: 'Snow Legs', price: 14999 },
        { name: 'Anthracite with Matt Chrome Legs', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_Anthracite_Legs_MattChrome_Perspective.png', color: 'Anthracite', material: 'Matt Chrome Legs', price: 14999 },
        { name: 'New White with Black Legs', image: '/Montana/Pair-sideboard/Montana_Selection_PAIR_NewWhite_Legs_Black_Perspective.jpg', color: 'New White', material: 'Black Legs', price: 14999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-save-sideboard',
      name: 'Save Sideboard',
      description: 'Spacious sideboard with clean lines. Perfect for storage and display in dining and living areas.',
      price: 16999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Legs_Brass_Perspective.png',
      href: '/montana/save-sideboard',
      variants: [
        { name: 'New White with Brass Legs', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_NewWhite_Legs_Brass_Perspective.png', color: 'New White', material: 'Brass Legs', price: 16999 },
        { name: 'Monarch with Snow Legs', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Monarch_Legs_Snow_Perspective.png', color: 'Monarch', material: 'Snow Legs', price: 16999 },
        { name: 'Anthracite with Matt Chrome Legs', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Anthracite_Legs_MattChrome_Perspective.jpg', color: 'Anthracite', material: 'Matt Chrome Legs', price: 16999 },
        { name: 'Nordic with Black Legs', image: '/Montana/Save-sideboard/Montana_Selection_SAVE_Nordic_Legs_Black_Perspective.jpg', color: 'Nordic', material: 'Black Legs', price: 16999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-monterey-desk',
      name: 'Monterey Desk',
      description: 'Modern desk with clean lines and premium finishes. Perfect for home offices and workspaces.',
      price: 18999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Parsley_Perspective.png',
      href: '/montana/monterey-desk',
      variants: [
        { name: 'Parsley', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Parsley_Perspective.png', color: 'Parsley', price: 18999 },
        { name: 'Anthracite', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Anthracite_Perspective.png', color: 'Anthracite', price: 18999 },
        { name: 'Black', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_Black_Perspective.png', color: 'Black', price: 18999 },
        { name: 'New White', image: '/Montana/Monterey-Desk/Montana_Monterey_H72_NewWhite_Perspective.png', color: 'New White', price: 18999 }
      ],
      inStock: true,
    },

    {
      id: 'montana-makeup-dressing-table',
      name: 'Makeup Dressing Table',
      description: 'Elegant dressing table designed for makeup and beauty routines. Available in extensive color range.',
      price: 12999,
      brand: 'Montana',
      category: 'Tables',
      image: '/Montana/Makeup-dressing-Table/5714322672993_Montana_Selection_MAKEUP_New_White_Suspended_Perspective.png',
      href: '/montana/makeup-dressing-table',
      variants: [
        { name: 'New White', image: '/Montana/Makeup-dressing-Table/5714322672993_Montana_Selection_MAKEUP_New_White_Suspended_Perspective.png', color: 'New White', price: 12999 },
        { name: 'Monarch', image: '/Montana/Makeup-dressing-Table/5714322673006_Montana_Selection_MAKEUP_Monarch_Suspended_Perspective.png', color: 'Monarch', price: 12999 },
        { name: 'Anthracite', image: '/Montana/Makeup-dressing-Table/5714322672955_Montana_Selection_MAKEUP_Anthracite_Suspended_Perspective.png', color: 'Anthracite', price: 12999 },
        { name: 'Nordic', image: '/Montana/Makeup-dressing-Table/5714322672979_Montana_Selection_MAKEUP_Nordic_Suspended_Perspective.png', color: 'Nordic', price: 12999 }
      ],
      inStock: true,
    },

    // VITRA FURNITURE PRODUCTS
    {
      id: 'vitra-eames-plastic-chair-dsr',
      name: 'Eames RE Plastic Chair DSR',
      description: 'Iconic dining chair designed by Charles & Ray Eames. Sustainable plastic construction with chrome base.',
      price: 4010,
      brand: 'Vitra',
      category: 'Chair',
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 03 Poppy red.webp',
      href: '/vitra/eames-plastic-chair-dsr',
      variants: [
        { name: 'Poppy Red - Chrome Base', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 03 Poppy red.webp', color: 'Poppy Red', material: 'Chrome Base', price: 4010 },
        { name: 'Sea Blue - Chrome Base', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 83 Sea Blue.webp', color: 'Sea Blue', material: 'Chrome Base', price: 4010 },
        { name: 'White - Chrome Base', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 04 White.webp', color: 'White', material: 'Chrome Base', price: 4010 },
        { name: 'Deep Black - Chrome Base', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 12 Deep black.webp', color: 'Deep Black', material: 'Chrome Base', price: 4010 }
      ],
      lifestyleImages: [
        '/Vitra/Eames-RE-Plastic-Chair – DSR /lifestyle/0a82c45a-6f87-4541-bc69-48ae478dffa8.webp'
      ],
      inStock: true,
    },

    {
      id: 'vitra-panton-chair',
      name: 'Panton Chair',
      description: 'Revolutionary single-piece plastic chair designed by Verner Panton. A true design icon.',
      price: 4350,
      brand: 'Vitra',
      category: 'Chair',
      image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp',
      href: '/vitra/panton-chair',
      variants: [
        { name: 'Classic Red', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp', color: 'Classic Red', price: 4350 },
        { name: 'Glacier Blue', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Glacier blue.webp', color: 'Glacier Blue', price: 4350 },
        { name: 'White', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - White.webp', color: 'White', price: 4350 },
        { name: 'Deep Black', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Deep black.webp', color: 'Deep Black', price: 4350 }
      ],
      lifestyleImages: [
        '/Vitra/Panton-Chair /lifestyle/10133061r_2.webp'
      ],
      inStock: true,
    },

    {
      id: 'vitra-noguchi-coffee-table',
      name: 'Noguchi Coffee Table',
      description: 'Sculptural coffee table designed by Isamu Noguchi. A masterpiece of organic modernism.',
      price: 31200,
      brand: 'Vitra',
      category: 'Tables',
      image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Salary.webp',
      href: '/vitra/noguchi-coffee-table',
      variants: [
        { name: 'Natural', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Salary.webp', color: 'Natural', price: 31200 },
        { name: 'Black Lacquered Ash', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Black lacquered ash.webp', color: 'Black Lacquered Ash', price: 31200 },
        { name: 'Walnut', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  43,200  Color -  Walnut.webp', color: 'Walnut', price: 43200 }
      ],
      lifestyleImages: [
        '/Vitra/Noguchi-coffee-table /lifestyle/JtOTrg_1663340409_9008_3050_0_pck.jpg'
      ],
      inStock: true,
    },

    // DUX FURNITURE PRODUCTS
    {
      id: 'dux-jetson-match-flax-chair',
      name: 'Jetson Match Flax Chair',
      description: 'Contemporary lounge chair with premium leather upholstery. Swedish craftsmanship at its finest.',
      price: 27990,
      brand: 'DUX',
      category: 'Seating',
      image: '/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg',
      href: '/dux/jetson-match-flax-chair',
      variants: [
        { name: 'Dakota 88 Leather', image: '/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg', material: 'Dakota 88 Leather', price: 27990 },
        { name: 'Dakota 29 Leather', image: '/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg', material: 'Dakota 29 Leather', price: 27990 },
        { name: 'Dakota 24 Leather', image: '/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp', material: 'Dakota 24 Leather', price: 27990 }
      ],
      lifestyleImages: [
        '/dux/Jetson-Match-Flax-21/lifestyle/dux-flax2-scaled-1.jpg'
      ],
      inStock: true,
    },

    {
      id: 'dux-inter-dining-table',
      name: 'Inter Dining Table',
      description: 'Modern dining table with clean lines and premium laminate surfaces. Available in multiple sizes.',
      price: 19490,
      brand: 'DUX',
      category: 'Tables',
      image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp',
      href: '/dux/inter-dining-table',
      variants: [
        { name: 'Ø-110 White Laminate', image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp', size: 'Ø-110', color: 'White Laminate', price: 19490 },
        { name: 'Ø-110 Black Laminate', image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg', size: 'Ø-110', color: 'Black Laminate', price: 19490 },
        { name: '100x180 White Laminate', image: '/dux/Inter-dining-table/Inter dining table from DUX NOK  26,440  Variants -  100x180 white laminate.jpg', size: '100x180', color: 'White Laminate', price: 26440 },
        { name: '100x180 Black Laminate', image: '/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp', size: '100x180', color: 'Black Laminate', price: 26440 }
      ],
      lifestyleImages: [
        '/dux/Inter-dining-table/lifestyle/inter3.webp'
      ],
      inStock: true,
    },

    {
      id: 'dux-sam-dining-chair',
      name: 'Sam Dining Chair',
      description: 'Elegant dining chair with premium upholstery options. Combines comfort with Scandinavian design.',
      price: 13790,
      brand: 'DUX',
      category: 'Seating',
      image: '/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg',
      href: '/dux/sam-dining-chair',
      variants: [
        { name: 'Natural Camel', image: '/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg', color: 'Natural Camel', price: 13790 },
        { name: 'Classic Soft 88', image: '/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg', color: 'Classic Soft 88', price: 13790 },
        { name: 'Naturale Perle', image: '/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg', color: 'Naturale Perle', price: 13790 }
      ],
      lifestyleImages: [
        '/dux/Sam-Dining-Chair/lifestyle/furniture-chair-sam-armchair-chrome-naturale-camel-pie-2-2-scaled.jpg.avif'
      ],
      inStock: true,
    },

    {
      id: 'dux-jetson-classic-soft-88',
      name: 'Jetson Classic Soft 88',
      description: 'Classic swivel armchair with sophisticated design and premium Classic Soft leather upholstery. Built on Bruno Mathsson\'s 1966 design foundation.',
      price: 27990,
      brand: 'DUX',
      category: 'Seating',
      image: '/dux/Jetson Classic soft 88/classic soft 88 black.jpg',
      href: '/dux/jetson-classic-soft-88',
      variants: [
        { name: 'Classic Soft 88 Black', image: '/dux/Jetson Classic soft 88/classic soft 88 black.jpg', color: 'Black', price: 27990 },
        { name: 'Classic Soft 25 Brown', image: '/dux/Jetson Classic soft 88/classic soft 25 brown.jpg', color: 'Brown', price: 27990 },
      ],
      lifestyleImages: [
        '/dux/Jetson Classic soft 88/lifestyle/furniture-easy-chair-jetson-black-dakota-88-pie-1-2-scaled.jpg.avif'
      ],
      inStock: true,
    },

    {
      id: 'dux-superspider-sheepskin',
      name: 'Superspider Sheepskin',
      description: 'Classic lounge chair designed by DUX Design Team in 1987. Combines first-class material selection with modern design, available in premium sheepskin.',
      price: 53815,
      brand: 'DUX',
      category: 'Seating',
      image: '/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg',
      href: '/dux/superspider-sheepskin',
      variants: [
        { name: 'Scandinavian Grey 22 Sheepskin', image: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg', color: 'Scandinavian Grey', price: 53815 },
        { name: 'Black 01 Sheepskin', image: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg', color: 'Black', price: 53815 },
        { name: 'Off-white 02 Sheepskin', image: '/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg', color: 'Off-white', price: 53815 },
        { name: 'Cork 19 Sheepskin', image: '/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg', color: 'Cork', price: 53815 },
      ],
      lifestyleImages: [
        '/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg'
      ],
      inStock: true,
    },

    {
      id: 'dux-lunaria-table',
      name: 'Lunaria Table',
      description: 'Organic-shaped side table from the Lunaria series. Available in three sizes and multiple wood finishes. Perfect individually or as a group.',
      price: 10215,
      brand: 'DUX',
      category: 'Tables',
      image: '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp',
      href: '/dux/lunaria-table',
      variants: [
        { name: 'Small - Wax-oiled Ash (H-50 Ø-39)', image: '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp', material: 'Wax-oiled Ash', size: 'Small', price: 10215 },
        { name: 'Medium - Wax-oiled Ash (H-45 Ø-60)', image: '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp', material: 'Wax-oiled Ash', size: 'Medium', price: 10980 },
        { name: 'Large - Wax-oiled Ash (H-40 Ø-86)', image: '/dux/Lunaria-table /Lunaria table from DUX NOK  16,080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp', material: 'Wax-oiled Ash', size: 'Large', price: 16080 },
      ],
      lifestyleImages: [
        '/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp'
      ],
      inStock: true,
    },

    // EILERSEN FURNITURE PRODUCTS
    {
      id: 'eilersen-playground-sofa',
      name: 'Playground Sofa',
      description: 'Modular sofa system with exceptional comfort and Danish craftsmanship. Available in premium fabrics.',
      price: 32990,
      brand: 'Eilersen',
      category: 'Seating',
      image: '/Eilersen/Playground sofa kr 32 990  Farge - Bakar 47.jpg',
      href: '/eilersen/playground-sofa',
      variants: [
        { name: 'Bakar 47', image: '/Eilersen/Playground sofa kr 32 990  Farge - Bakar 47.jpg', color: 'Bakar 47', price: 32990 },
        { name: 'Tangent 16', image: '/Eilersen/Playground sofa kr 36 490  Farge - Tangent 16.jpg', color: 'Tangent 16', price: 36490 },
        { name: 'Berlin 36', image: '/Eilersen/Playground sofa kr 37 990  Farge - Berlin 36.jpg', color: 'Berlin 36', price: 37990 },
        { name: 'Bardal 110', image: '/Eilersen/Eilersen Playground sofa kr 39 990  Farge - Bardal 110.jpg', color: 'Bardal 110', price: 39990 }
      ],
      lifestyleImages: [
        '/Eilersen/lifestyle/10696433r_2.jpg'
      ],
      inStock: true,
    },

    // SOREN LUND FURNITURE PRODUCTS
    {
      id: 'soren-lund-sl409-swivel-chair',
      name: 'SL409 Swivel Chair',
      description: 'Contemporary swivel chair with ergonomic design and premium materials. Perfect for modern offices and home workspaces with sophisticated Scandinavian aesthetic.',
      price: 29935,
      brand: 'Soren Lund',
      category: 'Seating',
      image: '/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp',
      href: '/soren-lund/sl409-swivel-chair',
      variants: [
        { name: 'Standard', image: '/Soren-Lund/SL409-swivel-chair/Soren Lund SL409 swivel chair NOK  29,935  SL409 swivel chair quantity 1 .webp', material: 'Premium upholstery', price: 29935 }
      ],
      inStock: true,
    },

    {
      id: 'soren-lund-sl330-1-adjustable-armchair',
      name: 'SL330:1 Adjustable Armchair',
      description: 'Luxurious adjustable armchair with premium craftsmanship and sophisticated design. Represents the pinnacle of Scandinavian furniture design.',
      price: 55160,
      brand: 'Soren Lund',
      category: 'Seating',
      image: '/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp',
      href: '/soren-lund/sl330-1-adjustable-armchair',
      variants: [
        { name: 'Standard', image: '/Soren-Lund/SLK-330/Soren Lund SL330:1 adjustable armchair NOK  55,160.webp', material: 'Premium upholstery', price: 55160 },
        { name: 'Alternative', image: '/Soren-Lund/SLK-330/SL330:1 adjustable armchair NOK  55,160.jpg', material: 'Premium upholstery', price: 55160 }
      ],
      lifestyleImages: [
        '/Soren-Lund/SLK-330/lifestyle/a1d63a72-3402-4c94-85f0-6065fd782cd3.webp'
      ],
      inStock: true,
    },

    {
      id: 'soren-lund-sl330-sk-footstool',
      name: 'SL330:SK Footstool',
      description: 'Elegant footstool with premium leather upholstery and solid wood construction. Perfect for complementing lounge chairs and creating relaxing seating arrangements.',
      price: 17055,
      brand: 'Soren Lund',
      category: 'Footstools',
      image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp',
      href: '/soren-lund/sl330-sk-footstool',
      variants: [
        { name: 'Cognac', image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Cognac.jpg', color: 'Cognac', material: 'Premium leather', price: 17055 },
        { name: 'Black', image: '/Soren-Lund/SL330:SK-footstool/SL330:SK footstool NOK  17,055  Color -  Black.webp', color: 'Black', material: 'Premium leather', price: 17055 }
      ],
      lifestyleImages: [
        '/Soren-Lund/SL330:SK-footstool/lifestyle/SL-330-genova-teak-768x512.jpg'
      ],
      inStock: true,
    },

    // &TRADITION FURNITURE PRODUCTS
    {
      id: 'tradition-in-between-coffee-table',
      name: 'In Between Coffee Table SK24',
      description: 'Elegant coffee table with clean lines and premium wood construction. Perfect centerpiece for modern living rooms.',
      price: 6715,
      brand: '&Tradition',
      category: 'Tables',
      image: '/&Tradition/In-Between-coffee-table/In Between coffee table SK24 NOK  6,715  Color -  Oiled oak.webp',
      href: '/tradition/in-between-coffee-table',
      variants: [
        { name: 'Oiled Oak', image: '/&Tradition/In-Between-coffee-table/In Between coffee table SK24 NOK  6,715  Color -  Oiled oak.webp', material: 'Oiled Oak', price: 6715 },
        { name: 'Smoked Oiled Oak', image: '/&Tradition/In-Between-coffee-table/In Between coffee table SK24 NOK  6,715  Color -  Smoked oiled oak.webp', material: 'Smoked Oiled Oak', price: 6715 },
        { name: 'Black Lacquered Oak', image: '/&Tradition/In-Between-coffee-table/In Between sofabord SK24 kr 6 715  Farge - Sortlakkert eik.webp', material: 'Black Lacquered Oak', price: 6715 },
      ],
      lifestyleImages: [
        '/&Tradition/In-Between-coffee-table/lifestyle/4a0f638f-51e6-4363-84ca-6770651e2e78.webp'
      ],
      inStock: true,
    },

    {
      id: 'tradition-little-petra-vb1',
      name: 'Little Petra VB1 Chair',
      description: 'Comfortable lounge chair with organic form and premium upholstery. A modern classic that combines comfort with sophisticated design.',
      price: 32885,
      brand: '&Tradition',
      category: 'Seating',
      image: '/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  32,885  Color -  Oiled oak:Hallingdal 130.jpg',
      href: '/tradition/little-petra-vb1',
      variants: [
        { name: 'Oiled Oak - Hallingdal 130', image: '/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  32,885  Color -  Oiled oak:Hallingdal 130.jpg', material: 'Oiled Oak', price: 32885 },
        { name: 'Oiled Walnut - Hallingdal 130', image: '/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  32,885  Color -  Oiled walnut:Hallingdal 130.jpg', material: 'Oiled Walnut', price: 32885 },
        { name: 'Oiled Walnut - Ectriture 0640', image: '/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  34,315  Color -  Oiled walnut:Ectriture 0640.jpg', material: 'Oiled Walnut', price: 34315 },
        { name: 'Oiled Oak - Karakorum 003', image: '/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  35,745  Color -  Oiled oak:Karakorum 003.jpg', material: 'Oiled Oak', price: 35745 },
        { name: 'Oiled Oak - Sheepskin Moonlight', image: '/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  48,615  Color -  Oiled oak:sheepskin Moonlight.jpg', material: 'Oiled Oak', price: 48615 },
        { name: 'Oiled Oak - Sheepskin Sahara', image: '/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  48,615  Color -  Oiled oak:sheepskin Sahara.jpg', material: 'Oiled Oak', price: 48615 },
      ],
      lifestyleImages: [
        '/&Tradition/Little-Petra-vb1/lifestyle/Little_Petra_VB1_Limited_edition_Sheepskin_17mm_Moonlight_w.jpg'
      ],
      inStock: true,
    },

    {
      id: 'tradition-pavilion-av17-desk',
      name: 'Pavilion AV17 Desk',
      description: 'Elegant desk with linoleum surface and chrome base. Perfect for modern offices and home workspaces.',
      price: 15725,
      brand: '&Tradition',
      category: 'Desks',
      image: '/&Tradition/Pavilion-AV17-Desk /Pavilion AV17 Desk NOK  15,725  Color -  Mushroom Linoleum (4176) w. lacquered oak & chrome base.jpg',
      href: '/tradition/pavilion-av17-desk',
      variants: [
        { name: 'Mushroom Linoleum - Oak & Chrome', image: '/&Tradition/Pavilion-AV17-Desk /Pavilion AV17 Desk NOK  15,725  Color -  Mushroom Linoleum (4176) w. lacquered oak & chrome base.jpg', material: 'Oak & Chrome', price: 15725 },
        { name: 'Iron Linoleum - Walnut & Chrome', image: '/&Tradition/Pavilion-AV17-Desk /Pavilion AV17 Desk NOK  15,725  Color -  Iron Linoleum (4178) w. lacquered walnut & chrome base.jpg', material: 'Walnut & Chrome', price: 15725 },
      ],
      lifestyleImages: [
        '/&Tradition/Pavilion-AV17-Desk /lifestyle/ATD_2022_Pavilion-AV12_Bellevue-AJ7_Pavilion-AV17.jpg'
      ],
      inStock: true,
    },

    {
      id: 'tradition-rfh-armchair-rd7',
      name: 'RFH Armchair RD7',
      description: 'Classic armchair with walnut and beech veneer construction. Comfortable seating with timeless Scandinavian design.',
      price: 7860,
      brand: '&Tradition',
      category: 'Seating',
      image: '/&Tradition/RFH-Armchair-RD7/RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 103.jpg',
      href: '/tradition/rfh-armchair-rd7',
      variants: [
        { name: 'Walnut & Beech - Hallingdal 103', image: '/&Tradition/RFH-Armchair-RD7/RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 103.jpg', material: 'Walnut & Beech', price: 7860 },
        { name: 'Walnut & Beech - Hallingdal 227', image: '/&Tradition/RFH-Armchair-RD7/RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 227.jpg', material: 'Walnut & Beech', price: 7860 },
      ],
      lifestyleImages: [
        '/&Tradition/RFH-Armchair-RD7/lifestyle/RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 227.jpg'
      ],
      inStock: true,
    },

    // AUDO COPENHAGEN FURNITURE PRODUCTS
    {
      id: 'audo-copenhagen-interconnect-candlestick',
      name: 'Interconnect Candlestick',
      description: 'Modular candlestick system with sculptural beauty. Crafted with meticulous attention to detail for unique configurations.',
      price: 5795,
      brand: 'Audo Copenhagen',
      category: 'Accessories',
      image: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass.webp',
      href: '/audo-copenhagen/interconnect-candlestick',
      variants: [
        { name: 'Brass', image: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass.webp', color: 'Brass', price: 5795 },
        { name: 'Black', image: '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/Interconnect candlestick NOK  5,795  Color -  Black.webp', color: 'Black', price: 5795 },
      ],
      lifestyleImages: [
        '/Audo-Copenhagen/Audo Copenhagen Interconnect candlestick NOK  5,795  Color -  Brass/lifestyle/10696988r_2.webp'
      ],
      inStock: true,
    },

    // ADDITIONAL FRITZ HANSEN SEATING PRODUCTS
    {
      id: 'fritz-hansen-grand-prix-4130',
      name: 'Grand Prix 4130 Chair',
      description: 'Iconic stackable chair designed by Arne Jacobsen. A timeless piece of Danish design.',
      price: 4890,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png',
      href: '/fritz-hansen/grand-prix-4130',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer', price: 4890 },
        { name: 'Walnut', image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer', price: 4890 },
        { name: 'Black Ash', image: '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - Black (195).png', material: 'Coloured Veneer', price: 4890 },
        { name: 'White Ash', image: '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - White (105).png', material: 'Coloured Veneer', price: 4890 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-grand-prix-4130-upholstery',
      name: 'Grand Prix 4130 Upholstered',
      description: 'Upholstered version of the iconic Grand Prix chair with premium fabric options.',
      price: 6890,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png',
      href: '/fritz-hansen/grand-prix-4130-upholstery',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer', price: 6890 },
        { name: 'Walnut', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer', price: 6890 },
        { name: 'Black Ash', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Coloured Veneer : Ash - Black (195).png', material: 'Coloured Veneer', price: 6890 },
        { name: 'Black/Grey Fabric', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png', material: 'Hallingdal 65', price: 6890 },
        { name: 'White/Black Fabric', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : White Black (166)png.png', material: 'Hallingdal 65', price: 6890 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-grand-prix-3130',
      name: 'Grand Prix 3130 Chair',
      description: 'Classic three-legged version of the Grand Prix chair with elegant proportions.',
      price: 5290,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png',
      href: '/fritz-hansen/grand-prix-3130',
      variants: [
        { name: 'Oak', image: '/Fritz Hanson  3130/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer', price: 5290 },
        { name: 'Walnut', image: '/Fritz Hanson  3130/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer', price: 5290 },
        { name: 'Deep Clay Ash', image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Deep Clay (145).png', material: 'Coloured Veneer', price: 5290 },
        { name: 'Midnight Blue Ash', image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png', material: 'Coloured Veneer', price: 5290 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-fionia-stool',
      name: 'Fionia Stool',
      description: 'Modern take on the old X-chair. Lightweight, foldable stool with triangular construction. Can be used as bedside table or small side table.',
      price: 3799,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Fionia/Color -  Untreated oak.png',
      href: '/fritz-hansen/fionia-stool',
      variants: [
        { name: 'Untreated Oak', image: '/Fritz Hansen/Fionia/Color -  Untreated oak.png', material: 'Untreated oak', price: 3799 },
        { name: 'Untreated Teak', image: '/Fritz Hansen/Fionia/Color -  Untreated teak.png', material: 'Untreated teak', price: 3799 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-swan-chair-textile',
      name: 'Swan Chair in Textile',
      description: 'Iconic Swan chair by Arne Jacobsen in premium textile upholstery. Classic Danish design with contemporary fabric options.',
      price: 53499,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/swan-chair-in-textile/The Swan in textile NOK  53,499  Color -  Canvas : Light Sand 0216.png',
      href: '/fritz-hansen/swan-chair-textile',
      variants: [
        { name: 'Canvas Light Sand', image: '/Fritz Hansen/swan-chair-in-textile/The Swan in textile NOK  53,499  Color -  Canvas : Light Sand 0216.png', material: 'Canvas textile', price: 53499 },
        { name: 'Fiord Black', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Fiord : Black 981.png', material: 'Fiord textile', price: 56999 },
        { name: 'Hallingdal Classic Red', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Hallingdal 65 : Classic Red 674.png', material: 'Hallingdal 65 textile', price: 56999 },
        { name: 'Hallingdal Light Grey', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Hallingdal 65 : Light Grey 103.png', material: 'Hallingdal 65 textile', price: 56999 },
        { name: 'Sunniva Chocolate/Tan', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Sunniva 2 : Chocolate:Tan 253.png', material: 'Sunniva 2 textile', price: 56999 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-georg-stool-with-cushion',
      name: 'Georg Stool with Cushion',
      description: 'Simple and beautiful stool designed by Chris Liljenberg Halstrøm for Skagerak. Can also be used around the dining table. Features a soft wool cushion held in place by a braided leather strap.',
      price: 4699,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg',
      href: '/fritz-hansen/georg-stool-with-cushion',
      variants: [
        { name: 'Black Lacquered Oak', image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Black lacquered oak.webp', material: 'Black lacquered oak', color: 'Cushion: Remix Light Grey 123', price: 4699 },
        { name: 'Untreated Oak', image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg', material: 'Untreated oak', color: 'Cushion: Remix Light Grey 123', price: 4699 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-hven-bar-stool',
      name: 'Hven Bar Stool',
      description: 'The Hven bar stool is designed by Anton Björsing and manufactured by Skagerak/Fritz Hansen. The bar stool is both robust and elegant and has good seating comfort.',
      price: 8599,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Hven-bar-stool/Hven bar stool from Skagerak NOK  8,599  Color -  Untreated oak.jpg',
      href: '/fritz-hansen/hven-bar-stool',
      variants: [
        { name: 'Untreated Oak', image: '/Fritz Hansen/Hven-bar-stool/Hven bar stool from Skagerak NOK  8,599  Color -  Untreated oak.jpg', material: 'Untreated oak', price: 8599 },
        { name: 'Oiled Oak', image: '/Fritz Hansen/Hven-bar-stool/Hven bar stool from Skagerak NOK  10,499  Color -  Oiled oak.jpg', material: 'Oiled oak', price: 10499 },
        { name: 'Soaped Oak', image: '/Fritz Hansen/Hven-bar-stool/Hven bar stool from Skagerak NOK  10,499  Color -  Soaped oak.jpg', material: 'Soaped oak', price: 10499 },
        { name: 'White Pigmented Oak', image: '/Fritz Hansen/Hven-bar-stool/Hven bar stool from Skagerak NOK  10,499  Color -  White pigmented oak.jpg', material: 'White pigmented oak', price: 10499 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagerak-cutter-bench',
      name: 'Skagerak Cutter Bench',
      description: 'The stylish Cutter series began as a counterbalance to the nostalgic and romantic design that has been the norm for wooden garden benches for many years. Designer Niels Hvass focused on a clean, simple and sculptural expression.',
      price: 12499,
      brand: 'Fritz Hansen',
      category: 'Benches',
      image: '/Fritz Hansen/Skagerak-Cutter-Bench/Skagerak Cutter Bench NOK  12,499  Variants -  Oak.jpg',
      href: '/fritz-hansen/skagerak-cutter-bench',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen/Skagerak-Cutter-Bench/Skagerak Cutter Bench NOK  12,499  Variants -  Oak.jpg', material: 'Solid oak', price: 12499 },
        { name: 'Teak', image: '/Fritz Hansen/Skagerak-Cutter-Bench/Skagerak Cutter Bench NOK  12,499  Variants -  Teak.jpg', material: 'Solid teak', price: 12499 },
        { name: 'Black', image: '/Fritz Hansen/Skagerak-Cutter-Bench/Skagerak Cutter Bench NOK  12,499  Variants -  black.jpg', material: 'Black oak', price: 12499 }
      ],
      inStock: true,
    },

    // RO COLLECTION PRODUCTS
    {
      id: 'ro-collection-salon-dining-chair',
      name: 'Salon Dining Chair',
      description: 'Elegant dining chair with premium leather upholstery and solid wood base options.',
      price: 22005,
      brand: 'RO Collection',
      category: 'Chair',
      image: '/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp',
      href: '/ro-collection/salon-dining-chair',
      variants: [
        { name: 'Oiled Oak - Supreme Dark Chocolate', image: '/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp', material: 'Oiled Oak', color: 'Supreme Dark Chocolate', price: 22005 },
        { name: 'Soaped Oak - Supreme Dark Chocolate', image: '/Ro-Collection/Salon dining chair/ Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp', material: 'Soaped Oak', color: 'Supreme Dark Chocolate', price: 22005 },
        { name: 'Oiled Oak - Supreme Cognac', image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Oiled oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp', material: 'Oiled Oak', color: 'Supreme Cognac', price: 22005 },
        { name: 'Smoked Oak - Supreme Cognac', image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp', material: 'Smoked Oak', color: 'Supreme Cognac', price: 22005 },
        { name: 'Smoked Oak - Supreme Dark Chocolate', image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp', material: 'Smoked Oak', color: 'Supreme Dark Chocolate', price: 22005 },
        { name: 'Soaped Oak - Supreme Cognac', image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp', material: 'Soaped Oak', color: 'Supreme Cognac', price: 22005 }
      ],
      lifestyleImages: [
        '/Ro-Collection/Salon dining chair/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp'
      ],
      inStock: true,
    },
    {
      id: 'ro-collection-salon-dining-table-round-120',
      name: 'Salon Dining Table Ø-120',
      description: 'Beautiful round dining table perfect for intimate dining experiences.',
      price: 29940,
      brand: 'RO Collection',
      category: 'Tables',
      image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp',
      href: '/ro-collection/salon-dining-table-round-120',
      variants: [
        { name: 'Oiled Oak', image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp', material: 'Oiled Oak', price: 29940 },
        { name: 'Soaped Oak', image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Soaped oak.webp', material: 'Soaped Oak', price: 29940 },
        { name: 'Smoked Oak', image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  33,450  Color -  Smoked oak.webp', material: 'Smoked Oak', price: 33450 }
      ],
      lifestyleImages: [
        '/Ro-Collection/Salon dining table Ø-120/lifestyle/Gal_6.webp'
      ],
      inStock: true,
    },
    {
      id: 'ro-collection-salon-dining-table-round-120-extension',
      name: 'Salon Dining Table with Extension Option, Ø-120',
      description: 'Versatile round dining table with extension capability for larger gatherings.',
      price: 29940,
      brand: 'RO Collection',
      category: 'Tables',
      image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp',
      href: '/ro-collection/salon-dining-table-round-120-extension',
      variants: [
        { name: 'Oiled Oak', image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp', material: 'Oiled Oak', price: 29940 },
        { name: 'Soaped Oak', image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Soaped oak.webp', material: 'Soaped Oak', price: 29940 },
        { name: 'Smoked Oak', image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  33,450  Color -  Smoked oak.webp', material: 'Smoked Oak', price: 33450 }
      ],
      lifestyleImages: [
        '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/SAL-ET-O120OO-720_2_800x800_crop_center@2x.webp',
        '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/Salon_extension_table_round_1920x1920_re_800x800_crop_center@2x.webp'
      ],
      inStock: true,
    },
    {
      id: 'ro-collection-salon-dining-table-rectangular-extension',
      name: 'Salon Dining Table with Extension Option',
      description: 'Spacious rectangular dining table with extension capability for large gatherings.',
      price: 35190,
      brand: 'RO Collection',
      category: 'Tables',
      image: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp',
      href: '/ro-collection/salon-dining-table-rectangular-extension',
      variants: [
        { name: '190x90 - Oiled Oak', image: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp', size: '190x90', material: 'Oiled Oak', price: 35190 },
        { name: '190x90 - Soaped Oak', image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Soaped oak.webp', size: '190x90', material: 'Soaped Oak', price: 35190 },
        { name: '220x100 - Oiled Oak', image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Oiled oak.webp', size: '220x100', material: 'Oiled Oak', price: 37815 },
        { name: '220x100 - Soaped Oak', image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Soaped oak.webp', size: '220x100', material: 'Soaped Oak', price: 37815 },
        { name: '190x90 - Smoked Oak', image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  38,700  Size -  190x90 190x90 220x100 Color -  Smoked oak.webp', size: '190x90', material: 'Smoked Oak', price: 38700 },
        { name: '220x100 - Smoked Oak', image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  41,385  Size -  220x100 190x90 220x100 Color -  Smoked oak.webp', size: '220x100', material: 'Smoked Oak', price: 41385 }
      ],
      inStock: true,
    },
    {
      id: 'ro-collection-extension-leaf-round-120',
      name: 'Extension Leaf for Salon Dining Table Ø-120',
      description: 'Extension leaf accessory for the round Salon dining table.',
      price: 5130,
      brand: 'RO Collection',
      category: 'Accessories',
      image: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5,130  Color -  Black MDF.webp',
      href: '/ro-collection/extension-leaf-round-120',
      variants: [
        { name: 'Black MDF', image: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5,130  Color -  Black MDF.webp', material: 'Black MDF', price: 5130 },
        { name: 'Oiled Oak', image: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7,950  Color -  Oiled oak.webp', material: 'Oiled Oak', price: 7950 },
        { name: 'Soaped Oak', image: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7,950  Color -  Soaped oak.webp', material: 'Soaped Oak', price: 7950 },
        { name: 'Smoked Oak', image: '/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  9,690  Color -  Smoked oak.webp', material: 'Smoked Oak', price: 9690 }
      ],
      lifestyleImages: [
        '/Ro-Collection/Extension leaf for Salon dining table Ø-120/lifestyle/SAL-ET-O120OO-720_2_800x800_crop_center@2x.webp'
      ],
      inStock: true,
    },
    {
      id: 'ro-collection-extension-plate-rectangular',
      name: 'Extension Plate for Salon Dining Table',
      description: 'Extension plate accessory for the rectangular Salon dining table.',
      price: 5130,
      brand: 'RO Collection',
      category: 'Accessories',
      image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp',
      href: '/ro-collection/extension-plate-rectangular',
      variants: [
        { name: '50x90 - Black MDF', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp', size: '50x90', material: 'Black MDF', price: 5130 },
        { name: '50x100 - Black MDF', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x100 50x100 50x90 Color -  Black MDF.webp', size: '50x100', material: 'Black MDF', price: 5130 },
        { name: '50x90 - Oiled Oak', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Oiled oak.webp', size: '50x90', material: 'Oiled Oak', price: 7950 },
        { name: '50x100 - Oiled Oak', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x100 50x100 50x90 Color -  Oiled oak.webp', size: '50x100', material: 'Oiled Oak', price: 7950 },
        { name: '50x90 - Soaped Oak', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Soaped oak.webp', size: '50x90', material: 'Soaped Oak', price: 7950 },
        { name: '50x100 - Soaped Oak', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x100 50x100 50x90 Color -  Soaped oak.webp', size: '50x100', material: 'Soaped Oak', price: 7950 },
        { name: '50x90 - Smoked Oak', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9,690  Size -  50x90 50x100 50x90 Color -  Smoked oak.webp', size: '50x90', material: 'Smoked Oak', price: 9690 },
        { name: '50x100 - Smoked Oak', image: '/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9,690  Size -  50x100 50x100 50x90 Color -  Smoked oak.webp', size: '50x100', material: 'Smoked Oak', price: 9690 }
      ],
      lifestyleImages: [
        '/Ro-Collection/Extension plate for Salon dining table/lifestyle/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Oiled oak.webp'
      ],
      inStock: true,
    },

    // ADDITIONAL FRITZ HANSEN OUTDOOR PRODUCTS
    {
      id: 'fritz-hansen-regatta-lounge-stool',
      name: 'Regatta Lounge Stool',
      description: 'Matching stool for the Regatta collection, perfect for outdoor relaxation.',
      price: 8900,
      brand: 'Fritz Hansen',
      category: 'Footstools',
      image: '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg',
      href: '/fritz-hansen/regatta-stool',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg', material: 'Weather-resistant', price: 8900 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-regatta-lounge-table',
      name: 'Regatta Lounge Table Ø 60',
      description: 'Round outdoor table designed to complement the Regatta seating collection.',
      price: 9900,
      brand: 'Fritz Hansen',
      category: 'Tables',
      image: '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg',
      href: '/fritz-hansen/regatta-table',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg', material: 'Weather-resistant', price: 9900 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-regatta-lounge-bench',
      name: 'Regatta Lounge Bench',
      description: 'Elegant outdoor bench that completes the Regatta collection with comfortable seating for two.',
      price: 29999,
      brand: 'Fritz Hansen',
      category: 'Benches',
      image: '/Fritz Hansen/Regatta-Bench/S1508650-Regatta-Lounge-Bench.jpg',
      href: '/fritz-hansen/regatta-bench',
      variants: [
        { name: 'FSC Teak', image: '/Fritz Hansen/Regatta-Bench/S1508650-Regatta-Lounge-Bench.jpg', material: 'FSC-certified teak', price: 29999 }
      ],
      lifestyleImages: [
        '/Fritz Hansen/Regatta-Bench/lifestyle/Regatta-Set.jpg'
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-drachmann-chair',
      name: 'Drachmann Chair',
      description: 'Classic outdoor dining chair with clean lines and durable construction. Perfect for outdoor dining and relaxation.',
      price: 9699,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Drachmann chair /Drachmann chair NOK  9,699.webp',
      href: '/fritz-hansen/drachmann-chair',
      variants: [
        { name: 'Natural Teak', image: '/Fritz Hansen/Drachmann chair /Drachmann chair NOK  9,699.webp', material: 'FSC-certified teak', price: 9699 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-drachmann-table-round',
      name: 'Drachmann Table Ø-126',
      description: 'The Drachmann series was designed by Bernt Santesson in 1982, inspired by the beautiful garden of Danish poet and painter Holger Drachmann. This round table is made by Mogens Holmriis in collaboration with Skagerak.',
      price: 24999,
      brand: 'Fritz Hansen',
      category: 'Tables',
      image: '/Fritz Hansen/Drachmann-table-Ø/Drachmann table Ø-126 NOK  24,999.webp',
      href: '/fritz-hansen/drachmann-table-round',
      variants: [
        { name: 'Ø-126 cm', image: '/Fritz Hansen/Drachmann-table-Ø/Drachmann table Ø-126 NOK  24,999.webp', material: 'Certified solid teak wood', price: 24999 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-drachmann-dining-table',
      name: 'Drachmann Dining Table',
      description: 'The Drachmann series was designed by Bernt Santesson in 1982, inspired by the beautiful garden of Danish poet and painter Holger Drachmann. This table is made by Mogens Holmriis in collaboration with Skagerak.',
      price: 13499,
      brand: 'Fritz Hansen',
      category: 'Tables',
      image: '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp',
      href: '/fritz-hansen/drachmann-dining-table',
      variants: [
        { name: '86x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp', material: 'Certified solid teak wood', price: 13499 },
        { name: '156x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  20,499  Size -  156x86.webp', material: 'Certified solid teak wood', price: 20499 },
        { name: '190x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  28,499  Size -  190x86.webp', material: 'Certified solid teak wood', price: 28499 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-england-bench',
      name: 'England Bench',
      description: 'Modern take on classic English park benches. Solid construction in 100% FSC-certified teak with good seating comfort.',
      price: 21499,
      brand: 'Fritz Hansen',
      category: 'Benches',
      image: '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png',
      href: '/fritz-hansen/england-bench',
      variants: [
        { name: 'L-152', image: '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png', material: '152cm length', price: 21499 },
        { name: 'L-180', image: '/Fritz Hansen/England bench/England bench NOK  23,999  Size -  L-180.png', material: '180cm length', price: 23999 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagen-chair',
      name: 'Skagen Chair',
      description: 'The Skagen series draws inspiration from the region\'s natural beauty. Precise craftsmanship and elegant silhouettes blended with FSC-certified teak.',
      price: 7999,
      brand: 'Fritz Hansen',
      category: 'Chair',
      image: '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg',
      href: '/fritz-hansen/skagen-chair',
      variants: [
        { name: 'FSC-certified Teak', image: '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg', material: 'FSC-certified teak', price: 7999 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagen-bench',
      name: 'Skagen Bench',
      description: 'Part of the Skagen series designed by Mogens Holmriis. This elegant outdoor bench draws inspiration from the natural beauty of the Skagen region.',
      price: 14999,
      brand: 'Fritz Hansen',
      category: 'Benches',
      image: '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg',
      href: '/fritz-hansen/skagen-bench',
      variants: [
        { name: 'L-150', image: '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg', material: 'FSC-certified teak', price: 14999 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagen-table',
      name: 'Skagen Table',
      description: 'The Skagen series is designed by Mogens Holmriis and draws inspiration from the region\'s natural beauty. Precise craftsmanship and elegant silhouettes blended with FSC-certified teak.',
      price: 16999,
      brand: 'Fritz Hansen',
      category: 'Tables',
      image: '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg',
      href: '/fritz-hansen/skagen-table',
      variants: [
        { name: 'FSC-certified Teak', image: '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg', material: 'FSC-certified teak', price: 16999 }
      ],
      inStock: true,
    },

    // FRITZ HANSEN STORAGE PRODUCTS
    {
      id: 'fritz-hansen-norr-magazine-holder',
      name: 'Norr Magazine Holder',
      description: 'Elegant magazine holder with clean Scandinavian design. Perfect for organizing magazines and newspapers in style.',
      price: 3299,
      brand: 'Fritz Hansen',
      category: 'Storage',
      image: '/Fritz Hansen/Norr Magazine Holder/Norr Magazine Holder kr  3 299.webp',
      href: '/fritz-hansen/norr-magazine-holder',
      variants: [
        { name: 'Natural Wood', image: '/Fritz Hansen/Norr Magazine Holder/Norr Magazine Holder kr  3 299.webp', material: 'Natural Wood', price: 3299 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-norr-wall-shelf',
      name: 'Norr Wall Shelf',
      description: 'Minimalist wall shelf with clean lines and premium wood construction. Perfect for displaying books and decorative items.',
      price: 4099,
      brand: 'Fritz Hansen',
      category: 'Storage',
      image: '/Fritz Hansen/Norr-wall-shelf/Norr wall shelf NOK  4,099.jpg',
      href: '/fritz-hansen/norr-wall-shelf',
      variants: [
        { name: 'Natural Wood', image: '/Fritz Hansen/Norr-wall-shelf/Norr wall shelf NOK  4,099.jpg', material: 'Natural Wood', price: 4099 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagerak-cutter-mini-wardrobe',
      name: 'Skagerak Cutter Mini Wardrobe',
      description: 'Compact wardrobe from the Cutter series. Perfect for small spaces while maintaining the series\' clean, sculptural expression.',
      price: 4199,
      brand: 'Fritz Hansen',
      category: 'Storage',
      image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Garderobe kr 4 199  Varianter - Eik.jpg',
      href: '/fritz-hansen/skagerak-cutter-mini-wardrobe',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Garderobe kr 4 199  Varianter - Eik.jpg', material: 'FSC-certified oak', price: 4199 },
        { name: 'Teak', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  Teak.jpg', material: 'FSC-certified teak', price: 4199 },
        { name: 'Black', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  black.webp', material: 'Black oak', price: 4199 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagerak-cutter-box',
      name: 'Skagerak Cutter Box',
      description: 'Versatile storage box from the Cutter series. Clean design meets practical functionality for organizing your space.',
      price: 2799,
      brand: 'Fritz Hansen',
      category: 'Storage',
      image: '/Fritz Hansen/Skagerak-Cutter-Box/Skagerak Cutter Box NOK  2,799  Base -  Teak.jpg',
      href: '/fritz-hansen/skagerak-cutter-box',
      variants: [
        { name: 'Teak', image: '/Fritz Hansen/Skagerak-Cutter-Box/Skagerak Cutter Box NOK  2,799  Base -  Teak.jpg', material: 'FSC-certified teak', price: 2799 },
        { name: 'Oak', image: '/Fritz Hansen/Skagerak-Cutter-Box/Skagerak Cutter Box NOK  2,799  Base -  Oak.png', material: 'FSC-certified oak', price: 2799 },
        { name: 'Black', image: '/Fritz Hansen/Skagerak-Cutter-Box/Skagerak Cutter Box NOK  2,999  Base -  Black.png', material: 'Black oak', price: 2999 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagerak-cutter-box-low',
      name: 'Skagerak Cutter Box Low',
      description: 'Low-profile storage box from the Cutter series. Perfect for under-bed storage or as a coffee table with hidden storage.',
      price: 1549,
      brand: 'Fritz Hansen',
      category: 'Storage',
      image: '/Fritz Hansen/Skagerak-Cutter-Box-Low/Skagerak Cutter Box Low kr  1 549  Base -  Oak.webp',
      href: '/fritz-hansen/skagerak-cutter-box-low',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen/Skagerak-Cutter-Box-Low/Skagerak Cutter Box Low kr  1 549  Base -  Oak.webp', material: 'FSC-certified oak', price: 1549 },
        { name: 'Teak', image: '/Fritz Hansen/Skagerak-Cutter-Box-Low/Skagerak Cutter Box Low kr  1 549  Base -  Teak.webp', material: 'FSC-certified teak', price: 1549 },
        { name: 'Black', image: '/Fritz Hansen/Skagerak-Cutter-Box-Low/Skagerak Cutter Box Low kr  1 599  Base -  Black.webp', material: 'Black oak', price: 1599 }
      ],
      inStock: true,
    },

    {
      id: 'fritz-hansen-skagerak-cutter-wardrobe',
      name: 'Skagerak Cutter Wardrobe',
      description: 'Full-size wardrobe from the Cutter series. Combines the series\' sculptural design with ample storage space for clothing and accessories.',
      price: 8999,
      brand: 'Fritz Hansen',
      category: 'Storage',
      image: '/Fritz Hansen/Skagerak-Cutter-Wardrobe/Skagerak Cutter Wardrobe kr 8 999  Base - Teak.webp',
      href: '/fritz-hansen/skagerak-cutter-wardrobe',
      variants: [
        { name: 'Teak', image: '/Fritz Hansen/Skagerak-Cutter-Wardrobe/Skagerak Cutter Wardrobe kr 8 999  Base - Teak.webp', material: 'FSC-certified teak', price: 8999 },
        { name: 'Oak', image: '/Fritz Hansen/Skagerak-Cutter-Wardrobe/Skagerak Cutter Wardrobe NOK  8,999  Base -  Oak.webp', material: 'FSC-certified oak', price: 8999 },
        { name: 'Black', image: '/Fritz Hansen/Skagerak-Cutter-Wardrobe/Skagerak Cutter Wardrobe NOK  9,399  Base -  Black.webp', material: 'Black oak', price: 9399 }
      ],
      inStock: true,
    },

    // JONAS IHREBORN FURNITURE PRODUCTS
    {
      id: 'jonas-ihreborn-seventy-armchair',
      name: 'Seventy Armchair',
      description: 'Premium Swedish armchair with exceptional comfort and timeless design. Upholstered in finest Challenger leather.',
      price: 19035,
      brand: 'Jonas Ihreborn',
      category: 'Seating',
      image: '/Jonas-Ihreborn/Jonas Ihreborn Seventy armchair NOK  19,035  Color -  Challenger Cognac 025.avif',
      href: '/jonas-ihreborn/seventy-armchair',
      variants: [
        { name: 'Challenger Leather Cognac', image: '/Jonas-Ihreborn/Jonas Ihreborn Seventy armchair NOK  19,035  Color -  Challenger Cognac 025.avif', material: 'Challenger Leather', color: 'Cognac', price: 19035 },
        { name: 'Challenger Leather Dark Brown', image: '/Jonas-Ihreborn/Seventy lenestol kr 19 305  Farge - Challenger Dark Brown 086.avif', material: 'Challenger Leather', color: 'Dark Brown', price: 19305 }
      ],
      lifestyleImages: [
        '/Jonas-Ihreborn/lifestyle/IMG_6760.jpg'
      ],
      inStock: true,
    },

    // JUUL FURNITURE PRODUCTS
    {
      id: 'juul-903-leather-prestige-18',
      name: 'Juul 903 - Leather Prestige 18',
      description: 'Premium 3-seater sofa with luxurious Leather Prestige 18 upholstery. Danish craftsmanship meets contemporary comfort in this sophisticated seating solution.',
      price: 149999,
      brand: 'Juul',
      category: 'Sofa',
      image: '/Juul 903/juul-903-240x86-cm-Leather Prestige-18.jpg',
      href: '/interior/living-room/sofa/juul-903',
      variants: [
        { name: 'Leather Prestige 18', image: '/Juul 903/juul-903-240x86-cm-Leather Prestige-18.jpg', material: 'Leather Prestige 18', color: 'Brown', price: 149999 },
        { name: 'Prestige 10', image: '/Juul 903/juul-903-240x86-cm-prestige-10.jpg', material: 'Prestige 10', color: 'Light Brown', price: 139999 },
        { name: 'Prestige 03', image: '/Juul 903/Prestige 03.webp', material: 'Prestige 03', color: 'Beige', price: 139999 }
      ],
      inStock: true,
      roomCategory: 'living-room'
    },

    {
      id: 'juul-301-mainz-09',
      name: 'Juul 301 - Mainz 09',
      description: 'Compact 2-seater sofa with premium Mainz 09 upholstery. Perfect for smaller spaces without compromising on Danish design quality and comfort.',
      price: 89999,
      brand: 'Juul',
      category: 'Sofa',
      image: '/Juul 903/JUUL 301/mainz 09.jpg',
      href: '/interior/living-room/sofa/juul-903',
      variants: [
        { name: 'Mainz 09', image: '/Juul 903/JUUL 301/mainz 09.jpg', material: 'Mainz 09', color: 'Grey', price: 89999 },
        { name: 'Tobacco 16', image: '/Juul 903/JUUL 301/Tobacco 16.jpg', material: 'Tobacco 16', color: 'Brown', price: 89999 },
        { name: 'Tobacco 37', image: '/Juul 903/JUUL 301/Tobacco 37.jpg', material: 'Tobacco 37', color: 'Dark Brown', price: 89999 }
      ],
      inStock: true,
      roomCategory: 'living-room'
    }
  ];

  return _allProducts;
};

// Export functions that use lazy loading
export const getAllProducts = (): StaticProduct[] => {
  return loadProducts();
};

export const allProducts = getAllProducts();

// Additional utility functions
export const getAllBrands = (): string[] => {
  const products = getAllProducts();
  return Array.from(new Set(products.map(product => product.brand))).sort();
};

export const getProductsByBrand = (brand: string): StaticProduct[] => {
  const products = getAllProducts();
  return products.filter(product => product.brand === brand);
};

export const searchProductsAndBrands = (query: string): StaticProduct[] => {
  const products = getAllProducts();
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export const getBrandSuggestions = (query: string): string[] => {
  const brands = getAllBrands();
  const searchTerm = query.toLowerCase();
  return brands.filter(brand => 
    brand.toLowerCase().includes(searchTerm)
  );
};

// For backward compatibility
export { allProducts as default };
