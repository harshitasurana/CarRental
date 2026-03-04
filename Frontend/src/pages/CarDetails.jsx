import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [car, setCar] = useState(null)

  const handleSubmit= async ()=>{
    e.preventDefault()
  }

  useEffect(() => {
    setCar(dummyCarData.find(car => car._id === id))
    
    
  }, [id])

  console.log(car);
  

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-20' >
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} className='rotate-180 opacity-65' alt="" />
        Back to all cars
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>

        <div className='lg:col-span-2'>
          <img src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md' />

          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl  font-bold '>
                {car.brand} {car.model}
              </h1>
              <p className='text-gray-500 text-lg '>
                {car.category} ° {car.year}
              </p>
            </div>

            <hr className=' border-borderColor my-6' />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seates` },
                { icon: assets.fuel_icon, text: `${car.fuel_type} Seates` },
                { icon: assets.car_icon, text: `${car.transmission} Seates` },
                { icon: assets.location_icon, text: `${car.location} Seates` },
              ].map(({ icon, text }) => (
                <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2' />{text}
                </div>
              ))}

            </div>

            <div>
              <h1 className='text-xl mb-3 font-medium'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>

            </div>

            <div >
              <p className='text-xl mb-3 font-medium'>Features</p>
              <ul>{
                ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((item) => (
                  <li key={item} className='flex items-center text-gray-500'>
                    <img src={assets.check_icon} alt="" className='h-4 mr-2' />
                    {item}
                  </li>
                ))
              }</ul>
            </div>



          </div>
        </div>

        <form onSubmit={handleSubmit} action="" className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'>
              <p className='flex items-center justify-between text-2xl text-gar800 font-semibold '>{car.pricePerDay}Rs.<span className='text-base text-gray-400 font-normal'>per day </span></p>
              <hr className='border-borderColor my-6'/>

              <div className='flex flex-col gap-2'>
                <label htmlFor="pickup-date">Pickup Date</label>
                <input type="date" className='border-borderColor px-3 py2 rounded-lg' required id='pickup-date' min={new Date().toISOString().split('T')[0]}/>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="return-date">Return Date</label>
                <input type="date" className='border-borderColor px-3 py2 rounded-lg' required id='return-date' />
              </div>

              <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>Book Now</button>
              <p className='text-center text-sm'>No credit card required to reserve</p>


        </form>
      </div>





    </div>
  ) : <Loader />
}

export default CarDetails
