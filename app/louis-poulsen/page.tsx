"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface LouisPoulsenProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  variants?: {
    name: string;
    image: string;
    color?: string;
    material?: string;
  }[];
  category?: string;
}

export default function LouisPoulsenPage() {
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const products: LouisPoulsenProduct[] = [
    {
      id: "aj-floor-lamp",
      name: "AJ Floor Lamp",
      description: "Classic floor lamp designed by Arne Jacobsen.",
      price: 13025,
      image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp",
      category: "Lighting",
      variants: [
        {
          name: "Electric Orange",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Electric Orange.webp",
          color: "Electric Orange",
        },
        {
          name: "Dusty Blue",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Dusty Blue.webp",
          color: "Dusty Blue",
        },
        {
          name: "Soft Lemon",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Soft lemon.webp",
          color: "Soft Lemon",
        },
        {
          name: "Black",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Black.webp",
          color: "Black",
        },
        {
          name: "White",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp",
          color: "White",
        },
        {
          name: "Warm Grey",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Grey.webp",
          color: "Warm Grey",
        },
        {
          name: "Warm Sand",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - Warm Sand.webp",
          color: "Warm Sand",
        },
        {
          name: "Stainless Steel Polished",
          image: "/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 15 375  Farge - Stainless Steel Polished.webp",
          color: "Stainless Steel",
        },
      ],
    },
    {
      id: "aj-wall-lamp-with-cord",
      name: "AJ Wall Lamp with Cord",
      description: "Wall-mounted lamp with cord designed by Arne Jacobsen.",
      price: 8995,
      image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Pale petroleum.webp",
      category: "Lighting",
      variants: [
        {
          name: "Pale Petroleum",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Pale petroleum.webp",
          color: "Pale Petroleum",
        },
        {
          name: "Electric Orange",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Electric Orange.webp",
          color: "Electric Orange",
        },
        {
          name: "Dusty Blue",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ vegglampe med ledning kr 8 995  Farge - Dusty Blue.webp",
          color: "Dusty Blue",
        },
        {
          name: "Soft Lemon",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Soft lemon.webp",
          color: "Soft Lemon",
        },
        {
          name: "Black",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Black.webp",
          color: "Black",
        },
        {
          name: "White",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  White.webp",
          color: "White",
        },
        {
          name: "Warm Grey",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Warm Grey.webp",
          color: "Warm Grey",
        },
        {
          name: "Warm Sand",
          image: "/Louis-Poulsen/AJ-wall-lamp-with-cord /AJ wall lamp with cord NOK  8,995  Color -  Warm Sand.webp",
          color: "Warm Sand",
        },
      ],
    },
    {
      id: "njp-floor-lamp",
      name: "NJP Floor Lamp",
      description: "Elegant floor lamp with adjustable arm.",
      price: 8855,
      image: "/Louis-Poulsen/NJP-Floor-Lamp/NJP Floor Lamp NOK  8,855  Color -  Light aluminum gray.webp",
      category: "Lighting",
      variants: [
        {
          name: "Light Aluminum Gray",
          image: "/Louis-Poulsen/NJP-Floor-Lamp/NJP Floor Lamp NOK  8,855  Color -  Light aluminum gray.webp",
          color: "Light Aluminum Gray",
        },
        {
          name: "White",
          image: "/Louis-Poulsen/NJP-Floor-Lamp/NJP Gulvlampe kr 8 855  Farge - White.webp",
          color: "White",
        },
      ],
    },
    {
      id: "njp-table-lamp",
      name: "NJP Table Lamp",
      description: "Adjustable table lamp with elegant design.",
      price: 6840,
      image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Table Lamp NOK  6,840  Color -  Black.webp",
      category: "Lighting",
      variants: [
        {
          name: "Black",
          image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Table Lamp NOK  6,840  Color -  Black.webp",
          color: "Black",
        },
        {
          name: "Light Aluminum Gray",
          image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Table Lamp NOK  6,840  Color -  Light aluminum gray.webp",
          color: "Light Aluminum Gray",
        },
        {
          name: "White",
          image: "/Louis-Poulsen/NJP-Table-Lamp/NJP Bordlampe kr 6 840  Farge - White.webp",
          color: "White",
        },
      ],
    },
    {
      id: "panthella-160-rechargeable-led-table-lamp",
      name: "Panthella 160 Rechargeable LED Table Lamp",
      description: "A rechargeable LED table lamp with iconic design.",
      price: 2295,
      image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque burgundy.webp",
      category: "Lighting",
      variants: [
        {
          name: "Opaque Burgundy",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque burgundy.webp",
          color: "Opaque Burgundy",
        },
        {
          name: "Opaque Moss Green",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque moss green.webp",
          color: "Opaque Moss Green",
        },
        {
          name: "Opaque Coral",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque coral.webp",
          color: "Opaque Coral",
        },
        {
          name: "Opaque Indigo Blue",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque indigo blue.webp",
          color: "Opaque Indigo Blue",
        },
        {
          name: "Opaque Yellow",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque yellow.webp",
          color: "Opaque Yellow",
        },
        {
          name: "Opal White",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal white.webp",
          color: "Opal White",
        },
        {
          name: "Opal Pale Blue",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale blue.webp",
          color: "Opal Pale Blue",
        },
        {
          name: "Opal Pale Rose",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal pale rose.webp",
          color: "Opal Pale Rose",
        },
        {
          name: "Opaque Black",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque black.webp",
          color: "Opaque Black",
        },
        {
          name: "Opaque Orange",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque orange.webp",
          color: "Opaque Orange",
        },
        {
          name: "Opal Beige",
          image: "/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opal beige.webp",
          color: "Opal Beige",
        },
      ],
    },
    {
      id: "panthella-250-table-lamp",
      name: "Panthella 250 Table Lamp",
      description: "Classic table lamp with mushroom-shaped shade.",
      price: 5660,
      image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Coral.webp",
      category: "Lighting",
      variants: [
        {
          name: "Coral",
          image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Coral.webp",
          color: "Coral",
        },
        {
          name: "Pale Blue",
          image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Pale Blue.webp",
          color: "Pale Blue",
        },
        {
          name: "Pale Rose",
          image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Pale Rose.webp",
          color: "Pale Rose",
        },
        {
          name: "Orange",
          image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - Orange.webp",
          color: "Orange",
        },
        {
          name: "White",
          image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 bordlampe kr 5 660  Farge - White.webp",
          color: "White",
        },
        {
          name: "Black",
          image: "/Louis-Poulsen/Panthella-250-table-lamp/Panthella 250 table lamp NOK  5,660  Color -  Black.webp",
          color: "Black",
        },
      ],
    },
    {
      id: "ph-5-ceiling-lamp",
      name: "PH 5 Ceiling Lamp",
      description: "Iconic pendant lamp designed by Poul Henningsen.",
      price: 11175,
      image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Green.webp",
      category: "Lighting",
      variants: [
        {
          name: "Hues of Green",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Green.webp",
          color: "Hues of Green",
        },
        {
          name: "Hues of Red",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Red.webp",
          color: "Hues of Red",
        },
        {
          name: "Monochrome Burgundy",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Burgundy.webp",
          color: "Monochrome Burgundy",
        },
        {
          name: "Monochrome Blue",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Blue.webp",
          color: "Monochrome Blue",
        },
        {
          name: "Hues of Orange",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Orange.webp",
          color: "Hues of Orange",
        },
        {
          name: "White Classic",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Classic.webp",
          color: "White Classic",
        },
        {
          name: "White Modern",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - White Modern.webp",
          color: "White Modern",
        },
        {
          name: "Monochrome White",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome White.webp",
          color: "Monochrome White",
        },
        {
          name: "Monochrome Black",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Monochrome Black.webp",
          color: "Monochrome Black",
        },
        {
          name: "Hues of Blue",
          image: "/Louis-Poulsen/PH-5-Ceiling-lamp/PH 5 Taklampe kr 11 175  Farge - Hues of Blue.webp",
          color: "Hues of Blue",
        },
      ],
    },
    {
      id: "enigma-425-pendant",
      name: "Enigma 425 Pendant",
      description: "Modern pendant lamp with adjustable light distribution.",
      price: 8995,
      image: "/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendant NOK  8,995  Color -  Black Black Brushed aluminum Size -  Ø-42.5.webp",
      category: "Lighting",
      variants: [
        {
          name: "Black Ø42.5",
          image: "/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendant NOK  8,995  Color -  Black Black Brushed aluminum Size -  Ø-42.5.webp",
          color: "Black",
        },
        {
          name: "Brushed Aluminum Ø42.5",
          image: "/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendant NOK  8,995  Color -  Brushed aluminum Black Brushed aluminum Size -  Ø-42.5.webp",
          color: "Brushed Aluminum",
        },
        {
          name: "Black Ø54.5",
          image: "/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendel kr 14 925  Farge - Svart Svart Børstet aluminium Størrelse - Ø-54,5.webp",
          color: "Black",
        },
        {
          name: "Brushed Aluminum Ø54.5",
          image: "/Louis-Poulsen/Enigma-425-Pendant/Enigma 425 Pendel kr 14 925  Farge - Børstet aluminium Svart Børstet aluminium Størrelse - Ø-54,5.webp",
          color: "Brushed Aluminum",
        },
      ],
    },
    {
      id: "aj-wall-lamp-without-cord",
      name: "AJ Wall Lamp without Cord",
      description: "Wall-mounted lamp without cord designed by Arne Jacobsen.",
      price: 8995,
      image: "/Louis-Poulsen/AJ-wall-lamp-without-cord/AJ wall lamp without cord NOK  8,995  Variants -  With switch With switch Without switch Color -  Electric Orange.webp",
      category: "Lighting",
      variants: [
        {
          name: "Electric Orange With Switch",
          image: "/Louis-Poulsen/AJ-wall-lamp-without-cord/AJ wall lamp without cord NOK  8,995  Variants -  With switch With switch Without switch Color -  Electric Orange.webp",
          color: "Electric Orange",
        },
        {
          name: "Black With Switch",
          image: "/Louis-Poulsen/AJ-wall-lamp-without-cord/AJ wall lamp without cord NOK  8,995  Variants -  With switch With switch Without switch Color -  Black.webp",
          color: "Black",
        },
        {
          name: "Dusty Blue With Switch",
          image: "/Louis-Poulsen/AJ-wall-lamp-without-cord/AJ wall lamp without cord NOK  8,995  Variants -  With switch With switch Without switch Color -  Dusty Blue.webp",
          color: "Dusty Blue",
        },
        {
          name: "Pale Petroleum With Switch",
          image: "/Louis-Poulsen/AJ-wall-lamp-without-cord/AJ wall lamp without cord NOK  8,995  Variants -  With switch With switch Without switch Color -  Pale petroleum.webp",
          color: "Pale Petroleum",
        },
        {
          name: "Soft Lemon With Switch",
          image: "/Louis-Poulsen/AJ-wall-lamp-without-cord/AJ wall lamp without cord NOK  8,995  Variants -  With switch With switch Without switch Color -  Soft lemon.webp",
          color: "Soft Lemon",
        },
        {
          name: "Stainless Steel With Switch",
          image: "/Louis-Poulsen/AJ-wall-lamp-without-cord/AJ wall lamp without cord NOK  9,535  Variants -  With switch With switch Without switch Color -  Stainless Steel Polished.webp",
          color: "Stainless Steel",
        },
      ],
    },
    {
      id: "ph-21-table-lamp",
      name: "PH 2/1 Table Lamp",
      description: "Classic table lamp with Poul Henningsen's iconic three-shade system.",
      price: 9585,
      image: "/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  10,815  Color -  Brass metallised.webp",
      category: "Lighting",
      variants: [
        {
          name: "Brass Metallised",
          image: "/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  10,815  Color -  Brass metallised.webp",
          color: "Brass Metallised",
        },
        {
          name: "Black Metallic",
          image: "/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  10,815  Color -  Black metallic.webp",
          color: "Black Metallic",
        },
        {
          name: "High Lustre Chrome",
          image: "/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  9,585  Color -  High lustre chrome plated.webp",
          color: "High Lustre Chrome",
        },
        {
          name: "Aged Brass Yellow Glass",
          image: "/Louis-Poulsen/PH-2:1-table-lamp/PH 2:1 table lamp NOK  20,550  Color -  Aged brass:yellow glass.webp",
          color: "Aged Brass",
        },
      ],
    },
    {
      id: "ph-32-pendant",
      name: "PH 3/2 Pendant",
      description: "Elegant pendant lamp with Poul Henningsen's three-shade design.",
      price: 10005,
      image: "/Louis-Poulsen/PH-3:2-Pendant/PH 3:2 Pendel kr 10 710  Farge - Messing metallisert.webp",
      category: "Lighting",
      variants: [
        {
          name: "Brass Metallised",
          image: "/Louis-Poulsen/PH-3:2-Pendant/PH 3:2 Pendel kr 10 710  Farge - Messing metallisert.webp",
          color: "Brass Metallised",
        },
        {
          name: "High Gloss Chrome",
          image: "/Louis-Poulsen/PH-3:2-Pendant/PH 3:2 Pendant NOK  10,005  Color -  High-gloss chrome-plated.jpg",
          color: "High Gloss Chrome",
        },
      ],
    },
    {
      id: "ph-32-table-lamp",
      name: "PH 3/2 Table Lamp",
      description: "Classic table lamp with sophisticated three-shade system.",
      price: 13905,
      image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  15,195  Color -  Brass metallized.webp",
      category: "Lighting",
      variants: [
        {
          name: "Brass Metallized",
          image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  15,195  Color -  Brass metallized.webp",
          color: "Brass Metallized",
        },
        {
          name: "Black Metallic",
          image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  15,195  Color -  Black metallic.jpg",
          color: "Black Metallic",
        },
        {
          name: "High Gloss Chrome",
          image: "/Louis-Poulsen/PH-3:2-Table-Lamp/PH 3:2 Table Lamp NOK  13,905  Color -  High-gloss chrome-plated.jpg",
          color: "High Gloss Chrome",
        },
      ],
    },
    {
      id: "ph-35-25-floor-lamp",
      name: "PH 3½-2½ Floor Lamp",
      description: "Iconic floor lamp with Poul Henningsen's sophisticated lighting system.",
      price: 21295,
      image: "/Louis-Poulsen/PH-3½-2½-Floor-Lamp/PH 3½-2½ Floor Lamp NOK  23 175  Color -  Brass metallized.jpg",
      category: "Lighting",
      variants: [
        {
          name: "Brass Metallized",
          image: "/Louis-Poulsen/PH-3½-2½-Floor-Lamp/PH 3½-2½ Floor Lamp NOK  23 175  Color -  Brass metallized.jpg",
          color: "Brass Metallized",
        },
        {
          name: "Black Metallic",
          image: "/Louis-Poulsen/PH-3½-2½-Floor-Lamp/PH 3½-2½ Floor Lamp NOK  23 175  Color -  Black metallic.webp",
          color: "Black Metallic",
        },
        {
          name: "High Gloss Chrome",
          image: "/Louis-Poulsen/PH-3½-2½-Floor-Lamp/10872_10872_PH 3½-2½ Floor Lamp NOK  21,295  Color -  High-gloss chrome-platedPH-35-25-Floor-Chrome-01-2-5-90771.webp",
          color: "High Gloss Chrome",
        },
      ],
    },
    {
      id: "ph-35-25-table-lamp",
      name: "PH 3½-2½ Table Lamp",
      description: "Colorful table lamp with classic PH design in vibrant colors.",
      price: 15965,
      image: "/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Table Lamp NOK  15,965  Color -  Green.jpg",
      category: "Lighting",
      variants: [
        {
          name: "Green",
          image: "/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Table Lamp NOK  15,965  Color -  Green.jpg",
          color: "Green",
        },
        {
          name: "Yellow",
          image: "/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Table Lamp NOK  15,965  Color -  yellow.jpg",
          color: "Yellow",
        },
        {
          name: "White",
          image: "/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Bordlampe kr 15 965  Farge - Hvit.jpg",
          color: "White",
        },
        {
          name: "Red",
          image: "/Louis-Poulsen/PH-3½-2½-Table-Lamp/PH 3½-2½ Bordlampe kr 15 965  Farge - Rød.jpg",
          color: "Red",
        },
      ],
    },
    {
      id: "panthella-400-table-lamp",
      name: "Panthella 400 Table Lamp",
      description: "Large table lamp with iconic mushroom-shaped shade.",
      price: 9170,
      image: "/Louis-Poulsen/Panthella-400-Table-Lamp/Panthella 400 Table Lamp NOK  9,170.jpg",
      category: "Lighting",
      variants: [
        {
          name: "White",
          image: "/Louis-Poulsen/Panthella-400-Table-Lamp/Panthella 400 Table Lamp NOK  9,170.jpg",
          color: "White",
        },
      ],
    },
    {
      id: "panthella-floor-lamp",
      name: "Panthella Floor Lamp",
      description: "Elegant floor lamp with the iconic Panthella design.",
      price: 11775,
      image: "/Louis-Poulsen/Panthella-Floor-Lamp/Panthella Floor Lamp NOK  11,775.jpg",
      category: "Lighting",
      variants: [
        {
          name: "White",
          image: "/Louis-Poulsen/Panthella-Floor-Lamp/Panthella Floor Lamp NOK  11,775.jpg",
          color: "White",
        },
      ],
    },
    {
      id: "ph-35-25-glass-table-lamp",
      name: "PH 3½-2½ Glass Table Lamp",
      description: "Sophisticated glass table lamp with PH three-shade system.",
      price: 16480,
      image: "/Louis-Poulsen/PH-3½-2½-Glass-Table-Lamp/PH 3½-2½ Glass Table Lamp NOK  16,480  Color -  High-gloss chrome-plated.jpg",
      category: "Lighting",
      variants: [
        {
          name: "High Gloss Chrome",
          image: "/Louis-Poulsen/PH-3½-2½-Glass-Table-Lamp/PH 3½-2½ Glass Table Lamp NOK  16,480  Color -  High-gloss chrome-plated.jpg",
          color: "High Gloss Chrome",
        },
        {
          name: "Black Metallic",
          image: "/Louis-Poulsen/PH-3½-2½-Glass-Table-Lamp/PH 3½-2½ Glass Table Lamp NOK  17,895  Color -  Black metallic.jpg",
          color: "Black Metallic",
        },
        {
          name: "Brass Metallized",
          image: "/Louis-Poulsen/PH-3½-2½-Glass-Table-Lamp/PH 3½-2½ Glass Table Lamp NOK  17,895  Color -  Brass metallized.jpg",
          color: "Brass Metallized",
        },
      ],
    },
    {
      id: "ph-5-mini-ceiling-lamp",
      name: "PH 5 Mini Ceiling Lamp",
      description: "Compact version of the iconic PH 5 pendant lamp.",
      price: 8995,
      image: "/Louis-Poulsen/PH-5-Mini-Ceiling-lamp /PH 5 Taklampe kr 11 175  Farge - Hues of Green.webp",
      category: "Lighting",
      variants: [
        {
          name: "Hues of Green",
          image: "/Louis-Poulsen/PH-5-Mini-Ceiling-lamp /PH 5 Taklampe kr 11 175  Farge - Hues of Green.webp",
          color: "Hues of Green",
        },
        {
          name: "White Classic",
          image: "/Louis-Poulsen/PH-5-Mini-Ceiling-lamp /PH 5 Taklampe kr 11 175  Farge - White Classic.webp",
          color: "White Classic",
        },
      ],
    },
    {
      id: "ph-55-pendant",
      name: "PH 5/5 Pendant",
      description: "Large pendant lamp with sophisticated light distribution.",
      price: 16050,
      image: "/Louis-Poulsen/PH-5:5-pendant/PH 5:5 pendant NOK  16,050  Color -  Metal black.webp",
      category: "Lighting",
      variants: [
        {
          name: "Metal Black",
          image: "/Louis-Poulsen/PH-5:5-pendant/PH 5:5 pendant NOK  16,050  Color -  Metal black.webp",
          color: "Metal Black",
        },
        {
          name: "Metal Black with Opal Glass",
          image: "/Louis-Poulsen/PH-5:5-pendant/PH 5:5 pendant NOK  17,625  Color -  Metal black:opal glass.webp",
          color: "Metal Black",
        },
      ],
    },
    {
      id: "ph-8-floor-lamp",
      name: "PH 80 Floor Lamp",
      description: "Large floor lamp with elegant PH design and opal glass shade.",
      price: 13975,
      image: "/Louis-Poulsen/PH-8- Floor-Lamp/PH 80 Floor Lamp NOK  13,975  Color -  Opal white:high luster chrome plated.webp",
      category: "Lighting",
      variants: [
        {
          name: "Opal White Chrome",
          image: "/Louis-Poulsen/PH-8- Floor-Lamp/PH 80 Floor Lamp NOK  13,975  Color -  Opal white:high luster chrome plated.webp",
          color: "Opal White",
        },
        {
          name: "Opal White Black",
          image: "/Louis-Poulsen/PH-8- Floor-Lamp/PH 80 Floor Lamp NOK  13,975  Color - Opal white:black.webp",
          color: "Opal White",
        },
        {
          name: "Opal White White",
          image: "/Louis-Poulsen/PH-8- Floor-Lamp/PH 80 Gulvlampe kr 13 975  Farge - Opal white:white.webp",
          color: "Opal White",
        },
      ],
    },
    {
      id: "ph-artichoke-copper",
      name: "PH Artichoke Copper",
      description: "Iconic artichoke pendant lamp in copper finish.",
      price: 141300,
      image: "/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg",
      category: "Lighting",
      variants: [
        {
          name: "Copper Ø600",
          image: "/Louis-Poulsen/PH-Artichoke-Copper/PH Artichoke Copper Ø600 NOK  141,300.jpg",
          color: "Copper",
        },
      ],
    },
    {
      id: "ph-septima",
      name: "PH Septima",
      description: "Large pendant lamp with seven-shade system.",
      price: 122700,
      image: "/Louis-Poulsen/PH-Septima/PH Septima NOK  122,70.jpg",
      category: "Lighting",
      variants: [
        {
          name: "White",
          image: "/Louis-Poulsen/PH-Septima/PH Septima NOK  122,70.jpg",
          color: "White",
        },
      ],
    },
    {
      id: "ph-snowball",
      name: "PH Snowball",
      description: "Spherical pendant lamp with unique light distribution.",
      price: 31025,
      image: "/Louis-Poulsen/PH-Snowball /PH Snowball NOK  31,025.jpg",
      category: "Lighting",
      variants: [
        {
          name: "White",
          image: "/Louis-Poulsen/PH-Snowball /PH Snowball NOK  31,025.jpg",
          color: "White",
        },
      ],
    },
    {
      id: "tomoshi-rechargeable-lamp",
      name: "Tomoshi Rechargeable Lamp",
      description: "Portable rechargeable lamp with modern design.",
      price: 3045,
      image: "/Louis-Poulsen/Tomoshi-rechargeable-lamp/Tomoshi rechargeable lamp NOK  3,045  Color -  White.webp",
      category: "Lighting",
      variants: [
        {
          name: "White",
          image: "/Louis-Poulsen/Tomoshi-rechargeable-lamp/Tomoshi rechargeable lamp NOK  3,045  Color -  White.webp",
          color: "White",
        },
        {
          name: "Dark Brown",
          image: "/Louis-Poulsen/Tomoshi-rechargeable-lamp/Tomoshi rechargeable lamp NOK  3,045  Color -  Dark Brown.webp",
          color: "Dark Brown",
        },
      ],
    },
    {
      id: "vl45-radio-house-rechargeable-lamp",
      name: "VL45 Radio House Rechargeable Lamp",
      description: "Rechargeable lamp inspired by radio house design.",
      price: 5795,
      image: "/Louis-Poulsen/VL45 Radio-House-Rechargeable-Lamp/VL45 Radio House Rechargeable Lamp NOK  5,795.webp",
      category: "Lighting",
      variants: [
        {
          name: "White",
          image: "/Louis-Poulsen/VL45 Radio-House-Rechargeable-Lamp/VL45 Radio House Rechargeable Lamp NOK  5,795.webp",
          color: "White",
        },
      ],
    },
    {
      id: "vl45-radio-housing-pendant",
      name: "VL45 Radio Housing Pendant Ø250",
      description: "Pendant lamp with radio housing inspired design.",
      price: 5640,
      image: "/Louis-Poulsen/VL45 Radio-Housing Pendant-Ø250 /Louis Poulsen VL45 Radio Housing Pendant Ø250 NOK  5640.jpg",
      category: "Lighting",
      variants: [
        {
          name: "White",
          image: "/Louis-Poulsen/VL45 Radio-Housing Pendant-Ø250 /Louis Poulsen VL45 Radio Housing Pendant Ø250 NOK  5640.jpg",
          color: "White",
        },
      ],
    },
    {
      id: "yuh-floor-lamp",
      name: "Yuh Floor Lamp",
      description: "Modern floor lamp with adjustable shade and elegant design.",
      price: 8855,
      image: "/Louis-Poulsen/Yuh-floor-lamp/Yuh floor lamp from Louis Poulsen NOK  8855  Color -  Black.webp",
      category: "Lighting",
      variants: [
        {
          name: "Black",
          image: "/Louis-Poulsen/Yuh-floor-lamp/Yuh floor lamp from Louis Poulsen NOK  8855  Color -  Black.webp",
          color: "Black",
        },
        {
          name: "White",
          image: "/Louis-Poulsen/Yuh-floor-lamp/Yuh floor lamp from Louis Poulsen NOK  8855  Color -  White.webp",
          color: "White",
        },
        {
          name: "Brass Black",
          image: "/Louis-Poulsen/Yuh-floor-lamp/Yuh floor lamp from Louis Poulsen NOK  10550  Color -  Brass:Black.webp",
          color: "Brass",
        },
        {
          name: "Brass White",
          image: "/Louis-Poulsen/Yuh-floor-lamp/Yuh floor lamp from Louis Poulsen NOK  10550  Color -  Brass:White.webp",
          color: "Brass",
        },
      ],
    },
  ];

  const filteredProducts = products.filter(
    (product) => filterBy === "all" || product.category === filterBy
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handleFilterChange = (newFilter: string) => {
    setFilterBy(newFilter);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
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

      {/* Hero Section with Product Banner */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque moss green.webp"
          alt="Louis Poulsen Collection"
          fill
          className="object-cover"
        />

        {/* Sophisticated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-gray-900/20 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-white/95 backdrop-blur-sm px-12 py-6 rounded-lg shadow-lg">
              <h1 className="text-4xl md:text-6xl font-serif text-stone-800 mb-2">
                Louis Poulsen
              </h1>
              <p className="text-stone-600 text-lg">
                Iconic Danish lighting designs combining functionality and aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Louis Poulsen Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover iconic lighting pieces from Louis Poulsen, blending timeless design with modern innovation.
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <select
                value={filterBy}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="all">All Categories</option>
                <option value="Lighting">Lighting</option>
                {/* Add more categories if needed */}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-stone-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/louis-poulsen/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                    {product.category && (
                      <div className="absolute top-3 right-3 bg-stone-100 px-2 py-1 rounded-full text-xs text-stone-600">
                        {product.category}
                      </div>
                    )}
                  </div>

                  {product.variants && product.variants.length > 1 && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex space-x-1">
                        {product.variants.slice(0, 4).map((variant, index) => {
                          const getVariantColor = (variantName: string) => {
                            const colorMap: { [key: string]: string } = {
                              // AJ Floor Lamp colors
                              "Electric Orange": "#FF6600",
                              "Dusty Blue": "#6B8CAE",
                              "Soft Lemon": "#FFFACD",
                              "Black": "#000000",
                              "White": "#FFFFFF",
                              "Warm Grey": "#8B8680",
                              "Warm Sand": "#C2B280",
                              "Stainless Steel": "#C0C0C0",
                              // AJ Wall Lamp colors
                              "Pale Petroleum": "#5F8A8B",
                              // Panthella colors
                              "Opaque Burgundy": "#800020",
                              "Opaque Moss Green": "#8A9A5B",
                              "Opaque Coral": "#FF7F50",
                              "Opaque Indigo Blue": "#4B0082",
                              "Opaque Yellow": "#FFD700",
                              "Opal White": "#FFFFFF",
                              "Opal Pale Blue": "#B0E0E6",
                              "Opal Pale Rose": "#FFB6C1",
                              "Opal Beige": "#F5F5DC",
                              "Opaque Orange": "#FF8C00",
                              "Coral": "#FF7F50",
                              "Pale Blue": "#B0E0E6",
                              "Pale Rose": "#FFB6C1",
                              "Orange": "#FFA500",
                              // PH 5 colors
                              "Hues of Green": "#90EE90",
                              "Hues of Red": "#FF6B6B",
                              "Monochrome Burgundy": "#800020",
                              "Monochrome Blue": "#4169E1",
                              "Hues of Orange": "#FFA500",
                              "White Classic": "#FFFFFF",
                              "White Modern": "#F8F8F8",
                              "Monochrome White": "#FFFFFF",
                              "Monochrome Black": "#000000",
                              "Hues of Blue": "#87CEEB",
                              // NJP colors
                              "Light Aluminum Gray": "#C0C0C0",
                              // Enigma colors
                              "Brushed Aluminum": "#C0C0C0",
                              // PH series colors
                              "Brass Metallised": "#B5A642",
                              "Brass Metallized": "#B5A642",
                              "Black Metallic": "#2C2C2C",
                              "High Lustre Chrome": "#E5E5E5",
                              "High Gloss Chrome": "#E5E5E5",
                              "Aged Brass": "#CD7F32",
                              "Green": "#228B22",
                              "Yellow": "#FFD700",
                              "Red": "#DC143C",
                              // Additional colors for new products
                              "Copper": "#B87333",
                              "Metal Black": "#2C2C2C",
                              "Opal White": "#F8F8FF"
                            };
                            return colorMap[variantName] || "#D1D5DB";
                          };

                          const backgroundColor = getVariantColor(variant.name);

                          return (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor }}
                              title={variant.name}
                            />
                          );
                        })}
                        {product.variants.length > 4 && (
                          <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-900 font-medium">
                        kr {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        {product.variants ? product.variants.length : 1} variant
                        {product.variants && product.variants.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-stone-800 text-white"
                        : "bg-gray-100 text-stone-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-stone-800 text-white hover:bg-stone-700"
                }`}
              >
                Next
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Louis Poulsen Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Louis Poulsen
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Louis Poulsen is a Danish lighting manufacturer known for its iconic and timeless designs. The brand represents Scandinavian lighting design at its best, combining functionality with aesthetic appeal.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              The company collaborates with renowned designers to create lighting solutions that are both functional and beautiful.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Iconic Danish design heritage</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">High-quality craftsmanship</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Timeless and functional lighting solutions</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Collaborations with renowned designers</span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/Louis-Poulsen/Panthella-160-Rechargeable-LED-Table-Lamp/Panthella 160 oppladbar LED Bordlampe kr 2 295  Farge - Opaque moss green.webp"
              alt="Louis Poulsen Design Detail"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-serif mb-6">
            Discover Iconic Lighting Design
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Explore Louis Poulsen's collection of timeless lighting pieces that blend design and functionality.
          </p>
          <Link
            href="/book-consultation"
            className="inline-block bg-white text-stone-800 px-8 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Book a Design Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
