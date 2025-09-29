import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13',
});

async function debugLouisPoulsenSlugs() {
  try {
    console.log('🔍 Debugging Louis Poulsen product slugs and links...');
    
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] | order(name asc) {
        _id,
        name,
        slug,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    `);
    
    console.log(`📊 Found ${products.length} Louis Poulsen products in Sanity\n`);
    
    console.log('🔗 Product Links Analysis:');
    console.log('='.repeat(80));
    
    products.forEach((product, index) => {
      const slug = product.slug?.current;
      const hasImage = !!product.image?.asset?.url;
      const expectedUrl = slug ? `/louis-poulsen/${slug}` : 'NO SLUG - BROKEN LINK';
      
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Slug: ${slug || 'MISSING'}`);
      console.log(`   URL: ${expectedUrl}`);
      console.log(`   Image: ${hasImage ? '✅' : '❌'}`);
      console.log(`   Status: ${slug ? (hasImage ? '✅ WORKING' : '⚠️  NO IMAGE') : '❌ BROKEN LINK'}`);
      console.log('');
    });
    
    // Check specifically for AJ Floor variants
    console.log('\n🎯 AJ Floor Products Analysis:');
    console.log('='.repeat(50));
    
    const ajFloorProducts = products.filter(p => 
      p.name?.toLowerCase().includes('aj floor')
    );
    
    ajFloorProducts.forEach(product => {
      console.log(`📦 ${product.name}`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Slug: ${product.slug?.current || 'MISSING'}`);
      console.log(`   Image: ${product.image?.asset?.url ? '✅' : '❌'}`);
      console.log('');
    });
    
    // Summary
    const withSlugs = products.filter(p => p.slug?.current).length;
    const withImages = products.filter(p => p.image?.asset?.url).length;
    const workingProducts = products.filter(p => p.slug?.current && p.image?.asset?.url).length;
    
    console.log('\n📈 Summary:');
    console.log(`Total products: ${products.length}`);
    console.log(`With slugs: ${withSlugs}/${products.length}`);
    console.log(`With images: ${withImages}/${products.length}`);
    console.log(`Fully working: ${workingProducts}/${products.length}`);
    
  } catch (error) {
    console.error('❌ Error debugging slugs:', error.message);
  }
}

debugLouisPoulsenSlugs();
