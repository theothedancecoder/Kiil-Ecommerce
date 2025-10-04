import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hi84i3u4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function testSibastData() {
  console.log('🔍 Testing Sibast data flow in production...\n');
  
  try {
    // Get all products
    const allProducts = await client.fetch(`
      *[_type == "product" && (brand == "Sibast" || brand == "Sibast Furniture")] {
        _id,
        name,
        slug,
        brand,
        price,
        "image": image.asset->url,
        variants[] {
          name,
          material,
          "image": image.asset->url,
          price
        }
      }
    `);
    
    console.log(`Found ${allProducts.length} Sibast products\n`);
    
    // Find No.7 Dining Chair
    const no7Chair = allProducts.find(p => p.slug?.current === 'no-7-dining-chair');
    
    if (no7Chair) {
      console.log('✅ No.7 Dining Chair found!');
      console.log('Name:', no7Chair.name);
      console.log('Slug:', no7Chair.slug?.current);
      console.log('Main Image:', no7Chair.image);
      console.log('\nVariants:');
      no7Chair.variants?.forEach((v, i) => {
        console.log(`  ${i + 1}. ${v.name || v.material}`);
        console.log(`     Image: ${v.image}`);
      });
    } else {
      console.log('❌ No.7 Dining Chair NOT found');
      console.log('\nAvailable products:');
      allProducts.forEach(p => {
        console.log(`  - ${p.name} (slug: ${p.slug?.current})`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testSibastData();
