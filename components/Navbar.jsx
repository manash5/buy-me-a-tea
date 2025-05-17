"use client"
import React, { useCallback } from 'react'
import { useState } from 'react'
import Link from 'next/link';
import LoginPopup from "@/components/login";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'; 

const Navbar = () => {

  const { data: session } = useSession()
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter(); 
  const [showdropdown, setShowdropdown] = useState(false)

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };


  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); 
    router.push("/"); 
  };

  return (
    <>
    <nav className='bg-deep-blue text-white flex justify-between items-center px-4 h-16 '>
        <Link className="logo font-bold text-lg flex justify-center items-center gap-2 hover:cursor-pointer" href = {"/"} >
          <img className='w-10 h-10' src ="/tea.gif"></img>
          <span>Buy-Me-A-Tea</span>
        </Link>
      {/* <ul className='flex justify-between'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign Up</li>
        <li>Login</li>
      </ul> */}
      <div className="relative">
      {session && <>
          <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
            setTimeout(() => {
              setShowdropdown(false)
            }, 100);
          }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" left-[125px] inline-flex items-center text-white bg-gradient-to-r from-purple-900 to-pink-900 hover:bg-gradient-to-l focus:ring-4 
          focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="button">
            Welcome {session?.user?.email?.split('@')[0]}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowdropdown(false)}>Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setShowdropdown(false)}>Your Page</Link>
              </li>
              <li>
                <button onClick={() => { setShowdropdown(false); signOut(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</button>
              </li>
            </ul>
          </div></>
        }

        {session && <button className="text-white bg-gradient-to-r from-purple-900 to-pink-900 hover:bg-gradient-to-l focus:ring-4 
          focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleLogout}> 
          Logout</button>}

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
