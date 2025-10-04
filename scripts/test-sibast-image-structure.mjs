import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hi84i3u4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function testImageStructure() {
  console.log('🔍 Testing Sibast image structure from getAllProducts query...\n');
  
  const ALL_PRODUCTS_QUERY = `*[_type == "product" && slug.current == "no-7-dining-chair"][0] {
    _id,
    name,
    slug,
    image {
      _type,
      asset-> {
        _id,
        _type,
        url
      },
      alt
    },
    variants[0..2] {
      _key,
      name,
      image {
        _type,
        asset-> {
          _id,
          _type,
          url
        },
        alt
      },
      material,
      price
    }
  }`;
  
  try {
    const product = await client.fetch(ALL_PRODUCTS_QUERY);
    
    console.log('Product:', product.name);
    console.log('\n📸 Main Image Structure:');
    console.log(JSON.stringify(product.image, null, 2));
    console.log('\nAccessing as image.asset.url:', product.image?.asset?.url);
    
    console.log('\n📸 First Variant Image Structure:');
    console.log(JSON.stringify(product.variants?.[0]?.image, null, 2));
    console.log('\nAccessing as variants[0].image.asset.url:', product.variants?.[0]?.image?.asset?.url);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testImageStructure();
