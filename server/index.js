const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv").config()
const connectDB=require("./config/dbConnect")
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes"); 
const adminRoutes=require("./routes/adminRoutes")
const studentRoutes=require("./routes/studentRoutes")
const placementRoutes=require("./routes/placementRoutes")
const app=express();

app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL], 
    credentials: true, 
}))

const port=process.env.PORT || 5500;
app.use(express.json())

app.use("/api/auth",authRoutes); 
app.use("/api/jobs", jobRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/student",studentRoutes)
app.use("/api",placementRoutes)

app.listen(port,()=>{
    console.log(`I am a express project running on ${port}`)
    connectDB()

})