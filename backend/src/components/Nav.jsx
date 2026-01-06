import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div>
          <Link to="/send" className="font-bold text-lg">Bulk Mail</Link>
        </div>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/send" className="hover:underline">Send</Link>
              <Link to="/history" className="hover:underline">History</Link>
              <span className="text-sm text-gray-600">{email}</span>
              <button onClick={handleLogout} className="ml-2 px-3 py-1 rounded bg-red-500 text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
