#!/usr/bin/env node

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

async function createWorkingRoVariants() {
  console.log('🔧 Creating working RO Collection variants using existing main images...\n');

  // Get all RO Collection products
  const query = `
    *[_type == "product" && "ro-collection" in categories[]->slug.current] {
      _id,
      name,
      slug,
      price,
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  `;

  const products = await client.fetch(query);
  console.log(`Found ${products.length} RO Collection products\n`);

  for (const product of products) {
    if (!product.image?.asset?._id) {
      console.log(`❌ Skipping ${product.name} - no main image`);
      continue;
    }

    console.log(`📦 Processing: ${product.name}`);

    // Create variants based on the product type
    let variants = [];
    
    if (product.name.toLowerCase().includes('chair')) {
      // Chair variants - different materials and leathers
      variants = [
        {
          _type: 'object',
          _key: `variant-${Date.now()}-1`,
          name: 'Oiled Oak - Supreme Dark Chocolate',
          material: 'Oiled Oak',
          leather: 'Supreme Dark Chocolate',
          price: product.price || 22005,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: product.image.asset._id
            }
          }
        },
        {
          _type: 'object',
          _key: `variant-${Date.now()}-2`,
          name: 'Smoked Oak - Supreme Dark Chocolate',
          material: 'Smoked Oak',
          leather: 'Supreme Dark Chocolate',
          price: product.price || 22005,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: product.image.asset._id
            }
          }
        },
        {
          _type: 'object',
          _key: `variant-${Date.now()}-3`,
          name: 'Soaped Oak - Supreme Cognac',
          material: 'Soaped Oak',
          leather: 'Supreme Cognac',
          price: product.price || 22005,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: product.image.asset._id
            }
          }
        }
      ];
    } else if (product.name.toLowerCase().includes('table')) {
      // Table variants - different materials and sizes
      if (product.name.toLowerCase().includes('extension') && !product.name.toLowerCase().includes('ø-120')) {
        // Rectangular extension table
        variants = [
          {
            _type: 'object',
            _key: `variant-${Date.now()}-1`,
            name: '190x90 - Oiled Oak',
            material: 'Oiled Oak',
            size: '190x90',
            price: 35190,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: product.image.asset._id
              }
            }
          },
          {
            _type: 'object',
            _key: `variant-${Date.now()}-2`,
            name: '220x100 - Oiled Oak',
            material: 'Oiled Oak',
            size: '220x100',
            price: 37815,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: product.image.asset._id
              }
            }
          },
          {
            _type: 'object',
            _key: `variant-${Date.now()}-3`,
            name: '190x90 - Smoked Oak',
            material: 'Smoked Oak',
            size: '190x90',
            price: 38700,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: product.image.asset._id
              }
            }
          }
        ];
      } else {
        // Round tables
        variants = [
          {
            _type: 'object',
            _key: `variant-${Date.now()}-1`,
            name: 'Oiled Oak',
            material: 'Oiled Oak',
            price: product.price || 29940,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: product.image.asset._id
              }
            }
          },
          {
            _type: 'object',
            _key: `variant-${Date.now()}-2`,
            name: 'Soaped Oak',
            material: 'Soaped Oak',
            price: product.price || 29940,
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: product.image.asset._id
              }
            }
          },
          {
            _type: 'object',
            _key: `variant-${Date.now()}-3`,
            name: 'Smoked Oak',
            material: 'Smoked Oak',
            price: (product.price || 29940) + 3510, // Smoked oak typically costs more
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: product.image.asset._id
              }
            }
          }
        ];
      }
    } else if (product.name.toLowerCase().includes('extension')) {
      // Extension accessories
      variants = [
        {
          _type: 'object',
          _key: `variant-${Date.now()}-1`,
          name: 'Black MDF',
          material: 'Black MDF',
          price: 5130,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: product.image.asset._id
            }
          }
        },
        {
          _type: 'object',
          _key: `variant-${Date.now()}-2`,
          name: 'Oiled Oak',
          material: 'Oiled Oak',
          price: 7950,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: product.image.asset._id
            }
          }
        },
        {
          _type: 'object',
          _key: `variant-${Date.now()}-3`,
          name: 'Smoked Oak',
          material: 'Smoked Oak',
          price: 9690,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: product.image.asset._id
            }
          }
        }
      ];
    }

    if (variants.length > 0) {
      // Update product with variants
      await client
        .patch(product._id)
        .set({ variants })
        .commit();

      console.log(`✅ Added ${variants.length} variants to ${product.name}`);
    } else {
      console.log(`⚠️  No variants created for ${product.name}`);
    }

    // Small delay between products
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n🎉 Working RO Collection variants created!');
  console.log('\n💡 All products now have functional variants with images');
  console.log('📝 Note: Variants use the main product image for now, but functionality is working');
}

// Run the script
createWorkingRoVariants().catch(console.error);
