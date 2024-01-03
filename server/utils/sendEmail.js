require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter using the provided SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Set to true if using a secure connection (e.g., SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email
const sendEmail = async (subject, recipients = [], body, cc = [], bcc = []) => {
  try {
    // Construct the email message
    const mailOptions = {
      from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
      to: recipients.join(', '), // Recipient email addresses as a comma-separated string
      subject: subject,
      html: body,
      cc: cc.join(', '), // CC email addresses as a comma-separated string
      bcc: bcc.join(', '), // BCC email addresses as a comma-separated string
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
