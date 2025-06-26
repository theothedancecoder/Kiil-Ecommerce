"use client";

import AppointmentBooking from '@/components/AppointmentBooking';
import dynamic from 'next/dynamic';
import { LanguageProvider, useLanguage } from '@/lib/languageContext';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });

const InHomeConsultationContent = () => {
  const { t } = useLanguage();

  const benefits = [
    t('service.home.benefit1'),
    t('service.home.benefit2'),
    t('service.home.benefit3'),
    t('service.home.benefit4'),
    t('service.home.benefit5'),
    t('service.home.benefit6')
  ];

  const steps = [
    t('service.home.step1'),
    t('service.home.step2'),
    t('service.home.step3'),
    t('service.home.step4'),
    t('service.home.step5'),
    t('service.home.step6')
  ];

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
            {t('service.home.titleHeader')}
          </h1>
          <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
            {t('service.home.subtitle')}
          </p>
          <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] leading-relaxed">
            {t('service.home.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
              {t('service.home.whatYouGet')}
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
              {t('service.home.howItWorks')}
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
    </>
  );
};

const InHomeConsultationPage = () => {
  return (
    <LanguageProvider>
      <InHomeConsultationContent />
    </LanguageProvider>
  );
};

export default InHomeConsultationPage;
