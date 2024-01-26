const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./Routes/userRoute")

mongoose.connect(`${process.env.MONGO_URI}/enotes`)
    .then(()=>{console.log("Mongodb connected")})
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/user", userRoute);

app.listen(process.env.PORT , ()=>{
    console.log("Server Started")
})