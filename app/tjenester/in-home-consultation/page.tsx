import AppointmentBooking from '@/components/AppointmentBooking';

const InHomeConsultationPage = () => {
  const benefits = [
    'Personalized consultation in your own space',
    'Expert measurements and space planning',
    'Color and material recommendations',
    'Furniture placement suggestions',
    'Lighting and accessory advice',
    'Custom solutions for your specific needs'
  ];

  const steps = [
    'Book your preferred time slot below',
    'Provide your address and contact details',
    'Our consultant will arrive at the scheduled time',
    'Walk through your space together',
    'Discuss your vision and requirements',
    'Receive detailed recommendations and next steps'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
          In-Home Consultation
        </h1>
        <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
          Expert design consultation in the comfort of your home
        </p>
        <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] leading-relaxed">
          Our in-home consultation service brings our design expertise directly to you. Our consultant will visit your space, understand your lifestyle, and provide tailored recommendations that perfectly match your needs and preferences.
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
        <AppointmentBooking defaultType="in-home" />
      </div>
    </div>
  );
};

export default InHomeConsultationPage;
