"use client"
import React, { useState, useEffect } from 'react';
import Search from '../components/Search';
import Image from 'next/image';
import pic from '../images/logo.png';
import { FaPlus } from 'react-icons/fa';
import { BsCircle, BsPencil, BsTrash } from 'react-icons/bs';
import Footer from '../components/Footer';
import Link from 'next/link';
import SignInModal from '../components/SignInModal';
import NewTaskModal from '../components/NewTaskModal';
import { collection, query, orderBy, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'; 
import { db } from '../firebase';
import { FaArrowRotateRight} from 'react-icons/fa6';


export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [taskGroups, setTaskGroups] = useState([]);
  const [filterCat, setFilterCat] = useState("All");
  

 
  
  useEffect(() => {
    const tasksRef = collection(db, 'tasks');
    const tasksQuery = query(tasksRef, orderBy('date', 'asc')); 

    const fetchTasks = async () => {
      const taskSnapshot = await getDocs(tasksQuery);
      const tasks = taskSnapshot.docs.map((doc) => ({
        id: doc.id,
        description: doc.data().description,
        date: doc.data().date.toDate(),
        time: doc.data().time,
        category: doc.data().category,
      }));

      const groupedTasks = groupTasksByDate(tasks);

      setTaskGroups(groupedTasks);
    };

    fetchTasks();
  }, []);

  const groupTasksByDate = (tasks) => {
    const groupedTasks = {};
  
    tasks.forEach((task) => {
      let dateKey;
  
      if (task.date instanceof Date) {
        dateKey = task.date.toDateString();
      } else {
        dateKey = task.date.toDate().toDateString();
      }
  
      if (!groupedTasks[dateKey]) {
        groupedTasks[dateKey] = [];
      }
  
      groupedTasks[dateKey].push(task);
    });
  
    return groupedTasks;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSignInSuccess = () => {
    closeModal(); 
  };

  const openTask = () => {
    setNewTask(true);
  };

  const closeTask = () => {
    setNewTask(false);
  };

  const handleTask = () => {
    closeTask(); 
  };

  
  const handleRepeatTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await setDoc(taskRef, { completed: false }, { merge: true });

      setTaskGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };
        for (const dateKey in updatedGroups) {
          updatedGroups[dateKey] = updatedGroups[dateKey].map((task) => {
            if (task.id === taskId) {
              return { ...task, completed: false };
            }
            return task;
          });
        }
        return updatedGroups;
      });
    } catch (error) {
      console.error('Error repeating task: ', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
  
      setTaskGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };
  
        for (const dateKey in updatedGroups) {
          updatedGroups[dateKey] = updatedGroups[dateKey].filter(
            (task) => task.id !== taskId
          );
  
          if (updatedGroups[dateKey].length === 0) {
            delete updatedGroups[dateKey];
          }
        }
  
        return updatedGroups;
      });
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };
  const handleCompleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await setDoc(taskRef, { completed: true }, { merge: true });

      setTaskGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };
        for (const dateKey in updatedGroups) {
          updatedGroups[dateKey] = updatedGroups[dateKey].map((task) => {
            if (task.id === taskId) {
              return { ...task, completed: true };
            }
            return task;
          });
        }
        return updatedGroups;
      });
    } catch (error) {
      console.error('Error completing task: ', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-200 to-blue-300">
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow-lg">
      <div className="flex items-center space-x-2">
        <Image src={pic} alt="pics" width={30} height={30} />
        <h1 className="text-2xl font-semibold"> To-Do List</h1>
      </div>
      <button
        onClick={openModal}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Sign-In
      </button>
    </div>

    <div className="px-4 py-6 space-y-6">
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setFilterCat('All')}
          className={`px-4 py-2 rounded-full ${
            filterCat === 'All' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-white'
          } transition duration-300`}
        >
          All
        </button>
        <button
          onClick={() => setFilterCat('Work')}
          className={`px-4 py-2 rounded-full ${
            filterCat === 'Work' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-white'
          } transition duration-300`}
        >
          Work
        </button>
        <button
          onClick={() => setFilterCat('Personal')}
          className={`px-4 py-2 rounded-full ${
            filterCat === 'Personal' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-white'
          } transition duration-300`}
        >
          Personal
        </button>
        <button
          onClick={() => setFilterCat('School')}
          className={`px-4 py-2 rounded-full ${
            filterCat === 'School' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-white'
          } transition duration-300`}
        >
          School
        </button>
        
      </div>

      {Object.entries(taskGroups).map(([date, tasks]) => (
        <div key={date} className="bg-white bg-opacity-90 p-4 rounded-md shadow-md">
          <h2 className="mt-3 text-2xl font-semibold">{date}</h2>
          <ul>
            {tasks
              .filter((task) => (filterCat === 'All' ? true : task.category === filterCat))
              
              .map((task) => (
                <li key={task.id} className="bg-white bg-opacity-90 p-4 rounded-md flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {!task.completed && (
                      <span
                        onClick={() => handleCompleteTask(task.id)}
                        className="
cursor-pointer text-green-500"
                      >
                        <BsCircle />
                      </span>
                    )}
                    <div
                      className={`relative ${
                        task.completed ? 'line-through'  : ''
                      }
                       font-semibold text-lg`}
                      style={{
                        color: task.completed ? '#bebebe' : '#000000',
                      }}
                    >
                      {task.description}
                    </div >
                    <div className='ml-3'>{task.completed ? "completed" : ""}</div>
                      
                  </div>
                  <div></div>
                  <div className="text-sm text-gray-500">
                    {task.date.toLocaleString()} {task.time}
                  </div>
                  <div className='flex space-x-10'>
                      <div className='text-green-600'> {task.completed ? <span onClick={()=> handleRepeatTask(task.id)}><FaArrowRotateRight/></span> : ""}</div>
                  <span
                    onClick={() => handleDeleteTask(task.id)}
                    className="cursor-pointer text-red-500 f"
                  >
                     

                    <BsTrash />
                  </span></div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>

    <Link href="">
      <div
        onClick={openTask}
        className="fixed right-10 bottom-10"
      >
        <div style={{ color: 'white', position: 'fixed', right: '40px', bottom: '80px' }} className="bg-blue-950  w-16 h-16 p-3  rounded-full">
          <div className="  bg-blue-500 w-10 h-10 p-3 border-blue-400 border-solid border rounded-full">
            <FaPlus />
          </div>
        </div>
      </div>
    </Link>

    {/* <Footer /> */}
    {isModalOpen && (
      <SignInModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSignInSuccess={handleSignInSuccess}
      />
    )}

    {newTask && (
      <NewTaskModal
        isOpen={newTask}
        onClose={closeTask}
        onAddTask={handleTask}
      />
    )}
  </div>
   

  );
}

