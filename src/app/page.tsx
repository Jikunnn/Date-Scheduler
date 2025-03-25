'use client'
import React from 'react'
import Link from 'next/link'


const page = () => {
  return (
    <div className = "flex min-h-screen items-center justify-center">
      <div className = 'flex flex-col items-center'>
      <div className= 'text-center text-7xl font-gourmet-eatery fade-in' >Welcome!</div>
      <div className ='text-center text-xl font-gourmet-eatery fade-in'>Click the button below to continue 🫶</div>
      <div>
      <Link href = '/dateName'>
        <button className = "bg-[#c3592b] hover:bg-[#d69264] text-[#e7ceb9] font-bold py-2 px-4 rounded mt-5 font-roboto fade-in">Continue</button>
      </Link>
      </div>
      </div>
    </div>
  )
}

export default page