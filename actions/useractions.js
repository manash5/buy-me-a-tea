"use server"

import Payment from "@/models/payment"
import connectDb from "@/db/connectDb"
import User from "@/models/user"

export const saveEsewaPayment = async (name, to_user, oid, message, amount) => {
    await connectDb()
    let payment = new Payment({
        name,
        to_user,
        oid,
        message,
        amount,
        done: false, 
    })
    await payment.save()
}

export const fetchEsewaUser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    let payments = await Payment.find({ to_user: username, done:true })
        .sort({ amount: -1 })
        .limit(10)
        .lean()
        .then(payments => payments.map(payment => ({
            ...payment,
            _id: payment._id.toString(), // Convert ObjectId to string
            oid: payment.oid?.toString() // Convert if exists
        })));
    
    return payments;
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = { ...data } // FIX: use object spread instead of Object.fromEntries

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }
}

