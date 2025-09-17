import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function debugProductionEnvironment() {
  console.log('🔍 Debugging production environment and Sanity client...');
  
  // Check environment variables
  console.log('\n🔧 Environment Variables:');
  console.log(`   NEXT_PUBLIC_SANITY_PROJECT_ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`   NEXT_PUBLIC_SANITY_DATASET: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);
  console.log(`   SANITY_API_TOKEN: ${process.env.SANITY_API_TOKEN ? 'SET' : 'NOT SET'}`);
  console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
  
  // Test different client configurations
  const configs = [
    {
      name: 'Development Config (useCdn: false)',
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
        apiVersion: '2023-05-03',
      }
    },
    {
      name: 'Production Config (useCdn: true)',
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: true,
        token: process.env.SANITY_API_TOKEN,
        apiVersion: '2023-05-03',
      }
    },
    {
      name: 'No Token Config',
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        useCdn: true,
        apiVersion: '2023-05-03',
      }
    }
  ];
  
  for (const { name, config } of configs) {
    console.log(`\n📡 Testing: ${name}`);
    
    try {
      const client = createClient(config);
      
      // Test basic query
      const product = await client.fetch(`
        *[_type == "product" && slug.current == "jetson-classic-soft-88" && "dux" in categories[]->slug.current][0] {
          _id,
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      `);
      
      if (product) {
        console.log(`   ✅ Query successful: ${product.name}`);
        console.log(`   📸 Image URL: ${product.image?.asset?.url || 'NO URL'}`);
        
        // Test if URL is accessible
        if (product.image?.asset?.url) {
          try {
            const response = await fetch(product.image.asset.url, { method: 'HEAD' });
            console.log(`   🌐 URL Status: ${response.status} ${response.statusText}`);
          } catch (fetchError) {
            console.log(`   ❌ URL Fetch Error: ${fetchError.message}`);
          }
        }
      } else {
        console.log(`   ❌ No product found`);
      }
      
    } catch (error) {
      console.log(`   ❌ Client Error: ${error.message}`);
    }
  }
  
  // Test the exact same query that the frontend uses
  console.log('\n🎯 Testing Frontend Query (exact match):');
  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
      apiVersion: '2023-05-03',
    });
    
    // This is the exact query from getDuxProducts.ts
    const product = await client.fetch(`
      *[_type == "product" && slug.current == $slug && "dux" in categories[]->slug.current][0] {
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
    `, { slug: 'jetson-classic-soft-88' });
    
    if (product) {
      console.log(`   ✅ Frontend Query Success: ${product.name}`);
      console.log(`   📸 Main Image: ${product.image?.asset?.url ? 'PRESENT' : 'MISSING'}`);
      console.log(`   🔄 Variants: ${product.variants?.length || 0}`);
      console.log(`   🎨 Lifestyle Images: ${product.lifestyleImages?.length || 0}`);
      
      // Check first variant
      if (product.variants && product.variants[0]) {
        const variant = product.variants[0];
        console.log(`   🔍 First Variant: ${variant.name}`);
        console.log(`   📸 Variant Image: ${variant.image?.asset?.url ? 'PRESENT' : 'MISSING'}`);
      }
    } else {
      console.log(`   ❌ Frontend Query Failed: No product found`);
    }
    
  } catch (error) {
    console.log(`   ❌ Frontend Query Error: ${error.message}`);
  }
}

debugProductionEnvironment();
