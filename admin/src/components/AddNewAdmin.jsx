import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

const addnewadmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform basic validation
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const adminData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:9090/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      const result = await response.json();

      if (result.isSuccess) {
        // Show success toast on successful registration
        toast.success("New admin successfully registered!");
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>

        <div className="h-[65px] bg-blue-800 shadow-lg rounded-b-xl">
            <div className="container flex items-center justify-between px-6 py-4 mx-auto">
            <h1 className="font-sans text-2xl font-bold tracking-wide text-white">
                E-Voting System
            </h1>
            <nav className="space-x-6">
            <Link
                to="/admin-dashboard"
                className="px-5 py-2 text-center text-white no-underline transition duration-300 ease-in-out border border-transparent rounded-full bg-white/10 hover:bg-white hover:text-gray-800 hover:shadow-lg decoration-transparent hover:decoration-transparent"
            >
                Back to Admin
            </Link>


            </nav>
            </div>
        </div>

    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold">Register New Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full p-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600">
            Add Admin
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>

    </>

  );
};

export default addnewadmin;
