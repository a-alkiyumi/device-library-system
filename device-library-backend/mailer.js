'use strict';

const nodemailer = require('nodemailer');

const { EMAIL_USER, EMAIL_PASS } = process.env;
const isConfigured = Boolean(EMAIL_USER && EMAIL_PASS);

const transporter = isConfigured
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    })
  : null;

if (!isConfigured) {
  console.warn(
    'EMAIL_USER/EMAIL_PASS not set — booking emails will be logged to the console instead of sent.'
  );
}

async function sendMail({ to, subject, text }) {
  if (!isConfigured) {
    console.log(`[email not sent — no credentials configured]\nTo: ${to}\nSubject: ${subject}\n${text}`);
    return;
  }

  try {
    await transporter.sendMail({ from: EMAIL_USER, to, subject, text });
  } catch (err) {
    console.error('Failed to send email:', err.message);
  }
}

module.exports = { sendMail };
