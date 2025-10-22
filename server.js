import e from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import dbConnect from "./dbConnect.js";
import authenticate from "./middleware/verifySession.js";
import {toNodeHandler} from 'better-auth/node';
import { auth } from "./auth.js";

import linkRoutes from "./routes/link.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import { getUserData } from "./controllers/userController.js";


// PORT
const PORT = process.env.PORT


const app = e();

// connect to mongodb
dbConnect()

// header middleware
app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))

// Better Auth catch all
app.all("/api/auth/*splat", toNodeHandler(auth));

// body middleware
app.use(e.json())
app.use(e.urlencoded({extended: true}))


// routes
app.get("/", (req, res)=>{
    res.send("200 MERN server is running ....")
})

// to query all the links and categories of the user on load
app.use("/api/user/data", authenticate, getUserData)
app.use("/api/link", authenticate, linkRoutes)
app.use("/api/category", authenticate, categoryRoutes)



// listner
app.listen(PORT, ()=>{
    console.log(`200! Server is listening on http://localhost:${PORT}`)
})