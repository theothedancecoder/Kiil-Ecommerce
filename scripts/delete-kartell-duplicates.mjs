import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function deleteKartellDuplicates() {
  console.log('Finding and deleting Kartell duplicate products without images...\n');
  
  // Get all Kartell products
  const products = await client.fetch(`
    *[_type == "product" && brand == "Kartell"] | order(name asc) {
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
  
  // Group by slug to find duplicates
  const slugGroups = {};
  products.forEach(product => {
    const slug = product.slug?.current;
    if (slug) {
      if (!slugGroups[slug]) {
        slugGroups[slug] = [];
      }
      slugGroups[slug].push(product);
    }
  });
  
  let deletedCount = 0;
  
  // Find duplicates and delete the ones without images
  for (const [slug, group] of Object.entries(slugGroups)) {
    if (group.length > 1) {
      console.log(`\nFound ${group.length} products with slug "${slug}":`);
      
      // Keep the one WITH image, delete the one WITHOUT
      const withImage = group.find(p => p.image?.asset?.url);
      const withoutImage = group.find(p => !p.image?.asset?.url);
      
      if (withImage && withoutImage) {
        console.log(`  ✓ Keeping: ${withImage.name} (has image)`);
        console.log(`  ✗ Deleting: ${withoutImage.name} (no image) - ID: ${withoutImage._id}`);
        
        try {
          await client.delete(withoutImage._id);
          console.log(`  ✅ Deleted successfully`);
          deletedCount++;
        } catch (error) {
          console.error(`  ❌ Error deleting:`, error.message);
        }
      }
    }
  }
  
  console.log(`\n✅ Duplicate cleanup complete! Deleted ${deletedCount} duplicate products.`);
}

deleteKartellDuplicates().catch(console.error);
