import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyBooking = () => {

  const { axios , user}=useAppContext()
  const [booking, setBooking] = useState([])

  const fetchMyBookings = async () => {
    try{
      const {data}=await axios.get('/api/bookings/user')
      if(data.success){
        setBooking(data.booking)


      }else{
        toast.error(data.message)
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  useEffect(() => {
    user && fetchMyBookings()
  }, [user])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl mb-14'>

      <Title title='My Booking' subTitle='View and manage your car bookings' align="left" />

      <div>
        {booking.map((item,index) => (
          <div
            key={item._id}
            className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12'
          >
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img
                  src={item.car.image}
                  alt=""
                  className='w-full h-auto aspect-video object-cover'
                />
              </div>

              <p>{item.car.brand} {item.car.model}</p>

              <p className='text-gray-500'>
                {item.car.year} • {item.car.category} • {item.car.location}
              </p>
            </div>

            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded '>Booking #{index+1}</p>
                <p className={`px-3 py-1 text-xs rounded-full ${item.status==='confirmed'?'bg-green-400/15 text-green-600': 'bg-red-400/15 text-red-600' }`}>{item.status}</p>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} className='w-4 h-4 mt-1' alt="" />
                <div>
                  <p className='text-gray-500'>Rental Period</p>
                  <p className=''>{item.pickupDate.split('T')[0]} To {item.returnDate.split('T')[0]}</p>
                </div>
              </div>
             
             
              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} className='w-4 h-4 mt-1' alt="" />
                <div>
                  <p className='text-gray-500'>Pickup Location</p>
                  <p className=''>{item.car.location}</p>
                </div>
              </div>


            </div>

            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
              <div className='text-sm text-gray-500 text-right'>
                <p >Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>{item.price}Rs.</h1>
                <p>Booked on {item.createdAt.split('T')[0]}</p>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default MyBooking
