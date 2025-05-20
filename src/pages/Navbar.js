'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HiMenu } from 'react-icons/hi';
import { ROUTES } from '@/lib/route';

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
    const router = useRouter();
    const pathname = usePathname(); 

    const handleUserLogin = () =>  router.push(ROUTES.USER_LOGIN);
    const handleSellerLogin = () => router.push(ROUTES.SELLER_LOGIN);
    const handleAdminLogin = () => router.push(ROUTES.ADMIN_LOGIN); 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isActive = (path) => pathname.startsWith(path);

    return (
        <nav
            className="sticky top-0 z-50 px-8 py-5 flex justify-between items-center relative text-white border-b border-zinc-800
            bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#3f3f46] shadow-md transition-shadow duration-300"
        >
            <h1
                className="text-3xl font-bold tracking-tight text-white cursor-pointer hover:underline underline-offset-4 transition-all"
                onClick={() => router.push('/')}
            >
                App Name
            </h1>

            <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 px-5 py-2 rounded-xl border border-pink-600 
                hover:from-pink-600 hover:to-indigo-600 hover:scale-105 transition-all duration-300 ease-in-out 
                flex items-center gap-2 text-white cursor-pointer shadow-md"
            >
                <HiMenu className="h-5 w-5 text-white" />
                <span className="font-semibold tracking-wide">Roles</span>
            </button>

                {showDropdown && (
                    <ul className="absolute right-0 mt-3 w-64 bg-slate-800 text-white rounded-2xl shadow-2xl z-50 border border-slate-700 p-2 space-y-1">
                    <li
                      onClick={handleAdminLogin}
                      className={`flex flex-col px-4 py-3 rounded-xl cursor-pointer transition-colors 
                        ${isActive('/Admin') ? 'bg-sky-900' : 'hover:bg-sky-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Admin</p>
                          <p className="text-xs text-gray-300">Full access to dashboard</p>
                        </div>
                      </div>
                    </li>
                  
                    <li
                      onClick={handleSellerLogin}
                      className={`flex flex-col px-4 py-3 rounded-xl cursor-pointer transition-colors 
                        ${isActive('/Seller') ? 'bg-purple-900' : 'hover:bg-purple-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16l5-5 4 4 8-8" />
                        </svg>
                        <div>
                          <p className="font-semibold">Seller</p>
                          <p className="text-xs text-gray-300">Manage products & sales</p>
                        </div>
                      </div>
                    </li>
                  
                    <li
                      onClick={handleUserLogin}
                      className={`flex flex-col px-4 py-3 rounded-xl cursor-pointer transition-colors 
                        ${isActive('/User/') ? 'bg-emerald-900' : 'hover:bg-emerald-900'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A10.003 10.003 0 0112 15a10.003 10.003 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold">User</p>
                          <p className="text-xs text-gray-300">Browse & interact</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  
                )}
            </div>
        </nav>
    );
}
