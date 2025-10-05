import { defineQuery } from 'next-sanity';
import { client } from '@/sanity/lib/client';

export const getFritzHansenProducts = async () => {
  const FRITZ_HANSEN_PRODUCTS_QUERY = `*[_type == "product" && brand == "Fritz Hansen" && defined(slug.current)] {
    _id,
    name,
    slug,
    description,
    price,
    salePrice,
    brand,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    variants[] {
      _key,
      name,
      price,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    categories[]->{
      _id,
      title,
      slug
    },
    inStock,
    stock
  } | order(name asc)`;

  try {
    const products = await client.fetch(FRITZ_HANSEN_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error('Error fetching Fritz Hansen products:', error);
    return [];
  }
};

export const getFritzHansenProductsByCategory = async (category: string) => {
  const FRITZ_HANSEN_CATEGORY_QUERY = `*[_type == "product" && brand == "Fritz Hansen" && defined(slug.current) && $category in categories[]->title] {
    _id,
    name,
    slug,
    description,
    price,
    salePrice,
    brand,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    variants[] {
      _key,
      name,
      price,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    categories[]->{
      _id,
      title,
      slug
    },
    inStock,
    stock
  } | order(name asc)`;

  try {
    const products = await client.fetch(FRITZ_HANSEN_CATEGORY_QUERY, { category });
    return products || [];
  } catch (error) {
    console.error('Error fetching Fritz Hansen products by category:', error);
    return [];
  }
};

export const getFritzHansenProductBySlug = async (slug: string) => {
  const FRITZ_HANSEN_PRODUCT_QUERY = `*[_type == "product" && brand == "Fritz Hansen" && defined(slug.current) && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    salePrice,
    brand,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    variants[] {
      _key,
      name,
      price,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    categories[]->{
      _id,
      title,
      slug
    },
    inStock,
    stock
  }`;

  try {
    const product = await client.fetch(FRITZ_HANSEN_PRODUCT_QUERY, { slug });
    return product || null;
  } catch (error) {
    console.error('Error fetching Fritz Hansen product:', error);
    return null;
  }
};

export const getFritzHansenCategories = async () => {
  const FRITZ_HANSEN_CATEGORIES_QUERY = `*[_type == "product" && brand == "Fritz Hansen" && defined(slug.current)] {
    categories[]->{
      _id,
      title,
      slug
    }
  }`;

  try {
    const products = await client.fetch(FRITZ_HANSEN_CATEGORIES_QUERY);

    // Extract unique categories
    const categories = new Set<string>();
    products?.forEach((product: any) => {
      product.categories?.forEach((category: any) => {
        if (category.title) {
          categories.add(category.title);
        }
      });
    });

    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error fetching Fritz Hansen categories:', error);
    return [];
  }
};
