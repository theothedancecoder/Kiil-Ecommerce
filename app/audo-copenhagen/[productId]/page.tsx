import { notFound } from "next/navigation";
import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import AudoCopenhagenProductClient from "./AudoCopenhagenProductClient";

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

export default async function AudoCopenhagenProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  
  // Get all products from Sanity
  const allProducts = await getAllProducts();
  
  // Filter for Audo Copenhagen products
  const audoProducts = allProducts.filter((p: any) => 
    p.brand === "Audo Copenhagen" || p.brand === "AUDO COPENHAGEN" || p.brand === "Audo"
  );
  
  // Find the specific product by slug
  const product = audoProducts.find((p: any) => p.slug?.current === productId);

  if (!product) {
    notFound();
  }

  // Transform Sanity product data to match the client component's expected format
  const transformedProduct = {
    id: product.slug?.current || product._id,
    name: product.name || '',
    description: product.description || '',
    price: product.price || 0,
    category: product.categories?.[0]?.title || 'Accessories',
    variants: product.variants?.map((v: any) => ({
      name: v.name || v.color || 'Standard',
      image: v.image?.asset?.url || product.image?.asset?.url || '',
      color: v.color || v.name || '',
      material: v.material || '',
      price: v.price || product.price || 0,
    })) || [{
      name: 'Standard',
      image: product.image?.asset?.url || '',
      color: 'Standard',
      price: product.price || 0,
    }],
    designer: product.designer || "Audo Copenhagen Design Team",
    features: product.features || [
      "Premium Scandinavian design",
      "High-quality materials and craftsmanship",
      "Functional and aesthetic design",
      "Timeless appeal",
    ],
    specifications: [
      { label: "Designer", value: product.designer || "Audo Copenhagen Design Team" },
      { label: "Manufacturer", value: "Audo Copenhagen" },
      { label: "Material", value: product.material || "Premium materials" },
      { label: "Dimensions", value: product.dimensions || "See product details" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Origin", value: "Designed in Denmark" },
      ...(product.specifications || []),
    ],
    lifestyleImages: product.lifestyleImages?.map((img: any) => img.asset?.url).filter(Boolean) || [],
  };

  return <AudoCopenhagenProductClient product={transformedProduct} />;
}

// Generate static params for all Audo Copenhagen products
export async function generateStaticParams() {
  try {
    const allProducts = await getAllProducts();
    const audoProducts = allProducts.filter((p: any) => 
      p.brand === "Audo Copenhagen" || p.brand === "AUDO COPENHAGEN" || p.brand === "Audo"
    );
    
    return audoProducts.map((product: any) => ({
      productId: product.slug?.current || product._id,
    }));
  } catch (error) {
    console.error("Error generating static params for Audo Copenhagen:", error);
    return [];
  }
}
