"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Welcome from './components/Welcome';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome-again');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <Welcome />
      </div>
      <div>hello</div>
    </div>
  );
}
