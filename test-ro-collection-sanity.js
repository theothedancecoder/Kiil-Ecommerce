const { createClient } = require('next-sanity');

// Load environment variables
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13',
  useCdn: false,
});

async function testRoCollectionData() {
  try {
    console.log('Testing RO Collection products in Sanity...\n');
    
    const query = `
      *[_type == "product" && "ro-collection" in categories[]->slug.current] {
        _id,
        name,
        slug,
        subcategory,
        image {
          asset-> {
            _id,
            url
          }
        },
        categories[]-> {
          title,
          slug
        }
      }
    `;
    
    const products = await client.fetch(query);
    
    console.log(`Found ${products.length} RO Collection products:`);
    
    products.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name || 'Unnamed'}`);
      console.log(`   Slug: ${product.slug?.current || 'No slug'}`);
      console.log(`   Subcategory: ${product.subcategory || 'No subcategory'}`);
      console.log(`   Image: ${product.image?.asset?.url ? 'Has image URL' : 'NO IMAGE'}`);
      if (product.image?.asset?.url) {
        console.log(`   Image URL: ${product.image.asset.url}`);
      }
      console.log(`   Categories: ${product.categories?.map(c => c.title).join(', ') || 'None'}`);
    });
    
  } catch (error) {
    console.error('Error fetching RO Collection data:', error);
  }
}

testRoCollectionData();
