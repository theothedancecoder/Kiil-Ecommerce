export interface ProductVariant {
  name: string;
  image: string;
  price: number;
  color?: string;
  material?: string;
}

export interface LouisPoulsenProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  variants: ProductVariant[];
  designer?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  image: string;
  brand: string;
  href: string;
}

export const louisPoulsenProducts: LouisPoulsenProduct[] = [
  {
    _id: "aj-floor-lamp",
    name: "AJ Floor Lamp",
    description: "Iconic floor lamp designed by Arne Jacobsen. A timeless piece that combines functionality with elegant Scandinavian design.",
    price: 13025,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp",
    href: "/louis-poulsen/aj-floor",
    variants: [
      {
        name: "White",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp",
        color: "White",
        price: 13025,
      },
      {
        name: "Black",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Black.webp",
        color: "Black",
        price: 13025,
      },
      {
        name: "Dusty Blue",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Dusty Blue.webp",
        color: "Dusty Blue",
        price: 13025,
      },
      {
        name: "Electric Orange",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp",
        color: "Electric Orange",
        price: 13025,
      },
      {
        name: "Soft Lemon",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Soft lemon.webp",
        color: "Soft Lemon",
        price: 13025,
      },
      {
        name: "Warm Grey",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Grey.webp",
        color: "Warm Grey",
        price: 13025,
      },
      {
        name: "Warm Sand",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Sand.webp",
        color: "Warm Sand",
        price: 13025,
      },
      {
        name: "Stainless Steel Polished",
        image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 15 375  Farge - Stainless Steel Polished.webp",
        color: "Stainless Steel",
        price: 15375,
      },
    ],
    designer: "Arne Jacobsen",
  },
  {
    _id: "aj-wall-lamp-with-cord",
    name: "AJ Wall Lamp with Cord",
    description: "Wall-mounted version of the iconic AJ lamp with cord. Perfect for bedside lighting and reading areas.",
    price: 8995,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  White.webp",
    href: "/louis-poulsen/aj-wall",
    variants: [
      {
        name: "White",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  White.webp",
        color: "White",
        price: 8995,
      },
      {
        name: "Black",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Black.webp",
        color: "Black",
        price: 8995,
      },
      {
        name: "Dusty Blue",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ vegglampe med ledning kr 8 995  Farge - Dusty Blue.webp",
        color: "Dusty Blue",
        price: 8995,
      },
      {
        name: "Electric Orange",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Electric Orange.webp",
        color: "Electric Orange",
        price: 8995,
      },
      {
        name: "Soft Lemon",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Soft lemon.webp",
        color: "Soft Lemon",
        price: 8995,
      },
      {
        name: "Warm Grey",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Warm Grey.webp",
        color: "Warm Grey",
        price: 8995,
      },
      {
        name: "Warm Sand",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Warm Sand.webp",
        color: "Warm Sand",
        price: 8995,
      },
      {
        name: "Stainless Steel Polished",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  9,535  Color -  Stainless Steel Polished.webp",
        color: "Stainless Steel",
        price: 9535,
      },
    ],
    designer: "Arne Jacobsen",
  },
  {
    _id: "aj-vegglampe-med-ledning",
    name: "AJ Vegglampe med Ledning",
    description: "Veggmontert versjon av den ikoniske AJ-lampen med ledning. Perfekt for sengebelysning og leseområder.",
    price: 8995,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  White.webp",
    href: "/louis-poulsen/aj-vegglampe",
    variants: [
      {
        name: "White",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  White.webp",
        color: "White",
        price: 8995,
      },
      {
        name: "Black",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Black.webp",
        color: "Black",
        price: 8995,
      },
      {
        name: "Dusty Blue",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ vegglampe med ledning kr 8 995  Farge - Dusty Blue.webp",
        color: "Dusty Blue",
        price: 8995,
      },
      {
        name: "Electric Orange",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Electric Orange.webp",
        color: "Electric Orange",
        price: 8995,
      },
      {
        name: "Soft Lemon",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Soft lemon.webp",
        color: "Soft Lemon",
        price: 8995,
      },
      {
        name: "Warm Grey",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Warm Grey.webp",
        color: "Warm Grey",
        price: 8995,
      },
      {
        name: "Warm Sand",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  8,995  Color -  Warm Sand.webp",
        color: "Warm Sand",
        price: 8995,
      },
      {
        name: "Stainless Steel Polished",
        image: "/Louis-Poulsen/AJ-wall-lamp-with-cord/AJ wall lamp with cord NOK  9,535  Color -  Stainless Steel Polished.webp",
        color: "Stainless Steel",
        price: 9535,
      },
    ],
    designer: "Arne Jacobsen",
  },
  {
    _id: "panthella-160-rechargeable",
    name: "Panthella 160 Rechargeable LED Table Lamp",
    description: "Portable rechargeable version of the iconic Panthella lamp. Perfect for both indoor and outdoor use with wireless functionality.",
    price: 2295,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp",
    href: "/louis-poulsen/panthella-160",
    variants: [
      {
        name: "Opal White",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp",
        color: "Opal White",
        price: 2295,
      },
      {
        name: "Opal Beige",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal beige.webp",
        color: "Opal Beige",
        price: 2295,
      },
      {
        name: "Opal Pale Blue",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale blue.webp",
        color: "Opal Pale Blue",
        price: 2295,
      },
      {
        name: "Opal Pale Rose",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale rose.webp",
        color: "Opal Pale Rose",
        price: 2295,
      },
      {
        name: "Opaque Black",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque black.webp",
        color: "Opaque Black",
        price: 2295,
      },
      {
        name: "Opaque Orange",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque orange.webp",
        color: "Opaque Orange",
        price: 2295,
      },
      {
        name: "Chrome High Lustre",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 3 045  Farge - High lustre chrome plated.webp",
        color: "Chrome",
        price: 3045,
      },
      {
        name: "Brass Metallised",
        image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 Rechargeable LED Table Lamp NOK  3,045  Color -  Brass metallised.webp",
        color: "Brass",
        price: 3045,
      },
    ],
    designer: "Verner Panton",
  },
  {
    _id: "panthella-250-table-lamp",
    name: "Panthella 250 Table Lamp",
    description: "Classic table lamp with iconic mushroom shape. A timeless design that provides excellent ambient lighting.",
    price: 5660,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - White.webp",
    href: "/louis-poulsen/panthella-250",
    variants: [
      {
        name: "White",
        image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - White.webp",
        color: "White",
        price: 5660,
      },
      {
        name: "Black",
        image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 table lamp NOK  5,660  Color -  Black.webp",
        color: "Black",
        price: 5660,
      },
      {
        name: "Orange",
        image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Orange.webp",
        color: "Orange",
        price: 5660,
      },
      {
        name: "Coral",
        image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Coral.webp",
        color: "Coral",
        price: 5660,
      },
      {
        name: "Pale Blue",
        image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Pale Blue.webp",
        color: "Pale Blue",
        price: 5660,
      },
      {
        name: "Pale Rose",
        image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Pale Rose.webp",
        color: "Pale Rose",
        price: 5660,
      },
      {
        name: "High Lustre Chrome",
        image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 7 530  Farge - High lustre chrome plated.webp",
        color: "Chrome",
        price: 7530,
      },
    ],
    designer: "Verner Panton",
  },
  {
    _id: "ph-5-ceiling-lamp",
    name: "PH 5 Ceiling Lamp",
    description: "Iconic pendant lamp with layered shade system that provides glare-free lighting. A masterpiece of Danish design.",
    price: 11175,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp",
    href: "/louis-poulsen/ph-5",
    variants: [
      {
        name: "White Classic",
        image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp",
        color: "White",
        price: 11175,
      },
      {
        name: "White Modern",
        image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Modern.webp",
        color: "White",
        price: 11175,
      },
      {
        name: "Monochrome Black",
        image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Black.webp",
        color: "Black",
        price: 11175,
      },
      {
        name: "Hues of Blue",
        image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Blue.webp",
        color: "Blue",
        price: 11175,
      },
      {
        name: "Hues of Red",
        image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Red.webp",
        color: "Red",
        price: 11175,
      },
      {
        name: "Copper",
        image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Ceiling lamp NOK  13,975  Color -  Copper.webp",
        color: "Copper",
        price: 13975,
      },
    ],
    designer: "Poul Henningsen",
  },
  {
    _id: "ph-3-2-table-lamp",
    name: "PH 3/2 Table Lamp",
    description: "Classic table lamp with three-shade system for optimal light distribution. An iconic piece of Danish lighting design.",
    price: 13905,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  13,905  Color -  High-gloss chrome-plated.jpg",
    href: "/louis-poulsen/ph-3-2-table",
    variants: [
      {
        name: "High-Gloss Chrome",
        image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  13,905  Color -  High-gloss chrome-plated.jpg",
        color: "Chrome",
        price: 13905,
      },
      {
        name: "Black Metallic",
        image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  15,195  Color -  Black metallic.jpg",
        color: "Black",
        price: 15195,
      },
      {
        name: "Brass Metallized",
        image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  15,195  Color -  Brass metallized.webp",
        color: "Brass",
        price: 15195,
      },
    ],
    designer: "Poul Henningsen",
  },
  {
    _id: "ph-3-2-pendant",
    name: "PH 3/2 Pendant",
    description: "Suspended version of the classic PH lamp with three-shade system. Perfect for dining areas and workspaces.",
    price: 10005,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/PH-3:2-Pendant/PH 3:2 Pendant NOK  10,005  Color -  High-gloss chrome-plated.jpg",
    href: "/louis-poulsen/ph-3-2-pendant",
    variants: [
      {
        name: "High-Gloss Chrome",
        image: "/Louis-Poulsen/PH-3:2-Pendant/PH 3:2 Pendant NOK  10,005  Color -  High-gloss chrome-plated.jpg",
        color: "Chrome",
        price: 10005,
      },
      {
        name: "Brass Metallised",
        image: "/Louis-Poulsen/PH-3:2-Pendant/PH 3:2 Pendel kr 10 710  Farge - Messing metallisert.webp",
        color: "Brass",
        price: 10710,
      },
    ],
    designer: "Poul Henningsen",
  },
  {
    _id: "ph-artichoke-copper",
    name: "PH Artichoke Copper",
    description: "The ultimate statement piece in lighting design. This iconic chandelier with its distinctive artichoke-inspired form is a masterpiece of craftsmanship.",
    price: 141300,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg",
    href: "/louis-poulsen/ph-artichoke",
    variants: [
      {
        name: "Copper Ø600",
        image: "/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg",
        color: "Copper",
        price: 141300,
      },
    ],
    designer: "Poul Henningsen",
  },
  {
    _id: "njp-floor-lamp",
    name: "NJP Floor Lamp",
    description: "Modern floor lamp with adjustable head and minimalist design. Perfect for reading and task lighting.",
    price: 8855,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/NJP-Floor-Lamp/NJP Gulvlampe kr 8 855  Farge - White.webp",
    href: "/louis-poulsen/njp-floor",
    variants: [
      {
        name: "White",
        image: "/Louis-Poulsen/NJP-Floor-Lamp/NJP Gulvlampe kr 8 855  Farge - White.webp",
        color: "White",
        price: 8855,
      },
      {
        name: "Light Aluminum Gray",
        image: "/Louis-Poulsen/NJP-Floor-Lamp/NJP Floor Lamp NOK  8,855  Color -  Light aluminum gray.webp",
        color: "Light Aluminum Gray",
        price: 8855,
      },
    ],
    designer: "Nendo",
  },
  {
    _id: "njp-table-lamp",
    name: "NJP Table Lamp",
    description: "Compact table lamp with adjustable head and modern aesthetic. Ideal for desk work and reading.",
    price: 6840,
    category: "Lighting",
    brand: "Louis Poulsen",
    image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Bordlampe kr 6 840  Farge - White.webp",
    href: "/louis-poulsen/njp-table",
    variants: [
      {
        name: "White",
        image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Bordlampe kr 6 840  Farge - White.webp",
        color: "White",
        price: 6840,
      },
      {
        name: "Black",
        image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Table Lamp NOK  6,840  Color -  Black.webp",
        color: "Black",
        price: 6840,
      },
      {
        name: "Light Aluminum Gray",
        image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Table Lamp NOK  6,840  Color -  Light aluminum gray.webp",
        color: "Light Aluminum Gray",
        price: 6840,
      },
    ],
    designer: "Nendo",
  },
];
