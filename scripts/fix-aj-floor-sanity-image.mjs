import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-13',
  token: process.env.SANITY_API_WRITE_TOKEN, // Need write token for updates
});

async function fixAJFloorSanityImage() {
  try {
    console.log('🔍 Finding AJ Floor products in Sanity...');
    
    // Find all AJ Floor products
    const ajFloorProducts = await client.fetch(`
      *[_type == "product" && brand == "Louis Poulsen" && name match "*AJ Floor*"] {
        _id,
        name,
        slug,
        image,
        variants[] {
          name,
          color,
          image {
            asset-> {
              _id,
              url
            }
          }
        }
      }
    `);
    
    console.log(`📊 Found ${ajFloorProducts.length} AJ Floor products`);
    
    // Find the one with slug 'aj-floor' (the one we need to fix)
    const targetProduct = ajFloorProducts.find(p => p.slug?.current === 'aj-floor');
    
    // Find the one with variants and images (source for main image)
    const sourceProduct = ajFloorProducts.find(p => 
      p.variants && p.variants.length > 0 && 
      p.variants.some(v => v.image?.asset?.url)
    );
    
    if (!targetProduct) {
      console.log('❌ Target AJ Floor product with slug "aj-floor" not found');
      return;
    }
    
    if (!sourceProduct) {
      console.log('❌ Source AJ Floor product with variant images not found');
      return;
    }
    
    console.log('✅ Target product:', targetProduct.name, '(ID:', targetProduct._id, ')');
    console.log('✅ Source product:', sourceProduct.name, '(ID:', sourceProduct._id, ')');
    
    // Get the first variant image to use as main image
    const firstVariantWithImage = sourceProduct.variants.find(v => v.image?.asset?._id);
    
    if (!firstVariantWithImage) {
      console.log('❌ No variant with image found in source product');
      return;
    }
    
    console.log('🖼️  Using variant image as main image:', firstVariantWithImage.color || firstVariantWithImage.name);
    
    // Update the target product with the main image and variants
    const updateData = {
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: firstVariantWithImage.image.asset._id
        }
      },
      variants: sourceProduct.variants.map(variant => ({
        _type: 'variant',
        _key: `variant-${variant.color || variant.name}`.toLowerCase().replace(/\s+/g, '-'),
        name: variant.name,
        color: variant.color,
        image: variant.image ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: variant.image.asset._id
          }
        } : undefined
      }))
    };
    
    console.log('💾 Updating AJ Floor product in Sanity...');
    
    const result = await client
      .patch(targetProduct._id)
      .set(updateData)
      .commit();
    
    console.log('✅ Successfully updated AJ Floor product!');
    console.log('🎉 Main image and variants are now properly set');
    
    // Verify the update
    const updatedProduct = await client.fetch(`
      *[_id == $id][0] {
        name,
        slug,
        image {
          asset-> {
            url
          }
        },
        variants[] {
          name,
          color,
          image {
            asset-> {
              url
            }
          }
        }
      }
    `, { id: targetProduct._id });
    
    console.log('\n📋 Updated product verification:');
    console.log('Name:', updatedProduct.name);
    console.log('Slug:', updatedProduct.slug?.current);
    console.log('Main image:', updatedProduct.image?.asset?.url ? '✅' : '❌');
    console.log('Variants with images:', updatedProduct.variants?.filter(v => v.image?.asset?.url).length || 0);
    
  } catch (error) {
    console.error('❌ Error fixing AJ Floor Sanity image:', error.message);
  }
}

fixAJFloorSanityImage();
