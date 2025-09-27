import e from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import dbConnect from "./dbConnect.js";


// PORT
const PORT = process.env.PORT


const app = e();

// connect to mongodb
// dbConnect()

// header middleware
app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))

// body middleware
app.use(e.json())
app.use(e.urlencoded({extended: true}))

// routes
app.get("/", (req, res)=>{
    res.send("200 MERN server is running ....")
})



// listner
app.listen(PORT, ()=>{
    console.log(`200! Server is listening on http://localhost:${PORT}`)
})
