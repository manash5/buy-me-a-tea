"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link';
import LoginPopup from "@/components/login";
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {

  const { data: session } = useSession()
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <>
    <nav className='bg-violet-950 text-white flex justify-between items-center px-4 h-16 '>
        <div className="logo font-bold text-lg flex justify-center items-center gap-2 hover:cursor-pointer" >
          <img className='w-10 h-10' src ="/tea.gif"></img>
          <span>Buy-Me-A-Tea</span>
        </div>
      {/* <ul className='flex justify-between'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign Up</li>
        <li>Login</li>
      </ul> */}
      <div className="">
        {session && <Link href ={"/dashboard"}> <button className="text-white bg-gradient-to-r from-purple-900 to-pink-900 hover:bg-gradient-to-l focus:ring-4 
          focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> profile</button></Link>}

        {session && <Link href ={"/dashboard"}> <button className="text-white bg-gradient-to-r from-purple-900 to-pink-900 hover:bg-gradient-to-l focus:ring-4 
          focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> Logout</button></Link>}

        {!session && <button type="button" className="text-white bg-gradient-to-r from-purple-900 to-pink-900 hover:bg-gradient-to-l focus:ring-4 
          focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={toggleLoginPopup}
          >
            Login
          </button> }
          
      </div>  

    </nav>
    {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </>
  )
}

export default Navbar
