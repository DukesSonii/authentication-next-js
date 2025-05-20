'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

export default function seller-dashboard() {
  const [sellerInfo, setSellerInfo] = useState({ name: '', email: '' });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch('/api/get-current-seller');
        if (!res.ok) throw new Error('Not logged in');
        const data = await res.json();
        setSellerInfo({ name: data.name, email: data.email });
      } catch (err) {
        router.replace(ROUTES.SELLER_LOGIN);
      }
    };
    fetchSeller();
  }, [router]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/seller-auth/logout', { method: 'POST' });
    router.replace(ROUTES.SELLER_LOGIN);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 font-sans">
       <header className="flex justify-between items-center px-8 py-4 bg-slate-900 text-white shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">Seller Dashboard</h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-4xl text-white hover:text-gray-300 transition-all cursor-pointer"
          >
            <FaUserCircle />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-3 w-72 bg-white text-gray-800 rounded-lg shadow-lg p-4 z-20 transition-all duration-200">
              <div className="mb-2">
                <p className="text-lg font-semibold text-slate-800">{sellerInfo.name}</p>
                <p className="text-sm text-gray-600">{sellerInfo.email}</p>
              </div>
              <hr className="my-3 border-gray-300" />
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Welcome, <span className="text-blue-600">{sellerInfo.name}</span>!
          </h2>
          <p className="text-gray-600 text-base">
            You are now logged in as a <strong className="text-green-700">Seller</strong>.
          </p>
          <p className="text-gray-500 mt-3">
            Manage your store, update products, and monitor orders directly from your dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}
