import { getCraftsProducts, getCraftsProductBySlug } from "@/sanity/lib/products/getCraftsProducts";
import { notFound } from "next/navigation";
import CraftsProductClient from "./CraftsProductClient";

// Use force-static with ISR to avoid freezing - pages are pre-generated at build time
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

interface CraftsProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function CraftsProductPage({ params }: CraftsProductPageProps) {
  const { productId } = await params;
  
  // Get the specific product directly - much more efficient than fetching all products
  const product = await getCraftsProductBySlug(productId);

  if (!product) {
    notFound();
  }

  // Get all Crafts products for related products
  const allCraftsProducts = await getCraftsProducts();

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
        const fullProduct = allCraftsProducts.find((p: any) => 
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
    : allCraftsProducts
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

  // Convert to the format expected by the client component
  const convertedProduct = {
    id: product?.slug?.current || product?._id,
    name: product?.name || 'Unnamed Product',
    description: product?.description || 'Exceptional handcrafted lighting from Konsthantverk and other artisanal creators.',
    price: product?.price || 0,
    category: product?.categories?.[0]?.title || 'Lighting',
    variants,
    designer: product?.designer || 'Konsthantverk',
    features: product?.features || [
      'Handcrafted by skilled artisans',
      'Premium materials and construction',
      'Timeless Scandinavian design',
      'Exceptional attention to detail',
      'Sustainable and responsible production',
      'Unique character in every piece',
    ],
    specifications: product?.specifications || [
      { label: "Designer", value: product?.designer || "Konsthantverk" },
      { label: "Manufacturer", value: "Konsthantverk" },
      { label: "Brand", value: product?.brand || "Crafts" },
      { label: "Category", value: product?.categories?.[0]?.title || "Lighting" },
      { label: "Style", value: "Artisanal Scandinavian" },
      { label: "SKU", value: product?._id || 'N/A' },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Handcrafted in Scandinavia" },
    ],
    lifestyleImages: product?.lifestyleImages && Array.isArray(product.lifestyleImages) 
      ? product.lifestyleImages.map((img: any) => img?.asset?.url).filter(Boolean) 
      : [],
    relatedProducts,
  };

  // Get other Crafts products for the client
  const craftsProducts = allCraftsProducts
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

  return <CraftsProductClient product={convertedProduct} products={craftsProducts} />;
}

// Generate static params for all Crafts products at build time
export async function generateStaticParams() {
  try {
    const craftsProducts = await getCraftsProducts();
    
    return craftsProducts
      .filter((product: any) => product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Crafts:', error);
    return [];
  }
}

// Allow dynamic params for new products not yet in the static build
export const dynamicParams = true;
