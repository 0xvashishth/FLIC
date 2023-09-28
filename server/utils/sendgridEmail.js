const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailWithTemplate = async (templateId, to, dynamicTemplateData, cc = [], bcc = []) => {
  try {
    const msg = {
      to,
      cc, // CC recipients
      bcc, // BCC recipients
      from: process.env.SENDGRID_SENDER_EMAIL,
      templateId,
      dynamicTemplateData,
    };

    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmailWithTemplate };