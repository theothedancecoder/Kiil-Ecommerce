import { client } from '@/sanity/lib/client';

// Feature flag to control data source
const USE_SANITY_PRODUCTS = process.env.USE_SANITY_PRODUCTS === 'true';

export const getAllProducts = async () => {
  if (!USE_SANITY_PRODUCTS) {
    console.log("Sanity products are disabled. Set USE_SANITY_PRODUCTS=true to enable.");
    return [];
  }

  const ALL_PRODUCTS_QUERY = `*[_type == "product"] {
    _id,
    name,
    slug,
    image {
      _type,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
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
        _type,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      _type,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    roomCategory,
    stock,
    inStock
  } | order(name asc)`;

  try {
    console.log("Fetching products from Sanity using regular client...");
    
    // Use regular client instead of sanityFetch to avoid live query issues
    const products = await client.fetch(ALL_PRODUCTS_QUERY);

    console.log(`Found ${products?.length || 0} products in Sanity`);
    return products || [];
  } catch (error) {
    console.error("Error fetching all products from Sanity:", error);
    return [];
  }
};

// Get products by brand
export const getProductsByBrand = async (brand: string) => {
  if (!USE_SANITY_PRODUCTS) {
    return [];
  }

  const PRODUCTS_BY_BRAND_QUERY = `*[_type == "product" && brand == $brand] {
    _id,
    name,
    slug,
    image {
      _type,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
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
        _type,
        asset-> {
          _id,
          _type,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      color,
      material,
      size,
      price
    },
    lifestyleImages[] {
      _type,
      asset-> {
        _id,
        _type,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    roomCategory,
    stock,
    inStock
  } | order(name asc)`;

  try {
    const products = await client.fetch(PRODUCTS_BY_BRAND_QUERY, { brand });
    return products || [];
  } catch (error) {
    console.error(`Error fetching products for brand ${brand}:`, error);
    return [];
  }
};

// Get all brands
export const getAllBrands = async () => {
  if (!USE_SANITY_PRODUCTS) {
    return [];
  }

  const ALL_BRANDS_QUERY = `*[_type == "product"] {
    brand
  } | order(brand asc)`;

  try {
    const result = await client.fetch(ALL_BRANDS_QUERY);
    
    // Extract unique brands
    const brands = [...new Set(result?.map((product: any) => product.brand) || [])];
    return brands.filter(Boolean);
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};
