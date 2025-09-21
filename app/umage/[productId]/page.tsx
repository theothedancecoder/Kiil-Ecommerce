import { getAllProducts } from "@/sanity/lib/products/getAllProductsSimple";
import { Product } from "@/sanity.types";
import { notFound } from "next/navigation";
import UmageProductClient from "./UmageProductClient";

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 minutes

interface UmageProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

// Enhanced legacy products data with complete variants and lifestyle images - used to supplement Sanity data
const legacyProductsData: Record<string, any> = {
  "a-conversation-piece-dining-chair": {
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/umage_packshoA%20Conversation%20Piece%20dining%20chair%207,499%20krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp",
        material: "Oak",
        price: 7499,
      },
      {
        name: "Black Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/umage_packshot_5131c740-01_a-conversation-piece_dining-chair_black-oak_sugar-brown_-2_900x.webp",
        material: "Black Oak",
        price: 7499,
      },
      {
        name: "Black Oak - White Sands",
        image: "/umage/A-Conversation-Piece/umage_packshot_5131c740-02_a-conversation-piece_dining-chair_black-oak_white-sands_-2_900x.webp",
        material: "Black Oak",
        price: 7499,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/A-Conversation-Piece/umage_packshot_5589c740-02_a-conversation-piece_dining-chair_oak_white-sands_-2_900x.webp",
        material: "Oak",
        price: 7499,
      },
      {
        name: "Dark Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/umage_packshot_5789c740-01_a-conversation-piece_dining-chair_dark-oak_sugar-brown_-2_900x.webp",
        material: "Dark Oak",
        price: 7499,
      },
      {
        name: "Dark Oak - White Sands",
        image: "/umage/A-Conversation-Piece/umage_packshot_5789c740-02_a-conversation-piece_dining-chair_dark-oak_white-sands_-2_900x.webp",
        material: "Dark Oak",
        price: 7499,
      },
      {
        name: "Walnut - Sugar Brown",
        image: "/umage/A-Conversation-Piece/umage_packshot_5895c740-01_a-conversation-piece_dining-chair_walnut_sugar-brown_-2_900x.webp",
        material: "Walnut",
        price: 7499,
      },
      {
        name: "Walnut - White Sands",
        image: "/umage/A-Conversation-Piece/umage_packshot_5895c740-02_a-conversation-piece_dining-chair_walnut_white-sands_-2_900x.webp",
        material: "Walnut",
        price: 7499,
      },
    ],
    lifestyleImages: [
      "/umage/A-Conversation-Piece/lifestyle/umage_lifestyle_a-conversation-piece_dining-chair_walnut_morning-meadows_1600x.webp"
    ],
    relatedProducts: [
      { id: "heiko-dining-chair", name: "Heiko Dining Chair" },
      { id: "heart-n-soul-200-dining-table", name: "Heart'n'Soul 200 Dining Table" },
      { id: "comfort-circle-dining-table", name: "Comfort Circle Dining Table" }
    ],
  },
  "asteria-spotlight": {
    variants: [
      {
        name: "Plated Brass",
        image: "/umage/Asteria-spotlight/umage_packshot_2496_asteria_spot_plated_brass_4_900x.webp",
        material: "Plated Brass",
        price: 2999,
      },
      {
        name: "Black",
        image: "/umage/Asteria-spotlight/umage_packshot_2496_asteria-spot_black_-4_900x.webp",
        material: "Black",
        price: 2999,
      },
      {
        name: "Polished Steel",
        image: "/umage/Asteria-spotlight/umage_packshot_2497_asteria_spot_polished_steel_4_900x.webp",
        material: "Polished Steel",
        price: 2999,
      },
    ],
    lifestyleImages: [
      "/umage/Asteria-spotlight/lifestyle/UMAGE_lifestyle_Asteria_Spot_black__2_09905591-6b1a-4cef-87a6-acfe05096aa3.webp"
    ],
    relatedProducts: [
      { id: "chordis", name: "Chordis" },
      { id: "lemon-squeeze-ceiling-lamp", name: "Lemon Squeeze Ceiling Lamp" },
      { id: "metal-cover-accessories-for-asteria", name: "Metal Cover Accessories for Asteria" }
    ],
  },
  "audacious-desk": {
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/Audacious-desk/umage_packshot_5608c707-01_audacious_desk_sugar_brown_oak_2_900x.webp",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/Audacious-desk/umage_packshot_5608c707-02_audacious_desk_white_sands_oak_2_1200x.webp",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - Sterling",
        image: "/umage/Audacious-desk/umage_packshot_5608c707-03_audacious_desk_sterling_oak_2_1200x.webp",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - Shadow",
        image: "/umage/Audacious-desk/umage_packshot_5608c707-04_audacious_desk_shadow_oak_2_1200x.webp",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - Morning Meadows",
        image: "/umage/Audacious-desk/umage_packshot_5608c707-12_audacious_desk_oak_morning-meadows_-2_900x.webp",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - Hazelnut",
        image: "/umage/Audacious-desk/umage_packshot_5608c5601-6_audacious_desk_hazelnut_oak_2_1200x.webp",
        material: "Oak",
        price: 12999,
      },
      {
        name: "Oak - Charcoal",
        image: "/umage/Audacious-desk/umage_packshot_5608c5601-8_audacious_desk_charcoal_oak_2_1200x.webp",
        material: "Oak",
        price: 12999,
      },
    ],
    lifestyleImages: [
      "/umage/Audacious-desk/lifestyle/UMAGE_lifestyle_Audacious_desk_oak_sterling__1_7.webp"
    ],
    relatedProducts: [
      { id: "duende-desk", name: "Duende Desk" },
      { id: "stories-shelving", name: "Stories Shelving" },
      { id: "treasures-dresser", name: "Treasures Dresser" }
    ],
  },
  "chordis": {
    variants: [
      {
        name: "Brass",
        image: "/umage/Chordis/umage_packshot_2523_chordis_brass_-2_900x.webp",
        material: "Brass",
        price: 3999,
      },
    ],
    lifestyleImages: [
      "/umage/Chordis/lifestyle/umage_lifestyle_chordis_brass_-2_447687af-b575-4ad7-8839-2266d9adaecb_900x.webp"
    ],
    relatedProducts: [
      { id: "asteria-spotlight", name: "Asteria Spotlight" },
      { id: "lemon-squeeze-ceiling-lamp", name: "Lemon Squeeze Ceiling Lamp" },
      { id: "lemon-squeeze-wall-lamp-single", name: "Lemon Squeeze Wall Lamp Single" }
    ],
  },
  "comfort-circle-dining-table": {
    variants: [
      {
        name: "Black Oak - Rippled",
        image: "/umage/Comfort-Circle-dining-table/umage_packshot_5156-5156-1_comfort_circle_rippled_black_oak_2_1400x.webp",
        material: "Black Oak",
        price: 18999,
      },
      {
        name: "Oak - Rippled",
        image: "/umage/Comfort-Circle-dining-table/umage_packshot_5656-5656-1_comfort_circle_rippled_oak_2_900x.webp",
        material: "Oak",
        price: 18999,
      },
      {
        name: "Dark Oak - Rippled",
        image: "/umage/Comfort-Circle-dining-table/umage_packshot_5856-5856-1_comfort_circle_rippled_dark_oak_2_1400x.webp",
        material: "Dark Oak",
        price: 18999,
      },
    ],
    lifestyleImages: [
      "/umage/Comfort-Circle-dining-table/lifestyle/comfortcircle_blackoak_0c206d3b-220c-4089-a5da-d374ecda1255_900x.webp"
    ],
    relatedProducts: [
      { id: "a-conversation-piece-dining-chair", name: "A Conversation Piece Dining Chair" },
      { id: "heiko-dining-chair", name: "Heiko Dining Chair" },
      { id: "heart-n-soul-200-dining-table", name: "Heart'n'Soul 200 Dining Table" }
    ],
  },
  "duende-desk": {
    variants: [
      {
        name: "Black Oak",
        image: "/umage/Duende-desk/umage_packshot_5117_duende_black-oak_-1_900x.webp",
        material: "Black Oak",
        price: 9999,
      },
      {
        name: "Oak",
        image: "/umage/Duende-desk/umage_packshot_5605_duende_oak_1_900x.webp",
        material: "Oak",
        price: 9999,
      },
      {
        name: "Dark Oak",
        image: "/umage/Duende-desk/umage_packshot_5805_duende_dark-oak_-1_900x.webp",
        material: "Dark Oak",
        price: 9999,
      },
    ],
    lifestyleImages: [
      "/umage/Duende-desk/lifestyle/umage_lifestyle_duende_blackoak__1_c6dcacde-2a16-4cfd-a947-4c95079771c1_900x.webp"
    ],
    relatedProducts: [
      { id: "audacious-desk", name: "Audacious Desk" },
      { id: "stories-shelving", name: "Stories Shelving" },
      { id: "treasures-dresser", name: "Treasures Dresser" }
    ],
  },
  "gather-cafe-table": {
    variants: [
      {
        name: "Beige Travertine",
        image: "/umage/Gather-Café-table/ Gather Café table 8.999 kr.webp",
        material: "Beige Travertine",
        price: 8999,
      },
    ],
    lifestyleImages: [
      "/umage/Gather-Café-table/lifestyle/umage_lifestyle_gather_bar-table_brown-emperador_asteria-move_monochrome_leaf_-2_900x.webp",
      "/umage/Gather-Café-table/lifestyle/umage_lifestyle_gather_bar-table_brown-emperador_asteria-move_monochrome_pale-blue_-5_900x.webp"
    ],
    relatedProducts: [
      { id: "heiko-dining-chair", name: "Heiko Dining Chair" },
      { id: "a-conversation-piece-dining-chair", name: "A Conversation Piece Dining Chair" },
      { id: "asteria-spotlight", name: "Asteria Spotlight" }
    ],
  },
  "heart-n-soul-200-dining-table": {
    variants: [
      {
        name: "Black Oak",
        image: "/umage/Heart'n'Soul-200-dining-table-200/umage_packshot_5658_heart-n-soul_dining-table_black-oak_-2_900x.webp",
        material: "Black Oak",
        price: 21999,
      },
      {
        name: "Oak",
        image: "/umage/Heart'n'Soul-200-dining-table-200/umage_packshot_5658_heart-n-soul_dining-table_oak_-2_6d603e60-d050-4480-8863-d04d03022f7d_900x.webp",
        material: "Oak",
        price: 21999,
      },
      {
        name: "Oak - Obsidian Black",
        image: "/umage/Heart'n'Soul-200-dining-table-200/umage_packshot_5658_heart-n-soul_dining-table_oak_obsidian-black_-2_900x.webp",
        material: "Oak",
        price: 21999,
      },
    ],
    lifestyleImages: [
      "/umage/Heart'n'Soul-200-dining-table-200/lifestyle/umage_lifestyle_heart-n-soul_dining-table_oak_-1_900x.webp"
    ],
    relatedProducts: [
      { id: "a-conversation-piece-dining-chair", name: "A Conversation Piece Dining Chair" },
      { id: "heiko-dining-chair", name: "Heiko Dining Chair" },
      { id: "comfort-circle-dining-table", name: "Comfort Circle Dining Table" }
    ],
  },
};

