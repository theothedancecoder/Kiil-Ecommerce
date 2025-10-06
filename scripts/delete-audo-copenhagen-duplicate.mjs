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

async function deleteDuplicate() {
  console.log('🗑️  Deleting duplicate Audo Copenhagen product...\n');

  try {
    // Delete the duplicate product without images
    const duplicateId = 'product-audo-copenhagen-interconnect-candlestick';
    
    const result = await client.delete(duplicateId);
    console.log(`✅ Successfully deleted duplicate product: ${duplicateId}`);
    console.log(`   Result:`, result);
    
    console.log('\n✨ Cleanup complete!');
    console.log('   Remaining product: audo-copenhagen-interconnect-candlestick (with images)');
  } catch (error) {
    console.error('❌ Error deleting duplicate:', error.message);
  }
}

deleteDuplicate();
