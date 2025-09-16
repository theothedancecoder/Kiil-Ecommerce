import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

async function debugIndividualProducts() {
  console.log('🔍 Debugging individual Dux product queries...');
  
  const testSlugs = ['jetson-classic-soft-88', 'inter-dining-table', 'sam-dining-chair'];
  
  for (const slug of testSlugs) {
    console.log(`\n📦 Testing product: ${slug}`);
    
    // Query exactly like the getDuxProductBySlug function
    const query = `
      *[_type == "product" && slug.current == $slug && "dux" in categories[]->slug.current][0] {
        _id,
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

    try {
      const product = await client.fetch(query, { slug });
      
      if (product) {
        console.log(`✅ Found: ${product.name}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   Main image: ${product.image?.asset?.url ? '✅ YES' : '❌ NO'}`);
        if (product.image?.asset?.url) {
          console.log(`   Image URL: ${product.image.asset.url}`);
        }
        console.log(`   Variants: ${product.variants?.length || 0}`);
        if (product.variants?.length > 0) {
          const variantsWithImages = product.variants.filter(v => v.image?.asset?.url);
          console.log(`   Variants with images: ${variantsWithImages.length}`);
        }
        console.log(`   Lifestyle images: ${product.lifestyleImages?.length || 0}`);
        console.log(`   Related products: ${product.relatedProducts?.length || 0}`);
      } else {
        console.log('❌ Product not found');
        
        // Check if product exists with different criteria
        const allDuxQuery = `*[_type == "product" && slug.current == $slug] {
          _id,
          name,
          slug,
          categories[]->slug.current
        }`;
        
        const allMatches = await client.fetch(allDuxQuery, { slug });
        if (allMatches.length > 0) {
          console.log(`   Found ${allMatches.length} products with this slug:`);
          allMatches.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.name} (${p._id}) - Categories: ${p.categories?.join(', ')}`);
          });
        }
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  // Also check what Dux products exist
  console.log('\n📋 All Dux products in Sanity:');
  const allDuxQuery = `*[_type == "product" && "dux" in categories[]->slug.current] {
    _id,
    name,
    slug,
    image {
      asset-> {
        url
      }
    }
  }`;
  
  try {
    const allDux = await client.fetch(allDuxQuery);
    console.log(`Found ${allDux.length} Dux products:`);
    allDux.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} (${p.slug?.current}) - Image: ${p.image?.asset?.url ? '✅' : '❌'}`);
    });
  } catch (error) {
    console.log(`❌ Error fetching all Dux products: ${error.message}`);
  }
}

debugIndividualProducts().catch(console.error);
