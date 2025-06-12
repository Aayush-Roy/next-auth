"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const SignUp = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else setButtonDisable(true);
  }, [user]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {/* 🔔 Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-2xl font-bold mb-4">
        {!hydrated ? "Signup" : (loading ? "Processing..." : "Signup")}
      </h1>

      <label htmlFor="email" className="mb-1">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
        className="mb-4 px-4 py-2 border rounded-md"
      />

      <label htmlFor="username" className="mb-1">Username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your username"
        className="mb-4 px-4 py-2 border rounded-md"
      />

      <label htmlFor="password" className="mb-1">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
        className="mb-4 px-4 py-2 border rounded-md"
      />

      <button
        className='p-2 bg-gray-900 border border-b-white px-10 rounded cursor-pointer text-white'
        onClick={onSignup}
        disabled={buttonDisable}
      >
        {buttonDisable ? "No Signup" : "Signup"}
      </button>

      <Link href="/login" className='my-3'>Visit login page</Link>
    </div>
  )
}

export default SignUp;
