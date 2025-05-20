'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { FaFacebook } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import Navbar from '../navbar';
import { ROUTES } from '@/lib/route';
import { FaApple, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState('');
  const { data: session, status } = useSession();  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/user-dashboard');
    }
  }, [status]);

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
        router.replace('/user-dashboard');
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
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="bg-white shadow-lg w-full max-w-5xl p-4 flex rounded-[25px]">
          {/* Left Section: Login Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
            <h2 className="roboto-slab text-2xl font-bold mb-2 text-[var(--button-bg)] text-center">Login</h2>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Join millions of health and beauty professionals around the world that trust MeTime to improve their businesses’ time efficiency
            </p>
            <div className="w-full border-t border-gray-300 mb-6"></div>

            <div className="w-full mb-4 relative">
              <label className="text-sm text-gray-700 mb-1 block">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="w-full mb-4 relative">
              <label className="text-sm text-gray-700 mb-1 block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full bg-[var(--button-bg)] text-[var(--button-text)] py-2 rounded-md transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--button-hover-bg)] cursor-pointer'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Divider with Text */}
            <div className="flex items-center my-6 w-full">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4  text-sm font-medium text-gray-600">Other Login</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex items-center justify-around gap-4 w-full">
              <button
                onClick={() =>
                  signIn('google', {
                    prompt: 'select_account',
                    callbackUrl: '/user-dashboard',
                  })
                }
                className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-lg hover:shadow-xl transition duration-200"
              >
                <FcGoogle size={24} />
              </button>

              <button
                onClick={() =>
                  signIn('apple', {
                    prompt: 'select_account',
                    callbackUrl: '/user-dashboard',
                  })
                }
                className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-lg hover:shadow-xl transition duration-200"
              >
                <FaApple size={22} />
              </button>

              <button
                onClick={() =>
                  signIn('facebook', {
                    prompt: 'select_account',
                    callbackUrl: '/user-dashboard',
                  })
                }
                className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-lg hover:shadow-xl transition duration-200"
              >
                <FaFacebook size={22} color="#1877F2" />
              </button>
            </div>

          </div>

          {/* Right Section: Image and Text */}
          <div className="hidden md:flex md:w-1/2 rounded-[25px] p-8 flex-col justify-end items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/user-login-bg.svg')" }}>
            <div className="text-white text-center mb-4">
              <h3 className="text-xl font-bold mb-2">Automate Appointments.</h3>
              <h3 className="text-xl font-bold">Earn More.</h3>
              <p className="text-sm mt-2">Manage Your Staff.</p>
            </div>
            <button
              onClick={() => router.push(ROUTES.USER_REGISTER)}
              className="w-full bg-[var(--button-bg)] text-[var(--button-text)] py-2 rounded-md transition duration-200 hover:bg-[var(--button-hover-bg)] cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}