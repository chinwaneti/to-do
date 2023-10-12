"use client"
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineBell, AiOutlineClose } from "react-icons/ai";
import { getFirestore } from 'firebase/firestore'; 

const NewTaskModal = ({ isOpen, onClose }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All"); 

  const closeTask = () => {
    onClose()
  };

  const db = getFirestore(); 

  const handleAddTask = async () => {
    if (taskDescription.trim() === '' || selectedDate === null) {
      return;
    }

    try {
      const tasksCollection = collection(db, 'tasks');

      await addDoc(tasksCollection, {
        description: taskDescription,
        date: selectedDate,
        category: selectedCategory, 
      });

      setTaskDescription('');
      setSelectedDate(null);

      onClose();
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={`fixed inset-0 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}  flex items-center justify-center transition-opacity duration-300 ease-in-out`}>
        <div className="bg-white w-96 rounded-lg shadow-lg p-4 relative">
          <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
         <div className='flex justify-around my-2'>
         
            <div onClick={() => setSelectedCategory("Work")} className={`rounded-full px-6 py-1 border-2  active:text-white active:bg-blue-400 cursor-pointer ${selectedCategory === "Work" ? 'bg-blue-100' : ''}`}>Work</div>
            <div onClick={() => setSelectedCategory("Personal")} className={`rounded-full px-6 py-1  border-2 active:text-white active:bg-blue-400 cursor-pointer ${selectedCategory === "Personal" ? 'bg-blue-100' : ''}`}>Personal</div>
            <div onClick={() => setSelectedCategory("School")} className={`rounded-full px-6 py-1  border-2 active:text-white active:bg-blue-400 cursor-pointer ${selectedCategory === "School" ? 'bg-blue-100' : ''}`}>School</div>
         </div>
          <input
            type="text"
            placeholder="Enter New Task"
            className="w-full py-2 px-3 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none mb-4"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <div className="">
           
            <div onClick={closeTask} className="absolute top-1 right-1 hover:bg-gray-100 p-2 rounded-full">
              <AiOutlineClose size={20} className="" />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <p className="text-gray-600">Choose a day!</p>
            </div>
            <div className="mt-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border border-gray-300 rounded"
            />
          </div>
          </div>
          <div className="mb-4">
            <TimePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="border border-gray-300 rounded"
            />
          </div>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default NewTaskModal;
