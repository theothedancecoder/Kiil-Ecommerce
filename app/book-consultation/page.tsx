import AppointmentBooking from '@/components/AppointmentBooking';

export default function BookConsultationPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-[32px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-8 text-center">
        Book a Design Consultation
      </h1>
      <AppointmentBooking />
    </main>
  );
}
