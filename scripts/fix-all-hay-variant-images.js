require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// HAY products with their unique variant images
const hayVariantImages = {
  "dont-leave-me-xl-dlm-side-table": [
    {
      name: "Anthracite Grey",
      image: "/HAY/Don`t-leave-me XL–DLM-side-table/variants/10509797_1.jpg",
      color: "Anthracite Grey",
      price: 2499,
    },
    {
      name: "Warm Yellow", 
      image: "/HAY/Don`t-leave-me XL–DLM-side-table/variants/10509797_2.jpg",
      color: "Warm Yellow",
      price: 2499,
    },
    {
      name: "Soft Pink",
      image: "/HAY/Don`t-leave-me XL–DLM-side-table/variants/10509797_3.jpg", 
      color: "Soft Pink",
      price: 2499,
    },
  ],
  "palissade-bench-l-120": [
    {
      name: "Anthracite",
      image: "/HAY/Palissade-bench-L-120/variants/palissade_bench_anthracite.jpg",
      color: "Anthracite",
      price: 4999,
    },
    {
      name: "Olive",
      image: "/HAY/Palissade-bench-L-120/variants/palissade_bench_olive.jpg",
      color: "Olive", 
      price: 4999,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Palissade-bench-L-120/variants/palissade_bench_sky_grey.jpg",
      color: "Sky Grey",
      price: 4999,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palissade-bench-L-120/variants/palissade_bench_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 4999,
    },
    {
      name: "Cream White",
      image: "/HAY/Palissade-bench-L-120/variants/palissade_bench_cream_white.jpg",
      color: "Cream White",
      price: 4999,
    },
    {
      name: "Quartz Grey",
      image: "/HAY/Palissade-bench-L-120/variants/palissade_bench_quartz_grey.jpg",
      color: "Quartz Grey",
      price: 4999,
    },
  ],
  "palissade-cone-table-o-60": [
    {
      name: "Anthracite",
      image: "/HAY/Palissade-cone-table-Ø-60/variants/palissade_cone_table_anthracite.jpg",
      color: "Anthracite",
      price: 3999,
    },
    {
      name: "Olive",
      image: "/HAY/Palissade-cone-table-Ø-60/variants/palissade_cone_table_olive.jpg",
      color: "Olive",
      price: 3999,
    },
    {
      name: "Sky Grey", 
      image: "/HAY/Palissade-cone-table-Ø-60/variants/palissade_cone_table_sky_grey.jpg",
      color: "Sky Grey",
      price: 3999,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palissade-cone-table-Ø-60/variants/palissade_cone_table_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 3999,
    },
    {
      name: "Cream White",
      image: "/HAY/Palissade-cone-table-Ø-60/variants/palissade_cone_table_cream_white.jpg",
      color: "Cream White",
      price: 3999,
    },
  ],
  "palissade-dining-chair": [
    {
      name: "Anthracite",
      image: "/HAY/Palissade-dining-chair/variants/palissade_dining_anthracite.jpg",
      color: "Anthracite",
      price: 1999,
    },
    {
      name: "Olive",
      image: "/HAY/Palissade-dining-chair/variants/palissade_dining_olive.jpg",
      color: "Olive",
      price: 1999,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Palissade-dining-chair/variants/palissade_dining_sky_grey.jpg",
      color: "Sky Grey", 
      price: 1999,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palissade-dining-chair/variants/palissade_dining_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 1999,
    },
    {
      name: "Cream White",
      image: "/HAY/Palissade-dining-chair/variants/palissade_dining_cream_white.jpg",
      color: "Cream White",
      price: 1999,
    },
    {
      name: "Quartz Grey",
      image: "/HAY/Palissade-dining-chair/variants/palissade_dining_quartz_grey.jpg",
      color: "Quartz Grey",
      price: 1999,
    },
  ],
  "palissade-armchair": [
    {
      name: "Anthracite",
      image: "/HAY/Palissade-armchair/variants/palissade_armchair_anthracite.jpg",
      color: "Anthracite",
      price: 2499,
    },
    {
      name: "Olive",
      image: "/HAY/Palissade-armchair/variants/palissade_armchair_olive.jpg",
      color: "Olive",
      price: 2499,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Palissade-armchair/variants/palissade_armchair_sky_grey.jpg",
      color: "Sky Grey",
      price: 2499,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palissade-armchair/variants/palissade_armchair_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 2499,
    },
    {
      name: "Cream White",
      image: "/HAY/Palissade-armchair/variants/palissade_armchair_cream_white.jpg",
      color: "Cream White",
      price: 2499,
    },
    {
      name: "Quartz Grey",
      image: "/HAY/Palissade-armchair/variants/palissade_armchair_quartz_grey.jpg",
      color: "Quartz Grey",
      price: 2499,
    },
  ],
  "palissade-lounge-chair": [
    {
      name: "Anthracite",
      image: "/HAY/Palissade-lounge-chair/variants/palissade_lounge_anthracite.jpg",
      color: "Anthracite",
      price: 2999,
    },
    {
      name: "Olive",
      image: "/HAY/Palissade-lounge-chair/variants/palissade_lounge_olive.jpg",
      color: "Olive",
      price: 2999,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Palissade-lounge-chair/variants/palissade_lounge_sky_grey.jpg",
      color: "Sky Grey",
      price: 2999,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palissade-lounge-chair/variants/palissade_lounge_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 2999,
    },
    {
      name: "Cream White",
      image: "/HAY/Palissade-lounge-chair/variants/palissade_lounge_cream_white.jpg",
      color: "Cream White",
      price: 2999,
    },
  ],
  "palissade-low-table": [
    {
      name: "Anthracite",
      image: "/HAY/Palissade-low-table/variants/palissade_low_table_anthracite.jpg",
      color: "Anthracite",
      price: 3499,
    },
    {
      name: "Olive",
      image: "/HAY/Palissade-low-table/variants/palissade_low_table_olive.jpg",
      color: "Olive",
      price: 3499,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Palissade-low-table/variants/palissade_low_table_sky_grey.jpg",
      color: "Sky Grey",
      price: 3499,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palissade-low-table/variants/palissade_low_table_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 3499,
    },
    {
      name: "Cream White",
      image: "/HAY/Palissade-low-table/variants/palissade_low_table_cream_white.jpg",
      color: "Cream White",
      price: 3499,
    },
  ],
  "neu-table-high": [
    {
      name: "Oak - Black Base",
      image: "/HAY/Neu-table-high/variants/neu_table_high_oak_black.jpg",
      material: "Oak",
      color: "Black Base",
      price: 5999,
    },
    {
      name: "Oak - White Base",
      image: "/HAY/Neu-table-high/variants/neu_table_high_oak_white.jpg",
      material: "Oak",
      color: "White Base",
      price: 5999,
    },
    {
      name: "Walnut - Black Base",
      image: "/HAY/Neu-table-high/variants/neu_table_high_walnut_black.jpg",
      material: "Walnut",
      color: "Black Base",
      price: 6499,
    },
    {
      name: "Walnut - White Base",
      image: "/HAY/Neu-table-high/variants/neu_table_high_walnut_white.jpg",
      material: "Walnut",
      color: "White Base",
      price: 6499,
    },
  ],
  "neu-table-low": [
    {
      name: "Oak - Black Base",
      image: "/HAY/Neu-table-low/variants/neu_table_low_oak_black.jpg",
      material: "Oak",
      color: "Black Base",
      price: 4999,
    },
    {
      name: "Oak - White Base",
      image: "/HAY/Neu-table-low/variants/neu_table_low_oak_white.jpg",
      material: "Oak",
      color: "White Base",
      price: 4999,
    },
    {
      name: "Walnut - Black Base",
      image: "/HAY/Neu-table-low/variants/neu_table_low_walnut_black.jpg",
      material: "Walnut",
      color: "Black Base",
      price: 5499,
    },
    {
      name: "Walnut - White Base",
      image: "/HAY/Neu-table-low/variants/neu_table_low_walnut_white.jpg",
      material: "Walnut",
      color: "White Base",
      price: 5499,
    },
    {
      name: "Ash - Black Base",
      image: "/HAY/Neu-table-low/variants/neu_table_low_ash_black.jpg",
      material: "Ash",
      color: "Black Base",
      price: 4999,
    },
    {
      name: "Ash - White Base",
      image: "/HAY/Neu-table-low/variants/neu_table_low_ash_white.jpg",
      material: "Ash",
      color: "White Base",
      price: 4999,
    },
  ],
  "dont-leave-me-dlm-side-table": [
    {
      name: "Anthracite Grey",
      image: "/HAY/Don`t-leave me-DLM-side-table /variants/10509796_1.jpg",
      color: "Anthracite Grey",
      price: 1999,
    },
    {
      name: "Warm Yellow",
      image: "/HAY/Don`t-leave me-DLM-side-table /variants/10509796_2.jpg",
      color: "Warm Yellow",
      price: 1999,
    },
    {
      name: "Soft Pink",
      image: "/HAY/Don`t-leave me-DLM-side-table /variants/10509796_3.jpg",
      color: "Soft Pink",
      price: 1999,
    },
    {
      name: "Cream White",
      image: "/HAY/Don`t-leave me-DLM-side-table /variants/10509796_4.jpg",
      color: "Cream White",
      price: 1999,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Don`t-leave me-DLM-side-table /variants/10509796_5.jpg",
      color: "Sky Grey",
      price: 1999,
    },
    {
      name: "Olive",
      image: "/HAY/Don`t-leave me-DLM-side-table /variants/10509796_6.jpg",
      color: "Olive",
      price: 1999,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Don`t-leave me-DLM-side-table /variants/10509796_7.jpg",
      color: "Hot Galvanised",
      price: 1999,
    },
  ],
  "kofi-coffee-table-60x60": [
    {
      name: "Oak",
      image: "/HAY/Kofi-coffee-table-60×60/variants/kofi_coffee_table_oak.jpg",
      material: "Oak",
      price: 3299,
    },
    {
      name: "Walnut",
      image: "/HAY/Kofi-coffee-table-60×60/variants/kofi_coffee_table_walnut.jpg",
      material: "Walnut",
      price: 3799,
    },
  ],
  "palisade-chair": [
    {
      name: "Anthracite",
      image: "/HAY/Palisade-chair/variants/palisade_chair_anthracite.jpg",
      color: "Anthracite",
      price: 1799,
    },
    {
      name: "Olive",
      image: "/HAY/Palisade-chair/variants/palisade_chair_olive.jpg",
      color: "Olive",
      price: 1799,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Palisade-chair/variants/palisade_chair_sky_grey.jpg",
      color: "Sky Grey",
      price: 1799,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palisade-chair/variants/palisade_chair_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 1799,
    },
    {
      name: "Cream White",
      image: "/HAY/Palisade-chair/variants/palisade_chair_cream_white.jpg",
      color: "Cream White",
      price: 1799,
    },
  ],
  "palisade-bar-stool": [
    {
      name: "Anthracite",
      image: "/HAY/Palisade-bar-stool/variants/palisade_bar_stool_anthracite.jpg",
      color: "Anthracite",
      price: 2299,
    },
    {
      name: "Olive",
      image: "/HAY/Palisade-bar-stool/variants/palisade_bar_stool_olive.jpg",
      color: "Olive",
      price: 2299,
    },
    {
      name: "Sky Grey",
      image: "/HAY/Palisade-bar-stool/variants/palisade_bar_stool_sky_grey.jpg",
      color: "Sky Grey",
      price: 2299,
    },
    {
      name: "Hot Galvanised",
      image: "/HAY/Palisade-bar-stool/variants/palisade_bar_stool_hot_galvanised.jpg",
      color: "Hot Galvanised",
      price: 2299,
    },
    {
      name: "Cream White",
      image: "/HAY/Palisade-bar-stool/variants/palisade_bar_stool_cream_white.jpg",
      color: "Cream White",
      price: 2299,
    },
  ],
};

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    console.log(`✅ Uploaded: ${imagePath} -> ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${imagePath}:`, error.message);
    return null;
  }
}

async function updateHayProductVariants() {
  try {
    console.log('🔄 Starting HAY variant images upload to Sanity...\n');

    // Get all HAY products from Sanity
    const hayProducts = await client.fetch(`*[_type == "product" && brand == "HAY"] {
      _id,
      name,
      slug,
      variants
    }`);

    console.log(`Found ${hayProducts.length} HAY products in Sanity\n`);

    let totalUpdated = 0;
    let totalVariantsProcessed = 0;

    for (const product of hayProducts) {
      const productSlug = product.slug?.current;
      if (!productSlug) {
        console.log(`⚠️  Skipping product without slug: ${product.name}`);
        continue;
      }

      const variantData = hayVariantImages[productSlug];
      if (!variantData) {
        console.log(`⚠️  No variant data found for: ${product.name} (${productSlug})`);
        continue;
      }

      console.log(`\n🔄 Processing: ${product.name}`);
      console.log(`   Slug: ${productSlug}`);
      console.log(`   Expected variants: ${variantData.length}`);

      // Upload all variant images
      const uploadedVariants = [];
      for (const variant of variantData) {
        console.log(`   📸 Uploading variant: ${variant.name}`);
        
        const uploadedImage = await uploadImageToSanity(variant.image);
        
        if (uploadedImage) {
          uploadedVariants.push({
            _key: `variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: variant.name,
            color: variant.color || null,
            material: variant.material || null,
            size: variant.size || null,
            price: variant.price,
            image: uploadedImage,
          });
          totalVariantsProcessed++;
        } else {
          console.log(`   ❌ Failed to upload variant: ${variant.name}`);
        }
      }

      if (uploadedVariants.length > 0) {
        // Update the product with new variants
        await client
          .patch(product._id)
          .set({ variants: uploadedVariants })
          .commit();

        console.log(`   ✅ Updated ${product.name} with ${uploadedVariants.length} variants`);
        totalUpdated++;
      } else {
        console.log(`   ❌ No variants uploaded for ${product.name}`);
      }
    }

    console.log(`\n🎉 HAY variant images upload completed!`);
    console.log(`📊 Summary:`);
    console.log(`   - Products updated: ${totalUpdated}`);
    console.log(`   - Total variants processed: ${totalVariantsProcessed}`);
    console.log(`   - Total HAY products in Sanity: ${hayProducts.length}`);

  } catch (error) {
    console.error('❌ Error updating HAY variants:', error);
  }
}

updateHayProductVariants();
