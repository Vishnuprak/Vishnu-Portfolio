import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Add CORS headers for safety
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Extract fields from body (Vercel automatically parses urlencoded and JSON bodies)
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send('Bad Request: Missing required fields');
  }

  const smtp_host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtp_port = parseInt(process.env.SMTP_PORT || '587', 10);
  
  // Retrieve config and sanitize if the string "undefined", "null", or empty is passed
  let smtp_username = process.env.SMTP_USERNAME;
  if (!smtp_username || smtp_username === 'undefined' || smtp_username === 'null' || smtp_username.trim() === '') {
    smtp_username = 'vishnuprakashdharmaraj@gmail.com';
  }

  let smtp_password = process.env.SMTP_PASSWORD;
  if (!smtp_password || smtp_password === 'undefined' || smtp_password === 'null' || smtp_password.trim() === '') {
    smtp_password = 'tyanmnjrxomqgztg';
  }

  let recipient_email = process.env.RECIPIENT_EMAIL;
  if (!recipient_email || recipient_email === 'undefined' || recipient_email === 'null' || recipient_email.trim() === '') {
    recipient_email = smtp_username;
  }

  const smtp_encryption = process.env.SMTP_ENCRYPTION || 'tls';

  console.log('[DEBUG] SMTP config:', {
    host: smtp_host,
    port: smtp_port,
    username: smtp_username,
    recipient: recipient_email,
    encryption: smtp_encryption,
    hasPassword: !!smtp_password
  });
  console.log('[DEBUG] Request body:', req.body);

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
      rejectUnauthorized: false
    }
  });

  try {
    const mailOptions = {
      from: `"${name} (${email})" <${smtp_username}>`,
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
    return res.send('Message has been sent');
  } catch (error) {
    console.error('Mailer Error:', error);
    return res.status(500).send(`Message could not be sent. Mailer Error: ${error.message}`);
  }
}
