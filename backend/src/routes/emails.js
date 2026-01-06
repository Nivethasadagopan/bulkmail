const express = require('express');
const EmailLog = require('../models/EmailLog');
const { sendBulkMail } = require('../utils/mailer');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/send-email
// Protected
router.post('/send-email', auth, async (req, res, next) => {
  try {
    const { subject, body, recipients } = req.body;

    if (!subject || !body || !recipients) {
      return res.status(400).json({ message: 'subject, body and recipients are required' });
    }
    if (!Array.isArray(recipients)) {
      return res.status(400).json({ message: 'recipients must be an array' });
    }
    // Attempt to send
    try {
      const info = await sendBulkMail(subject, body, recipients);
      // Save success log
      const log = await EmailLog.create({
        subject, body, recipients, status: 'success', timestamp: new Date()
      });
      return res.json({ message: 'Emails sent', info, log });
    } catch (sendErr) {
      // Save failure log
      const log = await EmailLog.create({
        subject, body, recipients, status: 'failure',
        errorMessage: sendErr.message,
        timestamp: new Date()
      });
      return res.status(500).json({ message: 'Failed to send emails', error: sendErr.message, log });
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/email-history
// Protected
router.get('/email-history', auth, async (req, res, next) => {
  try {
    const logs = await EmailLog.find().sort({ timestamp: -1 }).lean();
    res.json({ logs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
