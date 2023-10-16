import Link from 'next/link';
import React from 'react';
import { FaTasks, FaBell, FaThLarge, FaTshirt, FaArrowRight } from 'react-icons/fa';

export default function WelcomeAgain() {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold my-10 '>Welcome to To-do List</h1>
      <div className='flex flex-col space-y-6'>
        <div className='flex items-center space-x-8 mt-10'>
          <FaTasks className='text-blue-500 text-2xl' />
          <p>
            <strong>Create Tasks Quickly and Easily</strong> <br />
            <small>Input task, subtasks, and repetitive tasks</small>
          </p>
        </div>
        <div className='flex items-center space-x-8'>
          <FaBell className='text-blue-500 text-2xl' />
          <p>
            <strong>Task Reminders</strong> <br />
            <small>Set reminders and never miss important</small>
          </p>
        </div>
        <div className='flex items-center space-x-8'>
          <FaThLarge className='text-blue-500 text-2xl' />
          <p>
            <strong>Personalized Widgets</strong> <br />
            <small>Create widgets and view your tasks more easily</small>
          </p>
        </div>
        <div className='flex items-center space-x-8'>
          <FaTshirt className='text-blue-500 text-2xl' />
          <p>
            <strong>Custom Themes</strong> <br />
            <small>Choose the themes you like and start your wonderful day</small>
          </p>
        </div>
      </div>
     <Link href="/tire"><button className='bg-blue-500 w-80 h-12 rounded-full justify-between px-4 py-2 mt-20 flex items-center space-x-2 transform transition duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white'>
  <span className='ml-2 font-bold uppercase'>Continue</span>
  <FaArrowRight className='w-6 h-6' />
</button></Link> 

    </div>
  );
}
