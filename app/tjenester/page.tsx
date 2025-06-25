"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/Header'), { ssr: false });
import { LanguageProvider } from '@/lib/languageContext';

const ServicesPage = () => {
  const services = [
    {
      id: 'in-store-consultation',
      icon: '🏬',
      title: 'In-Store Consultation',
      description: 'Meet with our expert at your selected Kiil Store location',
      duration: 'Duration: 1 hour'
    },
    {
      id: 'in-home-consultation',
      icon: '🏠',
      title: 'In-Home Consultation',
      description: 'Our expert will visit your space for personalized advice',
      duration: 'Duration: 2 hours'
    },
    {
      id: 'phone-consultation',
      icon: '📞',
      title: 'Phone Consultation',
      description: 'Discuss your design needs over the phone',
      duration: 'Duration: 30 minutes'
    },
    {
      id: 'online-consultation',
      icon: '💻',
      title: 'Online Consultation',
      description: 'Video consultation from the comfort of your home',
      duration: 'Duration: 45 minutes'
    }
  ];

  return (
    <LanguageProvider>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
        Our Services
      </h1>
      <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-12">
        Expert consultation services tailored to your needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <Link 
            key={service.id}
            href={`/tjenester/${service.id}`}
            className="block"
          >
            <div className="bg-[#f0f8ff] rounded-xl p-8 h-full transition-transform hover:scale-[1.02]">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
                {service.title}
              </h2>
              <p className="text-[#212529] mb-4 font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                {service.description}
              </p>
              <p className="text-sm text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                {service.duration}
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </LanguageProvider>
  );
};

export default ServicesPage;
