import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
export const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(null)
    const [isOwner,setIsOwner]=useState(false)
    const [showLogin,setShowLogin]=useState(false)
    const [pickupDate,setPickupDate]=useState('')
    const [returnDate,setReturnDate]=useState('')

    const [cars,setCars]=useState([])

    const fetchUser=async()=>{
        try{
            const {data}=await axios.get('/api/user/data')
            if(data.success){
                setUser(data.user)
                setIsOwner(data.user.role==='owner'
                )
            }else{
                navigate('/')
            }

        }catch(err){
            toast.error(err.message)
        }
    }
    
    const fetchCars=async ()=>{
        try{
            const {data}=await axios.get('/api/user/cars')
            console.log(data.cars)
            data.success ?
                setCars(data.cars) :    
                toast.error(data.message)
            }
    
        catch(error){
            toast.error(err.message)
        }

    }

    const logout =()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization']=''
        toast.success("You Have been logged out")


    }

    useEffect(()=>{
        const token =localStorage.getItem('token')
        setToken(token)
        fetchCars()
    },[])

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser()
        }
    },[token])


    const val = {
        navigate, axios ,user,setUser,token,setToken,isOwner,setIsOwner,fetchUser,showLogin,setShowLogin,logout,fetchCars,cars,setCars,pickupDate,returnDate,setPickupDate,setReturnDate
    }
    return (<AppContext.Provider value={val}>
        {children}

    </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}