"use client";

import { useState, use } from "react";
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
    id: "bm71-library-table",
    name: "BM71 Library Table",
    description: "Elegant library table designed with clean lines and premium materials. Perfect for modern workspaces and home offices. This timeless piece combines functionality with sophisticated Danish design principles.",
    price: 75750,
    category: "Tables",
    variants: [
      {
        name: "Standard Oak",
        image: "/fredericia/bm71-library-table/main.jpg",
        material: "Premium oak",
        price: 75750,
      },
    ],
    designer: "Børge Mogensen",
    features: [
      "Premium solid oak construction",
      "Clean Scandinavian design lines",
      "Perfect for modern workspaces",
      "Timeless Danish design principles",
      "Exceptional build quality",
      "Sustainable materials",
      "Handcrafted details",
      "Suitable for home offices and libraries",
    ],
    specifications: [
      { label: "Designer", value: "Børge Mogensen" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid oak with oil finish" },
      { label: "Dimensions", value: "W: 200cm, D: 90cm, H: 73cm" },
      { label: "Weight", value: "45kg" },
      { label: "Style", value: "Scandinavian modern" },
      { label: "Year", value: "1971" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended annually" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/bm71-library-table/lifestyle1.jpg"
    ],
    relatedProducts: [
      { id: "wegner-ox-chair", name: "Wegner Ox Chair" },
      { id: "delphi-elements-sofa", name: "Delphi Elements Sofa" },
      { id: "ej220-sofa-2-seater", name: "EJ220 Sofa 2 Seater" }
    ],
  },
  {
    id: "wegner-ox-chair",
    name: "Wegner Ox Chair",
    description: "Iconic Ox Chair designed by Hans J. Wegner in 1960. A masterpiece of Danish furniture design with exceptional comfort and style. The chair features a distinctive silhouette inspired by the horns of an ox, combining sculptural beauty with ergonomic excellence.",
    price: 139995,
    category: "Seating",
    variants: [
      {
        name: "Essene Cognac",
        image: "/fredericia/wegner-ox-chair/main.jpg",
        material: "Essene Cognac leather",
        price: 139995,
      },
      {
        name: "Essence Dark Brown",
        image: "/fredericia/wegner-ox-chair/variant1.jpg",
        material: "Essence Dark Brown leather",
        price: 139995,
      },
      {
        name: "Grand Linen",
        image: "/fredericia/wegner-ox-chair/variant2.jpg",
        material: "Grand Linen fabric",
        price: 139995,
      },
    ],
    designer: "Hans J. Wegner",
    features: [
      "Iconic design inspired by ox horns",
      "Premium leather and fabric upholstery options",
      "Solid oak frame construction",
      "Exceptional comfort and ergonomics",
      "Handcrafted in Denmark",
      "Sculptural beauty meets functionality",
      "Timeless Danish design heritage",
      "Investment-quality furniture piece",
    ],
    specifications: [
      { label: "Designer", value: "Hans J. Wegner" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Frame Material", value: "Solid oak with natural oil finish" },
      { label: "Upholstery", value: "Premium leather and fabric options" },
      { label: "Dimensions", value: "W: 100cm, D: 78cm, H: 88cm, SH: 40cm" },
      { label: "Weight", value: "28kg" },
      { label: "Year", value: "1960" },
      { label: "Production", value: "Handcrafted in Denmark" },
      { label: "Lead Time", value: "12-16 weeks" },
      { label: "Care", value: "Leather care kit recommended for leather versions, dust regularly" },
      { label: "Warranty", value: "5 years on frame, 2 years on upholstery" },
      { label: "Origin", value: "Danish design masterpiece" },
    ],
    lifestyleImages: [
      "/fredericia/wegner-ox-chair/lifestyle1.jpg",
      "/fredericia/wegner-ox-chair/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "bm71-library-table", name: "BM71 Library Table" },
      { id: "delphi-elements-sofa", name: "Delphi Elements Sofa" },
      { id: "ej220-sofa-2-seater", name: "EJ220 Sofa 2 Seater" }
    ],
  },
  {
    id: "delphi-elements-sofa",
    name: "Delphi Elements Sofa",
    description: "Modular sofa system offering endless configuration possibilities. Contemporary design meets exceptional comfort with premium upholstery options. The Delphi Elements collection represents the perfect balance between modern aesthetics and functional flexibility.",
    price: 125000,
    category: "Sofas",
    variants: [
      {
        name: "Steelcut Trio 213",
        image: "/fredericia/delphi-elements-sofa/main.jpg",
        material: "Steelcut Trio fabric",
        price: 125000,
      },
    ],
    designer: "GamFratesi",
    features: [
      "Modular sofa system design",
      "Endless configuration possibilities",
      "Premium Kvadrat Steelcut Trio fabric",
      "Solid beech frame with steel springs",
      "Contemporary Italian design",
      "Exceptional comfort and support",
      "Professional upholstery quality",
      "Perfect for modern living spaces",
    ],
    specifications: [
      { label: "Designer", value: "GamFratesi" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Frame Material", value: "Solid beech with steel springs" },
      { label: "Upholstery", value: "Kvadrat Steelcut Trio fabric" },
      { label: "Dimensions", value: "W: 240cm, D: 95cm, H: 75cm" },
      { label: "Seat Height", value: "42cm" },
      { label: "Style", value: "Contemporary modular" },
      { label: "Year", value: "2018" },
      { label: "Configuration", value: "Modular system" },
      { label: "Care", value: "Professional cleaning recommended" },
      { label: "Warranty", value: "5 years on frame, 2 years on upholstery" },
      { label: "Origin", value: "Italian design, Danish craftsmanship" },
    ],
    lifestyleImages: [
      "/fredericia/delphi-elements-sofa/lifestyle1.jpg",
      "/fredericia/delphi-elements-sofa/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "ej220-sofa-2-seater", name: "EJ220 Sofa 2 Seater" },
      { id: "wegner-ox-chair", name: "Wegner Ox Chair" },
      { id: "bm71-library-table", name: "BM71 Library Table" }
    ],
  },
  {
    id: "ej220-sofa-2-seater",
    name: "EJ220 Sofa 2 Seater",
    description: "Elegant two-seater sofa with refined proportions and premium materials. Available in various upholstery options to suit any interior. This sophisticated piece combines comfort with timeless Danish design principles.",
    price: 98000,
    category: "Sofas",
    variants: [
      {
        name: "Leather Max 95 Cognac",
        image: "/fredericia/ej220-sofa/main.jpg",
        material: "Leather Max 95",
        price: 98000,
      },
      {
        name: "Erik 9998 Broken Grey",
        image: "/fredericia/ej220-sofa/variant1.jpg",
        material: "Erik fabric",
        price: 95000,
      },
    ],
    designer: "Erik Jørgensen",
    features: [
      "Elegant two-seater design",
      "Premium leather and fabric options",
      "Solid beech frame construction",
      "Refined proportions and comfort",
      "Contemporary Danish design",
      "Multiple upholstery choices",
      "Professional craftsmanship",
      "Perfect for modern interiors",
    ],
    specifications: [
      { label: "Designer", value: "Erik Jørgensen" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Frame Material", value: "Solid beech with webbing" },
      { label: "Upholstery Options", value: "Leather Max 95, Erik fabric" },
      { label: "Dimensions", value: "W: 160cm, D: 85cm, H: 78cm" },
      { label: "Seat Height", value: "40cm" },
      { label: "Style", value: "Contemporary Danish" },
      { label: "Year", value: "2020" },
      { label: "Seating", value: "2 people" },
      { label: "Care", value: "Leather care recommended for leather versions" },
      { label: "Warranty", value: "5 years on frame, 2 years on upholstery" },
      { label: "Origin", value: "Danish design and craftsmanship" },
    ],
    lifestyleImages: [
      "/fredericia/ej220-sofa/lifestyle1.jpg"
    ],
    relatedProducts: [
      { id: "delphi-elements-sofa", name: "Delphi Elements Sofa" },
      { id: "wegner-ox-chair", name: "Wegner Ox Chair" },
      { id: "bm71-library-table", name: "BM71 Library Table" }
    ],
  },
  {
    id: "delphi-sofa-2-seater",
    name: "Delphi Sofa 2 Seater",
    description: "Contemporary two-seater sofa with clean lines and premium upholstery options. Perfect centerpiece for modern living spaces, offering exceptional comfort and sophisticated Danish design. Available in multiple premium materials including leather and fabric options.",
    price: 95000,
    category: "Sofas",
    variants: [
      {
        name: "Leather Max 98 Black",
        image: "/fredericia/delphi-sofa/main.jpg",
        material: "Leather Max 98",
        price: 95000,
      },
      {
        name: "Leather Cera 905 Russet Brown",
        image: "/fredericia/delphi-sofa/variant1.jpg",
        material: "Leather Cera 905",
        price: 98000,
      },
      {
        name: "Steelcut Trio 213",
        image: "/fredericia/delphi-sofa/variant2.jpg",
        material: "Steelcut Trio fabric",
        price: 92000,
      },
    ],
    designer: "GamFratesi",
    features: [
      "Contemporary two-seater design",
      "Multiple premium upholstery options",
      "Solid beech frame construction",
      "Clean Scandinavian lines",
      "Exceptional comfort and support",
      "Perfect for modern interiors",
      "Professional craftsmanship",
      "Timeless Danish aesthetic",
      "Available in leather and fabric",
      "Brushed aluminium leg options"
    ],
    specifications: [
      { label: "Designer", value: "GamFratesi" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Frame Material", value: "Solid beech with steel springs" },
      { label: "Upholstery Options", value: "Leather Max 98, Leather Cera 905, Steelcut Trio fabric" },
      { label: "Dimensions", value: "W: 205cm, D: 85cm, H: 75cm" },
      { label: "Seat Height", value: "42cm" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Year", value: "2018" },
      { label: "Legs", value: "Brushed aluminium or powder coated" },
      { label: "Care", value: "Leather care kit recommended for leather versions" },
      { label: "Warranty", value: "5 years on frame, 2 years on upholstery" },
      { label: "Origin", value: "Italian design, Danish craftsmanship" },
    ],
    lifestyleImages: [
      "/fredericia/delphi-sofa/lifestyle1.jpg",
      "/fredericia/delphi-sofa/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "delphi-elements-sofa", name: "Delphi Elements Sofa" },
      { id: "ej220-sofa-2-seater", name: "EJ220 Sofa 2 Seater" },
      { id: "wegner-ox-chair", name: "Wegner Ox Chair" }
    ],
  },
  {
    id: "ej-5-corona-armchair",
    name: "EJ 5 Corona Armchair",
    description: "Elegant armchair designed by Erik Jørgensen, featuring refined proportions and exceptional comfort. The Corona armchair represents the perfect balance between traditional craftsmanship and contemporary design.",
    price: 69347,
    category: "Seating",
    variants: [
      {
        name: "Leather Omni 301 Black",
        image: "/fredericia/corona-armchair/main.jpg",
        material: "Leather Omni 301",
        price: 69347,
      },
      {
        name: "Fjord 961",
        image: "/fredericia/corona-armchair/variant1.jpg",
        material: "Fjord fabric",
        price: 61394,
      },
      {
        name: "Hallingdal 110",
        image: "/fredericia/corona-armchair/variant2.jpg",
        material: "Hallingdal fabric",
        price: 61394,
      },
      {
        name: "Leather Max 95 Cognac",
        image: "/fredericia/corona-armchair/variant3.jpg",
        material: "Leather Max 95",
        price: 86338,
      },
    ],
    designer: "Erik Jørgensen",
    features: [
      "Classic armchair design",
      "Premium leather and fabric upholstery options",
      "Solid beech frame construction",
      "Refined proportions and comfort",
      "Traditional craftsmanship",
      "Contemporary Danish design",
      "Perfect for reading corners",
      "Timeless aesthetic"
    ],
    specifications: [
      { label: "Designer", value: "Erik Jørgensen" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Frame Material", value: "Solid beech with webbing" },
      { label: "Upholstery", value: "Premium leather and fabric options" },
      { label: "Dimensions", value: "W: 75cm, D: 85cm, H: 78cm" },
      { label: "Seat Height", value: "40cm" },
      { label: "Style", value: "Classic contemporary" },
      { label: "Year", value: "1965" },
      { label: "Care", value: "Leather care recommended for leather versions" },
      { label: "Warranty", value: "5 years on frame, 2 years on upholstery" },
      { label: "Origin", value: "Danish design and craftsmanship" },
    ],
    lifestyleImages: [
      "/fredericia/corona-armchair/lifestyle1.jpg",
      "/fredericia/corona-armchair/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "wegner-ox-chair", name: "Wegner Ox Chair" },
      { id: "ej220-sofa-2-seater", name: "EJ220 Sofa 2 Seater" },
      { id: "bm71-library-table", name: "BM71 Library Table" }
    ],
  },
  {
    id: "insula-piccolo-side-table",
    name: "Insula Piccolo Side Table",
    description: "Compact side table with elegant proportions and premium materials. The Insula Piccolo offers functional design with sophisticated aesthetics, perfect for modern living spaces.",
    price: 12000,
    category: "Tables",
    variants: [
      {
        name: "Oak Natural",
        image: "/fredericia/insula-piccolo-side-table/main.jpg",
        material: "Solid oak",
        price: 12000,
      },
    ],
    designer: "Fredericia Design Team",
    features: [
      "Compact side table design",
      "Premium solid oak construction",
      "Elegant proportions",
      "Functional and aesthetic",
      "Perfect for small spaces",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Versatile placement options"
    ],
    specifications: [
      { label: "Designer", value: "Fredericia Design Team" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid oak with oil finish" },
      { label: "Dimensions", value: "Ø: 45cm, H: 45cm" },
      { label: "Weight", value: "8kg" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Shape", value: "Round" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/insula-piccolo-side-table/lifestyle1.jpg"
    ],
    relatedProducts: [
      { id: "bm71-library-table", name: "BM71 Library Table" },
      { id: "piloti-coffee-table", name: "Piloti Coffee Table" },
      { id: "risom-magazine-table", name: "Risom Magazine Table" }
    ],
  },
  {
    id: "mogensen-6284-dining-table",
    name: "Mogensen 6284 Dining Table",
    description: "Classic dining table designed by Børge Mogensen, featuring clean lines and exceptional craftsmanship. The 6284 table represents timeless Danish design with functional elegance.",
    price: 85000,
    category: "Tables",
    variants: [
      {
        name: "Oak Natural",
        image: "/fredericia/mogensen-dining-table/main.jpg",
        material: "Solid oak",
        price: 85000,
      },
    ],
    designer: "Børge Mogensen",
    features: [
      "Classic dining table design",
      "Premium solid oak construction",
      "Timeless Danish design",
      "Exceptional craftsmanship",
      "Perfect for family dining",
      "Clean Scandinavian lines",
      "Durable construction",
      "Suitable for 6-8 people"
    ],
    specifications: [
      { label: "Designer", value: "Børge Mogensen" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid oak with oil finish" },
      { label: "Dimensions", value: "W: 180cm, D: 90cm, H: 73cm" },
      { label: "Seating", value: "6-8 people" },
      { label: "Style", value: "Classic Scandinavian" },
      { label: "Year", value: "1962" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/mogensen-dining-table/lifestyle1.jpg"
    ],
    relatedProducts: [
      { id: "mogensen-j39-dining-chair", name: "Mogensen J39 Dining Chair" },
      { id: "bm71-library-table", name: "BM71 Library Table" },
      { id: "post-dining-chair-with-wooden-seat", name: "Post Dining Chair" }
    ],
  },
  {
    id: "mogensen-j39-dining-chair",
    name: "Mogensen J39 Dining Chair",
    description: "Iconic dining chair designed by Børge Mogensen in 1947. The J39 chair represents the perfect balance between traditional craftsmanship and modern functionality, featuring a distinctive spindle back design.",
    price: 8930,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oiled Oak",
        image: "/fredericia/mogensen-j39-dining-chair/main.jpg",
        material: "Solid oak",
        price: 8930,
      },
      {
        name: "Soaped Oak",
        image: "/fredericia/mogensen-j39-dining-chair/variant1.webp",
        material: "Solid oak",
        price: 8930,
      },
      {
        name: "Black Oak",
        image: "/fredericia/mogensen-j39-dining-chair/variant2.jpg",
        material: "Solid oak",
        price: 9535,
      },
    ],
    designer: "Børge Mogensen",
    features: [
      "Iconic spindle back design",
      "Premium solid oak construction",
      "Traditional craftsmanship",
      "Modern functionality",
      "Perfect for dining rooms",
      "Stackable design",
      "Timeless Danish aesthetic",
      "Exceptional comfort"
    ],
    specifications: [
      { label: "Designer", value: "Børge Mogensen" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid oak with natural finish" },
      { label: "Dimensions", value: "W: 50cm, D: 47cm, H: 78cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Style", value: "Traditional Scandinavian" },
      { label: "Year", value: "1947" },
      { label: "Stackable", value: "Yes" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/mogensen-j39-dining-chair/lifestyle1.jpg",
      "/fredericia/mogensen-j39-dining-chair/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "mogensen-6284-dining-table", name: "Mogensen 6284 Dining Table" },
      { id: "post-dining-chair-with-wooden-seat", name: "Post Dining Chair" },
      { id: "bm71-library-table", name: "BM71 Library Table" }
    ],
  },
  {
    id: "piloti-coffee-table",
    name: "Piloti Coffee Table",
    description: "Contemporary coffee table with architectural design elements. The Piloti table features clean lines and premium materials, creating a sophisticated centerpiece for modern living spaces.",
    price: 45000,
    category: "Tables",
    variants: [
      {
        name: "Oak Natural",
        image: "/fredericia/piloti-coffee-table/main.jpg",
        material: "Solid oak",
        price: 45000,
      },
      {
        name: "Oak Dark",
        image: "/fredericia/piloti-coffee-table/variant1.jpg",
        material: "Solid oak with dark finish",
        price: 47000,
      },
    ],
    designer: "Fredericia Design Team",
    features: [
      "Contemporary architectural design",
      "Premium solid oak construction",
      "Clean geometric lines",
      "Sophisticated centerpiece",
      "Perfect for modern living rooms",
      "Durable construction",
      "Contemporary Scandinavian aesthetic",
      "Functional and beautiful"
    ],
    specifications: [
      { label: "Designer", value: "Fredericia Design Team" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid oak with oil finish" },
      { label: "Dimensions", value: "W: 120cm, D: 60cm, H: 40cm" },
      { label: "Shape", value: "Rectangular" },
      { label: "Style", value: "Contemporary architectural" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/piloti-coffee-table/lifestyle1.jpg"
    ],
    relatedProducts: [
      { id: "insula-piccolo-side-table", name: "Insula Piccolo Side Table" },
      { id: "risom-magazine-table", name: "Risom Magazine Table" },
      { id: "mogensen-6284-dining-table", name: "Mogensen 6284 Dining Table" }
    ],
  },
  {
    id: "post-dining-chair-with-wooden-seat",
    name: "Post Dining Chair",
    description: "Minimalist dining chair with wooden seat, designed for comfort and durability. The Post chair embodies Scandinavian simplicity with functional design principles.",
    price: 6500,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oak Natural",
        image: "/fredericia/post-dining-chair/main.jpg",
        material: "Solid oak",
        price: 6500,
      },
      {
        name: "Black Lacquered Oak",
        image: "/fredericia/post-dining-chair/variant1.jpg",
        material: "Black lacquered oak",
        price: 10135,
      },
    ],
    designer: "Fredericia Design Team",
    features: [
      "Minimalist dining chair design",
      "Premium solid oak construction",
      "Wooden seat for durability",
      "Scandinavian simplicity",
      "Perfect for dining rooms",
      "Comfortable seating",
      "Contemporary aesthetic",
      "Sustainable materials"
    ],
    specifications: [
      { label: "Designer", value: "Fredericia Design Team" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid oak with natural finish" },
      { label: "Dimensions", value: "W: 45cm, D: 50cm, H: 78cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Style", value: "Minimalist Scandinavian" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/post-dining-chair/lifestyle1.jpg",
      "/fredericia/post-dining-chair/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "mogensen-j39-dining-chair", name: "Mogensen J39 Dining Chair" },
      { id: "mogensen-6284-dining-table", name: "Mogensen 6284 Dining Table" },
      { id: "trinidad-chair", name: "Trinidad Chair" }
    ],
  },
  {
    id: "risom-magazine-table",
    name: "Risom Magazine Table",
    description: "Functional magazine table with elegant design, created by Jens Risom. Perfect for organizing reading materials while maintaining sophisticated aesthetics. This piece combines practical storage with timeless Danish design principles.",
    price: 6945,
    category: "Tables",
    variants: [
      {
        name: "Lacquered Oak",
        image: "/fredericia/risom-magazine-table/main.jpg",
        material: "Solid oak",
        price: 6945,
      },
      {
        name: "Black Lacquered Oak",
        image: "/fredericia/risom-magazine-table/variant1.jpg",
        material: "Black lacquered oak",
        price: 6945,
      },
    ],
    designer: "Jens Risom",
    features: [
      "Functional magazine storage design",
      "Premium solid oak construction",
      "Elegant proportions",
      "Perfect for reading areas",
      "Timeless Danish design",
      "Sophisticated aesthetics",
      "Durable construction",
      "Versatile placement options"
    ],
    specifications: [
      { label: "Designer", value: "Jens Risom" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid oak with oil finish" },
      { label: "Dimensions", value: "W: 60cm, D: 40cm, H: 50cm" },
      { label: "Weight", value: "12kg" },
      { label: "Style", value: "Mid-century modern" },
      { label: "Storage", value: "Magazine compartment" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish-American design" },
    ],
    lifestyleImages: [
      "/fredericia/risom-magazine-table/lifestyle1.jpg",
      "/fredericia/risom-magazine-table/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "piloti-coffee-table", name: "Piloti Coffee Table" },
      { id: "insula-piccolo-side-table", name: "Insula Piccolo Side Table" },
      { id: "bm71-library-table", name: "BM71 Library Table" }
    ],
  },
  {
    id: "the-canvas-chair",
    name: "The Canvas Chair",
    description: "Contemporary chair with canvas upholstery, combining comfort with modern aesthetics. Perfect for casual and formal settings, this chair represents the evolution of Scandinavian design with its clean lines and natural materials.",
    price: 15500,
    category: "Seating",
    variants: [
      {
        name: "Oak Natural & Canvas Natural",
        image: "/fredericia/canvas-chair/main.jpg",
        material: "Oak & Canvas",
        price: 15500,
      },
      {
        name: "Oak Natural & Canvas Black",
        image: "/fredericia/canvas-chair/variant1.jpg",
        material: "Oak & Black Canvas",
        price: 15500,
      },
      {
        name: "Black Oak & Canvas Natural",
        image: "/fredericia/canvas-chair/variant2.jpg",
        material: "Black Oak & Canvas",
        price: 16200,
      },
    ],
    designer: "Fredericia Design Team",
    features: [
      "Contemporary chair design",
      "Canvas upholstery for comfort",
      "Solid oak frame construction",
      "Modern aesthetics",
      "Perfect for various settings",
      "Sustainable materials",
      "Clean Scandinavian lines",
      "Versatile styling"
    ],
    specifications: [
      { label: "Designer", value: "Fredericia Design Team" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Frame Material", value: "Solid oak with natural finish" },
      { label: "Upholstery", value: "Natural canvas" },
      { label: "Dimensions", value: "W: 55cm, D: 52cm, H: 80cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Canvas can be removed for cleaning" },
      { label: "Warranty", value: "5 years on frame, 2 years on upholstery" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/canvas-chair/lifestyle1.jpg",
      "/fredericia/canvas-chair/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "post-dining-chair-with-wooden-seat", name: "Post Dining Chair" },
      { id: "trinidad-chair", name: "Trinidad Chair" },
      { id: "mogensen-j39-dining-chair", name: "Mogensen J39 Dining Chair" }
    ],
  },
  {
    id: "trinidad-chair",
    name: "Trinidad Chair",
    description: "Iconic chair with distinctive perforated shell design, created by Nanna Ditzel. Available in multiple color combinations with chrome or powder-coated finishes. The Trinidad chair is a masterpiece of form and function, offering exceptional comfort through its innovative design.",
    price: 6245,
    category: "Dining Chairs",
    variants: [
      {
        name: "Beech & Chrome",
        image: "/fredericia/trinidad-chair/main.jpg",
        material: "Beech & Chrome",
        price: 6245,
      },
      {
        name: "Black & Chrome",
        image: "/fredericia/trinidad-chair/variant1.jpg",
        material: "Black & Chrome",
        price: 6810,
      },
      {
        name: "Grey & Flint",
        image: "/fredericia/trinidad-chair/variant2.jpg",
        material: "Grey & Flint",
        price: 7125,
      },
      {
        name: "Light Grey & Flint",
        image: "/fredericia/trinidad-chair/variant3.jpg",
        material: "Light Grey & Flint",
        price: 7125,
      },
      {
        name: "Black & Black",
        image: "/fredericia/trinidad-chair/variant4.jpg",
        material: "Black & Black",
        price: 7125,
      },
    ],
    designer: "Nanna Ditzel",
    features: [
      "Iconic perforated shell design",
      "Multiple color combinations available",
      "Chrome and powder-coated finishes",
      "Exceptional comfort through design",
      "Stackable for easy storage",
      "Perfect for dining and office use",
      "Innovative form and function",
      "Timeless Danish design"
    ],
    specifications: [
      { label: "Designer", value: "Nanna Ditzel" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Shell Material", value: "Molded plywood or lacquered" },
      { label: "Base", value: "Chrome or powder-coated steel" },
      { label: "Dimensions", value: "W: 50cm, D: 52cm, H: 77cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Style", value: "Mid-century modern" },
      { label: "Year", value: "1993" },
      { label: "Stackable", value: "Yes, up to 8 chairs" },
      { label: "Care", value: "Clean with damp cloth" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design" },
    ],
    lifestyleImages: [
      "/fredericia/trinidad-chair/lifestyle1.jpg",
      "/fredericia/trinidad-chair/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "mogensen-j39-dining-chair", name: "Mogensen J39 Dining Chair" },
      { id: "post-dining-chair-with-wooden-seat", name: "Post Dining Chair" },
      { id: "the-canvas-chair", name: "The Canvas Chair" }
    ],
  },
  {
    id: "wegner-j16-rocking-chair",
    name: "Wegner J16 Rocking Chair",
    description: "Classic rocking chair designed by Hans J. Wegner, combining traditional craftsmanship with timeless comfort and elegance. This piece represents Wegner's mastery of wood craftsmanship and his ability to create furniture that is both beautiful and functional.",
    price: 30900,
    category: "Seating",
    variants: [
      {
        name: "Oiled Oak Natural Seat",
        image: "/fredericia/wegner-j16-rocking-chair/main.jpg",
        material: "Oiled oak with natural seat",
        price: 30900,
      },
      {
        name: "Soaped Oak Natural Seat",
        image: "/fredericia/wegner-j16-rocking-chair/variant1.jpg",
        material: "Soaped oak with natural seat",
        price: 30900,
      },
      {
        name: "Black Oak Natural Seat",
        image: "/fredericia/wegner-j16-rocking-chair/variant2.jpg",
        material: "Black lacquered oak with natural seat",
        price: 30900,
      },
      {
        name: "Black Oak Black Seat",
        image: "/fredericia/wegner-j16-rocking-chair/variant3.jpg",
        material: "Black lacquered oak with black seat",
        price: 35535,
      },
      {
        name: "Oiled Walnut Natural Seat",
        image: "/fredericia/wegner-j16-rocking-chair/variant4.jpg",
        material: "Oiled walnut with natural seat",
        price: 38625,
      },
    ],
    designer: "Hans J. Wegner",
    features: [
      "Classic rocking chair design",
      "Premium solid wood construction",
      "Traditional craftsmanship",
      "Timeless comfort and elegance",
      "Perfect for relaxation",
      "Wegner's signature style",
      "Exceptional build quality",
      "Multiple wood and seat options"
    ],
    specifications: [
      { label: "Designer", value: "Hans J. Wegner" },
      { label: "Manufacturer", value: "Fredericia" },
      { label: "Material", value: "Solid wood with natural or black seat" },
      { label: "Dimensions", value: "W: 62cm, D: 114cm, H: 108cm" },
      { label: "Seat Height", value: "38cm" },
      { label: "Style", value: "Traditional Scandinavian" },
      { label: "Year", value: "1944" },
      { label: "Rocking Motion", value: "Smooth curved runners" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Warranty", value: "5 years on frame" },
      { label: "Origin", value: "Danish design masterpiece" },
    ],
    lifestyleImages: [
      "/fredericia/wegner-j16-rocking-chair/lifestyle1.jpg",
      "/fredericia/wegner-j16-rocking-chair/lifestyle2.jpg"
    ],
    relatedProducts: [
      { id: "wegner-ox-chair", name: "Wegner Ox Chair" },
      { id: "ej-5-corona-armchair", name: "EJ 5 Corona Armchair" },
      { id: "mogensen-j39-dining-chair", name: "Mogensen J39 Dining Chair" }
    ],
  },
];

export default function FredericiaProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
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
            href="/fredericia" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Fredericia Collection
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
            <Link href="/fredericia" className="text-stone-600 hover:text-stone-800">
              Fredericia
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
                Fredericia Collection
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

            {/* Special Note for Wegner Ox Chair */}
            {product.id === 'wegner-ox-chair' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">
                      Masterpiece Collection
                    </h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        This is an authentic Hans J. Wegner design, handcrafted in Denmark. 
                        Each chair is made to order with a lead time of 12-16 weeks. 
                        A 50% deposit is required upon ordering.
                      </p>
                    </div>
                  </div>
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

            {/* Designer Information for Wegner Ox Chair */}
            {product.id === 'wegner-ox-chair' && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">
                  About the Designer
                </h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <p>
                    Hans J. Wegner (1914-2007) was a Danish furniture designer who is considered one of the most important figures in the history of furniture design. Known as the "Master of the Chair," Wegner designed over 500 chairs during his career, many of which are considered masterpieces of 20th-century design.
                  </p>
                  <p>
                    The Ox Chair, designed in 1960, represents Wegner's ability to combine sculptural beauty with functional comfort. Its distinctive silhouette, inspired by the horns of an ox, showcases his mastery of organic forms and his deep understanding of wood craftsmanship.
                  </p>
                </div>
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
                        href={`/fredericia/${related.id}`}
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
                    href="/fredericia"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    View All Fredericia Products
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
