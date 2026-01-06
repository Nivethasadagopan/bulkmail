import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SendEmailPage from './pages/SendEmailPage';
import EmailHistoryPage from './pages/EmailHistoryPage';
import Nav from './components/Nav';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/send" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendEmailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <EmailHistoryPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
