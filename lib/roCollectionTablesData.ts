export interface RoCollectionTablesProduct {
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
  variants?: Array<{
    name: string;
    price?: number;
    image?: string;
    material?: string;
    size?: string;
  }>;
  lifestyleImages?: string[];
  // Add properties to make it compatible with ProductThumbWithStock
  staticProduct?: boolean;
  staticHref?: string;
  staticImage?: string;
  staticBrand?: string;
}

export const roCollectionTablesData: RoCollectionTablesProduct[] = [
  {
    _id: 'salon-dining-table-round-120',
    name: 'RO Collection Salon Dining Table Ø-120',
    slug: { current: 'salon-dining-table-round-120' },
    description: 'A beautiful round dining table perfect for intimate dining experiences.',
    price: 29940,
    brand: 'RO Collection',
    image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp',
    inStock: true,
    stock: 5,
    href: '/interior/dining-kitchen/tables/salon-dining-table-round-120',
    categories: [{ title: 'RO Collection', slug: { current: 'ro-collection' } }],
    variants: [
      {
        name: 'Oiled Oak',
        price: 29940,
        image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp',
        material: 'Oiled Oak'
      },
      {
        name: 'Soaped Oak',
        price: 29940,
        image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Soaped oak.webp',
        material: 'Soaped Oak'
      },
      {
        name: 'Smoked Oak',
        price: 33450,
        image: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  33,450  Color -  Smoked oak.webp',
        material: 'Smoked Oak'
      }
    ],
    lifestyleImages: [
      '/Ro-Collection/Salon dining table Ø-120/lifestyle/Gal_6.webp'
    ],
    staticProduct: true,
    staticHref: '/interior/dining-kitchen/tables/salon-dining-table-round-120',
    staticImage: '/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp',
    staticBrand: 'RO Collection'
  },
  {
    _id: 'salon-dining-table-extension-round-120',
    name: 'RO Collection Salon Dining Table with Extension Ø-120',
    slug: { current: 'salon-dining-table-extension-round-120' },
    description: 'Versatile round dining table with extension functionality.',
    price: 29940,
    brand: 'RO Collection',
    image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp',
    inStock: true,
    stock: 3,
    href: '/interior/dining-kitchen/tables/salon-dining-table-extension-round-120',
    categories: [{ title: 'RO Collection', slug: { current: 'ro-collection' } }],
    variants: [
      {
        name: 'Oiled Oak',
        price: 29940,
        image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp',
        material: 'Oiled Oak'
      },
      {
        name: 'Soaped Oak',
        price: 29940,
        image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Soaped oak.webp',
        material: 'Soaped Oak'
      },
      {
        name: 'Smoked Oak',
        price: 33450,
        image: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  33,450  Color -  Smoked oak.webp',
        material: 'Smoked Oak'
      }
    ],
    lifestyleImages: [
      '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/SAL-ET-O120OO-720_2_800x800_crop_center@2x.webp',
      '/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/Salon_extension_table_round_1920x1920_re_800x800_crop_center@2x.webp'
    ],
    staticProduct: true,
    staticHref: '/interior/dining-kitchen/tables/salon-dining-table-extension-round-120',
    staticImage: '/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp',
    staticBrand: 'RO Collection'
  },
  {
    _id: 'salon-dining-table-rectangular-extension',
    name: 'RO Collection Salon Dining Table with Extension',
    slug: { current: 'salon-dining-table-rectangular-extension' },
    description: 'Spacious rectangular dining table with extension capability.',
    price: 35190,
    brand: 'RO Collection',
    image: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp',
    inStock: true,
    stock: 2,
    href: '/interior/dining-kitchen/tables/salon-dining-table-rectangular-extension',
    categories: [{ title: 'RO Collection', slug: { current: 'ro-collection' } }],
    variants: [
      {
        name: 'Oiled Oak (190x90)',
        price: 35190,
        image: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp',
        material: 'Oiled Oak',
        size: '190x90'
      },
      {
        name: 'Oiled Oak (220x100)',
        price: 37815,
        image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Oiled oak.webp',
        material: 'Oiled Oak',
        size: '220x100'
      },
      {
        name: 'Soaped Oak (190x90)',
        price: 35190,
        image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Soaped oak.webp',
        material: 'Soaped Oak',
        size: '190x90'
      },
      {
        name: 'Soaped Oak (220x100)',
        price: 37815,
        image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Soaped oak.webp',
        material: 'Soaped Oak',
        size: '220x100'
      },
      {
        name: 'Smoked Oak (190x90)',
        price: 38700,
        image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  38,700  Size -  190x90 190x90 220x100 Color -  Smoked oak.webp',
        material: 'Smoked Oak',
        size: '190x90'
      },
      {
        name: 'Smoked Oak (220x100)',
        price: 41385,
        image: '/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  41,385  Size -  220x100 190x90 220x100 Color -  Smoked oak.webp',
        material: 'Smoked Oak',
        size: '220x100'
      }
    ],
    lifestyleImages: [],
    staticProduct: true,
    staticHref: '/interior/dining-kitchen/tables/salon-dining-table-rectangular-extension',
    staticImage: '/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp',
    staticBrand: 'RO Collection'
  }
];
