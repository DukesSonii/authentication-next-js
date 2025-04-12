'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userData = JSON.parse(sessionStorage.getItem('user'));

    setName(userData?.name || '');
    setEmail(userData?.email || '');

    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }

    const handlePopState = () => {
      if (
        isAuthenticated &&
        (window.location.pathname === '/login' ||
          window.location.pathname === '/register' ||
          window.location.pathname === '/')
      ) {
        router.replace('/dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router, isAuthenticated]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    router.replace('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>

        {isAuthenticated && (
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              className="text-3xl text-gray-700 cursor-pointer hover:text-gray-900"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                <div className="p-4 text-sm text-gray-700">
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-gray-500">{email}</p>
                </div>
                <hr />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome, {name}
        </h2>
      </main>
    </div>
  );
}
