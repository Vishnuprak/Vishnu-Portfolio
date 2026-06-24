import express from 'express';
import multer from 'multer';
import { Resend } from 'resend';
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

// Resend Configuration
let resend_api_key = process.env.RESEND_API_KEY;
if (!resend_api_key || resend_api_key === 'undefined' || resend_api_key === 'null' || resend_api_key.trim() === '') {
  // Try to use a default or log warning (user needs to configure this in .env)
  resend_api_key = '';
}

const resend = new Resend(resend_api_key);

let recipient_email = process.env.RECIPIENT_EMAIL;
if (!recipient_email || recipient_email === 'undefined' || recipient_email === 'null' || recipient_email.trim() === '') {
  recipient_email = 'vishnuprakashdharmaraj@gmail.com';
}

let resend_from = process.env.RESEND_FROM;
if (!resend_from || resend_from === 'undefined' || resend_from === 'null' || resend_from.trim() === '') {
  resend_from = 'onboarding@resend.dev';
}

// Handler for sending email
async function handleSendEmail(req, res) {
  // Extract fields from body (can come from urlencoded or multipart/form-data)
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('Bad Request: Missing required fields');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `"${name} (${email})" <${resend_from}>`,
      to: recipient_email,
      replyTo: email,
      subject: subject,
      html: `
        <h3>New Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).send(`Message could not be sent. Resend Error: ${error.message}`);
    }

    console.log(`Email sent successfully via Resend from ${email}, ID: ${data?.id}`);
    res.send('Message has been sent');
  } catch (error) {
    console.error('Resend Exception:', error);
    res.status(500).send(`Message could not be sent. Server Error: ${error.message}`);
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
