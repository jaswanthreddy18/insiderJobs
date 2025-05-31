import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
const app = express();
dotenv.config();
//middlewear
app.use(cors({
  origin: "https://insider-jobs-phx7.vercel.app",
  credentials: true                            
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());  
const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)
app.listen(PORT, () => {
    connectDB();
    console.log(`server running at port ${PORT}`) 
}) 
