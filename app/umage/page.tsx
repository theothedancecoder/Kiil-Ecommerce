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
        image: "/umage/A-Conversation-Piece/black-oak-sugar-brown.svg",
        material: "Black Oak",
        price: 7499,
      },
      {
        name: "Black Oak - White Sands",
        image: "/umage/A-Conversation-Piece/black-oak-white-sands.svg",
        material: "Black Oak",
        price: 7499,
      },
      {
        name: "Oak - White Sands",
        image: "/umage/A-Conversation-Piece/oak-white-sands.svg",
        material: "Oak",
        price: 7499,
      },
      {
        name: "Dark Oak - Sugar Brown",
        image: "/umage/A-Conversation-Piece/dark-oak-sugar-brown.svg",
        material: "Dark Oak",
        price: 7499,
      },
      {
        name: "Dark Oak - White Sands",
        image: "/umage/A-Conversation-Piece/dark-oak-white-sands.svg",
        material: "Dark Oak",
        price: 7499,
      },
      {
        name: "Walnut - Sugar Brown",
        image: "/umage/A-Conversation-Piece/walnut-sugar-brown.svg",
        material: "Walnut",
        price: 7499,
      },
      {
        name: "Walnut - White Sands",
        image: "/umage/A-Conversation-Piece/walnut-white-sands.svg",
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
        image: "/umage/Gather-Café-table/ Gather Café table 8.999 kr.webp",
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
  },
  {
    id: "heiko-dining-chair",
    name: "Heiko Dining Chair",
    description: "The Heiko dining chair embodies Scandinavian simplicity and comfort.",
    price: 5999,
    category: "Dining Chairs",
    variants: [
      {
        name: "Oak",
        image: "/umage/Heiko-dinning-chair/umage_packshot_5538_heiko_dining-chair_oak_-2_900x.webp",
        material: "Oak",
        price: 5999,
      },
      {
        name: "Walnut",
        image: "/umage/Heiko-dinning-chair/heiko-walnut.svg",
        material: "Walnut",
        price: 6299,
      },
    ],
    designer: "Umage Design Team",
    features: [
      "Solid wood construction",
      "Minimalist Scandinavian design",
      "Comfortable curved backrest",
      "Durable and sustainable materials",
      "Natural wood finish",
      "Lightweight yet sturdy",
      "Easy to maintain",
      "Stackable design",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oak, Walnut" },
      { label: "Finish", value: "Natural oil finish" },
      { label: "Style", value: "Scandinavian minimalist" },
      { label: "Dimensions", value: "H: 78cm, W: 45cm, D: 50cm" },
      { label: "Seat Height", value: "44cm" },
      { label: "Weight", value: "4.5kg" },
      { label: "Care", value: "Dust regularly, oil treatment annually" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
  },
  {
    id: "audacious-desk",
    name: "Audacious Desk",
    description: "A bold and functional desk that makes a statement in any workspace.",
    price: 12999,
    category: "Desks",
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
    designer: "Umage Design Team",
    features: [
      "Premium solid oak construction",
      "Built-in storage solutions",
      "Multiple upholstery options",
      "Contemporary Scandinavian design",
      "Functional workspace design",
      "Durable construction",
      "Ergonomic design",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Solid oak with upholstered elements" },
      { label: "Wood", value: "Oak" },
      { label: "Upholstery Options", value: "Sugar Brown, White Sands, Sterling, Shadow, Morning Meadows, Hazelnut, Charcoal" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Features", value: "Built-in storage, ergonomic design" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
  },
  {
    id: "asteria-spotlight",
    name: "Asteria Spotlight",
    description: "A sophisticated spotlight that combines functionality with elegant design.",
    price: 3999,
    category: "Lighting",
    variants: [
      {
        name: "Plated Brass",
        image: "/umage/Asteria-spotlight/umage_packshot_2496_asteria_spot_plated_brass_4_900x.webp",
        material: "Plated Brass",
        price: 3999,
      },
      {
        name: "Black",
        image: "/umage/Asteria-spotlight/umage_packshot_2496_asteria-spot_black_-4_900x.webp",
        material: "Black",
        price: 3999,
      },
      {
        name: "Polished Steel",
        image: "/umage/Asteria-spotlight/umage_packshot_2497_asteria_spot_polished_steel_4_900x.webp",
        material: "Polished Steel",
        price: 3999,
      },
    ],
    designer: "Umage Design Team",
    features: [
      "Adjustable spotlight positioning",
      "Premium metal finishes",
      "Modern minimalist design",
      "Energy efficient LED compatible",
      "Multiple finish options",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Metal with premium finishes" },
      { label: "Finish Options", value: "Plated Brass, Black, Polished Steel" },
      { label: "Style", value: "Contemporary minimalist" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
  },
  {
    id: "comfort-circle-dining-table",
    name: "Comfort Circle Dining Table",
    description: "A beautifully crafted round dining table that brings people together with its distinctive rippled wood surface.",
    price: 15999,
    category: "Tables",
    variants: [
      {
        name: "Rippled Black Oak",
        image: "/umage/Comfort-Circle-dining-table/umage_packshot_5156-5156-1_comfort_circle_rippled_black_oak_2_1400x.webp",
        material: "Black Oak",
        price: 15999,
      },
      {
        name: "Rippled Oak",
        image: "/umage/Comfort-Circle-dining-table/umage_packshot_5656-5656-1_comfort_circle_rippled_oak_2_900x.webp",
        material: "Oak",
        price: 15999,
      },
      {
        name: "Rippled Dark Oak",
        image: "/umage/Comfort-Circle-dining-table/umage_packshot_5856-5856-1_comfort_circle_rippled_dark_oak_2_1400x.webp",
        material: "Dark Oak",
        price: 15999,
      },
    ],
    designer: "Umage Design Team",
    features: [
      "Distinctive rippled wood surface",
      "Round design for intimate dining",
      "Premium solid wood construction",
      "Multiple wood finish options",
      "Seats 4-6 people comfortably",
      "Unique textured surface",
      "Contemporary Scandinavian design",
      "Durable construction",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Solid wood with rippled surface" },
      { label: "Wood Options", value: "Oak, Black Oak, Dark Oak" },
      { label: "Finish", value: "Rippled texture with natural oil finish" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Shape", value: "Round" },
      { label: "Seating", value: "4-6 people" },
      { label: "Care", value: "Dust regularly, oil treatment annually" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
  },
  {
    id: "chordis",
    name: "Chordis",
    description: "A sophisticated lighting fixture that combines modern design with premium brass construction.",
    price: 4999,
    category: "Lighting",
    variants: [
      {
        name: "Brass",
        image: "/umage/Chordis/umage_packshot_2523_chordis_brass_-2_900x.webp",
        material: "Brass",
        price: 4999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Premium brass construction", "Contemporary design"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Brass" },
    ],
  },
  {
    id: "duende-desk",
    name: "Duende Desk",
    description: "A sleek and functional desk that combines modern design with practical workspace solutions.",
    price: 11999,
    category: "Desks",
    variants: [
      {
        name: "Oak",
        image: "/umage/Duende-desk/umage_packshot_5605_duende_oak_1_900x.webp",
        material: "Oak",
        price: 11999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Modern minimalist design", "Premium solid wood construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "lounge-around-3-seater",
    name: "Lounge Around 3-Seater",
    description: "A comfortable and stylish 3-seater sofa that brings relaxation and elegance to any living space.",
    price: 24999,
    category: "Seating",
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/Lounge-Around-3-seter/umage_packshot_5550c723-01_lounge_around_3-seater_oak_sugar_brown_2_59509b40-b394-46b2-bbd4-cf8d5fe0f15f_900x.webp",
        material: "Oak",
        price: 24999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Comfortable 3-seater design", "Premium wood frame construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Wood frame with upholstered cushions" },
    ],
  },
  {
    id: "the-reader",
    name: "The Reader",
    description: "An elegant reading chair designed for comfort and style.",
    price: 18999,
    category: "Seating",
    variants: [
      {
        name: "Oak - Sugar Brown",
        image: "/umage/The-Reader/umage_packshot_5502-702-01_the_reader_oak_sugar_brown_2_7b723e73-d1fc-4340-9e5b-a540aed0b1aa_900x.webp",
        material: "Oak",
        price: 18999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Ergonomic reading chair design", "Premium wood frame construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "stories-shelving",
    name: "Stories Shelving",
    description: "A versatile shelving system that tells your story through display.",
    price: 8999,
    category: "Storage",
    variants: [
      {
        name: "Oak",
        image: "/umage/Stories-shelving/umage_packshot_5621_stories_oak_2_900x.webp",
        material: "Oak",
        price: 8999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Modular shelving system", "Premium solid wood construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid oak" },
    ],
  },
  {
    id: "treasures-dresser",
    name: "Treasures Dresser",
    description: "A sophisticated dresser that combines storage functionality with elegant design. Perfect for bedrooms or living spaces, offering ample storage with style.",
    price: 16999,
    category: "Storage",
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
    designer: "Umage Design Team",
    features: [
      "Spacious storage capacity",
      "Premium solid wood construction",
      "Multiple finish options",
      "Elegant design details",
      "Contemporary Scandinavian design",
      "Durable construction",
      "Perfect for bedrooms",
      "Functional and stylish",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Solid wood with upholstered elements" },
      { label: "Wood Options", value: "Oak, Black Oak, Dark Oak" },
      { label: "Upholstery", value: "Sugar Brown, White Sands, Morning Meadows" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Type", value: "Dresser with storage" },
      { label: "Care", value: "Dust regularly, use wood care products" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
  },
  {
    id: "lemon-squeeze-ceiling-lamp",
    name: "Lemon Squeeze Ceiling Lamp",
    description: "A playful yet sophisticated ceiling lamp that creates beautiful ambient lighting with its distinctive geometric design.",
    price: 3499,
    category: "Lighting",
    variants: [
      {
        name: "Long Penta - Plated Brass",
        image: "/umage/Lemon-Squeeze-ceiling-lamp/umage_packshot_2202_lemon-squeeze_pendant-lamp_long_penta_plated-brass_1400x.webp",
        material: "Plated Brass",
        size: "Long",
        price: 3499,
      },
      {
        name: "Long Penta - Polished Steel",
        image: "/umage/Lemon-Squeeze-ceiling-lamp/umage_packshot_2529_lemon-squeeze_pendant-lamp_long_penta_polished-steel_1400x.webp",
        material: "Polished Steel",
        size: "Long",
        price: 3499,
      },
      {
        name: "Short Penta - Plated Brass",
        image: "/umage/Lemon-Squeeze-ceiling-lamp/umage_packshot_2622_lemon-squeeze_pendant-lamp_short_penta_plated-brass_1400x.webp",
        material: "Plated Brass",
        size: "Short",
        price: 3199,
      },
      {
        name: "Short Penta - Polished Steel",
        image: "/umage/Lemon-Squeeze-ceiling-lamp/umage_packshot_2625_lemon-squeeze_pendant-lamp_short_penta_polished-steel_900x.webp",
        material: "Polished Steel",
        size: "Short",
        price: 3199,
      },
    ],
    designer: "Umage Design Team",
    features: [
      "Distinctive geometric pentagon design",
      "Available in two sizes",
      "Premium metal finishes",
      "Creates beautiful ambient lighting",
      "Contemporary Scandinavian design",
      "Easy installation",
      "Energy efficient LED compatible",
      "Adjustable height",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Metal with premium finishes" },
      { label: "Finish Options", value: "Plated Brass, Polished Steel" },
      { label: "Size Options", value: "Long, Short" },
      { label: "Shape", value: "Pentagon (Penta)" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Light Source", value: "LED compatible" },
      { label: "Installation", value: "Ceiling mounted" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
  },
  {
    id: "heart-n-soul-200-dining-table",
    name: "Heart'n'Soul 200 Dining Table",
    description: "A stunning dining table that brings heart and soul to your dining space.",
    price: 18999,
    category: "Tables",
    variants: [
      {
        name: "Oak",
        image: "/umage/Heart'n'Soul-200-dining-table-200/umage_packshot_5658_heart-n-soul_dining-table_oak_-2_6d603e60-d050-4480-8863-d04d03022f7d_900x.webp",
        material: "Oak",
        price: 18999,
      },
      {
        name: "Black Oak",
        image: "/umage/Heart'n'Soul-200-dining-table-200/umage_packshot_5658_heart-n-soul_dining-table_black-oak_-2_900x.webp",
        material: "Black Oak",
        price: 18999,
      },
      {
        name: "Dark Oak",
        image: "/umage/Heart'n'Soul-200-dining-table-200/umage_packshot_5858_heart-n-soul_dining-table-200_dark-oak_-2_900x.webp",
        material: "Dark Oak",
        price: 18999,
      },
      {
        name: "Walnut",
        image: "/umage/Heart'n'Soul-200-dining-table-200/umage_packshot_5890_heart-n-soul-200_dining-table_walnut_-2_900x.webp",
        material: "Walnut",
        price: 19999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Premium solid wood construction", "Seats 6-8 people", "Multiple wood finishes available"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
      { label: "Wood Options", value: "Oak, Black Oak, Dark Oak, Walnut" },
    ],
  },
  {
    id: "the-socialite-bar-stool",
    name: "The Socialite Bar Stool",
    description: "A sophisticated bar stool designed for social dining spaces.",
    price: 5499,
    category: "Seating",
    variants: [
      {
        name: "Dark Oak",
        image: "/umage/The-Socialite-bar-stool/umage_packshot_5881_the-socialite_bar-stool_dark-oak_-2_900x.webp",
        material: "Dark Oak",
        price: 5499,
      },
    ],
    designer: "Umage Design Team",
    features: ["Bar height seating", "Premium solid wood construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "italic-table",
    name: "Italic Table",
    description: "A sleek and modern table with distinctive angled legs.",
    price: 14999,
    category: "Tables",
    variants: [
      {
        name: "Oak with Glass Top",
        image: "/umage/Italic/umage_packshot_5523c5523-2_italic_oak_glass_2_900x.webp",
        material: "Oak",
        price: 14999,
      },
      {
        name: "Black Oak with Glass Top",
        image: "/umage/Italic/umage_packshot_5124c5523-2_italic_black_oak_glass_2_1400x.webp",
        material: "Black Oak",
        price: 15499,
      },
      {
        name: "Dark Oak with Glass Top",
        image: "/umage/Italic/umage_packshot_5719c5523-2_italic_dark_oak_glass_2_1400x.webp",
        material: "Dark Oak",
        price: 15499,
      },
    ],
    designer: "Umage Design Team",
    features: ["Distinctive angled legs", "Glass top with wood base", "Multiple wood finishes"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Wood with glass top" },
      { label: "Wood Options", value: "Oak, Black Oak, Dark Oak" },
    ],
  },
  {
    id: "heart-n-soul-console-table",
    name: "Heart'n'Soul Console Table",
    description: "An elegant console table that brings the heart and soul of Scandinavian design to your entryway.",
    price: 12999,
    category: "Tables",
    variants: [
      {
        name: "Black Oak",
        image: "/umage/Heart'n'Soul-console-table/umage_packshot_5110_heart-n-soul_console-table_black-oak_-2_900x.webp",
        material: "Black Oak",
        price: 12999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Elegant console design", "Premium solid wood construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "lemon-squeeze-wall-lamp-double",
    name: "Lemon Squeeze Wall Lamp Double",
    description: "A playful yet sophisticated double wall lamp that creates beautiful ambient lighting.",
    price: 4999,
    category: "Lighting",
    variants: [
      {
        name: "Short Double - Plated Brass",
        image: "/umage/Lemon-Squeeze-wall-lamp,double/umage_packshot_2621_lemon-squeeze_wall-lamp_short_double_plated-brass_2b9ca272-8267-494d-8dd1-41f2461905a6_1400x.webp",
        material: "Brass",
        price: 4999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Double wall-mounted design", "Premium metal finishes"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Metal with premium finishes" },
    ],
  },
  {
    id: "the-socialite-counter-chair",
    name: "The Socialite Counter Chair",
    description: "A sophisticated counter-height chair designed for social dining spaces.",
    price: 7999,
    category: "Seating",
    variants: [
      {
        name: "Black Oak",
        image: "/umage/The-Socialite-counter-chair/umage_packshot_5119_the-socialite_counter-stool_black-oak_-2_900x.webp",
        material: "Black Oak",
        price: 7999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Counter height seating", "Premium solid wood construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "heart-n-soul-dining-table",
    name: "Heart'n'Soul Dining Table",
    description: "A beautiful dining table that brings heart and soul to your dining space with elegant design.",
    price: 16999,
    category: "Tables",
    variants: [
      {
        name: "Black Oak",
        image: "/umage/Heart'n'Soul-Dinning table/umage_packshot_5132_heart-n-soul_dining-table-120_black-oak_-3-_1_900x.webp",
        material: "Black Oak",
        price: 16999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Premium solid wood construction", "Elegant dining table design"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "heart-n-soul-dining-120",
    name: "Heart'n'Soul Dining Table 120",
    description: "A compact 120cm dining table perfect for smaller spaces while maintaining elegant design.",
    price: 15999,
    category: "Tables",
    variants: [
      {
        name: "Oak",
        image: "/umage/Heart'n'Soul-dinning-120/umage_packshot_5659_heart_n_soul_dining_table_120_oak_2_f7100c94-d1c3-43d6-9ed0-6893363dac34_900x.webp",
        material: "Oak",
        price: 15999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Compact 120cm size", "Premium solid wood construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "lemon-squeeze-wall-lamp-single",
    name: "Lemon Squeeze Wall Lamp Single",
    description: "A sophisticated single wall lamp that creates beautiful ambient lighting.",
    price: 3999,
    category: "Lighting",
    variants: [
      {
        name: "Long Single - Plated Brass",
        image: "/umage/Lemon-Squeeze-wall-lamp,single/umage_packshot_2200_lemon-squeeze_wall-lamp_long_single_plated-brass_1400x.webp",
        material: "Brass",
        price: 3999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Single wall-mounted design", "Premium metal finishes"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Metal with premium finishes" },
    ],
  },
  {
    id: "lounge-around-shuffle-coffee-table",
    name: "Lounge Around Shuffle Coffee Table",
    description: "A versatile coffee table that complements the Lounge Around collection perfectly.",
    price: 9999,
    category: "Tables",
    variants: [
      {
        name: "Oak",
        image: "/umage/Lounge-Around-Shuffle-coffee-table/umage_packshot_5552_lounge-around-shuffle_oak_-3_e7c808bb-3f3c-4857-8052-b7c6e0de3f98_900x.webp",
        material: "Oak",
        price: 9999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Matches Lounge Around collection", "Premium solid wood construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Solid wood" },
    ],
  },
  {
    id: "lounge-around-shuffle-puff",
    name: "Lounge Around Shuffle Puff",
    description: "A comfortable ottoman that perfectly complements the Lounge Around collection.",
    price: 7999,
    category: "Seating",
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
    designer: "Umage Design Team",
    features: [
      "Comfortable ottoman design",
      "Matches Lounge Around collection",
      "Multiple upholstery options",
      "Solid wood frame construction",
      "Versatile seating solution",
      "Premium materials",
    ],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Manufacturer", value: "Umage" },
      { label: "Material", value: "Wood frame with upholstered cushion" },
      { label: "Wood Options", value: "Oak, Dark Oak" },
      { label: "Upholstery", value: "Sugar Brown, White Sands, Shadow" },
      { label: "Style", value: "Contemporary Scandinavian" },
      { label: "Collection", value: "Lounge Around" },
      { label: "Warranty", value: "2 years manufacturer warranty" },
      { label: "Origin", value: "Danish design" },
    ],
  },
  {
    id: "metal-cover-accessories-asteria",
    name: "Metal Cover Accessories for Asteria",
    description: "Premium metal cover accessories designed specifically for Asteria lighting fixtures.",
    price: 1999,
    category: "Accessories",
    variants: [
      {
        name: "Steel Cover",
        image: "/umage/Metal-Cover-accessories-for-Asteria/4172_900x.webp",
        material: "Steel",
        price: 1999,
      },
    ],
    designer: "Umage Design Team",
    features: ["Compatible with Asteria fixtures", "Premium metal construction"],
    specifications: [
      { label: "Designer", value: "Umage Design Team" },
      { label: "Material", value: "Metal" },
    ],
  },
];

export default function UmagePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15; // 5 rows × 3 columns

  const categories = ["All", "Dining Chairs", "Tables", "Desks", "Lighting", "Seating", "Storage", "Accessories"];

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

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Homepage */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center text-stone-600 hover:text-stone-800 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/umage/Treasures Dresser/lifestyle/UMAGE_lifestyle_Treasures_dresser_oak_sugar_brown__2_1_1000x.webp"
          alt="Umage Collection"
          fill
          className="object-cover"
        />
        
        {/* Warm Scandinavian Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-orange-50/20 to-rose-100/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-12 py-8 rounded-2xl shadow-lg">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
                UMAGE
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Scandinavian furniture design that brings people together
              </p>
            </div>
          </div>
        </div>
        
        {/* Floating Design Elements - Warm Scandinavian Colors */}
        <div className="absolute top-16 left-12 w-6 h-6 bg-amber-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-28 right-20 w-4 h-4 bg-orange-200 rounded-full opacity-70 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-16 w-5 h-5 bg-rose-200 rounded-full opacity-65 animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-amber-200 rounded-full opacity-80 animate-pulse delay-500"></div>
        <div className="absolute top-36 left-1/4 w-4 h-4 bg-orange-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-28 right-1/4 w-6 h-6 bg-rose-300 rounded-full opacity-70 animate-pulse delay-200"></div>
        <div className="absolute top-20 right-1/3 w-3 h-3 bg-amber-400 rounded-full opacity-75 animate-pulse delay-800"></div>
        <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-orange-100 rounded-full opacity-65 animate-pulse delay-400"></div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
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
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/umage/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={product.variants[0].image}
                    alt={product.name}
                    fill
                    className="object-contain object-center p-8 group-hover:scale-105 transition-transform duration-300"
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
                    kr {product.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <span>Next</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
