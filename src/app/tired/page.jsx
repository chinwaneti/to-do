"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

function SignUpModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); // Initialize the useRouter hook

 

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/main'); 
      })
      .catch((error) => {
        // Handle sign-up error and display the corresponding message
        if (error.code === 'auth/weak-password') {
          setErrorMessage('Password is too weak. Please choose a stronger password.');
        } else if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email is already in use. Please use a different email.');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className='bg-gray-200 h-screen relative'>
      <div className="bg-white w-96 rounded-lg absolute top-[20%] left-[35%] shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-1 py-2 px-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full mt-1 py-2 px-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
        <button
          className="bg-indigo-500 text-white w-full py-2 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
     <Link href="/main"> <div className='absolute top-[20%] right-[35.5%] hover:bg-gray-100 p-2 rounded-full'>
          <AiOutlineClose />
        </div></Link>
    </div>
  );
}

export default SignUpModal;



