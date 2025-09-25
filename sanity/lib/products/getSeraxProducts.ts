import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

// Define the Serax product interface
export interface SeraxProduct {
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

// Query to get all Serax products
const SERAX_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && brand == "Serax"] | order(name asc) {
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

// Query for a single Serax product by slug
const SERAX_PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug && brand == "Serax"][0] {
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
 * Fetch all Serax products from Sanity
 */
export async function getSeraxProducts(): Promise<SeraxProduct[]> {
  try {
    console.log('Fetching Serax products from Sanity...');
    
    const products = await client.fetch(SERAX_PRODUCTS_QUERY);
    
    console.log(`Found ${products.length} Serax products in Sanity`);
    
    return products;
  } catch (error) {
    console.error('Error fetching Serax products:', error);
    return [];
  }
}

/**
 * Fetch Serax categories from Sanity - extract from products
 */
export async function getSeraxCategories() {
  try {
    const products = await getSeraxProducts();
    
    // Extract all categories from all products and flatten
    const allCategories = products.flatMap(product => product.categories || []);
    
    // Remove duplicates by title
    const uniqueCategories = allCategories.filter((category, index, self) => 
      index === self.findIndex(c => c.title === category.title)
    );
    
    return uniqueCategories;
  } catch (error) {
    console.error('Error fetching Serax categories:', error);
    return [];
  }
}

/**
 * Fetch a single Serax product by slug
 */
export async function getSeraxProductBySlug(slug: string): Promise<SeraxProduct | null> {
  try {
    const product = await client.fetch(SERAX_PRODUCT_BY_SLUG_QUERY, { slug });
    return product || null;
  } catch (error) {
    console.error('Error fetching Serax product by slug:', error);
    return null;
  }
}

/**
 * Fetch Serax products by category
 */
export async function getSeraxProductsByCategory(categoryTitle: string): Promise<SeraxProduct[]> {
  try {
    const products = await client.fetch(
      defineQuery(`
        *[_type == "product" && references(*[_type == "category" && title == $categoryTitle]._id) && brand == "Serax"] | order(name asc) {
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
      { categoryTitle }
    );
    
    return products;
  } catch (error) {
    console.error(`Error fetching Serax products by category ${categoryTitle}:`, error);
    return [];
  }
}
