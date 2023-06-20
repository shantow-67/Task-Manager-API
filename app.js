const express=require('express');
const router=require('./src/routes/api');
const app=new express();
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const cors=require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

//Security
app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded());

// JSON Parser
// app.use(express.json())




// Rate Limiting
const limiter=rateLimit({windowMs:15*60*1000,max:300});
app.use(limiter);


// database connect
mongoose.connect(process.env.DATABASE_URL, {autoIndex:true})
    .then((res) => {
        console.log("Success")
    })
    .catch((err) => {
        console.log(err)
    })
    

// router handle
app.use("/api/v1",router);

// fault route handle
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
});

module.exports = app;

