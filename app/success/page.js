import Payment from '@/models/payment';
import { verifyEsewaPayment } from '../action';
import { saveEsewaPayment } from '@/actions/useractions';
import { connect } from 'mongoose';
import connectDB from '@/db/connectDb';
import Link from 'next/link';

export default async function SuccessPage({ searchParams }) {
  const params = typeof searchParams.then === 'function' ? await searchParams : searchParams;


  let paymentObj = null; 
  let paymentData = null;
  if (params.data) {
    try {
      // Decode base64 and parse JSON
      const decoded = Buffer.from(params.data, 'base64').toString('utf-8');
      paymentData = JSON.parse(decoded);
      const transaction_uuid = paymentData.transaction_uuid;

      await connectDB(); 
      const payment = await Payment.findOne({ oid: transaction_uuid });

      if (payment) {
        // Optionally update payment status, mark as done, etc.
        payment.done = true;
        await payment.save();
        // Convert to plain object and remove non-serializable fields
        paymentObj = JSON.parse(JSON.stringify(payment));
      } else {
        console.log("Payment not found in the database");
      }
    } catch (e) {
      console.log("Failed to decode or save payment data", e);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center  bg-deep-blue-100">
      <div className="paymentCard bg-gradient-to-br from-violet-900 to-slate-900 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-violet-600/30 backdrop-blur-sm relative overflow-hidden my-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-800 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-green-500/30 border-4 border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Payment Successful!</h1>
        
        <div className="space-y-3 mb-8">
          {paymentData ? (
            <>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transform transition-all hover:scale-102 hover:bg-white/15">
                <p className="text-white flex justify-between items-center">
                  <span className="font-medium text-violet-200">Transaction ID</span> 
                  <span className="font-mono tracking-wide">{paymentData.transaction_uuid}</span>
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transform transition-all hover:scale-102 hover:bg-white/15">
                <p className="text-white flex justify-between items-center">
                  <span className="font-medium text-violet-200">Amount</span> 
                  <span className="font-bold text-xl">{paymentData.total_amount}</span>
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transform transition-all hover:scale-102 hover:bg-white/15">
                <p className="text-white flex justify-between items-center">
                  <span className="font-medium text-violet-200">Status</span> 
                  <span className="bg-green-800 px-3 py-1 rounded-full text-white text-sm font-semibold">{paymentData.status}</span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-white/80 italic">Payment details not found.</p>
          )}
        </div>

        <Link href={`/${paymentObj?.to_user || ''}`}>
          <button className="bg-white hover:bg-gray-50 text-indigo-700 font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 w-full flex items-center justify-center gap-2">
            <span>Go to Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}