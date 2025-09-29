import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

console.log('🔧 Fixing Louis Poulsen missing main images...\n');

async function fixMissingMainImages() {
  try {
    // Get products without main images but with variant images
    const products = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen" && !defined(image) && defined(variants) && count(variants[defined(image)]) > 0] {
        _id,
        name,
        slug,
        variants[] {
          name,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);

    console.log(`Found ${products.length} products missing main images but with variant images:`);
    
    for (const product of products) {
      console.log(`\n🔄 Processing: ${product.name} (${product._id})`);
      
      // Find first variant with an image
      const variantWithImage = product.variants.find(v => v.image?.asset?.url);
      
      if (variantWithImage) {
        console.log(`  📸 Using image from variant: ${variantWithImage.name}`);
        console.log(`  🔗 Image URL: ${variantWithImage.image.asset.url}`);
        
        try {
          await client
            .patch(product._id)
            .set({
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: variantWithImage.image.asset._id
                }
              }
            })
            .commit();
          
          console.log(`  ✅ Updated main image for ${product.name}`);
        } catch (error) {
          console.error(`  ❌ Failed to update ${product.name}: ${error.message}`);
        }
      } else {
        console.log(`  ⚠️  No variant images found for ${product.name}`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Now get products that still have no images at all
    console.log('\n🔍 Checking for products with no images at all...');
    const productsWithNoImages = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen" && !defined(image) && (!defined(variants) || count(variants[defined(image)]) == 0)] {
        _id,
        name,
        slug
      }
    `);

    if (productsWithNoImages.length > 0) {
      console.log(`\n⚠️  Found ${productsWithNoImages.length} products with no images at all:`);
      productsWithNoImages.forEach(product => {
        console.log(`  - ${product.name} (${product._id})`);
      });
      console.log('\n💡 These products need images uploaded manually or should be removed.');
    }

    // Fix missing slugs
    console.log('\n🔍 Checking for products with missing slugs...');
    const productsWithoutSlugs = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen" && !defined(slug.current)] {
        _id,
        name
      }
    `);

    if (productsWithoutSlugs.length > 0) {
      console.log(`\nFound ${productsWithoutSlugs.length} products with missing slugs:`);
      
      for (const product of productsWithoutSlugs) {
        // Generate slug from name
        const slug = product.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single
          .trim();
        
        console.log(`  🔄 ${product.name} -> ${slug}`);
        
        try {
          await client
            .patch(product._id)
            .set({
              slug: {
                _type: 'slug',
                current: slug
              }
            })
            .commit();
          
          console.log(`  ✅ Added slug for ${product.name}`);
        } catch (error) {
          console.error(`  ❌ Failed to add slug for ${product.name}: ${error.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    console.log('\n🎉 Main image fix completed!');
    console.log('🔄 Verifying results...');

    // Final verification
    const finalCheck = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen"] {
        _id,
        name,
        "hasMainImage": defined(image),
        "hasSlug": defined(slug.current)
      }
    `);

    const withImages = finalCheck.filter(p => p.hasMainImage).length;
    const withoutImages = finalCheck.filter(p => !p.hasMainImage).length;
    const withSlugs = finalCheck.filter(p => p.hasSlug).length;
    const withoutSlugs = finalCheck.filter(p => !p.hasSlug).length;

    console.log(`\n📊 Final Status:`);
    console.log(`✅ Products with main images: ${withImages}`);
    console.log(`❌ Products without main images: ${withoutImages}`);
    console.log(`✅ Products with slugs: ${withSlugs}`);
    console.log(`❌ Products without slugs: ${withoutSlugs}`);

    if (withoutImages === 0) {
      console.log('\n🎉 SUCCESS: All products now have main images!');
      console.log('🌐 The production site should now display images correctly.');
    } else {
      console.log('\n⚠️  Some products still missing images - may need manual intervention.');
    }

  } catch (error) {
    console.error('❌ Error fixing missing main images:', error);
  }
}

// Run the fix
fixMissingMainImages().catch(console.error);
