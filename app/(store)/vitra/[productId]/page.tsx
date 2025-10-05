import { getVitraProducts, getVitraProductBySlug } from "@/sanity/lib/products/getVitraProducts";
import { notFound } from "next/navigation";
import VitraProductClient from "./VitraProductClient";

// Use force-static with ISR to avoid freezing - pages are pre-generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface VitraProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function VitraProductPage({ params }: VitraProductPageProps) {
  const { productId } = await params;
  
  // Get the specific product directly - much more efficient than fetching all products
  const product = await getVitraProductBySlug(productId);

  if (!product) {
    notFound();
  }

  // Get all Vitra products for related products
  const allVitraProducts = await getVitraProducts();

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
        const fullProduct = allVitraProducts.find((p: any) => 
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
    : allVitraProducts
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

  // Determine category
  const getCategory = () => {
    const name = product?.name?.toLowerCase() || '';
    if (name.includes('clock')) return 'Clocks';
    if (name.includes('chair') || name.includes('table')) return 'Furniture';
    if (name.includes('hang')) return 'Accessories';
    return 'Design Objects';
  };

  // Convert to client-compatible format
  const convertedProduct = {
    id: product?.slug?.current || product?._id,
    name: product?.name || 'Unnamed Product',
    description: product?.description || 'A beautiful Vitra design piece.',
    price: product?.price || 0,
    category: getCategory(),
    variants,
    designer: 'Vitra Design Team',
    features: [
      'Iconic mid-century modern design',
      'Premium quality materials',
      'Swiss craftsmanship',
      'Timeless aesthetic',
      'Sustainable production',
      'Museum-quality piece',
      'Authentic Vitra product',
      'Lifetime design value',
    ],
    specifications: [
      { label: "Designer", value: "Vitra Design Team" },
      { label: "Manufacturer", value: "Vitra" },
      { label: "Brand", value: "Vitra" },
      { label: "Category", value: getCategory() },
      { label: "Style", value: "Mid-Century Modern" },
      { label: "SKU", value: product?._id || 'N/A' },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Swiss Design" },
    ],
    lifestyleImages: product?.lifestyleImages?.map((img: any) => img?.asset?.url).filter(Boolean) || [],
    relatedProducts,
  };

  // Get other Vitra products for the client
  const vitraProducts = allVitraProducts
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

  return <VitraProductClient product={convertedProduct} products={vitraProducts} />;
}

// Generate static params for all Vitra products at build time
export async function generateStaticParams() {
  try {
    const vitraProducts = await getVitraProducts();
    
    return vitraProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Vitra:', error);
    return [];
  }
}

// Allow dynamic params for new products not yet in the static build
export const dynamicParams = true;
