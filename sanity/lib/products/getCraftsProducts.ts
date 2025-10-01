import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

// Define the Crafts product interface
export interface CraftsProduct {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: {
    _type: "slug";
    current?: string;
  };
  description?: string;
  price?: number;
  brand?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
    };
  };
  lifestyleImages?: Array<{
    asset?: {
      _id: string;
      url: string;
    };
  }>;
  variants?: Array<{
    _type: string;
    name?: string;
    price?: number;
    material?: string;
    color?: string;
    size?: string;
    image?: {
      asset?: {
        _id: string;
        url: string;
      };
    };
  }>;
  stock?: number;
  inStock?: boolean;
  href?: string;
  categories?: Array<{
    _id: string;
    title?: string;
    slug?: {
      _type: "slug";
      current?: string;
    };
  }>;
  designer?: string;
  features?: string[];
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  relatedProducts?: Array<{
    _id: string;
    name?: string;
    slug?: {
      _type: "slug";
      current?: string;
    };
    price?: number;
    image?: {
      asset?: {
        _id: string;
        url: string;
      };
    };
  }>;
}

// Query to get all Crafts products
const CRAFTS_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && brand == "Crafts"] | order(name asc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    slug,
    description,
    price,
    brand,
    image {
      asset-> {
        _id,
        url
      }
    },
    lifestyleImages[] {
      asset-> {
        _id,
        url
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    variants[] {
      _type,
      name,
      price,
      material,
      color,
      size,
      image {
        asset-> {
          _id,
          url
        }
      }
    },
    stock,
    inStock,
    href,
    designer,
    features,
    specifications[] {
      label,
      value
    },
    relatedProducts[]-> {
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
  }
`);

/**
 * Fetch all Crafts products from Sanity
 */
export async function getCraftsProducts(): Promise<CraftsProduct[]> {
  try {
    // Check if required environment variables are available
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
      console.log('Sanity environment variables not configured, skipping Sanity fetch');
      return [];
    }
    
    console.log('Fetching Crafts products from Sanity...');
    
    const products = await client.fetch(CRAFTS_PRODUCTS_QUERY);
    
    console.log(`Found ${products.length} Crafts products in Sanity`);
    
    return products;
  } catch (error) {
    console.error('Error fetching Crafts products:', error);
    return [];
  }
}

/**
 * Fetch a single Crafts product by slug
 */
export async function getCraftsProductBySlug(slug: string): Promise<CraftsProduct | null> {
  try {
    const product = await client.fetch(
      defineQuery(`
        *[_type == "product" && slug.current == $slug && brand == "Crafts"][0] {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          _rev,
          name,
          slug,
          description,
          price,
          brand,
          image {
            asset-> {
              _id,
              url
            }
          },
          lifestyleImages[] {
            asset-> {
              _id,
              url
            }
          },
          categories[]-> {
            _id,
            title,
            slug
          },
          variants[] {
            _type,
            name,
            price,
            material,
            color,
            size,
            image {
              asset-> {
                _id,
                url
              }
            }
          },
          stock,
          inStock,
          href,
          designer,
          features,
          specifications[] {
            label,
            value
          },
          relatedProducts[]-> {
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
        }
      `),
      { slug }
    );
    return product || null;
  } catch (error) {
    console.error('Error fetching Crafts product by slug:', error);
    return null;
  }
}
