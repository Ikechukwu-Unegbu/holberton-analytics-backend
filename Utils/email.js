import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // Configure your email service provider here
  // Example configuration for Gmail SMTP
  service: 'gmail',
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
});

export const sendEmail = async (mailOptions) => {
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result.response);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw error;
  }
};
