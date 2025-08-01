/**
 * Hybrid Product Service
 * Provides a unified interface for both static and Sanity products
 * with seamless switching via environment variable
 */

import { getAllProducts as getSanityProducts, getProductsByBrand as getSanityProductsByBrand, getAllBrands as getSanityBrands } from '../sanity/lib/products/getAllProducts';
import { getAllProducts as getStaticProducts, getProductsByBrand as getStaticProductsByBrand, getAllBrands as getStaticBrands } from './allProducts';

// Feature flag to control data source
const USE_SANITY_PRODUCTS = process.env.USE_SANITY_PRODUCTS === 'true';

export interface ProductVariant {
  name: string;
  image?: string;
  color?: string;
  material?: string;
  size?: string;
  price?: number;
}

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category?: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  image?: string;
  href: string;
  variants?: ProductVariant[];
  lifestyleImages?: string[];
  inStock?: boolean;
  roomCategory?: string;
  slug?: { current: string };
  stock?: number;
}

/**
 * Get all products from the active data source
 */
export const getAllProducts = async (): Promise<Product[]> => {
  if (USE_SANITY_PRODUCTS) {
    console.log('📡 Fetching products from Sanity...');
    const sanityProducts = await getSanityProducts();
    return transformSanityProducts(sanityProducts);
  } else {
    console.log('📁 Using static products...');
    return transformStaticProducts(getStaticProducts());
  }
};

/**
 * Get products by brand from the active data source
 */
export const getProductsByBrand = async (brand: string): Promise<Product[]> => {
  if (USE_SANITY_PRODUCTS) {
    const sanityProducts = await getSanityProductsByBrand(brand);
    return transformSanityProducts(sanityProducts);
  } else {
    return transformStaticProducts(getStaticProductsByBrand(brand));
  }
};

/**
 * Get all brands from the active data source
 */
export const getAllBrands = async (): Promise<string[]> => {
  if (USE_SANITY_PRODUCTS) {
    const brands = await getSanityBrands();
    return brands as string[];
  } else {
    return getStaticBrands();
  }
};

/**
 * Search products by name from the active data source
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  const allProducts = await getAllProducts();
  const searchTerm = query.toLowerCase();
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get product by ID/slug from the active data source
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  const allProducts = await getAllProducts();
  return allProducts.find(product => 
    product.id === id || 
    product._id === id ||
    product.slug?.current === id
  ) || null;
};

/**
 * Transform Sanity products to unified format
 */
function transformSanityProducts(sanityProducts: any[]): Product[] {
  return sanityProducts.map(product => ({
    _id: product._id,
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    categories: product.categories,
    category: product.categories?.[0]?.title,
    image: product.image?.asset?.url,
    href: product.href,
    variants: product.variants?.map((variant: any) => ({
      name: variant.name,
      image: variant.image?.asset?.url,
      color: variant.color,
      material: variant.material,
      size: variant.size,
      price: variant.price,
    })),
    lifestyleImages: product.lifestyleImages?.map((img: any) => img.asset?.url).filter(Boolean),
    inStock: product.inStock,
    roomCategory: product.roomCategory,
    slug: product.slug,
    stock: product.stock,
  }));
}

/**
 * Transform static products to unified format
 */
function transformStaticProducts(staticProducts: any[]): Product[] {
  return staticProducts.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    brand: product.brand,
    category: product.category,
    image: product.image,
    href: product.href,
    variants: product.variants,
    lifestyleImages: product.lifestyleImages,
    inStock: product.inStock,
    roomCategory: product.roomCategory,
    slug: { current: product.id },
    stock: product.inStock ? 10 : 0,
  }));
}

/**
 * Get data source info for debugging
 */
export const getDataSourceInfo = () => ({
  source: USE_SANITY_PRODUCTS ? 'Sanity CMS' : 'Static Data',
  usingSanity: USE_SANITY_PRODUCTS,
  environmentVariable: 'USE_SANITY_PRODUCTS',
  currentValue: process.env.USE_SANITY_PRODUCTS,
});

// Export for backward compatibility
export { getAllProducts as default };
