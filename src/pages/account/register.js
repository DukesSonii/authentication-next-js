'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar';
import { ROUTES } from '@/lib/route';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    setError('');
  
    if (!email || !password || !name) {
      setError('All fields are required.');
      return;
    }
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    if (!isValidEmail) {
      setError('Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
  
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        router.replace('/user-dashboard'); 
      } else {
        setError(data.error || 'Registration failed.');
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
        <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl p-4 flex animate-fadeIn">
          {/* Left Section: Image and Text */}
          <div className="hidden md:flex md:w-[40%] rounded-[25px] p-8 flex-col justify-end items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/user-bg-signup.svg')" }}>
            <h3 className="text-2xl font-bold text-white text-center mb-4">
              Start Taking Appointments and Payments.
            </h3>
            <button
              onClick={() => router.push(ROUTES.USER_LOGIN)}
              className="w-full bg-[var(--button-bg)] text-[var(--button-text)] py-2 rounded-md transition duration-200 hover:bg-[var(--button-hover-bg)] cursor-pointer"
            >
              Login
            </button>
          </div>

          {/* Right Section: Registration Form */}
          <div className="w-full md:w-[60%] p-8 flex flex-col items-center">
            <h2 className="roboto-slab text-2xl font-bold mb-2 text-center text-[var(--button-bg)]">Create Account</h2>
            <p className="text-sm text-gray-500 mb-4 text-center">
              Join millions of health and beauty professionals around the world that trust MeTime to improve their businesses’ time efficiency
            </p>
            <div className="w-full border-t border-gray-300 mb-6"></div>

            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Last Name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Business Name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Business Tax ID <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Business Tax ID"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Mobile Number"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-6 mt-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio text-blue-600 h-4 w-4"
                    />
                    <span>Male</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio text-blue-600 h-4 w-4"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

            </div>

            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

            <button
              onClick={handleRegister}
              disabled={loading}
              className={`w-full bg-[var(--button-bg)] text-[var(--button-text)] py-2 rounded-md transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--button-hover-bg)] cursor-pointer'
              }`}
            >
              {loading ? 'Registering...' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}