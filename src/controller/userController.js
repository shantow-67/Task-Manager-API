const UserModel = require('../model/userModel')
const OTPModel =require('../model/OTPmodel')
const jwt = require('jsonwebtoken')
const sendEmailUtility = require("../utility/senMail")
require("dotenv").config();



exports.registration = async (req, res) => {
    try {
        const reqBody = req.body

        const result = await UserModel.create(reqBody)
        res.status(200).json({status :"success",data : result})

    } catch (error) {
        console.log(error.message);
        
    }
}

exports.login = async (req, res) => {
    try {

        const reqBody = req.body
        const result = await UserModel.find(reqBody).count('total')
        if (result === 1) {
            // token issue
            const payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data : reqBody.email
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
            res.status(200).json({status :"success", data:token})
        }
    } catch (error) {
        res.status(400).json({status:"failed", data: error.message})
    }
}


exports.profileDetails = async (req, res) => {
    try {
        const email = req.headers.email
        const result = await UserModel.findOne({ email: email })
        res.status(200).json({ status: "success", data: result })
    } catch (error) {
        res.status(200).json({ status: "failed", data: error.message })
        
    }

};


exports.OTPsend = async (req, res) => {

    let email = req.params.email
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    try {
        await OTPModel.create({ email: email, otp: OTPCode })
        
        let result = await sendEmailUtility(email, `Your OTP is ${OTPCode}`, `Task Manager API `)
        res.status(200).json({ status: "OTP send success", data: result })

    } catch (error) {
        res.status(400).json({ status: " OTP procces failed ", data: error.message })
    }
};

exports.verifiOTP = async (req, res) => {
    let email = req.params.email
    let otp = req.params.otp
    try {
        let result = await OTPModel.find({ email: email, otp: otp, status: 0 }).count('total')
        if (result === 1) {
            await OTPModel.updateOne({ email: email, otp: otp, status: 0 }, { status: 1 });
            res.status(200).json({status:"Verification Success"})
        } else {
             res.status(200).json({ status: "OTP used", data:"please verify" })
        }
        
    } catch (error) {
        res.status(400).json({ status: " Verification failed ", data: error.message })
    }
}