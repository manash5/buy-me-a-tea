import React from 'react'

const username = ({params}) => {
  return (
    <>
    <div className='cover w-full bg-red-50 relative'>
      <img className='object-cover object-center w-full h-48 md:h-[350px]' src='/cover.jpg' alt="" />
      <div className="absolute -bottom-20 right-[46%] border-b-gray-500 border-2 rounded-full">
        <img className = "rounded-full" width ={150} height ={150} src="/profile.jpg"></img>
      </div>
    </div>
    <div className="info flex justify-center items-center my-24 flex-col gap-2">
      <div className="title font-bold text-lg">
        @{params.username}
      </div>
      <div className="subtitle text-slate-400">
        Creating art for Princess Fiona 
      </div>
      <div className="description text-slate-400">
        9,719 members . 82 posts . $15,450/releases
      </div>

      <div className="payment flex gap-3  w-[80%] text-white mt-11">
        <div className="supporters w-1/2 bg-slate-900 rounded-lg p-5">
          <h2 className='text-lg font-bold my-5 '>Supporters</h2>
            <ul className='mx-5'>
              <li className='my-2 flex gap-2 items-center'>
                <img src = "/avatar.gif" width={33}/>
                Princess Fiona donated $30 with a message "Your so handsome!!👩‍❤️‍👩 "
              </li>
              <li className='my-2 flex gap-2 items-center'>
                <img src = "/avatar.gif" width={33}/>
                Donkey donated $30 with a message "I support you bro 👊👊"
              </li>
              <li className='my-2 flex gap-2 items-center'>
                <img src = "/avatar.gif" width={33}/>
                Lord Farquaad donated $30 with a message "Keep going boi 👍"
              </li>
            </ul>
          </div>

          <div className="makePayment w-1/2 bg-slate-900  rounded-lg p-5 px-10">
              <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
              <div className="flex gap-2 flex-col">
                <input type = "text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name'/>
                <input type = "text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message'/>
                <input type = "text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount'/>
                <button className="text-white bg-gradient-to-r from-cyan-800 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-800 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
          {/* <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cyan to Blue</button> */}
              </div>

              <div className="flex gap-2 mt-5 justify-center">
                <button className='bg-slate-800 p-3 rounded-lg'>Pay $10</button>
                <button className='bg-slate-800 p-3 rounded-lg'>Pay $20</button>
                <button className='bg-slate-800 p-3 rounded-lg'>Pay $30</button>
              </div>
          </div>
      </div>
    </div>
    
    </>
  )
}

export default username
