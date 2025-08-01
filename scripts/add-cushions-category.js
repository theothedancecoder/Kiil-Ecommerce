const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function addCushionsCategory() {
  try {
    // First, create the cushions category
    const cushionsCategory = await client.create({
      _type: 'category',
      title: 'Cushions',
      slug: {
        _type: 'slug',
        current: 'cushions'
      },
      description: 'Designer cushions and pillows for home decoration'
    });

    console.log('✅ Created cushions category:', cushionsCategory._id);

    // Get the Designers Guild category ID
    const designersGuildCategory = await client.fetch(`
      *[_type == "category" && slug.current == "designers-guild"][0] {
        _id,
        title
      }
    `);

    console.log('Found Designers Guild category:', designersGuildCategory._id);

    // Create cushion products based on the images we found
    const cushionProducts = [
      {
        name: 'Varese Cerulean & Sky Velvet Throw Pillow',
        slug: 'varese-cerulean-sky-velvet-throw-pillow',
        description: 'Luxurious velvet throw pillow in beautiful cerulean and sky blue tones from Designers Guild.',
        price: 1390,
        brand: 'Designers Guild',
        image: '/Designers-Guild/cushions/Varese-Cerulean-&-Sky-Velvet-Throw-Pillow/Varese Cerulean & Sky Velvet Throw Pillow 43×43 NOK  1,190.webp'
      },
      {
        name: 'Valetta Peacock Cushion',
        slug: 'valetta-peacock-cushion',
        description: 'Stunning peacock-themed decorative cushion with rich colors and intricate patterns.',
        price: 1390,
        brand: 'Designers Guild',
        image: '/Designers Guild- Valetta Peacock cushion/Valetta Peacock cushion 60×45 fra Designers Guild kr 1 390.00.jpg'
      },
      {
        name: 'Bengal Bird Marais Cushion',
        slug: 'bengal-bird-marais-cushion',
        description: 'Exotic bird-themed cushion with beautiful marais colorway from Designers Guild.',
        price: 1290,
        brand: 'Designers Guild',
        image: '/Designers-Guild/cushions/Bengal-Bird-Marais-Cushion/'
      },
      {
        name: 'Velluto Emerald Velvet Cushion',
        slug: 'velluto-emerald-velvet-cushion',
        description: 'Rich emerald green velvet cushion that adds luxury and comfort to any space.',
        price: 1490,
        brand: 'Designers Guild',
        image: '/Designers-Guild/cushions/Velluto-Emerald-Velvet-Cushion/'
      },
      {
        name: 'Shanghai Garden Ecru Linen Cushion',
        slug: 'shanghai-garden-ecru-linen-cushion',
        description: 'Elegant linen cushion with Shanghai garden motifs in sophisticated ecru tone.',
        price: 1190,
        brand: 'Designers Guild',
        image: '/Designers-Guild/cushions/Shanghai-Garden-Ecru-Linen-Cushion/'
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
        brand: cushion.brand,
        image: cushion.image,
        categories: [
          { _type: 'reference', _ref: cushionsCategory._id },
          { _type: 'reference', _ref: designersGuildCategory._id }
        ],
        inStock: true,
        stock: Math.floor(Math.random() * 20) + 5, // Random stock between 5-25
        href: `/interior/home-accessories/cushions/${cushion.slug}`
      });

      console.log(`✅ Created cushion product: ${cushion.name} (${product._id})`);
    }

    console.log('\n🎉 Successfully added cushions category and products!');
    console.log('You can now visit: http://localhost:3000/interior/home-accessories/cushions');

  } catch (error) {
    console.error('❌ Error adding cushions:', error);
  }
}

addCushionsCategory();
