#!/usr/bin/env node

/**
 * Script to migrate all FLOS products from static data to Sanity CMS
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// FLOS products data from lib/flosProducts.ts
const flosProducts = [
  {
    _id: "2097-18-chandelier",
    name: "2097/18 Chandelier",
    description: "Iconic brass chandelier with 18 lights, a masterpiece of Italian design. The 2097 series represents the perfect balance between tradition and innovation.",
    price: 22270,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/2097-18-chandelier-brass.jpg",
    href: "/flos/2097-18-chandelier",
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
  },
  {
    _id: "2097-30-chandelier",
    name: "2097/30 Chandelier",
    description: "Larger version of the iconic 2097 chandelier with 30 lights. An impressive statement piece that commands attention in any space.",
    price: 28050,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/2097-30/2097:30 chandelier from Flos NOK  28,050  Color -  Brass.jpg",
    href: "/flos/2097-30-chandelier",
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
  },
  {
    _id: "ktribe-1-floor-lamp",
    name: "KTribe 1 Floor Lamp",
    description: "Contemporary floor lamp with distinctive pleated shade design. The KTribe collection combines modern aesthetics with functional lighting, perfect for creating ambient illumination in any space.",
    price: 12130,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/KTribe-1-floor-lamp/KTribe 1 floor lamp NOK  12 130  Color -  Fumee.avif",
    href: "/flos/ktribe-1-floor-lamp",
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
  },
  {
    _id: "ktribe-2-floor-lamp",
    name: "KTribe 2 Floor Lamp",
    description: "Elegant floor lamp from the KTribe collection with refined proportions, perfect for creating warm ambient lighting in living spaces and contemporary interiors.",
    price: 11720,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/KTribe-2-floor-lamp/KTribe 2 floor lamp NOK  11,720  Color -  Transparent.webp",
    href: "/flos/ktribe-2-floor-lamp",
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
  },
  {
    _id: "2097-50-chandelier",
    name: "2097/50 Chandelier",
    description: "The grandest version of the iconic 2097 chandelier with 50 lights. A spectacular statement piece that transforms any space into a luxurious environment.",
    price: 35000,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/2097-50/Brass.jpg",
    href: "/flos/2097-50-chandelier",
    variants: [
      {
        name: "Brass",
        image: "/FLOS/2097-50/Brass.jpg",
        color: "Brass",
        price: 35000,
      },
    ],
    designer: "Gino Sarfatti",
  },
  {
    _id: "arco-floor-lamp",
    name: "Arco Floor Lamp",
    description: "Iconic arc floor lamp with marble base and adjustable steel arm. A timeless design that brings elegance and functionality to any space.",
    price: 33195,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg",
    href: "/flos/arco-floor-lamp",
    variants: [
      {
        name: "Stainless Steel",
        image: "/FLOS/Arco-floor-lamp/Arco floor lamp from Flos NOK  33,195.jpg",
        color: "Stainless Steel",
        price: 33195,
      },
    ],
    designer: "Achille & Pier Giacomo Castiglioni",
  },
  {
    _id: "bellhop-rechargeable-table-lamp",
    name: "Bellhop Rechargeable Table Lamp",
    description: "Portable rechargeable table lamp with contemporary design. Perfect for both indoor and outdoor use with its wireless functionality.",
    price: 3180,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/Bellhop-rechargeable-table-lamp /Bellhop oppladbar bordlampe fra Flos kr 3 180  Farge - White.webp",
    href: "/flos/bellhop-rechargeable-table-lamp",
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
    _id: "bilboquet-table-lamp",
    name: "Bilboquet Table Lamp",
    description: "Elegant table lamp with distinctive conical shade design. A perfect blend of contemporary aesthetics and functional lighting.",
    price: 3295,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/Bilboquet-bordlampe-Flos/Bilboquet bordlampe Flos kr 3 295  Farge - Linen.jpg",
    href: "/flos/bilboquet-table-lamp",
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
    designer: "Ronan & Erwan Bouroullec",
  },
  {
    _id: "captain-flint-floor-lamp",
    name: "Captain Flint Floor Lamp",
    description: "Contemporary floor lamp with marble base and adjustable LED head. Combines luxury materials with modern functionality.",
    price: 19440,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/Captain-Flint/Captain Flint NOK  19,440  Color -  Brushed brass:white marble.jpg",
    href: "/flos/captain-flint-floor-lamp",
    variants: [
      {
        name: "Brushed Brass/White Marble",
        image: "/FLOS/Captain-Flint/Captain Flint NOK  19,440  Color -  Brushed brass:white marble.jpg",
        color: "Brushed Brass",
        price: 19440,
      },
      {
        name: "Anthracite/Black Marble",
        image: "/FLOS/Captain-Flint/Captain Flint NOK  19,440  Color -  Anthracite:black marble.jpg",
        color: "Anthracite",
        price: 19440,
      },
    ],
    designer: "Michael Anastassiades",
  },
  {
    _id: "glo-ball-table-lamp",
    name: "Glo-Ball Table Lamp",
    description: "Spherical table lamp with opal glass diffuser. Creates soft, ambient lighting perfect for any interior setting.",
    price: 8190,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg",
    href: "/flos/glo-ball-table-lamp",
    variants: [
      {
        name: "Silver",
        image: "/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Silver.jpg",
        color: "Silver",
        price: 8190,
      },
      {
        name: "Matte Black",
        image: "/FLOS/Glo-Ball-table-lamp-Flos/Glo-Ball table lamp Flos NOK  8,190  Color -  Matte Black.jpg",
        color: "Matte Black",
        price: 8190,
      },
    ],
    designer: "Jasper Morrison",
  },
  {
    _id: "ic-f1-floor-lamp",
    name: "IC F1 Floor Lamp",
    description: "Minimalist floor lamp with spherical glass shade and slender metal stem. A perfect balance of form and function.",
    price: 8540,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.avif",
    href: "/flos/ic-f1-floor-lamp",
    variants: [
      {
        name: "Brushed Brass",
        image: "/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Brushed brass.avif",
        color: "Brushed Brass",
        price: 8540,
      },
      {
        name: "Black",
        image: "/FLOS/IC-F1-Floor-Lamp/IC F1 Floor Lamp from Flos NOK  8,540  Color -  Black.avif",
        color: "Black",
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
    _id: "ic-lights-t1-high",
    name: "IC Lights T1 High Table Lamp",
    description: "Elegant table lamp with spherical glass shade and tall stem. Part of the acclaimed IC Lights collection.",
    price: 6120,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Brushed brass.webp",
    href: "/flos/ic-lights-t1-high",
    variants: [
      {
        name: "Brushed Brass",
        image: "/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Brushed brass.webp",
        color: "Brushed Brass",
        price: 6120,
      },
      {
        name: "Black",
        image: "/FLOS/IC-Lights-T1-High/IC Lights T1 High NOK  6,120  Color -  Black.webp",
        color: "Black",
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
    _id: "ic-lights-t1-low",
    name: "IC Lights T1 Low Table Lamp",
    description: "Compact table lamp with spherical glass shade and short stem. Perfect for intimate lighting settings.",
    price: 6120,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Brushed brass.webp",
    href: "/flos/ic-lights-t1-low",
    variants: [
      {
        name: "Brushed Brass",
        image: "/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Brushed brass.webp",
        color: "Brushed Brass",
        price: 6120,
      },
      {
        name: "Black",
        image: "/FLOS/IC-Lights-T1-Low/IC Lights T1 Low NOK  6,120  Color -  Black.webp",
        color: "Black",
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
    _id: "ktribe-2-pendant",
    name: "KTribe 2 Pendant",
    description: "Suspended pendant lamp with pleated shade design. Perfect for dining areas and kitchen islands.",
    price: 6025,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Transparent.webp",
    href: "/flos/ktribe-2-pendant",
    variants: [
      {
        name: "Transparent",
        image: "/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Transparent.webp",
        color: "Transparent",
        price: 6025,
      },
      {
        name: "Fumee",
        image: "/FLOS/KTribe-2-pendant/KTribe 2 pendant NOK  6,025  Color -  Fumee.webp",
        color: "Fumee",
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
  },
  {
    _id: "ktribe-3-floor-lamp",
    name: "KTribe 3 Floor Lamp",
    description: "Large floor lamp from the KTribe collection with impressive proportions. Creates dramatic ambient lighting in any space.",
    price: 20270,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/KTribe-3-floor-lamp /KTribe 3 floor lamp NOK  20,270  Color -  Transparent.webp",
    href: "/flos/ktribe-3-floor-lamp",
    variants: [
      {
        name: "Transparent",
        image: "/FLOS/KTribe-3-floor-lamp /KTribe 3 floor lamp NOK  20,270  Color -  Transparent.webp",
        color: "Transparent",
        price: 20270,
      },
      {
        name: "Fumee",
        image: "/FLOS/KTribe-3-floor-lamp /KTribe 3 floor lamp NOK  20,270  Color -  Fumee.webp",
        color: "Fumee",
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
  },
  {
    _id: "ktribe-3-outdoor-floor-lamp",
    name: "KTribe 3 Outdoor Floor Lamp",
    description: "Weather-resistant outdoor floor lamp with distinctive pleated shade. Perfect for terraces and garden spaces.",
    price: 33250,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg",
    href: "/flos/ktribe-3-outdoor-floor-lamp",
    variants: [
      {
        name: "Panama",
        image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Panama.jpg",
        color: "Panama",
        price: 33250,
      },
      {
        name: "Green Wall",
        image: "/FLOS/KTribe-3-Outdoor-floor-lamp/KTribe 3 Outdoor floor lamp NOK  33,250  Color -  Green wall.jpg",
        color: "Green Wall",
        price: 33250,
      },
    ],
    designer: "Philippe Starck",
  },
  {
    _id: "ktribe-table-2-lamp",
    name: "KTribe Table 2 Table Lamp",
    description: "Medium-sized table lamp from the KTribe collection. Perfect for desks, side tables, and bedside lighting.",
    price: 9720,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/KTribe-Table 2-table-lamp/KTribe Table 2 table lamp NOK  9,720  Color -  Transparent.webp",
    href: "/flos/ktribe-table-2-lamp",
    variants: [
      {
        name: "Transparent",
        image: "/FLOS/KTribe-Table 2-table-lamp/KTribe Table 2 table lamp NOK  9,720  Color -  Transparent.webp",
        color: "Transparent",
        price: 9720,
      },
      {
        name: "Fumee",
        image: "/FLOS/KTribe-Table 2-table-lamp/KTribe Table 2 table lamp NOK  9,720  Color -  Fumee.webp",
        color: "Fumee",
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
    _id: "ktribe-wall-lamp",
    name: "KTribe Wall Lamp",
    description: "Wall-mounted lamp from the KTribe collection. Ideal for accent lighting and creating atmospheric wall illumination.",
    price: 5470,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/KTribe-wall-lamp/KTribe wall lamp NOK  5,470  Color -  Transparent.webp",
    href: "/flos/ktribe-wall-lamp",
    variants: [
      {
        name: "Transparent",
        image: "/FLOS/KTribe-wall-lamp/KTribe wall lamp NOK  5,470  Color -  Transparent.webp",
        color: "Transparent",
        price: 5470,
      },
      {
        name: "Fumee",
        image: "/FLOS/KTribe-wall-lamp/KTribe wall lamp NOK  5,470  Color -  Fumee.webp",
        color: "Fumee",
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
    _id: "snoopy-table-lamp",
    name: "Snoopy Table Lamp",
    description: "Iconic table lamp with distinctive dome shade and marble base. A timeless design that combines elegance with functionality.",
    price: 15060,
    category: "Lighting",
    brand: "FLOS",
    image: "/FLOS/Snoopy-table-lamp/Snoopy table lamp from Flos NOK  15,060  Color -  Black.jpg",
    href: "/flos/snoopy-table-lamp",
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
    designer: "Achille & Pier Giacomo Castiglioni",
  },
];

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    });

    console.log(`✅ Uploaded image: ${imagePath} -> ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

async function createFlosCategory() {
  try {
    // Check if FLOS category already exists
    const existingCategory = await client.fetch(
      `*[_type == "category" && title == "FLOS"][0]`
    );

    if (existingCategory) {
      console.log('✅ FLOS category already exists:', existingCategory._id);
      return existingCategory._id;
    }

    // Create FLOS category
    const category = await client.create({
      _type: 'category',
      title: 'FLOS',
      slug: {
        _type: 'slug',
        current: 'flos'
      },
      description: 'Italian lighting excellence since 1962. Iconic designs by world-renowned designers.'
    });

    console.log('✅ Created FLOS category:', category._id);
    return category._id;
  } catch (error) {
    console.error('❌ Failed to create FLOS category:', error.message);
    throw error;
  }
}

async function createLightingCategory() {
  try {
    // Check if Lighting category already exists
    const existingCategory = await client.fetch(
      `*[_type == "category" && title == "Lighting"][0]`
    );

    if (existingCategory) {
      console.log('✅ Lighting category already exists:', existingCategory._id);
      return existingCategory._id;
    }

    // Create Lighting category
    const category = await client.create({
      _type: 'category',
      title: 'Lighting',
      slug: {
        _type: 'slug',
        current: 'lighting'
      },
      description: 'Premium lighting fixtures for modern interiors.'
    });

    console.log('✅ Created Lighting category:', category._id);
    return category._id;
  } catch (error) {
    console.error('❌ Failed to create Lighting category:', error.message);
    throw error;
  }
}

async function createProductVariants(variants) {
  const processedVariants = [];
  
  for (const variant of variants) {
    let imageAssetId = null;
    
    if (variant.image) {
      imageAssetId = await uploadImageToSanity(variant.image);
    }
    
    processedVariants.push({
      _key: variant.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: variant.name,
      price: variant.price,
      color: variant.color || null,
      material: variant.material || null,
      image: imageAssetId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      } : null
    });
  }
  
  return processedVariants;
}

async function createFlosProduct(product, flosCategoryId, lightingCategoryId) {
  try {
    console.log(`\n🔄 Processing product: ${product.name}`);

    // Check if product already exists
    const existingProduct = await client.fetch(
      `*[_type == "product" && _id == "${product._id}"][0]`
    );

    if (existingProduct) {
      console.log(`⚠️  Product already exists: ${product.name} (${product._id})`);
      return existingProduct._id;
    }

    // Upload main product image
    let mainImageAssetId = null;
    if (product.image) {
      mainImageAssetId = await uploadImageToSanity(product.image);
    }

    // Process variants
    const variants = await createProductVariants(product.variants || []);

    // Create product document
    const productDoc = {
      _id: product._id,
      _type: 'product',
      name: product.name,
      slug: {
        _type: 'slug',
        current: product._id
      },
      description: [
        {
          _type: 'block',
          _key: 'description',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span',
              text: product.description,
              marks: []
            }
          ]
        }
      ],
      price: product.price,
      image: mainImageAssetId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageAssetId
        }
      } : null,
      categories: [
        {
          _type: 'reference',
          _ref: flosCategoryId,
          _key: 'flos'
        },
        {
          _type: 'reference',
          _ref: lightingCategoryId,
          _key: 'lighting'
        }
      ],
      brand: product.brand,
      designer: product.designer || null,
      href: product.href,
      variants: variants,
      inStock: true,
      featured: false
    };

    const createdProduct = await client.create(productDoc);
    console.log(`✅ Created product: ${product.name} (${createdProduct._id})`);
    return createdProduct._id;

  } catch (error) {
    console.error(`❌ Failed to create product ${product.name}:`, error.message);
    throw error;
  }
}

async function migrateFlosProducts() {
  try {
    console.log('🚀 Starting FLOS products migration to Sanity...\n');

    // Create categories
    console.log('📁 Creating categories...');
    const flosCategoryId = await createFlosCategory();
    const lightingCategoryId = await createLightingCategory();

    console.log('\n📦 Migrating products...');
    let successCount = 0;
    let errorCount = 0;

    for (const product of flosProducts) {
      try {
        await createFlosProduct(product, flosCategoryId, lightingCategoryId);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to migrate ${product.name}:`, error.message);
        errorCount++;
      }
    }

    console.log('\n🎉 Migration completed!');
    console.log(`✅ Successfully migrated: ${successCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);
    console.log(`📊 Total: ${flosProducts.length} products`);

    if (successCount > 0) {
      console.log('\n💡 Next steps:');
      console.log('1. Update the FLOS page to use Sanity data');
      console.log('2. Create a getFlosProducts function');
      console.log('3. Test the FLOS page with Sanity data');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  migrateFlosProducts();
}

module.exports = { migrateFlosProducts };
