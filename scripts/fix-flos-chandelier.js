require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function fixChandelierProduct() {
  try {
    console.log('🔍 Checking 2097/30 Chandelier product in Sanity...');
    
    const product = await client.fetch(`*[_type == "product" && slug.current == "2097-30-chandelier"][0] { 
      _id, name, slug, brand, categories, variants, lifestyleImages 
    }`);
    
    if (product) {
      console.log('📦 Found product:', product.name);
      console.log('- ID:', product._id);
      console.log('- Brand:', product.brand || 'MISSING');
      console.log('- Categories:', product.categories?.length || 0, 'items');
      console.log('- Variants:', product.variants?.length || 0, 'items');
      console.log('- Lifestyle Images:', product.lifestyleImages?.length || 0, 'items');
      
      // Check what needs to be fixed
      const updates = {};
      let needsUpdate = false;
      
      if (!product.brand) {
        console.log('\n❌ Issue: Brand is missing - will set to "FLOS"');
        updates.brand = 'FLOS';
        needsUpdate = true;
      }
      
      if (!product.variants || product.variants.length === 0) {
        console.log('❌ Issue: No variants found - will add default variants');
        updates.variants = [
          {
            _key: 'chrome-variant',
            name: 'Chrome',
            color: 'Chrome',
            material: 'Chrome',
            price: 28050,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-placeholder' // This would need to be a real image reference
              }
            }
          },
          {
            _key: 'brass-variant',
            name: 'Brass',
            color: 'Brass',
            material: 'Brass',
            price: 28050,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-placeholder' // This would need to be a real image reference
              }
            }
          }
        ];
        needsUpdate = true;
      }
      
      // Get or create FLOS category
      let flosCategory = await client.fetch(`*[_type == "category" && title == "FLOS"][0]`);
      if (!flosCategory) {
        console.log('Creating FLOS category...');
        flosCategory = await client.create({
          _type: 'category',
          title: 'FLOS',
          slug: { current: 'flos' }
        });
      }
      
      // Get or create Lighting category
      let lightingCategory = await client.fetch(`*[_type == "category" && title == "Lighting"][0]`);
      if (!lightingCategory) {
        console.log('Creating Lighting category...');
        lightingCategory = await client.create({
          _type: 'category',
          title: 'Lighting',
          slug: { current: 'lighting' }
        });
      }
      
      if (!product.categories || product.categories.length === 0) {
        console.log('❌ Issue: No categories found - will add FLOS and Lighting categories');
        updates.categories = [
          {
            _type: 'reference',
            _ref: flosCategory._id,
            _key: 'flos-category'
          },
          {
            _type: 'reference',
            _ref: lightingCategory._id,
            _key: 'lighting-category'
          }
        ];
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        console.log('\n🔧 Updating product with fixes...');
        await client.patch(product._id).set(updates).commit();
        console.log('✅ Product updated successfully!');
        
        // Verify the update
        const updatedProduct = await client.fetch(`*[_type == "product" && _id == "${product._id}"][0] { 
          name, brand, categories, variants 
        }`);
        console.log('\n📋 Updated product:');
        console.log('- Brand:', updatedProduct.brand);
        console.log('- Categories:', updatedProduct.categories?.length || 0);
        console.log('- Variants:', updatedProduct.variants?.length || 0);
      } else {
        console.log('\n✅ Product is already properly configured!');
      }
      
    } else {
      console.log('❌ Product not found with slug: 2097-30-chandelier');
      console.log('Available FLOS products:');
      const flosProducts = await client.fetch(`*[_type == "product" && brand == "FLOS"] { name, slug }`);
      flosProducts.forEach(p => console.log(`- ${p.name} (${p.slug?.current})`));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixChandelierProduct();
