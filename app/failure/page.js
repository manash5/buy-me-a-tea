export default function FailurePage({ searchParams }) {
  const reason = "Unknown error";
  return (
    <div className="min-h-screen flex flex-col items-center bg-deep-blue-100">
      <div className="paymentCard bg-gradient-to-br from-violet-900 to-slate-900 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-violet-600/30 backdrop-blur-sm relative overflow-hidden my-20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-rose-800 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-red-500/30 border-4 border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Payment Failed</h1>
        
        <div className="space-y-3 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transform transition-all hover:scale-102 hover:bg-white/15">
            <p className="text-white flex justify-between items-center">
              <span className="font-medium text-red-200">Status</span> 
              <span className="bg-red-800 px-3 py-1 rounded-full text-white text-sm font-semibold">Failed</span>
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transform transition-all hover:scale-102 hover:bg-white/15">
            <p className="text-white flex justify-between items-center">
              <span className="font-medium text-red-200">Reason</span> 
              <span className="font-medium text-white">{reason}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <a href="/checkout" className="bg-white hover:bg-gray-50 text-rose-700 font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            <span>Try Again</span>
          </a>
          
          <a href="/" className="bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-xl border border-white/30 transition duration-300 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}