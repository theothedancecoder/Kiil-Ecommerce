"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductVariant {
  id: string;
  name: string;
  material: string;
  image: string;
  price: number;
}

export default function FenomenWideCeilingLampPage() {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specificationsExpanded, setSpecificationsExpanded] = useState(false);

  const variants: ProductVariant[] = [
    {
      id: 'natural-brass',
      name: 'Natural Brass',
      material: 'Brass',
      image: '/Crafts/Fenomen-Wide-Ceiling-Lamp%20/%20Crafts%20Fenomen%20Wide%20Ceiling%20Lamp%20from%20Konsthantverk%20NOK%20%209,701.jpg',
      price: 9701
    }
  ];

  const selectedVariant = variants[selectedVariantIndex];

  const features = [
    "Wide ceiling design creates expansive light distribution",
    "Handcrafted by skilled artisans at Konsthantverk",
    "Premium brass construction with natural patina finish",
    "Elegant proportions suitable for various ceiling heights",
    "Creates beautiful ambient lighting for living spaces",
    "Timeless design that complements both modern and traditional interiors",
    "Durable construction built to last generations",
    "Easy installation with included mounting hardware",
    "Compatible with standard ceiling electrical boxes",
    "Designed to accommodate energy-efficient LED bulbs"
  ];

  const specifications = [
    { label: "Designer", value: "Konsthantverk" },
    { label: "Manufacturer", value: "Konsthantverk" },
    { label: "Material", value: "Natural Brass" },
    { label: "Finish", value: "Natural Brass Patina" },
    { label: "Style", value: "Wide Ceiling Lamp" },
    { label: "Installation", value: "Ceiling Mounted" },
    { label: "Bulb Type", value: "E27 (not included)" },
    { label: "Voltage", value: "220-240V" },
    { label: "IP Rating", value: "IP20 (Indoor use)" },
    { label: "Care", value: "Clean with soft, dry cloth" },
    { label: "Warranty", value: "2 years manufacturer warranty" },
    { label: "Origin", value: "Handcrafted in Scandinavia" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/crafts" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Crafts Collection
            </Link>
            
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-stone-600 hover:text-stone-800">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/crafts" className="text-stone-600 hover:text-stone-800">
                Crafts
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-stone-800 font-medium">Fenomen Wide Ceiling Lamp</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={selectedVariant.image}
                alt={`Fenomen Wide Ceiling Lamp - ${selectedVariant.name}`}
                fill
                className="object-contain object-center p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Additional Images - Using the same image for now */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={selectedVariant.image}
                  alt="Fenomen Wide Ceiling Lamp Detail"
                  fill
                  className="object-contain object-center p-4"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={selectedVariant.image}
                  alt="Fenomen Wide Ceiling Lamp Installation"
                  fill
                  className="object-contain object-center p-4"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <div className="text-sm text-amber-600 uppercase tracking-wider mb-2">
                CRAFTS COLLECTION
              </div>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                Fenomen Wide Ceiling Lamp
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                The Fenomen Wide Ceiling Lamp from Konsthantverk represents the pinnacle of Scandinavian 
                lighting design. This elegant ceiling fixture combines traditional brass craftsmanship with 
                contemporary proportions, creating a sophisticated lighting solution that enhances any interior space.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Handcrafted by Konsthantverk
              </div>
            </div>

            <div className="text-2xl font-light text-gray-900">
              kr {selectedVariant.price.toLocaleString()}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Material: {selectedVariant.material}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantIndex(index)}
                    className={`p-3 text-sm border rounded transition-all ${
                      selectedVariantIndex === index
                        ? "border-amber-600 bg-amber-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-600 border border-gray-300" />
                      <div className="font-medium">{variant.name}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">kr {variant.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-amber-600 text-white py-4 px-8 text-sm font-medium uppercase tracking-wider hover:bg-amber-700 transition-colors">
              Add to Cart - kr {selectedVariant.price.toLocaleString()}
            </button>

            {/* Artisan Crafted Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Handcrafted Excellence</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Each lamp is individually handcrafted by skilled artisans, making every piece unique. 
                    Please allow 4-6 weeks for delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Collapsible Features */}
            <div className="border-t border-gray-200 pt-8">
              <button
                onClick={() => setFeaturesExpanded(!featuresExpanded)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Features
                </h3>
                <span className="text-gray-500">
                  {featuresExpanded ? "−" : "+"}
                </span>
              </button>
              {featuresExpanded && (
                <ul className="mt-4 space-y-2 text-gray-600">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Collapsible Specifications */}
            <div className="border-t border-gray-200 pt-8">
              <button
                onClick={() => setSpecificationsExpanded(!specificationsExpanded)}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Specifications
                </h3>
                <span className="text-gray-500">
                  {specificationsExpanded ? "−" : "+"}
                </span>
              </button>
              {specificationsExpanded && (
                <div className="mt-4 space-y-3 text-gray-600">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Back to Collection */}
            <div className="border-t border-gray-200 pt-8">
              <Link
                href="/crafts"
                className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                View All Crafts Products
              </Link>
            </div>
          </div>
        </div>

        {/* About Konsthantverk Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6">
                About Konsthantverk
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Konsthantverk represents the finest tradition of Scandinavian craftsmanship, where each piece 
                is created with meticulous attention to detail and respect for traditional techniques. 
                Their lighting designs embody the perfect balance between form and function.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The Fenomen Wide Ceiling Lamp showcases their commitment to quality materials and timeless design. 
                Each lamp is individually crafted, ensuring that no two pieces are exactly alike, making your 
                lighting fixture truly unique.
              </p>
              <Link 
                href="/tjenester" 
                className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-300"
              >
                Learn More About Our Artisans
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <Image
                  src="/Crafts/Fenomen-Wide-Ceiling-Lamp%20/%20Crafts%20Fenomen%20Wide%20Ceiling%20Lamp%20from%20Konsthantverk%20NOK%20%209,701.jpg"
                  alt="Konsthantverk Craftsmanship"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              Complete Your Lighting Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover more exceptional lighting solutions from our curated collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              href="/flos/2097-18-chandelier"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/FLOS/2097-18-chandelier-brass.jpg"
                  alt="FLOS 2097/18 Chandelier"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Lighting
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  FLOS 2097/18 Chandelier
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 28,999
                </div>
              </div>
            </Link>

            <Link
              href="/louis-poulsen/aj-floor-lamp"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/Louis-Poulsen/AJ-Floor-Lamp/AJ Gulvlampe kr 13 025  Farge - White.webp"
                  alt="Louis Poulsen AJ Floor Lamp"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Lighting
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  AJ Floor Lamp
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 13,025
                </div>
              </div>
            </Link>

            <Link
              href="/tradition/flowerpot-vp1"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/&Tradition/Flowerpot-VP1/Flowerpot VP1 kr 2 565  Farge - Matt White.jpg"
                  alt="&Tradition Flowerpot VP1"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Lighting
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Flowerpot VP1 Pendant
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 2,565
                </div>
              </div>
            </Link>

            <Link
              href="/kartell/kabuki-hanging"
              className="group block bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src="/ Kartell -Kabuki Hanging /Kabuki Hanging kr 7 100.00  Farge - White.webp"
                  alt="Kartell Kabuki Hanging"
                  fill
                  className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Lighting
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-gray-700">
                  Kabuki Hanging Lamp
                </h3>
                <div className="text-sm font-light text-gray-900">
                  From kr 7,100
                </div>
              </div>
            </Link>
          </div>

          {/* View All Products Link */}
          <div className="text-center mt-12">
            <Link
              href="/crafts"
              className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              View All Crafts Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
