import express from "express"
import User from "./models/users.js"

const router = express.Router()

router.get('/users',async(req,res)=>{
    const users = await User.findAll()
    res.json(users)
})

router.post('/users/create',(req,res)=>{
    
})


export default router