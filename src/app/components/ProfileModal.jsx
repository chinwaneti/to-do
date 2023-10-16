import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ProfileModal({ name, onNameChange, isOpen, onClose, userId, updateMainPageName }) {
  const [isProfileOpen, setIsProfileOpen] = useState(isOpen);

  const toggleModal = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNameChange = () => {
    if (!name || name.trim() === '') {
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    setDoc(userDocRef, { name }).then(() => {
      updateMainPageName(name);
      onClose();
    }).catch((error) => {
      console.error('Error saving name:', error);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="profile-button bg-blue-500 text-white p-2 rounded-full"
      >
        <FaUser />
      </button>

      {isProfileOpen && (
        <div className="profile-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border rounded-lg shadow-lg z-10 sm:w-96 md:w-108 lg:w-120">
          <button
            onClick={toggleModal}
            className="close-button absolute top-2 right-2 text-gray-500 text-xl cursor-pointer"
          >
            &times;
          </button>
          <div className="profile-content flex flex-col items-center">
            <div className="profile-avatar bg-blue-500 text-white p-4 rounded-full">
              <FaUser size={40} />
            </div>
            <div className="profile-info text-black mt-4">
              <h2 className="text-2xl text-center my-2 text-black font-semibold">Welcome {name || 'Guest'}</h2>
              <input
                type="text"
                id="text"
                className="w-full my-3 mt-1 py-2 px-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
                placeholder="Enter your Username"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </div>
            <button onClick={handleNameChange} className="sign-out-button bg-red-500 text-white mt-4 py-2 px-4 rounded-lg">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
