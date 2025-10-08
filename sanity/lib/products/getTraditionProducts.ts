import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export interface TraditionProduct {
  _id: string;
  _type: string;
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
    image?: {
      asset?: {
        _id: string;
        url: string;
      };
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

const TRADITION_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && brand == "&Tradition"] | order(name asc) {
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
      image {
        asset-> {
          _id,
          url
        }
      }
    },
    stock,
    inStock,
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

export async function getTraditionProducts(): Promise<TraditionProduct[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
      console.log('Sanity environment variables not configured');
      return [];
    }
    
    const products = await client.fetch(TRADITION_PRODUCTS_QUERY);
    return products;
  } catch (error) {
    console.error('Error fetching &Tradition products:', error);
    return [];
  }
}

export async function getTraditionProductBySlug(slug: string): Promise<TraditionProduct | null> {
  try {
    const product = await client.fetch(
      defineQuery(`
        *[_type == "product" && slug.current == $slug && brand == "&Tradition"][0] {
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
            image {
              asset-> {
                _id,
                url
              }
            }
          },
          stock,
          inStock,
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
    console.error('Error fetching &Tradition product by slug:', error);
    return null;
  }
}
