import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';

// Query for all RO Collection products
export async function getRoCollectionProducts(): Promise<RoCollectionProduct[]> {
  const query = `
    *[_type == "product" && "ro-collection" in categories[]->slug.current] | order(name asc) {
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
      roomCategory,
      subcategory
    }
  `;

  try {
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error('Error fetching RO Collection products:', error);
    return [];
  }
}

// Query for RO Collection dining tables
export async function getRoCollectionTables(): Promise<RoCollectionProduct[]> {
  const query = `
    *[_type == "product" && "ro-collection" in categories[]->slug.current && subcategory == "tables"] | order(name asc) {
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
      roomCategory,
      subcategory
    }
  `;

  try {
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error('Error fetching RO Collection tables:', error);
    return [];
  }
}

// Query for RO Collection dining chairs
export async function getRoCollectionChairs(): Promise<RoCollectionProduct[]> {
  const query = `
    *[_type == "product" && "ro-collection" in categories[]->slug.current && subcategory == "chairs"] | order(name asc) {
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
      roomCategory,
      subcategory
    }
  `;

  try {
    const products = await client.fetch(query);
    return products || [];
  } catch (error) {
    console.error('Error fetching RO Collection chairs:', error);
    return [];
  }
}

// Define the extended RO Collection product type
export interface RoCollectionProduct {
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
}

// Query for a single RO Collection product by slug
export async function getRoCollectionProductBySlug(slug: string): Promise<RoCollectionProduct | null> {
  const query = `
    *[_type == "product" && slug.current == $slug && "ro-collection" in categories[]->slug.current][0] {
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
      roomCategory,
      subcategory
    }
  `;

  try {
    const product = await client.fetch(query, { slug });
    return product || null;
  } catch (error) {
    console.error('Error fetching RO Collection product by slug:', error);
    return null;
  }
}
