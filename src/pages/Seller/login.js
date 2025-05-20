'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar';

export default function SellerLogin() {
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

    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    if (!isValidEmail) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/seller-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.replace('/seller-dashboard');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>    
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-yellow-400 flex justify-center items-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Seller Login</h2>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <span onClick={() => router.push('/Seller/register')} className="text-orange-700 cursor-pointer hover:underline">
              Register here
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
