const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'hi84i3u4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function fixAbloBlomaertBrand() {
  try {
    console.log('🔍 Searching for Ablo Blommaert products...');
    
    // Find all products that contain "Vogue" in the name (Ablo Blommaert products)
    const products = await client.fetch(`
      *[_type == "product" && name match "*Vogue*"] {
        _id,
        name,
        brand,
        slug
      }
    `);

    console.log(`📦 Found ${products.length} Vogue products:`);
    products.forEach(product => {
      console.log(`  - ${product.name} (Brand: ${product.brand || 'undefined'})`);
    });

    if (products.length === 0) {
      console.log('❌ No Vogue products found');
      return;
    }

    console.log('\n🔧 Updating brand to "Ablo Blommaert"...');

    // Update each product's brand to "Ablo Blommaert"
    const updatePromises = products.map(product => {
      return client
        .patch(product._id)
        .set({ brand: 'Ablo Blommaert' })
        .commit();
    });

    await Promise.all(updatePromises);

    console.log('✅ Successfully updated all Ablo Blommaert product brands!');
    
    // Verify the changes
    console.log('\n🔍 Verifying changes...');
    const updatedProducts = await client.fetch(`
      *[_type == "product" && name match "*Vogue*"] {
        _id,
        name,
        brand,
        slug
      }
    `);

    updatedProducts.forEach(product => {
      console.log(`  ✓ ${product.name} - Brand: ${product.brand}`);
    });

  } catch (error) {
    console.error('❌ Error updating Ablo Blommaert brands:', error);
  }
}

fixAbloBlomaertBrand();
