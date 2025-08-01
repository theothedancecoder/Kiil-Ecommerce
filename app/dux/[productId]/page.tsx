"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  color?: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  relatedProducts?: { id: string; name: string }[];
  lifestyleImages?: string[];
}

const products: Product[] = [
  {
    id: "inter-dining-table",
    name: "Inter Dining Table",
    description: "This is a made to order item. Expected delivery time is approximately 8 weeks. The Inter table is available in two sizes and two colors. A classic cafe table, perfect for smaller dining areas or a classic dining table perfect for 6 people. The plate is made of nanolaminate which is very durable.",
    price: 19490,
    designer: "DUX Design Team",
    lifestyleImages: [
      "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
      "/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp"
    ],
    variants: [
      {
        name: "Ø-110 White Laminate",
        image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
        color: "#FFFFFF",
        price: 19490,
      },
      {
        name: "Ø-110 Black Laminate",
        image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 sort laminat.jpg",
        color: "#000000",
        price: 19490,
      },
      {
        name: "100×180 White Laminate",
        image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 19 490  Varianter - Ø-110 hvit laminat.webp",
        color: "#FFFFFF",
        price: 26440,
      },
      {
        name: "100×180 Black Laminate",
        image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 26 440  Varianter - 100x180 sort laminat.webp",
        color: "#000000",
        price: 26440,
      },
      {
        name: "100×180 White Laminate w/2 Insert Panels",
        image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 hvit laminat m:2 illeggsplater.webp",
        color: "#FFFFFF",
        price: 45990,
      },
      {
        name: "100×180 Black Laminate w/2 Insert Panels",
        image: "/dux/Inter-dining-table/Inter spisebord fra DUX kr 45 990  Varianter - 100x180 sort laminat m:2 illeggsplater.webp",
        color: "#000000",
        price: 45990,
      },
    ],
    features: [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by DUX Design Team in 1986",
      "Available in two sizes: round Ø-110 and rectangular 100×180",
      "Available in two colors: white and black nanolaminate",
      "Classic cafe table perfect for smaller dining areas",
      "Rectangular version perfect for 6 people",
      "Durable nanolaminate tabletop surface",
      "Chrome base construction for stability",
      "Optional insert panels available for extension (55cm each)",
    ],
    specifications: [
      { label: "Designer", value: "DUX Design Team" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Design Year", value: "1986" },
      { label: "Round Table Diameter", value: "Ø-110 cm" },
      { label: "Round Table Height", value: "72 cm" },
      { label: "Rectangular Table Size", value: "100×180 cm" },
      { label: "Rectangular Table Height", value: "72 cm" },
      { label: "Insert Panel Size", value: "55 cm each" },
      { label: "Tabletop Material", value: "Nanolaminate" },
      { label: "Base Material", value: "Chrome" },
      { label: "Available Colors", value: "White laminate, Black laminate" },
      { label: "Round Table Capacity", value: "Perfect for smaller dining areas" },
      { label: "Rectangular Table Capacity", value: "Perfect for 6 people" },
      { label: "Surface Properties", value: "Very durable nanolaminate" },
      { label: "Extension Options", value: "2 insert panels available for rectangular table" },
      { label: "Style", value: "Classic cafe table design" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
      { label: "Durability", value: "High durability nanolaminate surface" },
      { label: "Base Design", value: "Chrome pedestal base" },
    ],
    relatedProducts: [
      { id: "sam-dining-chair", name: "Sam Dining Chair" },
      { id: "lunaria-table", name: "Lunaria Table" },
    ],
  },
  {
    id: "jetson-classic-soft-88",
    name: "Jetson Classic Soft 88",
    description: "Dux is perhaps best known for its patented beds, but the Swedes can really make furniture too. Dux stands for ergonomics, quality and timelessness. We offer the Jetson 88 armchair, a classic that is built on the same base as the chair of the same name that Bruno Mathsson signed in 1966. Jetson has a sophisticated design and a great shape. It is upholstered in Classic Soft leather in black. The swivel chair exudes comfort, and fits in both modern and more classic homes.",
    price: 27990,
    designer: "Bruno Mathsson",
    lifestyleImages: [
      "/dux/Jetson Classic soft 88/lifestyle/furniture-easy-chair-jetson-black-dakota-88-pie-1-2-scaled.jpg.avif"
    ],
    variants: [
      {
        name: "Classic Soft 88 Black",
        image: "/dux/Jetson Classic soft 88/classic soft 88 black.jpg",
        color: "Black",
        price: 27990,
      },
      {
        name: "Classic Soft 25 Brown",
        image: "/dux/Jetson Classic soft 88/classic soft 25 brown.jpg",
        color: "Brown",
        price: 27990,
      },
    ],
    features: [
      "Ergonomic design for maximum comfort",
      "Swivel functionality for versatility",
      "Premium Classic Soft leather upholstery",
      "Built on Bruno Mathsson's 1966 design foundation",
      "Sophisticated and timeless aesthetic",
      "Suitable for both modern and classic interiors",
    ],
    specifications: [
      { label: "Designer", value: "Bruno Mathsson" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Dimensions", value: "W 65 x D 83 x H 97 cm" },
      { label: "Weight", value: "10 kg" },
      { label: "Material", value: "Classic Soft leather" },
      { label: "Design Options", value: "Classic Soft 25 / flax 21" },
      { label: "Year", value: "1966 (Original design)" },
      { label: "Type", value: "Swivel armchair" },
    ],
    relatedProducts: [
      { id: "jetson-match-flax-21", name: "Jetson Match Flax 21" },
      { id: "superspider-sheepskin", name: "Superspider Sheepskin" },
    ],
  },
  {
    id: "jetson-match-flax-21",
    name: "Jetson Match Flax 21",
    description: "Jetson Match is a special design of the Jetson armchair, a tribute to Bruno Mathsson and his design of the Swedish design classic. Jetson Match is made of the linen fabric Flax 21 which, together with the edges, frame and neck cushion in black or cognac color of the exclusive Dakota leather, creates a combination of materials that marry incredibly nicely and stylishly together. Jetson Match armchair has a seat element made of tubes with a chrome-plated frame, and rotor construction together with leather and linen. Feel free to use together with the matching Jetson 69 Footstool from Bruno Mathsson International.",
    price: 27990,
    designer: "Bruno Mathsson",
    lifestyleImages: [
      "/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg",
      "/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg"
    ],
    variants: [
      {
        name: "Flax 21 with Dakota 88 Black Leather",
        image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax 21 : dakota 88 leather NOK  27,990.jpg",
        color: "#1a1a1a",
        price: 27990,
      },
      {
        name: "Flax 21 with Dakota 29 Cognac Leather",
        image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax : daktota 29 leather :21 NOK  27,990.jpg",
        color: "#A0522D",
        price: 27990,
      },
      {
        name: "Flax 21 with Dakota 24 Leather",
        image: "/dux/Jetson-Match-Flax-21/Jetson Match Flax-dakota 24 leather: 21 NOK  27,990.webp",
        color: "#8B4513",
        price: 27990,
      },
    ],
    features: [
      "Special design tribute to Bruno Mathsson's Swedish design classic",
      "Made with premium Flax 21 linen fabric",
      "Exclusive Dakota leather edges, frame and neck cushion",
      "Available in black or cognac Dakota leather combinations",
      "Seat element made of tubes with chrome-plated frame",
      "Rotor construction with leather and linen materials",
      "Sophisticated combination of materials that marry stylishly",
      "Compatible with matching Jetson 69 Footstool",
      "Swivel armchair functionality",
    ],
    specifications: [
      { label: "Designer", value: "Bruno Mathsson" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Collection", value: "Bruno Mathsson International" },
      { label: "Width", value: "65 cm" },
      { label: "Height", value: "97 cm" },
      { label: "Depth", value: "83 cm" },
      { label: "Seat Height", value: "40 cm" },
      { label: "Weight", value: "10 kg" },
      { label: "Dimensions (Packaged)", value: "90 × 90 × 100 cm" },
      { label: "Primary Material", value: "Flax 21 linen fabric" },
      { label: "Accent Material", value: "Dakota leather (edges, frame, neck cushion)" },
      { label: "Frame Material", value: "Chrome-plated metal" },
      { label: "Construction", value: "Rotor construction with tubes" },
      { label: "Leather Options", value: "Black (Dakota 88), Cognac (Dakota 29), Dakota 24" },
      { label: "Finish Combination", value: "Linen, leather, metal" },
      { label: "Type", value: "Swivel armchair" },
      { label: "Style", value: "Swedish design classic tribute" },
      { label: "Matching Accessories", value: "Jetson 69 Footstool available" },
      { label: "Design Heritage", value: "Tribute to Bruno Mathsson's original design" },
    ],
    relatedProducts: [
      { id: "jetson-classic-soft-88", name: "Jetson Classic Soft 88" },
      { id: "superspider-sheepskin", name: "Superspider Sheepskin" },
    ],
  },
  {
    id: "lunaria-table",
    name: "Lunaria Table",
    description: "This is a made to order item. Expected delivery time is approximately 8 weeks. The Lunaria series consists of 3 different small tables that look just as good in a group as they do individually. The tables have an organic shape that makes them stand out. Here in wax-oiled ash, but also available in wax-oiled oak and wax-oiled walnut. Contact us at gjovik@kiil.no for a quote.",
    price: 10215,
    designer: "Claesson Koivisto Rune",
    lifestyleImages: [
      "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
      "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp"
    ],
    variants: [
      {
        name: "Small - Wax-oiled Ash (H-50 Ø-39)",
        image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
        color: "#D2B48C",
        price: 10215,
      },
      {
        name: "Medium - Wax-oiled Ash (H-45 Ø-60)",
        image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
        color: "#D2B48C",
        price: 10980,
      },
      {
        name: "Large - Wax-oiled Ash (H-40 Ø-86)",
        image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16,080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
        color: "#D2B48C",
        price: 16080,
      },
      {
        name: "Small - Wax-oiled Oak (H-50 Ø-39)",
        image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
        color: "#DEB887",
        price: 10215,
      },
      {
        name: "Medium - Wax-oiled Oak (H-45 Ø-60)",
        image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
        color: "#DEB887",
        price: 10980,
      },
      {
        name: "Large - Wax-oiled Oak (H-40 Ø-86)",
        image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16,080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
        color: "#DEB887",
        price: 16080,
      },
      {
        name: "Small - Wax-oiled Walnut (H-50 Ø-39)",
        image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 215  Størrelse - Small Large Medium Small Nullstill H-50 Ø-39.webp",
        color: "#8B4513",
        price: 10215,
      },
      {
        name: "Medium - Wax-oiled Walnut (H-45 Ø-60)",
        image: "/dux/Lunaria-table /Lunaria bord fra DUX kr 10 980  Størrelse - Medium Large Medium Small Nullstill H-45 Ø-60.webp",
        color: "#8B4513",
        price: 10980,
      },
      {
        name: "Large - Wax-oiled Walnut (H-40 Ø-86)",
        image: "/dux/Lunaria-table /Lunaria table from DUX NOK  16,080  Size -  Large Large Medium Small Reset H-40 Ø-86.webp",
        color: "#8B4513",
        price: 16080,
      },
    ],
    features: [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by Claesson Koivisto Rune in 2018",
      "Organic shape that makes them stand out",
      "Available in 3 different sizes (Small, Medium, Large)",
      "Look great individually or as a group",
      "Solid wood construction with wax-oil finish",
      "Available in ash, oak, and walnut wood options",
      "Custom quotes available - contact gjovik@kiil.no",
      "Timeless Scandinavian design aesthetic",
    ],
    specifications: [
      { label: "Designer", value: "Claesson Koivisto Rune" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Design Year", value: "2018" },
      { label: "Collection", value: "Lunaria Series" },
      { label: "Material", value: "Solid wood with wax-oil finish" },
      { label: "Wood Options", value: "Ash, Oak, Walnut" },
      { label: "Small Size - Height", value: "50 cm" },
      { label: "Small Size - Diameter", value: "39 cm" },
      { label: "Medium Size - Height", value: "45 cm" },
      { label: "Medium Size - Diameter", value: "60 cm" },
      { label: "Large Size - Height", value: "40 cm" },
      { label: "Large Size - Diameter", value: "86 cm" },
      { label: "Shape", value: "Organic circular design" },
      { label: "Finish", value: "Wax-oiled" },
      { label: "Usage", value: "Individual or group arrangement" },
      { label: "Style", value: "Modern Scandinavian" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
      { label: "Custom Orders", value: "Contact gjovik@kiil.no for quotes" },
      { label: "Weight", value: "N/A (Contact for specifications)" },
      { label: "Dimensions", value: "Varies by size selection" },
    ],
    relatedProducts: [
      { id: "sam-dining-chair", name: "Sam Dining Chair" },
      { id: "inter-dining-table", name: "Inter Dining Table" },
    ],
  },
  {
    id: "sam-dining-chair",
    name: "Sam Dining Chair",
    description: "This is a made to order item. Expected delivery time is approximately 12 weeks. Sam is an elegant and comfortable chair from Dux, designed by Sam Larsson in 1974. The dining chair was relaunched in 2015 as part of the DUX Design Revival. The chair has a chrome frame and a tufted seat with cold foam, both the seat and back are upholstered in leather and the back is upholstered in fabric. There is also a decorative buckle on the back of the chair. The chair is available with or without armrests. Sam was relaunched by Dux in 2015.",
    price: 13790,
    designer: "Sam Larsson",
    lifestyleImages: [
      "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
      "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg"
    ],
    variants: [
      {
        name: "Classic Soft 88 - With Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg",
        color: "#1a1a1a",
        price: 13790,
      },
      {
        name: "Naturale Camel - With Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
        color: "#C8A882",
        price: 13790,
      },
      {
        name: "Naturale Perle - With Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg",
        color: "#F5F5DC",
        price: 13790,
      },
      {
        name: "Naturale Truffle - With Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Truffle.jpg",
        color: "#8B4513",
        price: 13790,
      },
      {
        name: "Classic Soft 88 - Without Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Classic Soft 88.jpg",
        color: "#1a1a1a",
        price: 13790,
      },
      {
        name: "Naturale Camel - Without Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Dining Chair from DUX FromNOK  13,790  Color -  Natural Camel.jpg",
        color: "#C8A882",
        price: 13790,
      },
      {
        name: "Naturale Perle - Without Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Perle.jpg",
        color: "#F5F5DC",
        price: 13790,
      },
      {
        name: "Naturale Truffle - Without Armrest",
        image: "/dux/Sam-Dining-Chair/Sam Spisestol fra DUX Fra kr 13 790  Farge - Naturale Truffle.jpg",
        color: "#8B4513",
        price: 13790,
      },
    ],
    features: [
      "Made to order - Expected delivery time approximately 12 weeks",
      "Elegant and comfortable design by Sam Larsson (1974)",
      "Chrome frame with tufted seat and cold foam padding",
      "Seat and back upholstered in premium leather",
      "Back also upholstered in fabric with decorative buckle",
      "Available with or without armrests",
      "Part of DUX Design Revival collection",
      "Relaunched in 2015 from original 1974 design",
      "Multiple leather finish options available",
    ],
    specifications: [
      { label: "Designer", value: "Sam Larsson" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Original Design Year", value: "1974" },
      { label: "Relaunch Year", value: "2015" },
      { label: "Collection", value: "DUX Design Revival" },
      { label: "Weight", value: "8 kg" },
      { label: "Dimensions (Packaged)", value: "65 × 66 × 90 cm" },
      { label: "Width (With Armrest)", value: "62 cm" },
      { label: "Width (Without Armrest)", value: "48 cm" },
      { label: "Depth - Legs (With Armrest)", value: "52.5 cm" },
      { label: "Total Depth (With Armrest)", value: "57 cm" },
      { label: "Depth - Legs (Without Armrest)", value: "50 cm" },
      { label: "Total Depth (Without Armrest)", value: "55 cm" },
      { label: "Seat Height", value: "45 cm, 48 cm" },
      { label: "Height - Armrests", value: "62 cm" },
      { label: "Total Height (With Armrest)", value: "81 cm, 84 cm" },
      { label: "Total Height (Without Armrest)", value: "78 cm, 81 cm" },
      { label: "Padding", value: "Cold foam" },
      { label: "Base Material", value: "Chrome" },
      { label: "Upholstery", value: "Leather (seat and back) + Fabric (back)" },
      { label: "Available Colors", value: "Classic Soft 88, Naturale Camel, Naturale Perle, Naturale Truffle" },
      { label: "Model Options", value: "With Armrest, Without Armrest" },
      { label: "Special Features", value: "Decorative buckle on back, Tufted seat" },
      { label: "Delivery Time", value: "Approximately 12 weeks (Made to order)" },
    ],
    relatedProducts: [
      { id: "jetson-classic-soft-88", name: "Jetson Classic Soft 88" },
      { id: "inter-dining-table", name: "Inter Dining Table" },
    ],
  },
  {
    id: "superspider-sheepskin",
    name: "Superspider Sheepskin",
    description: "This is a made to order item. Expected delivery time is approximately 8 weeks. Superspider was designed by the DUX design team in 1987. It has become a classic and combines first-class material selection with modern design. Available in several colors and different fabrics, leather or sheepskin.",
    price: 53815,
    designer: "DUX Design Team",
    lifestyleImages: [
      "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
      "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg"
    ],
    variants: [
      {
        name: "Scandinavian Grey 22 Sheepskin",
        image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Scandinavian Grey 22.jpg",
        color: "#8B8680",
        price: 53815,
      },
      {
        name: "Black 01 Sheepskin",
        image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
        color: "#000000",
        price: 53815,
      },
      {
        name: "Off-white 02 Sheepskin",
        image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg",
        color: "#F5F5F0",
        price: 53815,
      },
      {
        name: "Cork 19 Sheepskin",
        image: "/dux/Superspider sheepskin /Superspider fåreskinn DUX kr 53 815  Farge - Cork 19.jpg",
        color: "#D2B48C",
        price: 53815,
      },
      {
        name: "Drake 20 Sheepskin",
        image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Black 01.jpg",
        color: "#4A4A4A",
        price: 53815,
      },
      {
        name: "Mohawi 21 Sheepskin",
        image: "/dux/Superspider sheepskin /Superspider sheepskin DUX NOK  53,815  Color -  Off-white 02.jpg",
        color: "#8B7355",
        price: 53815,
      },
    ],
    features: [
      "Made to order - Expected delivery time approximately 8 weeks",
      "Designed by DUX Design Team in 1987",
      "Classic design combining first-class material selection with modern aesthetics",
      "Available in several colors and different materials (fabric, leather, sheepskin)",
      "Seat and backrest constructed with tubular steel frame",
      "Pirelli strap support system for enhanced comfort",
      "Filled with polyester and fiberfill for optimal comfort",
      "Chrome-plated frame for durability and style",
      "Leather neck cushion included with fabric cover versions",
    ],
    specifications: [
      { label: "Designer", value: "DUX Design Team" },
      { label: "Manufacturer", value: "DUX" },
      { label: "Design Year", value: "1987" },
      { label: "Width", value: "75 cm" },
      { label: "Height", value: "86 cm" },
      { label: "Seat Height", value: "38 cm" },
      { label: "Depth", value: "149 cm" },
      { label: "Weight", value: "20 kg" },
      { label: "Dimensions (Packaged)", value: "160 × 90 × 100 cm" },
      { label: "Frame Material", value: "Tubular steel, chrome-plated" },
      { label: "Support System", value: "Pirelli strap for enhanced support" },
      { label: "Filling", value: "Polyester and fiberfill" },
      { label: "Available Materials", value: "Fabric, Leather, Sheepskin" },
      { label: "Available Colors", value: "Black 01, Cork 19, Drake 20, Mohawi 21, Off-white 02, Scandinavian Gray 22" },
      { label: "Special Features", value: "Leather neck cushion (with fabric versions)" },
      { label: "Style", value: "Modern classic design" },
      { label: "Material Quality", value: "First-class material selection" },
      { label: "Delivery Time", value: "Approximately 8 weeks (Made to order)" },
      { label: "Design Heritage", value: "Classic since 1987" },
    ],
    relatedProducts: [
      { id: "jetson-classic-soft-88", name: "Jetson Classic Soft 88" },
      { id: "jetson-match-flax-21", name: "Jetson Match Flax 21" },
    ],
  },
];

export default async function DuxProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  return <DuxProductContent product={product} />;
}

function DuxProductContent({ product }: { product: Product }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-stone-600 hover:text-stone-800">
              Home
            </Link>
            <span className="text-stone-400">/</span>
            <Link href="/dux" className="text-stone-600 hover:text-stone-800">
              DUX
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
                    {variant.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle image ${index + 1}`}
                      fill
                      className="object-contain object-center p-4"
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
                DUX Collection
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

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Variant: {selectedVariant.name}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariantIndex === index
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: variant.color || "#D1D5DB" }}
                    title={variant.name}
                  >
                    {selectedVariantIndex === index && (
                      <div className="absolute inset-0 rounded-full border-2 border-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {product.features && (
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Features
                  </h3>
                  <span className="text-gray-500">
                    {featuresExpanded ? '−' : '+'}
                  </span>
                </button>
                {featuresExpanded && (
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {product.specifications && (
              <div className="space-y-4 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setSpecsExpanded(!specsExpanded)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                    Specifications
                  </h3>
                  <span className="text-gray-500">
                    {specsExpanded ? '−' : '+'}
                  </span>
                </button>
                {specsExpanded && (
                  <div className="grid grid-cols-1 gap-4 text-gray-600">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {product.relatedProducts && (
              <div className="mt-20 pt-16 border-t border-gray-200">
                <h2 className="text-2xl font-light text-gray-900 mb-4 text-center">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                  {product.relatedProducts.map((related) => {
                    // Find the related product data to get image and price
                    const relatedProduct = products.find(p => p.id === related.id);
                    const relatedProductImage = relatedProduct?.variants[0]?.image;
                    const relatedProductPrice = relatedProduct?.variants[0]?.price;
                    
                    return (
                      <Link
                        key={related.id}
                        href={`/dux/${related.id}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                          <div className="relative aspect-square bg-gray-50">
                            {relatedProductImage && (
                              <Image
                                src={relatedProductImage}
                                alt={related.name}
                                fill
                                className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-light text-gray-900 mb-2">
                              {related.name}
                            </h3>
                            {relatedProductPrice && (
                              <p className="text-gray-900 font-medium">
                                kr {relatedProductPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="text-center">
                  <Link
                    href="/dux"
                    className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  >
                    View All DUX Products
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
