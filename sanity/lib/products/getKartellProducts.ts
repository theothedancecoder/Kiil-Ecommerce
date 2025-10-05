import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export interface KartellProduct {
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
  lifestyleImages?: Array<{
    asset?: {
      _id: string;
      url: string;
    };
  }>;
  variants?: Array<{
    _type: string;
    _key: string;
    name?: string;
    price?: number;
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

const KARTELL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && brand == "Kartell"] | order(name asc) {
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
    variants[] {
      _type,
      _key,
      name,
      price,
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

export async function getKartellProducts(): Promise<KartellProduct[]> {
  try {
    console.log('Fetching Kartell products from Sanity...');
    const products = await client.fetch(KARTELL_PRODUCTS_QUERY);
    console.log(`Found ${products.length} Kartell products in Sanity`);
    return products;
  } catch (error) {
    console.error('Error fetching Kartell products:', error);
    return [];
  }
}

export async function getKartellProductBySlug(slug: string): Promise<KartellProduct | null> {
  try {
    const product = await client.fetch(
      defineQuery(`
        *[_type == "product" && slug.current == $slug && brand == "Kartell"][0] {
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
          variants[] {
            _type,
            _key,
            name,
            price,
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
    console.error('Error fetching Kartell product by slug:', error);
    return null;
  }
}
