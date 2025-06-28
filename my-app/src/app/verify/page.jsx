// 'use client';
// import axios from "axios";
// import Link from "next/link";
// import React,{useEffect,useState} from "react";

// export default function VerifyEmailPage() {
//     const[token,setToken] = useState("");
//     const[verified,setVerified] = useState(false);
//     const[error,setError] = useState(false);

//     const verifyUserEmail = async () => {
//         try{
//             await axios.post('/api/users/verifyemail',{token})
//             setVerified(true);
//         }catch(err){
//             console.error("Error verifying email:", err);
//             setError(true);
//         }
//     }

//     useEffect(()=>{
//         // const urlToken = window.location.search.split('=')[1];
//         const urlToken = new URLSearchParams(window.location.search).get('token') || '';
// setToken(decodeURIComponent(urlToken));

//         setToken(urlToken || "");
//     },[])

//     useEffect(()=>{
//         if(token.length > 0) {
//             verifyUserEmail();
//         }
//     },[token])

//     return(
//         <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-600">
//             <h1 className="text-4xl">Verify Email</h1>
//             <h2 className="p-2 bg-orange-300">{token? `${token}`:"No Token"}</h2>
//             {verified && (
//                 <div className="text-green-500">
//                     <h2 className="text-2xl">Email Verified Successfully!</h2>
//                     <Link href="/login" className="text-blue-500 underline">Go to Login</Link>
//                 </div>
//             )}

//             {error && (
//                 <div className="text-green-500">
//                     <h2 className="text-3xl bg-red-300">Error</h2>
//                     {/* <Link href="/login" className="text-blue-500 underline">Go to Login</Link> */}
//                 </div>
//             )}



//         </div>
//     )
// }
'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const [token, setToken]       = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError]       = useState(false);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlToken     = searchParams.get('token') || '';
    // decode once; if you’d rather do it on the server, skip this line
    setToken(decodeURIComponent(urlToken));
  }, []);

  useEffect(() => {
    if (!token) return;

    const verifyUserEmail = async () => {
      setLoading(true);
      try {
        await axios.post('/api/users/verifyemail', { token });
        setVerified(true);
      } catch (err) {
        console.error('Error verifying email:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-600 gap-4">
      <h1 className="text-4xl text-white">Verify Email</h1>

      {/* Show raw token only while debugging */}
      {process.env.NODE_ENV === 'development' && (
        <h2 className="p-2 bg-orange-300 break-all">{token || 'No Token'}</h2>
      )}

      {loading && <p className="text-blue-300">Verifying…</p>}

      {verified && (
        <div className="text-green-400 text-center">
          <h2 className="text-2xl">Email verified successfully!</h2>
          <Link href="/login" className="underline">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-center">
          <h2 className="text-2xl">Verification failed. Link may be invalid or expired.</h2>
          <Link href="/resend" className="underline">
            Resend verification email
          </Link>
        </div>
      )}
    </div>
  );
}
