// backend/config/email.js
const nodemailer = require('nodemailer');

/**
 * Create and return Nodemailer transporter
 * Uses SMTP configuration from environment variables
 */
function createTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 * @param {string} [options.text] - Plain text body
 */
async function sendEmail({ to, subject, html, text }) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Himflax IT" <${process.env.SMTP_FROM || 'noreply@himflax.com'}>`,
      to,
      subject,
      html,
      text: text || '',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    // Don't throw — email failure shouldn't break the request
    return null;
  }
}

module.exports = { sendEmail, createTransporter };
