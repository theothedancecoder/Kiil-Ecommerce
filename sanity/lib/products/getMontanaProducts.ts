import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export interface MontanaProduct {
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
}

const MONTANA_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && brand == "Montana"] | order(name asc) {
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
    designer,
    features,
    specifications[] {
      label,
      value
    }
  }
`);

export async function getMontanaProducts(): Promise<MontanaProduct[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
      console.log('Sanity environment variables not configured');
      return [];
    }
    
    const products = await client.fetch(MONTANA_PRODUCTS_QUERY);
    return products;
  } catch (error) {
    console.error('Error fetching Montana products:', error);
    return [];
  }
}

export async function getMontanaProductBySlug(slug: string): Promise<MontanaProduct | null> {
  try {
    const product = await client.fetch(
      defineQuery(`
        *[_type == "product" && slug.current == $slug && brand == "Montana"][0] {
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
          designer,
          features,
          specifications[] {
            label,
            value
          }
        }
      `),
      { slug }
    );
    return product || null;
  } catch (error) {
    console.error('Error fetching Montana product by slug:', error);
    return null;
  }
}
