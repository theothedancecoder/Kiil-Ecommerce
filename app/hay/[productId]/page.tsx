import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import { Product } from "@/sanity.types";
import { notFound } from "next/navigation";
import HayProductClient from "./HayProductClient";

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

interface HayProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

// Enhanced legacy products data with complete variants and lifestyle images - used to supplement Sanity data
const legacyProductsData: Record<string, any> = {
  "dont-leave-me-xl-dlm-side-table": {
    variants: [
      {
        name: "Anthracite Grey",
        image: "/HAY/Don`t-leave-me XL–DLM-side-table/variants/10509797_1.jpg",
        color: "Anthracite Grey",
        price: 2499,
      },
      {
        name: "Warm Yellow",
        image: "/HAY/Don`t-leave-me XL–DLM-side-table/variants/10509797_2.jpg",
        color: "Warm Yellow",
        price: 2499,
      },
      {
        name: "Soft Pink",
        image: "/HAY/Don`t-leave-me XL–DLM-side-table/variants/10509797_3.jpg",
        color: "Soft Pink",
        price: 2499,
      },
    ],
    lifestyleImages: [
      "/HAY/Don`t-leave-me XL–DLM-side-table/lifestyle/10509797r_1.jpg",
      "/HAY/Don`t-leave-me XL–DLM-side-table/lifestyle/10509797r_2.jpg",
    ],
  },
  "palissade-dining-chair": {
    variants: [
      {
        name: "Anthracite",
        image: "/HAY/Palissade-dining-chair/variants/palissade_dining_anthracite.jpg",
        color: "Anthracite",
        price: 1999,
      },
      {
        name: "Olive",
        image: "/HAY/Palissade-dining-chair/variants/palissade_dining_olive.jpg",
        color: "Olive",
        price: 1999,
      },
      {
        name: "Sky Grey",
        image: "/HAY/Palissade-dining-chair/variants/palissade_dining_sky_grey.jpg",
        color: "Sky Grey",
        price: 1999,
      },
      {
        name: "Hot Galvanised",
        image: "/HAY/Palissade-dining-chair/variants/palissade_dining_hot_galvanised.jpg",
        color: "Hot Galvanised",
        price: 1999,
      },
      {
        name: "Cream White",
        image: "/HAY/Palissade-dining-chair/variants/palissade_dining_cream_white.jpg",
        color: "Cream White",
        price: 1999,
      },
      {
        name: "Quartz Grey",
        image: "/HAY/Palissade-dining-chair/variants/palissade_dining_quartz_grey.jpg",
        color: "Quartz Grey",
        price: 1999,
      },
    ],
    lifestyleImages: [
      "/HAY/Palissade-dining-chair/lifestyle/palissade_dining_lifestyle_1.jpg",
      "/HAY/Palissade-dining-chair/lifestyle/palissade_dining_lifestyle_2.jpg",
    ],
  },
  // Add more HAY products as needed
};

