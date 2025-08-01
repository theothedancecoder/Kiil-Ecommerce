"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { notFound } from 'next/navigation';

interface KartellProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: {
    name: string;
    image: string;
    color: string;
  }[];
  lifestyleImages?: string[];
  details?: {
    [key: string]: string;
  };
}

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function KartellProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  
  // Define all Kartell products (same as in the main page)
  const kartellProducts: KartellProduct[] = [
    {
      id: 'componibili-classic-2',
      name: 'Componibili Classic 2',
      description: 'Modular storage system with 2 compartments. Iconic cylindrical design perfect for any space. The Componibili storage unit is a timeless piece that combines functionality with style, featuring a rotating door mechanism and stackable design.',
      price: 2890,
      image: '/Kartell -Componibili classic 2/white.webp',
      variants: [
        { name: 'White', image: '/Kartell -Componibili classic 2/white.webp', color: 'White' },
        { name: 'Black', image: '/Kartell -Componibili classic 2/black.webp', color: 'Black' },
        { name: 'Red', image: '/Kartell -Componibili classic 2/Red.webp', color: 'Red' },
        { name: 'Blue', image: '/Kartell -Componibili classic 2/blue.webp', color: 'Blue' },
        { name: 'Green', image: '/Kartell -Componibili classic 2/green.webp', color: 'Green' },
        { name: 'Orange', image: '/Kartell -Componibili classic 2/Orange.webp', color: 'Orange' },
        { name: 'Silver', image: '/Kartell -Componibili classic 2/Silver.webp', color: 'Silver' },
        { name: 'Burgundy', image: '/Kartell -Componibili classic 2/burgundy.webp', color: 'Burgundy' },
        { name: 'Mauve', image: '/Kartell -Componibili classic 2/Mauve.webp', color: 'Mauve' },
        { name: 'Sky Blue', image: '/Kartell -Componibili classic 2/Sky Blue.webp', color: 'Sky Blue' },
        { name: 'Taupe', image: '/Kartell -Componibili classic 2/Taupe.webp', color: 'Taupe' },
        { name: 'Violet', image: '/Kartell -Componibili classic 2/Violet.webp', color: 'Violet' }
      ],
      details: {
        'Material': 'ABS Plastic',
        'Dimensions': 'Ø 32 cm, H 58.5 cm',
        'Weight': '3.5 kg',
        'Designer': 'Anna Castelli Ferrieri',
        'Year': '1967',
        'Care': 'Clean with damp cloth'
      }
    },
    {
      id: 'componibili-classic-3',
      name: 'Componibili Classic 3',
      description: 'Modular storage system with 3 compartments. Larger version of the iconic cylindrical design with additional storage space for modern living needs.',
      price: 3490,
      image: '/kartell-Componibili classic 3/white.webp',
      variants: [
        { name: 'White', image: '/kartell-Componibili classic 3/white.webp', color: 'White' },
        { name: 'Black', image: '/kartell-Componibili classic 3/black.avif', color: 'Black' },
        { name: 'Red', image: '/kartell-Componibili classic 3/red.webp', color: 'Red' },
        { name: 'Blue', image: '/kartell-Componibili classic 3/blue.webp', color: 'Blue' },
        { name: 'Green', image: '/kartell-Componibili classic 3/green.webp', color: 'Green' },
        { name: 'Orange', image: '/kartell-Componibili classic 3/orange.webp', color: 'Orange' },
        { name: 'Silver', image: '/kartell-Componibili classic 3/silver.webp', color: 'Silver' },
        { name: 'Burgundy', image: '/kartell-Componibili classic 3/Burgundy.webp', color: 'Burgundy' },
        { name: 'Mauve', image: '/kartell-Componibili classic 3/mauve.webp', color: 'Mauve' },
        { name: 'Sky Blue', image: '/kartell-Componibili classic 3/sky blue.webp', color: 'Sky Blue' },
        { name: 'Taupe', image: '/kartell-Componibili classic 3/Taupe.webp', color: 'Taupe' },
        { name: 'Violet', image: '/kartell-Componibili classic 3/Violet.webp', color: 'Violet' }
      ],
      details: {
        'Material': 'ABS Plastic',
        'Dimensions': 'Ø 32 cm, H 77 cm',
        'Weight': '4.2 kg',
        'Designer': 'Anna Castelli Ferrieri',
        'Year': '1967',
        'Care': 'Clean with damp cloth'
      }
    },
    {
      id: 'kabuki-hanging',
      name: 'Kabuki Hanging Lamp',
      description: 'Elegant pendant light with distinctive pleated shade design inspired by Japanese Kabuki theater. Features energy-efficient LED technology and creates beautiful ambient lighting.',
      price: 7100,
      image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - White.webp',
      variants: [
        { name: 'White', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - White.webp', color: 'White' },
        { name: 'Black', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Black.webp', color: 'Black' },
        { name: 'Crystal', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Crystal.webp', color: 'Crystal' },
        { name: 'Green', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Green.webp', color: 'Green' },
        { name: 'Light Blue', image: '/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - Light blue.webp', color: 'Light Blue' }
      ],
      details: {
        'Material': 'PMMA Methacrylate',
        'Dimensions': 'Ø 40 cm, H 25 cm',
        'Light Source': 'LED 15W',
        'Designer': 'Ferruccio Laviani',
        'Year': '2014',
        'Installation': 'Ceiling mounted'
      }
    },
    {
      id: 'big-battery',
      name: 'Big Battery Lamp',
      description: 'Portable LED table lamp with rechargeable battery. Perfect for indoor and outdoor use with up to 24 hours of continuous lighting.',
      price: 2890,
      image: '/ Kartell Kartell -Big Battery /white.webp',
      variants: [
        { name: 'White', image: '/ Kartell Kartell -Big Battery /white.webp', color: 'White' },
        { name: 'Light Blue', image: '/ Kartell Kartell -Big Battery /light blue.webp', color: 'Light Blue' },
        { name: 'Plum', image: '/ Kartell Kartell -Big Battery /plum.webp', color: 'Plum' },
        { name: 'Coke', image: '/ Kartell Kartell -Big Battery /coke.webp', color: 'Coke' }
      ],
      details: {
        'Material': 'Polycarbonate',
        'Dimensions': 'Ø 26 cm, H 25 cm',
        'Battery Life': 'Up to 24 hours',
        'Light Source': 'LED 2.2W',
        'Designer': 'Ferruccio Laviani',
        'Charging': 'USB-C cable included'
      }
    },
    {
      id: 'pumo-lamp',
      name: 'Pumo Lamp',
      description: 'Table lamp inspired by traditional Apulian ceramic decorations with modern LED technology. A perfect blend of heritage and innovation.',
      price: 3490,
      image: '/Kartell Pumo lamp/WHITE.webp',
      variants: [
        { name: 'White', image: '/Kartell Pumo lamp/WHITE.webp', color: 'White' },
        { name: 'Black', image: '/Kartell Pumo lamp/BLACK.webp', color: 'Black' },
        { name: 'Blue', image: '/Kartell Pumo lamp/BLUE.webp', color: 'Blue' },
        { name: 'Amber', image: '/Kartell Pumo lamp/AMBER.webp', color: 'Amber' }
      ],
      lifestyleImages: [
        '/Kartell Pumo lamp/lifestyle/20250205Pumo-lamp.jpg',
        '/Kartell Pumo lamp/lifestyle/PUMO-LAMPADA_760.jpg'
      ],
      details: {
        'Material': 'Polycarbonate',
        'Dimensions': 'Ø 14 cm, H 26 cm',
        'Light Source': 'LED 6W',
        'Designer': 'Ludovica + Roberto Palomba',
        'Year': '2019',
        'Switch': 'Touch dimmer'
      }
    },
    {
      id: 'kabuki-floor-lamp',
      name: 'Kabuki Floor Lamp',
      description: 'Floor version of the iconic Kabuki lamp with pleated shade and adjustable height. Creates dramatic lighting effects in any space.',
      price: 8900,
      image: '/kartell-kabui floor indoor lamp/white.webp',
      variants: [
        { name: 'White', image: '/kartell-kabui floor indoor lamp/white.webp', color: 'White' },
        { name: 'Black', image: '/kartell-kabui floor indoor lamp/black.webp', color: 'Black' },
        { name: 'Crystal', image: '/kartell-kabui floor indoor lamp/crystal.webp', color: 'Crystal' },
        { name: 'Blue', image: '/kartell-kabui floor indoor lamp/blue.webp', color: 'Blue' },
        { name: 'Green', image: '/kartell-kabui floor indoor lamp/green.webp', color: 'Green' }
      ],
      lifestyleImages: [
        '/kartell-kabui floor indoor lamp/lifestyle/219117-3.jpg',
        '/kartell-kabui floor indoor lamp/lifestyle/Kartell_2315857.jpg'
      ],
      details: {
        'Material': 'PMMA Methacrylate',
        'Dimensions': 'Ø 40 cm, H 165 cm',
        'Light Source': 'LED 15W',
        'Designer': 'Ferruccio Laviani',
        'Year': '2014',
        'Base': 'Weighted metal base'
      }
    },
    {
      id: 'hhh-stool',
      name: 'H.H.H Stool',
      description: 'Stackable stool with ergonomic design. Perfect for modern interiors and versatile seating solutions.',
      price: 1890,
      image: '/Kartell H.H.H /White.webp',
      variants: [
        { name: 'White', image: '/Kartell H.H.H /White.webp', color: 'White' },
        { name: 'Black', image: '/Kartell H.H.H /Black.webp', color: 'Black' },
        { name: 'Blue', image: '/Kartell H.H.H /Blue.webp', color: 'Blue' },
        { name: 'Green', image: '/Kartell H.H.H /Green.webp', color: 'Green' },
        { name: 'Orange', image: '/Kartell H.H.H /Orange.webp', color: 'Orange' },
        { name: 'Bordeaux', image: '/Kartell H.H.H /Bordeaux.webp', color: 'Bordeaux' },
        { name: 'Mustard', image: '/Kartell H.H.H /Mustard.webp', color: 'Mustard' }
      ],
      details: {
        'Material': 'Polypropylene',
        'Dimensions': 'W 35 cm, D 35 cm, H 45 cm',
        'Weight': '1.8 kg',
        'Designer': 'Fabio Novembre',
        'Year': '2020',
        'Features': 'Stackable up to 6 pieces'
      }
    },
    {
      id: 'liberty-2-seater',
      name: 'Liberty 2 Seater Outdoor',
      description: 'Outdoor sofa with weather-resistant materials. Modern design for contemporary outdoor spaces with UV protection.',
      price: 12900,
      image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/beige.webp',
      variants: [
        { name: 'Beige', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/beige.webp', color: 'Beige' },
        { name: 'Russet', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/russet.webp', color: 'Russet' },
        { name: 'Sage', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/sage.webp', color: 'Sage' },
        { name: 'Yellow', image: '/kartell-furniture/PLASTICS OUTDOOR LIBERTY 2 SEATER/yellow.webp', color: 'Yellow' }
      ],
      details: {
        'Material': 'Recyclable Polypropylene',
        'Dimensions': 'W 140 cm, D 70 cm, H 70 cm',
        'Weight': '12 kg',
        'Designer': 'Philippe Starck',
        'Year': '2021',
        'Features': 'UV resistant, 100% recyclable'
      }
    },
    {
      id: 'liberty-3-seater',
      name: 'Liberty 3 Seater Outdoor',
      description: 'Larger outdoor sofa for spacious terraces and gardens. Weather-resistant and stylish with contemporary design.',
      price: 16900,
      image: '/kartell-furniture/Plastics outdoor liberty 3 seater/beige.webp',
      variants: [
        { name: 'Beige', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/beige.webp', color: 'Beige' },
        { name: 'Russet', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/russet.webp', color: 'Russet' },
        { name: 'Sage', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/Sage.webp', color: 'Sage' },
        { name: 'Yellow', image: '/kartell-furniture/Plastics outdoor liberty 3 seater/yellow.webp', color: 'Yellow' }
      ],
      details: {
        'Material': 'Recyclable Polypropylene',
        'Dimensions': 'W 200 cm, D 70 cm, H 70 cm',
        'Weight': '16 kg',
        'Designer': 'Philippe Starck',
        'Year': '2021',
        'Features': 'UV resistant, 100% recyclable'
      }
    }
  ];

  const product = kartellProducts.find(p => p.id === productId);

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
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/kartell" className="text-gray-500 hover:text-gray-700">
                  Kartell
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedVariant.image}
                alt={`${product.name} in ${selectedVariant.name}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Variant Thumbnails */}
            {product.variants.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative aspect-square bg-gray-100 rounded border-2 transition-colors ${
                      selectedVariant.name === variant.name
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={variant.image}
                      alt={variant.name}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Lifestyle Images */}
            {product.lifestyleImages && product.lifestyleImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-8">
                {product.lifestyleImages.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} lifestyle ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Title and Category */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                KARTELL
              </div>
              <h1 className="text-4xl font-serif text-stone-800 mb-4">
                {product.name}
              </h1>
              
              {/* Price */}
              <div className="text-3xl font-light text-stone-800 mb-6">
                kr {product.price.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-800">
                  Color: {selectedVariant.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedVariant.name === variant.name
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-800">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-stone-800 text-white py-4 px-8 text-lg font-medium uppercase tracking-wider hover:bg-stone-700 transition-colors">
              Add to Cart
            </button>

            {/* Product Details */}
            {product.details && (
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-stone-800">
                    Product Details
                  </h3>
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
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
                  <div className="space-y-3 text-sm text-stone-600">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="font-medium">{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-stone-800 text-center mb-12">
            More from Kartell
          </h2>
          <div className="text-center">
            <Link 
              href="/kartell"
              className="inline-block bg-stone-800 text-white px-8 py-3 font-medium hover:bg-stone-700 transition-colors"
            >
              View All Kartell Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
