"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const[data,setData] = useState("nothing");
  const router = useRouter();
  const logout=async()=>{
    try{
      await axios.get("/api/users/logout");
      setTimeout(()=>{toast.success("Logout Successful")},1500)  
      router.push("/login");
    }catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  }

  const getUserDetails =async()=>{
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  }

  return (
    <div>
      <Toaster position='top-center'/>
      <h1>Profile</h1>
      <hr />
      <h1 className='rounded p-2 bg-green-600  ]'>{data==="nothing"?"Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h1>
     <button onClick={logout} className='bg-blue-500 cursor-pointer px-10 py-2 rounded-md text-black mt-3'>Logout</button>
     <button onClick={getUserDetails} className='bg-purple-500 cursor-pointer px-10 py-2 rounded-md text-black mt-3'>Details</button>
    </div>
  )
}

export default ProfilePage
