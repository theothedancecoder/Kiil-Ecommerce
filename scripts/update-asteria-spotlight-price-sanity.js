const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hi84i3u4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-01-13',
});

async function updateAsteriaSpotlightPrice() {
  try {
    console.log('🔍 Looking for Asteria Spotlight product in Sanity...');
    
    // Find the Asteria Spotlight product
    const asteriaProducts = await client.fetch(`
      *[_type == "product" && (name match "*Asteria*" && name match "*Spotlight*")] {
        _id,
        name,
        price,
        slug
      }
    `);
    
    console.log(`Found ${asteriaProducts.length} Asteria Spotlight products:`, asteriaProducts);
    
    if (asteriaProducts.length === 0) {
      console.log('❌ No Asteria Spotlight products found in Sanity');
      console.log('🔍 Let me search for any Asteria products...');
      
      const allAsteriaProducts = await client.fetch(`
        *[_type == "product" && name match "*Asteria*"] {
          _id,
          name,
          price,
          slug
        }
      `);
      
      console.log(`Found ${allAsteriaProducts.length} Asteria products:`, allAsteriaProducts);
      
      if (allAsteriaProducts.length === 0) {
        console.log('❌ No Asteria products found at all in Sanity');
        return;
      }
      
      // Update all Asteria products to 2099
      for (const product of allAsteriaProducts) {
        console.log(`📝 Updating price for ${product.name} (ID: ${product._id})`);
        console.log(`   Current price: ${product.price}`);
        
        const result = await client
          .patch(product._id)
          .set({ price: 2099 })
          .commit();
        
        console.log(`✅ Updated ${product.name} price to 2099`);
      }
      
      return;
    }
    
    // Update each Asteria Spotlight product
    for (const product of asteriaProducts) {
      console.log(`📝 Updating price for ${product.name} (ID: ${product._id})`);
      console.log(`   Current price: ${product.price}`);
      
      const result = await client
        .patch(product._id)
        .set({ price: 2099 })
        .commit();
      
      console.log(`✅ Updated ${product.name} price to 2099`);
    }
    
    console.log('🎉 Successfully updated Asteria Spotlight price in Sanity!');
    
  } catch (error) {
    console.error('❌ Error updating Asteria Spotlight price:', error);
    
    if (error.message.includes('Insufficient permissions')) {
      console.log('💡 Make sure SANITY_API_TOKEN is set in your .env.local file with write permissions');
    }
  }
}

updateAsteriaSpotlightPrice();
