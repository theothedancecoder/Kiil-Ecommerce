import { defineQuery } from "next-sanity";
import { client } from '../client';

// Define the FLOS product type
export interface FlosProduct {
  _id: string;
  name?: string;
  slug?: {
    current?: string;
  };
  description?: string | Array<{
    _key?: string;
    _type?: string;
    children?: Array<{
      text?: string;
      _key?: string;
      _type?: string;
    }>;
    style?: string;
  }>;
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

// Get all FLOS products
export const getFlosProducts = async () => {
  const FLOS_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && brand == "FLOS"] {
    _id,
    name,
    slug,
    image {
      ...,
      asset->
    },
    description,
    price,
    brand,
    categories[]->{
      _id,
      title,
      slug
    },
    href,
    variants[] {
      name,
      image {
        ...,
        asset->
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      ...,
      asset->
    },
    roomCategory,
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
        ...,
        asset->
      }
    }
  } | order(name asc)`);

  try {
    console.log('Fetching FLOS products from Sanity...');
    const result = await client.fetch(FLOS_PRODUCTS_QUERY);
    console.log(`Found ${result?.length || 0} FLOS products in Sanity`);
    return result || [];
  } catch (error) {
    console.error('Error fetching FLOS products:', error);
    return [];
  }
};

// Get single FLOS product by slug - THE MISSING FUNCTION
export const getFlosProductBySlug = async (slug: string) => {
  const FLOS_PRODUCT_QUERY = defineQuery(`*[_type == "product" && brand == "FLOS" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image {
      ...,
      asset->
    },
    description,
    price,
    brand,
    categories[]->{
      _id,
      title,
      slug
    },
    href,
    variants[] {
      name,
      image {
        ...,
        asset->
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      ...,
      asset->
    },
    roomCategory,
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
        ...,
        asset->
      }
    }
  }`);

  try {
    const result = await client.fetch(FLOS_PRODUCT_QUERY, { slug });
    return result || null;
  } catch (error) {
    console.error(`Error fetching FLOS product with slug ${slug}:`, error);
    return null;
  }
};

// Get FLOS categories
export const getFlosCategories = async () => {
  const FLOS_CATEGORIES_QUERY = defineQuery(`*[_type == "category" && (title == "FLOS" || title == "Lighting")] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`);

  try {
    const categories = await client.fetch(FLOS_CATEGORIES_QUERY);
    return categories;
  } catch (error) {
    console.error('Error fetching FLOS categories:', error);
    return [];
  }
};

// Get single FLOS product by ID
export const getFlosProduct = async (productId: string) => {
  const FLOS_PRODUCT_BY_ID_QUERY = defineQuery(`*[_type == "product" && _id == $productId && brand == "FLOS"][0] {
    _id,
    name,
    slug,
    image {
      ...,
      asset->
    },
    description,
    price,
    brand,
    categories[]->{
      _id,
      title,
      slug
    },
    href,
    variants[] {
      name,
      image {
        ...,
        asset->
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      ...,
      asset->
    },
    roomCategory,
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
        ...,
        asset->
      }
    }
  }`);

  try {
    const product = await client.fetch(FLOS_PRODUCT_BY_ID_QUERY, { productId });
    return product || null;
  } catch (error) {
    console.error(`Error fetching FLOS product ${productId}:`, error);
    return null;
  }
};

// Get FLOS products by category
export const getFlosProductsByCategory = async (categoryTitle: string) => {
  const FLOS_PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`*[_type == "product" && brand == "FLOS" && count(categories[title match "${categoryTitle}"]) > 0] | order(name asc) {
    _id,
    name,
    slug,
    image {
      ...,
      asset->
    },
    description,
    price,
    brand,
    categories[]->{
      _id,
      title,
      slug
    },
    href,
    variants[] {
      name,
      image {
        ...,
        asset->
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      ...,
      asset->
    },
    roomCategory,
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
        ...,
        asset->
      }
    }
  }`);

  try {
    const products = await client.fetch(FLOS_PRODUCTS_BY_CATEGORY_QUERY);
    return products;
  } catch (error) {
    console.error(`Error fetching FLOS products by category ${categoryTitle}:`, error);
    return [];
  }
};
