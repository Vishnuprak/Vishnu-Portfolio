import { Resend } from 'resend';

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

  let resend_api_key = process.env.RESEND_API_KEY;
  if (!resend_api_key || resend_api_key === 'undefined' || resend_api_key === 'null' || resend_api_key.trim() === '') {
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

  console.log('[DEBUG] Resend config:', {
    recipient: recipient_email,
    from: resend_from,
    hasApiKey: !!resend_api_key
  });
  console.log('[DEBUG] Request body:', req.body);

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

    return res.send('Message has been sent');
  } catch (error) {
    console.error('Resend Exception:', error);
    return res.status(500).send(`Message could not be sent. Server Error: ${error.message}`);
  }
}
