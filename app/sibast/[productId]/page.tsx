import { getSibastProducts, getSibastProductBySlug } from "@/sanity/lib/products/getSibastProducts";
import { notFound } from "next/navigation";
import SibastProductClient from "./SibastProductClient";

// Use force-static with ISR to avoid freezing - pages are pre-generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface SibastProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function SibastProductPage({ params }: SibastProductPageProps) {
  const { productId } = await params;
  
  // Get the specific product directly - much more efficient than fetching all products
  const product = await getSibastProductBySlug(productId);

  if (!product) {
    notFound();
  }

  // Get all Sibast products for related products
  const allSibastProducts = await getSibastProducts();

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

  // Get related products from Sanity - use relatedProducts if available, otherwise show other Sibast products
  const relatedProducts = product?.relatedProducts && Array.isArray(product.relatedProducts) && product.relatedProducts.length > 0
    ? product.relatedProducts.map((related: any) => {
        const fullProduct = allSibastProducts.find((p: any) => 
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
    : allSibastProducts
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

  // Safely get category
  const getCategory = () => {
    if (product?.categories && Array.isArray(product.categories) && product.categories.length > 0) {
      return product.categories[0]?.title || 'Furniture';
    }
    return 'Furniture';
  };

  // Safely extract description text
  const getDescription = (): string => {
    const desc = product?.description;
    
    if (typeof desc === 'string') {
      return desc;
    }
    
    if (Array.isArray(desc)) {
      const descArray = desc as any[];
      if (descArray.length > 0) {
        return descArray
          .filter((block: any) => block?._type === 'block' && 'children' in block)
          .map((block: any) => 
            'children' in block && Array.isArray(block.children)
              ? block.children
                  .filter((child: any) => child?._type === 'span')
                  .map((child: any) => child?.text)
                  .join(' ')
              : ''
          )
          .join(' ') || 'Detailed product description available upon request.';
      }
    }
    
    return 'Detailed product description available upon request.';
  };

  
  // Helper function to convert description (handles both string and block content)
  const convertDescription = (desc: any): string => {
    if (typeof desc === 'string') {
      return desc;
    }
    if (Array.isArray(desc)) {
      return desc
        .filter((block: any) => block?._type === 'block' && 'children' in block)
        .map((block: any) => 
          'children' in block && Array.isArray(block.children)
            ? block.children
                .filter((child: any) => child?._type === 'span')
                .map((child: any) => child?.text)
                .join(' ')
            : ''
        )
        .join(' ');
    }
    return '';
  };

// Convert to the format expected by SibastProductClient
  const convertedProduct = {
    id: product?.slug?.current || product?._id || 'unknown',
    name: product?.name || 'Sibast Product',
    description: getDescription(),
    price: product?.price || 0,
    category: getCategory(),
    variants,
    designer: product?.designer || 'Helge Sibast',
    features: product?.features || [
      'Premium Danish design',
      'High-quality materials',
      'Timeless aesthetic',
      'Durable construction',
      'Multiple finish options',
      'Sustainable materials',
      'Scandinavian craftsmanship',
      'Exceptional attention to detail',
    ],
    specifications: product?.specifications || [
      { label: "Designer", value: product?.designer || "Helge Sibast" },
      { label: "Manufacturer", value: "Sibast Furniture" },
      { label: "Brand", value: product?.brand || "Sibast" },
      { label: "Category", value: getCategory() },
      { label: "Style", value: "Mid-century Danish" },
      { label: "SKU", value: product?._id || 'N/A' },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: product?.lifestyleImages && Array.isArray(product.lifestyleImages) 
      ? product.lifestyleImages.map((img: any) => img?.asset?.url).filter(Boolean) 
      : [],
    relatedProducts,
  };

  // Get other Sibast products for the client
  const sibastProducts = allSibastProducts
    ?.map((p: any) => ({
      id: p?.slug?.current || p?._id,
      name: p?.name || 'Unnamed Product',
      slug: p?.slug?.current,
      price: p?.price || 0,
      description: 'Sibast Furniture product',
      category: 'Furniture',
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

  return <SibastProductClient product={convertedProduct} products={sibastProducts} />;
}

// Generate static params for all Sibast products at build time
export async function generateStaticParams() {
  try {
    const sibastProducts = await getSibastProducts();
    
    return sibastProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Sibast:', error);
    return [];
  }
}

// Allow dynamic params for new products not yet in the static build
export const dynamicParams = true;
