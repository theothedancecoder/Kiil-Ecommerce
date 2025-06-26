"use client";

import dynamic from 'next/dynamic';
import { LanguageProvider, useLanguage } from '@/lib/languageContext';
import Image from 'next/image';
import { useState } from 'react';
import ProductVariantDialog from '@/components/ProductVariantDialog';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

interface ProductVariant {
  name: string;
  image: string;
  color: string;
}

interface Product {
  name: string;
  description: string;
  image: string;
  variants: ProductVariant[];
}

const MontanaContent = () => {
  const { t } = useLanguage();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const products = [
    {
      name: t('montana.storage.name'),
      description: t('montana.storage.description'),
      image: '/interior-collection/montana/Montana_1112_Newwhite.jpg',
      variants: [
        { name: 'New White', image: '/interior-collection/montana/Montana_1112_Newwhite.jpg', color: 'New White' },
        { name: 'Nordic', image: '/interior-collection/montana/Montana_1112_Nordic.jpg', color: 'Nordic' }
      ]
    },
    {
      name: t('montana.collection2017.name'),
      description: t('montana.collection2017.description'),
      image: '/interior-collection/montana/Montana_Collection2017_Keep_3000x3000.jpg',
      variants: [
        { name: 'Keep', image: '/interior-collection/montana/Montana_Collection2017_Keep_3000x3000.jpg', color: 'Keep Style' },
        { name: 'Dream', image: '/interior-collection/montana/Montana_Collection2017_Dream_3000x3000.jpg', color: 'Dream Style' },
        { name: 'Line', image: '/interior-collection/montana/Montana_Collection2017_Line_3000x3000.jpg', color: 'Line Style' },
        { name: 'Play', image: '/interior-collection/montana/Montana_Collection2017_Play_3000x3000.jpg', color: 'Play Style' },
        { name: 'Rest', image: '/interior-collection/montana/Montana_Collection2017_Rest_3000x3000.jpg', color: 'Rest Style' },
        { name: 'Coat', image: '/interior-collection/montana/Montana_Collection2017_Coat_3000x3000.jpg', color: 'Coat Style' }
      ]
    },
    {
      name: t('montana.pantonwire.name'),
      description: t('montana.pantonwire.description'),
      image: '/interior-collection/montana/Montana_PantonWire_Extended_D34.8_Black_perspective-scaled.jpg',
      variants: [
        { name: 'Black', image: '/interior-collection/montana/Montana_PantonWire_Extended_D34.8_Black_perspective-scaled.jpg', color: 'Black' },
        { name: 'Chrome', image: '/interior-collection/montana/Montana_PantonWire_Extended_D34.8_Chrome_perspective-scaled.jpg', color: 'Chrome' },
        { name: 'Monarch', image: '/interior-collection/montana/Montana_PantonWire_Extended_D34.8_Monarch_perspective-scaled.jpg', color: 'Monarch' },
        { name: 'Snow', image: '/interior-collection/montana/Montana_PantonWire_Extended_D34.8_Snow_perspective-scaled.jpg', color: 'Snow' }
      ]
    },
    {
      name: t('montana.monterey.name'),
      description: t('montana.monterey.description'),
      image: '/interior-collection/montana/Montana_Monterey_H72_Black_Perspective.png',
      variants: [
        { name: 'Black', image: '/interior-collection/montana/Montana_Monterey_H72_Black_Perspective.png', color: 'Black' },
        { name: 'New White', image: '/interior-collection/montana/Montana_Monterey_H72_NewWhite_Perspective.png', color: 'New White' },
        { name: 'Parsley', image: '/interior-collection/montana/Montana_Monterey_H72_Parsley_Perspective.png', color: 'Parsley' },
        { name: 'Anthracite', image: '/interior-collection/montana/Montana_Monterey_H72_Anthracite_Perspective.png', color: 'Anthracite' }
      ]
    },
    {
      name: t('montana.office.name'),
      description: t('montana.office.description'),
      image: '/interior-collection/montana/Montana_Office_SHL_Black_Workstation_2016_W.jpg',
      variants: [
        { name: 'Black Workstation', image: '/interior-collection/montana/Montana_Office_SHL_Black_Workstation_2016_W.jpg', color: 'Black' }
      ]
    },
    {
      name: t('montana.mini.name'),
      description: t('montana.mini.description'),
      image: '/interior-collection/montana/Montana_Mini_Hall_Mist_Rhubarb_Amber_H-2-scaled.jpg',
      variants: [
        { name: 'Hall Multi-Color', image: '/interior-collection/montana/Montana_Mini_Hall_Mist_Rhubarb_Amber_H-2-scaled.jpg', color: 'Mist/Rhubarb/Amber' },
        { name: 'TV Bench Nordic', image: '/interior-collection/montana/Montana_Mini_TVBench_Nordic_Mushroom_W.jpg', color: 'Nordic/Mushroom' }
      ]
    },
    {
      name: t('montana.bureau.name'),
      description: t('montana.bureau.description'),
      image: '/interior-collection/montana/Montana_Home21_22_BUREAU_Flint_01_H-scaled.jpg',
      variants: [
        { name: 'Flint', image: '/interior-collection/montana/Montana_Home21_22_BUREAU_Flint_01_H-scaled.jpg', color: 'Flint' },
        { name: 'Flint Detail', image: '/interior-collection/montana/Montana_Home21_22_BUREAU_Flint_Detail_H-scaled.jpg', color: 'Flint Detail' }
      ]
    },
    {
      name: t('montana.home.name'),
      description: t('montana.home.description'),
      image: '/interior-collection/montana/Montana_Home20_21_FLUTTER_Rosehip_WhiteOak_Vanilla_Shadow_Truffle_Hokkaido_PantonOne_H-scaled.jpg',
      variants: [
        { name: 'Flutter Multi-Color', image: '/interior-collection/montana/Montana_Home20_21_FLUTTER_Rosehip_WhiteOak_Vanilla_Shadow_Truffle_Hokkaido_PantonOne_H-scaled.jpg', color: 'Rosehip/White Oak/Vanilla' },
        { name: 'Octave II Flint', image: '/interior-collection/montana/Montana_Home20_21_OCTAVE_II_Flint_Cumin_H-scaled.jpg', color: 'Flint/Cumin' },
        { name: 'Save Hokkaido', image: '/interior-collection/montana/Montana_Home20_21_SAVE_Hokkaido_H-scaled.jpg', color: 'Hokkaido' }
      ]
    },
    {
      name: t('montana.campaign.name'),
      description: t('montana.campaign.description'),
      image: '/interior-collection/montana/Montana_Campaign_01_H_1112_Monarch_Cropped.jpg',
      variants: [
        { name: 'Monarch', image: '/interior-collection/montana/Montana_Campaign_01_H_1112_Monarch_Cropped.jpg', color: 'Monarch' },
        { name: 'Monarch Open', image: '/interior-collection/montana/Montana_Campaign_01_H_1118_Monarch_Open_Cropped.jpg', color: 'Monarch Open' },
        { name: 'Fjord', image: '/interior-collection/montana/Montana_Campaign_1118_Fjord-768x1024-1.jpg', color: 'Fjord' },
        { name: 'Milk', image: '/interior-collection/montana/Montana_Campaign_1118_Milk-768x1024-1.jpg', color: 'Milk' }
      ]
    }
  ];

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleBrowseCollection = () => {
    // Scroll to the products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-96 bg-gray-900 overflow-hidden">
          <Image
            src="/interior-collection/montana/montana_pantonwire_d35_blackred_rosehiptop_h.webp"
            alt="Montana Furniture Collection"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-5xl font-['Montserrat', 'Helvetica', 'Verdana'] font-bold mb-4">
                {t('montana.hero.title')}
              </h1>
              <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana'] max-w-2xl mx-auto">
                {t('montana.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* About Montana Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-['Montserrat', 'Helvetica', 'Verdana'] text-[#212529] mb-6">
                {t('montana.about.title')}
              </h2>
              <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana'] leading-relaxed mb-4">
                {t('montana.about.description1')}
              </p>
              <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana'] leading-relaxed mb-6">
                {t('montana.about.description2')}
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana']">
                    {t('montana.about.feature1')}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana']">
                    {t('montana.about.feature2')}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana']">
                    {t('montana.about.feature3')}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana']">
                    {t('montana.about.feature4')}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/interior-collection/montana/montana_pantonwire_d35_blackred_rosehiptop_h.webp"
                alt="Montana Furniture Detail"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products-section" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-['Montserrat', 'Helvetica', 'Verdana'] text-[#212529] text-center mb-12">
              {t('montana.products.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-['Montserrat', 'Helvetica', 'Verdana'] text-[#212529] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-base font-['Montserrat', 'Helvetica', 'Verdana'] text-[#000000] mb-4">
                      {product.description}
                    </p>
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-['Montserrat', 'Helvetica', 'Verdana']"
                    >
                      {t('montana.viewDetails') || 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-[#212529] text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-['Montserrat', 'Helvetica', 'Verdana'] mb-6">
              {t('montana.cta.title')}
            </h2>
            <p className="text-lg font-['Montserrat', 'Helvetica', 'Verdana'] mb-8">
              {t('montana.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleBrowseCollection}
                className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-['Montserrat', 'Helvetica', 'Verdana'] font-semibold"
              >
                {t('montana.cta.browse')}
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors font-['Montserrat', 'Helvetica', 'Verdana'] font-semibold">
                {t('montana.cta.contact')}
              </button>
            </div>
          </div>
        </section>

        {/* Product Variant Dialog */}
        {selectedProduct && (
          <ProductVariantDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            product={selectedProduct}
          />
        )}
      </div>
    </>
  );
};

const MontanaPage = () => {
  return (
    <LanguageProvider>
      <MontanaContent />
    </LanguageProvider>
  );
};

export default MontanaPage;
