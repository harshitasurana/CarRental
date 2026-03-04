import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => {
            navigate(`/car-details/${car._id}`); scrollTo(0, 0)
        }} className='group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500'>

            <div className='relative h-48 sm:h-52 overflow-hidden'>
                <img
                    src={car.image}
                    alt="Car Image"
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />

                {car.isAvailable && (
                    <p className='absolute top-3 left-3 bg-primary/90 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full shadow'>
                        Available Now
                    </p>
                )}

                <div className='absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-lg'>
                    <span className='font-semibold text-sm sm:text-base'>
                        {car.pricePerDay} Rs.
                    </span>
                    <span className='text-xs sm:text-sm text-white/80 ml-1'>
                        / day
                    </span>
                </div>
            </div>

            <div className='p-4 sm:p-5'>
                <div className='flex justify-between items-start mb-2'>
                    <div>
                        <h3 className='text-base sm:text-lg font-semibold text-gray-800'>
                            {car.brand} {car.model}
                        </h3>
                        <p className='text-gray-500 text-xs sm:text-sm'>
                            {car.category} ° {car.year}
                        </p>
                    </div>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-y-2 gap-x-4 text-gray-600'>
                    <div className='flex items-center text-xs sm:text-sm'>
                        <img src={assets.users_icon} alt="" className='h-4 mr-2 opacity-80' />
                        <span>{car.seating_capacity}</span>
                    </div>

                    <div className='flex items-center text-xs sm:text-sm'>
                        <img src={assets.fuel_icon} alt="" className='h-4 mr-2 opacity-80' />
                        <span>{car.fuel_type}</span>
                    </div>

                    <div className='flex items-center text-xs sm:text-sm'>
                        <img src={assets.car_icon} alt="" className='h-4 mr-2 opacity-80' />
                        <span>{car.transmission}</span>
                    </div>

                    <div className='flex items-center text-xs sm:text-sm'>
                        <img src={assets.location_icon} alt="" className='h-4 mr-2 opacity-80' />
                        <span className='truncate'>{car.location}</span>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CarCard
