import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer Transporter Configuration using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chainperfume0@gmail.com', // Replace with your Gmail address
    pass: 'qthgnlvfdxwdxham',  // Replace with the generated App Password
  },
});

// API Route to Send Email
app.post('/send-email', async (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: 'chainperfume0@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

app.listen(PORT, () => {
  console.log(`Email server running at http://localhost:${PORT}`);
});
