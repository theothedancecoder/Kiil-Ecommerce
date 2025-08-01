export interface WallArtProduct {
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
  // Add properties to make it compatible with ProductThumbWithStock
  staticProduct?: boolean;
  staticHref?: string;
  staticImage?: string;
  staticBrand?: string;
}

export const wallArtData: WallArtProduct[] = [
  {
    _id: 'vogue-january-1927-b615',
    name: 'Vogue January 1927 B615',
    slug: { current: 'vogue-january-1927-b615' },
    description: 'Vintage Vogue magazine cover from January 1927, featuring elegant Art Deco design. High-quality reproduction print in white frame, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue January 1927 B615 kr 3 200.00.webp',
    inStock: true,
    stock: 5,
    href: '/interior/home-accessories/wall-art/vogue-january-1927-b615',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-january-1927-b615',
    staticImage: '/Ablo Blommaert -Vogue/Vogue January 1927 B615 kr 3 200.00.webp',
    staticBrand: 'Ablo Blommaert'
  },
  {
    _id: 'vogue-july-1926-b609',
    name: 'Vogue July 1926 B609',
    slug: { current: 'vogue-july-1926-b609' },
    description: 'Stunning Vogue magazine cover from July 1926, showcasing the glamour of the roaring twenties. Premium reproduction with white frame, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue July 1926 B609 kr 3 200.00.webp',
    inStock: true,
    stock: 7,
    href: '/interior/home-accessories/wall-art/vogue-july-1926-b609',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-july-1926-b609',
    staticImage: '/Ablo Blommaert -Vogue/Vogue July 1926 B609 kr 3 200.00.webp',
    staticBrand: 'Ablo Blommaert'
  },
  {
    _id: 'vogue-june-1922-b616',
    name: 'Vogue June 1922 B616',
    slug: { current: 'vogue-june-1922-b616' },
    description: 'Classic Vogue magazine cover from June 1922, representing early fashion illustration artistry. Beautifully framed reproduction, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue June 1922 B616 kr 3 200.00  Vogue June 1922 B616  Vogue June 1922  B616  65×80 CM  Hvit ramme.webp',
    inStock: true,
    stock: 4,
    href: '/interior/home-accessories/wall-art/vogue-june-1922-b616',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-june-1922-b616',
    staticImage: '/Ablo Blommaert -Vogue/Vogue June 1922 B616 kr 3 200.00  Vogue June 1922 B616  Vogue June 1922  B616  65×80 CM  Hvit ramme.webp',
    staticBrand: 'Ablo Blommaert'
  },
  {
    _id: 'vogue-june-1930-b608',
    name: 'Vogue June 1930 B608',
    slug: { current: 'vogue-june-1930-b608' },
    description: 'Sophisticated Vogue magazine cover from June 1930, capturing the elegance of early 20th century fashion. High-quality print with white frame, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue June 1930 B608 kr 3 200.00  Vogue June 1930 B608  Vogue June 1930  B608  65×80 CM  Hvit ramme.webp',
    inStock: true,
    stock: 6,
    href: '/interior/home-accessories/wall-art/vogue-june-1930-b608',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-june-1930-b608',
    staticImage: '/Ablo Blommaert -Vogue/Vogue June 1930 B608 kr 3 200.00  Vogue June 1930 B608  Vogue June 1930  B608  65×80 CM  Hvit ramme.webp',
    staticBrand: 'Ablo Blommaert'
  },
  {
    _id: 'vogue-may-1927-b607',
    name: 'Vogue May 1927 B607',
    slug: { current: 'vogue-may-1927-b607' },
    description: 'Timeless Vogue magazine cover from May 1927, featuring exquisite Art Deco styling. Premium reproduction in elegant white frame, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue May 1927 B607 kr 3 200.00  Vogue May 1927 B607   Vogue May 1927  B607  65×80 CM  Hvit ramme.webp',
    inStock: true,
    stock: 8,
    href: '/interior/home-accessories/wall-art/vogue-may-1927-b607',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-may-1927-b607',
    staticImage: '/Ablo Blommaert -Vogue/Vogue May 1927 B607 kr 3 200.00  Vogue May 1927 B607   Vogue May 1927  B607  65×80 CM  Hvit ramme.webp',
    staticBrand: 'Ablo Blommaert'
  },
  {
    _id: 'vogue-may-1929-b614',
    name: 'Vogue May 1929 B614',
    slug: { current: 'vogue-may-1929-b614' },
    description: 'Iconic Vogue magazine cover from May 1929, representing the height of fashion illustration. Museum-quality reproduction with white frame, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue May 1929 B614 kr 3 200.00.webp',
    inStock: true,
    stock: 3,
    href: '/interior/home-accessories/wall-art/vogue-may-1929-b614',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-may-1929-b614',
    staticImage: '/Ablo Blommaert -Vogue/Vogue May 1929 B614 kr 3 200.00.webp',
    staticBrand: 'Ablo Blommaert'
  },
  {
    _id: 'vogue-october-1925-b613',
    name: 'Vogue October 1925 B613',
    slug: { current: 'vogue-october-1925-b613' },
    description: 'Rare Vogue magazine cover from October 1925, showcasing the artistic brilliance of mid-1920s design. Professional reproduction in white frame, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue October 1925 B613 kr 3 200.00.webp',
    inStock: true,
    stock: 9,
    href: '/interior/home-accessories/wall-art/vogue-october-1925-b613',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-october-1925-b613',
    staticImage: '/Ablo Blommaert -Vogue/Vogue October 1925 B613 kr 3 200.00.webp',
    staticBrand: 'Ablo Blommaert'
  },
  {
    _id: 'vogue-september-1926-b610',
    name: 'Vogue September 1926 B610',
    slug: { current: 'vogue-september-1926-b610' },
    description: 'Elegant Vogue magazine cover from September 1926, embodying the sophistication of the Jazz Age. High-quality reproduction with white frame, 65×80 CM.',
    price: 3200,
    brand: 'Ablo Blommaert',
    image: '/Ablo Blommaert -Vogue/Vogue September 1926 B610 kr 3 200.00.webp',
    inStock: true,
    stock: 2,
    href: '/interior/home-accessories/wall-art/vogue-september-1926-b610',
    categories: [{ title: 'Ablo Blommaert', slug: { current: 'ablo-blommaert' } }],
    staticProduct: true,
    staticHref: '/interior/home-accessories/wall-art/vogue-september-1926-b610',
    staticImage: '/Ablo Blommaert -Vogue/Vogue September 1926 B610 kr 3 200.00.webp',
    staticBrand: 'Ablo Blommaert'
  }
];
