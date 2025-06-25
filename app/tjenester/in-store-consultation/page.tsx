"use client";

import AppointmentBooking from '@/components/AppointmentBooking';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
import { LanguageProvider } from '@/lib/languageContext';

const InStoreConsultationPage = () => {
  const benefits = [
    'One-on-one consultation with a design expert',
    'Access to our complete furniture collection',
    'Personalized design recommendations',
    'Space planning assistance',
    'Product selection guidance',
    'Styling tips and advice'
  ];

  const steps = [
    'Book your preferred time slot below',
    'Visit our store at the scheduled time',
    'Meet with your assigned design consultant',
    'Discuss your space and design goals',
    'Explore our collection together',
    'Receive personalized recommendations'
  ];

  return (
    <LanguageProvider>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
        <h1 className="text-3xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
          How our  Consultations Work
        </h1>
        <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
          Meet with our expert at your selected Kiil Store location
        </p>
        <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] leading-relaxed">
          Our in-store consultation service allows you to work directly with our design experts in a comfortable showroom environment. You'll have access to our full collection of furniture and design pieces, allowing you to see, touch, and experience the quality firsthand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
            What You'll Get:
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
