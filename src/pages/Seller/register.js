'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    if (!isValidEmail) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/seller-auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.replace('/SellerDashboard');
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Seller Register</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
        />
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
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-slate-900"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already a seller?{' '}
          <span onClick={() => router.push('/Seller/login')} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
