const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-06-13',
  useCdn: false,
});

async function verifyHomepageContent() {
  try {
    console.log('🔍 Verifying homepage content in Sanity...\n');
    
    // Fetch homepage data
    const query = `
      *[_type == "homepage"][0] {
        _id,
        title,
        heroSection {
          mainHeading,
          subHeading,
          description,
          heroImage {
            asset->{
              _id,
              url,
              originalFilename,
              size,
              metadata {
                dimensions {
                  width,
                  height
                }
              }
            },
            alt
          }
        }
      }
    `;
    
    const homepage = await client.fetch(query);
    
    if (!homepage) {
      console.log('❌ No homepage content found in Sanity');
      console.log('Run: npm run setup:homepage to create homepage content');
      return;
    }
    
    console.log('✅ Homepage document found:');
    console.log(`   Document ID: ${homepage._id}`);
    console.log(`   Title: ${homepage.title}`);
    
    if (homepage.heroSection) {
      console.log('\n📝 Hero Section Content:');
      console.log(`   Main Heading: "${homepage.heroSection.mainHeading}"`);
      console.log(`   Sub Heading: "${homepage.heroSection.subHeading}"`);
      console.log(`   Description: "${homepage.heroSection.description.substring(0, 50)}..."`);
      
      if (homepage.heroSection.heroImage) {
        console.log('\n🖼️  Hero Image Details:');
        console.log(`   Alt Text: "${homepage.heroSection.heroImage.alt}"`);
        
        if (homepage.heroSection.heroImage.asset) {
          const asset = homepage.heroSection.heroImage.asset;
          console.log(`   Asset ID: ${asset._id}`);
          console.log(`   Original Filename: ${asset.originalFilename}`);
          console.log(`   File Size: ${(asset.size / 1024).toFixed(2)} KB`);
          console.log(`   Dimensions: ${asset.metadata.dimensions.width}x${asset.metadata.dimensions.height}`);
          console.log(`   Sanity CDN URL: ${asset.url}`);
          
          // Verify the URL is from Sanity CDN
          if (asset.url.includes('cdn.sanity.io')) {
            console.log('   ✅ Image is hosted on Sanity CDN');
          } else {
            console.log('   ⚠️  Image URL does not appear to be from Sanity CDN');
          }
        } else {
          console.log('   ❌ No image asset found');
        }
      } else {
        console.log('   ❌ No hero image found');
      }
    } else {
      console.log('❌ No hero section found');
    }
    
    console.log('\n🎉 Verification complete!');
    console.log('Your homepage is configured to load content from Sanity.');
    console.log('When deployed to production, it will use this Sanity content.');
    
  } catch (error) {
    console.error('❌ Error verifying homepage content:', error);
  }
}

verifyHomepageContent();
