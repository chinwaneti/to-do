"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { AiOutlineClose } from 'react-icons/ai';


function SignInModal({ isOpen, onClose, onSignInSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  const handleClose =()=>{
    onClose()
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          onSignInSuccess();
        }
        console.log(userCredential);
      })
      .catch((error) => {
       

        if (error.code === 'auth/invalid-login-credentials') {
          setError("Error in Email or Password")
         
        }
      
      });
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300 ease-in-out`}
    >
      <div className="bg-white w-96 rounded-lg relative shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      
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
        </div>
        <div onClick={handleClose} className='absolute top-1 right-1 hover:bg-gray-100 p-2 rounded-full'>
          <AiOutlineClose />
        </div>
        <div>
          {error && ( <p className='text-red-600'>{error}</p> )}
        </div>
        <button
          className="bg-indigo-500 text-white w-full py-2 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <p className="text-gray-500 mt-4 text-center text-sm">
          No account? <Link href="/tired" className='font-bold hover:text-indigo-600'>Sign up</Link>
        </p>
      </div>
      
    </div>
  );
}

export default SignInModal;
