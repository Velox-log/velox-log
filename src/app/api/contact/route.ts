import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      subject,
      message,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to your company
    await resend.emails.send({
      from: 'Velox Logistics <noreply@veloxlogistics.site>',
      to: 'veloxlogistics0@gmail.com',
      subject: `New Contact Form: ${subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ''}
          </div>

          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This email was sent from the Velox Logistics contact form.
          </p>
        </div>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Velox Logistics <noreply@veloxlogistics.site>',
      to: email,
      subject: 'We received your message - Velox Logistics',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Thank You for Contacting Us!</h2>
          
          <p>Dear ${firstName},</p>
          
          <p>We've received your message and appreciate you reaching out to Velox Logistics. Our team will review your inquiry and get back to you within 24 hours.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>If you need immediate assistance, please call us at <strong>+1 (555) 123-4567</strong>.</p>

          <p>Best regards,<br/>
          <strong>Velox Logistics Team</strong></p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;"/>
          
          <p style="color: #6b7280; font-size: 12px;">
            Velox Logistics | 123 Logistics Ave, New York, NY 10001<br/>
            <a href="mailto:info@Veloxlogistics0@gmail.com" style="color: #1e40af;">info@Veloxlogistics0@gmail.com</a> | 
            <a href="tel:+15551234567" style="color: #1e40af;">+1 (555) 123-4567</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}