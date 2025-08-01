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
  lifestyleImages?: string[];
}

const products: Product[] = [
  {
    id: "2097-18-chandelier",
    name: "2097/18 Chandelier",
    description: "Iconic brass chandelier with 18 lights, a masterpiece of Italian design. The 2097 series represents the perfect balance between tradition and innovation, creating dramatic lighting that transforms any space into a sophisticated environment.",
    price: 22270,
    category: "Lighting",
    variants: [
      {
        name: "Brass",
        image: "/FLOS/2097:18 lysekrone /2097:18 chandelier from Flos NOK  22,270  Color -  Brass.jpg",
        color: "Brass",
        price: 22270,
      },
      {
        name: "Chrome",
        image: "/FLOS/2097:18 lysekrone /2097:18 chandelier from Flos NOK  22,270  Color -  Chrome.jpg",
        color: "Chrome",
        price: 22270,
      },
      {
        name: "Matt Black",
        image: "/FLOS/2097:18 lysekrone /2097:18 chandelier from Flos NOK  22,270  Color -  Matte Black.jpg",
        color: "Matt Black",
        price: 22270,
      },
      {
        name: "Matt White",
        image: "/FLOS/2097:18 lysekrone /2097:18 chandelier from Flos NOK  22,270  Color -  Matt white.jpg",
        color: "Matt White",
        price: 22270,
      },
    ],
    designer: "Gino Sarfatti",
    features: [
      "Iconic Italian design by Gino Sarfatti",
      "18 individual light sources for dramatic illumination",
      "Premium metal construction with multiple finishes",
      "Adjustable height installation system",
      "Energy efficient LED compatible bulbs",
      "Timeless sculptural form that defines spaces",
      "Perfect centerpiece for dining rooms and living areas",
      "Museum-quality design recognized worldwide",
      "Handcrafted Italian manufacturing",
      "Suitable for high ceilings and grand spaces",
    ],
    specifications: [
      { label: "Designer", value: "Gino Sarfatti" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal with premium finishes" },
      { label: "Finish Options", value: "Brass, Chrome, Matt Black, Matt White" },
      { label: "Light Sources", value: "18 bulbs (E14 base)" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Installation", value: "Ceiling mounted with adjustable cable" },
      { label: "Dimensions", value: "Ø 88cm, H 70cm" },
      { label: "Light Source", value: "LED compatible (bulbs not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Care", value: "Clean with soft cloth, avoid abrasive cleaners" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/2097:18 lysekrone /lifestyle/lifestyle.jpg"
    ],
  },
  {
    id: "2097-30-chandelier",
    name: "2097/30 Chandelier",
    description: "Larger version of the iconic 2097 chandelier with 30 lights. An impressive statement piece that commands attention in any space, perfect for grand dining rooms, lobbies, and architectural spaces that demand dramatic lighting.",
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
    lifestyleImages: [
      "/FLOS/2097-30/lifestyle/lifestyle.jpg"
    ],
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
    designer: "Philippe Starck",
    features: [
      "Elegant spherical glass shade",
      "Refined metal base",
      "Perfect for modern interiors",
      "Premium craftsmanship",
      "Dimmable lighting",
      "Stable base design",
      "Easy assembly and maintenance",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Glass and metal" },
      { label: "Finish Options", value: "Black, Brushed Brass, Chrome" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary" },
      { label: "Dimensions", value: "H 160cm, Ø 40cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Foot switch on cord" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [],
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
    features: [
      "Sophisticated pleated shade design",
      "Perfect for desks and side tables",
      "Multiple finish options",
      "Premium craftsmanship",
      "Dimmable lighting",
      "Compact size",
      "Easy to maintain",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal and fabric" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Table lamp" },
      { label: "Style", value: "Contemporary" },
      { label: "Dimensions", value: "H 40cm, Ø 30cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "On/off switch" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [],
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
    features: [
      "Stylish pleated shade design",
      "Ideal for accent lighting",
      "Multiple finish options",
      "Premium craftsmanship",
      "Dimmable lighting",
      "Compact and elegant",
      "Easy to install",
      "Durable materials",
      "Energy efficient",
      "2 years manufacturer warranty",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal and fabric" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Wall lamp" },
      { label: "Style", value: "Contemporary" },
      { label: "Dimensions", value: "H 30cm, W 20cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "On/off switch" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [],
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
    features: [
      "Iconic mushroom shape",
      "Adjustable shade for focused lighting",
      "Timeless design classic",
      "Premium materials and craftsmanship",
      "Perfect for desks and side tables",
      "Energy efficient LED compatible bulbs",
      "Available in multiple colors",
      "Easy to clean and maintain",
      "2 years manufacturer warranty",
    ],
    specifications: [
      { label: "Designer", value: "Achille Castiglioni" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal and plastic" },
      { label: "Finish Options", value: "Black, Green, Navy Blue, Orange" },
      { label: "Type", value: "Table lamp" },
      { label: "Style", value: "Contemporary" },
      { label: "Dimensions", value: "H 40cm, Ø 30cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "On/off switch" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [],
  },
  {
    id: "ktribe-1-floor-lamp",
    name: "KTribe 1 Floor Lamp",
    description: "Contemporary floor lamp with distinctive pleated shade design by Philippe Starck. The KTribe collection combines modern aesthetics with functional lighting, perfect for creating ambient illumination and adding sculptural beauty to any interior space.",
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
      "Multiple finish options for versatile styling",
      "Contemporary floor lamp with sculptural presence",
      "Perfect for ambient and task lighting",
      "Premium construction quality with Italian craftsmanship",
      "Elegant proportions suitable for modern interiors",
      "Dimmable functionality for mood lighting",
      "Stable base design for safety and style",
      "Easy assembly and maintenance",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal base with fabric/plastic shade" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Dimensions", value: "H 183cm, Ø 60cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Foot switch on cord" },
      { label: "Care", value: "Clean with soft cloth, vacuum shade gently" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/KTribe-1-floor-lamp/lifestyle/3dd8608d-8ea8-438d-85eb-2bad0d9fe781.webp"
    ],
  },
  {
    id: "ktribe-2-floor-lamp",
    name: "KTribe 2 Floor Lamp",
    description: "Elegant floor lamp from the KTribe collection by Philippe Starck. Features a sophisticated pleated shade design with refined proportions, perfect for creating warm ambient lighting in living spaces, bedrooms, and contemporary interiors.",
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
      "Multiple finish options for design flexibility",
      "Elegant floor lamp with sophisticated presence",
      "Perfect for ambient and mood lighting",
      "Premium Italian construction quality",
      "Ideal proportions for residential spaces",
      "Dimmable functionality",
      "Stable and secure base design",
      "Easy maintenance and cleaning",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal base with fabric/plastic shade" },
      { label: "Finish Options", value: "Transparent, Fumee, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Dimensions", value: "H 158cm, Ø 50cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Foot switch on cord" },
      { label: "Care", value: "Clean with soft cloth, vacuum shade gently" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/KTribe-2-floor-lamp/lifestyle/10010470r_3-scaled.webp"
    ],
  },
  {
    id: "ktribe-2-pendant",
    name: "KTribe 2 Pendant",
    description: "Sophisticated pendant lamp from the KTribe collection by Philippe Starck. Features the signature pleated shade design in a suspended format, perfect for dining areas, kitchen islands, and creating focused ambient lighting.",
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
      "Adjustable height installation",
      "Dimmable functionality",
      "Easy installation and maintenance",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal with fabric/plastic shade" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze" },
      { label: "Type", value: "Pendant lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Dimensions", value: "H 42cm, Ø 50cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Installation", value: "Ceiling mounted with adjustable cable" },
      { label: "Care", value: "Clean with soft cloth, vacuum shade gently" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/KTribe-2-pendant/lifestyle/10010483r_3.webp"
    ],
  },
  {
    id: "ktribe-3-floor-lamp",
    name: "KTribe 3 Floor Lamp",
    description: "Grand floor lamp from the KTribe collection by Philippe Starck. The largest in the series, featuring an impressive pleated shade design that makes a bold statement while providing exceptional ambient lighting for large spaces.",
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
      "Perfect for large spaces and high ceilings",
      "Exceptional ambient lighting coverage",
      "Premium Italian construction",
      "Multiple luxury finish options",
      "Dimmable for mood control",
      "Stable base for safety and style",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal base with fabric/plastic shade" },
      { label: "Finish Options", value: "Fumee, Transparent, Aluminized Bronze, Fabric" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Dimensions", value: "H 200cm, Ø 80cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Foot switch on cord" },
      { label: "Care", value: "Clean with soft cloth, vacuum shade gently" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/KTribe-3-floor-lamp /lifestyle/10010478r_3.webp"
    ],
  },
  {
    id: "ktribe-3-outdoor-floor-lamp",
    name: "KTribe 3 Outdoor Floor Lamp",
    description: "Weather-resistant outdoor floor lamp from the KTribe collection by Philippe Starck. Designed specifically for outdoor use, this impressive lamp brings the signature pleated design to terraces, gardens, and outdoor living spaces.",
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
      "UV-resistant finishes",
      "Stable base designed for outdoor conditions",
      "Professional outdoor lighting solution",
    ],
    specifications: [
      { label: "Designer", value: "Philippe Starck" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Weather-resistant materials" },
      { label: "Finish Options", value: "Green Wall, Panama" },
      { label: "Type", value: "Outdoor floor lamp" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Dimensions", value: "H 200cm, Ø 80cm" },
      { label: "IP Rating", value: "IP65 (outdoor rated)" },
      { label: "Light Source", value: "LED compatible (outdoor rated bulb)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Installation", value: "Outdoor use with weather protection" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/KTribe-3-Outdoor-floor-lamp/lifestyle/ktribe-f3-outdoor-flos-floor-lamp2.jpg"
    ],
  },
  {
    id: "arco-floor-lamp",
    name: "Arco Floor Lamp",
    description: "The legendary Arco floor lamp, an icon of Italian design that has graced interiors worldwide since 1962. With its distinctive marble base and sweeping steel arc, this masterpiece creates dramatic lighting while serving as a sculptural statement piece.",
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
    features: [
      "Iconic design by Achille & Pier Giacomo Castiglioni",
      "Genuine Carrara marble base for stability and elegance",
      "Telescopic stainless steel arc structure",
      "Adjustable reflector for directed lighting",
      "Perfect for dining tables and seating areas",
      "No ceiling installation required",
      "Timeless design icon recognized worldwide",
      "Museum-quality construction and materials",
      "Handcrafted Italian manufacturing",
      "Suitable for both residential and commercial spaces",
    ],
    specifications: [
      { label: "Designer", value: "Achille & Pier Giacomo Castiglioni" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Stainless steel, Carrara marble" },
      { label: "Base", value: "Carrara marble (65kg)" },
      { label: "Structure", value: "Telescopic stainless steel" },
      { label: "Style", value: "Contemporary Italian" },
      { label: "Dimensions", value: "H 240cm, Arc reach 200cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Dimmer on cord" },
      { label: "Care", value: "Clean marble with mild soap, steel with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/Arco-floor-lamp/lifestyle/arco-floor-lamp1.jpg"
    ],
  },
  {
    id: "bellhop-rechargeable-table-lamp",
    name: "Bellhop Rechargeable Table Lamp",
    description: "Portable and rechargeable table lamp with contemporary design and wireless functionality. Perfect for both indoor and outdoor use, the Bellhop combines modern aesthetics with practical portability.",
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
    features: [
      "Designed by Edward Barber & Jay Osgerby",
      "Rechargeable battery for wireless operation",
      "Perfect for indoor and outdoor use",
      "Multiple color options for versatile styling",
      "Compact and portable design",
      "Touch dimmer functionality",
      "Up to 24 hours battery life",
      "USB charging cable included",
      "Weather-resistant construction",
      "Contemporary minimalist aesthetic",
    ],
    specifications: [
      { label: "Designer", value: "Edward Barber & Jay Osgerby" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Polycarbonate and aluminum" },
      { label: "Finish Options", value: "White, Brick Red, Cioko, Grey Blue, Grey, Matt Black" },
      { label: "Type", value: "Rechargeable table lamp" },
      { label: "Style", value: "Contemporary" },
      { label: "Dimensions", value: "H 21cm, Ø 12cm" },
      { label: "Light Source", value: "Integrated LED" },
      { label: "Battery Life", value: "Up to 24 hours" },
      { label: "Charging", value: "USB cable (included)" },
      { label: "IP Rating", value: "IP54 (outdoor suitable)" },
      { label: "Care", value: "Clean with soft damp cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/Bellhop-rechargeable-table-lamp /lifestyle/Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp"
    ],
  },
  {
    id: "bilboquet-table-lamp",
    name: "Bilboquet Table Lamp",
    description: "Elegant table lamp with distinctive conical shade and refined proportions. The Bilboquet combines classic form with contemporary functionality, perfect for creating warm ambient lighting in any interior.",
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
    features: [
      "Designed by Inga Sempé",
      "Distinctive conical shade design",
      "Multiple color options for versatile styling",
      "Perfect for bedside and accent lighting",
      "Refined proportions and elegant form",
      "Soft ambient lighting distribution",
      "Premium fabric shade construction",
      "Contemporary French design aesthetic",
      "Easy assembly and maintenance",
      "Suitable for residential and hospitality spaces",
    ],
    specifications: [
      { label: "Designer", value: "Inga Sempé" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal base with fabric shade" },
      { label: "Finish Options", value: "Linen, Sage, Tomato" },
      { label: "Type", value: "Table lamp" },
      { label: "Style", value: "Contemporary" },
      { label: "Dimensions", value: "H 35cm, Ø 25cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "On/off switch on cord" },
      { label: "Care", value: "Clean with soft cloth, vacuum shade gently" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/Bilboquet-bordlampe-Flos/lifestyle/flos-bilboquet-tomato-sage-miljobild.jpg"
    ],
  },
  {
    id: "captain-flint",
    name: "Captain Flint Floor Lamp",
    description: "Sophisticated floor lamp with distinctive conical shade and premium marble base. The Captain Flint combines contemporary design with luxurious materials, creating an elegant lighting solution for modern interiors.",
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
    features: [
      "Designed by Michael Anastassiades",
      "Premium marble base for stability and luxury",
      "Distinctive conical shade design",
      "Multiple finish combinations available",
      "Perfect for contemporary interiors",
      "Adjustable shade for directed lighting",
      "High-quality materials and construction",
      "Elegant proportions and refined details",
      "Suitable for both residential and commercial use",
      "Handcrafted Italian manufacturing",
    ],
    specifications: [
      { label: "Designer", value: "Michael Anastassiades" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Metal shade with marble base" },
      { label: "Finish Options", value: "Anthracite/Black Marble, Brushed Brass/White Marble" },
      { label: "Type", value: "Floor lamp" },
      { label: "Style", value: "Contemporary" },
      { label: "Dimensions", value: "H 134cm, Ø 40cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Foot switch on cord" },
      { label: "Care", value: "Clean marble with mild soap, metal with soft cloth" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/Captain-Flint/lifestyle/captain-flint-anthracite-floor-anastassiades-flos-03-scaled.jpg.avif"
    ],
  },
  {
    id: "glo-ball-table-lamp",
    name: "Glo-Ball Table Lamp",
    description: "Iconic spherical table lamp with distinctive blown glass shade and refined metal base. The Glo-Ball creates soft, diffused lighting while serving as a sculptural design element in contemporary interiors.",
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
    features: [
      "Designed by Jasper Morrison",
      "Iconic spherical blown glass shade",
      "Soft, diffused ambient lighting",
      "Premium metal base construction",
      "Multiple finish options available",
      "Perfect for bedside and accent lighting",
      "Timeless minimalist design",
      "High-quality Italian craftsmanship",
      "Easy assembly and maintenance",
      "Suitable for residential and hospitality spaces",
    ],
    specifications: [
      { label: "Designer", value: "Jasper Morrison" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Blown glass shade with metal base" },
      { label: "Finish Options", value: "Matte Black, Silver" },
      { label: "Type", value: "Table lamp" },
      { label: "Style", value: "Contemporary minimalist" },
      { label: "Dimensions", value: "H 33cm, Ø 19cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "On/off switch on cord" },
      { label: "Care", value: "Clean glass with soft cloth, avoid abrasive cleaners" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/Glo-Ball-table-lamp-Flos/lifestyle/203079r_2.jpg"
    ],
  },
  {
    id: "ic-lights-t1-high",
    name: "IC Lights T1 High Table Lamp",
    description: "Elegant table lamp with spherical glass shade and refined metal stem. The IC Lights T1 High features perfect proportions and premium materials, creating sophisticated ambient lighting for modern interiors.",
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
    features: [
      "Designed by Michael Anastassiades",
      "Spherical blown glass shade",
      "Refined metal stem and base",
      "Multiple premium finish options",
      "Perfect proportions and balance",
      "Soft ambient lighting distribution",
      "Contemporary minimalist aesthetic",
      "High-quality materials and construction",
      "Suitable for bedside and accent lighting",
      "Handcrafted Italian manufacturing",
    ],
    specifications: [
      { label: "Designer", value: "Michael Anastassiades" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Blown glass shade with metal base" },
      { label: "Finish Options", value: "Black, Brushed Brass, Chrome" },
      { label: "Type", value: "Table lamp" },
      { label: "Style", value: "Contemporary minimalist" },
      { label: "Dimensions", value: "H 53cm, Ø 20cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Touch dimmer on base" },
      { label: "Care", value: "Clean glass with soft cloth, metal with appropriate cleaner" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/IC-Lights-T1-High/lifestyle/3510294-1.webp"
    ],
  },
  {
    id: "ic-lights-t1-low",
    name: "IC Lights T1 Low Table Lamp",
    description: "Compact table lamp with spherical glass shade and elegant metal base. The IC Lights T1 Low offers the same sophisticated design as the High version in a more compact format, perfect for smaller spaces.",
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
    features: [
      "Designed by Michael Anastassiades",
      "Compact spherical glass shade",
      "Elegant metal base construction",
      "Multiple premium finish options",
      "Perfect for smaller spaces",
      "Soft ambient lighting distribution",
      "Contemporary minimalist design",
      "High-quality materials and craftsmanship",
      "Touch dimmer functionality",
      "Handcrafted Italian manufacturing",
    ],
    specifications: [
      { label: "Designer", value: "Michael Anastassiades" },
      { label: "Manufacturer", value: "FLOS" },
      { label: "Material", value: "Blown glass shade with metal base" },
      { label: "Finish Options", value: "Black, Brushed Brass, Chrome" },
      { label: "Type", value: "Table lamp" },
      { label: "Style", value: "Contemporary minimalist" },
      { label: "Dimensions", value: "H 38cm, Ø 20cm" },
      { label: "Light Source", value: "LED compatible (bulb not included)" },
      { label: "Voltage", value: "220-240V" },
      { label: "Switch", value: "Touch dimmer on base" },
      { label: "Care", value: "Clean glass with soft cloth, metal with appropriate cleaner" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Made in Italy" },
    ],
    lifestyleImages: [
      "/FLOS/IC-Lights-T1-Low/lifestyle/IC Lights T1 Low NOK  6,120  Color -  Chrome.webp"
    ],
  },
];

export default function FlosProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = products.find((p) => p.id === params.productId);

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
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/flos" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to FLOS Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/flos" className="text-stone-600 hover:text-stone-800">
                FLOS
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-800 font-medium">{product.name}</span>
            </nav>
          </div>
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
                className="object-contain object-center p-4"
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
                        ? "border-yellow-600"
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
                      {variant.color}
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
              <div className="text-sm text-yellow-600 uppercase tracking-wider mb-2">
                FLOS Collection
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
                  Finish: {selectedVariant.color}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`p-3 text-sm border rounded transition-all ${
                        selectedVariantIndex === index
                          ? "border-yellow-600 bg-yellow-50"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium">{variant.color}</div>
                      <div className="text-xs text-gray-500">kr {variant.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-yellow-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-yellow-700 transition-colors">
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

            {/* Back to Collection */}
            <div className="border-t border-gray-200 pt-8">
              <Link
                href="/flos"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View All FLOS Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
