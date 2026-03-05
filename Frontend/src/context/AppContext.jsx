import { createContext, useContext, useEffect, useState } from "react";
import { axios } from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
export const AppContext = createContext();


export const AppProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token,setToken]=useState(null)
    const [user,setuser]=useState(null)
    const [isOwner,setisOwner]=useState(false)
    const [showLogin,setshowLogin]=useState(false)
    const [pickupDate,setpickupDate]=useState('')
    const [returnDate,setreturnDate]=useState('')

    const [cars,setCars]=useState([])

    const fetchUser=async()=>{
        try{
            const {data}=await axios.get('/api/user/data')
            if(data.success){
                setuser(data.user)
                setisOwner(data.user.role==='owner'
                )
            }else{
                navigate('/')
            }

        }catch(err){
            toast.err(err.message)
        }
    }

    

    useEffect(()=>{
        const token =localStorage.getItem('token')
        setToken(token)
    },[])
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser()
        }
    },[token])
    const val = {
        navigate,
    }
    return (<AppContext.Provider>
        {children}

    </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}