import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Use the exact same client configuration as the frontend
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  // Disable CDN to ensure fresh data with variants
  useCdn: false,
  // Add perspective for better data consistency
  perspective: 'published',
});

async function testFrontendClient() {
  console.log('🧪 Testing with exact frontend client configuration...\n');
  
  try {
    // Use the exact same query as getDuxProducts
    const query = `
      *[_type == "product" && "dux" in categories[]->slug.current] | order(name asc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        slug,
        description,
        price,
        brand,
        image {
          asset-> {
            _id,
            url
          }
        },
        lifestyleImages[] {
          asset-> {
            _id,
            url
          }
        },
        categories[]-> {
          _id,
          title,
          slug
        },
        variants[] {
          _type,
          name,
          price,
          material,
          color,
          size,
          base,
          leather,
          image {
            asset-> {
              _id,
              url
            }
          }
        },
        stock,
        inStock,
        href,
        roomCategory,
        subcategory,
        designer,
        features,
        specifications[] {
          label,
          value
        },
        relatedProducts[]-> {
          _id,
          name,
          slug,
          price,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `;

    console.log('📡 Fetching Dux products with frontend client...');
    const products = await client.fetch(query);
    
    console.log(`📊 Found ${products.length} products\n`);
    
    for (const product of products) {
      console.log(`📦 ${product.name} (${product.slug?.current})`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Price: kr ${product.price?.toLocaleString() || 'N/A'}`);
      
      // Check main image
      const hasMainImage = !!product.image?.asset?.url;
      console.log(`   Main Image: ${hasMainImage ? '✅ YES' : '❌ NO'}`);
      if (hasMainImage) {
        console.log(`   Image URL: ${product.image.asset.url.substring(0, 80)}...`);
      }
      
      // Check variants
      const variantCount = product.variants?.length || 0;
      console.log(`   Variants: ${variantCount}`);
      if (variantCount > 0) {
        let variantsWithImages = 0;
        for (const variant of product.variants) {
          if (variant.image?.asset?.url) {
            variantsWithImages++;
          }
        }
        console.log(`   Variants with images: ${variantsWithImages}/${variantCount}`);
      }
      
      // Check lifestyle images
      const lifestyleCount = product.lifestyleImages?.length || 0;
      console.log(`   Lifestyle images: ${lifestyleCount}`);
      
      // Check related products
      const relatedCount = product.relatedProducts?.length || 0;
      console.log(`   Related products: ${relatedCount}`);
      
      console.log(''); // Empty line
    }
    
    // Focus on the problematic products
    const problematicSlugs = ['lunaria-table', 'sam-dining-chair', 'superspider-sheepskin'];
    console.log('🔍 DETAILED CHECK OF PROBLEMATIC PRODUCTS:\n');
    
    for (const slug of problematicSlugs) {
      const product = products.find(p => p.slug?.current === slug);
      if (product) {
        console.log(`📦 ${product.name}:`);
        console.log(`   Raw image data:`, JSON.stringify(product.image, null, 2));
        console.log(`   Raw variants data:`, JSON.stringify(product.variants, null, 2));
      } else {
        console.log(`❌ Product ${slug} not found in results`);
      }
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testFrontendClient();
