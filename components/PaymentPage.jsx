"use client"
import React, { useEffect, useState, useRef } from 'react'
import { fetchuser, fetchpayments, initiate, saveEsewaPayment } from '@/actions/useractions'
import 'react-toastify/dist/ReactToastify.css';
import { initiateEsewaPayment } from "@/actions/esewa"

const PaymentPage = ({ username}) => {
    
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [signature, setSignature] = useState("");
    const [formFields, setFormFields] = useState({});
    const formRef = useRef(null);

    const [payments, setpayments] = useState([])
    const [CurrentUser, setCurrentUser] = useState({})

    useEffect(() => {
        getData()
    }, []); 

    const getData = async () => {
        let u = await fetchuser(username)
        setCurrentUser(u); 
        let dbpayments = await fetchpayments(username); 
        // Ensure all payments are plain objects and remove problematic fields
        const plainPayments = dbpayments.map(p => {
            let obj = p;
            if (typeof p.toObject === 'function') {
                obj = p.toObject();
            }
            // Remove _id, createdAt, updatedAt, __v, and any nested objects
            const { _id, createdAt, updatedAt, __v, ...rest } = obj;
            return JSON.parse(JSON.stringify(rest));
        });
        setpayments(plainPayments);
    }

    const handlePayment = async(presetAmount = null) => {
        setIsProcessing(true);
        
        // Validate inputs
        if (!name.trim()) {
            alert('Please enter your name');
            setIsProcessing(false);
            return;
        }
        
        const paymentAmount = presetAmount || amount;
        if (!paymentAmount || isNaN(paymentAmount)) {
            alert('Please enter a valid amount');
            setIsProcessing(false);
            return;
        }

        const transaction_uuid = Date.now().toString();
        await saveEsewaPayment(
            name,
            username,
            transaction_uuid, // you must generate this before calling saveEsewaPayment
            message,
            paymentAmount
        );
        await initiatePayment(paymentAmount, transaction_uuid);
        };

        const initiatePayment = async(paymentAmount, transaction_uuid) => {
        const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        
        const paymentData = {
            amount: paymentAmount.toString(),
            tax_amount: 0,
            total_amount: paymentAmount.toString(),
            transaction_uuid, // use the same uuid as above
            product_code: "EPAYTEST", 
            product_service_charge: 0,
            product_delivery_charge: 0,
            success_url: "http://localhost:3000/success", 
            failure_url: "http://localhost:3000/failure", 
            signed_field_names: "total_amount,transaction_uuid,product_code"
        };

        // Get signed payment data from server
        const { signature: sig } = await initiateEsewaPayment(paymentData);
        setSignature(sig);
        setFormFields(paymentData);
        // Submit the form after state updates
        setTimeout(() => {
            if (formRef.current) formRef.current.submit();
        }, 100);
    };

    return (
    <>
    <div className='cover w-full bg-red-50 relative'>
        <img className='object-cover object-center w-full h-48 md:h-[350px]' src={CurrentUser.coverpic ? CurrentUser.coverpic : '/cover.jpg'} alt="" />
        <div className="absolute -bottom-20 right-[46%] border-b-gray-500 border-2 rounded-full">
        <img className = "rounded-full" width ={150} height ={150} src={CurrentUser.profilepic}></img>
        </div>
    </div>
    <div className="info flex justify-center items-center my-24 flex-col gap-2">
        <div className="title font-bold text-lg">
        @{username}
        </div>
         <div className='text-slate-400 text-s'>
            Lets help {username} get a tea!
        </div>
        <div className='text-slate-400 text-s'>
            {payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>
        <div className="description text-slate-400"></div>
        <div className="payment flex gap-3  w-[80%] text-white mt-11">
        <div className="supporters w-1/2 bg-slate-900 rounded-lg p-5">
            <h2 className='text-lg font-bold my-5 '>Supporters</h2>
            <ul className='mx-5'>
                {payments.length == 0 && <li>No payments yet</li>}
                {payments.map((p, i) => {
                return <li key = {p.oid || p._id || i} className='my-2 flex gap-2 items-center'>
                <img src = "/avatar.gif" width={33}/>
                {p.name} donated ₹{p.amount} with a message {p.message}
                </li>})}
                
            </ul>
            </div>

            <div className="makePayment w-1/2 bg-slate-900  rounded-lg p-5 px-10">
                <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                <div className="flex gap-2 flex-col">
                <input type = "text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' value = {name} onChange={(e)=> setName(e.target.value)}/>
                <input type = "text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' value = {message} onChange={(e)=> setMessage(e.target.value)}/>
                <input type = "text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' value = {amount} onChange={(e)=> setAmount(e.target.value)}/>
                <button onClick={() => handlePayment()}
                className="text-white bg-gradient-to-r from-cyan-800 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 
                focus:outline-none focus:ring-cyan-800 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Pay
                </button>
                </div>
                {/* Hidden form for eSewa submission */}
                <form ref={formRef} method="POST" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" style={{ display: 'none' }}>
                {Object.entries(formFields).map(([key, value]) => (
                    <input key={key} type="hidden" name={key} value={value} />
                ))}
                {signature && <input type="hidden" name="signature" value={signature} />}
                </form>
                <div className="flex gap-2 mt-5 justify-center">
                <button className='bg-slate-800 p-3 rounded-lg'
                onClick={(e)=>{
                    e.preventDefault();
                    setAmount('100');
                    handlePayment(100); 
                }}>
                    Pay ₹100
                </button>
                <button className='bg-slate-800 p-3 rounded-lg'
                onClick={(e)=>{
                    e.preventDefault();
                    setAmount('200');
                    handlePayment(200); 
                }}>
                    Pay ₹200
                </button>
                <button className='bg-slate-800 p-3 rounded-lg'
                onClick={(e)=>{
                    e.preventDefault();
                    setAmount('300');
                    handlePayment(300); 
                }}>
                    Pay ₹300
                </button>
                </div>
            </div>
        </div>
    </div>
    
    </>
    )
}

export default PaymentPage