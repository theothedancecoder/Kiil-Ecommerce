import { notFound } from "next/navigation";
import SibastProductClient from "./SibastProductClient";

interface ProductVariant {
  name: string;
  image: string;
  price?: number;
  material?: string;
  size?: string;
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
    id: "no-2-1-dining-table",
    name: "No.2.1 Dining Table",
    description: "The No.2.1 dining table represents the pinnacle of Danish furniture design, combining elegant proportions with exceptional functionality. Available in three configurations - standard table, table with one extension leaf, or table with two extension leaves - this piece adapts to your dining needs. Crafted from premium solid wood with traditional joinery techniques, each table showcases the natural beauty of the wood grain while providing a sturdy foundation for memorable meals.",
    price: 38799,
    category: "Tables",
    variants: [
      { name: 'Table - Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  38,799  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp', material: 'Oiled Oak', price: 38799 },
      { name: 'Table - White Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  38,799  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp', material: 'White Oiled Oak', price: 38799 },
      { name: 'Table - Smoked Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  41,784  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp', material: 'Smoked Oak', price: 41784 },
      { name: 'Table - Walnut', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  59,694  Model -  Table Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp', material: 'Walnut', price: 59694 },
      { name: 'Table w/1 Extension - Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  45,508  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp', material: 'Oiled Oak', price: 45508, size: 'With 1 Extension' },
      { name: 'Table w/1 Extension - White Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  45,508  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp', material: 'White Oiled Oak', price: 45508, size: 'With 1 Extension' },
      { name: 'Table w/1 Extension - Smoked Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  49,239  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp', material: 'Smoked Oak', price: 49239, size: 'With 1 Extension' },
      { name: 'Table w/1 Extension - Walnut', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  70,134  Model -  Table w:1 extension leaf Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp', material: 'Walnut', price: 70134, size: 'With 1 Extension' },
      { name: 'Table w/2 Extensions - Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table kr  52 217  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Oiled oak.webp', material: 'Oiled Oak', price: 52217, size: 'With 2 Extensions' },
      { name: 'Table w/2 Extensions - White Oiled Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table kr  52 217  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  White oiled oak.webp', material: 'White Oiled Oak', price: 52217, size: 'With 2 Extensions' },
      { name: 'Table w/2 Extensions - Smoked Oak', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  56,694  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Smoked oak.webp', material: 'Smoked Oak', price: 56694, size: 'With 2 Extensions' },
      { name: 'Table w/2 Extensions - Walnut', image: '/Sibast-Furniture/No.2.1-dining-table/No.2.1 dining table NOK  80,574  Model -  Table w:2 extension leaves Table Table w:1 extension leaf Table w:2 extension leaves Color -  Walnut.webp', material: 'Walnut', price: 80574, size: 'With 2 Extensions' },
    ],
    designer: "Arne Vodder",
    features: [
      "Available in three configurations: standard, 1 extension, or 2 extensions",
      "Premium solid wood construction with traditional joinery",
      "Elegant proportions perfect for modern dining rooms",
      "Extension leaves store seamlessly within the table",
      "Hand-finished with natural oil for durability",
      "Accommodates 6-10 people depending on configuration",
      "Timeless Danish design that complements any interior",
      "Sustainable wood sourcing from certified forests",
      "Easy-to-use extension mechanism",
      "Available in four premium wood finishes",
    ],
    specifications: [
      { label: "Designer", value: "Arne Vodder" },
      { label: "Manufacturer", value: "Sibast Furniture" },
      { label: "Material", value: "Solid oak or walnut" },
      { label: "Standard Dimensions", value: "L 200cm, W 95cm, H 73cm" },
      { label: "With 1 Extension", value: "L 250cm, W 95cm, H 73cm" },
      { label: "With 2 Extensions", value: "L 300cm, W 95cm, H 73cm" },
      { label: "Seating Capacity", value: "6-10 people" },
      { label: "Finish", value: "Natural oil treatment" },
      { label: "Construction", value: "Traditional mortise and tenon joinery" },
      { label: "Care", value: "Clean with damp cloth, oil treatment annually" },
      { label: "Warranty", value: "10 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/Sibast-Furniture/No.2.1-dining-table/lifestyle/Sibast-No-2-1-dining-table-2-extensions-walnut-in-setting-Sibast-No-8-No-7-dining-chairs-white-oil-oak-grey-aniline-leather-2.webp"
    ],
  },
  {
    id: "no-7-dining-chair",
    name: "No.7 Dining Chair",
    description: "The No.7 dining chair embodies the essence of Danish design philosophy - where form follows function and beauty emerges from simplicity. This iconic chair features an elegantly curved backrest that provides exceptional comfort while maintaining clean, minimalist lines. Available in various wood finishes and upholstery options, each chair is meticulously crafted using traditional techniques passed down through generations of Danish furniture makers.",
    price: 8948,
    category: "Seating",
    variants: [
      { name: 'Black Beech - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  8,948  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Black Beech', price: 8948 },
      { name: 'Oiled Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,440  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Oiled Oak', price: 10440 },
      { name: 'White Oiled Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,440  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'White Oiled Oak', price: 10440 },
      { name: 'Smoked Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 187  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Smoked Oak', price: 11187 },
      { name: 'Black Beech - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp', material: 'Black Beech', price: 10142 },
      { name: 'Black Beech - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline .webp', material: 'Black Beech', price: 10142 },
      { name: 'Black Beech - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair/Sibast Furniture No. 7 dining chair NOK  10,142  Color -  Black beech White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Black Beech', price: 10142 },
      { name: 'Oiled Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp', material: 'Oiled Oak', price: 11634 },
      { name: 'Oiled Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Oiled Oak', price: 11634 },
      { name: 'Oiled Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  11 634  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline Cognac aniline Light grey aniline Aniline black Wool Remix light grey.webp', material: 'Oiled Oak', price: 11634 },
      { name: 'Smoked Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  12 381  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.webp', material: 'Smoked Oak', price: 12381 },
      { name: 'Smoked Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair/No. 7 dining chair kr  12 381  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Smoked Oak', price: 12381 },
    ],
    designer: "Arne Vodder",
    features: [
      "Elegantly curved backrest for exceptional comfort",
      "Available in multiple wood finishes and upholstery options",
      "Traditional Danish craftsmanship with modern comfort",
      "Premium wool and leather upholstery choices",
      "Stackable design for easy storage",
      "Ergonomic seat design for extended dining comfort",
      "Sustainable wood sourcing from certified forests",
      "Hand-finished with natural treatments",
      "Timeless design that complements any dining table",
      "Perfect companion to the No.2.1 dining table",
    ],
    specifications: [
      { label: "Designer", value: "Arne Vodder" },
      { label: "Manufacturer", value: "Sibast Furniture" },
      { label: "Frame Material", value: "Solid oak or beech" },
      { label: "Upholstery", value: "Wool Remix or Aniline leather" },
      { label: "Dimensions", value: "W 49cm, D 52cm, H 78cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "5.2 kg" },
      { label: "Construction", value: "Traditional mortise and tenon joinery" },
      { label: "Finish", value: "Natural oil or lacquer" },
      { label: "Care", value: "Vacuum regularly, professional cleaning recommended" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/Sibast-Furniture/No.7-dining-chair/lifestyle/Sibast-No-7-Dining-Chair-Leather-Cognac-Aniline.webp"
    ],
  },
  {
    id: "no-7-dining-chair-full-upholstery",
    name: "No.7 Dining Chair Full Upholstery",
    description: "The fully upholstered version of our iconic No.7 dining chair offers enhanced comfort without compromising the elegant design principles that define Danish furniture. Every surface is carefully upholstered with premium materials, creating a luxurious seating experience while maintaining the chair's distinctive silhouette. This version is perfect for those who prioritize comfort during long dinner conversations and formal dining occasions.",
    price: 12828,
    category: "Seating",
    variants: [
      { name: 'Oiled Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  12,828  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Oiled Oak', price: 12828 },
      { name: 'Smoked Oak - Wool Remix Light Grey', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  13,575  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Wool Remix light grey.webp', material: 'Smoked Oak', price: 13575 },
      { name: 'Oiled Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg', material: 'Oiled Oak', price: 14022 },
      { name: 'Oiled Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Oiled Oak', price: 14022 },
      { name: 'Oiled Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  Oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp', material: 'Oiled Oak', price: 14022 },
      { name: 'White Oiled Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg', material: 'White Oiled Oak', price: 14022 },
      { name: 'White Oiled Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp', material: 'White Oiled Oak', price: 14022 },
      { name: 'White Oiled Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/Sibast-No-7-dining-chNo. 7 dining chair fully upholstered NOK  14,022  Color -  White oiled oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac anilineair-full-upholstered-oak-white-oil-leather-cognac-aniline-scaled-1-scaled-1.webp', material: 'White Oiled Oak', price: 14022 },
      { name: 'Smoked Oak - Aniline Black', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Aniline black.jpg', material: 'Smoked Oak', price: 14769 },
      { name: 'Smoked Oak - Cognac Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Cognac aniline.webp', material: 'Smoked Oak', price: 14769 },
      { name: 'Smoked Oak - Light Grey Aniline', image: '/Sibast-Furniture/No.7-dining-chair-full-upholstery/No. 7 dining chair fully upholstered NOK  14,769  Color -  Smoked oak White oiled oak Oiled oak Smoked oak Black beech Shine -  Light grey aniline.webp', material: 'Smoked Oak', price: 14769 },
    ],
    designer: "Arne Vodder",
    features: [
      "Fully upholstered for maximum comfort",
      "Premium wool and leather upholstery options",
      "Enhanced padding for extended dining sessions",
      "Maintains the iconic No.7 silhouette",
      "Available in multiple wood and fabric combinations",
      "Professional upholstery craftsmanship",
      "Perfect for formal dining rooms",
      "Ergonomic design for optimal support",
      "Sustainable materials and production methods",
      "Complements both modern and traditional interiors",
    ],
    specifications: [
      { label: "Designer", value: "Arne Vodder" },
      { label: "Manufacturer", value: "Sibast Furniture" },
      { label: "Frame Material", value: "Solid oak or beech" },
      { label: "Upholstery", value: "Full Wool Remix or Aniline leather" },
      { label: "Dimensions", value: "W 49cm, D 52cm, H 78cm" },
      { label: "Seat Height", value: "45cm" },
      { label: "Weight", value: "6.8 kg" },
      { label: "Construction", value: "Traditional joinery with full upholstery" },
      { label: "Padding", value: "High-density foam with down layer" },
      { label: "Care", value: "Professional cleaning recommended" },
      { label: "Warranty", value: "5 years structural warranty" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    lifestyleImages: [
      "/Sibast-Furniture/No.7-dining-chair-full-upholstery/lifestyle/Sibast-No-7-Dining-and-Bar-Full-Upholstered-Styled-1-scaled.jpg.avif"
    ],
  },
];

export default async function SibastProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <SibastProductClient product={product} products={products} />;
}
