"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface VitraProduct {
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
  category: 'Clocks' | 'Furniture' | 'Lighting' | 'Accessories';
}

export default function VitraPage() {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const products: VitraProduct[] = [
    {
      id: 'ball-clock',
      name: 'Ball Clock',
      description: 'Iconic wall clock designed by George Nelson in 1947. A timeless piece that combines functionality with sculptural beauty.',
      price: 3950,
      image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  3,950  Color -  Multicolor.jpg',
      category: 'Clocks',
      variants: [
        { name: 'Multicolor', image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  3,950  Color -  Multicolor.jpg', color: 'Multicolor' },
        { name: 'Natural Beech', image: '/Vitra/Ball-Clock/Ball Clock fra Vitra kr 3 950  Farge - Natural beech.jpg', color: 'Natural Beech' },
        { name: 'Orange', image: '/Vitra/Ball-Clock/Ball Clock fra Vitra kr 3 950  Farge - Orange.webp', color: 'Orange' },
        { name: 'Cherry', image: '/Vitra/Ball-Clock/Ball Clock from Vitra NOK  4,950  Color -  Cherry.webp', color: 'Cherry' }
      ]
    },
    {
      id: 'sunburst-clock',
      name: 'Sunburst Clock',
      description: 'Another iconic George Nelson design from 1948-1960. Features radiating spokes that create a striking sunburst pattern.',
      price: 5090,
      image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Walnut.webp',
      category: 'Clocks',
      variants: [
        { name: 'Walnut', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Walnut.webp', color: 'Walnut' },
        { name: 'Black', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 390.00  Farge - Black.webp', color: 'Black' },
        { name: 'Red', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Red.webp', color: 'Red' },
        { name: 'Multicolor', image: '/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Multicolor.webp', color: 'Multicolor' }
      ]
    },
    {
      id: 'noguchi-coffee-table',
      name: 'Noguchi Coffee Table',
      description: 'Designed by Isamu Noguchi in 1944, this sculptural coffee table has a rounded glass top resting on two identical wooden elements.',
      price: 31200,
      image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Black lacquered ash.webp',
      category: 'Furniture',
      variants: [
        { name: 'Black Lacquered Ash', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Black lacquered ash.webp', material: 'Black Lacquered Ash' },
        { name: 'Maple', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  31,200  Color -  Salary.webp', material: 'Maple' },
        { name: 'Walnut', image: '/Vitra/Noguchi-coffee-table /Noguchi coffee table Vitra NOK  43,200  Color -  Walnut.webp', material: 'Walnut' }
      ]
    },
    {
      id: 'panton-chair',
      name: 'Panton Chair',
      description: 'Designed by Verner Panton in 1967, the world\'s first injection-moulded plastic chair made from a single piece.',
      price: 4890,
      image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp',
      category: 'Furniture',
      variants: [
        { name: 'Classic Red', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Classic red.webp', color: 'Red' },
        { name: 'Deep Black', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Deep black.webp', color: 'Black' },
        { name: 'White', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - White.webp', color: 'White' },
        { name: 'Soft Mint', image: '/Vitra/Panton-Chair /Panton Chair fra Vitra kr 4 350  Farge - Soft mint.webp', color: 'Mint' }
      ]
    },
    {
      id: 'eames-re-plastic-chair-dsr',
      name: 'Eames RE Plastic Chair DSR',
      description: 'The iconic Eames plastic chair with dowel base, designed by Charles and Ray Eames. A timeless piece of mid-century modern design.',
      price: 4010,
      image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 04 White.webp',
      category: 'Furniture',
      variants: [
        { name: 'White/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 04 White.webp', color: 'White', material: 'Chrome Base' },
        { name: 'Deep Black/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 12 Deep black.webp', color: 'Deep Black', material: 'Chrome Base' },
        { name: 'Poppy Red/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 03 Poppy red.webp', color: 'Poppy Red', material: 'Chrome Base' },
        { name: 'Sea Blue/Chrome', image: '/Vitra/Eames-RE-Plastic-Chair – DSR /Eames RE Plastic Chair – DSR kr 4 010  Base - Chrome Chrome Black White Farge - 83 Sea Blue.webp', color: 'Sea Blue', material: 'Chrome Base' }
      ]
    },
    {
      id: 'hang-it-all',
      name: 'Hang It All',
      description: 'Designed by Charles and Ray Eames in 1953, this playful coat rack features colorful wooden balls on metal hooks.',
      price: 3490,
      image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Multicolor.webp',
      category: 'Accessories',
      variants: [
        { name: 'Multicolor', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Multicolor.webp', color: 'Multicolor' },
        { name: 'Red', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Red.jpg', color: 'Red' },
        { name: 'Green', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Green.jpg', color: 'Green' },
        { name: 'White', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - White.jpg', color: 'White' },
        { name: 'Walnut', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 490  Farge - Walnut.jpg', color: 'Walnut' },
        { name: 'Black Ash', image: '/Vitra/Hang-it-all/Hang it all Vitra NOK  3,490  Color -  Black ash.jpg', color: 'Black Ash' },
        { name: 'Marble', image: '/Vitra/Hang-it-all/Hang it all Vitra kr 3 750  Farge - Marble.jpg', color: 'Marble' }
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
          src="/Vitra/Eames-RE-Plastic-Chair – DSR /lifestyle/0a82c45a-6f87-4541-bc69-48ae478dffa8.webp"
          alt="Vitra Collection"
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
                Vitra
              </h1>
              <p className="text-stone-600 text-lg">
                Iconic Design Since 1950
              </p>
            </div>
          </div>
        </div>
        
        {/* Floating Design Elements - Ball Clock Inspired Spheres */}
        <div className="absolute top-16 left-12 w-6 h-6 bg-red-500 rounded-full opacity-80 animate-pulse shadow-lg"></div>
        <div className="absolute top-32 right-20 w-4 h-4 bg-blue-600 rounded-full opacity-70 animate-pulse delay-300 shadow-lg"></div>
        <div className="absolute bottom-28 left-16 w-5 h-5 bg-yellow-500 rounded-full opacity-75 animate-pulse delay-700 shadow-lg"></div>
        <div className="absolute bottom-44 right-16 w-3 h-3 bg-green-600 rounded-full opacity-80 animate-pulse delay-500 shadow-lg"></div>
        <div className="absolute top-44 left-1/4 w-4 h-4 bg-orange-500 rounded-full opacity-70 animate-pulse delay-1000 shadow-lg"></div>
        <div className="absolute bottom-36 right-1/3 w-6 h-6 bg-purple-600 rounded-full opacity-75 animate-pulse delay-200 shadow-lg"></div>
        
        {/* Sunburst Clock Inspired Radiating Lines */}
        <div className="absolute top-20 right-32 w-12 h-0.5 bg-white/60 rotate-12 animate-pulse delay-400"></div>
        <div className="absolute top-24 right-28 w-8 h-0.5 bg-white/50 rotate-45 animate-pulse delay-600"></div>
        <div className="absolute top-28 right-36 w-10 h-0.5 bg-white/40 -rotate-12 animate-pulse delay-800"></div>
        
        <div className="absolute bottom-32 left-28 w-12 h-0.5 bg-white/60 rotate-45 animate-pulse delay-900"></div>
        <div className="absolute bottom-28 left-24 w-8 h-0.5 bg-white/50 -rotate-12 animate-pulse delay-1100"></div>
        <div className="absolute bottom-36 left-32 w-10 h-0.5 bg-white/40 rotate-12 animate-pulse delay-1300"></div>
        
        {/* Eames Inspired Organic Curves */}
        <div className="absolute top-1/3 left-8">
          <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-60 animate-pulse delay-1500">
            <path d="M10 30 Q 20 10, 30 30" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-8">
          <svg width="32" height="32" viewBox="0 0 32 32" className="opacity-50 animate-pulse delay-1700">
            <path d="M8 24 Q 16 8, 24 24" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        
        {/* Hang It All Inspired Small Dots */}
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-pink-400 rounded-full opacity-70 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-24 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse delay-2200"></div>
        <div className="absolute top-1/2 left-28 w-2 h-2 bg-lime-400 rounded-full opacity-80 animate-pulse delay-2400"></div>
        
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-rose-400 rounded-full opacity-70 animate-pulse delay-2600"></div>
        <div className="absolute top-1/2 right-24 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-pulse delay-2800"></div>
        <div className="absolute top-1/2 right-28 w-2 h-2 bg-emerald-400 rounded-full opacity-80 animate-pulse delay-3000"></div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Vitra Collection
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover iconic design pieces from Vitra, where innovation meets timeless aesthetics.
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
                <option value="Clocks">Clocks</option>
                <option value="Furniture">Furniture</option>
                <option value="Lighting">Lighting</option>
                <option value="Accessories">Accessories</option>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/vitra/${product.id}`}
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
                    <div className="absolute top-3 right-3 bg-stone-100 px-2 py-1 rounded-full text-xs text-stone-600">
                      {product.category}
                    </div>
                  </div>
                  
                  {product.variants.length > 1 && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex space-x-1">
                        {product.variants.slice(0, 4).map((variant, index) => {
                          // Define color mappings for different variants
                          const getVariantColor = (variantName: string) => {
                            const colorMap: { [key: string]: string } = {
                              'Multicolor': '#FF6B6B',
                              'Black': '#000000',
                              'White': '#FFFFFF',
                              'Brass': '#B5A642',
                              'Walnut': '#8B4513',
                            };
                            return colorMap[variantName] || '#D1D5DB';
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
                        {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
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
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-stone-800 text-white hover:bg-stone-700'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        ? 'bg-stone-800 text-white'
                        : 'bg-gray-100 text-stone-600 hover:bg-gray-200'
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
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-stone-800 text-white hover:bg-stone-700'
                }`}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Vitra Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Vitra
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Vitra is a Swiss company dedicated to improving the quality of homes, offices and public spaces 
              through the power of design. For over 70 years, Vitra has been creating furniture and accessories 
              that combine innovative design with exceptional quality.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Working with renowned designers like Charles and Ray Eames, George Nelson, and Verner Panton, 
              Vitra has created some of the most iconic pieces in modern design history.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Iconic design heritage</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Swiss quality craftsmanship</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Sustainable production</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Timeless design philosophy</span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/Vitra- Sunburst Clock /Sunburst Clock fra Vitra kr 5 090.00  Farge - Walnut.webp"
              alt="Vitra Design Detail"
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
            Discover Iconic Design
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Explore Vitra's collection of timeless furniture and accessories that have shaped 
            modern design for generations.
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
