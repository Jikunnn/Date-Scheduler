'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function FormPage() {
  const [name, setName] = useState("");
  const router = useRouter();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (name.trim()) {
        router.push(`/dateType?name=${encodeURIComponent(name)}`);
    }
};

  return (
    <div className="flex min-h-screen items-center justify-center fade-in">
      <div className='flex flex-col items-center'>
        <div className="text-center text-3xl font-gourmet-eatery mb-5">
          First of all, I&apos;d like to know your name
        </div>
        <div className="my-5">
          <Image 
            src="/hehegif.gif" 
            alt="hehe"
            width={300} 
            height={300}
            priority 
            unoptimized={true}
          />
        </div>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name here" 
            className="border-2 border-[#d69264] rounded-lg p-2 text-center"
          />
          <button 
            type="submit"
            className="bg-[#c3592b] hover:bg-[#d69264] text-white font-bold py-2 px-4 rounded mt-5"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}