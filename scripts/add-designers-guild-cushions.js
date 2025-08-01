const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function addDesignersGuildCushions() {
  try {
    // Get the Designers Guild category ID
    const designersGuildCategory = await client.fetch(`
      *[_type == "category" && slug.current == "designers-guild"][0] {
        _id,
        title
      }
    `);

    if (!designersGuildCategory) {
      console.error('Designers Guild category not found');
      return;
    }

    console.log('Found Designers Guild category:', designersGuildCategory._id);

    // Define all cushion products based on the folder structure
    const cushionProducts = [
      {
        name: 'Bengal Bird Marais Cushion',
        slug: 'bengal-bird-marais-cushion',
        description: 'Exotic Bengal Bird design cushion in beautiful Marais colorway from Designers Guild.',
        price: 1590,
        image: '/Designers-Guild/cushions/Bengal-Bird-Marais-Cushion/Bengal Bird Marais Cushion NOK  1,590.webp'
      },
      {
        name: 'Parrot And Palm Parchment Cushion',
        slug: 'parrot-and-palm-parchment-cushion',
        description: 'John Derian for Designers Guild - Parrot and Palm design in parchment, 50×50cm.',
        price: 1790,
        image: '/Designers-Guild/cushions/Parrot-And-Palm-Parchment-Cushion/Parrot And Palm Parchment Cushion 50×50 - John Derian for Designers Guild NOK  1,790.webp'
      },
      {
        name: 'Perzina Grass Cushion',
        slug: 'perzina-grass-cushion',
        description: 'Natural grass-inspired Perzina cushion from Designers Guild.',
        price: 1400,
        image: '/Designers-Guild/cushions/Perzina-Grass-Cushion/Perzina Grass Cushion NOK  1,400.webp'
      },
      {
        name: 'Polwarth Chalk Cushion',
        slug: 'polwarth-chalk-cushion',
        description: 'Elegant Polwarth cushion in sophisticated chalk colorway.',
        price: 1500,
        image: '/Designers-Guild/cushions/Polwarth-Chalk-cushion/Polwarth Chalk cushion Designers Guild NOK  1,500.jpg'
      },
      {
        name: 'Raku Patchwork Emerald Velvet Cushion',
        slug: 'raku-patchwork-emerald-velvet-cushion',
        description: 'Luxurious emerald velvet cushion with Raku patchwork design, 50×50cm.',
        price: 2050,
        image: '/Designers-Guild/cushions/Raku-Patchwork-Emerald-Velvet-Cushion/Raku Patchwork Emerald Velvet Cushion, 50×50 NOK  2,050.webp'
      },
      {
        name: 'Rose De Damas Embroidered Cranberry Cushion',
        slug: 'rose-de-damas-embroidered-cranberry-cushion',
        description: 'Exquisite embroidered Rose De Damas cushion in cranberry, 60×45cm.',
        price: 2490,
        image: '/Designers-Guild/cushions/Rose-De-Damas-Embroidered-Cranberry-Cushion/Rose De Damas Embroidered Cranberry Cushion, 60x45cm NOK  2,490  Rose De Damas Embroidered Cranberry Cushion, 60x45cm .jpeg'
      },
      {
        name: 'Sakiori Ocher Boucle Cushion',
        slug: 'sakiori-ocher-boucle-cushion',
        description: 'Textured boucle cushion in warm ocher tone, 60×30cm.',
        price: 1590,
        image: '/Designers-Guild/cushions/Sakiori-Ocher-Boucle-Cushion/Sakiori Ocher Boucle Cushion 60×30 NOK  1,590.jpg'
      },
      {
        name: 'Sanzai Persimmon Velvet Cushion',
        slug: 'sanzai-persimmon-velvet-cushion',
        description: 'Rich persimmon velvet cushion with Sanzai design, 60×45cm.',
        price: 2350,
        image: '/Designers-Guild/cushions/Sanzai-Persimmon-Velvet-Cushion/Sanzai Persimmon Velvet Cushion 60×45 NOK  2,350  Sold out, but can be ordered.webp'
      },
      {
        name: 'Shanghai Garden Ecru Linen Cushion',
        slug: 'shanghai-garden-ecru-linen-cushion',
        description: 'Elegant linen cushion with Shanghai garden motifs in sophisticated ecru, 60×60cm.',
        price: 1550,
        image: '/Designers-Guild/cushions/Shanghai-Garden-Ecru-Linen-Cushion/Shanghai Garden Ecru Linen Cushion 60×60 NOK  1,550.jpg'
      },
      {
        name: 'Suffolk Garden Birch Cushion',
        slug: 'suffolk-garden-birch-cushion',
        description: 'Beautiful Suffolk Garden design in birch colorway.',
        price: 1240,
        image: '/Designers-Guild/cushions/Suffolk-Garden-Birch-Cushion/Suffolk Garden Birch Cushion NOK  1,240.webp'
      },
      {
        name: 'Surrearles\'isme Mosaique Cushion',
        slug: 'surrearlesisme-mosaique-cushion',
        description: 'Christian Lacroix for Designers Guild - Surrealist mosaic design cushion, 60×45cm.',
        price: 1890,
        image: '/Designers-Guild/cushions/Surrearles\'isme- Mosaique Cushion /: Designers Guild Surrearles\'isme Mosaique Cushion 60×45 – Christian Lacroix for Designers Guild NOK  1,890.webp'
      },
      {
        name: 'Tokusa Sepia Embroidered Cushion',
        slug: 'tokusa-sepia-embroidered-cushion',
        description: 'Delicate embroidered Tokusa design in sepia tones, 40×30cm.',
        price: 1290,
        image: '/Designers-Guild/cushions/Tokusa-Sepia-Embroidered-Cushion/Tokusa Sepia Embroidered Cushion 40×30 NOK  1,290  .webp'
      },
      {
        name: 'Valetta Peacock Cushion',
        slug: 'valetta-peacock-cushion',
        description: 'Stunning peacock-themed decorative cushion, 60×45cm.',
        price: 1390,
        image: '/Designers-Guild/cushions/Valetta-Peacock-cushion/Valetta Peacock cushion 60×45 from Designers Guild NOK  1,390.jpg'
      },
      {
        name: 'Vallarta Flamingo Pillow',
        slug: 'vallarta-flamingo-pillow',
        description: 'Tropical flamingo design pillow from the Vallarta collection.',
        price: 1300,
        image: '/Designers-Guild/cushions/Vallarta-Flamingo-pillow/Vallarta Flamingo pillow NOK  1,300  Vallarta Flamingo pillow .webp'
      },
      {
        name: 'Varese Cerulean & Sky Velvet Throw Pillow',
        slug: 'varese-cerulean-sky-velvet-throw-pillow',
        description: 'Luxurious velvet throw pillow in cerulean and sky blue tones, 43×43cm.',
        price: 1190,
        image: '/Designers-Guild/cushions/Varese-Cerulean-&-Sky-Velvet-Throw-Pillow/Varese Cerulean & Sky Velvet Throw Pillow 43×43 NOK  1,190.webp'
      },
      {
        name: 'Varese Lime Velvet Cushion',
        slug: 'varese-lime-velvet-cushion',
        description: 'Vibrant lime green velvet cushion from the Varese collection.',
        price: 1100,
        image: '/Designers-Guild/cushions/VARESE-LIME-VELVET-CUSHION/VARESE LIME VELVET CUSHION NOK  1,100  Sold out, but can be ordered  VARESE LIME VELVET CUSHION.webp'
      },
      {
        name: 'Velluto Emerald Velvet Cushion',
        slug: 'velluto-emerald-velvet-cushion',
        description: 'Rich emerald green velvet cushion, 50×50cm.',
        price: 1150,
        image: '/Designers-Guild/cushions/Velluto-Emerald-Velvet-Cushion/Velluto Emerald Velvet Cushion 50×50 NOK  1,150.webp'
      }
    ];

    // Create each cushion product
    for (const cushion of cushionProducts) {
      const product = await client.create({
        _type: 'product',
        name: cushion.name,
        slug: {
          _type: 'slug',
          current: cushion.slug
        },
        description: cushion.description,
        price: cushion.price,
        brand: 'Designers Guild',
        image: cushion.image,
        categories: [
          { _type: 'reference', _ref: designersGuildCategory._id }
        ],
        inStock: true,
        stock: Math.floor(Math.random() * 15) + 5, // Random stock between 5-20
        href: `/interior/home-accessories/cushions/${cushion.slug}`
      });

      console.log(`✅ Created cushion product: ${cushion.name} (${product._id})`);
    }

    console.log(`\n🎉 Successfully added ${cushionProducts.length} cushion products!`);
    console.log('You can now visit: http://localhost:3000/interior/home-accessories/cushions');

  } catch (error) {
    console.error('❌ Error adding cushions:', error);
  }
}

addDesignersGuildCushions();
