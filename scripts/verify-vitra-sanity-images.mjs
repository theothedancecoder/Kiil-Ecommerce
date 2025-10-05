import { config } from 'dotenv';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function verifyVitraImages() {
  console.log('\n🔍 Verifying Vitra products in Sanity...\n');
  
  const products = await client.fetch(`
    *[_type == "product" && brand == "Vitra"] | order(name asc) {
      _id,
      name,
      slug,
      price,
      image {
        asset-> {
          _id,
          url
        }
      },
      variants[] {
        _key,
        name,
        price,
        color,
        material,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    }
  `);

  console.log(`✅ Found ${products.length} Vitra products\n`);

  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   Slug: ${product.slug?.current}`);
    console.log(`   Price: kr ${product.price?.toLocaleString()}`);
    console.log(`   Main Image: ${product.image?.asset?.url ? '✅ ' + product.image.asset.url.substring(0, 60) + '...' : '❌ MISSING'}`);
    console.log(`   Variants: ${product.variants?.length || 0}`);
    
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant, vIndex) => {
        const imageStatus = variant.image?.asset?.url ? '✅' : '❌';
        console.log(`     ${vIndex + 1}. ${variant.name} - ${imageStatus} ${variant.image?.asset?.url ? variant.image.asset.url.substring(0, 50) + '...' : 'NO IMAGE'}`);
      });
    }
    console.log('');
  });

  // Check if all images are Sanity CDN URLs
  const allImagesFromSanity = products.every(p => 
    p.image?.asset?.url?.includes('cdn.sanity.io') &&
    p.variants?.every(v => v.image?.asset?.url?.includes('cdn.sanity.io'))
  );

  if (allImagesFromSanity) {
    console.log('✅ ALL IMAGES ARE FROM SANITY CDN\n');
  } else {
    console.log('⚠️  Some images may not be from Sanity CDN\n');
  }
}

verifyVitraImages();