// Related products mapping for products not in the enhanced data
const relatedProductsMap: Record<string, Array<{id: string, name: string}>> = {
  "gather-cafe-table": [
    { id: "heiko-dining-chair", name: "Heiko Dining Chair" },
    { id: "a-conversation-piece-dining-chair", name: "A Conversation Piece Dining Chair" },
    { id: "asteria-spotlight", name: "Asteria Spotlight" }
  ],
  "heiko-dining-chair": [
    { id: "gather-cafe-table", name: "Gather Café Table" },
    { id: "a-conversation-piece-dining-chair", name: "A Conversation Piece Dining Chair" },
    { id: "heart-n-soul-200-dining-table", name: "Heart'n'Soul 200 Dining Table" }
  ],
  "chordis": [
    { id: "lemon-squeeze-ceiling-lamp", name: "Lemon Squeeze Ceiling Lamp" },
    { id: "asteria-spotlight", name: "Asteria Spotlight" },
    { id: "lemon-squeeze-wall-lamp-single", name: "Lemon Squeeze Wall Lamp Single" }
  ],
  "asteria-spotlight": [
    { id: "chordis", name: "Chordis" },
    { id: "lemon-squeeze-ceiling-lamp", name: "Lemon Squeeze Ceiling Lamp" },
    { id: "lemon-squeeze-wall-lamp-single", name: "Lemon Squeeze Wall Lamp Single" }
  ],
};

