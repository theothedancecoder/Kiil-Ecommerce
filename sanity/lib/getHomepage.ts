import { client } from '@/sanity/lib/client';

export interface HomepageData {
  _id: string;
  title: string;
  siteSettings?: {
    logo?: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt: string;
    };
  };
  heroSection: {
    mainHeading: string;
    subHeading: string;
    description: string;
    heroImage?: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt: string;
    };
  };
  categorySection?: {
    title: string;
    description: string;
    categories: Array<{
      title: string;
      description: string;
      image: {
        asset: {
          _ref: string;
          _type: string;
        };
        alt: string;
      };
      link: string;
    }>;
  };
  brandLogos?: {
    montanaLogo?: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt: string;
    };
    umageLogo?: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt: string;
    };
  };
}

export async function getHomepage(): Promise<HomepageData | null> {
  try {
    const query = `
      *[_type == "homepage"][0] {
        _id,
        title,
        siteSettings {
          logo {
            asset,
            alt
          }
        },
        heroSection {
          mainHeading,
          subHeading,
          description,
          heroImage {
            asset,
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
              asset,
              alt
            },
            link
          }
        },
        brandLogos {
          montanaLogo {
            asset,
            alt
          },
          umageLogo {
            asset,
            alt
          }
        }
      }
    `;
    
    const homepage = await client.fetch(query);
    return homepage || null;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}
