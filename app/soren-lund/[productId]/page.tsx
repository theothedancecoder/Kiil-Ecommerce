import { getSorenLundProducts, getSorenLundProductBySlug } from "@/sanity/lib/products/getSorenLundProducts";
import { notFound } from "next/navigation";
import SorenLundProductClient from "./SorenLundProductClient";

// Use force-static with ISR to avoid freezing - pages are pre-generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface SorenLundProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function SorenLundProductPage({ params }: SorenLundProductPageProps) {
  const { productId } = await params;
  
  // Get the specific product directly from Sanity - much more efficient
  const product = await getSorenLundProductBySlug(productId);

  if (!product) {
    notFound();
  }

  // Get all Soren Lund products for related products
  const allSorenLundProducts = await getSorenLundProducts();

  // Create variants array from Sanity data
  const variants = product.variants && Array.isArray(product.variants) && product.variants.length > 0 
    ? product.variants.map((variant: any) => ({
        name: variant?.name || 'Standard',
        image: variant?.image?.asset?.url || product?.image?.asset?.url || '/placeholder-image.jpg',
        color: variant?.color,
        material: variant?.material,
        size: variant?.size,
        price: variant?.price || product?.price || 0,
      }))
    : [{
        name: 'Standard',
        image: product?.image?.asset?.url || '/placeholder-image.jpg',
        price: product?.price || 0,
      }];

  // Get related products from Sanity
  const relatedProducts = product?.relatedProducts && Array.isArray(product.relatedProducts) && product.relatedProducts.length > 0
    ? product.relatedProducts.map((related: any) => {
        const fullProduct = allSorenLundProducts.find((p: any) => 
          p._id === related._id || 
          p.slug?.current === related.slug?.current
        );
        
        return {
          id: related?.slug?.current || related?._id,
          name: related?.name || 'Unnamed Product',
          slug: related?.slug?.current,
          price: fullProduct?.price || related?.price || 0,
          variants: fullProduct?.variants && Array.isArray(fullProduct.variants) && fullProduct.variants.length > 0 
            ? fullProduct.variants.map((variant: any) => ({
                name: variant?.name || 'Standard',
                image: variant?.image?.asset?.url || fullProduct?.image?.asset?.url || '/placeholder-image.jpg',
                color: variant?.color,
                material: variant?.material,
                size: variant?.size,
                price: variant?.price || fullProduct?.price || 0,
              }))
            : [{
                name: 'Standard',
                image: fullProduct?.image?.asset?.url || related?.image?.asset?.url || '/placeholder-image.jpg',
                price: fullProduct?.price || related?.price || 0,
              }],
        };
      })
    : allSorenLundProducts
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
                material: variant?.material,
                size: variant?.size,
                price: variant?.price || p?.price || 0,
              }))
            : [{
                name: 'Standard',
                image: p?.image?.asset?.url || '/placeholder-image.jpg',
                price: p?.price || 0,
              }],
        })) || [];

  function getCategory() {
    const name = product?.name?.toLowerCase() || '';
    if (name.includes('chair') || name.includes('stool')) return 'Seating';
    if (name.includes('table')) return 'Tables';
    if (name.includes('sofa')) return 'Sofas';
    return 'Furniture';
  }

  const convertedProduct = {
    id: product?.slug?.current || product?._id,
    name: product?.name || 'Unnamed Product',
    description: product?.description || 'Premium Scandinavian furniture piece.',
    price: product?.price || 0,
    category: getCategory(),
    variants,
    designer: product?.designer || 'Soren Lund Design Studio',
    features: product?.features || [
      'Premium Scandinavian design',
      'High-quality materials',
      'Exceptional craftsmanship',
      'Sustainable materials',
      'Scandinavian craftsmanship',
      'Exceptional attention to detail',
    ],
    specifications: product?.specifications || [
      { label: "Designer", value: product?.designer || "Soren Lund Design Studio" },
      { label: "Manufacturer", value: "Soren Lund" },
      { label: "Brand", value: product?.brand || "Soren Lund" },
      { label: "Category", value: getCategory() },
      { label: "Style", value: "Scandinavian Contemporary" },
      { label: "SKU", value: product?._id || 'N/A' },
      { label: "Warranty", value: "5 years manufacturer warranty" },
      { label: "Origin", value: "Made in Norway" },
    ],
    lifestyleImages: product?.lifestyleImages && Array.isArray(product.lifestyleImages) 
      ? product.lifestyleImages.map((img: any) => img?.asset?.url).filter(Boolean) 
      : [],
    relatedProducts,
  };

  return <SorenLundProductClient product={convertedProduct} />;
}

// Generate static params for all Soren Lund products at build time
export async function generateStaticParams() {
  try {
    const sorenLundProducts = await getSorenLundProducts();
    
    return sorenLundProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Soren Lund:', error);
    return [];
  }
}

// Allow dynamic params for new products not yet in the static build
export const dynamicParams = true;
