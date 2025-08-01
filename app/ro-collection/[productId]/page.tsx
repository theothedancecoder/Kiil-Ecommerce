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
  base?: string;
  leather?: string;
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
    id: "salon-dining-chair",
    name: "Salon Dining Chair",
    description: "An elegant dining chair with premium leather upholstery and solid wood base options.",
    price: 22005,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oiled Oak - Supreme Dark Chocolate",
        image: "/Ro-Collection/Salon dining chair/Salon Dining Chair kr 22 005 Base - Oiled Oak Oiled Oak Smoked Oak Soaped Oak Leather - Supreme Dark Chocolat.webp",
        base: "Oiled Oak",
        leather: "Supreme Dark Chocolate",
        price: 22005,
      },
      {
        name: "Soaped Oak - Supreme Dark Chocolate",
        image: "/Ro-Collection/Salon dining chair/ Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp",
        base: "Soaped Oak",
        leather: "Supreme Dark Chocolate",
        price: 22005,
      },
      {
        name: "Oiled Oak - Supreme Cognac",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Oiled oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp",
        base: "Oiled Oak",
        leather: "Supreme Cognac",
        price: 22005,
      },
      {
        name: "Smoked Oak - Supreme Cognac",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp",
        base: "Smoked Oak",
        leather: "Supreme Cognac",
        price: 22005,
      },
      {
        name: "Smoked Oak - Supreme Dark Chocolate",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Smoked oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Dark Chocolate.webp",
        base: "Smoked Oak",
        leather: "Supreme Dark Chocolate",
        price: 22005,
      },
      {
        name: "Soaped Oak - Supreme Cognac",
        image: "/Ro-Collection/Salon dining chair/Salon dining chair NOK  22,005  Base -  Soaped oak Oiled oak Smoked oak Soaped oak Shine -  Supreme Cognac.webp",
        base: "Soaped Oak",
        leather: "Supreme Cognac",
        price: 22005,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Premium leather upholstery",
      "Solid wood base construction",
      "Multiple wood finish options",
      "Supreme quality leather",
      "Contemporary Scandinavian design",
      "Comfortable ergonomic design",
      "Handcrafted details",
      "Durable construction",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood with leather upholstery" },
      { label: "Base Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Leather Options", value: "Supreme Dark Chocolate, Supreme Cognac" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Regular leather care and wood maintenance" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
    lifestyleImages: [
      "/Ro-Collection/Salon dining chair/lifestyle/Gal_2_724663c2-5a86-4611-8289-baf4b34e6c5e.webp"
    ],
    relatedProducts: [
      { id: "salon-dining-table-round-120", name: "Salon Dining Table Ø-120" },
      { id: "salon-dining-table-rectangular-extension", name: "Salon Dining Table with Extension Option" },
    ],
  },
  {
    id: "salon-dining-table-round-120",
    name: "Salon Dining Table Ø-120",
    description: "A beautiful round dining table perfect for intimate dining experiences.",
    price: 29940,
    category: "Dining Tables",
    variants: [
      {
        name: "Oiled Oak",
        image: "/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Oiled oak.webp",
        material: "Oiled Oak",
        price: 29940,
      },
      {
        name: "Soaped Oak",
        image: "/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  29,940  Color -  Soaped oak.webp",
        material: "Soaped Oak",
        price: 29940,
      },
      {
        name: "Smoked Oak",
        image: "/Ro-Collection/Salon dining table Ø-120/Salon dining table Ø-120 NOK  33,450  Color -  Smoked oak.webp",
        material: "Smoked Oak",
        price: 33450,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Round dining table design",
      "Premium solid wood construction",
      "Multiple wood finish options",
      "Seats 4-6 people comfortably",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Perfect for intimate dining",
      "Timeless aesthetic",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Diameter", value: "Ø120cm" },
      { label: "Seating", value: "4-6 people" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
    lifestyleImages: [
      "/Ro-Collection/Salon dining table Ø-120/lifestyle/Gal_6.webp"
    ],
    relatedProducts: [
      { id: "salon-dining-chair", name: "Salon Dining Chair" },
      { id: "salon-dining-table-round-120-extension", name: "Salon Dining Table with Extension Option, Ø-120" },
      { id: "extension-leaf-round-120", name: "Extension Leaf for Salon Dining Table Ø-120" },
    ],
  },
  {
    id: "salon-dining-table-round-120-extension",
    name: "Salon Dining Table with Extension Option, Ø-120",
    description: "A versatile round dining table with extension capability for larger gatherings.",
    price: 29940,
    category: "Dining Tables",
    variants: [
      {
        name: "Oiled Oak",
        image: "/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Oiled oak.webp",
        material: "Oiled Oak",
        price: 29940,
      },
      {
        name: "Soaped Oak",
        image: "/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  29,940  Color -  Soaped oak.webp",
        material: "Soaped Oak",
        price: 29940,
      },
      {
        name: "Smoked Oak",
        image: "/Ro-Collection/Salon dining table with extension option, Ø-120/Salon dining table with extension option, Ø-120 NOK  33,450  Color -  Smoked oak.webp",
        material: "Smoked Oak",
        price: 33450,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Round dining table with extension",
      "Premium solid wood construction",
      "Multiple wood finish options",
      "Expandable for larger gatherings",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Versatile dining solution",
      "Easy extension mechanism",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Diameter", value: "Ø120cm (extendable)" },
      { label: "Seating", value: "4-8 people (with extension)" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
    lifestyleImages: [
      "/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/SAL-ET-O120OO-720_2_800x800_crop_center@2x.webp",
      "/Ro-Collection/Salon dining table with extension option, Ø-120/lifestyle/Salon_extension_table_round_1920x1920_re_800x800_crop_center@2x.webp"
    ],
    relatedProducts: [
      { id: "salon-dining-chair", name: "Salon Dining Chair" },
      { id: "salon-dining-table-round-120", name: "Salon Dining Table Ø-120" },
      { id: "extension-leaf-round-120", name: "Extension Leaf for Salon Dining Table Ø-120" },
    ],
  },
  {
    id: "salon-dining-table-rectangular-extension",
    name: "Salon Dining Table with Extension Option",
    description: "A spacious rectangular dining table with extension capability for large gatherings.",
    price: 35190,
    category: "Dining Tables",
    variants: [
      {
        name: "190x90 - Oiled Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Ro Collection Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Oiled oak.webp",
        size: "190x90",
        material: "Oiled Oak",
        price: 35190,
      },
      {
        name: "190x90 - Soaped Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  35,190  Size -  190x90 190x90 220x100 Color -  Soaped oak.webp",
        size: "190x90",
        material: "Soaped Oak",
        price: 35190,
      },
      {
        name: "220x100 - Oiled Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Oiled oak.webp",
        size: "220x100",
        material: "Oiled Oak",
        price: 37815,
      },
      {
        name: "220x100 - Soaped Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  37,815  Size -  220x100 190x90 220x100 Color -  Soaped oak.webp",
        size: "220x100",
        material: "Soaped Oak",
        price: 37815,
      },
      {
        name: "190x90 - Smoked Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  38,700  Size -  190x90 190x90 220x100 Color -  Smoked oak.webp",
        size: "190x90",
        material: "Smoked Oak",
        price: 38700,
      },
      {
        name: "220x100 - Smoked Oak",
        image: "/Ro-Collection/Salon dining table with extenstion option/Salon dining table with extension option NOK  41,385  Size -  220x100 190x90 220x100 Color -  Smoked oak.webp",
        size: "220x100",
        material: "Smoked Oak",
        price: 41385,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Rectangular dining table with extension",
      "Premium solid wood construction",
      "Multiple size and wood options",
      "Perfect for large gatherings",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Spacious dining solution",
      "Easy extension mechanism",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Size Options", value: "190x90cm, 220x100cm" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Seating", value: "6-10 people (with extension)" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
    lifestyleImages: [],
    relatedProducts: [
      { id: "salon-dining-chair", name: "Salon Dining Chair" },
      { id: "extension-plate-rectangular", name: "Extension Plate for Salon Dining Table" },
    ],
  },
  {
    id: "extension-leaf-round-120",
    name: "Extension Leaf for Salon Dining Table Ø-120",
    description: "Extension leaf accessory for the round Salon dining table.",
    price: 5130,
    category: "Accessories",
    variants: [
      {
        name: "Black MDF",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  5,130  Color -  Black MDF.webp",
        material: "Black MDF",
        price: 5130,
      },
      {
        name: "Oiled Oak",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7,950  Color -  Oiled oak.webp",
        material: "Oiled Oak",
        price: 7950,
      },
      {
        name: "Soaped Oak",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  7,950  Color -  Soaped oak.webp",
        material: "Soaped Oak",
        price: 7950,
      },
      {
        name: "Smoked Oak",
        image: "/Ro-Collection/Extension leaf for Salon dining table Ø-120/Extension leaf for Salon dining table Ø-120 NOK  9,690  Color -  Smoked oak.webp",
        material: "Smoked Oak",
        price: 9690,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Extension leaf for round table",
      "Multiple material options",
      "Perfect fit for Salon table",
      "Easy to install and store",
      "Matching finishes available",
      "Durable construction",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material Options", value: "Black MDF, Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Compatibility", value: "Salon Dining Table Ø-120" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Clean with appropriate materials" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
    lifestyleImages: [
      "/Ro-Collection/Extension leaf for Salon dining table Ø-120/lifestyle/SAL-ET-O120OO-720_2_800x800_crop_center@2x.webp"
    ],
    relatedProducts: [
      { id: "salon-dining-table-round-120", name: "Salon Dining Table Ø-120" },
      { id: "salon-dining-table-round-120-extension", name: "Salon Dining Table with Extension Option, Ø-120" },
    ],
  },
  {
    id: "extension-plate-rectangular",
    name: "Extension Plate for Salon Dining Table",
    description: "Extension plate accessory for the rectangular Salon dining table.",
    price: 5130,
    category: "Accessories",
    variants: [
      {
        name: "50x90 - Black MDF",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x90 50x100 50x90 Color -  Black MDF.webp",
        size: "50x90",
        material: "Black MDF",
        price: 5130,
      },
      {
        name: "50x100 - Black MDF",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  5,130  Size -  50x100 50x100 50x90 Color -  Black MDF.webp",
        size: "50x100",
        material: "Black MDF",
        price: 5130,
      },
      {
        name: "50x90 - Oiled Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Oiled oak.webp",
        size: "50x90",
        material: "Oiled Oak",
        price: 7950,
      },
      {
        name: "50x100 - Oiled Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x100 50x100 50x90 Color -  Oiled oak.webp",
        size: "50x100",
        material: "Oiled Oak",
        price: 7950,
      },
      {
        name: "50x90 - Soaped Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Soaped oak.webp",
        size: "50x90",
        material: "Soaped Oak",
        price: 7950,
      },
      {
        name: "50x100 - Soaped Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  7,950  Size -  50x100 50x100 50x90 Color -  Soaped oak.webp",
        size: "50x100",
        material: "Soaped Oak",
        price: 7950,
      },
      {
        name: "50x90 - Smoked Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9,690  Size -  50x90 50x100 50x90 Color -  Smoked oak.webp",
        size: "50x90",
        material: "Smoked Oak",
        price: 9690,
      },
      {
        name: "50x100 - Smoked Oak",
        image: "/Ro-Collection/Extension plate for Salon dining table/Extension plate for Salon dining table NOK  9,690  Size -  50x100 50x100 50x90 Color -  Smoked oak.webp",
        size: "50x100",
        material: "Smoked Oak",
        price: 9690,
      },
    ],
    designer: "RO Collection Design Team",
    features: [
      "Extension plate for rectangular table",
      "Multiple size and material options",
      "Perfect fit for Salon table",
      "Easy to install and store",
      "Matching finishes available",
      "Durable construction",
    ],
    specifications: [
      { label: "Designer", value: "RO Collection Design Team" },
      { label: "Manufacturer", value: "RO Collection" },
      { label: "Material Options", value: "Black MDF, Oiled Oak, Soaped Oak, Smoked Oak" },
      { label: "Size Options", value: "50x90cm, 50x100cm" },
      { label: "Compatibility", value: "Salon Dining Table (Rectangular)" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Clean with appropriate materials" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Scandinavian design" },
    ],
    lifestyleImages: [
      "/Ro-Collection/Extension plate for Salon dining table/lifestyle/Extension plate for Salon dining table NOK  7,950  Size -  50x90 50x100 50x90 Color -  Oiled oak.webp"
    ],
    relatedProducts: [
      { id: "salon-dining-table-rectangular-extension", name: "Salon Dining Table with Extension Option" },
    ],
  },
];

export default function ROProductPage({
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
            href="/ro-collection" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to RO Collection
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
            <Link href="/ro-collection" className="text-stone-600 hover:text-stone-800">
              RO Collection
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
                      {variant.material || variant.base || variant.name}
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
                RO Collection
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
                  {selectedVariant.base ? `Base: ${selectedVariant.base}` : 
                   selectedVariant.material ? `Material: ${selectedVariant.material}` : 
                   selectedVariant.size ? `Size: ${selectedVariant.size}` : 
                   'Options'}
                  {selectedVariant.leather && ` | Leather: ${selectedVariant.leather}`}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all text-left ${
                        selectedVariantIndex === index
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-xs text-gray-500">kr {variant.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-gray-900 text-white py-4 px-8 text-
sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
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
                        href={`/ro-collection/${related.id}`}
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
                    href="/ro-collection"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    View All RO Collection Products
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
