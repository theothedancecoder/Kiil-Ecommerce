import { notFound } from "next/navigation";
import ROCollectionProductClient from "./ROCollectionProductClient";

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

export default async function ROProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <ROCollectionProductClient product={product} products={products} />;
}
