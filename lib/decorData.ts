export interface DecorProduct {
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

export const decorData: DecorProduct[] = [
  {
    _id: 'trame-vase-brown-small',
    name: 'Trame Vase Brown Small',
    slug: { current: 'trame-vase-brown-small' },
    description: 'Elegant brown Trame vase with sophisticated geometric pattern, small size (Ø-24 H-22).',
    price: 1380,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Trame vase/Trame vase Brown NOK  1,380  Size -  Small Small Big Reset Ø-24 H-22.jpg',
    inStock: true,
    stock: 8,
    href: '/interior/home-accessories/decor/trame-vase-brown-small',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'trame-vase-brown-large',
    name: 'Trame Vase Brown Large',
    slug: { current: 'trame-vase-brown-large' },
    description: 'Elegant brown Trame vase with sophisticated geometric pattern, large size (Ø-24 H-30).',
    price: 1740,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Trame vase/Trame vase Brown NOK  1,740  Size -  Large Small Big Reset Ø-24 H-30.jpg',
    inStock: true,
    stock: 6,
    href: '/interior/home-accessories/decor/trame-vase-brown-large',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'turquoise-deco-vase',
    name: 'Turquoise Deco Vase',
    slug: { current: 'turquoise-deco-vase' },
    description: 'Stunning turquoise decorative vase with contemporary styling (Ø-25, H-40).',
    price: 2815,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Trame vase/Turquoise Deco vase from EDG NOK  2,815  Height -  High High Reset Ø-25, H-40.jpg',
    inStock: true,
    stock: 5,
    href: '/interior/home-accessories/decor/turquoise-deco-vase',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'vase-3d-rotondo-white',
    name: 'Vase 3D Rotondo White Small',
    slug: { current: 'vase-3d-rotondo-white' },
    description: 'Modern white 3D Rotondo vase with contemporary design and premium finish.',
    price: 3220,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Vase 3D Rotondo/Vase 3D Rotondo White small NOK  3,220.jpg',
    inStock: true,
    stock: 4,
    href: '/interior/home-accessories/decor/vase-3d-rotondo-white',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'vase-design-cilindro-multicolor-40',
    name: 'Vase Design Cilindro Multicolor 40cm',
    slug: { current: 'vase-design-cilindro-multicolor-40' },
    description: 'Colorful cylindrical vase with artistic multicolor design, 40cm height.',
    price: 1715,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Vase Design Cilindro Multicolor /Vase Design Cilindro Multicolor kr  1 715  Height -  40.jpg',
    inStock: true,
    stock: 7,
    href: '/interior/home-accessories/decor/vase-design-cilindro-multicolor-40',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'vase-design-cilindro-multicolor-25',
    name: 'Vase Design Cilindro Multicolor 25cm',
    slug: { current: 'vase-design-cilindro-multicolor-25' },
    description: 'Colorful cylindrical vase with artistic multicolor design, 25cm height.',
    price: 1345,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Vase Design Cilindro Multicolor /Vase Design Cilindro Multicolor NOK  1,345  Height -  25.jpg',
    inStock: true,
    stock: 9,
    href: '/interior/home-accessories/decor/vase-design-cilindro-multicolor-25',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'vase-foglie-matt-glass-green',
    name: 'Vase Foglie Matt Glass Green',
    slug: { current: 'vase-foglie-matt-glass-green' },
    description: 'Beautiful matt glass vase with leaf pattern in green, perfect for modern interiors.',
    price: 2195,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Vase Foglie matt glass/Vase Foglie matt glass NOK  2,195  Color -  Green.jpg',
    inStock: true,
    stock: 6,
    href: '/interior/home-accessories/decor/vase-foglie-matt-glass-green',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'vase-foglie-matt-glass-orange',
    name: 'Vase Foglie Matt Glass Orange',
    slug: { current: 'vase-foglie-matt-glass-orange' },
    description: 'Beautiful matt glass vase with leaf pattern in orange, perfect for modern interiors.',
    price: 2195,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Vase Foglie matt glass/Vase Foglie matt glass NOK  2,195  Color -  Orange.jpg',
    inStock: true,
    stock: 8,
    href: '/interior/home-accessories/decor/vase-foglie-matt-glass-orange',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'vase-with-nuts-low',
    name: 'Vase with Nuts Low',
    slug: { current: 'vase-with-nuts-low' },
    description: 'Decorative vase with nuts design, adding natural elements to your decor (Ø-26, H-20).',
    price: 2445,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Vase with nuts /Vase with nuts EDG NOK  2,445  Height -  Low High Low Reset Ø-26, H-20.webp',
    inStock: true,
    stock: 5,
    href: '/interior/home-accessories/decor/vase-with-nuts-low',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'vase-with-nuts-high',
    name: 'Vase with Nuts High',
    slug: { current: 'vase-with-nuts-high' },
    description: 'Decorative vase with nuts design, adding natural elements to your decor (Ø-24, H-30).',
    price: 3055,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Vase with nuts /Vase with nuts EDG NOK  3,055  Height -  High High Low Reset Ø-24, H-30.webp',
    inStock: true,
    stock: 3,
    href: '/interior/home-accessories/decor/vase-with-nuts-high',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'edg-fragrance-sticks-black-forest',
    name: 'EDG Fragrance Sticks Black Forest',
    slug: { current: 'edg-fragrance-sticks-black-forest' },
    description: 'Premium Black Forest fragrance sticks for home aromatherapy and ambiance (120ml).',
    price: 365,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/EDG-Fragrance-sticks/EDG Fragrance sticks kr  365  Size -  120ml 120ml 300ml Variants -  Black Forest.webp',
    inStock: true,
    stock: 12,
    href: '/interior/home-accessories/decor/edg-fragrance-sticks-black-forest',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  },
  {
    _id: 'striped-light-glass-blue',
    name: 'Striped Light Glass Blue',
    slug: { current: 'striped-light-glass-blue' },
    description: 'Elegant striped glass candle holder in blue for ambient lighting.',
    price: 275,
    brand: 'Enzo de Gasperi',
    image: '/Enzo-de-Gasperi/Striped light glass /Striped light glass kr  275  Color -  Blue.jpg',
    inStock: true,
    stock: 15,
    href: '/interior/home-accessories/decor/striped-light-glass-blue',
    categories: [{ title: 'Enzo de Gasperi', slug: { current: 'enzo-de-gasperi' } }]
  }
];
