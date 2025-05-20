'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin-dashboard');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar />    
        <div className="min-h-screen bg-gradient-to-br from-slate-800 to-blue-900 flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Admin Login</h2>

            <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md transition duration-300  ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
            {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
        </div>
    </>
  );
};

export default AdminLogin;
