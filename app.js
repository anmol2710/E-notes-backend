const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./Routes/userRoute")

mongoose.connect("mongodb+srv://anmol:anmol@cluster0.yrfyo8v.mongodb.net/E-Notes?retryWrites=true&w=majority")
    .then(()=>{console.log("Mongodb connected")})
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get("/" , (req,res)=>{
    return res.json({msg:"I am running"})
})
app.use("/user", userRoute);

app.listen(process.env.PORT , ()=>{
    console.log("Server Started")
})