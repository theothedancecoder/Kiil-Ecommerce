import { client } from '@/sanity/lib/client';

export interface HomepageData {
  heroSection: {
    mainHeading: string;
    subHeading: string;
    description: string;
    heroImage: {
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
        heroSection {
          mainHeading,
          subHeading,
          description,
          heroImage {
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
