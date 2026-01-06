import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function EmailHistoryPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setError('');
      try {
        const res = await api.get('/email-history');
        if (!mounted) return;
        setLogs(res.data.logs || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Loading history...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Email History</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <div className="space-y-3">
        {logs.map(log => (
          <div key={log._id} className="bg-white p-4 shadow rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{log.subject}</h3>
                <p className="text-sm text-gray-600 prose-preview" dangerouslySetInnerHTML={{ __html: log.body }} />
                <div className="text-xs text-gray-500 mt-2">Recipients: {log.recipients.join(', ')}</div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded text-sm ${log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {log.status}
                </div>
                <div className="text-xs text-gray-500 mt-2">{new Date(log.timestamp).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
        {logs.length === 0 && <div className="text-gray-600">No email logs yet.</div>}
      </div>
    </div>
  );
}
