import Image from "next/image";


export default function Home() {
  return (
    <>
    <div className="flex justify-center text-white h-[44vh] items-center flex-col gap-10">
      <div className="">
        <div className="font-bold text-3xl flex justify-center items-center">Buy Me a Tea<span className="mb-5"><img className='w-20 h-15' src="/tea.gif"></img></span></div>
        <p>
          A crowfunding platform for creators. Get funded by your fans and followers. Start now! 
        </p>
      </div>
      <div className="flex justify-center items-center gap-2">
          <button type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
          dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Start here 
          </button>
          <button type="button" className=" bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
          focus:ring-yellow-500 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-white">
            Read more 
          </button>
      </div>
    </div>
    <div className="bg-white h-1 opacity-10"></div>
    <div className="description my-10 flex justify-center items-center flex-col gap-10">
      <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Tea</h2>
      <div className="flex gap-30 justify-around">
        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
          <p className="font-bold text-center">Fans want to help</p>
          <p className="text-center">Your fans are available to support you</p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
          <p className="font-bold text-center">Fans want to contribute</p>
          <p className="text-center">Your fans are willing to contribute financially</p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
          <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
          <p className="font-bold text-center">Fans want to collaborate</p>
          <p className="text-center">Your fans are ready to collaborate with you</p>
        </div>
      </div>
    </div>

    <div className="bg-white h-1 opacity-10 "></div>
    <div className="description my-20 flex justify-center items-center flex-col gap-2">
      <h2 className="text-3xl font-bold text-center mb-14">Learn more about us </h2>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=fehaHOHP6t82gt6Y" 
      title="YouTube video player" frameBorder="0"  allow="accelerometer; autoplay; clipboard-write; 
      encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen></iframe>
    </div>
    </>
  );
}
