// backend/controllers/contactController.js
const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendEmail } = require('../config/email');

/**
 * @desc    Submit contact form
 * @route   POST /api/v1/contact
 * @access  Public
 */
async function submitContact(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Save to database
    const contact = await Contact.create({ name, email, phone, service, message });

    // Send notification email to admin (non-blocking)
    sendEmail({
      to: process.env.SMTP_USER || 'admin@himflax.com',
      subject: `New Contact Inquiry — ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D4ED8;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Service:</td><td style="padding: 8px;">${service}</td></tr>
          </table>
          <h3>Message:</h3>
          <p style="background: #f1f5f9; padding: 16px; border-radius: 8px;">${message}</p>
        </div>
      `,
    }).catch(() => {});

    // Send auto-reply to user
    sendEmail({
      to: email,
      subject: 'Thank you for contacting Himflax IT',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D4ED8;">Thank You, ${name}!</h2>
          <p>We have received your inquiry about <strong>${service}</strong>.</p>
          <p>Our team will review your message and get back to you within 24 hours.</p>
          <br />
          <p>Best regards,</p>
          <p><strong>Himflax Information Technology</strong></p>
        </div>
      `,
    }).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitContact };
