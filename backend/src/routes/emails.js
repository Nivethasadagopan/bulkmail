const express = require('express');
const EmailLog = require('../models/EmailLog');
const { sendBulkMail } = require('../utils/mailer');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/send-email
router.post('/send-email', auth, async (req, res, next) => {
  try {
    let { subject, body, recipients } = req.body;

    // Validate required fields
    if (!subject || !body || !recipients) {
      return res.status(400).json({
        message: 'subject, body and recipients are required'
      });
    }

    // Convert comma-separated string → array
    if (typeof recipients === 'string') {
      recipients = recipients.split(',').map(r => r.trim());
    }

    // Validate array
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        message: 'recipients must be a non-empty array or comma-separated string'
      });
    }

    try {
      // Attempt to send emails
      const info = await sendBulkMail(subject, body, recipients);

      // Log success
      const log = await EmailLog.create({
        subject,
        body,
        recipients,
        status: 'success',
        timestamp: new Date()
      });

      return res.json({
        message: 'Emails sent successfully',
        info,
        log
      });

    } catch (sendErr) {
      console.error('Email send error:', sendErr);
      // Log failure
      const log = await EmailLog.create({
        subject,
        body,
        recipients,
        status: 'failure',
        errorMessage: sendErr.message,
        timestamp: new Date()
      });

      return res.status(500).json({
        message: 'Failed to send emails',
        error: sendErr.message,
        log
      });
    }

  } catch (err) {
    next(err);
  }
});

// GET /api/email-history
router.get('/email-history', auth, async (req, res, next) => {
  try {
    const logs = await EmailLog.find().sort({ timestamp: -1 }).lean();
    res.json({ logs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
