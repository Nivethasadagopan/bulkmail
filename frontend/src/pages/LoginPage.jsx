import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/login', { email, password });

      // Save token + email
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);

      navigate('/send');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            type="password"
            required
          />
        </div>

        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}
