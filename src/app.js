import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"15kb"}))//form bharane ke wakt data ata haia isaliye.
app.use(express.urlencoded({extended:true,limit:"15kb"}))//url ke data ke liye.
app.use(express.static("public"))//static ye sirf files, folders, ya koi bhi images ke liye store ke liye hai
app.use(cookieParser())//server me user ke cookie ki CRUD Operation ke liye hai


//import user router 
import userRouter from "./routes/User.routes.js"    

//routs declaration
app.use("/api.v1/users", userRouter) //company standard practic


export { app }