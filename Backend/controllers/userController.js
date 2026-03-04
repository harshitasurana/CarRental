import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const genToken=(userId)=>{
    const payLoad=userId
    return jwt.sign(payLoad,'rental2026')
}

export const registerUser = async (req,res)=>{

    try{
        const {name,email,password}=req.body
        if(!name || !email || !password || password.length<8){
            return res.json({success:false,message:'Fill all the fields'})
        }

        const userExist = await User.findOne({email})

        if(userExist){
            return res.json({success:false,message:'Fill all the fields'})
        }

        const hashPass=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashPass})

        const token = genToken(user._id.toString())
        res.json({success:true,token})


    } catch(err){

        console.log(err.message);
        res.json({success:false,message:err.message})
        

    }

}

export const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = genToken(user._id.toString())
        res.json({success:true,token})



    }catch(err){
        console.log(err.message);
        res.json({success:false,message:err.message})
    }
}