export default async function HayProductPage({ params }: HayProductPageProps) {
  const { productId } = await params;
  
  // Get all products from Sanity
  const allProducts = await getAllProducts();
  
  // Find the specific HAY product by slug
  const product = allProducts.find((p: any) => 
    p.brand === 'HAY' && p.slug?.current === productId
  );

  if (!product) {
    notFound();
  }

  // Get enhanced data for this product
  const enhancedData = legacyProductsData[productId];

  // Create variants array - prioritize Sanity data, fallback to enhanced data
  const variants = product.variants && Array.isArray(product.variants) && product.variants.length > 0 
    ? product.variants.map((variant: any) => ({
        name: variant?.name || 'Standard',
        image: variant?.image?.asset?.url || variant?.image || enhancedData?.variants?.[0]?.image || product?.image?.asset?.url || '/placeholder-image.jpg',
        color: variant?.color,
        material: variant?.material,
        size: variant?.size,
        price: variant?.price || product?.price || 0,
      }))
    : enhancedData?.variants || [{
        name: 'Standard',
        image: product?.image?.asset?.url || '/placeholder-image.jpg',
        price: product?.price || 0,
      }];

  // Get related products from Sanity with full product data
  const relatedProducts = product?.relatedProducts && Array.isArray(product.relatedProducts) && product.relatedProducts.length > 0
    ? product.relatedProducts.map((related: any) => {
        // Find the full product data from allProducts by ID or slug
        const fullProduct = allProducts.find((p: any) => 
          p._id === related._id || 
          p.slug?.current === related.slug?.current ||
          p._id === related.slug?.current
        );
        
        console.log(`Looking for related product: ${related.name} (ID: ${related._id})`);
        console.log(`Found in allProducts: ${fullProduct ? 'YES' : 'NO'}`);
        
        return {
          id: related?.slug?.current || related?._id,
          name: related?.name || 'Unnamed Product',
          slug: related?.slug?.current,
          price: fullProduct?.price || related?.price || 0,
          variants: fullProduct?.variants && Array.isArray(fullProduct.variants) && fullProduct.variants.length > 0 
            ? fullProduct.variants.map((variant: any) => ({
                name: variant?.name || 'Standard',
                image: variant?.image?.asset?.url || variant?.image || fullProduct?.image?.asset?.url || '/placeholder-image.jpg',
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
    : allProducts
        ?.filter((p: any) => p?.brand === 'HAY' && p?._id !== product?._id)
        ?.slice(0, 4)
        ?.map((p: any) => ({
          id: p?.slug?.current || p?._id,
          name: p?.name || 'Unnamed Product',
          slug: p?.slug?.current,
          price: p?.price || 0,
          variants: p?.variants && Array.isArray(p.variants) && p.variants.length > 0 
            ? p.variants.map((variant: any) => ({
                name: variant?.name || 'Standard',
                image: variant?.image?.asset?.url || variant?.image || p?.image?.asset?.url || '/placeholder-image.jpg',
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

  // Safely get category with better error handling
  const getCategory = () => {
    if (product?.categories && Array.isArray(product.categories) && product.categories.length > 0) {
      return product.categories[0]?.title || 'Furniture';
    }
    return 'Furniture';
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

  // Convert to the format expected by HayProductClient
  const convertedProduct = {
    id: product?.slug?.current || product?._id || 'unknown',
    name: product?.name || 'HAY Product',
    description: convertDescription(product?.description) || 'Detailed product description available upon request.',
    descriptionNo: convertDescription((product as any)?.descriptionNo) || convertDescription(product?.description) || 'Detaljert produktbeskrivelse tilgjengelig på forespørsel.',
    price: product?.price || 0,
    category: getCategory(),
    variants,
    designer: 'HAY Design Team',
    features: [
      'Premium Danish design',
      'High-quality materials',
      'Contemporary aesthetic',
      'Durable construction',
      'Multiple finish options',
      'Sustainable materials',
      'Scandinavian craftsmanship',
      'Timeless design',
    ],
    specifications: [
      { label: "Designer", value: "HAY Design Team" },
      { label: "Manufacturer", value: "HAY" },
      { label: "Brand", value: product?.brand || "HAY" },
      { label: "Category", value: getCategory() },
      { label: "Style", value: "Contemporary Danish" },
      { label: "SKU", value: product?._id || 'N/A' },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: enhancedData?.lifestyleImages || 
      (product?.lifestyleImages && Array.isArray(product.lifestyleImages) 
        ? product.lifestyleImages.map((img: any) => img?.asset?.url).filter(Boolean) 
        : []) || [],
    relatedProducts,
  };

  // Get other HAY products for the client with complete information including variants and pricing
  const hayProducts = allProducts
    ?.filter((p: any) => p?.brand === 'HAY')
    ?.map((p: any) => ({
      id: p?.slug?.current || p?._id,
      name: p?.name || 'Unnamed Product',
      slug: p?.slug?.current,
      price: p?.price || 0,
      variants: p?.variants && Array.isArray(p.variants) && p.variants.length > 0 
        ? p.variants.map((variant: any) => ({
            name: variant?.name || 'Standard',
            image: variant?.image?.asset?.url || variant?.image || p?.image?.asset?.url || '/placeholder-image.jpg',
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

  return <HayProductClient product={convertedProduct} products={hayProducts} />;
}

// Generate static params for all HAY products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    
    return products
      .filter((product: any) => product.brand === 'HAY' && product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for HAY products:', error);
    return [];
  }
}
