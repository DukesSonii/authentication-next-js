'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { getSession } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.replace('/dashboard');
      }
    };
    checkSession();
  }, [router]);
  

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

      if (res.ok) {
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

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm font-medium">or continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() =>
              signIn('google', {
                prompt: 'select_account',
                callbackUrl: '/dashboard',
              })
            }
            className="w-full text-sm flex items-center justify-center bg-white border border-gray-300 text-gray-800 py-2 rounded-md transition duration-200 hover:shadow-md cursor-pointer"
          >
            <span className="mr-2">Google</span>
            <FcGoogle size={17} />
          </button>

          <button
            onClick={() =>
              signIn('facebook', {
                prompt: 'select_account',
                callbackUrl: '/dashboard',
              })
            }
            className="w-full flex text-sm items-center justify-center bg-[#1877F2] text-white py-2 rounded-md transition duration-200 hover:shadow-md cursor-pointer"
          >
            <span className="mr-2">Facebook</span>
            <FaFacebook size={17} />
          </button>
        </div>

        <button
          onClick={() =>
            signIn('github', {
              prompt: 'select_account',
              callbackUrl: '/dashboard',
            })
          }
          className="flex text-sm items-center justify-center bg-black text-white px-4 py-2 rounded-md transition duration-200 hover:shadow-md cursor-pointer mt-4 w-full"
        >
          <span className="mr-2">GitHub</span>
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
