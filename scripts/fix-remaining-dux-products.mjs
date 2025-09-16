import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03',
});

async function fixRemainingDuxProducts() {
  console.log('🔧 Fixing remaining Dux products...\n');
  
  try {
    // First, let's find all Dux products and see what's happening
    const allDuxQuery = `
      *[_type == "product" && "dux" in categories[]->slug.current] {
        _id,
        name,
        slug,
        image,
        variants,
        lifestyleImages,
        relatedProducts
      }
    `;
    
    const allProducts = await client.fetch(allDuxQuery);
    console.log(`📊 Found ${allProducts.length} Dux products total`);
    
    for (const product of allProducts) {
      console.log(`- ${product.name} (${product.slug?.current})`);
      console.log(`  Image: ${product.image ? '✅' : '❌'}`);
      console.log(`  Variants: ${product.variants?.length || 0}`);
      console.log(`  Lifestyle: ${product.lifestyleImages?.length || 0}`);
      console.log(`  Related: ${product.relatedProducts?.length || 0}`);
    }
    
    // Find products that need fixing
    const problemProducts = ['lunaria-table', 'sam-dining-chair', 'superspider-sheepskin'];
    
    for (const slug of problemProducts) {
      console.log(`\n🔧 Fixing ${slug}...`);
      
      // Find the product
      const product = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]`,
        { slug }
      );
      
      if (!product) {
        console.log(`❌ Product ${slug} not found`);
        continue;
      }
      
      console.log(`✅ Found product: ${product.name} (${product._id})`);
      
      // Check if it already has data
      if (product.image && product.variants?.length > 0) {
        console.log(`ℹ️  Product ${slug} already has data, skipping...`);
        continue;
      }
      
      // Delete the product and recreate it properly
      console.log(`🗑️  Deleting existing product ${product._id}...`);
      await client.delete(product._id);
      
      // Recreate the product with proper data
      console.log(`📝 Recreating product ${slug}...`);
      
      let newProductData;
      
      if (slug === 'lunaria-table') {
        newProductData = {
          _type: 'product',
          name: 'Lunaria Table',
          slug: { _type: 'slug', current: 'lunaria-table' },
          description: 'This is a made to order item. Expected delivery time is approximately 8 weeks. The Lunaria series consists of 3 different small tables that look just as good in a group as they do individually. The tables have an organic shape that makes them stand out. Here in wax-oiled ash, but also available in wax-oiled oak and wax-oiled walnut. Contact us at gjovik@kiil.no for a quote.',
          price: 10215,
          brand: 'DUX',
          designer: 'Claesson Koivisto Rune',
          subcategory: 'tables',
          roomCategory: 'living',
          features: [
            'Made to order - Expected delivery time approximately 8 weeks',
            'Designed by Claesson Koivisto Rune',
            'Available in 3 sizes: Small (H-50 Ø-39), Medium (H-45 Ø-60), Large (H-40 Ø-86)',
            'Available in 3 wood finishes: Wax-oiled Ash, Wax-oiled Oak, Wax-oiled Walnut',
            'Organic shape design that stands out',
            'Perfect individually or as a group',
            'Small table series with unique character'
          ],
          specifications: [
            { label: 'Designer', value: 'Claesson Koivisto Rune' },
            { label: 'Manufacturer', value: 'DUX' },
            { label: 'Small Size', value: 'H-50 Ø-39 cm' },
            { label: 'Medium Size', value: 'H-45 Ø-60 cm' },
            { label: 'Large Size', value: 'H-40 Ø-86 cm' },
            { label: 'Available Finishes', value: 'Wax-oiled Ash, Oak, Walnut' },
            { label: 'Style', value: 'Organic shape design' },
            { label: 'Usage', value: 'Individual or group arrangement' }
          ],
          categories: [{ _type: 'reference', _ref: await getDuxCategoryId() }],
          inStock: true,
          stock: 10
        };
      } else if (slug === 'sam-dining-chair') {
        newProductData = {
          _type: 'product',
          name: 'Sam Dining Chair',
          slug: { _type: 'slug', current: 'sam-dining-chair' },
          description: 'This is a made to order item. Expected delivery time is approximately 8 weeks. The Sam dining chair combines comfort with elegant design. Available with or without armrests and in multiple leather finishes. The chrome base provides stability while the upholstered seat ensures comfort for long dining sessions.',
          price: 13790,
          brand: 'DUX',
          designer: 'DUX Design Team',
          subcategory: 'chairs',
          roomCategory: 'dining',
          features: [
            'Made to order - Expected delivery time approximately 8 weeks',
            'Designed by DUX Design Team',
            'Available with or without armrests',
            'Multiple leather finish options',
            'Chrome base construction',
            'Comfortable upholstered seat',
            'Perfect for dining rooms',
            'Elegant and functional design'
          ],
          specifications: [
            { label: 'Designer', value: 'DUX Design Team' },
            { label: 'Manufacturer', value: 'DUX' },
            { label: 'Base Material', value: 'Chrome' },
            { label: 'Upholstery Options', value: 'Classic Soft 88, Naturale Camel, Naturale Perle, Naturale Truffle' },
            { label: 'Armrest Options', value: 'With or without armrests' },
            { label: 'Style', value: 'Modern dining chair' },
            { label: 'Usage', value: 'Dining room seating' }
          ],
          categories: [{ _type: 'reference', _ref: await getDuxCategoryId() }],
          inStock: true,
          stock: 10
        };
      } else if (slug === 'superspider-sheepskin') {
        newProductData = {
          _type: 'product',
          name: 'Superspider Sheepskin',
          slug: { _type: 'slug', current: 'superspider-sheepskin' },
          description: 'This is a made to order item. Expected delivery time is approximately 8 weeks. The Superspider chair with genuine sheepskin upholstery combines luxury with comfort. Available in multiple sheepskin colors, this iconic chair features a distinctive spider-like base design that makes it a statement piece in any room.',
          price: 53815,
          brand: 'DUX',
          designer: 'DUX Design Team',
          subcategory: 'chairs',
          roomCategory: 'living',
          features: [
            'Made to order - Expected delivery time approximately 8 weeks',
            'Designed by DUX Design Team',
            'Genuine sheepskin upholstery',
            'Multiple sheepskin color options',
            'Distinctive spider-like base design',
            'Iconic statement piece',
            'Luxury comfort seating',
            'Perfect for living rooms and lounges'
          ],
          specifications: [
            { label: 'Designer', value: 'DUX Design Team' },
            { label: 'Manufacturer', value: 'DUX' },
            { label: 'Upholstery', value: 'Genuine Sheepskin' },
            { label: 'Available Colors', value: 'Scandinavian Grey 22, Black 01, Off-white 02, Cork 19, Drake 20, Mohawi 21' },
            { label: 'Base Design', value: 'Spider-like distinctive base' },
            { label: 'Style', value: 'Iconic luxury chair' },
            { label: 'Usage', value: 'Living room, lounge seating' }
          ],
          categories: [{ _type: 'reference', _ref: await getDuxCategoryId() }],
          inStock: true,
          stock: 10
        };
      }
      
      // Create the new product
      const newProduct = await client.create(newProductData);
      console.log(`✅ Created new product: ${newProduct._id}`);
    }
    
    console.log('\n🎉 Remaining Dux products have been fixed!');
    console.log('🔄 Now running the upload scripts again...');
    
  } catch (error) {
    console.error('❌ Fix failed:', error);
  }
}

async function getDuxCategoryId() {
  const category = await client.fetch('*[_type == "category" && slug.current == "dux"][0]');
  return category._id;
}

fixRemainingDuxProducts();
