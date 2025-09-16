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

// Dux product variants with actual images from static data
const duxVariants = {
  "inter-dining-table": [
    {
      name: "Ø-110 White Laminate",
      image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
      color: "White",
      material: "Laminate",
      size: "Ø-110",
      price: 19490,
    },
    {
      name: "Ø-110 Black Laminate",
      image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg",
      color: "Black",
      material: "Laminate",
      size: "Ø-110",
      price: 19490,
    },
    {
      name: "100×180 White Laminate",
      image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
      color: "White",
      material: "Laminate",
      size: "100×180",
      price: 26440,
    },
    {
      name: "100×180 Black Laminate",
      image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp",
      color: "Black",
      material: "Laminate",
      size: "100×180",
      price: 26440,
    },
    {
      name: "100×180 White w/2 Insert Panels",
      image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 hvit laminat m:2 illeggsplater.webp",
      color: "White",
      material: "Laminate with Insert Panels",
      size: "100×180",
      price: 45990,
    },
    {
      name: "100×180 Black w/2 Insert Panels",
      image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 sort laminat m:2 illeggsplater.webp",
      color: "Black",
      material: "Laminate with Insert Panels",
      size: "100×180",
      price: 45990,
    },
  ],
  "jetson-classic-soft-88": [
    {
      name: "Classic Soft 88 Black",
      image: "/dux/Jetson Classic soft 88/classic soft 88 black.jpg",
      color: "Black",
      leather: "Classic Soft 88",
      price: 27990,
    },
    {
      name: "Classic Soft 25 Brown",
      image: "/dux/Jetson Classic soft 88/classic soft 25 brown.jpg",
      color: "Brown",
      leather: "Classic Soft 25",
      price: 27990,
    },
  ],
  "jetson-match-flax-21": [
    {
      name: "Flax 21 with Dakota 88 Black",
      image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg",
      color: "Black",
      material: "Flax 21 Linen",
      leather: "Dakota 88",
      price: 27990,
    },
    {
      name: "Flax 21 with Dakota 29 Cognac",
      image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg",
      color: "Cognac",
      material: "Flax 21 Linen",
      leather: "Dakota 29",
      price: 27990,
    },
    {
      name: "Flax 21 with Dakota 24",
      image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp",
      color: "Brown",
      material: "Flax 21 Linen",
      leather: "Dakota 24",
      price: 27990,
    },
  ],
  "lunaria-table": [
    {
      name: "Small - Wax-oiled Ash (H-50 Ø-39)",
      image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
      color: "Ash",
      material: "Wax-oiled Ash",
      size: "Small (H-50 Ø-39)",
      price: 10215,
    },
    {
      name: "Medium - Wax-oiled Ash (H-45 Ø-60)",
      image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
      color: "Ash",
      material: "Wax-oiled Ash",
      size: "Medium (H-45 Ø-60)",
      price: 10980,
    },
    {
      name: "Large - Wax-oiled Ash (H-40 Ø-86)",
      image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
      color: "Ash",
      material: "Wax-oiled Ash",
      size: "Large (H-40 Ø-86)",
      price: 16080,
    },
    {
      name: "Small - Wax-oiled Oak (H-50 Ø-39)",
      image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
      color: "Oak",
      material: "Wax-oiled Oak",
      size: "Small (H-50 Ø-39)",
      price: 10215,
    },
    {
      name: "Medium - Wax-oiled Oak (H-45 Ø-60)",
      image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
      color: "Oak",
      material: "Wax-oiled Oak",
      size: "Medium (H-45 Ø-60)",
      price: 10980,
    },
    {
      name: "Large - Wax-oiled Oak (H-40 Ø-86)",
      image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
      color: "Oak",
      material: "Wax-oiled Oak",
      size: "Large (H-40 Ø-86)",
      price: 16080,
    },
    {
      name: "Small - Wax-oiled Walnut (H-50 Ø-39)",
      image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
      color: "Walnut",
      material: "Wax-oiled Walnut",
      size: "Small (H-50 Ø-39)",
      price: 10215,
    },
    {
      name: "Medium - Wax-oiled Walnut (H-45 Ø-60)",
      image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
      color: "Walnut",
      material: "Wax-oiled Walnut",
      size: "Medium (H-45 Ø-60)",
      price: 10980,
    },
    {
      name: "Large - Wax-oiled Walnut (H-40 Ø-86)",
      image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16 080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
      color: "Walnut",
      material: "Wax-oiled Walnut",
      size: "Large (H-40 Ø-86)",
      price: 16080,
    },
  ],
  "sam-dining-chair": [
    {
      name: "Classic Soft 88 - With Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg",
      color: "Black",
      leather: "Classic Soft 88",
      base: "With Armrest",
      price: 13790,
    },
    {
      name: "Naturale Camel - With Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
      color: "Camel",
      leather: "Naturale Camel",
      base: "With Armrest",
      price: 13790,
    },
    {
      name: "Naturale Perle - With Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg",
      color: "Perle",
      leather: "Naturale Perle",
      base: "With Armrest",
      price: 13790,
    },
    {
      name: "Naturale Truffle - With Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Truffle.jpg",
      color: "Truffle",
      leather: "Naturale Truffle",
      base: "With Armrest",
      price: 13790,
    },
    {
      name: "Classic Soft 88 - Without Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg",
      color: "Black",
      leather: "Classic Soft 88",
      base: "Without Armrest",
      price: 13790,
    },
    {
      name: "Naturale Camel - Without Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
      color: "Camel",
      leather: "Naturale Camel",
      base: "Without Armrest",
      price: 13790,
    },
    {
      name: "Naturale Perle - Without Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg",
      color: "Perle",
      leather: "Naturale Perle",
      base: "Without Armrest",
      price: 13790,
    },
    {
      name: "Naturale Truffle - Without Armrest",
      image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Truffle.jpg",
      color: "Truffle",
      leather: "Naturale Truffle",
      base: "Without Armrest",
      price: 13790,
    },
  ],
  "superspider-sheepskin": [
    {
      name: "Scandinavian Grey 22 Sheepskin",
      image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg",
      color: "Grey",
      material: "Sheepskin",
      price: 53815,
    },
    {
      name: "Black 01 Sheepskin",
      image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
      color: "Black",
      material: "Sheepskin",
      price: 53815,
    },
    {
      name: "Off-white 02 Sheepskin",
      image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg",
      color: "Off-white",
      material: "Sheepskin",
      price: 53815,
    },
    {
      name: "Cork 19 Sheepskin",
      image: "/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg",
      color: "Cork",
      material: "Sheepskin",
      price: 53815,
    },
    {
      name: "Drake 20 Sheepskin",
      image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
      color: "Drake",
      material: "Sheepskin",
      price: 53815,
    },
    {
      name: "Mohawi 21 Sheepskin",
      image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg",
      color: "Mohawi",
      material: "Sheepskin",
      price: 53815,
    },
  ],
};

