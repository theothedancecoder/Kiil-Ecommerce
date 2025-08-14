const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-13',
  useCdn: false,
});

async function checkFritzHansenImagesAfterFix() {
  try {
    const products = await client.fetch(`*[_type == 'product' && brand == 'Fritz Hansen'] {
      _id,
      name,
      'imageCount': count(images),
      'hasImages': count(images) > 0
    } | order(name)`);
    
    const withImages = products.filter(p => p.hasImages).length;
    const withoutImages = products.filter(p => !p.hasImages).length;
    
    console.log('Fritz Hansen products image status after fix:');
    console.log(`✅ Products with images: ${withImages}`);
    console.log(`❌ Products without images: ${withoutImages}`);
    console.log(`📊 Total products: ${products.length}`);
    
    if (withoutImages > 0) {
      console.log('\nProducts still missing images:');
      products.filter(p => !p.hasImages).forEach(p => {
        console.log(`- ${p.name}`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkFritzHansenImagesAfterFix();
