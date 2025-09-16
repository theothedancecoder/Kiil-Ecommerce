import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

// Dux related products mapping from static data
const duxRelatedProducts = {
  "inter-dining-table": [
    "sam-dining-chair",
    "lunaria-table"
  ],
  "jetson-classic-soft-88": [
    "jetson-match-flax-21",
    "superspider-sheepskin"
  ],
  "jetson-match-flax-21": [
    "jetson-classic-soft-88",
    "superspider-sheepskin"
  ],
  "lunaria-table": [
    "sam-dining-chair",
    "inter-dining-table"
  ],
  "sam-dining-chair": [
    "jetson-classic-soft-88",
    "inter-dining-table"
  ],
  "superspider-sheepskin": [
    "jetson-classic-soft-88",
    "jetson-match-flax-21"
  ]
};

async function findProductBySlug(slug) {
  try {
    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] { _id, name, slug }`,
      { slug }
    );
    return product;
  } catch (error) {
    console.error(`❌ Error finding product ${slug}:`, error.message);
    return null;
  }
}

async function addRelatedProductsToProduct(productSlug, relatedProductSlugs) {
  try {
    console.log(`📦 Processing related products for: ${productSlug}`);
    
    // Find the main product
    const product = await findProductBySlug(productSlug);
    if (!product) {
      console.error(`❌ Product not found: ${productSlug}`);
      return false;
    }

    // Find all related products
    const relatedProducts = [];
    
    for (const relatedSlug of relatedProductSlugs) {
      console.log(`  🔗 Finding related product: ${relatedSlug}`);
      
      const relatedProduct = await findProductBySlug(relatedSlug);
      if (relatedProduct) {
        relatedProducts.push({
          _type: 'reference',
          _ref: relatedProduct._id
        });
        console.log(`  ✅ Found related product: ${relatedProduct.name}`);
      } else {
        console.log(`  ❌ Related product not found: ${relatedSlug}`);
      }
    }

    if (relatedProducts.length > 0) {
      // Update product with related products
      await client
        .patch(product._id)
        .set({
          relatedProducts: relatedProducts
        })
        .commit();

      console.log(`✅ Added ${relatedProducts.length} related products to ${productSlug}`);
      return true;
    } else {
      console.log(`❌ No related products could be added to ${productSlug}`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Error processing related products for ${productSlug}:`, error.message);
    return false;
  }
}

async function addDuxRelatedProducts() {
  console.log('🚀 Starting Dux related products setup...');
  
  let successCount = 0;
  let errorCount = 0;
  let totalRelationships = 0;

  for (const [productSlug, relatedSlugs] of Object.entries(duxRelatedProducts)) {
    totalRelationships += relatedSlugs.length;
    
    try {
      const success = await addRelatedProductsToProduct(productSlug, relatedSlugs);
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${productSlug}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n🎉 Dux related products setup completed!');
  console.log(`📊 Total products processed: ${Object.keys(duxRelatedProducts).length}`);
  console.log(`🔗 Total relationships: ${totalRelationships}`);
  console.log(`✅ Successfully processed: ${successCount} products`);
  console.log(`❌ Errors: ${errorCount} products`);
  
  if (errorCount === 0) {
    console.log('🎊 All Dux products now have related products!');
  }
}

addDuxRelatedProducts();
