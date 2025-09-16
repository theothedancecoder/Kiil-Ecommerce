"use client";

import Image from 'next/image';
import Link from 'next/link';
import MontanaEmbedViewer from '@/components/MontanaEmbedViewer';

export default function MontanaPage() {
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
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/Montana/Line-Bench/lifestyle/Montana_Home19_20_BCStudio_HomeOffice_LINE_Turmeric_COUPLE_Shadow_Detail_W.jpg"
          alt="Montana Collection"
          fill
          className="object-cover"
        />
        
        {/* Colorful Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-pink-500/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block bg-black px-8 py-4 rounded-lg">
              <h1 className="text-4xl md:text-6xl font-serif text-white">
                Montana
              </h1>
            </div>
          </div>
        </div>
        
        {/* Floating Color Dots */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-6 h-6 bg-pink-400 rounded-full opacity-70 animate-pulse delay-300"></div>
        <div className="absolute bottom-24 left-20 w-5 h-5 bg-blue-400 rounded-full opacity-75 animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-12 w-3 h-3 bg-green-400 rounded-full opacity-80 animate-pulse delay-500"></div>
        <div className="absolute top-40 left-1/3 w-4 h-4 bg-purple-400 rounded-full opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-5 h-5 bg-orange-400 rounded-full opacity-75 animate-pulse delay-200"></div>
      </section>

      {/* Full Montana Catalog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">
              Complete Montana Catalog
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto mb-8">
              Explore the full Montana collection with all available products, configurations, and colors. 
              Browse directly within our site while maintaining access to our navigation and services.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-stone-500 mb-8">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Full product range
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Real-time availability
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete specifications
              </div>
            </div>
          </div>
          
          <MontanaEmbedViewer 
            url="https://kiil.no/produktkategori/merker/montana/"
            title="Montana Complete Catalog"
          />
          
          <div className="text-center mt-8">
            <p className="text-sm text-stone-500 mb-4">
              Having trouble viewing the catalog? You can also visit it directly.
            </p>
            <a 
              href="https://kiil.no/produktkategori/merker/montana/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
            >
              Open Full Catalog
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Montana Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-stone-800 mb-6">
              About Montana
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Montana Furniture has been creating modular storage solutions since 1982. 
              Founded in Denmark, the company revolutionized furniture design with its innovative modular system.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              With over 40 colors and endless configuration possibilities, Montana furniture adapts to your changing needs 
              and personal style, making it a sustainable choice for modern living.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">40+ colors available</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Modular and customizable</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Sustainable production</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">✓</span>
                <span className="text-stone-600">Danish design heritage</span>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/Montana/Read-bookshelf/lifestyle/Montana_Home20_21_READ_Parsley_H-scaled.jpg"
              alt="Montana Design Detail"
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
            Create Your Perfect Storage Solution
          </h2>
          <p className="text-xl text-stone-300 mb-8 leading-relaxed">
            Discover the endless possibilities of Montana modular furniture and create 
            storage solutions that grow with your needs.
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
