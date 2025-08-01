export interface CushionProduct {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  brand: string;
  image: string;
  inStock: boolean;
  stock: number;
  href: string;
  categories: Array<{ title: string; slug: { current: string } }>;
}

export const cushionsData: CushionProduct[] = [
  {
    _id: 'bengal-bird-marais-cushion',
    name: 'Bengal Bird Marais Cushion',
    slug: { current: 'bengal-bird-marais-cushion' },
    description: 'Exotic Bengal Bird design cushion in beautiful Marais colorway from Designers Guild.',
    price: 1590,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Bengal-Bird-Marais-Cushion/Bengal Bird Marais Cushion NOK  1,590.webp',
    inStock: true,
    stock: 12,
    href: '/interior/home-accessories/cushions/bengal-bird-marais-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'parrot-and-palm-parchment-cushion',
    name: 'Parrot And Palm Parchment Cushion',
    slug: { current: 'parrot-and-palm-parchment-cushion' },
    description: 'John Derian for Designers Guild - Parrot and Palm design in parchment, 50×50cm.',
    price: 1790,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Parrot-And-Palm-Parchment-Cushion/Parrot And Palm Parchment Cushion 50×50 - John Derian for Designers Guild NOK  1,790.webp',
    inStock: true,
    stock: 8,
    href: '/interior/home-accessories/cushions/parrot-and-palm-parchment-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'perzina-grass-cushion',
    name: 'Perzina Grass Cushion',
    slug: { current: 'perzina-grass-cushion' },
    description: 'Natural grass-inspired Perzina cushion from Designers Guild.',
    price: 1400,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Perzina-Grass-Cushion/Perzina Grass Cushion NOK  1,400.webp',
    inStock: true,
    stock: 15,
    href: '/interior/home-accessories/cushions/perzina-grass-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'polwarth-chalk-cushion',
    name: 'Polwarth Chalk Cushion',
    slug: { current: 'polwarth-chalk-cushion' },
    description: 'Elegant Polwarth cushion in sophisticated chalk colorway.',
    price: 1500,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Polwarth-Chalk-cushion/Polwarth Chalk cushion Designers Guild NOK  1,500.jpg',
    inStock: true,
    stock: 10,
    href: '/interior/home-accessories/cushions/polwarth-chalk-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'raku-patchwork-emerald-velvet-cushion',
    name: 'Raku Patchwork Emerald Velvet Cushion',
    slug: { current: 'raku-patchwork-emerald-velvet-cushion' },
    description: 'Luxurious emerald velvet cushion with Raku patchwork design, 50×50cm.',
    price: 2050,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Raku-Patchwork-Emerald-Velvet-Cushion/Raku Patchwork Emerald Velvet Cushion, 50×50 NOK  2,050.webp',
    inStock: true,
    stock: 6,
    href: '/interior/home-accessories/cushions/raku-patchwork-emerald-velvet-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'rose-de-damas-embroidered-cranberry-cushion',
    name: 'Rose De Damas Embroidered Cranberry Cushion',
    slug: { current: 'rose-de-damas-embroidered-cranberry-cushion' },
    description: 'Exquisite embroidered Rose De Damas cushion in cranberry, 60×45cm.',
    price: 2490,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Rose-De-Damas-Embroidered-Cranberry-Cushion/Rose De Damas Embroidered Cranberry Cushion, 60x45cm NOK  2,490  Rose De Damas Embroidered Cranberry Cushion, 60x45cm .jpeg',
    inStock: true,
    stock: 4,
    href: '/interior/home-accessories/cushions/rose-de-damas-embroidered-cranberry-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'sakiori-ocher-boucle-cushion',
    name: 'Sakiori Ocher Boucle Cushion',
    slug: { current: 'sakiori-ocher-boucle-cushion' },
    description: 'Textured boucle cushion in warm ocher tone, 60×30cm.',
    price: 1590,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Sakiori-Ocher-Boucle-Cushion/Sakiori Ocher Boucle Cushion 60×30 NOK  1,590.jpg',
    inStock: true,
    stock: 9,
    href: '/interior/home-accessories/cushions/sakiori-ocher-boucle-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'sanzai-persimmon-velvet-cushion',
    name: 'Sanzai Persimmon Velvet Cushion',
    slug: { current: 'sanzai-persimmon-velvet-cushion' },
    description: 'Rich persimmon velvet cushion with Sanzai design, 60×45cm.',
    price: 2350,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Sanzai-Persimmon-Velvet-Cushion/Sanzai Persimmon Velvet Cushion 60×45 NOK  2,350  Sold out, but can be ordered.webp',
    inStock: false,
    stock: 0,
    href: '/interior/home-accessories/cushions/sanzai-persimmon-velvet-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'shanghai-garden-ecru-linen-cushion',
    name: 'Shanghai Garden Ecru Linen Cushion',
    slug: { current: 'shanghai-garden-ecru-linen-cushion' },
    description: 'Elegant linen cushion with Shanghai garden motifs in sophisticated ecru, 60×60cm.',
    price: 1550,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Shanghai-Garden-Ecru-Linen-Cushion/Shanghai Garden Ecru Linen Cushion 60×60 NOK  1,550.jpg',
    inStock: true,
    stock: 11,
    href: '/interior/home-accessories/cushions/shanghai-garden-ecru-linen-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'suffolk-garden-birch-cushion',
    name: 'Suffolk Garden Birch Cushion',
    slug: { current: 'suffolk-garden-birch-cushion' },
    description: 'Beautiful Suffolk Garden design in birch colorway.',
    price: 1240,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Suffolk-Garden-Birch-Cushion/Suffolk Garden Birch Cushion NOK  1,240.webp',
    inStock: true,
    stock: 14,
    href: '/interior/home-accessories/cushions/suffolk-garden-birch-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'surrearlesisme-mosaique-cushion',
    name: 'Surrearles\'isme Mosaique Cushion',
    slug: { current: 'surrearlesisme-mosaique-cushion' },
    description: 'Christian Lacroix for Designers Guild - Surrealist mosaic design cushion, 60×45cm.',
    price: 1890,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Surrearles\'isme- Mosaique Cushion /: Designers Guild Surrearles\'isme Mosaique Cushion 60×45 – Christian Lacroix for Designers Guild NOK  1,890.webp',
    inStock: true,
    stock: 7,
    href: '/interior/home-accessories/cushions/surrearlesisme-mosaique-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'tokusa-sepia-embroidered-cushion',
    name: 'Tokusa Sepia Embroidered Cushion',
    slug: { current: 'tokusa-sepia-embroidered-cushion' },
    description: 'Delicate embroidered Tokusa design in sepia tones, 40×30cm.',
    price: 1290,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Tokusa-Sepia-Embroidered-Cushion/Tokusa Sepia Embroidered Cushion 40×30 NOK  1,290  .webp',
    inStock: true,
    stock: 13,
    href: '/interior/home-accessories/cushions/tokusa-sepia-embroidered-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'valetta-peacock-cushion',
    name: 'Valetta Peacock Cushion',
    slug: { current: 'valetta-peacock-cushion' },
    description: 'Stunning peacock-themed decorative cushion, 60×45cm.',
    price: 1390,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Valetta-Peacock-cushion/Valetta Peacock cushion 60×45 from Designers Guild NOK  1,390.jpg',
    inStock: true,
    stock: 16,
    href: '/interior/home-accessories/cushions/valetta-peacock-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'vallarta-flamingo-pillow',
    name: 'Vallarta Flamingo Pillow',
    slug: { current: 'vallarta-flamingo-pillow' },
    description: 'Tropical flamingo design pillow from the Vallarta collection.',
    price: 1300,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Vallarta-Flamingo-pillow/Vallarta Flamingo pillow NOK  1,300  Vallarta Flamingo pillow .webp',
    inStock: true,
    stock: 18,
    href: '/interior/home-accessories/cushions/vallarta-flamingo-pillow',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'varese-cerulean-sky-velvet-throw-pillow',
    name: 'Varese Cerulean & Sky Velvet Throw Pillow',
    slug: { current: 'varese-cerulean-sky-velvet-throw-pillow' },
    description: 'Luxurious velvet throw pillow in cerulean and sky blue tones, 43×43cm.',
    price: 1190,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Varese-Cerulean-&-Sky-Velvet-Throw-Pillow/Varese Cerulean & Sky Velvet Throw Pillow 43×43 NOK  1,190.webp',
    inStock: true,
    stock: 20,
    href: '/interior/home-accessories/cushions/varese-cerulean-sky-velvet-throw-pillow',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'varese-lime-velvet-cushion',
    name: 'Varese Lime Velvet Cushion',
    slug: { current: 'varese-lime-velvet-cushion' },
    description: 'Vibrant lime green velvet cushion from the Varese collection.',
    price: 1100,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/VARESE-LIME-VELVET-CUSHION/VARESE LIME VELVET CUSHION NOK  1,100  Sold out, but can be ordered  VARESE LIME VELVET CUSHION.webp',
    inStock: false,
    stock: 0,
    href: '/interior/home-accessories/cushions/varese-lime-velvet-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'velluto-emerald-velvet-cushion',
    name: 'Velluto Emerald Velvet Cushion',
    slug: { current: 'velluto-emerald-velvet-cushion' },
    description: 'Rich emerald green velvet cushion, 50×50cm.',
    price: 1150,
    brand: 'Designers Guild',
    image: '/Designers-Guild/cushions/Velluto-Emerald-Velvet-Cushion/Velluto Emerald Velvet Cushion 50×50 NOK  1,150.webp',
    inStock: true,
    stock: 5,
    href: '/interior/home-accessories/cushions/velluto-emerald-velvet-cushion',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  }
];
