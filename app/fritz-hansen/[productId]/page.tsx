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
  category: 'Seating' | 'Accessories' | 'Tables';
  details?: {
    [key: string]: string;
  };
  lifestyleImages?: {
    src: string;
    alt: string;
  }[];
}

export default function FritzHansenProductPage({ params }: { params: { productId: string } }) {
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
    }
  ];

  const product = products.find(p => p.id === params.productId);

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
            <h2 className="text-2xl font-serif text-stone-800 mb-8 text-center">
              In Context
            </h2>
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
