import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate()
  return (
    <div className='bg-light/70'>
        <div className='flex flex-col md:flex-row md:items-start items-center justify-between px-8 md:pl-14 pt-10 
bg-gradient-to-r from-[#4469cf] via-[#1E40AF] to-[#60A5FA] 
max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden
bg-white/50 backdrop-blur-xl border border-white/20 shadow-xl shadow-blue-900/20'>

    <div className='text-white max-w-lg'>
        <h2 className='text-2xl sm:text-3xl font-medium'>
            Let your car earn while you relax
        </h2>

        <p className='mt-2 text-sm sm:text-base leading-relaxed text-white/90'>
            When you're not driving, your car could be generating real income. We ensure safe rentals, verified drivers, and secure transactions so you can earn with complete peace of mind.
        </p>

        <p className='mt-4 font-semibold text-white/95'>
            Start Earning Now
        </p>

        <button onClick={() => navigate('/owner/add-car')} className='mt-4 px-6 py-2.5 bg-white/90 text-primary rounded-lg font-medium hover:bg-white transition backdrop-blur-md'>
            List your car
        </button>
    </div>

    <img
        src={assets.car_banner}
        alt="car banner"
        className='max-h-48 sm:max-h-56 md:max-h-60 mt-8 md:mt-0 drop-shadow-2xl'
    />
</div>
    </div>



  )
}

export default Banner
