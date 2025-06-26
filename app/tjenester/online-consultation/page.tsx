import AppointmentBooking from '@/components/AppointmentBooking';

const OnlineConsultationPage = () => {
  const benefits = [
    'Personalized video consultation',
    'Design advice tailored to your needs',
    'Product recommendations and styling tips',
    'Space planning guidance',
    'Follow-up resources and support',
    'Flexible scheduling options'
  ];

  const steps = [
    'Book your preferred time slot below',
    'Receive a video call link via email',
    'Join the video call at the scheduled time',
    'Discuss your design goals and questions',
    'Get expert advice and recommendations',
    'Receive follow-up information via email'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
          Online Consultation
        </h1>
        <p className="text-xl font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
          Convenient video consultation from your home
        </p>
        <p className="text-[#212529] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] leading-relaxed">
          Our online consultation service allows you to connect with our design experts via video call. Perfect for those who prefer remote advice or cannot visit our store or schedule an in-home visit.
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
        <AppointmentBooking defaultType="online" />
      </div>
    </div>
  );
};

export default OnlineConsultationPage;
