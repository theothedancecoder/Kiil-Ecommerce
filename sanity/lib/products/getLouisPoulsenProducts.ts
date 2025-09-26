import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

// Define the Louis Poulsen product interface
export interface LouisPoulsenProduct {
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

// Query to get all Louis Poulsen products
const LOUIS_POULSEN_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && brand == "Louis Poulsen"] | order(name asc) {
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
 * Fetch all Louis Poulsen products from Sanity
 */
export async function getLouisPoulsenProducts(): Promise<LouisPoulsenProduct[]> {
  try {
    // Check if required environment variables are available
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
      console.log('Sanity environment variables not configured, skipping Sanity fetch');
      return [];
    }
    
    console.log('Fetching Louis Poulsen products from Sanity...');
    
    const products = await client.fetch(LOUIS_POULSEN_PRODUCTS_QUERY);
    
    console.log(`Found ${products.length} Louis Poulsen products in Sanity`);
    
    return products;
  } catch (error) {
    console.error('Error fetching Louis Poulsen products:', error);
    return [];
  }
}

/**
 * Fetch a single Louis Poulsen product by slug
 */
export async function getLouisPoulsenProductBySlug(slug: string): Promise<LouisPoulsenProduct | null> {
  try {
    const product = await client.fetch(
      defineQuery(`
        *[_type == "product" && slug.current == $slug && brand == "Louis Poulsen"][0] {
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
    console.error('Error fetching Louis Poulsen product by slug:', error);
    return null;
  }
}
