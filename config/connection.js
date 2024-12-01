import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()
// establish a connection 
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connection success");
}).catch((err) => {
    console.log("connection failed with error : " + err)
})