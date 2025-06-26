"use client";

import { useState } from 'react';

// Store locations configuration
const storeLocations = [
  {
    id: 'oslo',
    name: 'Kiil Store Oslo',
    address: 'Grensen 8, 0159 Oslo',
    timeZone: 'Oslo (GMT+02:00)',
  },
  {
    id: 'gjovik',
    name: 'Kiil Store Gjøvik',
    address: 'Huntonstranda 5, 2815 Gjøvik',
    timeZone: 'Gjøvik (GMT+02:00)',
  }
];

// Consultation type configuration
const consultationTypes = [
  {
    id: 'in-store',
    title: 'In-Store Consultation',
    description: 'Meet with our expert at your selected Kiil Store location',
    duration: '1 hour',
    timeSlots: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
    icon: '🏬',
    requiresAddress: false,
    requiresStoreSelection: true,
  },
  {
    id: 'in-home',
    title: 'In-Home Consultation',
    description: 'Our expert will visit your space for personalized advice',
    duration: '2 hours',
    timeSlots: ["10:00", "13:00", "15:00"], // Fewer slots due to travel time
    icon: '🏠',
    requiresAddress: true,
    requiresStoreSelection: false,
  },
  {
    id: 'phone',
    title: 'Phone Consultation',
    description: 'Discuss your design needs over the phone',
    duration: '30 minutes',
    timeSlots: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
    icon: '📞',
    requiresAddress: false,
    requiresStoreSelection: false,
  },
  {
    id: 'online',
    title: 'Online Consultation',
    description: 'Video consultation from the comfort of your home',
    duration: '45 minutes',
    timeSlots: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"],
    icon: '💻',
    requiresAddress: false,
    requiresStoreSelection: false,
  }
];

interface ConsultationDetails {
  address?: string;
  phone?: string;
  email?: string;
  notes?: string;
  storeLocation?: string;
}

interface AppointmentBookingProps {
  defaultType?: string;
}

