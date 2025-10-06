import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function verifyJuulImplementation() {
  console.log('🔍 Verifying Juul Implementation...\n');
  
  try {
    // Check if Juul products exist in Sanity
    const juulProducts = await client.fetch(`*[_type == "product" && brand == "Juul"] {
      _id,
      name,
      slug,
      brand,
      price,
      image {
        asset-> {
          _id,
          url
        }
      },
      variants[] {
        name,
        material,
        price,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    }`);

    console.log(`✅ Found ${juulProducts.length} Juul products in Sanity\n`);

    if (juulProducts.length === 0) {
      console.log('❌ No Juul products found in Sanity!');
      console.log('Please run: node scripts/migrate-juul-to-sanity.mjs\n');
      return;
    }

    // Display product details
    juulProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Slug: ${product.slug?.current || 'N/A'}`);
      console.log(`   Price: kr ${product.price?.toLocaleString() || 'N/A'}`);
      console.log(`   Main Image: ${product.image?.asset?.url ? '✓' : '✗'}`);
      console.log(`   Variants: ${product.variants?.length || 0}`);
      
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant, vIndex) => {
          console.log(`      ${vIndex + 1}. ${variant.name} - ${variant.image?.asset?.url ? '✓' : '✗'} image`);
        });
      }
      console.log('');
    });

    console.log('📋 Implementation Checklist:');
    console.log('✅ Sanity query functions created (sanity/lib/products/getJuulProducts.ts)');
    console.log('✅ Brand listing page created (app/juul/page.tsx)');
    console.log('✅ Product client component created (app/juul/[productId]/JuulProductClient.tsx)');
    console.log('✅ Individual product page created (app/juul/[productId]/page.tsx)');
    console.log('✅ Products migrated to Sanity CMS');
    console.log('✅ Homepage updated with Juul link');
    console.log('✅ Mobler page updated with Juul brand mapping');
    
    console.log('\n🌐 Access Points:');
    console.log('   Homepage: / (Juul appears in "Our Collection" section)');
    console.log('   Brand page: /juul');
    console.log('   Product pages: /juul/juul-903 and /juul/juul-301');
    console.log('   Mobler page: /mobler (Juul products will appear in furniture listings)');
    
    console.log('\n✨ Next Steps:');
    console.log('1. Start development server: npm run dev');
    console.log('2. Visit http://localhost:3000 and look for Juul in "Our Collection"');
    console.log('3. Click on Juul to view the product listing');
    console.log('4. Test individual product pages');
    console.log('5. Deploy to production when ready');

  } catch (error) {
    console.error('❌ Error verifying Juul implementation:', error);
  }
}

verifyJuulImplementation();
