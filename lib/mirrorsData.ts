export interface MirrorVariant {
  name: string;
  image?: string;
  color?: string;
  material?: string;
  size?: string;
  price?: number;
}

export interface MirrorProduct {
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
  variants?: MirrorVariant[];
}

export const mirrorsData: MirrorProduct[] = [
  {
    _id: 'montana-around-mirror',
    name: 'Montana Around Mirror',
    slug: { current: 'montana-around-mirror' },
    description: 'Elegant Montana Around mirror with distinctive design, perfect for modern interiors. Available in multiple sophisticated colors.',
    price: 2890,
    brand: 'Montana',
    image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_02-Fjord_Perspective.png',
    inStock: true,
    stock: 26,
    href: '/interior/bathroom/mirrors/montana-around-mirror',
    categories: [{ title: 'Montana', slug: { current: 'montana' } }],
    variants: [
      {
        name: 'White',
        color: 'White',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_01_White_Perspective.png'
      },
      {
        name: 'New White',
        color: 'New White',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_101-New-White_Perspective.png'
      },
      {
        name: 'Snow',
        color: 'Snow',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_38-Snow_Perspective.png'
      },
      {
        name: 'Fjord',
        color: 'Fjord',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_02-Fjord_Perspective.png'
      },
      {
        name: 'Black',
        color: 'Black',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_05-Black_Perspective.png'
      },
      {
        name: 'Anthracite',
        color: 'Anthracite',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_04-Anthracite_Perspective.png'
      },
      {
        name: 'Nordic',
        color: 'Nordic',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_09-Nordic_Perspective.png'
      },
      {
        name: 'Coal',
        color: 'Coal',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_36-Coal_Perspective.png'
      },
      {
        name: 'Coffee',
        color: 'Coffee',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_35-Coffee_Perspective.png'
      },
      {
        name: 'Black Jade',
        color: 'Black Jade',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_163-Black-Jade_Perspective.png'
      },
      {
        name: 'Ruby',
        color: 'Ruby',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Ruby_Perspective.png'
      },
      {
        name: 'Amber',
        color: 'Amber',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_142-Amber_Perspective.png'
      },
      {
        name: 'Vanilla',
        color: 'Vanilla',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_150-Vanilla_Perspective.png'
      },
      {
        name: 'Mushroom',
        color: 'Mushroom',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_137-Mushroom_Perspective.png'
      },
      {
        name: 'Truffle',
        color: 'Truffle',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_141-Truffle_Perspective.png'
      },
      {
        name: 'Shadow',
        color: 'Shadow',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_147-Shadow_Perspective.png'
      },
      {
        name: 'Flint',
        color: 'Flint',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_148-Flint_Perspective.png'
      },
      {
        name: 'Graphic',
        color: 'Graphic',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_100-Graphic_Perspective-700x700.png'
      },
      {
        name: 'Monarch',
        color: 'Monarch',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_135-Monarch_Perspective.png'
      },
      {
        name: 'Pine',
        color: 'Pine',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_136-Pine_Perspective.png'
      },
      {
        name: 'Juniper',
        color: 'Juniper',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_138-Juniper_Perspective.png'
      },
      {
        name: 'Oregano',
        color: 'Oregano',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_139-Oregano_Perspective.png'
      },
      {
        name: 'Parsley',
        color: 'Parsley',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_152-Parsley_Perspective.png'
      },
      {
        name: 'Pomelo',
        color: 'Pomelo',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_140-Pomelo_Perspective.png'
      },
      {
        name: 'Fennel',
        color: 'Fennel',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_144-Fennel_Perspective.png'
      },
      {
        name: 'Rosehip',
        color: 'Rosehip',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_145-Rosehip_Perspective.png'
      },
      {
        name: 'Rhubarb',
        color: 'Rhubarb',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_151-Rhubarb_Perspective.png'
      },
      {
        name: 'Hazelnut',
        color: 'Hazelnut',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_146-Hazelnut_Perspective.png'
      },
      {
        name: 'Azure',
        color: 'Azure',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_154-Azure_Perspective.png'
      },
      {
        name: 'Masala',
        color: 'Masala',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_155-Masala_Perspective.png'
      },
      {
        name: 'Oyster',
        color: 'Oyster',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_156-Oyster_Perspective.png'
      },
      {
        name: 'Cumin',
        color: 'Cumin',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_157-Cumin_Perspective.png'
      },
      {
        name: 'Oat',
        color: 'Oat',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_158-Oat_Perspective.png'
      },
      {
        name: 'Camomile',
        color: 'Camomile',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_159-Camomile_Perspective.png'
      },
      {
        name: 'Balsamic',
        color: 'Balsamic',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_160-Balsamic_Perspective.png'
      },
      {
        name: 'Mist',
        color: 'Mist',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_161-Mist_Perspective.png'
      },
      {
        name: 'Hokkaido',
        color: 'Hokkaido',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_162-Hokkaido_Perspective.png'
      },
      {
        name: 'Iris',
        color: 'Iris',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_164-Iris_Perspective.png'
      },
      {
        name: 'Beetroot',
        color: 'Beetroot',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Mirror_165-Beetroot_Perspective.png'
      },
      {
        name: 'Acacia',
        color: 'Acacia',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Acacia_Perspective.png'
      },
      {
        name: 'Clay',
        color: 'Clay',
        image: '/Montana-Mirrors/MONTANA AROUND MIRROR/Montana_Selection_AROUND_Clay_Perspective.png'
      }
    ]
  },
  {
    _id: 'montana-like-mirror',
    name: 'Montana Like Mirror',
    slug: { current: 'montana-like-mirror' },
    description: 'Minimalist Montana Like mirror with clean lines, perfect for any room. Available in multiple sophisticated colors.',
    price: 2490,
    brand: 'Montana',
    image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Ruby_Perspective.png',
    inStock: true,
    stock: 24,
    href: '/interior/bathroom/mirrors/montana-like-mirror',
    categories: [{ title: 'Montana', slug: { current: 'montana' } }],
    variants: [
      {
        name: 'White',
        color: 'White',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_White_Perspective.png'
      },
      {
        name: 'New White',
        color: 'New White',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_NewWhite_Perspective.png'
      },
      {
        name: 'Snow',
        color: 'Snow',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Snow_Perspective.png'
      },
      {
        name: 'Fjord',
        color: 'Fjord',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Fjord_Perspective.png'
      },
      {
        name: 'Black',
        color: 'Black',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Black_Perspective.png'
      },
      {
        name: 'Anthracite',
        color: 'Anthracite',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Anthracite_Perspective.png'
      },
      {
        name: 'Nordic',
        color: 'Nordic',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Nordic_Perspective.png'
      },
      {
        name: 'Coal',
        color: 'Coal',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Coal_Perspective.png'
      },
      {
        name: 'Coffee',
        color: 'Coffee',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Coffee_Perspective.png'
      },
      {
        name: 'Black Jade',
        color: 'Black Jade',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_BlackJade_Perspective.png'
      },
      {
        name: 'Ruby',
        color: 'Ruby',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Ruby_Perspective.png'
      },
      {
        name: 'Amber',
        color: 'Amber',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Amber_Perspective.png'
      },
      {
        name: 'Vanilla',
        color: 'Vanilla',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Vanilla_Perspective.png'
      },
      {
        name: 'Mushroom',
        color: 'Mushroom',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Mushroom_Perspective.png'
      },
      {
        name: 'Truffle',
        color: 'Truffle',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Truffle_Perspective.png'
      },
      {
        name: 'Shadow',
        color: 'Shadow',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Shadow_Perspective.png'
      },
      {
        name: 'Flint',
        color: 'Flint',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Flint_Perspective.png'
      },
      {
        name: 'Graphic',
        color: 'Graphic',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Graphic_Perspective.png'
      },
      {
        name: 'Monarch',
        color: 'Monarch',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Monarch_Perspective.png'
      },
      {
        name: 'Pine',
        color: 'Pine',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Pine_Perspective.png'
      },
      {
        name: 'Juniper',
        color: 'Juniper',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Juniper_Perspective.png'
      },
      {
        name: 'Oregano',
        color: 'Oregano',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Oregano_Perspective.png'
      },
      {
        name: 'Parsley',
        color: 'Parsley',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Parsley_Perspective.png'
      },
      {
        name: 'Pomelo',
        color: 'Pomelo',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Pomelo_Perspective.png'
      },
      {
        name: 'Fennel',
        color: 'Fennel',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Fennel_Perspective.png'
      },
      {
        name: 'Rosehip',
        color: 'Rosehip',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Rosehip_Perspective.png'
      },
      {
        name: 'Rhubarb',
        color: 'Rhubarb',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Rhubarb_Perspective.png'
      },
      {
        name: 'Hazelnut',
        color: 'Hazelnut',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Hazelnut_Perspective.png'
      },
      {
        name: 'Azure',
        color: 'Azure',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Azure_Perspective.png'
      },
      {
        name: 'Masala',
        color: 'Masala',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Masala_Perspective.png'
      },
      {
        name: 'Oyster',
        color: 'Oyster',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Oyster_Perspective.png'
      },
      {
        name: 'Cumin',
        color: 'Cumin',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Cumin_Perspective.png'
      },
      {
        name: 'Oat',
        color: 'Oat',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Oat_Perspective.png'
      },
      {
        name: 'Camomile',
        color: 'Camomile',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Camomile_Perspective.png'
      },
      {
        name: 'Balsamic',
        color: 'Balsamic',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Balsamic_Perspective.png'
      },
      {
        name: 'Mist',
        color: 'Mist',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Mist_Perspective.png'
      },
      {
        name: 'Hokkaido',
        color: 'Hokkaido',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Hokkaido_Perspective.png'
      },
      {
        name: 'Iris',
        color: 'Iris',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Iris_Perspective.png'
      },
      {
        name: 'Beetroot',
        color: 'Beetroot',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Beetroot_Perspective.png'
      },
      {
        name: 'Acacia',
        color: 'Acacia',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Acacia_Perspective.png'
      },
      {
        name: 'Clay',
        color: 'Clay',
        image: '/Montana-Mirrors/MONTANA LIKE MIRROR/Montana_Selection_LIKE_Clay_Perspective.png'
      }
    ]
  },
  {
    _id: 'montana-look-mirror',
    name: 'Montana Look Mirror',
    slug: { current: 'montana-look-mirror' },
    description: 'Contemporary Montana Look mirror combining style and functionality. Available in multiple sophisticated colors.',
    price: 2690,
    brand: 'Montana',
    image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Amber_Perspective.png',
    inStock: true,
    stock: 16,
    href: '/interior/bathroom/mirrors/montana-look-mirror',
    categories: [{ title: 'Montana', slug: { current: 'montana' } }],
    variants: [
      {
        name: 'White',
        color: 'White',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_White_Perspective.png'
      },
      {
        name: 'New White',
        color: 'New White',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_NewWhite_Perspective.png'
      },
      {
        name: 'Snow',
        color: 'Snow',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Snow_Perspective.png'
      },
      {
        name: 'Fjord',
        color: 'Fjord',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Fjord_Perspective.png'
      },
      {
        name: 'Anthracite',
        color: 'Anthracite',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Anthracite_Perspective.png'
      },
      {
        name: 'Nordic',
        color: 'Nordic',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Nordic_Perspective.png'
      },
      {
        name: 'Coal',
        color: 'Coal',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Coal_Perspective-700x700.png'
      },
      {
        name: 'Coffee',
        color: 'Coffee',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Coffee_Perspective.png'
      },
      {
        name: 'Black Jade',
        color: 'Black Jade',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_BlackJade_Perspective.png'
      },
      {
        name: 'Ruby',
        color: 'Ruby',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Ruby_Perspective.png'
      },
      {
        name: 'Amber',
        color: 'Amber',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Amber_Perspective.png'
      },
      {
        name: 'Vanilla',
        color: 'Vanilla',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Vanilla_Perspective.png'
      },
      {
        name: 'Mushroom',
        color: 'Mushroom',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Mushroom_Perspective.png'
      },
      {
        name: 'Truffle',
        color: 'Truffle',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Truffle_Perspective.png'
      },
      {
        name: 'Shadow',
        color: 'Shadow',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Shadow_Perspective.png'
      },
      {
        name: 'Flint',
        color: 'Flint',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Flint_Perspective.png'
      },
      {
        name: 'Graphic',
        color: 'Graphic',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Graphic_Perspective.png'
      },
      {
        name: 'Monarch',
        color: 'Monarch',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Monarch_Perspective.png'
      },
      {
        name: 'Pine',
        color: 'Pine',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Pine_Perspective.png'
      },
      {
        name: 'Juniper',
        color: 'Juniper',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Juniper_Perspective.png'
      },
      {
        name: 'Oregano',
        color: 'Oregano',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oregano_Perspective.png'
      },
      {
        name: 'Parsley',
        color: 'Parsley',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Parsley_Perspective.png'
      },
      {
        name: 'Pomelo',
        color: 'Pomelo',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Pomelo_Perspective.png'
      },
      {
        name: 'Fennel',
        color: 'Fennel',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Fennel_Perspective.png'
      },
      {
        name: 'Rosehip',
        color: 'Rosehip',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Rosehip_Perspective.png'
      },
      {
        name: 'Rhubarb',
        color: 'Rhubarb',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Rhubarb_Perspective.png'
      },
      {
        name: 'Hazelnut',
        color: 'Hazelnut',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Hazelnut_Perspective.png'
      },
      {
        name: 'Azure',
        color: 'Azure',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Azure_Perspective.png'
      },
      {
        name: 'Masala',
        color: 'Masala',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Masala_Perspective.png'
      },
      {
        name: 'Oyster',
        color: 'Oyster',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oyster_Perspective.png'
      },
      {
        name: 'Cumin',
        color: 'Cumin',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Cumin_Perspective.png'
      },
      {
        name: 'Oat',
        color: 'Oat',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Oat_Perspective.png'
      },
      {
        name: 'Camomile',
        color: 'Camomile',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Camomile_Perspective.png'
      },
      {
        name: 'Balsamic',
        color: 'Balsamic',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Balsamic_Perspective.png'
      },
      {
        name: 'Mist',
        color: 'Mist',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Mist_Perspective.png'
      },
      {
        name: 'Hokkaido',
        color: 'Hokkaido',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Hokkaido_Perspective.png'
      },
      {
        name: 'Iris',
        color: 'Iris',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Iris_Perspective.png'
      },
      {
        name: 'Beetroot',
        color: 'Beetroot',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Beetroot_Perspective.png'
      },
      {
        name: 'Acacia',
        color: 'Acacia',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Acacia_Perspective.png'
      },
      {
        name: 'Clay',
        color: 'Clay',
        image: '/Montana-Mirrors/MONTANA LOOK MIRROR/Montana_Selection_LOOK_Clay_Perspective.png'
      }
    ]
  },
  {
    _id: 'montana-shelfie-mirror',
    name: 'Montana Shelfie Mirror',
    slug: { current: 'montana-shelfie-mirror' },
    description: 'Innovative Montana Shelfie mirror with integrated shelf, combining functionality with style. Available in multiple sophisticated colors.',
    price: 3290,
    brand: 'Montana',
    image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_135-Monarch.png',
    inStock: true,
    stock: 12,
    href: '/interior/bathroom/mirrors/montana-shelfie-mirror',
    categories: [{ title: 'Montana', slug: { current: 'montana' } }],
    variants: [
      {
        name: 'White',
        color: 'White',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_01-White_Perspective.png'
      },
      {
        name: 'New White',
        color: 'New White',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_101-New-White.png'
      },
      {
        name: 'Snow',
        color: 'Snow',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_38-Snow_Perspective.png'
      },
      {
        name: 'Fjord',
        color: 'Fjord',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_02-Fjord.png'
      },
      {
        name: 'Black',
        color: 'Black',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_05-Black.png'
      },
      {
        name: 'Anthracite',
        color: 'Anthracite',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_04-Anthracite.png'
      },
      {
        name: 'Nordic',
        color: 'Nordic',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mrror_09-Nordic.png'
      },
      {
        name: 'Coal',
        color: 'Coal',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_36-Coal_Perspective.png'
      },
      {
        name: 'Coffee',
        color: 'Coffee',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_35-Coffee_Perspective.png'
      },
      {
        name: 'Black Jade',
        color: 'Black Jade',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_163-Black-Jade_Perspective.png'
      },
      {
        name: 'Ruby',
        color: 'Ruby',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Ruby_Perspective.png'
      },
      {
        name: 'Amber',
        color: 'Amber',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_142-Amber_Perspective.png'
      },
      {
        name: 'Vanilla',
        color: 'Vanilla',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_150-Vanilla.png'
      },
      {
        name: 'Mushroom',
        color: 'Mushroom',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_137-Mushroom.png'
      },
      {
        name: 'Truffle',
        color: 'Truffle',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_141-Truffle_Perspective.png'
      },
      {
        name: 'Shadow',
        color: 'Shadow',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_147-Shadow_Perspective.png'
      },
      {
        name: 'Flint',
        color: 'Flint',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_148-Flint_Perspective.png'
      },
      {
        name: 'Graphic',
        color: 'Graphic',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_100-Graphic.png'
      },
      {
        name: 'Monarch',
        color: 'Monarch',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_135-Monarch.png'
      },
      {
        name: 'Pine',
        color: 'Pine',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_136-Pine_Perspective.png'
      },
      {
        name: 'Juniper',
        color: 'Juniper',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_138-Juniper_Perspective.png'
      },
      {
        name: 'Oregano',
        color: 'Oregano',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_139-Oregano_Perspective.png'
      },
      {
        name: 'Parsley',
        color: 'Parsley',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_152-Parsley.png'
      },
      {
        name: 'Pomelo',
        color: 'Pomelo',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_140-Pomelo_Perspective.png'
      },
      {
        name: 'Fennel',
        color: 'Fennel',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_144-Fennel_Perspective.png'
      },
      {
        name: 'Rosehip',
        color: 'Rosehip',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_145-Rosehip_Perspective.png'
      },
      {
        name: 'Rhubarb',
        color: 'Rhubarb',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_151-Rhubarb_Perspective.png'
      },
      {
        name: 'Hazelnut',
        color: 'Hazelnut',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_146-Hazelnut_Perspective.png'
      },
      {
        name: 'Azure',
        color: 'Azure',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_154-Azure_Perspective.png'
      },
      {
        name: 'Masala',
        color: 'Masala',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_155-Masala_Perspective.png'
      },
      {
        name: 'Oyster',
        color: 'Oyster',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_156-Oyster_Perspective.png'
      },
      {
        name: 'Cumin',
        color: 'Cumin',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_157-Cumin_Perspective.png'
      },
      {
        name: 'Oat',
        color: 'Oat',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_158-Oat_Perspective.png'
      },
      {
        name: 'Camomile',
        color: 'Camomile',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_159-Camomile_Perspective.png'
      },
      {
        name: 'Balsamic',
        color: 'Balsamic',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_160-Balsamic_Perspective.png'
      },
      {
        name: 'Mist',
        color: 'Mist',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_161-Mist_Perspective.png'
      },
      {
        name: 'Hokkaido',
        color: 'Hokkaido',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_162-Hokkaido_Perspective.png'
      },
      {
        name: 'Iris',
        color: 'Iris',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_164-Iris_Perspective.png'
      },
      {
        name: 'Beetroot',
        color: 'Beetroot',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Mirror_165-Beetroot_Perspective.png'
      },
      {
        name: 'Acacia',
        color: 'Acacia',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Acacia_Perspective.png'
      },
      {
        name: 'Clay',
        color: 'Clay',
        image: '/Montana-Mirrors/SHELFIE-MIRROR-MONTANA/Montana_Selection_SHELFIE_Clay_Perspective.png'
      }
    ]
  }
];
