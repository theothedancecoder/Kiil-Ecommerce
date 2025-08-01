export interface RoCollectionChairsProduct {
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
    color?: string;
  }>;
  lifestyleImages?: string[];
  // Add properties to make it compatible with ProductThumbWithStock
  staticProduct?: boolean;
  staticHref?: string;
  staticImage?: string;
  staticBrand?: string;
}

export const roCollectionChairsData: RoCollectionChairsProduct[] = [
  {
    _id: 'salon-dining-chair',
    name: 'RO Collection Salon Dining Chair',
    slug: { current: 'salon-dining-chair' },
    description: 'Elegant dining chair with premium leather upholstery and solid wood base.',
    price: 22005,
    brand: 'RO Collection',
    image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Oiled oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp',
    inStock: true,
    stock: 8,
    href: '/interior/dining-kitchen/chairs/salon-dining-chair',
    categories: [{ title: 'RO Collection', slug: { current: 'ro-collection' } }],
    variants: [
      {
        name: 'Oiled Oak Base / Supreme Cognac',
        price: 22005,
        image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Oiled oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp',
        material: 'Oiled Oak',
        color: 'Supreme Cognac'
      },
      {
        name: 'Soaped Oak Base / Supreme Cognac',
        price: 22005,
        image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp',
        material: 'Soaped Oak',
        color: 'Supreme Cognac'
      },
      {
        name: 'Smoked Oak Base / Supreme Cognac',
        price: 22005,
        image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp',
        material: 'Smoked Oak',
        color: 'Supreme Cognac'
      },
      {
        name: 'Soaped Oak Base / Supreme Dark Chocolate',
        price: 22005,
        image: '/Ro-Collection/Salon dining chair/ Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp',
        material: 'Soaped Oak',
        color: 'Supreme Dark Chocolate'
      },
      {
        name: 'Smoked Oak Base / Supreme Dark Chocolate',
        price: 22005,
        image: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp',
        material: 'Smoked Oak',
        color: 'Supreme Dark Chocolate'
      },
      {
        name: 'Oiled Oak Base / Supreme Dark Chocolate',
        price: 22005,
        image: '/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp',
        material: 'Oiled Oak',
        color: 'Supreme Dark Chocolate'
      }
    ],
    lifestyleImages: [
      '/Ro-Collection/Salon dining chair/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp'
    ],
    staticProduct: true,
    staticHref: '/interior/dining-kitchen/chairs/salon-dining-chair',
    staticImage: '/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Oiled oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp',
    staticBrand: 'RO Collection'
  }
];
