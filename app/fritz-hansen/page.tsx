   "use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface FritzHansenProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: {
    name: string;
    image: string;
    color?: string;
    material?: string;
  }[];
  category: 'Seating' | 'Accessories' | 'Tables' | 'Lighting' | 'Outdoor';
}

export default function FritzHansenPage() {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // 5 rows × 4 columns = 20 products per page

  const products: FritzHansenProduct[] = [
    {
      id: 'grand-prix-4130',
      name: 'Grand Prix 4130 Chair',
      description: 'Iconic stackable chair designed by Arne Jacobsen. A timeless piece of Danish design.',
      price: 4890,
      image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png',
      category: 'Seating',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer' },
        { name: 'Walnut', image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer' },
        { name: 'Black Ash', image: '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - Black (195).png', material: 'Coloured Veneer' },
        { name: 'White Ash', image: '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - White (105).png', material: 'Coloured Veneer' }
      ]
    },
    {
      id: 'grand-prix-4130-upholstery',
      name: 'Grand Prix 4130 Upholstered',
      description: 'Upholstered version of the iconic Grand Prix chair with premium fabric options.',
      price: 6890,
      image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png',
      category: 'Seating',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer' },
        { name: 'Walnut', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer' },
        { name: 'Black Ash', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Coloured Veneer : Ash - Black (195).png', material: 'Coloured Veneer' },
        { name: 'Black/Grey Fabric', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png', material: 'Hallingdal 65' },
        { name: 'White/Black Fabric', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : White Black (166)png.png', material: 'Hallingdal 65' }
      ]
    },
    {
      id: 'grand-prix-3130',
      name: 'Grand Prix 3130 Chair',
      description: 'Classic three-legged version of the Grand Prix chair with elegant proportions.',
      price: 5290,
      image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png',
      category: 'Seating',
      variants: [
        { name: 'Oak', image: '/Fritz Hanson  3130/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer' },
        { name: 'Walnut', image: '/Fritz Hanson  3130/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer' },
        { name: 'Deep Clay Ash', image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Deep Clay (145).png', material: 'Coloured Veneer' },
        { name: 'Midnight Blue Ash', image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png', material: 'Coloured Veneer' }
      ]
    },
    {
      id: 'regatta-chair',
      name: 'Regatta Lounge Chair',
      description: 'Contemporary outdoor lounge chair with weather-resistant materials and modern design.',
      price: 12900,
      image: '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg',
      category: 'Seating',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg', material: 'Weather-resistant' }
      ]
    },
    {
      id: 'regatta-stool',
      name: 'Regatta Lounge Stool',
      description: 'Matching stool for the Regatta collection, perfect for outdoor relaxation.',
      price: 8900,
      image: '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg',
      category: 'Seating',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg', material: 'Weather-resistant' }
      ]
    },
    {
      id: 'regatta-table',
      name: 'Regatta Lounge Table Ø 60',
      description: 'Round outdoor table designed to complement the Regatta seating collection.',
      price: 9900,
      image: '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg',
      category: 'Tables',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg', material: 'Weather-resistant' }
      ]
    },
    {
      id: 'regatta-bench',
      name: 'Regatta Lounge Bench',
      description: 'Elegant outdoor bench that completes the Regatta collection with comfortable seating for two.',
      price: 29999,
      image: '/Fritz Hansen/Regatta-Bench/S1508650-Regatta-Lounge-Bench.jpg',
      category: 'Seating',
      variants: [
        { name: 'FSC Teak', image: '/Fritz Hansen/Regatta-Bench/S1508650-Regatta-Lounge-Bench.jpg', material: 'FSC-certified teak' }
      ]
    },
    {
      id: 'fionia-stool',
      name: 'Fionia Stool',
      description: 'Modern take on the old X-chair. Lightweight, foldable stool with triangular construction. Can be used as bedside table or small side table.',
      price: 3799,
      image: '/Fritz Hansen/Fionia/Color -  Untreated oak.png',
      category: 'Seating',
      variants: [
        { name: 'Untreated Oak', image: '/Fritz Hansen/Fionia/Color -  Untreated oak.png', material: 'Untreated oak' },
        { name: 'Untreated Teak', image: '/Fritz Hansen/Fionia/Color -  Untreated teak.png', material: 'Untreated teak' }
      ]
    },
    {
      id: 'swan-chair-leather',
      name: 'Swan Chair in Leather',
      description: 'Iconic Swan chair by Arne Jacobsen in premium leather upholstery. A timeless masterpiece of Danish design.',
      price: 77499,
      image: '/Fritz Hansen/Swan-chair-in-leather/Svanen stol i skinn kr 77 499  Farge - Essential leather : Light Grey.png',
      category: 'Seating',
      variants: [
        { name: 'Essential Light Grey', image: '/Fritz Hansen/Swan-chair-in-leather/Svanen stol i skinn kr 77 499  Farge - Essential leather : Light Grey.png', material: 'Essential leather' },
        { name: 'Essential Walnut', image: '/Fritz Hansen/Swan-chair-in-leather/Svanen stol i skinn kr 77 499  Farge - Essential leather : Walnut.png', material: 'Essential leather' },
        { name: 'Aura Black', image: '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  89,999  Color -  Aura Leather : Black.png', material: 'Aura leather' },
        { name: 'Embrace Concrete Grey', image: '/Fritz Hansen/Swan-chair-in-leather/Swan chair in leather NOK  105,499  Color -  Embrace leather : Concrete Grey.png', material: 'Embrace leather' }
      ]
    },
    {
      id: 'swan-chair-textile',
      name: 'Swan Chair in Textile',
      description: 'Iconic Swan chair by Arne Jacobsen in premium textile upholstery. Classic Danish design with contemporary fabric options.',
      price: 53499,
      image: '/Fritz Hansen/swan-chair-in-textile/The Swan in textile NOK  53,499  Color -  Canvas : Light Sand 0216.png',
      category: 'Seating',
      variants: [
        { name: 'Canvas Light Sand', image: '/Fritz Hansen/swan-chair-in-textile/The Swan in textile NOK  53,499  Color -  Canvas : Light Sand 0216.png', material: 'Canvas textile' },
        { name: 'Fiord Black', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Fiord : Black 981.png', material: 'Fiord textile' },
        { name: 'Hallingdal Classic Red', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Hallingdal 65 : Classic Red 674.png', material: 'Hallingdal 65 textile' },
        { name: 'Hallingdal Light Grey', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Hallingdal 65 : Light Grey 103.png', material: 'Hallingdal 65 textile' },
        { name: 'Sunniva Chocolate/Tan', image: '/Fritz Hansen/swan-chair-in-textile/Svanen i tekstil kr 56 999  Farge - Sunniva 2 : Chocolate:Tan 253.png', material: 'Sunniva 2 textile' }
      ]
    },
    {
      id: 'little-friend',
      name: 'Little Friend™ Table',
      description: 'Compact and versatile side table with clean lines and premium compact laminate surface. Perfect for modern living spaces.',
      price: 16999,
      image: '/Fritz Hansen/little-friend/Little Friend™ kr 16 999  Varianter - KS11 Compact Laminate : White.png',
      category: 'Tables',
      variants: [
        { name: 'White Compact Laminate', image: '/Fritz Hansen/little-friend/Little Friend™ kr 16 999  Varianter - KS11 Compact Laminate : White.png', material: 'KS11 Compact Laminate' },
        { name: 'Black Compact Laminate', image: '/Fritz Hansen/little-friend/Little Friend™ NOK  16,999  Variants -  KS11 Compact Laminate : Black.png', material: 'KS11 Compact Laminate' },
        { name: 'Oak Compact Laminate', image: '/Fritz Hansen/little-friend/Little Friend™ NOK  18,999  Variants -  KS11 Compact Laminate : Oak.png', material: 'KS11 Compact Laminate' },
        { name: 'Walnut Compact Laminate', image: '/Fritz Hansen/little-friend/Little Friend™ kr 18 999  Varianter - KS11 Compact Laminate : Walnut.png', material: 'KS11 Compact Laminate' }
      ]
    },
    {
      id: 'drachmann-chair',
      name: 'Drachmann Chair',
      description: 'Classic outdoor dining chair with clean lines and durable construction. Perfect for outdoor dining and relaxation.',
      price: 9699,
      image: '/Fritz Hansen/Drachmann chair /Drachmann chair NOK  9,699.webp',
      category: 'Seating',
      variants: [
        { name: 'Natural Teak', image: '/Fritz Hansen/Drachmann chair /Drachmann chair NOK  9,699.webp', material: 'FSC-certified teak' }
      ]
    },
    {
      id: 'drachmann-seat-cushion',
      name: 'Seat Cushion for Drachmann Chair',
      description: 'Premium outdoor seat cushion designed specifically for the Drachmann chair. Weather-resistant fabric in multiple colors.',
      price: 2599,
      image: '/Fritz Hansen/Seat-cushion-for-Drachmann-chair /Seat cushion for Drachmann chair NOK  2,599  Color -  Ash.webp',
      category: 'Accessories',
      variants: [
        { name: 'Ash', image: '/Fritz Hansen/Seat-cushion-for-Drachmann-chair /Seat cushion for Drachmann chair NOK  2,599  Color -  Ash.webp', material: 'Weather-resistant fabric' },
        { name: 'Charcoal', image: '/Fritz Hansen/Seat-cushion-for-Drachmann-chair /Seat cushion for Drachmann chair NOK  2,599  Color -  Charcoal.webp', material: 'Weather-resistant fabric' },
        { name: 'Marine', image: '/Fritz Hansen/Seat-cushion-for-Drachmann-chair /Seat cushion for Drachmann chair NOK  2,599  Color -  Marine.webp', material: 'Weather-resistant fabric' },
        { name: 'Papyrus', image: '/Fritz Hansen/Seat-cushion-for-Drachmann-chair /Seat cushion for Drachmann chair NOK  2,599  Color -  Papyrus.jpg', material: 'Weather-resistant fabric' },
        { name: 'Lemon/Sand Stripe', image: '/Fritz Hansen/Seat-cushion-for-Drachmann-chair /Seat cushion for Drachmann chair NOK  2,899  Color -  Lemon:Sand Stripe.webp', material: 'Weather-resistant fabric' },
        { name: 'Light Apricot/Dark Green Stripe', image: '/Fritz Hansen/Seat-cushion-for-Drachmann-chair /Seat cushion for Drachmann chair NOK  2,899  Color -  Light Apricot:Dark Green Stripe.webp', material: 'Weather-resistant fabric' }
      ]
    },
    {
      id: 'norr-magazine-holder',
      name: 'Norr Magazine Holder',
      description: 'Elegant magazine holder with clean Scandinavian design. Perfect for organizing magazines and newspapers in style.',
      price: 3299,
      image: '/Fritz Hansen/Norr Magazine Holder/Norr Magazine Holder kr  3 299.webp',
      category: 'Accessories',
      variants: [
        { name: 'Natural Wood', image: '/Fritz Hansen/Norr Magazine Holder/Norr Magazine Holder kr  3 299.webp', material: 'Solid wood' }
      ]
    },
    {
      id: 'hven-barstool-seat-cushion',
      name: 'Seat Cushion for Hven Bar Stool',
      description: 'Premium aniline leather seat cushion designed specifically for the Hven bar stool. Made to order with 8 weeks delivery time.',
      price: 2499,
      image: '/Fritz Hansen/Seat-cushion-for-Hven-barstool /Seat cushion for Hven barstool from Skagerak NOK  2,499.png',
      category: 'Accessories',
      variants: [
        { name: 'Aniline Leather', image: '/Fritz Hansen/Seat-cushion-for-Hven-barstool /Seat cushion for Hven barstool from Skagerak NOK  2,499.png', material: 'Aniline leather from Sørensen Leather' }
      ]
    },
    {
      id: 'cutter-mini-wardrobe',
      name: 'Cutter Mini Wardrobe',
      description: 'Compact and elegant wardrobe from Skagerak. Perfect for small spaces with clean Scandinavian design and premium wood construction.',
      price: 4199,
      image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  black.webp',
      category: 'Accessories',
      variants: [
        { name: 'Black', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  black.webp', material: 'Painted wood' },
        { name: 'Oak', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Garderobe kr 4 199  Varianter - Eik.jpg', material: 'Solid oak' },
        { name: 'Teak', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  Teak.jpg', material: 'Solid teak' }
      ]
    },
    {
      id: 'drachmann-table-round',
      name: 'Drachmann Table Ø-126',
      description: 'The Drachmann series was designed by Bernt Santesson in 1982, inspired by the beautiful garden of Danish poet and painter Holger Drachmann. This round table is made by Mogens Holmriis in collaboration with Skagerak. Designed by Mogens Holmriis for Skagerak by Fritz Hansen. Made to order with approximately 6 weeks delivery time.',
      price: 24999,
      image: '/Fritz Hansen/Drachmann-table-Ø/Drachmann table Ø-126 NOK  24,999.webp',
      category: 'Outdoor',
      variants: [
        { name: 'Ø-126 cm', image: '/Fritz Hansen/Drachmann-table-Ø/Drachmann table Ø-126 NOK  24,999.webp', material: 'Certified solid teak wood' }
      ]
    },
    {
      id: 'ikebana-vase-large',
      name: 'Ikebana Vase Large',
      description: 'Large ceramic vase inspired by Japanese flower arranging traditions.',
      price: 2699,
      image: '/Fritz Hansen Ikebana vase stor/Ikebana vase stor kr 2 699.00.png',
      category: 'Accessories',
      variants: [
        { name: 'Ceramic', image: '/Fritz Hansen Ikebana vase stor/Ikebana vase stor kr 2 699.00.png', material: 'Ceramic' }
      ]
    },
    {
      id: 'candlestick-single-1',
      name: 'Single Candlestick #1',
      description: 'Elegant single candlestick with minimalist Danish design.',
      price: 999,
      image: '/Fritz Hansen Lysestake singel/Fritz Hansen Lysestake singel %231 kr 999.00.png',
      category: 'Accessories',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen Lysestake singel/Fritz Hansen Lysestake singel %231 kr 999.00.png', material: 'Metal' },
        { name: 'Alternative', image: '/Fritz Hansen Lysestake singel/fritz-hansen-single-candlestick.png', material: 'Metal' }
      ]
    },
    {
      id: 'candlestick-single-2',
      name: 'Single Candlestick #2',
      description: 'Second design of the elegant single candlestick collection.',
      price: 1099,
      image: '/Fritz Hansen Lysestake singel %232 /Fritz Hansen Lysestake singel %232 kr 1 099.00.png',
      category: 'Accessories',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen Lysestake singel %232 /Fritz Hansen Lysestake singel %232 kr 1 099.00.png', material: 'Metal' }
      ]
    },
    {
      id: 'happy-hook',
      name: 'Happy Hook',
      description: 'Colorful wall hooks with playful design and premium finishes.',
      price: 890,
      image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Turquoise.png',
      category: 'Accessories',
      variants: [
        { name: 'Blush', image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Blush.png', material: 'Powder Coated Steel' },
        { name: 'Green Grey', image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Green Grey.png', material: 'Powder Coated Steel' },
        { name: 'Turquoise', image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Turquoise.png', material: 'Powder Coated Steel' },
        { name: 'Polished Brass', image: '/Fritz Hansen/Happy-Hook/Untreated Brass, Polished Brass.png', material: 'Untreated Brass' }
      ]
    },
    {
      id: 'georg-skohorn',
      name: 'Georg Skohorn',
      description: 'Elegant Scandinavian design piece from Skagerak. Crafted with attention to detail and premium materials for modern living spaces.',
      price: 1099,
      image: '/Fritz Hansen/Skagerak Georg Skohorn /Skagerak Georg Skohorn NOK  1,099.webp',
      category: 'Accessories',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Skagerak Georg Skohorn /Skagerak Georg Skohorn NOK  1,099.webp', material: 'Premium materials' }
      ]
    },
    {
      id: 'georg-stool-with-cushion',
      name: 'Georg Stool with Cushion',
      description: 'Simple and beautiful stool designed by Chris Liljenberg Halstrøm for Skagerak. Can also be used around the dining table. Features a soft wool cushion held in place by a braided leather strap. Made to order with approximately 4 weeks delivery time.',
      price: 4699,
      image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg',
      category: 'Seating',
      variants: [
        { name: 'Black Lacquered Oak', image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Black lacquered oak.webp', material: 'Black lacquered oak', color: 'Cushion: Remix Light Grey 123' },
        { name: 'Untreated Oak', image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg', material: 'Untreated oak', color: 'Cushion: Remix Light Grey 123' }
      ]
    },
    {
      id: 'georg-mirror',
      name: 'Georg Mirror',
      description: 'Georg Mirror is designed by Christina Liljenberg Halstrøm for Fritz Hansen. Part of the award-winning Georg series that combines Scandinavian sensuality and Japanese minimalism. Perfect for furnishing the hall and other parts of the home in a functional and stylish way.',
      price: 6699,
      image: '/Fritz Hansen/skagerak-Georg-Speil /Skagerak by Fritz Hansen Skagerak Georg Speil NOK  6,699.jpeg',
      category: 'Accessories',
      variants: [
        { name: 'Oak & Glass', image: '/Fritz Hansen/skagerak-Georg-Speil /Skagerak by Fritz Hansen Skagerak Georg Speil NOK  6,699.jpeg', material: 'Solid oak and glass' }
      ]
    },
    {
      id: 'clam',
      name: 'CLAM™',
      description: 'Contemporary pendant light with elegant design and premium materials. Available in two sizes to suit different spaces and lighting needs.',
      price: 13999,
      image: '/Fritz Hansen/clam™/CLAM™ NOK  13,999  Size -  Ø440.jpg',
      category: 'Lighting',
      variants: [
        { name: 'Ø440', image: '/Fritz Hansen/clam™/CLAM™ NOK  13,999  Size -  Ø440.jpg', material: 'Small size' },
        { name: 'Ø550', image: '/Fritz Hansen/clam™/CLAM™ NOK  13,999  Size -  Ø550.jpg', material: 'Large size' }
      ]
    },
    {
      id: 'clam-portable-lamp',
      name: 'Clam™ Portable Lamp',
      description: 'Inspired by the shape of clams, this portable wireless lamp provides pleasant light with 3-step dimming. Perfect for indoor and outdoor use with IP44 water resistance.',
      price: 2399,
      image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - White.jpg',
      category: 'Lighting',
      variants: [
        { name: 'White', image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - White.jpg', color: 'White' },
        { name: 'Dusk Blue', image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - Dusk blue.jpg', color: 'Dusk blue' },
        { name: 'Nine Grey', image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - Nine grey.jpg', color: 'Nine grey' }
      ]
    },
    {
      id: 'england-bench',
      name: 'England Bench',
      description: 'Modern take on classic English park benches. Solid construction in 100% FSC-certified teak with good seating comfort. Made to order with 6 weeks delivery.',
      price: 21499,
      image: '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png',
      category: 'Outdoor',
      variants: [
        { name: 'L-152', image: '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png', material: '152cm length' },
        { name: 'L-180', image: '/Fritz Hansen/England bench/England bench NOK  23,999  Size -  L-180.png', material: '180cm length' }
      ]
    },
    {
      id: 'skagen-chair',
      name: 'Skagen Chair',
      description: 'The Skagen series draws inspiration from the region\'s natural beauty. Precise craftsmanship and elegant silhouettes blended with FSC-certified teak. Made to order with 6 weeks delivery.',
      price: 7999,
      image: '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg',
      category: 'Outdoor',
      variants: [
        { name: 'FSC-certified Teak', image: '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg', material: 'FSC-certified teak' }
      ]
    },
    {
      id: 'skagen-bench',
      name: 'Skagen Bench',
      description: 'Part of the Skagen series designed by Mogens Holmriis. This elegant outdoor bench draws inspiration from the natural beauty of the Skagen region. Made to order with 6 weeks delivery.',
      price: 14999,
      image: '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg',
      category: 'Outdoor',
      variants: [
        { name: 'L-150', image: '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg', material: 'FSC-certified teak' }
      ]
    },
    {
      id: 'skagen-table',
      name: 'Skagen Table',
      description: 'The Skagen series is designed by Mogens Holmriis and draws inspiration from the region\'s natural beauty. Precise craftsmanship and elegant silhouettes blended with FSC-certified teak. Made to order with 6 weeks delivery.',
      price: 16999,
      image: '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg',
      category: 'Outdoor',
      variants: [
        { name: 'FSC-certified Teak', image: '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg', material: 'FSC-certified teak' }
      ]
    },
    {
      id: 'drachmann-dining-table',
      name: 'Drachmann Dining Table',
      description: 'The Drachmann series was designed by Bernt Santesson in 1982, inspired by the beautiful garden of Danish poet and painter Holger Drachmann. This table is made by Mogens Holmriis in collaboration with Skagerak. Made to order with approximately 6 weeks delivery time.',
      price: 13499,
      image: '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp',
      category: 'Outdoor',
      variants: [
        { name: '86x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp', material: 'Certified solid teak wood' },
        { name: '156x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  20,499  Size -  156x86.webp', material: 'Certified solid teak wood' },
        { name: '190x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  28,499  Size -  190x86.webp', material: 'Certified solid teak wood' }
      ]
    }
  ];

  const filteredProducts = products.filter(product => 
    filterBy === 'all' || product.category === filterBy
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // First, group by variant count to keep similar heights together
    const aVariantCount = a.variants.length;
    const bVariantCount = b.variants.length;
    
    // Group single variants together, then multi-variants together
    if (aVariantCount === 1 && bVariantCount > 1) return -1;
    if (aVariantCount > 1 && bVariantCount === 1) return 1;
    
    // Within the same variant group, sort by the selected criteria
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

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

  // Reset to first page when filters change
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

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 overflow-hidden">
        <Image
          src="/Fritz Hansen/Regatta-Chair/lifestyle/Regatta_Cam01_Main_v06.jpg"
          alt="Fritz Hansen Collection"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif mb-4">
              Fritz Hansen
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto px-4">
              Danish Design Heritage Since 1872
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Fritz Hansen Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover our curated selection of iconic Fritz Hansen furniture and accessories, 
              representing the finest in Danish design and craftsmanship.
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
                <option value="Seating">Seating</option>
                <option value="Tables">Tables</option>
                <option value="Accessories">Accessories</option>
                <option value="Lighting">Lighting</option>
                <option value="Outdoor">Outdoor</option>
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
                href={`/fritz-hansen/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-contain object-center group-hover:scale-105 transition-transform duration-300 ${
                        product.id === 'happy-hook' ? 'p-8' : 'p-4'
                      }`}
                    />
                    <div className="absolute top-3 right-3 bg-stone-100 px-2 py-1 rounded-full text-xs text-stone-600">
                      {product.category}
                    </div>
                  </div>
                  
                  {/* Color Swatches */}
                  {product.variants.length > 1 && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex space-x-1">
                        {product.variants.slice(0, 4).map((variant, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-300"
                            title={variant.name}
                          />
                        ))}
                        {product.variants.length > 4 && (
                          <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-tight text-center">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-stone-900 font-medium">
                        kr {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 space-x-4">
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-stone-300 text-stone-600 hover:border-stone-400 hover:text-stone-800'
                }`}
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
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
                Previous
              </button>

              {/* Page Info */}
              <div className="flex items-center space-x-2">
                <span className="text-stone-600">
                  Page {currentPage} of {totalPages}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500 text-sm">
                  {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} products
                </span>
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-stone-300 text-stone-600 hover:border-stone-400 hover:text-stone-800'
                }`}
              >
                Next
                <svg 
                  className="w-5 h-5 ml-2" 
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
      </section>

      {/* About Fritz Hansen Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Fritz Hansen
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Fritz Hansen has been creating furniture of the highest quality and design for over 150 years. 
              Founded in 1872, the company has become synonymous with iconic Danish design and exceptional craftsmanship.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Working with legendary designers like Arne Jacobsen, Poul Kjærholm, and Jaime Hayon, 
              Fritz Hansen continues to push the boundaries of furniture design while honoring its rich heritage.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  150+ years of Danish design heritage
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Collaborations with world-renowned designers
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Sustainable production methods
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">
                  Timeless designs that last generations
                </span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/Fritz Hansen/Happy-Hook/lifestyle/5704890504116happy-hook-blush-fritz-hansen2.webp"
              alt="Fritz Hansen Design Detail"
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
            Experience Danish Design Excellence
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Discover the perfect piece to elevate your space with Fritz Hansen's 
            timeless furniture and accessories.
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
