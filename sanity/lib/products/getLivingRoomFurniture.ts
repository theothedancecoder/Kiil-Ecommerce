import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { allProducts } from "@/lib/allProducts";

// Get living room furniture from both Sanity and static data
export const getLivingRoomFurniture = async () => {
  // Categories that belong to living room furniture
  const livingRoomCategories = [
    'chairs',
    'seating', 
    'sofas',
    'sofa',
    'armchairs',
    'coffee-tables',
    'side-tables',
    'tv-units',
    'storage',
    'shelving',
    'bookcases'
  ];

  let sanityProducts: any[] = [];
  
  // Try to get products from Sanity if enabled
  const USE_SANITY_PRODUCTS = process.env.USE_SANITY_PRODUCTS === 'true';
  
  if (USE_SANITY_PRODUCTS) {
    const LIVING_ROOM_FURNITURE_QUERY = defineQuery(`
      *[_type == "product" && (
        $categories match categories[]->slug.current ||
        $categories match subcategory ||
        roomCategory == "living-room"
      )] {
        _id,
        name,
        slug,
        image {
          ...,
          asset->
        },
        description,
        price,
        brand,
        categories[]->{
          _id,
          title,
          slug
        },
        variants[] {
          name,
          image {
            ...,
            asset->
          },
          color,
          material,
          size,
          price
        },
        lifestyleImages[] {
          ...,
          asset->
        },
        roomCategory,
        subcategory,
        stock,
        inStock,
        href
      } | order(name asc)
    `);

    try {
      console.log("Fetching living room furniture from Sanity...");
      const result = await sanityFetch({
        query: LIVING_ROOM_FURNITURE_QUERY,
        params: { categories: livingRoomCategories }
      });
      sanityProducts = result.data || [];
      console.log(`Found ${sanityProducts.length} living room furniture products in Sanity`);
    } catch (error) {
      console.error("Error fetching living room furniture from Sanity:", error);
    }
  }

  // Get static products that are living room furniture
  const staticLivingRoomProducts = allProducts.filter(product => {
    const category = product.category?.toLowerCase() || '';
    const roomCategory = product.roomCategory?.toLowerCase() || '';
    
    return (
      roomCategory === 'living-room' ||
      livingRoomCategories.some(cat => 
        category.includes(cat) || 
        product.name?.toLowerCase().includes(cat) ||
        product.description?.toLowerCase().includes(cat)
      ) ||
      // Include specific furniture types
      category === 'seating' ||
      category === 'sofa' ||
      category === 'chair' ||
      category === 'armchair' ||
      category === 'coffee table' ||
      category === 'side table' ||
      category === 'storage' ||
      category === 'bookcase' ||
      category === 'shelving'
    );
  });

  console.log(`Found ${staticLivingRoomProducts.length} static living room furniture products`);

  // Convert static products to match Sanity product structure
  const convertedStaticProducts = staticLivingRoomProducts.map(product => ({
    _id: product.id,
    name: product.name,
    slug: { current: product.href?.split('/').pop() || product.id },
    image: product.image,
    description: product.description,
    price: product.price,
    brand: product.brand || 'Unknown',
    categories: product.category ? [{ 
      _id: `category-${product.category.toLowerCase()}`,
      title: product.category,
      slug: { current: product.category.toLowerCase().replace(/\s+/g, '-') }
    }] : [],
    variants: product.variants || [],
    lifestyleImages: product.lifestyleImages || [],
    roomCategory: product.roomCategory || 'living-room',
    stock: undefined, // StaticProduct doesn't have stock property
    inStock: product.inStock !== false,
    href: product.href,
    staticProduct: true,
    staticHref: product.href,
    staticImage: product.image,
    staticBrand: product.brand
  }));

  // Combine both sources and remove duplicates
  const allFurnitureProducts = [...sanityProducts, ...convertedStaticProducts];
  
  // Remove duplicates based on name and brand
  const uniqueProducts = allFurnitureProducts.filter((product, index, self) => 
    index === self.findIndex(p => 
      p.name === product.name && 
      (p.brand === product.brand || p.staticBrand === product.staticBrand)
    )
  );

  console.log(`Total unique living room furniture products: ${uniqueProducts.length}`);
  
  return uniqueProducts;
};
