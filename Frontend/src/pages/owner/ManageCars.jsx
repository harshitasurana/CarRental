import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { assets, dummyCarData } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {

  const {axios,isOwner}=useAppContext()
  const [cars, setCars] = useState([])
  const fetchOwnerCars = async () => {
    try{
      const {data}=await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
        }catch(err){
            toast.error(err.message)
        }
  }

  const toggleAvalability = async (carId) => {
    try{
      const {data}=await axios.post('/api/owner/toggle-car',{carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
        }catch(err){
            toast.error(err.message)
        }
  }
  
  const deleteCar = async (carId) => {

    try{
      const confirm=window.confirm('Are you sure you want to delete this car?')

      if(!confirm) return null

      const {data}=await axios.post('/api/owner/delete-car',{carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
        }catch(err){
            toast.error(err.message)
        }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <div className='px-4 py-10 md:px-10 w-full'>
      <Title title={"Manage Cars"} subTitle={"View all listed cars, update their details, or remove them from the booking platform"} />

      <div className='max-w-4xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>

          <thead className='text-gray-500 bg-gray-50'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className='border-t border-borderColor align-middle hover:bg-gray-50 transition'>

                {/* Car */}
                <td className='p-3'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={car.image}
                      alt=""
                      className='h-12 w-12 rounded-md object-cover'
                    />
                    <div className='max-md:hidden'>
                      <p className='font-medium'>{car.brand} {car.model}</p>
                      <p className='text-xs text-gray-500'>
                        {car.seating_capacity} • {car.transmission}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className='p-3 max-md:hidden'>{car.category}</td>

                {/* Price */}
                <td className='p-3'>{car.pricePerDay} Rs. /day</td>

                {/* Status */}
                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
              ${car.isAvailable
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"}`}>
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                {/* Actions */}
                <td className='p-3'>
                  <div className='flex items-center justify-center gap-4'>
                    <img
                    onClick={()=>toggleAvalability(car._id)}
                      src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                      alt=""
                      className=' cursor-pointer opacity-70 hover:opacity-100 transition'
                    />
                    <img
                    onClick={()=>deleteCar(car._id)}
                      src={assets.delete_icon}
                      alt=""
                      className='cursor-pointer opacity-70 hover:opacity-100 transition'
                    />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ManageCars
