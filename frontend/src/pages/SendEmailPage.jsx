import React, { useState } from 'react';
import api from '../api/axios';

function validateEmails(raw) {
  const arr = raw.split(',').map(s => s.trim()).filter(Boolean);
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalid = arr.filter(e => !re.test(e));
  return { arr, invalid };
}

export default function SendEmailPage() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientsRaw, setRecipientsRaw] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!subject || !body || !recipientsRaw) {
      setStatus({ type: 'error', text: 'All fields are required' });
      return;
    }

    const { arr, invalid } = validateEmails(recipientsRaw);
    if (invalid.length) {
      setStatus({ type: 'error', text: `Invalid emails: ${invalid.join(', ')}` });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/send-email', {
        subject,
        body,
        recipients: arr
      });
      setStatus({ type: 'success', text: 'Emails sent and logged.' });
      setSubject(''); setBody(''); setRecipientsRaw('');
    } catch (err) {
      setStatus({ type: 'error', text: err.response?.data?.message || 'Failed to send emails' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Send Bulk Email</h2>

      {status && (
        <div className={`p-3 rounded mb-4 ${status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {status.text}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm">Subject</label>
          <input value={subject} onChange={e=>setSubject(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Body (HTML supported)</label>
          <textarea value={body} onChange={e=>setBody(e.target.value)} rows={8} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Recipients (comma-separated)</label>
          <textarea value={recipientsRaw} onChange={e=>setRecipientsRaw(e.target.value)} rows={3} className="w-full p-2 border rounded" />
        </div>

        <div>
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? 'Sending...' : 'Send Emails'}
          </button>
        </div>
      </form>
    </div>
  );
}
