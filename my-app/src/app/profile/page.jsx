"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();
  const logout=async()=>{
    try{
      await axios.get("/api/users/logout");
      toast.success("Logout Successful")
      router.push("/login");
    }catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <hr />
     <button onClick={logout} className='bg-blue-500 cursor-pointer px-10 py-2 rounded-md text-black mt-3'>Logout</button>
    </div>
  )
}

export default ProfilePage
