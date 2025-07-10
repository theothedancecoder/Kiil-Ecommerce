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
  category: 'Seating' | 'Accessories' | 'Tables';
}

export default function FritzHansenPage() {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

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
    }
  ];

  const filteredProducts = products.filter(product => 
    filterBy === 'all' || product.category === filterBy
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

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
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="all">All Categories</option>
                <option value="Seating">Seating</option>
                <option value="Tables">Tables</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-stone-600">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
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
