const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify SMTP connection configuration
transport.verify((error, success) => {
  if (error) {
    console.error('SMTP connection failed:', error);
  } else {
    console.log('SMTP connection verified');
  }
});


/**
 * sendBulkMail
 * @param {String} subject
 * @param {String} body - HTML or plain text
 * @param {Array<String>} recipients
 * @returns {Promise}
 */
async function sendBulkMail(subject, body, recipients) {
  if (!Array.isArray(recipients)) recipients = [recipients];
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
  // We'll send a single message with multiple recipients in "to"
  const info = await transport.sendMail({
    from,
    to: recipients.join(','),
    subject,
    html: body
  });
  return info;
}

module.exports = { sendBulkMail, transport };
