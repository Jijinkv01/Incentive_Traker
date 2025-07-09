const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require("./config/connectDB")
const UserRouter = require("./routes/userRouter")

app.use(express.json())
const cors = require("cors")

const PORT = process.env.PORT || 3000
const corsOptions = {
  origin: process.env.CLIENT_URL, 
  credentials: true,              
};
app.use(cors(corsOptions))

app.use("/",UserRouter)

connectDB()
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

