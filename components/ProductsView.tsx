"use client";

import { Product, ALL_CATEGORIES_QUERYResult } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/languageContext";
import Image from "next/image";
import Link from "next/link";

interface ProductsViewProps {
  products: Product[];
  categories: ALL_CATEGORIES_QUERYResult;
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  const { t } = useLanguage();
  const [showMobileCategories, setShowMobileCategories] = useState(false);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile Category Button - Only visible on mobile phones */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowMobileCategories(!showMobileCategories)}
          className="flex items-center space-x-2 luxury-button w-full justify-center"
        >
          <Menu className="w-5 h-5" />
          <span>Categories</span>
        </button>
      </div>

      {/* Mobile Categories Sidebar - Only shown when toggled on mobile */}
      {showMobileCategories && (
        <div className="sm:hidden mb-4">
          <div className="luxury-card p-4">
            <h3 className="font-serif text-xl text-primary mb-4">Categories</h3>
            <CategorySelectorComponent categories={categories} />
          </div>
        </div>
      )}

      {/* Products Grid - Full width on iPad and Desktop */}
      <div className="w-full">
        <ProductGrid products={products} />
      </div>

      {/* Partners Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-serif text-center mb-8">{t('partners.title') || 'Our Partners'}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Partner Box 1 - Kartell */}
          <div 
            className="luxury-card bg-[#f8f8f8] overflow-hidden relative"
            style={{ height: '409.63px' }}
          >
            <div className="absolute inset-0">
              <Image
                src="/interior-collection/kartell/Kartell_Cassinella19537.webp"
                alt="Kartell Cassinella"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative h-full flex flex-col justify-center items-center p-8 text-white">
              <h3 className="text-2xl font-serif mb-4">{t('partners.box1.title') || 'Kartell'}</h3>
              <p className="text-center mb-6">
                {t('partners.box1.description') || 'Luxurious beauty in the Home.'}
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-white/90 transition-colors">
                {t('product.shopNow')}
              </button>
            </div>
          </div>

          {/* Partner Box 2 - Montana */}
          <div 
            className="luxury-card bg-[#f8f8f8] overflow-hidden relative"
            style={{ height: '409.63px' }}
          >
            <div className="absolute inset-0">
              <Image
                src="/montana_pantonwire_d35_blackred_rosehiptop_h.webp"
                alt="Montana Furniture"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative h-full flex flex-col justify-center items-center p-8 text-white">
              <h3 className="text-2xl font-serif mb-4">{t('partners.box2.title') || 'Montana'}</h3>
              <p className="text-center mb-6">
                {t('partners.box2.description') || 'Storage that elevates your home.'}
              </p>
              <Link 
                href="/montana"
                className="bg-white text-black px-6 py-2 rounded-lg hover:bg-white/90 transition-colors inline-block text-center"
              >
                {t('product.shopNow')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsView;
