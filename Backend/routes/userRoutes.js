import express from 'express'
import { userLogin,registerUser, getUserData, getCarsData } from '../controllers/userController.js'

import {protect} from "../middleware/auth.js"

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)

userRouter.get('/data',protect,getUserData)
userRouter.get('/cars',getCarsData)



export default userRouter