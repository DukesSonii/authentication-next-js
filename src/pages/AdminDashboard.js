'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserShield } from 'react-icons/fa';

const AdminDashboard = () => {
    const [admin, setAdmin] = useState({ name: '', email: '' });
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();
      const router = useRouter();

    useEffect(() => {
        const fetchAdmin = async () => {
        try {
            const res = await fetch('/api/admin-auth/get-current-admin');
            const data = await res.json();

            if (res.ok) {
            setAdmin({ name: data.admin.name, email: data.admin.email });
            } else {
                router.push('/Admin/login');
            }
        } catch (error) {
            router.push('/Admin/login');
        }
        };

        fetchAdmin();
    }, [router]);

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
        const res = await fetch('/api/admin-auth/logout', { method: 'POST' });
        if (res.ok) {
        router.push('/Admin/login');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 font-sans">
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-5 bg-slate-900 text-white shadow-lg">
            <h1 className="text-3xl font-extrabold tracking-wide">Admin Dashboard</h1>

            <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="text-4xl hover:text-gray-400 transition-all duration-300 cursor-pointer"
            >
                <FaUserShield />
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-4 w-72 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-200 p-4 z-30">
                <div className="mb-3">
                    <p className="text-lg font-semibold text-slate-800">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                </div>
                <hr className="my-3 border-gray-300" />
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition cursor-pointer"
                >
                    Logout
                </button>
                </div>
            )}
            </div>
        </header>

        {/* Main Section */}
        <main className="p-10 max-w-5xl mx-auto">
            <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Welcome, <span className="text-indigo-600">{admin.name}</span>!
            </h2>
            <p className="text-gray-700 text-lg">
                You are logged in as an <strong className="text-red-600">Admin</strong>.
            </p>
            <p className="text-gray-500 mt-5 leading-relaxed">
                From this dashboard, you have full control over managing users, viewing reports, monitoring activities,
                and configuring system-wide settings. Use the navigation options or icons to access different features.
            </p>
            </div>

            {/* Future Admin Features Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">User Management</h3>
                <p className="text-gray-600 text-sm">
                Add, remove, or update users and manage roles & permissions.
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm">
                View system activity logs, performance metrics, and reports.
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Settings</h3>
                <p className="text-gray-600 text-sm">
                Customize platform configuration and preferences.
                </p>
            </div>
            </div>
        </main>
        </div>
    );
};

export default AdminDashboard;
