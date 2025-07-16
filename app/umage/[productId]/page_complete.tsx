"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  size?: string;
  price: number;
  material?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  relatedProducts?: { id: string; name: string }[];
  lifestyleImages?: string[];
}

const products: Product[] = [
  {
    id: "a-conversation-piece-dining-chair",
    name: "A Conversation Piece Dining Chair",
    description: "An elegant dining chair that combines comfort with sophisticated design.",
    price: 7499,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/umage_packshoA Conversation Piece dining chair 7,499 krt_5589c740-01_a-conversation-piece_dining-chair_oak_sugar-brown_-2_900x.webp",
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
    designer: "Umage Design Team",
    features: [
      "Premium solid wood construction",
      "Ergonomic design for comfort",
      "Multiple wood and upholstery options",
      "Sustainable materials",
      "Handcrafted details",
      "Durable finish",
      "Contemporary Scandinavian design",
      "Suitable for dining and office spaces",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Solid wood with upholstered seat" },
      { label: "Wood Options", value: "Oak, Black Oak, Dark Oak, Walnut" },
      { label: "Upholstery", value: "Sugar Brown, White Sands" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Dimensions", value: "H: 80cm, W: 50cm, D: 55cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
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
  {
    id: "gather-cafe-table",
    name: "Gather Café Table",
    description: "A versatile café table that brings people together. Perfect for intimate dining, coffee moments, or as a stylish accent piece.",
    price: 8999,
    category: "Tables",
    variants: [
      {
        name: "Beige Travertine",
        image: "/umage/Gather-Café-table/%20Gather%20Café%20table%208.999%20kr.webp",
        material: "Travertine",
        price: 8999,
      },
    ],
    designer: "Umage Design Team",
    features: [
      "Natural travertine stone top",
      "Elegant pedestal base",
      "Perfect for 2-4 people",
      "Durable construction",
      "Easy to clean surface",
      "Timeless design",
      "Suitable for indoor use",
      "Pairs beautifully with Umage chairs",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Travertine stone top with metal base" },
      { label: "Top Finish", value: "Natural travertine" },
      { label: "Base", value: "Powder-coated metal" },
      { label: "Style", value: "Contemporary minimalist" },
      { label: "Diameter", value: "Ø90cm" },
      { label: "Height", value: "75cm" },
      { label: "Seating", value: "2-4 people" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
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
  {
    id: "lounge-around-shuffle-puff",
    name: "Lounge Around Shuffle Puff",
    description: "A versatile ottoman that complements the Lounge Around collection. Perfect as a footrest, extra seating, or accent piece in modern living spaces.",
    price: 6999,
    category: "Furniture",
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5552c720-01_lounge_around_shuffle_oak_sugar_brown_3_900x.webp",
        material: "Oak",
        price: 6999,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5552c720-02_lounge_around_shuffle_oak_white_sands_3_1400x.webp",
        material: "Oak",
        price: 6999,
      },
      {
        name: "Oak - Shadow",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5552c720-04_lounge_around_shuffle_oak_shadow_3_1400x.webp",
        material: "Oak",
        price: 6999,
      },
      {
        name: "Dark Oak - Sugar Brown",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5752c720-01_lounge-around-shuffle_dark-oak_sugar-brown_-3_900x.webp",
        material: "Dark Oak",
        price: 6999,
      },
      {
        name: "Dark Oak - White Sands",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5752c720-02_lounge-around-shuffle_dark-oak_white-sands_-3_900x.webp",
        material: "Dark Oak",
        price: 6999,
      },
      {
        name: "Dark Oak - Shadow",
        image: "/umage/Lounge-Around-Shuffle-puff/umage_packshot_5752c720-04_lounge-around-shuffle_dark-oak_shadow_-3_900x.webp",
        material: "Dark Oak",
        price: 6999,
      },
    ],
    designer: "Umage Design Team",
    features: [
      "Versatile ottoman design",
      "Premium solid wood frame",
      "Multiple upholstery options",
      "Perfect as footrest or extra seating",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Matches Lounge Around collection",
      "Compact and functional",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Solid wood frame with upholstered cushion" },
      { label: "Wood Options", value: "Oak, Dark Oak" },
      { label: "Upholstery", value: "Sugar Brown, White Sands, Shadow" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Type", value: "Ottoman/Footrest" },
      { label: "Collection", value: "Lounge Around" },
      { label: "Care", value: "Vacuum regularly, professional cleaning recommended" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [],
    relatedProducts: [
      { id: "lounge-around-3-seater", name: "Lounge Around 3-Seater" },
      { id: "lounge-around-shuffle-coffee-table", name: "Lounge Around Shuffle Coffee Table" },
      { id: "the-reader", name: "The Reader" }
    ],
  },
];

export default function UmageProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = products.find((p) => p.id === productId);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/umage" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Umage Collection
          </Link>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              Home
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/umage" className="text-stone-600 hover:text-stone-800">
              Umage
            </Link>
            <span className="text-stone-400">/</span>
            <span className="text-stone-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={selectedVariant.image}
                alt={`${product.name} - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Variant Thumbnails */}
            {product.variants.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedVariantIndex === index
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={`${variant.name} variant`}
                      fill
                      className="object-contain object-center p-2"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-white bg-opacity-90 text-xs text-center py-1 rounded">
                      {variant.material || variant.name}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle image ${index + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                Umage Collection
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>
              {product.designer && (
                <div className="mt-4 text-sm text-gray-500">
                  Designed by {product.designer}
                </div>
              )}
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Material: {selectedVariant.material || selectedVariant.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all ${
                        selectedVariantIndex === index
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium">{variant.material || variant.name}</div>
                      <div className="text-xs text-gray-500">kr {variant.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {/* Collapsible Features */}
            {product.features && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Features
                  </h3>
                  <span className="text-gray-500">
                    {featuresExpanded ? "−" : "+"}
                  </span>
                </button>
                {featuresExpanded && (
                  <ul className="mt-4 space-y-2 text-gray-600">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Collapsible Specifications */}
            {product.specifications && (
              <div className="border-t border-gray-200 pt-8">
                <button
                  onClick={() => setSpecificationsExpanded(!specificationsExpanded)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Specifications
                  </h3>
                  <span className="text-gray-500">
                    {specificationsExpanded ? "−" : "+"}
                  </span>
                </button>
                {specificationsExpanded && (
                  <div className="mt-4 space-y-3 text-gray-600">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium">{spec.label}</span>
                        <span className="text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Related Products */}
            {product.relatedProducts && (
              <div className="border-t border-gray-200 pt-16">
                <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.relatedProducts.map((related) => {
                    const relatedProduct = products.find(p => p.id === related.id);
                    return (
                      <Link
                        key={related.id}
                        href={`/umage/${related.id}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                          <div className="relative aspect-square bg-gray-50">
                            {relatedProduct && (
                              <Image
                                src={relatedProduct.variants[0].image}
                                alt={related.name}
                                fill
                                className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 640px) 50vw, 25vw"
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-light text-gray-900 mb-2">
                              {related.name}
                            </h3>
                            {relatedProduct && (
                              <p className="text-gray-900 font-medium">
                                kr {relatedProduct.price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/umage"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    View All Umage Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