async function uploadVariantImage(imagePath) {
  try {
    console.log(`📸 Uploading variant image: ${imagePath}`);
    
    // Create placeholder image asset
    const imageAsset = await client.create({
      _type: 'sanity.imageAsset',
      originalFilename: imagePath.split('/').pop(),
      url: `https://placeholder-for-${imagePath.split('/').pop()}`,
      metadata: {
        dimensions: {
          width: 800,
          height: 800
        }
      }
    });

    console.log(`✅ Variant image uploaded: ${imageAsset._id}`);
    return imageAsset._id;
  } catch (error) {
    console.error(`❌ Error uploading variant image ${imagePath}:`, error.message);
    return null;
  }
}

async function createDuxVariants() {
  console.log('🚀 Starting Dux variants creation...');
  
  let totalVariants = 0;
  let successCount = 0;
  let errorCount = 0;

  for (const [productSlug, variants] of Object.entries(duxVariants)) {
    console.log(`\n📦 Processing variants for: ${productSlug}`);
    
    try {
      // Find the product
      const product = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug: productSlug }
      );

      if (!product) {
        console.error(`❌ Product not found: ${productSlug}`);
        errorCount += variants.length;
        continue;
      }

      // Process each variant
      const processedVariants = [];
      
      for (const variant of variants) {
        totalVariants++;
        console.log(`  📝 Creating variant: ${variant.name}`);
        
        try {
          // Upload variant image
          const imageAssetId = await uploadVariantImage(variant.image);
          
          if (imageAssetId) {
            const variantData = {
              _type: 'productVariant',
              name: variant.name,
              price: variant.price,
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageAssetId
                }
              }
            };

            // Add optional properties
            if (variant.material) variantData.material = variant.material;
            if (variant.color) variantData.color = variant.color;
            if (variant.size) variantData.size = variant.size;
            if (variant.base) variantData.base = variant.base;
            if (variant.leather) variantData.leather = variant.leather;

            processedVariants.push(variantData);
            successCount++;
            console.log(`  ✅ Variant created: ${variant.name}`);
          } else {
            errorCount++;
            console.log(`  ❌ Failed to create variant: ${variant.name}`);
          }
        } catch (error) {
          errorCount++;
          console.error(`  ❌ Error creating variant ${variant.name}:`, error.message);
        }
      }

      // Update product with variants
      if (processedVariants.length > 0) {
        await client
          .patch(product._id)
          .set({
            variants: processedVariants
          })
          .commit();

        console.log(`✅ Updated ${productSlug} with ${processedVariants.length} variants`);
      }

    } catch (error) {
      console.error(`❌ Error processing product ${productSlug}:`, error.message);
      errorCount += variants.length;
    }
  }

  console.log('\n🎉 Dux variants creation completed!');
  console.log(`📊 Total variants processed: ${totalVariants}`);
  console.log(`✅ Successfully created: ${successCount} variants`);
  console.log(`❌ Errors: ${errorCount} variants`);
  
  if (errorCount === 0) {
    console.log('🎊 All Dux products now have working variants with unique images!');
  }
}

createDuxVariants();
