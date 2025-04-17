import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';

export default function MainRole() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleUserLogin = () => {
    router.push('/User/login');
  };
  const handleSellerLogin = () => {
    router.push('/Seller/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white font-sans">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white">Welcome to App Name</h2>
        <p className="text-gray-300 text-lg max-w-2xl mb-10">
          Simplify your workday with role-based access. Select your role from the top-right menu to begin.
        </p>
        <button
          onClick={handleUserLogin}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg transition-colors cursor-pointer"
        >
          Get Started as User
        </button>
      </section>
    </div>
  );
}