export default async function UmageProductPage({ params }: UmageProductPageProps) {
  const { productId } = await params;
  
  // Get all products from Sanity
  const allProducts = await getAllProducts();
  
  // Find the Umage product by matching the productId with the slug
  const product = allProducts.find((p: any) => 
    p.brand === 'UMAGE' && 
    (p.slug?.current === productId || p._id === productId)
  );

  if (!product) {
    notFound();
  }

  // Get enhanced data for this product
  const enhancedData = legacyProductsData[productId];
  
  // Prioritize Sanity variants over enhanced data for better production reliability
  const variants = product.variants?.map((variant: any) => ({
    name: variant.name || variant.color || variant.material || 'Default',
    image: variant.image?.asset?.url || variant.image || '',
    material: variant.material || variant.color || '',
    price: variant.price || product.price || 0,
    size: variant.size || undefined,
  })) || enhancedData?.variants || [];

  // Get related products - use enhanced data first, then mapping, then empty array
  const relatedProducts = enhancedData?.relatedProducts || 
                          relatedProductsMap[productId] || 
                          [];

  // Convert Sanity product to format expected by UmageProductClient
  const convertedProduct = {
    id: product._id,
    name: product.name,
    description: typeof product.description === 'string' 
      ? product.description 
      : Array.isArray(product.description)
        ? product.description
            .filter((block: any) => block._type === 'block' && 'children' in block)
            .map((block: any) => 
              'children' in block && block.children
                ?.filter((child: any) => child._type === 'span')
                ?.map((child: any) => child.text)
                ?.join(' ')
            )
            .join(' ')
        : 'Detailed product description available upon request.',
    price: product.price || 0,
    category: product.categories?.[0]?.title || 'Furniture',
    variants,
    designer: 'Umage Design Team',
    features: [
      'Premium Scandinavian design',
      'High-quality materials',
      'Contemporary aesthetic',
      'Durable construction',
      'Multiple finish options',
      'Sustainable materials',
      'Danish craftsmanship',
      'Timeless design',
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "UMAGE" },
      { label: "Brand", value: product.brand || "UMAGE" },
      { label: "Category", value: product.categories?.[0]?.title || "Furniture" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "SKU", value: product._id },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: product.lifestyleImages?.map((img: any) => img.asset?.url).filter(Boolean) || enhancedData?.lifestyleImages || [],
    relatedProducts,
  };

  // Get other Umage products for the client - map both by slug and _id for related products matching
  const umageProducts = allProducts
    .filter((p: any) => p.brand === 'UMAGE')
    .map((p: any) => ({
      id: p.slug?.current || p._id, // Use slug as ID for matching with related products
      _id: p._id,
      name: p.name,
      slug: p.slug?.current,
      price: p.price || 0,
      variants: p.variants?.map((variant: any) => ({
        name: variant.name || variant.color || variant.material || 'Default',
        image: variant.image?.asset?.url || variant.image || '',
        material: variant.material || variant.color || '',
        price: variant.price || p.price || 0,
      })) || []
    }));

  return <UmageProductClient product={convertedProduct} products={umageProducts} />;
}

// Generate static params for all Umage products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    
    return products
      .filter((product: any) => product.brand === 'UMAGE' && product.slug?.current)
      .map((product: any) => ({
        productId: product.slug!.current,
      }));
  } catch (error) {
    console.error('Error generating static params for Umage products:', error);
    return [];
  }
}
