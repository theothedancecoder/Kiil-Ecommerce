import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';

// Define the FLOS product type
export interface FlosProduct {
  _id: string;
  _type: "product";
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
    base?: string;
    leather?: string;
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
  roomCategory?: string;
  subcategory?: string;
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

// Query to get all FLOS products
const FLOS_PRODUCTS_QUERY = `
  *[_type == "product" && references(*[_type == "category" && title == "FLOS"]._id)] | order(name asc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    slug,
    description,
    price,
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
    categories[]->{
      _id,
      title,
      slug
    },
    brand,
    designer,
    href,
    variants[] {
      _type,
      name,
      price,
      material,
      color,
      size,
      base,
      leather,
      image {
        asset-> {
          _id,
          url
        }
      }
    },
    inStock,
    featured,
    stock,
    roomCategory,
    subcategory,
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
`;

// Query to get FLOS categories
const FLOS_CATEGORIES_QUERY = `
  *[_type == "category" && (title == "FLOS" || title == "Lighting")] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

/**
 * Fetch all FLOS products from Sanity
 */
export async function getFlosProducts(): Promise<FlosProduct[]> {
  try {
    console.log('Fetching FLOS products from Sanity...');
    
    const products = await client.fetch<FlosProduct[]>(FLOS_PRODUCTS_QUERY);
    
    console.log(`Found ${products.length} FLOS products in Sanity`);
    
    return products;
  } catch (error) {
    console.error('Error fetching FLOS products:', error);
    return [];
  }
}

/**
 * Fetch FLOS categories from Sanity
 */
export async function getFlosCategories() {
  try {
    const categories = await client.fetch(FLOS_CATEGORIES_QUERY);
    return categories;
  } catch (error) {
    console.error('Error fetching FLOS categories:', error);
    return [];
  }
}

/**
 * Fetch a single FLOS product by ID
 */
export async function getFlosProduct(productId: string): Promise<FlosProduct | null> {
  try {
    const product = await client.fetch<FlosProduct>(
      `*[_type == "product" && _id == $productId && references(*[_type == "category" && title == "FLOS"]._id)][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        slug,
        description,
        price,
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
        categories[]->{
          _id,
          title,
          slug
        },
        brand,
        designer,
        href,
        variants[] {
          _type,
          name,
          price,
          material,
          color,
          size,
          base,
          leather,
          image {
            asset-> {
              _id,
              url
            }
          }
        },
        inStock,
        featured,
        stock,
        roomCategory,
        subcategory,
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
      }`,
      { productId }
    );
    
    return product || null;
  } catch (error) {
    console.error(`Error fetching FLOS product ${productId}:`, error);
    return null;
  }
}

/**
 * Fetch a single FLOS product by slug - MISSING FUNCTION ADDED
 */
export async function getFlosProductBySlug(slug: string): Promise<FlosProduct | null> {
  const query = `
    *[_type == "product" && slug.current == $slug && references(*[_type == "category" && title == "FLOS"]._id)][0] {
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
        base,
        leather,
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
      roomCategory,
      subcategory,
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
  `;

  try {
    const product = await client.fetch(query, { slug });
    return product || null;
  } catch (error) {
    console.error('Error fetching FLOS product by slug:', error);
    return null;
  }
}

/**
 * Fetch FLOS products by category
 */
export async function getFlosProductsByCategory(categoryTitle: string): Promise<FlosProduct[]> {
  try {
    const products = await client.fetch<FlosProduct[]>(
      `*[_type == "product" && references(*[_type == "category" && title == $categoryTitle]._id) && references(*[_type == "category" && title == "FLOS"]._id)] | order(name asc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        name,
        slug,
        description,
        price,
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
        categories[]->{
          _id,
          title,
          slug
        },
        brand,
        designer,
        href,
        variants[] {
          _type,
          name,
          price,
          material,
          color,
          size,
          base,
          leather,
          image {
            asset-> {
              _id,
              url
            }
          }
        },
        inStock,
        featured,
        stock,
        roomCategory,
        subcategory,
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
      }`,
      { categoryTitle }
    );
    
    return products;
  } catch (error) {
    console.error(`Error fetching FLOS products by category ${categoryTitle}:`, error);
    return [];
  }
}
