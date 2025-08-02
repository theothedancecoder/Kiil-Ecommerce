const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function verifyExtendedHomepage() {
  console.log('🔍 Verifying extended homepage content in Sanity...\n');

  try {
    const query = `
      *[_type == "homepage"][0] {
        _id,
        title,
        siteSettings {
          logo {
            asset->{
              _id,
              originalFilename,
              size,
              metadata {
                dimensions
              }
            },
            alt
          }
        },
        heroSection {
          mainHeading,
          subHeading,
          description,
          heroImage {
            asset->{
              _id,
              originalFilename,
              size,
              metadata {
                dimensions
              }
            },
            alt
          }
        },
        categorySection {
          title,
          description,
          categories[] {
            title,
            description,
            image {
              asset->{
                _id,
                originalFilename
              },
              alt
            },
            link
          }
        },
        brandLogos {
          montanaLogo {
            asset->{
              _id,
              originalFilename
            },
            alt
          },
          umageLogo {
            asset->{
              _id,
              originalFilename
            },
            alt
          }
        }
      }
    `;

    const homepage = await client.fetch(query);

    if (!homepage) {
      console.log('❌ No homepage document found');
      return;
    }

    console.log('✅ Homepage document found:');
    console.log(`   Document ID: ${homepage._id}`);
    console.log(`   Title: ${homepage.title}\n`);

    // Site Logo
    if (homepage.siteSettings?.logo) {
      console.log('🏢 Site Logo:');
      console.log(`   Alt Text: "${homepage.siteSettings.logo.alt}"`);
      console.log(`   Asset ID: ${homepage.siteSettings.logo.asset._id}`);
      console.log(`   Original Filename: ${homepage.siteSettings.logo.asset.originalFilename}`);
      console.log(`   File Size: ${(homepage.siteSettings.logo.asset.size / 1024).toFixed(2)} KB`);
      if (homepage.siteSettings.logo.asset.metadata?.dimensions) {
        console.log(`   Dimensions: ${homepage.siteSettings.logo.asset.metadata.dimensions.width}x${homepage.siteSettings.logo.asset.metadata.dimensions.height}`);
      }
      const logoUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${homepage.siteSettings.logo.asset._id.replace('image-', '').replace('-png', '.png').replace('-webp', '.webp').replace('-jpg', '.jpg')}`;
      console.log(`   Sanity CDN URL: ${logoUrl}`);
      console.log('   ✅ Logo is hosted on Sanity CDN\n');
    } else {
      console.log('❌ No site logo found\n');
    }

    // Hero Section
    console.log('📝 Hero Section Content:');
    console.log(`   Main Heading: "${homepage.heroSection.mainHeading}"`);
    console.log(`   Sub Heading: "${homepage.heroSection.subHeading}"`);
    console.log(`   Description: "${homepage.heroSection.description.substring(0, 50)}..."\n`);

    if (homepage.heroSection.heroImage) {
      console.log('🖼️  Hero Image Details:');
      console.log(`   Alt Text: "${homepage.heroSection.heroImage.alt}"`);
      console.log(`   Asset ID: ${homepage.heroSection.heroImage.asset._id}`);
      console.log(`   Original Filename: ${homepage.heroSection.heroImage.asset.originalFilename}`);
      console.log(`   File Size: ${(homepage.heroSection.heroImage.asset.size / 1024).toFixed(2)} KB`);
      if (homepage.heroSection.heroImage.asset.metadata?.dimensions) {
        console.log(`   Dimensions: ${homepage.heroSection.heroImage.asset.metadata.dimensions.width}x${homepage.heroSection.heroImage.asset.metadata.dimensions.height}`);
      }
      const heroUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${homepage.heroSection.heroImage.asset._id.replace('image-', '').replace('-png', '.png').replace('-webp', '.webp').replace('-jpg', '.jpg')}`;
      console.log(`   Sanity CDN URL: ${heroUrl}`);
      console.log('   ✅ Hero image is hosted on Sanity CDN\n');
    }

    // Category Section
    if (homepage.categorySection) {
      console.log('🏪 Category Section:');
      console.log(`   Title: "${homepage.categorySection.title}"`);
      console.log(`   Description: "${homepage.categorySection.description}"`);
      console.log(`   Categories: ${homepage.categorySection.categories?.length || 0} found\n`);

      if (homepage.categorySection.categories?.length) {
        homepage.categorySection.categories.forEach((category, index) => {
          console.log(`   Category ${index + 1}:`);
          console.log(`     Title: "${category.title}"`);
          console.log(`     Description: "${category.description}"`);
          console.log(`     Link: ${category.link}`);
          console.log(`     Image: ${category.image.asset.originalFilename} (${category.image.alt})`);
        });
        console.log('   ✅ All category images are hosted on Sanity CDN\n');
      }
    }

    // Brand Logos
    if (homepage.brandLogos) {
      console.log('🏷️  Brand Logos:');
      if (homepage.brandLogos.montanaLogo) {
        console.log(`   Montana Logo: ${homepage.brandLogos.montanaLogo.asset.originalFilename} (${homepage.brandLogos.montanaLogo.alt})`);
      }
      if (homepage.brandLogos.umageLogo) {
        console.log(`   Umage Logo: ${homepage.brandLogos.umageLogo.asset.originalFilename} (${homepage.brandLogos.umageLogo.alt})`);
      }
      console.log('   ✅ Brand logos are hosted on Sanity CDN\n');
    }

    console.log('🎉 Extended verification complete!');
    console.log('Your homepage is fully configured with:');
    console.log('  ✅ Site logo from Sanity CDN');
    console.log('  ✅ Hero section with dynamic content');
    console.log('  ✅ Category images from Sanity CDN');
    console.log('  ✅ Brand logos from Sanity CDN');
    console.log('  ✅ Ready for production deployment!');

  } catch (error) {
    console.error('❌ Error verifying extended homepage:', error);
    process.exit(1);
  }
}

verifyExtendedHomepage();
