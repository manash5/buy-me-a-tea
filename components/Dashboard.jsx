"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const { data: session, update, status } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})


    useEffect(() => {
        if (status === "loading") return; // Wait for session to load
        if (status === "unauthenticated") {
            router.push('/login');
        } else if (session) {
            getData();
        }
    }, [session, status, router]);

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setform({ ...form, [e.target.name]: reader.result });
                };
                reader.readAsDataURL(file); // base64 string
            }
        } else {
            setform({ ...form, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        let a = await updateProfile(form, session.user.name); // Pass form state, not event
        toast('Profile Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className='container mx-auto py-5 px-6 '>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input onChange={handleChange} type="file" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {form.profilepic && (
                            <img src={form.profilepic} alt="Profile Preview" className="mt-2 h-16 w-16 object-cover rounded-full" />
                        )}
                    </div>

                    {/* input for cover pic  */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input onChange={handleChange} type="file" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {form.coverpic && (
                            <img src={form.coverpic} alt="Cover Preview" className="mt-2 h-24 w-full object-cover rounded-lg" />
                        )}
                    </div>
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="esewaid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Esewa Id</label>
                        <input value={form.esewaid ? form.esewaid : ""} onChange={handleChange} type="text" name='esewaid' id="esewaid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="esewasecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Esewa Secret</label>
                        <input value={form.esewasecret ? form.esewasecret : ""} onChange={handleChange} type="text" name='esewasecret' id="esewasecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm">Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard