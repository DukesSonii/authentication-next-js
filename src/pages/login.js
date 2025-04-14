'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export default function Login() {
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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Save token if needed
        sessionStorage.setItem('token', data.token);

        // Fetch full user details using email
        const userRes = await fetch('/api/get-user-by-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const userData = await userRes.json();
        
        if (!userData.error) {
          sessionStorage.setItem('user', JSON.stringify(userData));
        } else {
          console.error('User fetch failed after login');
        }

        router.replace('/dashboard');
      } else {
        setError(data.error || 'Incorrect email or password.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-2 rounded-md transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 cursor-pointer'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="flex items-center justify-between gap-4">

        <button   onClick={() => signIn('google', { prompt: 'select_account' })} className="w-full text-sm flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-800 py-2 rounded-md transition duration-200 hover:bg-gray-200 cursor-pointer mt-4">
          <span className="mr-2">Login with Google</span>
          <FcGoogle size={17} />
        </button>
        <button className="w-full flex text-sm items-center justify-center bg-gray-100 border border-gray-300 text-gray-800 py-2 rounded-md transition duration-200 hover:bg-gray-200 cursor-pointer mt-4">
          <span className="mr-2">Login with Facebook</span>
          <FaFacebook size={17} />
        </button>
        </div>
        <button className="flex text-sm items-center m-auto justify-center bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded-md transition duration-200 hover:bg-gray-200 cursor-pointer mt-4">
          <span className="mr-2">Login with GitHub</span>
          <FaGithub size={17} />
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? &nbsp;
          <span
            onClick={() => router.push('/register')}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}
