"use client";

import AppointmentBooking from '@/components/AppointmentBooking';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/lib/languageContext';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

const InHomeConsultationPage = () => {
  const benefits = [
    'Personalized consultation in your own space',
    'Expert measurements and space planning',
    'Hands-on material and color selection',
    'Immediate visualization of design ideas',
    'Detailed project planning',
    'Custom solutions for your specific needs'
  ];

  const steps = [
    'Book your preferred 2-hour time slot',
    'Provide your address and contact details',
    'Our expert arrives at scheduled time',
    'Walk through your space together',
    'Discuss design options and solutions',
    'Receive detailed recommendations and next steps'
  ];

  return (
    <LanguageProvider>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
            In-Home Consultation
          </h1>
          <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
            Expert design consultation in the comfort of your home
          </p>
          <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] leading-relaxed">
            Our in-home consultation service brings our design expertise directly to you. Perfect for comprehensive space planning, detailed measurements, and seeing how different options will work in your actual space.
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
          <AppointmentBooking defaultType="in-home" />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default InHomeConsultationPage;
