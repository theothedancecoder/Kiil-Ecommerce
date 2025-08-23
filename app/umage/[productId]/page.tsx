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

// Enhanced legacy products data with complete variants - used to supplement Sanity data
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
      {
        url: "/umage/A-Conversation-Piece/lifestyle/umage_lifestyle_a-conversation-piece_dining-chair_walnut_morning-meadows_1600x.webp",
        alt: "A Conversation Piece Dining Chair in lifestyle setting",
        caption: "Walnut finish in Morning Meadows setting"
      }
    ],
    relatedProducts: [
      { id: "heiko-dining-chair", name: "Heiko Dining Chair" },
      { id: "heart-n-soul-200-dining-table", name: "Heart'n'Soul 200 Dining Table" },
      { id: "comfort-circle-dining-table", name: "Comfort Circle Dining Table" }
    ],
  },
  "lounge-around-shuffle-puff": {
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5552c720-01_lounge_around_shuffle_oak_sugar_brown_3_900x.webp",
        material: "Oak",
        price: 7999,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5552c720-02_lounge_around_shuffle_oak_white_sands_3_1400x.webp",
        material: "Oak",
        price: 7999,
      },
      {
        name: "Oak - Shadow",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5552c720-04_lounge_around_shuffle_oak_shadow_3_1400x.webp",
        material: "Oak",
        price: 7999,
      },
      {
        name: "Dark Oak - Sugar Brown",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5752c720-01_lounge-around-shuffle_dark-oak_sugar-brown_-3_900x.webp",
        material: "Dark Oak",
        price: 8299,
      },
      {
        name: "Dark Oak - White Sands",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5752c720-02_lounge-around-shuffle_dark-oak_white-sands_-3_900x.webp",
        material: "Dark Oak",
        price: 8299,
      },
      {
        name: "Dark Oak - Shadow",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5752c720-04_lounge-around-shuffle_dark-oak_shadow_-3_900x.webp",
        material: "Dark Oak",
        price: 8299,
      },
    ],
    relatedProducts: [
      { id: "lounge-around-3-seater", name: "Lounge Around 3-Seater" },
      { id: "lounge-around-shuffle-coffee-table", name: "Lounge Around Shuffle Coffee Table" },
      { id: "the-reader", name: "The Reader" }
    ],
  },
  "the-reader": {
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/The-Reader/umage_packshot_5502-702-01_the_reader_oak_sugar_brown_2_7b723e73-d1fc-4340-9e5b-a540aed0b1aa_900x.webp",
        material: "Oak",
        price: 8999,
      },
      {
        name: "Oak - Summer Shine",
        image: "/umage/The-Reader/umage_packshot_5502c702-11_the_reader_oak_summer_shine_2_900x.webp",
        material: "Oak",
        price: 8999,
      },
      {
        name: "Black Oak - Sugar Brown",
        image: "/umage/The-Reader/umage_packshot_5103-702-01_the_reader_black_oak_sugar_brown_2_900x.webp",
        material: "Black Oak",
        price: 8999,
      },
      {
        name: "Black Oak - Summer Shine",
        image: "/umage/The-Reader/umage_packshot_5103c702-11_the_reader_black_oak_summer_shine_2_900x.webp",
        material: "Black Oak",
        price: 8999,
      },
      {
        name: "Dark Oak - Sugar Brown",
        image: "/umage/The-Reader/umage_packshot_5701-702-01_the_reader_dark_oak_sugar_brown_2_900x.webp",
        material: "Dark Oak",
        price: 8999,
      },
      {
        name: "Dark Oak - Summer Shine",
        image: "/umage/The-Reader/umage_packshot_5701c702-11_the_reader_dark_oak_summer_shine_2_900x.webp",
        material: "Dark Oak",
        price: 8999,
      },
    ],
    relatedProducts: [
      { id: "a-conversation-piece-dining-chair", name: "A Conversation Piece Dining Chair" },
      { id: "heiko-dining-chair", name: "Heiko Dining Chair" },
      { id: "lounge-around-3-seater", name: "Lounge Around 3-Seater" }
    ],
  },
  "lounge-around-3-seater": {
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/Lounge-Around-3-seter/umage_packshot_5550c723-01_lounge_around_3-seater_oak_sugar_brown_2_59509b40-b394-46b2-bbd4-cf8d5fe0f15f_900x.webp",
        material: "Oak",
        price: 24999,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/Lounge-Around-3-seter/umage_packshot_5550c723-02_lounge_around_3-seater_oak_white_sands_2_1400x.webp",
        material: "Oak",
        price: 24999,
      },
      {
        name: "Oak - Shadow",
        image: "/umage/Lounge-Around-3-seter/umage_packshot_5550c723-04_lounge_around_3-seater_oak_shadow_2_1400x.webp",
        material: "Oak",
        price: 24999,
      },
      {
        name: "Dark Oak - Sugar Brown",
        image: "/umage/Lounge-Around-3-seter/umage_packshot_5750c723-01_lounge_around_3-seater_dark_oak_sugar_brown_2_1400x.webp",
        material: "Dark Oak",
        price: 24999,
      },
      {
        name: "Dark Oak - White Sands",
        image: "/umage/Lounge-Around-3-seter/umage_packshot_5750c723-02_lounge_around_3-seater_dark_oak_white_sands_2_1400x.webp",
        material: "Dark Oak",
        price: 24999,
      },
      {
        name: "Dark Oak - Shadow",
        image: "/umage/Lounge-Around-3-seter/umage_packshot_5750c723-04_lounge_around_3-seater_dark_oak_shadow_2_1400x.webp",
        material: "Dark Oak",
        price: 24999,
      },
    ],
    relatedProducts: [
      { id: "lounge-around-shuffle-coffee-table", name: "Lounge Around Shuffle Coffee Table" },
      { id: "lounge-around-shuffle-puff", name: "Lounge Around Shuffle Puff" },
      { id: "the-reader", name: "The Reader" }
    ],
  },
  "treasures-dresser": {
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/Treasures Dresser/umage_packshot_5624c735-01_treasures-dresser_oak_sugar-brown_-2_900x.webp",
        material: "Oak",
        price: 16999,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/Treasures Dresser/umage_packshot_5624c735-02_treasures-dresser_oak_white-sands_-2_900x.webp",
        material: "Oak",
        price: 16999,
      },
      {
        name: "Oak - Morning Meadows",
        image: "/umage/Treasures Dresser/umage_packshot_5624c735-12_treasures-dresser_oak_morning-meadows_-2_900x.webp",
        material: "Oak",
        price: 16999,
      },
      {
        name: "Black Oak - Sugar Brown",
        image: "/umage/Treasures Dresser/umage_packshot_5126c734-01_treasures-dresser_black-oak_sugar-brown_-2_900x.webp",
        material: "Black Oak",
        price: 16999,
      },
      {
        name: "Black Oak - White Sands",
        image: "/umage/Treasures Dresser/umage_packshot_5126c734-02_treasures-dresser_black-oak_white-sands_-2_900x.webp",
        material: "Black Oak",
        price: 16999,
      },
      {
        name: "Black Oak - Morning Meadows",
        image: "/umage/Treasures Dresser/umage_packshot_5126c734-12_treasures-dresser_black-oak_morning-meadows_-2_900x.webp",
        material: "Black Oak",
        price: 16999,
      },
      {
        name: "Dark Oak - Sugar Brown",
        image: "/umage/Treasures Dresser/umage_packshot_5776c736-01_treasures-dresser_dark-oak_sugar-brown_-2_900x.webp",
        material: "Dark Oak",
        price: 16999,
      },
      {
        name: "Dark Oak - White Sands",
        image: "/umage/Treasures Dresser/umage_packshot_5776c736-02_treasures-dresser_dark-oak_white-sands_-2_900x.webp",
        material: "Dark Oak",
        price: 16999,
      },
      {
        name: "Dark Oak - Morning Meadows",
        image: "/umage/Treasures Dresser/umage_packshot_5776c736-12_treasures-dresser_dark-oak_morning-meadows_-2_900x.webp",
        material: "Dark Oak",
        price: 16999,
      },
    ],
    relatedProducts: [
      { id: "stories-shelving", name: "Stories Shelving" },
      { id: "audacious-desk", name: "Audacious Desk" },
      { id: "duende-desk", name: "Duende Desk" }
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
    relatedProducts: [
      { id: "duende-desk", name: "Duende Desk" },
      { id: "stories-shelving", name: "Stories Shelving" },
      { id: "treasures-dresser", name: "Treasures Dresser" }
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
  
  // Use enhanced variants if available, otherwise use Sanity variants
  const variants = enhancedData?.variants || product.variants?.map((variant: any) => ({
    name: variant.name || variant.color || variant.material || 'Default',
    image: variant.image?.asset?.url || '',
    material: variant.material || variant.color || '',
    price: variant.price || product.price || 0,
    size: variant.size || undefined,
  })) || [];

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
    lifestyleImages: enhancedData?.lifestyleImages || product.lifestyleImages?.map((img: any) => img.asset?.url).filter(Boolean) || [],
    relatedProducts,
  };

  // Get other Umage products for the client
  const umageProducts = allProducts
    .filter((p: any) => p.brand === 'UMAGE')
    .map((p: any) => ({
      id: p._id,
      name: p.name,
      slug: p.slug?.current,
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
