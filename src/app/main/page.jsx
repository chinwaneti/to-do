"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import pic from '../images/logo.png';
import { FaPlus } from 'react-icons/fa';
import { BsCircle, BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import ProfileModal from '../components/ProfileModal';
import NewTaskModal from '../components/NewTaskModal';
import { collection, query, orderBy, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import { FaArrowRotateRight} from 'react-icons/fa6';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import the icons from react-icons



export default function Main() {
  const [newTask, setNewTask] = useState(false);
  const [taskGroups, setTaskGroups] = useState([]);
  const [filterCat, setFilterCat] = useState("All");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState('');
  const [isNightTheme, setIsNightTheme] = useState(false);

  
  const toggleTheme =()=>{
    setIsNightTheme(!isNightTheme)
  }
 

  const handleNameChange = (newName)=>{
    setUserName(newName)
  }
  
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

  const updateTaskGroups = (newTask) => {
    setTaskGroups((prevTaskGroups) => {
      const updatedTaskGroups = { ...prevTaskGroups };
  
      // Add the new task to the appropriate date key
      const dateKey = newTask.date.toDateString();
      if (!updatedTaskGroups[dateKey]) {
        updatedTaskGroups[dateKey] = [newTask];
      } else {
        updatedTaskGroups[dateKey].push(newTask);
      }
  
      return updatedTaskGroups;
    });
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

  const handleSignInSuccess = (user) => {
    setUserId(user.uid); // Set userId when the user signs in
    closeModal();
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
    <div className={`w-full min-h-screen ${isNightTheme ? 'bg-gradient-to-br from-purple-950 to-blue-950' : 'bg-gradient-to-br from-purple-200 to-blue-300'}`}>
    <div className={`flex justify-between items-center px-4 py-3   shadow-lg ${isNightTheme ? 'bg-gradient-to-br from-purple-900 to-blue-950' : 'bg-white'}`}>
      <div className="flex items-center space-x-2">
        <Image src={pic} alt="pics" width={30} height={30} />
        <h1 className="text-2xl font-semibold">Welcome {userName || 'Guest'}</h1>

      </div>

      <div className='flex space-x-5'>
      <button onClick={toggleTheme} className="p-2  rounded-full">
            {isNightTheme ? (
              <FaSun color="white" size={24} /> // Day icon
            ) : (
              <FaMoon color="#3D3D3D" size={24} /> // Night icon
            )}
          </button>
      
     
        <ProfileModal 
        onNameChange={setUserName}
        userId={userId}
        isNightTheme={isNightTheme}
/></div>
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
        <div key={date} className={`${isNightTheme ? 'bg-gradient-to-br from-purple-900 to-blue-950' : 'bg-white'} bg-opacity-90 p-4 rounded-md shadow-md`}>
          <h2 className="mt-3 text-2xl font-semibold">{date}</h2>
          <ul>
            {tasks
              .filter((task) => (filterCat === 'All' ? true : task.category === filterCat))
              
              .map((task) => (
                <li key={task.id} className={`${isNightTheme ?  'bg-gradient-to-br from-purple-400 to-blue-600' : 'bg-white'} bg-opacity-90 p-4 rounded-md flex items-center justify-between`}>
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
                  <div className={`text-sm ${
    isNightTheme && !task.completed ? 'text-gray-300' : 'text-black'
  }`}>
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

 

    {newTask && (
      <NewTaskModal
        isOpen={newTask}
        updateTaskGroups={updateTaskGroups} 
        onClose={closeTask}
        onAddTask={handleTask}
      />
    )}
  </div>
   

  );
}

