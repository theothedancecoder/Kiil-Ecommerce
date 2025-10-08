import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// Helper to upload image to Sanity
async function uploadImageToSanity(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error.message);
    return null;
  }
}

// Helper to get or create category
async function ensureCategory(title) {
  const existing = await client.fetch(
    `*[_type == "category" && title == $title][0]`,
    { title }
  );

  if (existing) {
    return existing._id;
  }

  const category = await client.create({
    _type: 'category',
    title: title,
    slug: {
      _type: 'slug',
      current: title.toLowerCase().replace(/\s+/g, '-')
    }
  });

  return category._id;
}

async function migrateTraditionProducts() {
  try {
    console.log('🚀 Migrating &Tradition products to Sanity...\n');
    console.log('='.repeat(60) + '\n');

    const products = [
      {
        name: 'Flower Pot VP9 Battery Lamp',
        slug: 'flowerpot-vp9-battery',
        description: 'Iconic portable table lamp with rechargeable battery and magnetic charging cable. Perfect for indoor and outdoor use.',
        price: 1995,
        category: 'Lighting',
        designer: 'Verner Panton',
        dir: 'Flower-Pot-VP9-battery',
        variants: [
          { name: 'Matt White', color: 'Matt White', price: 1995, image: 'Flower Pot VP9 battery kr 1 995  Farge - Matt White.jpg' },
          { name: 'Matt Black', color: 'Matt Black', price: 1995, image: 'Flower Pot VP9 battery kr 1 995  Farge - Matt Black.jpg' },
          { name: 'Cobalt Blue', color: 'Cobalt Blue', price: 1995, image: 'Flower Pot VP9 battery kr 1 995  Farge - Cobalt Blue.jpg' },
          { name: 'Vermilion Red', color: 'Vermilion Red', price: 1995, image: 'Flower Pot VP9 battery kr 1 995  Farge - Vermilion Red.jpg' },
          { name: 'Mustard', color: 'Mustard', price: 1995, image: 'Flower Pot VP9 battery kr 1 995  Farge - Mustard.jpg' },
          { name: 'Signal Green', color: 'Signal Green', price: 1995, image: 'Flower Pot VP9 battery kr 1 995  Farge - Signal Green.jpg' },
          { name: 'Brass-Plated', color: 'Brass-Plated', price: 2995, image: '&Tradition Flower Pot VP9 battery kr 2 995  Farge - Brass-Plated.jpg' },
          { name: 'Chrome-Plated', color: 'Chrome-Plated', price: 2995, image: 'Flower Pot VP9 battery kr 2 995  Farge - Chrome-Plated.jpg' },
        ]
      },
      {
        name: 'Flowerpot Floor Lamp',
        slug: 'flowerpot-floor-lamp',
        description: 'Classic floor lamp with the iconic Flowerpot design. A timeless piece that brings retro charm to any space.',
        price: 6855,
        category: 'Lighting',
        designer: 'Verner Panton',
        dir: 'Flowerpot-floor-lamp',
        variants: [
          { name: 'Matt Black', color: 'Matt Black', price: 6855, image: 'Flowerpot gulvlampe kr 6 855  Farge - Matt Black.jpg' },
          { name: 'Grey Beige', color: 'Grey Beige', price: 6855, image: 'Flowerpot gulvlampe kr 6 855  Farge - Grey Beige.jpg' },
          { name: 'Cobalt Blue', color: 'Cobalt Blue', price: 6855, image: 'Flowerpot floor lamp NOK  6,855  Color -  Cobalt Blue.jpg' },
          { name: 'Chrome Plated', color: 'Chrome Plated', price: 8575, image: 'Flowerpot floor lamp NOK  8,575  Color -  Chrome plated.jpg' },
        ]
      },
      {
        name: 'Flowerpot VP1 Pendant Lamp',
        slug: 'flowerpot-vp1',
        description: 'Iconic pendant lamp designed by Verner Panton. The perfect combination of form and function with vibrant color options.',
        price: 2565,
        category: 'Lighting',
        designer: 'Verner Panton',
        dir: 'Flowerpot-VP1',
        variants: [
          { name: 'Matt White', color: 'Matt White', price: 2565, image: 'Flowerpot VP1 kr 2 565  Farge - Matt White.jpg' },
          { name: 'Matt Black', color: 'Matt Black', price: 2565, image: 'Flowerpot VP1 kr 2 565  Farge - Matt Black.jpg' },
          { name: 'Cobalt Blue', color: 'Cobalt Blue', price: 2565, image: 'Flowerpot VP1 kr 2 565  Farge - Cobalt Blue.jpg' },
          { name: 'Vermilion Red', color: 'Vermilion Red', price: 2565, image: 'Flowerpot VP1 kr 2 565  Farge - Vermilion Red.jpg' },
          { name: 'Mustard', color: 'Mustard', price: 2565, image: 'Flowerpot VP1 kr 2 565  Farge - Mustard.jpg' },
          { name: 'Signal Green', color: 'Signal Green', price: 2565, image: 'Flowerpot VP1 kr 2 565  Farge - Signal Green.jpg' },
          { name: 'Brass-Plated', color: 'Brass-Plated', price: 3570, image: 'Flowerpot VP1 NOK  3,570  Color -  Brass-Plated.jpg' },
          { name: 'Chrome-Plated', color: 'Chrome-Plated', price: 3570, image: 'Flowerpot VP1 kr 3 570  Farge - Chrome-Plated.jpg' },
        ]
      },
      {
        name: 'Flowerpot VP3 Table Lamp',
        slug: 'flowerpot-vp3',
        description: 'Table lamp version of the iconic Flowerpot design. Perfect for desks, bedside tables, and accent lighting.',
        price: 3280,
        category: 'Lighting',
        designer: 'Verner Panton',
        dir: 'Flowerpot-VP3-table-lamp',
        variants: [
          { name: 'Matt White', color: 'Matt White', price: 3280, image: 'Flowerpot VP3 bordlampe fra AndTradition kr 3 280  Farge - Matt White.jpg' },
          { name: 'Matt Black', color: 'Matt Black', price: 3280, image: 'Flowerpot VP3 bordlampe fra AndTradition kr 3 280  Farge - Matt Black.jpg' },
          { name: 'Cobalt Blue', color: 'Cobalt Blue', price: 3280, image: 'Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Cobalt Blue.jpg' },
          { name: 'Vermilion Red', color: 'Vermilion Red', price: 3280, image: 'Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Vermilion Red.jpg' },
          { name: 'Mustard', color: 'Mustard', price: 3280, image: 'Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Mustard.jpg' },
          { name: 'Signal Green', color: 'Signal Green', price: 3280, image: 'Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Signal Green.jpg' },
          { name: 'Brass-Plated', color: 'Brass-Plated', price: 5000, image: 'Flowerpot VP3 table lamp from AndTradition NOK  5,000  Color -  Brass-Plated.jpg' },
          { name: 'Chrome-Plated', color: 'Chrome-Plated', price: 5000, image: 'Flowerpot VP3 table lamp from AndTradition NOK  5,000  Color -  Chrome-Plated.jpg' },
        ]
      },
      {
        name: 'Flowerpot VP7 Pendant Lamp',
        slug: 'flowerpot-vp7',
        description: 'Large pendant version of the iconic Flowerpot design. Perfect for dining areas and making a bold statement.',
        price: 4140,
        category: 'Lighting',
        designer: 'Verner Panton',
        dir: 'Flowerpot-VP7 ',
        variants: [
          { name: 'Matt White', color: 'Matt White', price: 4140, image: 'Flowerpot VP7 kr 4 140  Farge - Matt White.jpg' },
          { name: 'Matt Black', color: 'Matt Black', price: 4140, image: 'Flowerpot VP7 NOK  4,140  Color -  Matt Black.jpg' },
          { name: 'Cobalt Blue', color: 'Cobalt Blue', price: 4140, image: 'Flowerpot VP7 kr 4 140  Farge - Cobalt Blue.jpg' },
          { name: 'Vermilion Red', color: 'Vermilion Red', price: 4140, image: 'Flowerpot VP7 kr 4 140  Farge - Vermilion Red.jpg' },
          { name: 'Mustard', color: 'Mustard', price: 4140, image: 'Flowerpot VP7 kr 4 140  Farge - Mustard.jpg' },
          { name: 'Signal Green', color: 'Signal Green', price: 4140, image: 'Flowerpot VP7 kr 4 140  Farge - Signal Green.jpg' },
          { name: 'Black & White Pattern', color: 'Black & White Pattern', price: 6430, image: 'Flowerpot VP7 NOK  6,430  Color -  Black & White Pattern.jpg' },
        ]
      },
      {
        name: 'Flowerpot VP10 Wall Lamp',
        slug: 'flowerpot-vp10',
        description: 'Wall-mounted version of the iconic Flowerpot design. Perfect for accent lighting and space-saving solutions.',
        price: 2140,
        category: 'Lighting',
        designer: 'Verner Panton',
        dir: 'Flowerpot-VP10',
        variants: [
          { name: 'Matt White', color: 'Matt White', price: 2140, image: 'Flowerpot VP10 kr 2 140  Farge - Matt White.jpg' },
          { name: 'Matt Black', color: 'Matt Black', price: 2140, image: 'Flowerpot VP10 kr 2 140  Farge - Matt Black.jpg' },
          { name: 'Cobalt Blue', color: 'Cobalt Blue', price: 1712, image: 'Flowerpot VP10 kr  1 712  Color -  Cobalt Blue.jpg' },
          { name: 'Vermilion Red', color: 'Vermilion Red', price: 2140, image: 'Flowerpot VP10 NOK  2,140  Color -  Vermilion Red.jpg' },
          { name: 'Mustard', color: 'Mustard', price: 2140, image: 'Flowerpot VP10 NOK  2,140  Color -  Mustard.jpg' },
          { name: 'Signal Green', color: 'Signal Green', price: 2140, image: 'Flowerpot VP10 kr 2 140  Farge - Signal Green.jpg' },
          { name: 'Brass-Plated', color: 'Brass-Plated', price: 2995, image: 'Flowerpot VP10 NOK  2,995  Color -  Brass-Plated.jpg' },
          { name: 'Chrome-Plated', color: 'Chrome-Plated', price: 2396, image: 'Flowerpot VP10 kr  2 396  Color -  Chrome-Plated.jpg' },
        ]
      },
      {
        name: 'In Between Coffee Table SK24',
        slug: 'in-between-coffee-table-sk24',
        description: 'Elegant coffee table with clean lines and premium wood construction. Perfect centerpiece for modern living rooms.',
        price: 6715,
        category: 'Tables',
        designer: 'Sami Kallio',
        dir: 'In-Between-coffee-table',
        variants: [
          { name: 'Oiled Oak', material: 'Oiled Oak', price: 6715, image: 'In Between coffee table SK24 NOK  6,715  Color -  Oiled oak.webp' },
          { name: 'Smoked Oiled Oak', material: 'Smoked Oiled Oak', price: 6715, image: 'In Between coffee table SK24 NOK  6,715  Color -  Smoked oiled oak.webp' },
          { name: 'Black Lacquered Oak', material: 'Black Lacquered Oak', price: 6715, image: 'In Between sofabord SK24 kr 6 715  Farge - Sortlakkert eik.webp' },
        ]
      },
      {
        name: 'Little Petra VB1 Chair',
        slug: 'little-petra-vb1',
        description: 'Comfortable lounge chair with organic form and premium upholstery. A modern classic that combines comfort with sophisticated design.',
        price: 32885,
        category: 'Seating',
        designer: 'Viggo Boesen',
        dir: 'Little-Petra-vb1',
        variants: [
          { name: 'Oiled Oak - Hallingdal 130', material: 'Oiled Oak', price: 32885, image: 'Little Petra vb1 from AndTradition NOK  32,885  Color -  Oiled oak:Hallingdal 130.jpg' },
          { name: 'Oiled Walnut - Hallingdal 130', material: 'Oiled Walnut', price: 32885, image: 'Little Petra vb1 from AndTradition NOK  32,885  Color -  Oiled walnut:Hallingdal 130.jpg' },
          { name: 'Oiled Walnut - Ectriture 0640', material: 'Oiled Walnut', price: 34315, image: 'Little Petra vb1 from AndTradition NOK  34,315  Color -  Oiled walnut:Ectriture 0640.jpg' },
          { name: 'Oiled Oak - Karakorum 003', material: 'Oiled Oak', price: 35745, image: 'Little Petra vb1 from AndTradition NOK  35,745  Color -  Oiled oak:Karakorum 003.jpg' },
          { name: 'Oiled Oak - Sheepskin Moonlight', material: 'Oiled Oak', price: 48615, image: 'Little Petra vb1 from AndTradition NOK  48,615  Color -  Oiled oak:sheepskin Moonlight.jpg' },
          { name: 'Oiled Oak - Sheepskin Sahara', material: 'Oiled Oak', price: 48615, image: 'Little Petra vb1 from AndTradition NOK  48,615  Color -  Oiled oak:sheepskin Sahara.jpg' },
        ]
      },
      {
        name: 'Pavilion AV17 Desk',
        slug: 'pavilion-av17-desk',
        description: 'Elegant desk with linoleum surface and chrome base. Perfect for modern offices and home workspaces.',
        price: 15725,
        category: 'Desks',
        designer: 'Anderssen & Voll',
        dir: 'Pavilion-AV17-Desk ',
        variants: [
          { name: 'Mushroom Linoleum - Oak & Chrome', material: 'Oak & Chrome', price: 15725, image: 'Pavilion AV17 Desk NOK  15,725  Color -  Mushroom Linoleum (4176) w. lacquered oak & chrome base.jpg' },
          { name: 'Iron Linoleum - Walnut & Chrome', material: 'Walnut & Chrome', price: 15725, image: 'Pavilion AV17 Desk NOK  15,725  Color -  Iron Linoleum (4178) w. lacquered walnut & chrome base.jpg' },
        ]
      },
      {
        name: 'RFH Armchair RD7',
        slug: 'rfh-armchair-rd7',
        description: 'Classic armchair with walnut and beech veneer construction. Comfortable seating with timeless Scandinavian design.',
        price: 7860,
        category: 'Seating',
        designer: 'Rolf Hesland',
        dir: 'RFH-Armchair-RD7',
        variants: [
          { name: 'Walnut & Beech - Hallingdal 103', material: 'Walnut & Beech', price: 7860, image: 'RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 103.jpg' },
          { name: 'Walnut & Beech - Hallingdal 227', material: 'Walnut & Beech', price: 7860, image: 'RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 227.jpg' },
        ]
      },
    ];

    for (const productData of products) {
      try {
        console.log(`\n📦 Processing: ${productData.name}`);

        // Check if product already exists
        const existing = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug: productData.slug }
        );

        if (existing) {
          console.log(`   ⏭️  Product already exists, skipping...`);
          continue;
        }

        const productDir = path.join('public/&Tradition', productData.dir);
        
        if (!fs.existsSync(productDir)) {
          console.log(`   ❌ Directory not found: ${productDir}`);
          continue;
        }

        // Get category
        const categoryId = await ensureCategory(productData.category);

        // Upload main image (first variant)
        const mainImagePath = path.join(productDir, productData.variants[0].image);
        console.log(`   Uploading main image...`);
        const mainImageId = await uploadImageToSanity(mainImagePath);

        if (!mainImageId) {
          console.log(`   ❌ Failed to upload main image, skipping...`);
          continue;
        }

        // Upload variant images
        const variants = [];
        for (const variantData of productData.variants) {
          const variantImagePath = path.join(productDir, variantData.image);
          
          if (!fs.existsSync(variantImagePath)) {
            console.log(`   ⚠️  Variant image not found: ${variantData.image}`);
            continue;
          }

          const variantImageId = await uploadImageToSanity(variantImagePath);
          
          if (variantImageId) {
            variants.push({
              _type: 'variant',
              _key: `variant-${variants.length}`,
              name: variantData.name,
              color: variantData.color || undefined,
              material: variantData.material || undefined,
              price: variantData.price,
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: variantImageId
                }
              }
            });
          }
        }

        console.log(`   Uploaded ${variants.length} variants`);

        // Check for lifestyle images
        const lifestyleDir = path.join(productDir, 'lifestyle');
        const lifestyleImages = [];
        
        if (fs.existsSync(lifestyleDir)) {
          const lifestyleFiles = fs.readdirSync(lifestyleDir)
            .filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));
          
          for (const file of lifestyleFiles.slice(0, 3)) {
            const lifestyleImagePath = path.join(lifestyleDir, file);
            const lifestyleImageId = await uploadImageToSanity(lifestyleImagePath);
            
            if (lifestyleImageId) {
              lifestyleImages.push({
                _type: 'image',
                _key: `lifestyle-${lifestyleImages.length}`,
                asset: {
                  _type: 'reference',
                  _ref: lifestyleImageId
                }
              });
            }
          }
          
          console.log(`   Uploaded ${lifestyleImages.length} lifestyle images`);
        }

        // Create the product
        const product = {
          _type: 'product',
          name: productData.name,
          slug: {
            _type: 'slug',
            current: productData.slug
          },
          brand: '&Tradition',
          description: productData.description,
          price: productData.price,
          designer: productData.designer,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: mainImageId
            }
          },
          variants: variants,
          lifestyleImages: lifestyleImages.length > 0 ? lifestyleImages : undefined,
          categories: [
            {
              _type: 'reference',
              _ref: categoryId,
              _key: `category-${Date.now()}`
            }
          ],
          inStock: true,
          stock: 10
        };

        const created = await client.create(product);
        console.log(`   ✅ Created product: ${created._id}`);

      } catch (error) {
        console.error(`   ❌ Error creating ${productData.name}:`, error.message);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n✅ &Tradition migration complete!\n');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

migrateTraditionProducts()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
