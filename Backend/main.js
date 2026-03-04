import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './config/db.js'
import userRouter from './routes/userRoutes.js'

const app=express()

await connectDb()

app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("server is runn")
})

app.use('/api/user',userRouter)

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`server runn on ${PORT}`))
