"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByBrand } from "@/lib/allProducts";

interface ProductVariant {
  name: string;
  image: string;
  price?: number;
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
    id: "flowerpot-vp9-battery",
    name: "Flower Pot VP9 Battery Lamp",
    description: "Iconic portable table lamp with rechargeable battery and magnetic charging cable. Perfect for indoor and outdoor use. The VP9 combines the classic Flowerpot design with modern battery technology, making it ideal for any space without the need for electrical outlets.",
    price: 1995,
    category: "Lighting",
    variants: [
      { name: "Matt White", image: "/&Tradition/Flower-Pot-VP9-battery/Flower Pot VP9 battery kr 1 995  Farge - Matt White.jpg", color: "Matt White", price: 1995 },
      { name: "Matt Black", image: "/&Tradition/Flower-Pot-VP9-battery/Flower Pot VP9 battery kr 1 995  Farge - Matt Black.jpg", color: "Matt Black", price: 1995 },
      { name: "Cobalt Blue", image: "/&Tradition/Flower-Pot-VP9-battery/Flower Pot VP9 battery kr 1 995  Farge - Cobalt Blue.jpg", color: "Cobalt Blue", price: 1995 },
      { name: "Vermilion Red", image: "/&Tradition/Flower-Pot-VP9-battery/Flower Pot VP9 battery kr 1 995  Farge - Vermilion Red.jpg", color: "Vermilion Red", price: 1995 },
      { name: "Mustard", image: "/&Tradition/Flower-Pot-VP9-battery/Flower Pot VP9 battery kr 1 995  Farge - Mustard.jpg", color: "Mustard", price: 1995 },
      { name: "Signal Green", image: "/&Tradition/Flower-Pot-VP9-battery/Flower Pot VP9 battery kr 1 995  Farge - Signal Green.jpg", color: "Signal Green", price: 1995 },
      { name: "Brass-Plated", image: "/&Tradition/Flower-Pot-VP9-battery/&Tradition Flower Pot VP9 battery kr 2 995  Farge - Brass-Plated.jpg", color: "Brass-Plated", price: 2995 },
      { name: "Chrome-Plated", image: "/&Tradition/Flower-Pot-VP9-battery/Flower Pot VP9 battery kr 2 995  Farge - Chrome-Plated.jpg", color: "Chrome-Plated", price: 2995 },
    ],
    designer: "Verner Panton",
    features: [
      "Rechargeable battery with up to 10 hours of use",
      "Magnetic charging cable included",
      "Portable design for indoor and outdoor use",
      "Iconic Flowerpot design by Verner Panton",
      "Dimmable LED light source",
      "Weather-resistant construction",
      "Multiple vibrant color options",
      "Touch-sensitive on/off switch",
      "Compact size perfect for any space",
      "Energy-efficient LED technology",
    ],
    specifications: [
      { label: "Designer", value: "Verner Panton" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Material", value: "Aluminum with powder coating" },
      { label: "Light Source", value: "Integrated LED" },
      { label: "Battery Life", value: "Up to 10 hours" },
      { label: "Charging Time", value: "4 hours" },
      { label: "Dimensions", value: "Ø 16cm, H 24cm" },
      { label: "Weight", value: "0.8 kg" },
      { label: "IP Rating", value: "IP54 (outdoor suitable)" },
      { label: "Switch", value: "Touch-sensitive" },
      { label: "Dimming", value: "3-step dimming" },
      { label: "Warranty", value: "2 years" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/Flower-Pot-VP9-battery/lifestyle/tradition-flowerpot-vp9-bordlampe-brbar-med-magnetisk-ladekabel-178.jpeg"
    ],
  },
  {
    id: "flowerpot-floor-lamp",
    name: "Flowerpot Floor Lamp",
    description: "Classic floor lamp with the iconic Flowerpot design. A timeless piece that brings retro charm to any space while providing excellent ambient lighting. The distinctive mushroom-shaped shade creates a warm, diffused light perfect for living rooms and bedrooms.",
    price: 6855,
    category: "Lighting",
    variants: [
      { name: "Matt Black", image: "/&Tradition/Flowerpot-floor-lamp/Flowerpot gulvlampe kr 6 855  Farge - Matt Black.jpg", color: "Matt Black", price: 6855 },
      { name: "Grey Beige", image: "/&Tradition/Flowerpot-floor-lamp/Flowerpot gulvlampe kr 6 855  Farge - Grey Beige.jpg", color: "Grey Beige", price: 6855 },
      { name: "Cobalt Blue", image: "/&Tradition/Flowerpot-floor-lamp/Flowerpot floor lamp NOK  6,855  Color -  Cobalt Blue.jpg", color: "Cobalt Blue", price: 6855 },
      { name: "Chrome Plated", image: "/&Tradition/Flowerpot-floor-lamp/Flowerpot floor lamp NOK  8,575  Color -  Chrome plated.jpg", color: "Chrome Plated", price: 8575 },
    ],
    designer: "Verner Panton",
    features: [
      "Iconic Flowerpot design by Verner Panton",
      "Distinctive mushroom-shaped shade",
      "Provides warm, diffused ambient lighting",
      "Stable weighted base for safety",
      "Premium powder-coated finish",
      "Compatible with LED bulbs",
      "Timeless retro aesthetic",
      "Perfect for living rooms and bedrooms",
      "Easy assembly and maintenance",
      "Available in multiple finishes",
    ],
    specifications: [
      { label: "Designer", value: "Verner Panton" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Material", value: "Aluminum with powder coating" },
      { label: "Dimensions", value: "Ø 50cm, H 116cm" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Max Wattage", value: "60W" },
      { label: "Switch", value: "Foot switch on cord" },
      { label: "Cable Length", value: "200cm" },
      { label: "Weight", value: "4.2 kg" },
      { label: "Style", value: "Mid-century Modern" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [],
  },
  {
    id: "flowerpot-vp1",
    name: "Flowerpot VP1 Pendant Lamp",
    description: "Iconic pendant lamp designed by Verner Panton. The perfect combination of form and function with vibrant color options. The VP1 features the classic Flowerpot silhouette in a suspended format, ideal for dining areas and kitchen islands.",
    price: 2565,
    category: "Lighting",
    variants: [
      { name: "Matt White", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Matt White.jpg", color: "Matt White", price: 2565 },
      { name: "Matt Black", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Matt Black.jpg", color: "Matt Black", price: 2565 },
      { name: "Cobalt Blue", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Cobalt Blue.jpg", color: "Cobalt Blue", price: 2565 },
      { name: "Vermilion Red", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Vermilion Red.jpg", color: "Vermilion Red", price: 2565 },
      { name: "Mustard", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Mustard.jpg", color: "Mustard", price: 2565 },
      { name: "Signal Green", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Signal Green.jpg", color: "Signal Green", price: 2565 },
      { name: "Brass-Plated", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 NOK  3,570  Color -  Brass-Plated.jpg", color: "Brass-Plated", price: 3570 },
      { name: "Chrome-Plated", image: "/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 3 570  Farge - Chrome-Plated.jpg", color: "Chrome-Plated", price: 3570 },
    ],
    designer: "Verner Panton",
    features: [
      "Iconic pendant design by Verner Panton",
      "Perfect for dining areas and kitchen islands",
      "Distinctive Flowerpot silhouette",
      "Vibrant color options available",
      "Premium powder-coated finish",
      "Adjustable hanging height",
      "Creates focused task lighting",
      "Compatible with LED bulbs",
      "Easy installation with ceiling mount",
      "Timeless mid-century modern design",
    ],
    specifications: [
      { label: "Designer", value: "Verner Panton" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Material", value: "Aluminum with powder coating" },
      { label: "Dimensions", value: "Ø 23cm, H 16cm" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Max Wattage", value: "60W" },
      { label: "Installation", value: "Ceiling mounted with adjustable cable" },
      { label: "Cable Length", value: "300cm" },
      { label: "Weight", value: "0.8 kg" },
      { label: "Style", value: "Mid-century Modern" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/Flowerpot-VP1/lifestyle/576155-01_21_ProductImageExtra-667192772c-scaled.webp"
    ],
  },
  {
    id: "flowerpot-vp3",
    name: "Flowerpot VP3 Table Lamp",
    description: "Table lamp version of the iconic Flowerpot design. Perfect for desks, bedside tables, and accent lighting. The VP3 brings the classic Flowerpot aesthetic to a compact table format, ideal for creating intimate lighting in any space.",
    price: 3280,
    category: "Lighting",
    variants: [
      { name: "Matt White", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 bordlampe fra AndTradition kr 3 280  Farge - Matt White.jpg", color: "Matt White", price: 3280 },
      { name: "Matt Black", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 bordlampe fra AndTradition kr 3 280  Farge - Matt Black.jpg", color: "Matt Black", price: 3280 },
      { name: "Cobalt Blue", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Cobalt Blue.jpg", color: "Cobalt Blue", price: 3280 },
      { name: "Vermilion Red", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Vermilion Red.jpg", color: "Vermilion Red", price: 3280 },
      { name: "Mustard", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Mustard.jpg", color: "Mustard", price: 3280 },
      { name: "Signal Green", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Signal Green.jpg", color: "Signal Green", price: 3280 },
      { name: "Brass-Plated", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 table lamp from AndTradition NOK  5,000  Color -  Brass-Plated.jpg", color: "Brass-Plated", price: 5000 },
      { name: "Chrome-Plated", image: "/&Tradition/Flowerpot-VP3-table-lamp/Flowerpot VP3 table lamp from AndTradition NOK  5,000  Color -  Chrome-Plated.jpg", color: "Chrome-Plated", price: 5000 },
    ],
    designer: "Verner Panton",
    features: [
      "Compact table lamp with iconic Flowerpot design",
      "Perfect for desks and bedside tables",
      "Creates intimate accent lighting",
      "Vibrant color options available",
      "Premium powder-coated finish",
      "Stable base design",
      "Compatible with LED bulbs",
      "Easy on/off switch",
      "Timeless mid-century aesthetic",
      "Ideal for reading and task lighting",
    ],
    specifications: [
      { label: "Designer", value: "Verner Panton" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Material", value: "Aluminum with powder coating" },
      { label: "Dimensions", value: "Ø 29.5cm, H 36cm" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Max Wattage", value: "60W" },
      { label: "Switch", value: "On/off switch on base" },
      { label: "Cable Length", value: "200cm" },
      { label: "Weight", value: "1.5 kg" },
      { label: "Style", value: "Mid-century Modern" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/Flowerpot-VP3-table-lamp/lifestyle/Flowerpot VP3 table lamp from AndTradition NOK  3,280  Color -  Vermilion Red.jpg"
    ],
  },
  {
    id: "flowerpot-vp7",
    name: "Flowerpot VP7 Pendant Lamp",
    description: "Large pendant version of the iconic Flowerpot design. Perfect for dining areas and making a bold statement. The VP7 is the largest in the Flowerpot pendant series, providing excellent ambient lighting for spacious interiors.",
    price: 4140,
    category: "Lighting",
    variants: [
      { name: "Matt White", image: "/&Tradition/Flowerpot-VP7 /Flowerpot VP7 kr 4 140  Farge - Matt White.jpg", color: "Matt White", price: 4140 },
      { name: "Matt Black", image: "/&Tradition/Flowerpot-VP7 /Flowerpot VP7 NOK  4,140  Color -  Matt Black.jpg", color: "Matt Black", price: 4140 },
      { name: "Cobalt Blue", image: "/&Tradition/Flowerpot-VP7 /Flowerpot VP7 kr 4 140  Farge - Cobalt Blue.jpg", color: "Cobalt Blue", price: 4140 },
      { name: "Vermilion Red", image: "/&Tradition/Flowerpot-VP7 /Flowerpot VP7 kr 4 140  Farge - Vermilion Red.jpg", color: "Vermilion Red", price: 4140 },
      { name: "Mustard", image: "/&Tradition/Flowerpot-VP7 /Flowerpot VP7 kr 4 140  Farge - Mustard.jpg", color: "Mustard", price: 4140 },
      { name: "Signal Green", image: "/&Tradition/Flowerpot-VP7 /Flowerpot VP7 kr 4 140  Farge - Signal Green.jpg", color: "Signal Green", price: 4140 },
      { name: "Black & White Pattern", image: "/&Tradition/Flowerpot-VP7 /Flowerpot VP7 NOK  6,430  Color -  Black & White Pattern.jpg", color: "Black & White Pattern", price: 6430 },
    ],
    designer: "Verner Panton",
    features: [
      "Large pendant with iconic Flowerpot design",
      "Perfect for dining areas and high ceilings",
      "Makes a bold architectural statement",
      "Excellent ambient lighting coverage",
      "Premium powder-coated finish",
      "Adjustable hanging height",
      "Compatible with LED bulbs",
      "Unique Black & White Pattern option",
      "Easy installation with ceiling mount",
      "Timeless mid-century modern design",
    ],
    specifications: [
      { label: "Designer", value: "Verner Panton" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Material", value: "Aluminum with powder coating" },
      { label: "Dimensions", value: "Ø 37cm, H 22cm" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Max Wattage", value: "60W" },
      { label: "Installation", value: "Ceiling mounted with adjustable cable" },
      { label: "Cable Length", value: "300cm" },
      { label: "Weight", value: "1.8 kg" },
      { label: "Style", value: "Mid-century Modern" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/Flowerpot-VP7 /lifestyle/52a51848-6c14-45fe-b2e3-3332462aebec.webp"
    ],
  },
  {
    id: "flowerpot-vp10",
    name: "Flowerpot VP10 Wall Lamp",
    description: "Wall-mounted version of the iconic Flowerpot design. Perfect for accent lighting and space-saving solutions. The VP10 brings the classic Flowerpot aesthetic to wall applications, ideal for hallways, bedrooms, and reading nooks.",
    price: 2140,
    category: "Lighting",
    variants: [
      { name: "Matt White", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 kr 2 140  Farge - Matt White.jpg", color: "Matt White", price: 2140 },
      { name: "Matt Black", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 kr 2 140  Farge - Matt Black.jpg", color: "Matt Black", price: 2140 },
      { name: "Cobalt Blue", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 kr  1 712  Color -  Cobalt Blue.jpg", color: "Cobalt Blue", price: 1712 },
      { name: "Vermilion Red", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 NOK  2,140  Color -  Vermilion Red.jpg", color: "Vermilion Red", price: 2140 },
      { name: "Mustard", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 NOK  2,140  Color -  Mustard.jpg", color: "Mustard", price: 2140 },
      { name: "Signal Green", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 kr 2 140  Farge - Signal Green.jpg", color: "Signal Green", price: 2140 },
      { name: "Brass-Plated", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 NOK  2,995  Color -  Brass-Plated.jpg", color: "Brass-Plated", price: 2995 },
      { name: "Chrome-Plated", image: "/&Tradition/Flowerpot-VP10/Flowerpot VP10 kr  2 396  Color -  Chrome-Plated.jpg", color: "Chrome-Plated", price: 2396 },
    ],
    designer: "Verner Panton",
    features: [
      "Wall-mounted Flowerpot design",
      "Perfect for accent lighting",
      "Space-saving wall application",
      "Ideal for hallways and bedrooms",
      "Premium powder-coated finish",
      "Adjustable arm for directional lighting",
      "Compatible with LED bulbs",
      "Easy wall installation",
      "Vibrant color options",
      "Timeless mid-century aesthetic",
    ],
    specifications: [
      { label: "Designer", value: "Verner Panton" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Material", value: "Aluminum with powder coating" },
      { label: "Dimensions", value: "Ø 23cm, H 16cm, D 30cm" },
      { label: "Light Source", value: "E27 bulb (not included)" },
      { label: "Max Wattage", value: "60W" },
      { label: "Installation", value: "Wall mounted with adjustable arm" },
      { label: "Switch", value: "On/off switch on fixture" },
      { label: "Weight", value: "1.2 kg" },
      { label: "Style", value: "Mid-century Modern" },
      { label: "Care", value: "Clean with soft cloth" },
      { label: "Warranty", value: "2 years" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/Flowerpot-VP10/lifestyle/5367b6a2-8ebf-4389-bebf-1fc1c09391e1.webp"
    ],
  },
  {
    id: "in-between-coffee-table",
    name: "In Between Coffee Table SK24",
    description: "Elegant coffee table with clean lines and premium wood construction. Perfect centerpiece for modern living rooms. The SK24 features a distinctive design that balances simplicity with sophisticated craftsmanship, available in multiple wood finishes.",
    price: 6715,
    category: "Tables",
    variants: [
      { name: "Oiled Oak", image: "/&Tradition/In-Between-coffee-table/In Between coffee table SK24 NOK  6,715  Color -  Oiled oak.webp", material: "Oiled Oak", price: 6715 },
      { name: "Smoked Oiled Oak", image: "/&Tradition/In-Between-coffee-table/In Between coffee table SK24 NOK  6,715  Color -  Smoked oiled oak.webp", material: "Smoked Oiled Oak", price: 6715 },
      { name: "Black Lacquered Oak", image: "/&Tradition/In-Between-coffee-table/In Between sofabord SK24 kr 6 715  Farge - Sortlakkert eik.webp", material: "Black Lacquered Oak", price: 6715 },
    ],
    designer: "Sami Kallio",
    features: [
      "Clean, minimalist design by Sami Kallio",
      "Premium solid oak construction",
      "Perfect centerpiece for living rooms",
      "Multiple wood finish options",
      "Distinctive geometric form",
      "Sustainable wood sourcing",
      "Handcrafted quality",
      "Versatile size for various spaces",
      "Durable construction for daily use",
      "Timeless Scandinavian aesthetic",
    ],
    specifications: [
      { label: "Designer", value: "Sami Kallio" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Material", value: "Solid oak wood" },
      { label: "Dimensions", value: "L 120cm, W 60cm, H 32cm" },
      { label: "Weight", value: "25 kg" },
      { label: "Finish Options", value: "Oiled Oak, Smoked Oiled Oak, Black Lacquered Oak" },
      { label: "Construction", value: "Solid wood with traditional joinery" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Clean with damp cloth, oil treatment recommended" },
      { label: "Assembly", value: "Minimal assembly required" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/In-Between-coffee-table/lifestyle/4a0f638f-51e6-4363-84ca-6770651e2e78.webp"
    ],
  },
  {
    id: "little-petra-vb1",
    name: "Little Petra VB1 Chair",
    description: "Comfortable lounge chair with organic form and premium upholstery. A modern classic that combines comfort with sophisticated design. The VB1 features a distinctive curved silhouette that embraces the sitter, available in luxurious fabric and sheepskin options.",
    price: 32885,
    category: "Seating",
    variants: [
      { name: "Oiled Oak - Hallingdal 130", image: "/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  32,885  Color -  Oiled oak:Hallingdal 130.jpg", material: "Oiled Oak", price: 32885 },
      { name: "Oiled Walnut - Hallingdal 130", image: "/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  32,885  Color -  Oiled walnut:Hallingdal 130.jpg", material: "Oiled Walnut", price: 32885 },
      { name: "Oiled Walnut - Ectriture 0640", image: "/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  34,315  Color -  Oiled walnut:Ectriture 0640.jpg", material: "Oiled Walnut", price: 34315 },
      { name: "Oiled Oak - Karakorum 003", image: "/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  35,745  Color -  Oiled oak:Karakorum 003.jpg", material: "Oiled Oak", price: 35745 },
      { name: "Oiled Oak - Sheepskin Moonlight", image: "/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  48,615  Color -  Oiled oak:sheepskin Moonlight.jpg", material: "Oiled Oak", price: 48615 },
      { name: "Oiled Oak - Sheepskin Sahara", image: "/&Tradition/Little-Petra-vb1/Little Petra vb1 from AndTradition NOK  48,615  Color -  Oiled oak:sheepskin Sahara.jpg", material: "Oiled Oak", price: 48615 },
    ],
    designer: "Viggo Boesen",
    features: [
      "Iconic design by Viggo Boesen from 1938",
      "Organic curved form that embraces the sitter",
      "Premium wood frame construction",
      "Luxurious upholstery options",
      "Comfortable lounge seating",
      "Available in fabric and sheepskin",
      "Handcrafted quality construction",
      "Timeless Danish design heritage",
      "Perfect for reading and relaxation",
      "Statement piece for any interior",
    ],
    specifications: [
      { label: "Designer", value: "Viggo Boesen (1938)" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Frame Material", value: "Solid oak or walnut" },
      { label: "Upholstery", value: "Premium fabric or sheepskin" },
      { label: "Dimensions", value: "W 85cm, D 85cm, H 90cm" },
      { label: "Seat Height", value: "42cm" },
      { label: "Weight", value: "28 kg" },
      { label: "Construction", value: "Solid wood frame with traditional joinery" },
      { label: "Style", value: "Mid-century Danish Modern" },
      { label: "Care", value: "Professional cleaning recommended" },
      { label: "Assembly", value: "Delivered fully assembled" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/Little-Petra-vb1/lifestyle/Little_Petra_VB1_Limited_edition_Sheepskin_17mm_Moonlight_w.jpg"
    ],
  },
  {
    id: "pavilion-av17-desk",
    name: "Pavilion AV17 Desk",
    description: "Elegant desk with linoleum surface and chrome base. Perfect for modern offices and home workspaces. The AV17 combines functionality with sophisticated design, featuring a durable linoleum work surface and sleek chrome legs.",
    price: 15725,
    category: "Desks",
    variants: [
      { name: "Mushroom Linoleum - Oak & Chrome", image: "/&Tradition/Pavilion-AV17-Desk /Pavilion AV17 Desk NOK  15,725  Color -  Mushroom Linoleum (4176) w. lacquered oak & chrome base.jpg", material: "Oak & Chrome", price: 15725 },
      { name: "Iron Linoleum - Walnut & Chrome", image: "/&Tradition/Pavilion-AV17-Desk /Pavilion AV17 Desk NOK  15,725  Color -  Iron Linoleum (4178) w. lacquered walnut & chrome base.jpg", material: "Walnut & Chrome", price: 15725 },
    ],
    designer: "Anderssen & Voll",
    features: [
      "Elegant desk design by Anderssen & Voll",
      "Durable linoleum work surface",
      "Sleek chrome base construction",
      "Perfect for modern offices",
      "Premium wood edge details",
      "Spacious work surface",
      "Contemporary Scandinavian design",
      "Easy to clean and maintain",
      "Stable and sturdy construction",
      "Available in two sophisticated finishes",
    ],
    specifications: [
      { label: "Designer", value: "Anderssen & Voll" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Surface Material", value: "Linoleum" },
      { label: "Base Material", value: "Chrome-plated steel" },
      { label: "Edge Material", value: "Lacquered oak or walnut" },
      { label: "Dimensions", value: "L 140cm, W 60cm, H 74cm" },
      { label: "Weight", value: "32 kg" },
      { label: "Surface Options", value: "Mushroom Linoleum, Iron Linoleum" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Care", value: "Clean with mild soap and water" },
      { label: "Assembly", value: "Some assembly required" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/Pavilion-AV17-Desk /lifestyle/ATD_2022_Pavilion-AV12_Bellevue-AJ7_Pavilion-AV17.jpg"
    ],
  },
  {
    id: "rfh-armchair-rd7",
    name: "RFH Armchair RD7",
    description: "Classic armchair with walnut and beech veneer construction. Comfortable seating with timeless Scandinavian design. The RD7 features a distinctive curved backrest and premium fabric upholstery, perfect for dining or office use.",
    price: 7860,
    category: "Seating",
    variants: [
      { name: "Walnut & Beech - Hallingdal 103", image: "/&Tradition/RFH-Armchair-RD7/RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 103.jpg", material: "Walnut & Beech", price: 7860 },
      { name: "Walnut & Beech - Hallingdal 227", image: "/&Tradition/RFH-Armchair-RD7/RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 227.jpg", material: "Walnut & Beech", price: 7860 },
    ],
    designer: "Rolf Hesland",
    features: [
      "Classic design by Rolf Hesland",
      "Walnut and beech veneer construction",
      "Premium Hallingdal fabric upholstery",
      "Comfortable curved backrest",
      "Perfect for dining or office use",
      "Timeless Scandinavian aesthetic",
      "Durable hardwood construction",
      "Professional upholstery quality",
      "Ergonomic seating comfort",
      "Available in two fabric colors",
    ],
    specifications: [
      { label: "Designer", value: "Rolf Hesland" },
      { label: "Manufacturer", value: "&Tradition" },
      { label: "Frame Material", value: "Walnut and beech veneer" },
      { label: "Upholstery", value: "Hallingdal wool fabric" },
      { label: "Dimensions", value: "W 58cm, D 52cm, H 78cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "8 kg" },
      { label: "Construction", value: "Solid wood frame with veneer finish" },
      { label: "Style", value: "Mid-century Scandinavian" },
      { label: "Care", value: "Vacuum regularly, professional cleaning recommended" },
      { label: "Assembly", value: "Minimal assembly required" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/&Tradition/RFH-Armchair-RD7/lifestyle/RFH Armchair RD7 NOK  7,860  Variants -  Walnut and beech veneer & Hallingdal 227.jpg"
    ],
  },
];

export default function TraditionProductPage({
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
              href="/tradition" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to &Tradition Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/tradition" className="text-stone-600 hover:text-stone-800">
                &Tradition
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
                      {variant.color || variant.material}
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
              <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">
                &Tradition Collection
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
              kr {(selectedVariant.price || product.price).toLocaleString()}
            </div>

            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  {selectedVariant.color ? 'Color' : 'Material'}: {selectedVariant.color || selectedVariant.material}
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
                      <div className="font-medium">{variant.color || variant.material}</div>
                      <div className="text-xs text-gray-500">kr {(variant.price || product.price).toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-gray-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Add to Cart - kr {(selectedVariant.price || product.price).toLocaleString()}
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
                href="/tradition"
                className="inline-block bg-gray-100 text-gray-900 px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                View All &Tradition Products
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              Related Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more iconic designs from the &Tradition collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((p) => p.id !== product.id) // Exclude current product
              .slice(0, 4) // Show 4 related products
              .map((relatedProduct) => {
                // Function to get the most colorful variant for thumbnail
                const getColorfulThumbnail = (product: Product) => {
                  if (!product.variants || product.variants.length === 0) {
                    return product.variants[0]?.image || '';
                  }
                  
                  // Priority order for colorful variants (most vibrant first)
                  const colorPriority = [
                    'Vermilion Red', 'Signal Green', 'Cobalt Blue', 'Mustard', 
                    'Tangy Pink', 'Electric Orange', 'Dark Plum', 'Stone Blue', 
                    'Swim Blue', 'Grey Beige', 'Brass-Plated', 'Chrome-Plated',
                    'Matt Black', 'Matt White'
                  ];
                  
                  // Find the most colorful variant based on priority
                  for (const color of colorPriority) {
                    const variant = product.variants.find((v: ProductVariant) => 
                      v.color === color || v.name === color
                    );
                    if (variant) {
                      return variant.image;
                    }
                  }
                  
                  // If no priority color found, return the first variant
                  return product.variants[0]?.image || '';
                };

                const thumbnailImage = getColorfulThumbnail(relatedProduct);

                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/tradition/${relatedProduct.id}`}
                    className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <Image
                        src={thumbnailImage}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        {relatedProduct.category}
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-light text-gray-900">
                          kr {relatedProduct.price.toLocaleString()}
                          {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                            <span className="text-xs text-gray-500 ml-1">+</span>
                          )}
                        </span>
                        {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                          <span className="text-xs text-gray-500">
                            {relatedProduct.variants.length} variants
                          </span>
                        )}
                      </div>
                      
                      {/* Color Swatches for Related Products */}
                      {relatedProduct.variants && relatedProduct.variants.length > 1 && (
                        <div className="flex items-center space-x-1">
                          {relatedProduct.variants.slice(0, 4).map((variant: ProductVariant, index: number) => {
                            // Color mapping for visual swatches
                            const getSwatchColor = (colorName: string) => {
                              const colorMap: { [key: string]: string } = {
                                'Vermilion Red': 'bg-red-500',
                                'Signal Green': 'bg-green-500',
                                'Cobalt Blue': 'bg-blue-600',
                                'Mustard': 'bg-yellow-500',
                                'Tangy Pink': 'bg-pink-400',
                                'Dark Plum': 'bg-purple-800',
                                'Stone Blue': 'bg-slate-400',
                                'Swim Blue': 'bg-cyan-400',
                                'Grey Beige': 'bg-stone-300',
                                'Matt Black': 'bg-gray-900',
                                'Matt White': 'bg-white border-2 border-gray-300',
                                'Brass-Plated': 'bg-yellow-600',
                                'Chrome-Plated': 'bg-gray-400',
                              };
                              return colorMap[colorName] || 'bg-gray-300';
                            };

                            return (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${getSwatchColor(variant.color || variant.name || '')} shadow-sm`}
                                title={variant.color || variant.name}
                              />
                            );
                          })}
                          {relatedProduct.variants.length > 4 && (
                            <span className="text-xs text-gray-400 ml-1">
                              +{relatedProduct.variants.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* View All Products Link */}
          <div className="text-center mt-12">
            <Link
              href="/tradition"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All &Tradition Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
