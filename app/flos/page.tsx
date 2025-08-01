"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductVariant {
  name: string;
  image: string;
  price: number;
  color?: string;
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
}

const products: Product[] = [
  {
    id: "2097-18-chandelier",
    name: "2097/18 Chandelier",
    description: "Iconic brass chandelier with 18 lights, a masterpiece of Italian design. The 2097 series represents the perfect balance between tradition and innovation.",
    price: 22270,
    category: "Lighting",
    variants: [
      {
        name: "Brass",
        image: "/FLOS/2097-18-chandelier-brass.jpg",
        color: "Brass",
        price: 22270,
      },
      {
        name: "Chrome",
        image: "/FLOS/2097-18-chandelier-chrome.jpg",
        color: "Chrome",
        price: 22270,
      },
      {
        name: "Matt Black",
        image: "/FLOS/2097-18-chandelier-matte-black.jpg",
        color: "Matt Black",
        price: 22270,
      },
      {
        name: "Matt White",
        image: "/FLOS/2097-18-chandelier-matt-white.jpg",
        color: "Matt White",
        price: 22270,
      },
    ],
    designer: "Gino Sarfatti",
    features: [
      "Iconic Italian design by Gino Sarfatti",
      "18 individual light sources",
      "Premium metal construction",
      "Multiple finish options",
      "Adjustable height installation",
      "Energy efficient LED compatible",
      "Timeless sculptural form",
      "Perfect for dining rooms and living spaces",
    ],
    specifications: [
      { label: "Designer", value: "Gino Sarfatti" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal with premium finishes" },
      { label: "Finish Options", value: "Brass, Chrome, Matt Black, Matt White" },
      { label: "Light Sources", value: "18 bulbs" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Installation", value: "Ceiling mounted" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Italian design" },
    ],
  },
  {
    id: "2097-30-chandelier",
    name: "2097/30 Chandelier",
    description: "Larger version of the iconic 2097 chandelier with 30 lights. An impressive statement piece that commands attention in any space.",
    price: 28050,
    category: "Lighting",
    variants: [
      {
        name: "Brass",
        image: "/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg",
        color: "Brass",
        price: 28050,
      },
      {
        name: "Chrome",
        image: "/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Chrome.webp",
        color: "Chrome",
        price: 28050,
      },
      {
        name: "Matt White",
        image: "/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Matt white.jpg",
        color: "Matt White",
        price: 28050,
      },
      {
        name: "Matte Black",
        image: "/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Matte Black.jpg",
        color: "Matte Black",
        price: 28050,
      },
    ],
    designer: "Gino Sarfatti",
    features: [
      "Iconic Italian design by Gino Sarfatti",
      "30 individual light sources for maximum impact",
      "Premium metal construction with multiple finishes",
      "Impressive scale perfect for large spaces",
      "Adjustable height installation system",
      "Energy efficient LED compatible bulbs",
      "Sculptural lighting masterpiece",
      "Perfect for grand dining rooms and lobbies",
      "Handcrafted Italian manufacturing",
      "Museum-quality design piece",
    ],
    specifications: [
      { label: "Designer", value: "Gino Sarfatti" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal with premium finishes" },
      { label: "Finish Options", value: "Brass, Chrome, Matt White, Matte Black" },
      { label: "Light Sources", value: "30 bulbs (E14 base)" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Installation", value: "Ceiling mounted with adjustable cable" },
      { label: "Dimensions", value: "Ø 100cm, H 85cm" },
      { label: "Light Source", value: "LED compatible (bulbs not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Care", value: "Clean with soft cloth, avoid abrasive cleaners" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
  },
  {
    id: "ktribe-1-floor-lamp",
    name: "KTribe 1 Floor Lamp",
    description: "Contemporary floor lamp with distinctive pleated shade design. The KTribe collection combines modern aesthetics with functional lighting, perfect for creating ambient illumination in any space.",
    price: 12130,
    category: "Lighting",
    variants: [
      {
        name: "Fumee",
        image: "/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Fumee.avif",
        color: "Fumee",
        price: 12130,
      },
      {
        name: "Transparent",
        image: "/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Transparent.webp",
        color: "Transparent",
        price: 12130,
      },
      {
        name: "Aluminized Bronze",
        image: "/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12,410  Color -  Acuminized Bronze.webp",
        color: "Aluminized Bronze",
        price: 12410,
      },
      {
        name: "Fabric",
        image: "/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12,430  Color -  Fabric.webp",
        color: "Fabric",
        price: 12430,
      },
    ],
    designer: "Philippe Starck",
    features: [
      "Designed by Philippe Starck",
      "Distinctive pleated shade design",
      "Multiple finish options",
      "Contemporary floor lamp",
      "Perfect for ambient lighting",
      "Premium construction quality",
      "Elegant proportions",
      "Suitable for modern interiors",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal and fabric/plastic shade" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Italian design" },
    ],
  },
  {
    id: "ktribe-2-floor-lamp",
    name: "KTribe 2 Floor Lamp",
    description: "Elegant floor lamp from the KTribe collection with refined proportions, perfect for creating warm ambient lighting in living spaces and contemporary interiors.",
    price: 11720,
    category: "Lighting",
    variants: [
      {
        name: "Transparent",
        image: "/FLOS/KTribe-2-floor-lamp/KTribe 2 floor lamp NOK  11,720  Color -  Transparent.webp",
        color: "Transparent",
        price: 11720,
      },
      {
        name: "Fumee",
        image: "/FLOS/KTribe-2-floor-lamp/KTribe 2 floor lamp NOK  11,720  Color - Fumee.webp",
        color: "Fumee",
        price: 11720,
      },
      {
        name: "Aluminized Bronze",
        image: "/FLOS/KTribe-2-floor-lamp/KTribe 2 floor lamp NOK  12,230  Color -  Acuminized Bronze.webp",
        color: "Aluminized Bronze",
        price: 12230,
      },
      {
        name: "Fabric",
        image: "/FLOS/KTribe-2-floor-lamp/KTribe 2 floor lamp NOK  12,230  Color -  Fabric.webp",
        color: "Fabric",
        price: 12230,
      },
    ],
    designer: "Philippe Starck",
    features: [
      "Designed by Philippe Starck",
      "Refined pleated shade design",
      "Multiple finish options",
      "Elegant floor lamp",
      "Perfect for ambient lighting",
      "Premium Italian construction",
      "Ideal proportions for residential spaces",
      "Suitable for modern interiors",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal and fabric/plastic shade" },
      { label: "Finish Options", value: "Transparent, Fumee, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Italian design" },
    ],
  },
  {
    id: "ktribe-2-pendant",
    name: "KTribe 2 Pendant",
    description: "Sophisticated pendant lamp from the KTribe collection, perfect for dining areas, kitchen islands, and creating focused ambient lighting.",
    price: 6025,
    category: "Lighting",
    variants: [
      {
        name: "Fumee",
        image: "/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Fumee.webp",
        color: "Fumee",
        price: 6025,
      },
      {
        name: "Transparent",
        image: "/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Transparent.webp",
        color: "Transparent",
        price: 6025,
      },
      {
        name: "Aluminized Bronze",
        image: "/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,525  Color -  Acuminized Bronze.webp",
        color: "Aluminized Bronze",
        price: 6525,
      },
    ],
    designer: "Philippe Starck",
    features: [
      "Designed by Philippe Starck",
      "Signature pleated shade design",
      "Pendant format for suspended installation",
      "Perfect for dining and kitchen areas",
      "Creates focused ambient lighting",
      "Premium Italian craftsmanship",
      "Multiple finish options available",
      "Suitable for modern interiors",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal with fabric/plastic shade" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze" },
      { label: "Type", value: "Pendant lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Italian design" },
    ],
  },
  {
    id: "ktribe-3-floor-lamp",
    name: "KTribe 3 Floor Lamp",
    description: "Grand floor lamp from the KTribe collection with impressive scale, featuring an impressive pleated shade design perfect for large spaces.",
    price: 20270,
    category: "Lighting",
    variants: [
      {
        name: "Fumee",
        image: "/FLOS/KTribe-3-floor-lamp /KTribe 3 floor lamp NOK  20,270  Color -  Fumee.webp",
        color: "Fumee",
        price: 20270,
      },
      {
        name: "Transparent",
        image: "/FLOS/KTribe-3-floor-lamp /KTribe 3 floor lamp NOK  20,270  Color -  Transparent.webp",
        color: "Transparent",
        price: 20270,
      },
      {
        name: "Aluminized Bronze",
        image: "/FLOS/KTribe-3-floor-lamp /KTribe 3 floor lamp NOK  22,500  Color -  Acuminized Bronze.webp",
        color: "Aluminized Bronze",
        price: 22500,
      },
      {
        name: "Fabric",
        image: "/FLOS/KTribe-3-floor-lamp /KTribe 3 floor lamp NOK  22,500  Color - Fabric.webp",
        color: "Fabric",
        price: 22500,
      },
    ],
    designer: "Philippe Starck",
    features: [
      "Designed by Philippe Starck",
      "Largest in the KTribe collection",
      "Impressive pleated shade design",
      "Makes a bold architectural statement",
      "Perfect for large spaces",
      "Exceptional ambient lighting coverage",
      "Premium Italian construction",
      "Multiple luxury finish options",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal and fabric/plastic shade" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Italian design" },
    ],
  },
  {
    id: "ktribe-3-outdoor-floor-lamp",
    name: "KTribe 3 Outdoor Floor Lamp",
    description: "Weather-resistant outdoor floor lamp from the KTribe collection, designed specifically for terraces, gardens, and outdoor living spaces.",
    price: 33250,
    category: "Outdoor Lighting",
    variants: [
      {
        name: "Green Wall",
        image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Green wall.jpg",
        color: "Green Wall",
        price: 33250,
      },
      {
        name: "Panama",
        image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg",
        color: "Panama",
        price: 33250,
      },
    ],
    designer: "Philippe Starck",
    features: [
      "Designed by Philippe Starck",
      "Weather-resistant outdoor construction",
      "Signature pleated shade design for exteriors",
      "Perfect for terraces and outdoor living",
      "IP65 rated for outdoor use",
      "Durable materials for all weather conditions",
      "Impressive scale for outdoor spaces",
      "Professional outdoor lighting solution",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Weather-resistant materials" },
      { label: "Finish Options", value: "Green Wall, Panama" },
      { label: "Type", value: "Outdoor floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "IP Rating", value: "IP65 (outdoor rated)" },
      { label: "Light Source", value: "LED compatible (outdoor rated)" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Italian design" },
    ],
  },
  {
    id: "arco-floor-lamp",
    name: "Arco Floor Lamp",
    description: "The legendary Arco floor lamp, an icon of Italian design that has graced interiors worldwide since 1962. With its distinctive marble base and sweeping steel arc.",
    price: 33195,
    category: "Lighting",
    variants: [
      {
        name: "Stainless Steel with Carrara Marble",
        image: "/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg",
        color: "Stainless Steel",
        price: 33195,
      },
    ],
    designer: "Achille & Pier Giacomo Castiglioni",
  },
  {
    id: "bellhop-rechargeable-table-lamp",
    name: "Bellhop Rechargeable Table Lamp",
    description: "Portable and rechargeable table lamp with contemporary design and wireless functionality. Perfect for both indoor and outdoor use.",
    price: 3180,
    category: "Lighting",
    variants: [
      {
        name: "White",
        image: "/FLOS/Bellhop-rechargeable-table-lamp /Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp",
        color: "White",
        price: 3180,
      },
      {
        name: "Brick Red",
        image: "/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Brick Red.webp",
        color: "Brick Red",
        price: 3180,
      },
      {
        name: "Cioko",
        image: "/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Cioko.webp",
        color: "Cioko",
        price: 3180,
      },
      {
        name: "Grey Blue",
        image: "/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Grey Blue.webp",
        color: "Grey Blue",
        price: 3180,
      },
      {
        name: "Grey",
        image: "/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Grey.webp",
        color: "Grey",
        price: 3180,
      },
      {
        name: "Matt Black",
        image: "/FLOS/Bellhop-rechargeable-table-lamp /Bellhop rechargeable table lamp from Flos NOK  3,180  Color -  Matt Black.webp",
        color: "Matt Black",
        price: 3180,
      },
    ],
    designer: "Edward Barber & Jay Osgerby",
  },
  {
    id: "bilboquet-table-lamp",
    name: "Bilboquet Table Lamp",
    description: "Elegant table lamp with distinctive conical shade and refined proportions. The Bilboquet combines classic form with contemporary functionality.",
    price: 3295,
    category: "Lighting",
    variants: [
      {
        name: "Linen",
        image: "/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg",
        color: "Linen",
        price: 3295,
      },
      {
        name: "Sage",
        image: "/FLOS/Bilboquet-bordlampe-Flos/Bilboquet table lamp Flos NOK  3,295  Color -  Sage.jpg",
        color: "Sage",
        price: 3295,
      },
      {
        name: "Tomato",
        image: "/FLOS/Bilboquet-bordlampe-Flos/Bilboquet table lamp Flos NOK  3,295  Color -  Tomato.jpg",
        color: "Tomato",
        price: 3295,
      },
    ],
    designer: "Inga Sempé",
  },
  {
    id: "captain-flint",
    name: "Captain Flint Floor Lamp",
    description: "Sophisticated floor lamp with distinctive conical shade and premium marble base. The Captain Flint combines contemporary design with luxurious materials.",
    price: 19440,
    category: "Lighting",
    variants: [
      {
        name: "Anthracite with Black Marble",
        image: "/FLOS/Captain-Flint/Captain Flint NOK  19,440  Color -  Anthracite:black marble.jpg",
        color: "Anthracite",
        material: "Black Marble",
        price: 19440,
      },
      {
        name: "Brushed Brass with White Marble",
        image: "/FLOS/Captain-Flint/Captain Flint NOK  19,440  Color -  Brushed brass:white marble.jpg",
        color: "Brushed Brass",
        material: "White Marble",
        price: 19440,
      },
    ],
    designer: "Michael Anastassiades",
  },
  {
    id: "glo-ball-table-lamp",
    name: "Glo-Ball Table Lamp",
    description: "Iconic spherical table lamp with distinctive blown glass shade and refined metal base. The Glo-Ball creates soft, diffused lighting.",
    price: 8190,
    category: "Lighting",
    variants: [
      {
        name: "Matte Black",
        image: "/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg",
        color: "Matte Black",
        price: 8190,
      },
      {
        name: "Silver",
        image: "/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg",
        color: "Silver",
        price: 8190,
      },
    ],
    designer: "Jasper Morrison",
  },
  {
    id: "ic-lights-t1-high",
    name: "IC Lights T1 High Table Lamp",
    description: "Elegant table lamp with spherical glass shade and refined metal stem. The IC Lights T1 High features perfect proportions and premium materials.",
    price: 6120,
    category: "Lighting",
    variants: [
      {
        name: "Black",
        image: "/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Black.webp",
        color: "Black",
        price: 6120,
      },
      {
        name: "Brushed Brass",
        image: "/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Brushed brass.webp",
        color: "Brushed Brass",
        price: 6120,
      },
      {
        name: "Chrome",
        image: "/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Chrome.webp",
        color: "Chrome",
        price: 6120,
      },
    ],
    designer: "Michael Anastassiades",
  },
  {
    id: "ic-lights-t1-low",
    name: "IC Lights T1 Low Table Lamp",
    description: "Compact table lamp with spherical glass shade and elegant metal base. The IC Lights T1 Low offers sophisticated design in a compact format.",
    price: 6120,
    category: "Lighting",
    variants: [
      {
        name: "Black",
        image: "/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Black.webp",
        color: "Black",
        price: 6120,
      },
      {
        name: "Brushed Brass",
        image: "/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Brushed brass.webp",
        color: "Brushed Brass",
        price: 6120,
      },
      {
        name: "Chrome",
        image: "/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Chrome.webp",
        color: "Chrome",
        price: 6120,
      },
    ],
    designer: "Michael Anastassiades",
  },
  {
    id: "flos-ic-f1-floor-lamp",
    name: "IC F1 Floor Lamp",
    description: "Elegant floor lamp with spherical glass shade and refined metal base, perfect for modern interiors.",
    price: 8540,
    category: "Lighting",
    variants: [
      {
        name: "Black",
        image: "/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif",
        color: "Black",
        price: 8540,
      },
      {
        name: "Brushed Brass",
        image: "/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.avif",
        color: "Brushed Brass",
        price: 8540,
      },
      {
        name: "Chrome",
        image: "/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Chrome.avif",
        color: "Chrome",
        price: 8540,
      },
    ],
    designer: "Michael Anastassiades",
  },
  {
    id: "flos-ktribe-table-2-lamp",
    name: "KTribe Table 2 Table Lamp",
    description: "Sophisticated table lamp with pleated shade design, perfect for desks and side tables.",
    price: 9720,
    category: "Lighting",
    variants: [
      {
        name: "Fumee",
        image: "/FLOS/KTribe-Table 2-table-lamp/KTribe Table 2 table lamp NOK  9,720  Color -  Fumee.webp",
        color: "Fumee",
        price: 9720,
      },
      {
        name: "Transparent",
        image: "/FLOS/KTribe-Table 2-table-lamp/KTribe Table 2 table lamp NOK  9,720  Color -  Transparent.webp",
        color: "Transparent",
        price: 9720,
      },
      {
        name: "Aluminized Bronze",
        image: "/FLOS/KTribe-Table 2-table-lamp/KTribe Table 2 table lamp NOK  11,015  Color -  Acuminized Bronze.webp",
        color: "Aluminized Bronze",
        price: 11015,
      },
      {
        name: "Fabric",
        image: "/FLOS/KTribe-Table 2-table-lamp/KTribe Table 2 table lamp NOK  11,015  Color -  Fabric.webp",
        color: "Fabric",
        price: 11015,
      },
    ],
    designer: "Philippe Starck",
  },
  {
    id: "flos-ktribe-wall-lamp",
    name: "KTribe Wall Lamp",
    description: "Stylish wall-mounted lamp with distinctive pleated shade, ideal for accent lighting.",
    price: 5470,
    category: "Lighting",
    variants: [
      {
        name: "Fumee",
        image: "/FLOS/KTribe-wall-lamp/KTribe wall lamp NOK  5,470  Color -  Fumee.webp",
        color: "Fumee",
        price: 5470,
      },
      {
        name: "Transparent",
        image: "/FLOS/KTribe-wall-lamp/KTribe wall lamp NOK  5,470  Color -  Transparent.webp",
        color: "Transparent",
        price: 5470,
      },
      {
        name: "Aluminized Bronze",
        image: "/FLOS/KTribe-wall-lamp/KTribe wall lamp NOK  5,870  Color -  Acuminized Bronze.webp",
        color: "Aluminized Bronze",
        price: 5870,
      },
      {
        name: "Fabric",
        image: "/FLOS/KTribe-wall-lamp/KTribe wall lamp NOK  5,870  Color -  Fabric.webp",
        color: "Fabric",
        price: 5870,
      },
    ],
    designer: "Philippe Starck",
  },
  {
    id: "flos-snoopy-table-lamp",
    name: "Snoopy Table Lamp",
    description: "Iconic table lamp with distinctive mushroom shape and adjustable shade, a timeless design classic.",
    price: 15060,
    category: "Lighting",
    variants: [
      {
        name: "Black",
        image: "/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg",
        color: "Black",
        price: 15060,
      },
      {
        name: "Green",
        image: "/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Green.jpg",
        color: "Green",
        price: 15060,
      },
      {
        name: "Navy Blue",
        image: "/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Navy blue.webp",
        color: "Navy Blue",
        price: 15060,
      },
      {
        name: "Orange",
        image: "/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Orange.jpg",
        color: "Orange",
        price: 15060,
      },
    ],
    designer: "Achille Castiglioni",
  },
];

export default function FlosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // 4 rows × 3 columns = 12 products per page

  const categories = ["All", "Lighting", "Outdoor Lighting"];

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Navigation handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/FLOS/KTribe-1-floor-lamp/lifestyle/3dd8608d-8ea8-438d-85eb-2bad0d9fe781.webp"
            alt="FLOS Lifestyle"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-black/90" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-red-400/25 rounded-full blur-md animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-white/20">
              <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
                FLOS
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                Italian lighting excellence since 1962. Discover iconic designs that have shaped modern lighting, from Gino Sarfatti's timeless chandeliers to Philippe Starck's contemporary creations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#products" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors duration-300"
                >
                  Explore Collection
                </Link>
                <Link 
                  href="/tjenester" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-600 text-yellow-400 font-medium hover:bg-yellow-600 hover:text-white transition-colors duration-300"
                >
                  Lighting Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our range of iconic Italian lighting fixtures, designed by world-renowned designers and crafted with exceptional attention to detail.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200 mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {sortedProducts.length} products
                </span>
                {totalPages > 1 && (
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/flos/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={product.variants[0].image}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="text-lg font-light text-gray-900">
                      From kr {product.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center space-x-4">
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-yellow-600 text-white"
                        : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light mb-6">
                Italian Lighting Excellence Since 1962
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                FLOS has been at the forefront of lighting innovation for over six decades. Founded in Italy, 
                we collaborate with the world's most talented designers to create lighting that transcends mere function.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                From Gino Sarfatti's architectural masterpieces to Philippe Starck's contemporary visions, 
                each FLOS product represents the perfect marriage of Italian craftsmanship and cutting-edge design.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors duration-300"
              >
                Discover Our Heritage
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/FLOS/KTribe-1-floor-lamp/lifestyle/3dd8608d-8ea8-438d-85eb-2bad0d9fe781.webp"
                  alt="FLOS Craftsmanship"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