const AppointmentBooking = ({ defaultType }: AppointmentBookingProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(defaultType || null);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState<ConsultationDetails>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  // Get current date and next available business days (Monday to Saturday)
  const getDates = () => {
    const dates = [];
    const today = new Date();
    const currentDate = new Date(today);
    
    while (dates.length < 7) {
      const dayOfWeek = currentDate.getDay();
      // Include Monday (1) to Saturday (6), exclude Sunday (0)
      if (dayOfWeek !== 0) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Format date for display
  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  // Get selected consultation type
  const getSelectedType = () => {
    return consultationTypes.find(type => type.id === selectedType);
  };

  // Get selected store location
  const getSelectedStore = () => {
    return storeLocations.find(store => store.id === selectedStore);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const consultationType = getSelectedType();
    const storeLocation = getSelectedStore();
    if (!consultationType || !selectedDate || !selectedTime) return;
    if (consultationType.requiresStoreSelection && !storeLocation) return;

    // Validate required fields
    if (!details.phone || !details.email) {
      alert('Please fill in all required fields.');
      return;
    }

    if (consultationType.requiresAddress && !details.address) {
      alert('Please provide your address for the in-home consultation.');
      return;
    }

    setIsSubmitting(true);

    try {
      const appointment = {
        type: consultationType.id,
        storeLocation: storeLocation?.id,
        date: selectedDate,
        time: selectedTime,
        phone: details.phone,
        email: details.email,
        address: details.address,
        notes: details.notes
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingSuccess(true);
        setAppointmentId(result.appointmentId);
        // Reset form after successful booking
        setTimeout(() => {
          setSelectedType(null);
          setSelectedStore(null);
          setSelectedDate(null);
          setSelectedTime(null);
          setDetails({});
          setBookingSuccess(false);
          setAppointmentId(null);
        }, 5000);
      } else {
        throw new Error(result.error || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset selections when consultation type changes
  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    setSelectedStore(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setDetails({});
  };

  // Reset selections when store changes
  const handleStoreChange = (storeId: string) => {
    setSelectedStore(storeId);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="bg-[#f0f8ff] rounded-xl p-6 w-full max-w-4xl mx-auto">
      {/* Consultation Type Selection */}
      <div className="mb-8">
        <h2 className="text-[24px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-6">
          Select Consultation Type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {consultationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`p-6 rounded-lg border-2 text-left transition-colors ${
                selectedType === type.id
                  ? 'border-black bg-black text-white'
                  : 'border-[#add8e6] hover:border-black'
              }`}
            >
              <div className="text-[24px] mb-2">{type.icon}</div>
              <div className="text-[18px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-bold mb-2">
                {type.title}
              </div>
              <div className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                {type.description}
              </div>
              <div className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mt-2">
                Duration: {type.duration}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedType && (
        <>
          {/* Store Location Selection */}
          {getSelectedType()?.requiresStoreSelection && (
            <div className="mb-8">
              <h3 className="text-[18px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
                Select Store Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storeLocations.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => handleStoreChange(store.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedStore === store.id
                        ? 'border-black bg-black text-white'
                        : 'border-[#add8e6] hover:border-black'
                    }`}
                  >
                    <div className="text-[16px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-bold mb-2">
                      {store.name}
                    </div>
                    <div className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                      {store.address}
                    </div>
                    <div className="text-[12px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mt-1 opacity-75">
                      Time Zone: {store.timeZone}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date Selection */}
          {(!getSelectedType()?.requiresStoreSelection || selectedStore) && (
            <div className="mb-8">
              <h3 className="text-[18px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
                Select Date
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {getDates().map((date) => {
                  const formattedDate = formatDate(date);
                  const isSelected = selectedDate === date.toISOString();
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date.toISOString())}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        isSelected 
                          ? 'border-black bg-black text-white' 
                          : 'border-[#add8e6] hover:border-black'
                      }`}
                    >
                      <div className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-medium">
                        {formattedDate.day}
                      </div>
                      <div className="text-[16px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-bold">
                        {formattedDate.date}
                      </div>
                      <div className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                        {formattedDate.month}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Time Selection */}
          {selectedDate && (!getSelectedType()?.requiresStoreSelection || selectedStore) && (
            <div className="mb-8">
              <h3 className="text-[18px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
                Select Time
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {getSelectedType()?.timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                        isSelected 
                          ? 'border-black bg-black text-white' 
                          : 'border-[#add8e6] hover:border-black'
                      }`}
                    >
                      <span className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                        {time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Details Form */}
          {selectedTime && (!getSelectedType()?.requiresStoreSelection || selectedStore) && (
            <div className="mb-8">
              <h3 className="text-[18px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] text-[#212529] mb-4">
                Contact Details
              </h3>
              <div className="space-y-4">
                {getSelectedType()?.requiresAddress && (
                  <div>
                    <label className="block text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mb-2">
                      Address *
                    </label>
                    <textarea
                      value={details.address || ''}
                      onChange={(e) => setDetails({ ...details, address: e.target.value })}
                      className="w-full p-3 border-2 border-[#add8e6] rounded-lg focus:border-black outline-none"
                      rows={3}
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={details.phone || ''}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    className="w-full p-3 border-2 border-[#add8e6] rounded-lg focus:border-black outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={details.email || ''}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    className="w-full p-3 border-2 border-[#add8e6] rounded-lg focus:border-black outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={details.notes || ''}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    className="w-full p-3 border-2 border-[#add8e6] rounded-lg focus:border-black outline-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {bookingSuccess && (
            <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
              <h3 className="text-[18px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-bold mb-2">
                Booking Confirmed! 🎉
              </h3>
              <p className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mb-2">
                Your {getSelectedType()?.title} has been successfully booked.
              </p>
              <p className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] mb-2">
                <strong>Appointment ID:</strong> {appointmentId}
              </p>
              <p className="text-[14px] font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif']">
                Confirmation emails have been sent to both you and our store. We look forward to meeting with you!
              </p>
            </div>
          )}

          {/* Confirm Button */}
          {selectedTime && (!getSelectedType()?.requiresStoreSelection || selectedStore) && !bookingSuccess && (
            <div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-['Montserrat', 'Helvetica', 'Verdana', 'sans-serif'] font-medium transition-colors"
              >
                {isSubmitting ? 'Booking...' : `Confirm ${getSelectedType()?.title}`}
                {selectedStore && !isSubmitting && ` at ${getSelectedStore()?.name}`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentBooking;
