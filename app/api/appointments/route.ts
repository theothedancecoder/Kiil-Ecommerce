import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Store locations configuration
const storeLocations = {
  oslo: {
    name: 'Kiil Store Oslo',
    address: 'Grensen 8, 0159 Oslo',
    email: 'theothecoder@gmail.com',
    phone: '+47 22 42 88 90'
  },
  gjovik: {
    name: 'Kiil Store Gjøvik',
    address: 'Huntonstranda 5, 2815 Gjøvik',
    email: 'theothecoder@gmail.com',
    phone: '+47 61 14 55 00'
  }
};

// Consultation types
const consultationTypes = {
  'in-store': 'In-Store Consultation',
  'in-home': 'In-Home Consultation',
  'phone': 'Phone Consultation',
  'online': 'Online Consultation'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      type, 
      storeLocation, 
      date, 
      time, 
      phone, 
      email, 
      address, 
      notes 
    } = body;

    // Validate required fields
    if (!type || !date || !time || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate store location for in-store consultations
    if (type === 'in-store' && (!storeLocation || !storeLocations[storeLocation as keyof typeof storeLocations])) {
      return NextResponse.json(
        { error: 'Invalid store location' },
        { status: 400 }
      );
    }

    const store = storeLocation ? storeLocations[storeLocation as keyof typeof storeLocations] : null;
    const consultationType = consultationTypes[type as keyof typeof consultationTypes];
    const appointmentDate = new Date(date);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generate appointment ID
    const appointmentId = `KIIL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Customer confirmation email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Appointment Confirmation - Kiil</title>
          <style>
            body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f0f8ff; padding: 30px; text-align: center; border-radius: 8px; }
            .content { padding: 30px 0; }
            .appointment-details { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Confirmed!</h1>
              <p>Thank you for booking your ${consultationType} with Kiil</p>
            </div>
            
            <div class="content">
              <h2>Appointment Details</h2>
              <div class="appointment-details">
                <p><strong>Appointment ID:</strong> ${appointmentId}</p>
                <p><strong>Type:</strong> ${consultationType}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${time}</p>
                ${store ? `
                  <p><strong>Location:</strong> ${store.name}</p>
                  <p><strong>Address:</strong> ${store.address}</p>
                  <p><strong>Store Phone:</strong> ${store.phone}</p>
                ` : ''}
                ${address ? `<p><strong>Your Address:</strong> ${address}</p>` : ''}
                ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
              </div>
              
              <h3>What to Expect</h3>
              ${type === 'in-store' ? `
                <p>Please arrive 5 minutes before your scheduled time. Our expert consultant will be ready to help you explore our collection and discuss your design needs.</p>
              ` : type === 'in-home' ? `
                <p>Our consultant will arrive at your location at the scheduled time. Please ensure someone is available to provide access to the space you'd like to discuss.</p>
              ` : type === 'phone' ? `
                <p>We will call you at ${phone} at the scheduled time. Please ensure you're available to take the call.</p>
              ` : `
                <p>You will receive a video call link via email 30 minutes before your scheduled consultation.</p>
              `}
              
              <h3>Need to Make Changes?</h3>
              <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance:</p>
              ${store ? `
                <p>Email: ${store.email}<br>
                Phone: ${store.phone}</p>
              ` : `
                <p>Email: info@kiil.no<br>
                Phone: +47 22 42 88 90</p>
              `}
            </div>
            
            <div class="footer">
              <p>We look forward to helping you create your perfect space!</p>
              <p>Best regards,<br>The Kiil Team</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Store notification email
    const storeEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Appointment Booking - Kiil</title>
          <style>
            body { font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #000; color: white; padding: 30px; text-align: center; border-radius: 8px; }
            .content { padding: 30px 0; }
            .appointment-details { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .customer-details { background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Appointment Booking</h1>
              <p>A new ${consultationType} has been scheduled</p>
            </div>
            
            <div class="content">
              <div class="appointment-details">
                <h3>Appointment Details</h3>
                <p><strong>Appointment ID:</strong> ${appointmentId}</p>
                <p><strong>Type:</strong> ${consultationType}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${time}</p>
                ${store ? `
                  <p><strong>Location:</strong> ${store.name}</p>
                  <p><strong>Address:</strong> ${store.address}</p>
                ` : ''}
              </div>
              
              <div class="customer-details">
                <h3>Customer Information</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
                ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
              </div>
              
              <h3>Action Required</h3>
              <p>Please:</p>
              <ul>
                <li>Add this appointment to your calendar</li>
                <li>Prepare any relevant materials or product information</li>
                <li>Contact the customer if you need to confirm any details</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer confirmation email
    const customerEmail = await resend.emails.send({
      from: 'Kiil <appointments@kiil.no>',
      to: [email],
      subject: `Appointment Confirmed - ${consultationType} on ${formattedDate}`,
      html: customerEmailHtml,
    });

    // Send store notification email
    const storeEmail = 'theothecoder@gmail.com';
    const storeNotification = await resend.emails.send({
      from: 'Kiil Appointments <appointments@kiil.no>',
      to: [storeEmail],
      subject: `New ${consultationType} Booking - ${formattedDate} at ${time}`,
      html: storeEmailHtml,
    });

    // TODO: Save appointment to database (Sanity)
    // This would involve creating a new document in Sanity with all the appointment details

    return NextResponse.json({
      success: true,
      appointmentId,
      message: 'Appointment booked successfully',
      emails: {
        customer: customerEmail.data?.id,
        store: storeNotification.data?.id
      }
    });

  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    );
  }
}
