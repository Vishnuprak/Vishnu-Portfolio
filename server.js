import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Configure multer for multipart/form-data (used by FormData in index.html)
const upload = multer();

// Middleware to parse urlencoded body (used by React app / contact.js)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// SMTP configuration
const smtp_host = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtp_port = parseInt(process.env.SMTP_PORT || '587', 10);
const smtp_username = process.env.SMTP_USERNAME || 'vishnuprakashdharmaraj@gmail.com';
const smtp_password = process.env.SMTP_PASSWORD || 'vichu@001';
const recipient_email = process.env.RECIPIENT_EMAIL || 'vishnuprakashdharmaraj@gmail.com';
const smtp_encryption = process.env.SMTP_ENCRYPTION || 'tls';

const isSecure = smtp_encryption.toLowerCase() === 'ssl' || smtp_port === 465;

const transporter = nodemailer.createTransport({
  host: smtp_host,
  port: smtp_port,
  secure: isSecure,
  auth: {
    user: smtp_username,
    pass: smtp_password,
  },
  tls: {
    // Keep it robust for local setups
    rejectUnauthorized: false
  }
});

// Handler for sending email
async function handleSendEmail(req, res) {
  // Extract fields from body (can come from urlencoded or multipart/form-data)
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('Bad Request: Missing required fields');
  }

  try {
    const mailOptions = {
      from: `"${name} (${email})" <${smtp_username}>`, // Gmail SMTP rewrites the From address to the authenticated user, so we put the sender's email in the display name
      replyTo: `"${name}" <${email}>`,
      to: recipient_email,
      subject: subject,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully from ${email}`);
    res.send('Message has been sent');
  } catch (error) {
    console.error('Mailer Error:', error);
    res.status(500).send(`Message could not be sent. Mailer Error: ${error.message}`);
  }
}

// Support both POST to /contact_process.php and a cleaner route /contact_process
app.post('/contact_process.php', upload.none(), handleSendEmail);
app.post('/contact_process', upload.none(), handleSendEmail);

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Node backend is running');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
