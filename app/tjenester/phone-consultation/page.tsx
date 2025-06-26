"use client";

import AppointmentBooking from '@/components/AppointmentBooking';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/lib/languageContext';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

const PhoneConsultationPage = () => {
  const benefits = [
    'Direct access to design experts',
    'Quick answers to your design questions',
    'Product recommendations and guidance',
    'Space planning advice',
    'Color and style suggestions',
    'Follow-up recommendations via email'
  ];

  const steps = [
    'Book your preferred 30-minute time slot',
    'Provide your contact details',
    'We&apos;ll call you at the scheduled time',
    'Discuss your design needs and questions',
    'Receive expert advice and recommendations',
    'Get follow-up information via email'
  ];

  const preparation = [
    'Have your room measurements ready',
    'Think about your style preferences',
    'Prepare specific questions you want to ask',
    'Have photos of your space available (optional)',
    'Consider your budget range'
  ];

  return (
    <LanguageProvider>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
            Phone Consultation
          </h1>
          <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
            Quick and convenient design advice over the phone
          </p>
          <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] leading-relaxed">
            Our phone consultation service offers you immediate access to our design experts. Perfect for quick questions, initial planning, or when you need expert advice but can&apos;t visit our store or schedule an in-home visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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

          <div>
            <h2 className="text-2xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
              How to Prepare:
            </h2>
            <ul className="space-y-3">
              {preparation.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">💡</span>
                  <span className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <AppointmentBooking defaultType="phone" />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default PhoneConsultationPage;
