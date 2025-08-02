import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { defineQuery } from 'next-sanity';
import AbloBlommaertProductClient from './AbloBlommaertProductClient';

interface AbloBlommaertProduct {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  brand: string;
  stock: number;
  inStock: boolean;
  lifestyleImages?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
    caption?: string;
  }[];
}

async function AbloBlommaertProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  const PRODUCT_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $productId && brand == "Ablo Blommaert"][0] {
      _id,
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
      brand,
      stock,
      inStock,
      lifestyleImages[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      }
    }
  `);

  const response = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { productId },
  });

  const product = response.data;

  if (!product || !product.name || !product.slug?.current || !product.description || product.price === null || !product.brand) {
    notFound();
  }

  // Type cast to ensure non-null values for the client component
  const validatedProduct: AbloBlommaertProduct = {
    _id: product._id,
    name: product.name,
    slug: { current: product.slug.current },
    description: product.description,
    price: product.price,
    brand: product.brand,
    stock: product.stock || 0,
    inStock: product.inStock || false,
    image: product.image ? {
      asset: {
        _ref: product.image.asset?._id || '',
        url: product.image.asset?.url || undefined
      }
    } : undefined,
    lifestyleImages: product.lifestyleImages?.map(img => ({
      asset: {
        _ref: img.asset?._id || '',
        url: img.asset?.url || undefined
      },
      alt: img.alt || undefined,
      caption: img.caption || undefined
    })) || undefined
  };

  return <AbloBlommaertProductClient product={validatedProduct} />;
}

export default AbloBlommaertProductPage;
