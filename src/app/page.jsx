"use client"
import React,{useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Welcome from './components/Welcome';

export default function Page() {
  const router =useRouter()
  const navigate = ()=>{
      router.push("/welcome-again")
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome-again');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div
      className='h-screen w-[100%] flex justify-center items-center bg-gray-200'
    >
      <div>
        <Welcome />
      </div>
    </div>
  );
}
