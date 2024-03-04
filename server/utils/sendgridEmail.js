const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailWithSendGrid = async (subject, to, html, cc = [], bcc = []) => {
  try {
    const msg = {
      to,
      cc, // CC recipients
      bcc, // BCC recipients
      from: "admin@flic.tech",
      html,
      subject
    };

    await sgMail.send(msg).then(()=>{
      console.log('Email sent successfully');
    }).catch((e)=>{
      console.log(e)
    })
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmailWithSendGrid };