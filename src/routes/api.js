const express = require('express')
const router = express.Router();
const userCon = require('../controller/userController')
const { authVerify } = require('../middleware/authVerify')
const taskCon = require('../controller/taskController')

// before login
router.post("/registration", userCon.registration)
router.post("/login", userCon.login)
router.get("/send-otp/:email", userCon.OTPsend)
router.get("/veryfy-otp/:email/:otp",userCon.verifiOTP)


// after login
router.get("/profile-details", authVerify, userCon.profileDetails)

// Task manage
router.post("/create-task", authVerify, taskCon.createTask)
router.post("/update-task/:id", authVerify, taskCon.updateTask)
router.delete("/delete-task/:id", authVerify, taskCon.deleteTask)
router.get("/find-task-list/:status",authVerify,taskCon.findTaskList)



module.exports = router