import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
       <nav className="bg-gray-950 px-8 py-4 shadow-md flex justify-between items-center relative">
        <h1 className="text-3xl font-extrabold tracking-wide text-white">App Name</h1>

        {/* Role Switch Part */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition flex items-center gap-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Roles
          </button>

          {showDropdown && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 transition-all duration-200">
              <li
                onClick={() => {}}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                </svg>
                Admin
              </li>
              <li
                onClick={handleSellerLogin}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer"
              >
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16l5-5 4 4 8-8" />
                </svg>
                Seller
              </li>
              <li
                onClick={handleUserLogin}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300 rounded-lg cursor-pointer"
              >
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.003 10.003 0 0112 15a10.003 10.003 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                User
              </li>
            </ul>
          )}
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
        <h2 className="text-5xl font-bold mb-6">Welcome to App Name</h2>
        <p className="text-gray-300 text-lg max-w-xl mb-10">
          Manage your daily tasks efficiently with a role-based access system. Choose your role from the top to get started.
        </p>
        <button
          onClick={handleUserLogin}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105"
        >
          Get Started as User
        </button>
      </section>
    </div>
  );
}
