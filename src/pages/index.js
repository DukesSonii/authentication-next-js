// src/pages/index.js

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Task Manager</h1>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push('/register')}
        >
          Register
        </button>
        <button
          className="bg-green-500 px-6 py-2 rounded hover:bg-green-600"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
}
