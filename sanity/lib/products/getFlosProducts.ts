import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';

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
    image,
    categories[]->{
      _id,
      title,
      slug
    },
    brand,
    designer,
    href,
    variants,
    inStock,
    featured
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
export async function getFlosProducts(): Promise<Product[]> {
  try {
    console.log('Fetching FLOS products from Sanity...');
    
    const products = await client.fetch<Product[]>(FLOS_PRODUCTS_QUERY);
    
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
export async function getFlosProduct(productId: string): Promise<Product | null> {
  try {
    const product = await client.fetch<Product>(
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
        image,
        categories[]->{
          _id,
          title,
          slug
        },
        brand,
        designer,
        href,
        variants,
        inStock,
        featured
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
 * Fetch FLOS products by category
 */
export async function getFlosProductsByCategory(categoryTitle: string): Promise<Product[]> {
  try {
    const products = await client.fetch<Product[]>(
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
        image,
        categories[]->{
          _id,
          title,
          slug
        },
        brand,
        designer,
        href,
        variants,
        inStock,
        featured
      }`,
      { categoryTitle }
    );
    
    return products;
  } catch (error) {
    console.error(`Error fetching FLOS products by category ${categoryTitle}:`, error);
    return [];
  }
}
