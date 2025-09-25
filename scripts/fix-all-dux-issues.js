const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function uploadImageToSanity(imagePath, filename) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`   ❌ Image not found: ${imagePath}`);
      return null;
    }

    console.log(`   📤 Uploading: ${filename}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename
    });
    
    console.log(`   ✅ Uploaded: ${asset.url}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`   ❌ Error uploading ${filename}:`, error.message);
    return null;
  }
}

async function fixAllDuxIssues() {
  console.log('🔧 Fixing all DUX issues...\n');

  try {
    // Get all DUX products
    const duxProducts = await client.fetch(`
      *[_type == "product" && brand == "DUX"] | order(name asc, _createdAt desc) {
        _id,
        _createdAt,
        name,
        slug,
        price,
        image,
        variants[] {
          _key,
          name,
          image
        },
        features,
        specifications[] {
          label,
          value
        },
        relatedProducts[]-> {
          _id,
          name,
          slug
        }
      }
    `);

    console.log(`✅ Found ${duxProducts.length} DUX products`);

    // Group products by name to identify duplicates
    const productGroups = {};
    duxProducts.forEach(product => {
      if (!productGroups[product.name]) {
        productGroups[product.name] = [];
      }
      productGroups[product.name].push(product);
    });

    // Process each product group
    for (const [productName, products] of Object.entries(productGroups)) {
      console.log(`\n🔍 Processing: ${productName}`);
      
      if (products.length > 1) {
        console.log(`   ⚠️  Found ${products.length} duplicates`);
        
        // Find the best version (most complete data)
        let bestProduct = products[0];
        let productsToDelete = [];
        
        for (let i = 1; i < products.length; i++) {
          const current = products[i];
          
          // Compare completeness
          const bestScore = (bestProduct.features?.length || 0) + 
                           (bestProduct.specifications?.length || 0) + 
                           (bestProduct.image ? 1 : 0) +
                           (bestProduct.variants?.length || 0);
          
          const currentScore = (current.features?.length || 0) + 
                              (current.specifications?.length || 0) + 
                              (current.image ? 1 : 0) +
                              (current.variants?.length || 0);
          
          if (currentScore > bestScore) {
            productsToDelete.push(bestProduct);
            bestProduct = current;
          } else {
            productsToDelete.push(current);
          }
        }
        
        // Delete duplicate products
        for (const productToDelete of productsToDelete) {
          console.log(`   🗑️  Deleting duplicate: ${productToDelete._id}`);
          await client.delete(productToDelete._id);
        }
        
        console.log(`   ✅ Kept best version: ${bestProduct._id}`);
      }
      
        // Fix placeholder images in the remaining product
        const remainingProduct = products.length > 1 ? bestProduct : products[0];
        await fixProductPlaceholders(remainingProduct);
    }

    console.log('\n🎉 All DUX issues have been fixed!');

  } catch (error) {
    console.error('❌ Error fixing DUX issues:', error);
  }
}

async function fixProductPlaceholders(product) {
  console.log(`   🔧 Fixing placeholders for: ${product.name}`);
  
  let needsUpdate = false;
  let updatedVariants = [];

  if (product.variants) {
    for (const variant of product.variants) {
      if (variant.image?.asset?.url && variant.image.asset.url.includes('placeholder-for-')) {
        console.log(`   🎨 Fixing placeholder for variant: ${variant.name}`);
        
        // Try to find the real image
        const imageName = variant.image.asset.url.replace('https://placeholder-for-', '');
        const possiblePaths = [
          `/dux/${product.name}/${imageName}`,
          `/dux/${product.slug?.current}/${imageName}`,
          `/dux/${imageName}`,
          `/dux/${product.name.replace(/\s+/g, ' ')}/${imageName}`,
        ];

        let uploadedImage = null;
        for (const possiblePath of possiblePaths) {
          const fullPath = path.join(process.cwd(), 'public', possiblePath);
          if (fs.existsSync(fullPath)) {
            uploadedImage = await uploadImageToSanity(fullPath, path.basename(possiblePath));
            break;
          }
        }

        if (uploadedImage) {
          updatedVariants.push({
            ...variant,
            image: uploadedImage
          });
          needsUpdate = true;
        } else {
          console.log(`   ⚠️  Could not find real image for: ${variant.name}`);
          updatedVariants.push(variant);
        }
      } else {
        updatedVariants.push(variant);
      }
    }
  }

  // Add missing features and specifications if needed
  let features = product.features;
  let specifications = product.specifications;

  if (!features || features.length === 0) {
    features = getDefaultFeatures(product.name);
    needsUpdate = true;
  }

  if (!specifications || specifications.length === 0) {
    specifications = getDefaultSpecifications(product.name);
    needsUpdate = true;
  }

  // Update the product if needed
  if (needsUpdate) {
    console.log(`   💾 Updating product: ${product.name}`);
    const updateData = {};
    
    if (updatedVariants.length > 0 && updatedVariants !== product.variants) {
      updateData.variants = updatedVariants;
    }
    
    if (features !== product.features) {
      updateData.features = features;
    }
    
    if (specifications !== product.specifications) {
      updateData.specifications = specifications;
    }

    if (Object.keys(updateData).length > 0) {
      await client.patch(product._id).set(updateData).commit();
      console.log(`   ✅ Updated successfully!`);
    }
  } else {
    console.log(`   ✅ No updates needed`);
  }
}

function getDefaultFeatures(productName) {
  const commonFeatures = [
    "Made to order - Expected delivery time approximately 8 weeks",
    "Designed by DUX Design Team",
    "Premium quality construction",
    "Available in multiple finishes",
    "Contemporary Scandinavian design",
    "Durable materials and construction",
    "Professional assembly recommended",
    "2-year manufacturer warranty",
    "Sustainable production methods"
  ];
  
  return commonFeatures;
}

function getDefaultSpecifications(productName) {
  const commonSpecs = [
    { label: "Designer", value: "DUX Design Team" },
    { label: "Manufacturer", value: "DUX" },
    { label: "Style", value: "Contemporary Scandinavian" },
    { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
    { label: "Warranty", value: "2 years manufacturer warranty" },
    { label: "Origin", value: "Scandinavian design" },
    { label: "Care Instructions", value: "Professional cleaning recommended" },
    { label: "Assembly", value: "Professional assembly recommended" }
  ];
  
  return commonSpecs;
}

fixAllDuxIssues();
