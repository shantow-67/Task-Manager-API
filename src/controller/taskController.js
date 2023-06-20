const taskModel = require('../model/taskModel')


exports.createTask = async (req, res) => {
    let reqBody = req.body 
    reqBody.email= req.headers['email']
    try {
        const result = await taskModel.create(reqBody)
        res.status(200).json({status:"Task Create success",data:result})
        
    } catch (error) {
        res.status(400).json({status:"failed",data:error.message})
    }
}


exports.updateTask = async (req, res) => {
    let id = req.params.id
    let reqBody = req.body
    let query = { _id: id }
    try {
        const result = await taskModel.updateOne(query, reqBody)
        res.status(200).json({status:"Task update success",data:result})
        
    } catch (error) {     
     res.status(400).json({status:"task update failed",data:error.message})    
    }
}

exports.deleteTask = async (req, res) => {
     let id = req.params.id
    let query = { _id: id }
    try {
        const result= await taskModel.deleteOne(query)
        res.status(200).json({status:"Task delete success",data:result})
    } catch (error) {
            res.status(400).json({status:"task delete failed",data:error.message})          
    }
}

exports.findTaskList = async (req, res) => {
    let status = req.params.status
    let email = req.headers['email']
    let query = { status: status, email: email }
    try {
        const result = await taskModel.find(query)
        res.status(200).json({status:"task list found",data:result})
    } catch (error) {
        res.status(400).json({status:"Task list not found",data:error.message}) 
    }
}