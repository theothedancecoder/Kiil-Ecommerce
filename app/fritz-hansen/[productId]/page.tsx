"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
  details?: {
    [key: string]: string;
  };
  lifestyleImages?: {
    src: string;
    alt: string;
  }[];
}

export default function FritzHansenProductPage({ params }: { params: { productId: string } }) {
  const { productId } = params;
  
  const products: FritzHansenProduct[] = [
    {
      id: 'grand-prix-4130',
      name: 'Grand Prix 4130 Chair',
      description: 'Iconic stackable chair designed by Arne Jacobsen in 1957. A timeless piece of Danish design that combines functionality with aesthetic beauty.',
      price: 4890,
      image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png',
      category: 'Seating',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer' },
        { name: 'Walnut', image: '/Fritz Hansen Grand Prix 4130/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer' },
        { name: 'Black Ash', image: '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - Black (195).png', material: 'Coloured Veneer' },
        { name: 'White Ash', image: '/Fritz Hansen Grand Prix 4130/Coloured Veneer : Ash - White (105).png', material: 'Coloured Veneer' }
      ],
      details: {
        'Designer': 'Arne Jacobsen',
        'Year': '1957',
        'Material': 'Molded veneer',
        'Dimensions': 'W: 50 cm, D: 52 cm, H: 77 cm',
        'Seat Height': '44 cm',
        'Weight': '4.2 kg',
        'Stackable': 'Yes, up to 12 chairs',
        'Care': 'Clean with damp cloth'
      }
    },
    {
      id: 'grand-prix-4130-upholstery',
      name: 'Grand Prix 4130 Upholstered',
      description: 'Upholstered version of the iconic Grand Prix chair with premium fabric options for enhanced comfort.',
      price: 6890,
      image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png',
      category: 'Seating',
      variants: [
        { name: 'Oak', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer' },
        { name: 'Walnut', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer' },
        { name: 'Black Ash', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Coloured Veneer : Ash - Black (195).png', material: 'Coloured Veneer' },
        { name: 'Black/Grey Fabric', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : Black:Grey (368).png', material: 'Hallingdal 65' },
        { name: 'White/Black Fabric', image: '/Fritz Hansen Grand Prix 4130 Upholstery/Hallingdal 65 : White Black (166)png.png', material: 'Hallingdal 65' }
      ],
      details: {
        'Designer': 'Arne Jacobsen',
        'Year': '1957',
        'Material': 'Molded veneer with upholstery',
        'Dimensions': 'W: 50 cm, D: 52 cm, H: 77 cm',
        'Seat Height': '44 cm',
        'Weight': '4.8 kg',
        'Upholstery': 'Hallingdal 65 wool fabric',
        'Care': 'Professional cleaning recommended'
      }
    },
    {
      id: 'grand-prix-3130',
      name: 'Grand Prix 3130 Chair',
      description: 'Classic three-legged version of the Grand Prix chair with elegant proportions and timeless appeal.',
      price: 5290,
      image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png',
      category: 'Seating',
      variants: [
        { name: 'Oak', image: '/Fritz Hanson  3130/Clear Lacquered Veneer : Oak.png', material: 'Clear Lacquered Veneer' },
        { name: 'Walnut', image: '/Fritz Hanson  3130/Clear Lacquered Veneer : Walnut.png', material: 'Clear Lacquered Veneer' },
        { name: 'Deep Clay Ash', image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Deep Clay (145).png', material: 'Coloured Veneer' },
        { name: 'Midnight Blue Ash', image: '/Fritz Hanson  3130/Coloured Veneer : Ash - Midnight Blue (895).png', material: 'Coloured Veneer' }
      ],
      details: {
        'Designer': 'Arne Jacobsen',
        'Year': '1957',
        'Material': 'Molded veneer',
        'Dimensions': 'W: 50 cm, D: 52 cm, H: 77 cm',
        'Seat Height': '44 cm',
        'Weight': '3.8 kg',
        'Legs': 'Three-legged design',
        'Care': 'Clean with damp cloth'
      }
    },
    {
      id: 'regatta-chair',
      name: 'Regatta Lounge Chair',
      description: 'Contemporary outdoor lounge chair with weather-resistant materials and modern design for outdoor living.',
      price: 12900,
      image: '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg',
      category: 'Seating',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-Chair/S1508500-Regatta-Lounge-Chair.jpg', material: 'Weather-resistant' }
      ],
      details: {
        'Designer': 'Strand+Hvass',
        'Year': '2020',
        'Material': 'Powder-coated aluminum, weather-resistant fabric',
        'Dimensions': 'W: 75 cm, D: 80 cm, H: 75 cm',
        'Seat Height': '40 cm',
        'Weight': '8.5 kg',
        'Weather Resistance': 'UV and water resistant',
        'Care': 'Clean with mild soap and water'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Regatta-Chair/lifestyle/Regatta_Cam01_Main_v06.jpg',
          alt: 'Regatta Chair in outdoor setting'
        },
        {
          src: '/Fritz Hansen/Regatta-Chair/lifestyle/Regatta-Set.jpg',
          alt: 'Regatta collection set'
        }
      ]
    },
    {
      id: 'regatta-stool',
      name: 'Regatta Lounge Stool',
      description: 'Matching stool for the Regatta collection, perfect for outdoor relaxation and versatile seating.',
      price: 8900,
      image: '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg',
      category: 'Seating',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-stool/S1508700-Regatta-Lounge-Stool.jpg', material: 'Weather-resistant' }
      ],
      details: {
        'Designer': 'Strand+Hvass',
        'Year': '2020',
        'Material': 'Powder-coated aluminum, weather-resistant fabric',
        'Dimensions': 'W: 60 cm, D: 45 cm, H: 40 cm',
        'Weight': '4.2 kg',
        'Weather Resistance': 'UV and water resistant',
        'Care': 'Clean with mild soap and water'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Regatta-stool/lifestyle/Regatta_Cam01_Main_v06.jpg',
          alt: 'Regatta Stool in outdoor setting'
        },
        {
          src: '/Fritz Hansen/Regatta-stool/lifestyle/Regatta-Set.jpg',
          alt: 'Regatta collection set'
        }
      ]
    },
    {
      id: 'regatta-table',
      name: 'Regatta Lounge Table Ø 60',
      description: 'Round outdoor table designed to complement the Regatta seating collection with weather-resistant finish.',
      price: 9900,
      image: '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg',
      category: 'Tables',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen/Regatta-table-Ø-60/S1508600-Regatta-Lounge-Table.jpg', material: 'Weather-resistant' }
      ],
      details: {
        'Designer': 'Strand+Hvass',
        'Year': '2020',
        'Material': 'Powder-coated aluminum',
        'Dimensions': 'Ø: 60 cm, H: 35 cm',
        'Weight': '12 kg',
        'Weather Resistance': 'UV and water resistant',
        'Care': 'Clean with mild soap and water'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Regatta-table-Ø-60/lifestyle/Regatta_Cam01_Main_v06.jpg',
          alt: 'Regatta Table in outdoor setting'
        }
      ]
    },
    {
      id: 'ikebana-vase-large',
      name: 'Ikebana Vase Large',
      description: 'Large ceramic vase inspired by Japanese flower arranging traditions with modern Scandinavian aesthetics.',
      price: 2699,
      image: '/Fritz Hansen Ikebana vase stor/Ikebana vase stor kr 2 699.00.png',
      category: 'Accessories',
      variants: [
        { name: 'Ceramic', image: '/Fritz Hansen Ikebana vase stor/Ikebana vase stor kr 2 699.00.png', material: 'Ceramic' }
      ],
      details: {
        'Designer': 'Jaime Hayon',
        'Year': '2016',
        'Material': 'Glazed ceramic',
        'Dimensions': 'Ø: 25 cm, H: 30 cm',
        'Weight': '2.1 kg',
        'Finish': 'High-gloss glaze',
        'Care': 'Hand wash with mild detergent'
      }
    },
    {
      id: 'candlestick-single-1',
      name: 'Single Candlestick #1',
      description: 'Elegant single candlestick with minimalist Danish design, perfect for creating ambient lighting.',
      price: 999,
      image: '/Fritz Hansen Lysestake singel/Fritz Hansen Lysestake singel %231 kr 999.00.png',
      category: 'Accessories',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen Lysestake singel/Fritz Hansen Lysestake singel %231 kr 999.00.png', material: 'Metal' },
        { name: 'Alternative', image: '/Fritz Hansen Lysestake singel/fritz-hansen-single-candlestick.png', material: 'Metal' }
      ],
      details: {
        'Material': 'Brushed stainless steel',
        'Dimensions': 'Ø: 8 cm, H: 12 cm',
        'Weight': '0.3 kg',
        'Candle Size': 'Standard dinner candle',
        'Finish': 'Brushed steel',
        'Care': 'Clean with soft cloth'
      }
    },
    {
      id: 'candlestick-single-2',
      name: 'Single Candlestick #2',
      description: 'Second design of the elegant single candlestick collection with refined proportions.',
      price: 1099,
      image: '/Fritz Hansen Lysestake singel %232 /Fritz Hansen Lysestake singel %232 kr 1 099.00.png',
      category: 'Accessories',
      variants: [
        { name: 'Standard', image: '/Fritz Hansen Lysestake singel %232 /Fritz Hansen Lysestake singel %232 kr 1 099.00.png', material: 'Metal' }
      ],
      details: {
        'Material': 'Brushed stainless steel',
        'Dimensions': 'Ø: 9 cm, H: 15 cm',
        'Weight': '0.4 kg',
        'Candle Size': 'Standard dinner candle',
        'Finish': 'Brushed steel',
        'Care': 'Clean with soft cloth'
      }
    },
    {
      id: 'happy-hook',
      name: 'Happy Hook',
      description: 'Colorful wall hooks with playful design and premium finishes, perfect for modern interiors.',
      price: 890,
      image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Turquoise.png',
      category: 'Accessories',
      variants: [
        { name: 'Blush', image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Blush.png', material: 'Powder Coated Steel' },
        { name: 'Green Grey', image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Green Grey.png', material: 'Powder Coated Steel' },
        { name: 'Turquoise', image: '/Fritz Hansen/Happy-Hook/Powder Coated Steel, Turquoise.png', material: 'Powder Coated Steel' },
        { name: 'Polished Brass', image: '/Fritz Hansen/Happy-Hook/Untreated Brass, Polished Brass.png', material: 'Untreated Brass' }
      ],
      details: {
        'Designer': 'Jaime Hayon',
        'Year': '2018',
        'Material': 'Powder-coated steel or brass',
        'Dimensions': 'W: 6 cm, D: 6 cm, H: 8 cm',
        'Weight': '0.2 kg',
        'Mounting': 'Wall-mounted with screws',
        'Care': 'Clean with soft cloth'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Happy-Hook/lifestyle/5704890504116happy-hook-blush-fritz-hansen2.webp',
          alt: 'Happy Hook in interior setting'
        },
        {
          src: '/Fritz Hansen/Happy-Hook/lifestyle/5704890504116happy-hook-blush-fritz-hansen3.webp',
          alt: 'Happy Hook detail view'
        }
      ]
    },
    {
      id: 'drachmann-table-round',
      name: 'Drachmann Table Ø-126',
      description: 'The Drachmann series was designed by Bernt Santesson in 1982, inspired by the beautiful garden of Danish poet and painter Holger Drachmann. This round table is made by Mogens Holmriis in collaboration with Skagerak. Designed by Mogens Holmriis for Skagerak by Fritz Hansen. This is a made to order item with expected delivery time of approximately 6 weeks.',
      price: 24999,
      image: '/Fritz Hansen/Drachmann-table-Ø/Drachmann table Ø-126 NOK  24,999.webp',
      category: 'Outdoor',
      variants: [
        { name: 'Ø-126 cm', image: '/Fritz Hansen/Drachmann-table-Ø/Drachmann table Ø-126 NOK  24,999.webp', material: 'Certified solid teak wood' }
      ],
      details: {
        'Designer': 'Bernt Santesson (1982)',
        'Made by': 'Mogens Holmriis in collaboration with Skagerak',
        'Brand': 'Skagerak by Fritz Hansen',
        'Collection': 'Drachmann Series',
        'Design Inspiration': 'Beautiful garden of Danish poet and painter Holger Drachmann',
        'Type': 'Round Outdoor Dining Table',
        'Material': 'Certified solid teak wood',
        'Diameter': 'Ø-126 cm',
        'Height': '72 cm',
        'Weight': '45 kg',
        'Dimensions': '126 × 126 × 10 cm',
        'Shape': 'Round',
        'Construction': 'Durable outdoor construction',
        'Style': 'Classic Scandinavian design from 1982',
        'Usage': 'Outdoor dining, patio, garden entertaining',
        'Weather Resistance': 'Yes, designed for outdoor use',
        'Wood Characteristics': 'Develops beautiful silver patina over time',
        'Delivery Time': 'Made to order - approximately 6 weeks',
        'Care': 'Clean with mild soap and water, regular teak maintenance recommended'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Drachmann-table-Ø/lifestyle/11000018_2.webp',
          alt: 'Drachmann Round Table in outdoor lifestyle setting'
        },
        {
          src: '/Fritz Hansen/Drachmann-table-Ø/lifestyle/11000018_3.webp',
          alt: 'Drachmann Round Table in garden environment'
        }
      ]
    },
    {
      id: 'cutter-mini-wardrobe',
      name: 'Cutter Mini Wardrobe',
      description: 'Compact and elegant wardrobe from Skagerak. Perfect for small spaces with clean Scandinavian design and premium wood construction. Made to order with approximately 4 weeks delivery time.',
      price: 4199,
      image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  black.webp',
      category: 'Accessories',
      variants: [
        { name: 'Black', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  black.webp', material: 'Painted wood' },
        { name: 'Oak', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Garderobe kr 4 199  Varianter - Eik.jpg', material: 'Solid oak' },
        { name: 'Teak', image: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/Skagerak Cutter mini Wardrobe kr  4 199  Variants -  Teak.jpg', material: 'Solid teak' }
      ],
      details: {
        'Designer': 'Niels Hvass',
        'Collection': 'Cutter',
        'Brand': 'Skagerak by Fritz Hansen',
        'Material': 'Teak, oak, or painted wood with stainless steel',
        'Dimensions': 'W: 31 cm, D: 30 cm, H: 18.5 cm',
        'Package Dimensions': '35 × 36 × 20 cm',
        'Weight': '2.5 kg',
        'Finish': 'Natural wood or painted',
        'Hardware': 'Stainless steel components',
        'Delivery Time': 'Approximately 4 weeks (made to order)',
        'Care': 'Clean with damp cloth, oil wood variants regularly'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/lifestyle/cutter_minigarderobe_sort_03_a-scaled.jpeg.avif',
          alt: 'Cutter Mini Wardrobe in modern interior setting'
        },
        {
          src: '/Fritz Hansen/Skagerak-Cutter-mini-Wardrobe/lifestyle/cutter_minigarderobe_sort_13_a-scaled.jpeg.avif',
          alt: 'Cutter Mini Wardrobe detail and styling'
        }
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
      ],
      details: {
        'Brand': 'Skagerak by Fritz Hansen',
        'Material': 'Premium Scandinavian materials',
        'Price': 'NOK 1,099',
        'Design': 'Clean Scandinavian aesthetics',
        'Quality': 'Premium craftsmanship',
        'Care': 'Clean with soft cloth'
      }
    },
    {
      id: 'georg-stool-with-cushion',
      name: 'Georg Stool with Cushion',
      description: 'This simple and beautiful stool Georg is designed by Chris Liljenberg Halstrøm for Skagerak. It can also be used around the dining table. The chair has a soft wool cushion that ensures good seating comfort, the cushion is held in place by a braided leather strap. The round wooden legs characterize the Georg series from Skagerak, where Nordic and Japanese design meet. Made to order with approximately 4 weeks delivery time.',
      price: 4699,
      image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg',
      category: 'Seating',
      variants: [
        { name: 'Black Lacquered Oak', image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Black lacquered oak.webp', material: 'Black lacquered oak', color: 'Cushion: Remix Light Grey 123' },
        { name: 'Untreated Oak', image: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpg', material: 'Untreated oak', color: 'Cushion: Remix Light Grey 123' }
      ],
      details: {
        'Designer': 'Christina Liljenberg Halstrøm',
        'Brand': 'Skagerak by Fritz Hansen',
        'Material': 'Solid oak with soft wool cushion',
        'Dimensions': 'W: 45 cm, D: 32 cm, H: 45 cm',
        'Weight': '5 kg',
        'Package Dimensions': '36 × 40 × 50 cm',
        'Cushion': 'Soft wool cushion with braided leather strap',
        'Design Style': 'Nordic and Japanese design fusion',
        'Delivery Time': 'Made to order - approximately 4 weeks',
        'Variants': 'Black lacquered oak, Untreated oak',
        'Care': 'Clean wood with soft cloth, professional cleaning for cushion'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/lifestyle/georg_s1930301_m_ee23-scaled.webp',
          alt: 'Georg Stool with Cushion in interior setting'
        },
        {
          src: '/Fritz Hansen/Skagerak-Georg-Stool-with-cushion/lifestyle/Skagerak Georg Stool with cushion NOK  4,699  Variants -  Untreated oak.jpeg',
          alt: 'Georg Stool with Cushion detail view'
        }
      ]
    },
    {
      id: 'georg-mirror',
      name: 'Georg Mirror',
      description: 'Georg Mirror is designed by Christina Liljenberg Halstrøm for Fritz Hansen. The mirror is part of the Georg series, which makes it possible to furnish the hall and other parts of the home in a functional and at the same time stylish way. The series includes coat hangers, coat racks, stool, bench, console table, desk, dining table, bar stools and two mirrors. All in solid oak and some with details in natural materials such as wool and leather. The furniture series has been awarded several international design awards since its launch in 2012. The series expression is a mixture of Scandinavian sensuality and Japanese minimalism.',
      price: 6699,
      image: '/Fritz Hansen/skagerak-Georg-Speil /Skagerak by Fritz Hansen Skagerak Georg Speil NOK  6,699.jpeg',
      category: 'Accessories',
      variants: [
        { name: 'Oak & Glass', image: '/Fritz Hansen/skagerak-Georg-Speil /Skagerak by Fritz Hansen Skagerak Georg Speil NOK  6,699.jpeg', material: 'Solid oak and glass' }
      ],
      details: {
        'Designer': 'Christina Liljenberg Halstrøm',
        'Brand': 'Fritz Hansen',
        'Collection': 'Georg Series',
        'Material': 'Oak, Glass',
        'Dimensions': 'W: 55.5 cm, H: 190 cm, D: 3 cm',
        'Awards': 'Several international design awards since 2012',
        'Design Style': 'Scandinavian sensuality and Japanese minimalism',
        'Series': 'Part of complete Georg collection including coat hangers, stools, tables',
        'Finish': 'Solid oak with premium glass',
        'Care': 'Clean glass with appropriate cleaner, dust oak frame with soft cloth'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/skagerak-Georg-Speil /lifestyle/38109_image_2.jpeg',
          alt: 'Georg Mirror in interior setting'
        }
      ]
    },
    {
      id: 'clam',
      name: 'CLAM™',
      description: 'CLAM™ is a contemporary pendant light that combines elegant design with premium materials and exceptional craftsmanship. This sophisticated lighting solution is perfect for creating ambient lighting in dining areas, living spaces, and modern interiors. Available in two sizes to accommodate different room dimensions and lighting requirements.',
      price: 13999,
      image: '/Fritz Hansen/clam™/CLAM™ NOK  13,999  Size -  Ø440.jpg',
      category: 'Lighting',
      variants: [
        { name: 'Ø440', image: '/Fritz Hansen/clam™/CLAM™ NOK  13,999  Size -  Ø440.jpg', material: 'Small size pendant' },
        { name: 'Ø550', image: '/Fritz Hansen/clam™/CLAM™ NOK  13,999  Size -  Ø550.jpg', material: 'Large size pendant' }
      ],
      details: {
        'Designer': 'Fritz Hansen Design Team',
        'Brand': 'Fritz Hansen',
        'Type': 'Pendant Light',
        'Material': 'Opal glass & brass',
        'Sizes Available': 'Ø440mm and Ø550mm',
        'Diameter': 'Ø440: 44cm, Ø550: 55cm',
        'Height': 'Ø440: 52.2cm, Ø550: 54cm',
        'Weight': 'Ø440: 6.5kg, Ø550: 9kg',
        'Mounting': 'Suspension with cable 2×0.75mm²',
        'Canopy': 'Yes, included',
        'Cable Length': '3 meters',
        'Price': 'NOK 13,999 (both sizes)',
        'Installation': 'Ceiling mounted pendant',
        'Style': 'Contemporary Scandinavian design',
        'Application': 'Dining rooms, living spaces, modern interiors',
        'Care': 'Clean glass with appropriate cleaner, dust brass components with soft cloth'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/clam™/lifestyle/FH_Clam_pendant_large_Egg_lounge_chair_PK65_table_RGB-scaled.jpg.avif',
          alt: 'CLAM™ pendant light in elegant dining setting with Egg lounge chair'
        },
        {
          src: '/Fritz Hansen/clam™/lifestyle/FH_Clam_pendant_small_Grand_prix_3130_chair_Essay_table_RGB.jpg',
          alt: 'CLAM™ pendant light with Grand Prix chair and Essay table'
        }
      ]
    },
    {
      id: 'clam-portable-lamp',
      name: 'Clam™ Portable Lamp',
      description: 'Clam™ Portable Lamp is inspired by the shape of clams and provides a pleasant light with 3-step dimming. This wireless rechargeable lamp brings elegant lighting anywhere in your home or garden. Designed by Ahm & Lund for Fritz Hansen, it features painted polycarbonate construction with IP44 water resistance, making it perfect for both indoor and outdoor use. The built-in 1.5W LED and rechargeable battery provide hours of ambient lighting, ideal for outdoor dining, reading nooks, or creating atmosphere in any space.',
      price: 2399,
      image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - White.jpg',
      category: 'Lighting',
      variants: [
        { name: 'White', image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - White.jpg', color: 'White', material: 'Portable wireless lamp' },
        { name: 'Dusk Blue', image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - Dusk blue.jpg', color: 'Dusk blue', material: 'Portable wireless lamp' },
        { name: 'Nine Grey', image: '/Fritz Hansen/Clam™-Portable-Lamp/Clam™ Portable Lamp kr 2 399  Farge - Nine grey.jpg', color: 'Nine grey', material: 'Portable wireless lamp' }
      ],
      details: {
        'Designer': 'Ahm & Lund',
        'Brand': 'Fritz Hansen',
        'Type': 'Portable Wireless Lamp',
        'Material': 'Painted polycarbonate',
        'Colors Available': 'White, Dusk Blue, Nine Grey',
        'Dimensions': 'H: 31cm, Ø: 17cm',
        'Package Dimensions': '20 × 20 × 32 cm',
        'Weight': '0.5 kg',
        'Price': 'kr 2,399 (all colors)',
        'Power Source': 'Rechargeable battery',
        'LED': '1.5W built-in LED',
        'Dimmer': '3-step dimmer',
        'Charging': 'USB-C cable included',
        'Water Resistance': 'IP44 rated',
        'Usage': 'Indoor and outdoor use',
        'Design Inspiration': 'Inspired by the shape of clams',
        'Style': 'Contemporary Scandinavian design',
        'Care': 'Clean with soft cloth, avoid harsh chemicals'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Clam™-Portable-Lamp/lifestyle/903013384_M3.jpg',
          alt: 'Clam™ Portable Lamp in elegant interior setting'
        },
        {
          src: '/Fritz Hansen/Clam™-Portable-Lamp/lifestyle/903013384_M4.jpg',
          alt: 'Clam™ Portable Lamp creating ambient lighting'
        }
      ]
    },
    {
      id: 'england-bench',
      name: 'England Bench',
      description: 'England Bench is a modern take on the classic wooden bench found in parks and gardens across England. This premium outdoor bench combines elegant design with exceptional functionality, featuring good seating comfort and solid construction in 100% FSC-certified teak. Made to order by Skagerak by Fritz Hansen with approximately 6 weeks delivery time. Available in two sizes to accommodate different spaces and seating requirements.',
      price: 21499,
      image: '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png',
      category: 'Outdoor',
      variants: [
        { name: 'L-152', image: '/Fritz Hansen/England bench/England bench NOK  21,499  Size -  L-152.png', material: '152cm length' },
        { name: 'L-180', image: '/Fritz Hansen/England bench/England bench NOK  23,999  Size -  L-180.png', material: '180cm length' }
      ],
      details: {
        'Brand': 'Skagerak by Fritz Hansen',
        'Type': 'Outdoor Bench',
        'Material': '100% FSC-certified teak',
        'Design Inspiration': 'Modern take on classic English park benches',
        'Sizes Available': 'L-152 (152cm) and L-180 (180cm)',
        'L-152 Price': 'NOK 21,499',
        'L-180 Price': 'NOK 23,999',
        'L-152 Dimensions': 'L: 152cm, D: 63cm, H: 89cm',
        'L-180 Dimensions': 'L: 180cm, D: 63cm, H: 89cm',
        'Seat Height': '44 cm',
        'Weight': '44 kg',
        'Package Dimensions': '180 × 63 × 89 cm',
        'Construction': 'Solid construction with good seating comfort',
        'Certification': 'FSC-certified teak',
        'Delivery Time': 'Made to order - approximately 6 weeks',
        'Usage': 'Outdoor seating, parks, gardens, patios',
        'Weather Resistance': 'Yes, designed for outdoor use',
        'Style': 'Modern Scandinavian design',
        'Care': 'Clean with mild soap and water, regular teak maintenance recommended'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/England bench/lifestyle/England-Bench152_01.jpg',
          alt: 'England Bench L-152 in outdoor setting'
        },
        {
          src: '/Fritz Hansen/England bench/lifestyle/England-Bench180_02.jpg',
          alt: 'England Bench L-180 in garden setting'
        }
      ]
    },
    {
      id: 'skagen-chair',
      name: 'Skagen Chair',
      description: 'The Skagen series is designed by Mogens Holmriis and draws inspiration from the region\'s natural beauty. Precise craftsmanship and elegant silhouettes are blended with FSC-certified teak, a solid wood that develops a beautiful silver patina over time. This premium outdoor chair combines exceptional functionality with weather-resistant construction, making it perfect for outdoor dining, patios, and garden settings. Made to order with approximately 6 weeks delivery time.',
      price: 7999,
      image: '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg',
      category: 'Outdoor',
      variants: [
        { name: 'FSC-certified Teak', image: '/Fritz Hansen/Skagen-chair/Skagen chair NOK  7,999.jpg', material: 'FSC-certified teak' }
      ],
      details: {
        'Designer': 'Mogens Holmriis',
        'Brand': 'Skagerak by Fritz Hansen',
        'Collection': 'Skagen Series',
        'Type': 'Outdoor Chair',
        'Material': 'FSC-certified teak',
        'Design Inspiration': 'Natural beauty of the Skagen region',
        'Price': 'NOK 7,999',
        'Dimensions': 'W: 58cm, D: 59cm, H: 88cm',
        'Seat Height': '44 cm',
        'Weight': '12.3 kg',
        'Package Dimensions': '60 × 60 × 90 cm',
        'Wood Characteristics': 'Develops beautiful silver patina over time',
        'Certification': 'FSC-certified teak',
        'Delivery Time': 'Made to order - approximately 6 weeks',
        'Construction': 'Precise craftsmanship with elegant silhouettes',
        'Style': 'Contemporary Scandinavian design',
        'Usage': 'Outdoor dining, patio, garden seating',
        'Weather Resistance': 'Yes, designed for outdoor use',
        'Care': 'Clean with mild soap and water, regular teak maintenance recommended'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Skagen-chair/lifestyle/Skagen_Chair1.jpg',
          alt: 'Skagen Chair in outdoor setting'
        },
        {
          src: '/Fritz Hansen/Skagen-chair/lifestyle/Skagen_set_011.jpg',
          alt: 'Skagen Chair in garden dining set'
        }
      ]
    },
    {
      id: 'skagen-bench',
      name: 'Skagen Bench',
      description: 'Part of the Skagen series designed by Mogens Holmriis, this elegant outdoor bench draws inspiration from the natural beauty of the Skagen region. Precise craftsmanship and elegant silhouettes are blended with FSC-certified teak, a solid wood that develops a beautiful silver patina over time. This premium outdoor bench combines exceptional functionality with weather-resistant construction, making it perfect for outdoor dining, patios, and garden settings. Made to order with approximately 6 weeks delivery time.',
      price: 14999,
      image: '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg',
      category: 'Outdoor',
      variants: [
        { name: 'L-150', image: '/Fritz Hansen/Skagen-bench/Skagen bench L-150 NOK  14,999.jpg', material: 'FSC-certified teak' }
      ],
      details: {
        'Designer': 'Mogens Holmriis',
        'Brand': 'Skagerak by Fritz Hansen',
        'Collection': 'Skagen Series',
        'Type': 'Outdoor Bench',
        'Material': 'FSC-certified teak',
        'Design Inspiration': 'Natural beauty of the Skagen region',
        'Price': 'NOK 14,999',
        'Length': 'L-150 (150cm)',
        'Wood Characteristics': 'Develops beautiful silver patina over time',
        'Certification': 'FSC-certified teak',
        'Delivery Time': 'Made to order - approximately 6 weeks',
        'Construction': 'Precise craftsmanship with elegant silhouettes',
        'Style': 'Contemporary Scandinavian design',
        'Usage': 'Outdoor dining, patio, garden seating',
        'Weather Resistance': 'Yes, designed for outdoor use',
        'Seating Capacity': 'Comfortable seating for multiple people',
        'Care': 'Clean with mild soap and water, regular teak maintenance recommended'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Skagen-bench/lifestyle/FH_Skagen_Bench_Table_Chair_Cushion_Papyrus_Barriere_Light_Apricot-Dark_Green_Stripe_Catania1.jpg',
          alt: 'Skagen Bench with table and chair in outdoor setting'
        },
        {
          src: '/Fritz Hansen/Skagen-bench/lifestyle/Skagen_set_011.jpg',
          alt: 'Skagen Bench in complete outdoor dining set'
        }
      ]
    },
    {
      id: 'skagen-table',
      name: 'Skagen Table',
      description: 'The Skagen series is designed by Mogens Holmriis and draws inspiration from the region\'s natural beauty. Precise craftsmanship and elegant silhouettes are blended with FSC-certified teak, a solid wood that develops a beautiful silver patina over time. This premium outdoor table combines exceptional functionality with weather-resistant construction, making it perfect for outdoor dining, patios, and garden settings. Made to order with approximately 6 weeks delivery time.',
      price: 16999,
      image: '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg',
      category: 'Outdoor',
      variants: [
        { name: 'FSC-certified Teak', image: '/Fritz Hansen/Skagen-table /Skagen table 140×78 NOK  16,999.jpg', material: 'FSC-certified teak' }
      ],
      details: {
        'Designer': 'Mogens Holmriis',
        'Brand': 'Skagerak by Fritz Hansen',
        'Collection': 'Skagen Series',
        'Type': 'Outdoor Table',
        'Material': 'FSC-certified teak',
        'Design Inspiration': 'Natural beauty of the Skagen region',
        'Price': 'NOK 16,999',
        'Dimensions': 'W: 140cm, D: 78cm, H: 73cm',
        'Weight': '24 kg',
        'Package Dimensions': '140 × 80 × 10 cm',
        'Wood Characteristics': 'Develops beautiful silver patina over time',
        'Certification': 'FSC-certified teak',
        'Delivery Time': 'Made to order - approximately 6 weeks',
        'Construction': 'Precise craftsmanship with elegant silhouettes',
        'Style': 'Contemporary Scandinavian design',
        'Usage': 'Outdoor dining, patio, garden dining',
        'Weather Resistance': 'Yes, designed for outdoor use',
        'Table Surface': 'Spacious dining surface for outdoor entertaining',
        'Care': 'Clean with mild soap and water, regular teak maintenance recommended'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Skagen-bench/lifestyle/FH_Skagen_Bench_Table_Chair_Cushion_Papyrus_Barriere_Light_Apricot-Dark_Green_Stripe_Catania1.jpg',
          alt: 'Skagen Table with bench and chair in outdoor setting'
        },
        {
          src: '/Fritz Hansen/Skagen-bench/lifestyle/Skagen_set_011.jpg',
          alt: 'Skagen Table in complete outdoor dining set'
        }
      ]
    },
    {
      id: 'drachmann-dining-table',
      name: 'Drachmann Dining Table',
      description: 'The Drachmann series was designed by Bernt Santesson in 1982, inspired by the beautiful garden of Danish poet and painter Holger Drachmann. This table is made by Mogens Holmriis in collaboration with Skagerak. This premium outdoor table combines exceptional functionality with weather-resistant construction, making it ideal for patios, gardens, and outdoor dining areas. Available in three convenient sizes to accommodate different spaces and seating requirements. Made to order with approximately 6 weeks delivery time.',
      price: 13499,
      image: '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp',
      category: 'Outdoor',
      variants: [
        { name: '86x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann spisebord kr 13 499  Størrelse - 86x86.webp', material: 'Certified solid teak wood' },
        { name: '156x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  20,499  Size -  156x86.webp', material: 'Certified solid teak wood' },
        { name: '190x86 cm', image: '/Fritz Hansen/Drachmann-dining-table/Drachmann dining table NOK  28,499  Size -  190x86.webp', material: 'Certified solid teak wood' }
      ],
      details: {
        'Designer': 'Bernt Santesson (1982)',
        'Made by': 'Mogens Holmriis in collaboration with Skagerak',
        'Brand': 'Skagerak by Fritz Hansen',
        'Collection': 'Drachmann Series',
        'Design Inspiration': 'Beautiful garden of Danish poet and painter Holger Drachmann',
        'Type': 'Outdoor Dining Table',
        'Material': 'Certified solid teak wood',
        'Weight': '19 kg',
        'Package Dimensions': '86 × 86 × 10 cm',
        'Size Options': 'Three sizes available',
        'Small (86x86)': 'L: 86cm, W: 86cm, H: 72cm - kr 13,499',
        'Medium (156x86)': 'L: 156cm, W: 86cm, H: 72cm - NOK 20,499',
        'Large (190x86)': 'L: 190cm, W: 86cm, H: 72cm - NOK 28,499',
        'Construction': 'Durable outdoor construction',
        'Style': 'Classic Scandinavian design from 1982',
        'Usage': 'Outdoor dining, patio, garden entertaining',
        'Weather Resistance': 'Yes, designed for outdoor use',
        'Wood Characteristics': 'Develops beautiful silver patina over time',
        'Delivery Time': 'Made to order - approximately 6 weeks',
        'Care': 'Clean with mild soap and water, regular teak maintenance recommended'
      },
      lifestyleImages: [
        {
          src: '/Fritz Hansen/Drachmann-dining-table/lifestyle/10419392r_3.webp',
          alt: 'Drachmann Dining Table in outdoor lifestyle setting'
        },
        {
          src: '/Fritz Hansen/Drachmann-dining-table/lifestyle/s1042015_1.jpg',
          alt: 'Drachmann Dining Table in garden environment'
        }
      ]
    }
  ];

  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <Link href="/fritz-hansen" className="hover:text-stone-800">Fritz Hansen</Link>
            <span>/</span>
            <span className="text-stone-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={selectedVariant.image}
                alt={`${product.name} in ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-8"
                loading="eager"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.variants.length > 1 && (
              <div className="flex space-x-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative w-20 h-20 bg-gray-50 rounded border-2 transition-colors ${
                      selectedVariant.name === variant.name
                        ? "border-stone-800"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Product Info */}
          <div className="space-y-8">
            {/* Category */}
            <div className="text-sm text-stone-500 uppercase tracking-wider">
              {product.category}
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              <p className="text-stone-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-stone-900">
              kr {product.price.toLocaleString()}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                  {product.variants[0].material ? 'Material & Finish' : 'Variants'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-lg border text-left ${
                        selectedVariant.name === variant.name
                          ? "border-stone-800 bg-stone-50"
                          : "border-stone-300 hover:border-stone-400"
                      }`}
                    >
                      <div className="font-medium text-sm">{variant.name}</div>
                      {variant.material && (
                        <div className="text-xs text-stone-500 mt-1">{variant.material}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-stone-300 flex items-center justify-center hover:bg-stone-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-stone-700 transition-colors">
              Add to Cart
            </button>

            {/* Product Details */}
            {product.details && (
              <div className="space-y-4 pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                    Product Details
                  </h3>
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="flex items-center justify-center w-6 h-6 rounded-full border border-stone-300 hover:border-stone-400 transition-colors"
                  >
                    <svg
                      className={`w-3 h-3 transition-transform ${isDescriptionExpanded ? 'rotate-45' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                {isDescriptionExpanded && (
                  <div className="space-y-3 text-sm">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-stone-100 last:border-b-0">
                        <span className="text-stone-600">{key}:</span>
                        <span className="text-stone-800 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Lifestyle Images */}
        {product.lifestyleImages && product.lifestyleImages.length > 0 && (
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.lifestyleImages.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
