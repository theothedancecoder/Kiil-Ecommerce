import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function addNorwegianDescription() {
  try {
    console.log('Fetching Umage products...');
    
    // Get the "A Conversation Piece Dining Chair" product
    const products = await client.fetch(`
      *[_type == "product" && brand == "UMAGE" && name match "*Conversation*"][0...5] {
        _id,
        name,
        description,
        descriptionNo
      }
    `);

    console.log(`Found ${products.length} Umage products`);
    
    if (products.length === 0) {
      console.log('No Umage products found');
      return;
    }

    // Add Norwegian description to the first product as a test
    const testProduct = products[0];
    console.log(`\nUpdating product: ${testProduct.name}`);
    console.log(`Current English description: ${testProduct.description}`);
    console.log(`Current Norwegian description: ${testProduct.descriptionNo || 'None'}`);

    const norwegianDescription = "Elegant spisestol med premium polstring og solid trekonstruksjon. Tilgjengelig i flere trefinisher og stoffalternativer.";

    const result = await client
      .patch(testProduct._id)
      .set({ descriptionNo: norwegianDescription })
      .commit();

    console.log(`\n✅ Successfully added Norwegian description to: ${testProduct.name}`);
    console.log(`Norwegian description: ${norwegianDescription}`);
    console.log(`\nProduct ID: ${testProduct._id}`);
    console.log(`\nNow test by:`);
    console.log(`1. Navigate to the product page`);
    console.log(`2. Toggle language to Norwegian`);
    console.log(`3. The description should now translate!`);

  } catch (error) {
    console.error('Error adding Norwegian description:', error);
  }
}

addNorwegianDescription();
