import React from 'react';
import { FaTasks, FaCalendar, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { auth } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import page from '../taskOverview/page';

export default function Footer() {
  const handleSignOut = async () => {
    const auth = getAuth(); // Get the Firebase auth instance
    try {
      await signOut(auth); // Sign out the user
      console.log('Signed Out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <footer className="text-white py-4 bottom-0 fixed w-full bg-black opacity-80">
      <div className="flex justify-evenly">
        <div className="hover:text-pink-500">
          <RxHamburgerMenu size={24} style={{color:""}}/>
        </div>
        <div className="hover:text-pink-500">
          <FaTasks size={24} style={{color:""}}/>
          <span className="text-center">Tasks</span>
        </div>
        <div className="hover:text-pink-500">
          <FaCalendar size={24} style={{color:""}}/>
          <span className="text-center">Calendar</span>
        </div>
        <Link href='/taskOverview'><div className="hover:text-pink-500">
          <FaUser size={24} style={{color:""}}/>
          <span className="text-center">Mine</span>
        </div></Link>
        <div onClick={handleSignOut} className="hover:text-pink-500">
          <FaSignOutAlt size={24} style={{color:""}}/>
          <span className="text-center">Sign out</span>
        </div>
      </div>
    </footer>
  );
}
