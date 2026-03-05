import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './config/db.js'
import userRouter from './routes/userRoutes.js'
import ownerRouter from './routes/ownerRoutes.js'
import dotenv from "dotenv";
import dns from 'dns'
import bookingRouter from './routes/bookingRoutes.js'

dns.setServers(['1.1.1.1','8.8.8.8'])

dotenv.config();
const app=express()

await connectDb()

app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("server is runn")
})

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`server runn on ${PORT}`))
