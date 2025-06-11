"use client"

import React, { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {axios} from 'axios'


const Login = () => {
  const[user,setUser] = useState({
    email:"",
    password:"",
   
  });

  const onLogin =async()=>{ }

  return (
   <div className='flex flex-col items-center justify-center min-h-screen py-2'>
  <h1 className="text-2xl font-bold mb-4">Login</h1>
  <hr className="w-full mb-4" />

  <label htmlFor="email" className="mb-1">Email</label>
  <input
    type="email"
    id="email"
    value={user.email}
    onChange={(e) => setUser({ ...user, email: e.target.value })}
    placeholder="Enter your email"
    className="mb-4 px-4 py-2 border rounded-md"
  />

  {/* <label htmlFor="username" className="mb-1">Username</label>
  <input
    type="text"
    id="username"
    value={user.username}
    onChange={(e) => setUser({ ...user, username: e.target.value })}
    placeholder="Enter your username"
    className="mb-4 px-4 py-2 border rounded-md"
  /> */}

  <label htmlFor="password" className="mb-1">Password</label>
  <input
    type="password"
    id="password"
    value={user.password}
    onChange={(e) => setUser({ ...user, password: e.target.value })}
    placeholder="Enter your password"
    className="mb-4 px-4 py-2 border rounded-md"
  />
  <button className='p-2 bg-gray-900 border border-b-white px-10 rounded cursor-pointer'
  onClick={onLogin}
  >Login</button>
  <Link href="/signup" className='my-3'>Visit Signup page</Link>
</div>

  ) 
}

export default Login;
