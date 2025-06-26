"use client";

import AppointmentBooking from '@/components/AppointmentBooking';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/lib/languageContext';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

const InStoreConsultationPage = () => {
  const benefits = [
    'Hands-on experience with our furniture and decor',
    'Expert guidance from our design consultants',
    'See and feel materials, textures, and finishes',
    'Immediate answers to your design questions',
    'Access to our full product catalog',
    'Personalized recommendations based on your style'
  ];

  const steps = [
    'Visit our showroom during business hours',
    'Meet with one of our design consultants',
    'Explore our furniture and decor collections',
    'Discuss your space and design goals',
    'Get expert recommendations and styling tips',
    'Take home samples and product information'
  ];

  return (
    <LanguageProvider>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
            In-Store Consultation
          </h1>
          <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
            Visit our showroom for personalized design consultation
          </p>
          <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] leading-relaxed">
            Experience our furniture and decor collections firsthand while receiving expert design guidance. Our showroom consultations allow you to see, touch, and experience our products while getting personalized recommendations from our design experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
              What You&apos;ll Get:
            </h2>
            <ul className="space-y-3">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <span className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
              How It Works:
            </h2>
            <ol className="space-y-3">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <AppointmentBooking defaultType="in-store" />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default InStoreConsultationPage;
