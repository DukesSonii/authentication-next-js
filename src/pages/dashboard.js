'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dropdownRef = useRef();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userData = JSON.parse(sessionStorage.getItem('user'));

    if (status === "authenticated" && session?.user) {
      // Google login
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setIsAuthenticated(true);
    } else if (token && userData) {
      // Manual login
      setName(userData?.name || '');
      setEmail(userData?.email || '');
      setIsAuthenticated(true);
    } else if (!token && status !== "loading" && !session?.user) {
      // Not authenticated
      router.replace('/login');
    }
  }, [session, status, router]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    signOut({ callbackUrl: '/login' });
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="text-center mt-10 text-gray-800">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>

        {isAuthenticated && (
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              className="text-3xl cursor-pointer"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-10">
                <div className="p-4 text-sm">
                  <p className="font-semibold">{name}</p>
                  <p className="text-xs text-gray-600">{email}</p>
                </div>
                <hr />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="text-center mt-20">
        <h2 className="text-3xl font-bold">Welcome to Dashboard</h2>
        <p className="mt-2">You're logged in as {email}</p>
      </main>
    </div>
  );
}
