const express = require("express");
const USER = require("../Model/userModel")
const bcrypt = require("bcrypt");
const router = express.Router();

const salt = bcrypt.genSaltSync(10);

router.get("/signup" , (req , res)=>{
    return res.json({msg:"Server is running Signup"})
})

router.post("/signup" , async(req,res)=>{
    let {name , rollNo , email , password ,branch} = req.body;
    let user = await USER.findOne({email});
    if(user){
        return res.status(403).json({msg:"Email already exist" , status:false});
    }

    user = await USER.findOne({rollNo});
    if(user){
        return res.status(403).json({msg:"RollNo already exist" , status:false});
    }
    password = bcrypt.hashSync(password , salt);
    user = await USER.create({name, rollNo , email , password, branch})
    if(user){
        console.log(user)
        return res.status(201).json({msg:user , status:true})
    }
    else{
        return res.status(500).json({msg:"Internal Server Error", status:false})
    }   
})

router.get("/login" , (req , res)=>{
    return res.json({msg:"Server is running Login"})
})

router.post("/login" , async(req,res)=>{
    let {rollNo , password} = req.body;
    let user = await USER.findOne({rollNo});
    if(user){
        if(bcrypt.compareSync(password , user.password)){
            return res.status(201).json({msg:user , status:true})
        }
        else{
            return res.status(401).json({msg:"Invalid Password" , status:false})
        }
    }   
    else{
        return res.status(404).json({msg:"User Not exist" , status:false})
    }
})

module.exports = router;