import fs from 'fs';

const content = `import { getKartellProducts, getKartellProductBySlug } from "@/sanity/lib/products/getKartellProducts";
import { notFound } from "next/navigation";
import KartellProductClient from "./KartellProductClient";

export const dynamic = "force-static";
export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function KartellProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await getKartellProductBySlug(productId);

  if (!product) {
    notFound();
  }

  const allKartellProducts = await getKartellProducts();

  const variants = product.variants && Array.isArray(product.variants) && product.variants.length > 0 
    ? product.variants.map((variant: any) => ({
        name: variant?.name || 'Standard',
        image: variant?.image?.asset?.url || product?.image?.asset?.url || '/placeholder-image.jpg',
        color: variant?.color,
        price: variant?.price || product?.price || 0,
      }))
    : [{
        name: 'Standard',
        image: product?.image?.asset?.url || '/placeholder-image.jpg',
        price: product?.price || 0,
      }];

  const relatedProducts = allKartellProducts
    ?.filter((p: any) => p?._id !== product?._id)
    ?.slice(0, 4)
    ?.map((p: any) => ({
      id: p?.slug?.current || p?._id,
      name: p?.name || 'Unnamed Product',
      slug: p?.slug?.current,
      price: p?.price || 0,
      variants: p?.variants && Array.isArray(p.variants) && p.variants.length > 0 
        ? p.variants.map((variant: any) => ({
            name: variant?.name || 'Standard',
            image: variant?.image?.asset?.url || p?.image?.asset?.url || '/placeholder-image.jpg',
            color: variant?.color,
            price: variant?.price || p?.price || 0,
          }))
        : [{
            name: 'Standard',
            image: p?.image?.asset?.url || '/placeholder-image.jpg',
            price: p?.price || 0,
          }],
    })) || [];

  const convertedProduct = {
    id: product?.slug?.current || product?._id,
    name: product?.name || 'Unnamed Product',
    description: product?.description || 'Product description available upon request.',
    price: product.price || 0,
    image: product?.image?.asset?.url || '/placeholder-image.jpg',
    category: 'Furniture',
    variants,
    designer: 'Kartell Design Team',
    features: [
      'Italian design excellence',
      'High-quality plastic materials',
      'Innovative manufacturing',
      'Durable construction',
      'Multiple color options',
      'Contemporary aesthetic',
      'Sustainable materials',
      'Timeless design',
    ],
    specifications: [
      { label: "Designer", value: "Kartell Design Team" },
      { label: "Manufacturer", value: "Kartell" },
      { label: "Brand", value: product?.brand || "Kartell" },
      { label: "Category", value: "Furniture" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "SKU", value: product?._id || 'N/A' },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: product?.lifestyleImages && Array.isArray(product.lifestyleImages) 
      ? product.lifestyleImages.map((img: any) => img?.asset?.url).filter(Boolean) 
      : [],
    relatedProducts,
  };

  return <KartellProductClient product={convertedProduct} />;
}

export async function generateStaticParams() {
  try {
    const kartellProducts = await getKartellProducts();
    
    return kartellProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Kartell:', error);
    return [];
  }
}

export const dynamicParams = true;
`;

fs.writeFileSync('app/kartell/[productId]/page.tsx', content);
console.log('✅ Updated Kartell product page to use Sanity data');
