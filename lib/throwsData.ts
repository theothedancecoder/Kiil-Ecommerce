export interface ThrowsProduct {
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

export const throwsData: ThrowsProduct[] = [
  {
    _id: 'bainbridge-natural-blanket',
    name: 'Bainbridge Natural Blanket',
    slug: { current: 'bainbridge-natural-blanket' },
    description: 'Natural woven blanket with sophisticated texture, 140×185cm from Designers Guild.',
    price: 2590,
    brand: 'Designers Guild',
    image: '/Designers-Guild/Throw/Bainbridge-Natural-blanke/Bainbridge Natural blanket 140×185 NOK  2,590.jpg',
    inStock: true,
    stock: 12,
    href: '/interior/home-accessories/throws/bainbridge-natural-blanket',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'clarendon-natural-throw',
    name: 'Clarendon Natural Throw',
    slug: { current: 'clarendon-natural-throw' },
    description: 'Elegant natural throw with refined texture and timeless appeal, 140×185cm.',
    price: 2850,
    brand: 'Designers Guild',
    image: '/Designers-Guild/Throw/Clarendon-Natural-Throw/Clarendon Natural Throw, 140×185 NOK  2,850.webp',
    inStock: true,
    stock: 8,
    href: '/interior/home-accessories/throws/clarendon-natural-throw',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'katan-fuchsia-blanket',
    name: 'Katan Fuchsia Blanket',
    slug: { current: 'katan-fuchsia-blanket' },
    description: 'Vibrant fuchsia blanket with rich color and luxurious feel from Designers Guild.',
    price: 2850,
    brand: 'Designers Guild',
    image: '/Designers-Guild/Throw/Katan-Fuchsia-blanket/Katan Fuchsia blanket NOK  2,850.jpeg',
    inStock: true,
    stock: 6,
    href: '/interior/home-accessories/throws/katan-fuchsia-blanket',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'lansdowne-cobalt-throw',
    name: 'Lansdowne Cobalt Throw',
    slug: { current: 'lansdowne-cobalt-throw' },
    description: 'Stunning cobalt blue throw with sophisticated weave, 130×190cm.',
    price: 2850,
    brand: 'Designers Guild',
    image: '/Designers-Guild/Throw/Lansdowne-Cobalt-Throw/Lansdowne Cobalt Throw 130×190 NOK  2,850  .webp',
    inStock: true,
    stock: 10,
    href: '/interior/home-accessories/throws/lansdowne-cobalt-throw',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'marano-zinnia-throw',
    name: 'Marano Zinnia Throw',
    slug: { current: 'marano-zinnia-throw' },
    description: 'Beautiful zinnia-colored throw with artistic pattern, 130×190cm from Designers Guild.',
    price: 2590,
    brand: 'Designers Guild',
    image: '/Designers-Guild/Throw/Marano-Zinnia-Throw/Marano Zinnia Throw 130×190 from Designers Guild NOK  2,590.webp',
    inStock: true,
    stock: 14,
    href: '/interior/home-accessories/throws/marano-zinnia-throw',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'mikome-indigo-mohair-throw-1',
    name: 'Mikome Indigo Mohair Throw',
    slug: { current: 'mikome-indigo-mohair-throw-1' },
    description: 'Luxurious indigo mohair throw with exceptional softness, 130×190cm.',
    price: 2850,
    brand: 'Designers Guild',
    image: '/Designers-Guild/Throw/Mikome Indigo-Mohair-Throw/Mikome Indigo Mohair Throw 130×190 NOK  2,850.jpg',
    inStock: true,
    stock: 7,
    href: '/interior/home-accessories/throws/mikome-indigo-mohair-throw-1',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  },
  {
    _id: 'mikome-indigo-mohair-throw-2',
    name: 'Mikome Indigo Mohair Throw (Alternative)',
    slug: { current: 'mikome-indigo-mohair-throw-2' },
    description: 'Premium indigo mohair throw with rich texture and warmth, 130×190cm.',
    price: 2850,
    brand: 'Designers Guild',
    image: '/Designers-Guild/Throw/Mikome-Indigo-Mohair-Throw/Mikome Indigo Mohair Throw 130×190 NOK  2,850.jpg',
    inStock: true,
    stock: 5,
    href: '/interior/home-accessories/throws/mikome-indigo-mohair-throw-2',
    categories: [{ title: 'Designers Guild', slug: { current: 'designers-guild' } }]
  }
];
