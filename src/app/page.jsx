"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import the icons from react-icons
import Welcome from './components/Welcome';

export default function Page() {
  const router = useRouter();
  const [isNightTheme, setIsNightTheme] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome-again');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsNightTheme(isNightTheme);
  };

  return (
    <div className={`h-screen flex flex-col justify-center  items-center ${isNightTheme ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="text-center">
        <button onClick={toggleTheme} className="p-2 m-2 rounded-full">
          {isNightTheme ? (
            <FaSun color="#FFD700" size={24} /> // Day icon
          ) : (
            <FaMoon color="#3D3D3D" size={24} /> // Night icon
          )}
        </button>
        <Welcome />
      </div>
      <div>hello</div>
    </div>
  );
}

