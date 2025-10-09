import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// Norwegian to English keyword mapping for better search results
const norwegianToEnglish: Record<string, string[]> = {
  // Furniture types
  'stol': ['chair', 'stol'],
  'stoler': ['chairs', 'chair', 'stoler', 'stol'],
  'bord': ['table', 'bord'],
  'spisebord': ['dining table', 'table', 'spisebord', 'bord'],
  'sofabord': ['coffee table', 'table', 'sofabord', 'bord'],
  'sofa': ['sofa', 'couch'],
  'benk': ['bench', 'benk'],
  'skap': ['cabinet', 'storage', 'skap', 'oppbevaring'],
  'oppbevaring': ['storage', 'cabinet', 'oppbevaring', 'skap'],
  'hylle': ['shelf', 'shelving', 'hylle'],
  'skrivebord': ['desk', 'table', 'skrivebord', 'bord'],
  'nattbord': ['nightstand', 'bedside table', 'nattbord'],
  'kommode': ['dresser', 'chest of drawers', 'kommode'],
  'fotskammel': ['footstool', 'ottoman', 'fotskammel'],
  'krakk': ['stool', 'krakk'],
  
  // Room categories
  'stue': ['living room', 'lounge', 'stue'],
  'spisestue': ['dining room', 'dining', 'spisestue'],
  'kjøkken': ['kitchen', 'kjøkken'],
  'soverom': ['bedroom', 'soverom'],
  'bad': ['bathroom', 'bad'],
  'kontor': ['office', 'workspace', 'kontor'],
  'utendørs': ['outdoor', 'garden', 'patio', 'utendørs'],
  'hage': ['garden', 'outdoor', 'hage', 'utendørs'],
  
  // Materials
  'tre': ['wood', 'wooden', 'tre'],
  'eik': ['oak', 'eik'],
  'valnøtt': ['walnut', 'valnøtt'],
  'teak': ['teak'],
  'metall': ['metal', 'metallic', 'metall'],
  'glass': ['glass'],
  'lær': ['leather', 'lær'],
  'stoff': ['fabric', 'textile', 'stoff'],
  
  // Common items
  'speil': ['mirror', 'speil'],
  'lampe': ['lamp', 'light', 'lighting', 'lampe', 'belysning'],
  'belysning': ['lighting', 'lamp', 'light', 'belysning', 'lampe'],
  'pute': ['cushion', 'pillow', 'pute'],
  'teppe': ['rug', 'carpet', 'teppe'],
  'vase': ['vase'],
  'lysestake': ['candlestick', 'candle holder', 'lysestake'],
};

// English to Norwegian mapping (reverse of above)
const englishToNorwegian: Record<string, string[]> = {
  'chair': ['stol', 'chair'],
  'chairs': ['stoler', 'stol', 'chairs', 'chair'],
  'table': ['bord', 'table'],
  'dining table': ['spisebord', 'bord', 'dining table', 'table'],
  'coffee table': ['sofabord', 'bord', 'coffee table', 'table'],
  'sofa': ['sofa'],
  'bench': ['benk', 'bench'],
  'cabinet': ['skap', 'oppbevaring', 'cabinet', 'storage'],
  'storage': ['oppbevaring', 'skap', 'storage', 'cabinet'],
  'shelf': ['hylle', 'shelf'],
  'desk': ['skrivebord', 'bord', 'desk', 'table'],
  'nightstand': ['nattbord', 'nightstand'],
  'dresser': ['kommode', 'dresser'],
  'footstool': ['fotskammel', 'footstool'],
  'stool': ['krakk', 'stool'],
  'mirror': ['speil', 'mirror'],
  'lamp': ['lampe', 'belysning', 'lamp', 'light'],
  'lighting': ['belysning', 'lampe', 'lighting', 'lamp'],
  'cushion': ['pute', 'cushion'],
  'pillow': ['pute', 'pillow'],
  'rug': ['teppe', 'rug'],
  'vase': ['vase'],
};

/**
 * Expands search terms to include both Norwegian and English equivalents
 */
function expandSearchTerms(query: string): string[] {
  const terms = query.toLowerCase().trim().split(/\s+/);
  const expandedTerms = new Set<string>();
  
  // Add original terms
  terms.forEach(term => expandedTerms.add(term));
  
  // Add translations
  terms.forEach(term => {
    // Check Norwegian to English
    if (norwegianToEnglish[term]) {
      norwegianToEnglish[term].forEach(t => expandedTerms.add(t));
    }
    // Check English to Norwegian
    if (englishToNorwegian[term]) {
      englishToNorwegian[term].forEach(t => expandedTerms.add(t));
    }
  });
  
  return Array.from(expandedTerms);
}

/**
 * Search products in Sanity with bilingual support
 * Searches across: name, brand, categories, description (both English and Norwegian)
 */
export const searchProducts = async (searchQuery: string) => {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return [];
  }

  // Expand search terms to include translations
  const searchTerms = expandSearchTerms(searchQuery);
  
  // Create search patterns for each term
  const searchPatterns = searchTerms.map(term => `*${term}*`);
  
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[_type == "product" && (
      name match $searchPattern ||
      brand match $searchPattern ||
      categories[]->title match $searchPattern ||
      pt::text(description) match $searchPattern ||
      pt::text(descriptionNo) match $searchPattern
    )] {
      _id,
      name,
      slug,
      price,
      brand,
      image,
      categories[]-> {
        title,
        slug
      }
    } | order(name asc)
  `);

  try {
    // Search with each pattern and combine results
    const allResults = await Promise.all(
      searchPatterns.map(pattern =>
        sanityFetch({
          query: PRODUCT_SEARCH_QUERY,
          params: { searchPattern: pattern },
        })
      )
    );

    // Combine and deduplicate results
    const combinedResults = allResults.flatMap(result => result.data || []);
    const uniqueProducts = Array.from(
      new Map(combinedResults.map(product => [product._id, product])).values()
    );

    return uniqueProducts;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

/**
 * Get brand suggestions based on search query
 */
export const getBrandSuggestions = async (searchQuery: string): Promise<string[]> => {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return [];
  }

  const BRAND_QUERY = defineQuery(`
    *[_type == "product"] {
      brand
    }
  `);

  try {
    const result = await sanityFetch({ query: BRAND_QUERY });
    const products = result.data || [];
    
    // Get unique brands with proper typing
    const brandSet = new Set<string>();
    products.forEach((p: any) => {
      if (typeof p.brand === 'string' && p.brand.length > 0) {
        brandSet.add(p.brand);
      }
    });
    
    const brands = Array.from(brandSet);
    
    // Filter brands that match the search query
    const searchTerm = searchQuery.toLowerCase();
    return brands.filter((brand) => 
      brand.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error("Error fetching brand suggestions:", error);
    return [];
  }
};
