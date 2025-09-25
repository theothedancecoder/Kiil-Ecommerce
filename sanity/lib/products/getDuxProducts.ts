import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';

// Query for all Dux products
export async function getDuxProducts(): Promise<DuxProduct[]> {
  const query = `
    *[_type == "product" && brand == "DUX"] | order(name asc) {
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
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error('Error fetching Dux products:', error);
    return [];
  }
}

// Query for Dux tables
export async function getDuxTables(): Promise<DuxProduct[]> {
  const query = `
    *[_type == "product" && brand == "DUX" && subcategory == "tables"] | order(name asc) {
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
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error('Error fetching Dux tables:', error);
    return [];
  }
}

// Query for Dux chairs
export async function getDuxChairs(): Promise<DuxProduct[]> {
  const query = `
    *[_type == "product" && brand == "DUX" && subcategory == "chairs"] | order(name asc) {
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
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error('Error fetching Dux chairs:', error);
    return [];
  }
}

// Define the Dux product type
export interface DuxProduct {
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

// Query for a single Dux product by slug
export async function getDuxProductBySlug(slug: string): Promise<DuxProduct | null> {
  const query = `
    *[_type == "product" && slug.current == $slug && brand == "DUX"][0] {
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
    console.error('Error fetching Dux product by slug:', error);
    return null;
  }
}
