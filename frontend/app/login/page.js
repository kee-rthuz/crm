"use client"; // Mark this component as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username: email, password }),
        credentials: 'include', // Ensure cookies are included in the request
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to dashboard on successful login
        router.push("/dashboard");
      } else {
        const data = await response.json();
        toast.error(data.detail || "Login failed"); // Show error toast
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer /> {/* Include ToastContainer */}
      <div className="max-w-md w-full p-5 border rounded shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Signup</a>
        </p>
      </div>
    </div>
  );
}
