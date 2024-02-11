const express = require("express");
const USER = require("../Model/userModel")
const bcrypt = require("bcrypt");
const router = express.Router();

const salt = bcrypt.genSaltSync(10);

router.get("/signup" , (req , res)=>{
    return res.json({msg:"Server is running Signup"})
})

router.post("/signup" , async(req,res)=>{
    let {name , rollNo , email , password} = req.body;
    let user = await USER.findOne({email});
    if(user){
        return res.json({msg:"Email already exist" , status:false});
    }

    user = await USER.findOne({rollNo});
    if(user){
        return res.json({msg:"RollNo already exist" , status:false});
    }
    const branch = rollNo.charAt(5) + rollNo.charAt(6)
    password = bcrypt.hashSync(password , salt);
    user = await USER.create({name, rollNo , email , password, branch})
    if(user){
        return res.json({msg:user , status:true})
    }
    else{
        return res.json({msg:"Internal Server Error", status:false})
    }   
})

router.post("/api/signup" , async(req,res)=>{
    let {name , rollNo , email , password} = req.body;
    let user = await USER.findOne({email});
    if(user){
        return res.json({msg:"Email already exist" , status:false});
    }

    user = await USER.findOne({rollNo});
    if(user){
        return res.json({msg:"RollNo already exist" , status:false});
    }
    const branch = rollNo.charAt(5) + rollNo.charAt(6)
    password = bcrypt.hashSync(password , salt);
    user = await USER.create({name, rollNo , email , password, branch})
    if(user){
        return res.json({msg:user._id , status:true})
    }
    else{
        return res.json({msg:"Internal Server Error", status:false})
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
            return res.json({msg:user , status:true})
        }
        else{
            return res.json({msg:"Invalid Password" , status:false})
        }
    }   
    else{
        return res.json({msg:"User Not exist" , status:false})
    }
})

router.post("/api/login" , async(req,res)=>{
    let {rollNo , password} = req.body;
    let user = await USER.findOne({rollNo});
    if(user){
        if(bcrypt.compareSync(password , user.password)){
            return res.json({msg:user._id , status:true})
        }
        else{
            return res.json({msg:"Invalid Password" , status:false})
        }
    }   
    else{
        return res.json({msg:"User Not exist" , status:false})
    }
})

module.exports = router;