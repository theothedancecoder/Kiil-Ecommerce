import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export interface VitraProduct {
  _id: string;
  _type: "product";
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
  variants?: Array<{
    _key: string;
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
  lifestyleImages?: Array<{
    asset?: {
      _id: string;
      url: string;
    };
  }>;
  stock?: number;
  inStock?: boolean;
  categories?: Array<{
    _id: string;
    title?: string;
    slug?: {
      _type: "slug";
      current?: string;
    };
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

// Query to get all Vitra products
const VITRA_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && brand == "Vitra"] | order(name asc) {
    _id,
    _type,
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
    variants[] {
      _key,
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
    stock,
    inStock,
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
 * Fetch all Vitra products from Sanity
 */
export async function getVitraProducts(): Promise<VitraProduct[]> {
  try {
    console.log('Fetching Vitra products from Sanity...');
    
    const products = await client.fetch(VITRA_PRODUCTS_QUERY);
    
    console.log(`Found ${products.length} Vitra products in Sanity`);
    
    return products;
  } catch (error) {
    console.error('Error fetching Vitra products:', error);
    return [];
  }
}

/**
 * Fetch a single Vitra product by slug
 */
export async function getVitraProductBySlug(slug: string): Promise<VitraProduct | null> {
  try {
    const product = await client.fetch(
      defineQuery(`
        *[_type == "product" && slug.current == $slug && brand == "Vitra"][0] {
          _id,
          _type,
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
          variants[] {
            _key,
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
          stock,
          inStock,
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
    console.error('Error fetching Vitra product by slug:', error);
    return null;
  }
}
