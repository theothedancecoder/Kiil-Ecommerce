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

  if (!product) {
    notFound();
  }

  return <AbloBlommaertProductClient product={product} />;
}

export default AbloBlommaertProductPage;
