import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { dummyMyBookingsData } from '../../assets/assets'

const ManageBookings = () => {

  const [bookings, setBookings] = useState([])
  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData)
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className='px-4 py-10 md:px-10 w-full'>
      <Title title={"Manage Bookings"} subTitle={"Track all customer bookings, approve or cancel requests, and manage booking statues"} />

      <div className='max-w-4xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>

        <table className='w-full border-collapse text-left text-sm text-gray-600'>

          <thead className='text-gray-500 bg-gray-50'>
            <tr>
              <th className='p-3 font-medium'>Car</th>
              <th className='p-3 font-medium max-md:hidden'>Date Range</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium text-center'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className='border-t border-borderColor align-middle hover:bg-gray-50 transition'>

                
                <td className='p-3'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={booking.car.image}
                      alt=""
                      className='h-12 w-12 rounded-md object-cover'
                    />
                    <div className='max-md:hidden'>
                      <p className='font-medium'>{booking.car.brand} {booking.car.model}</p>
                      <p className='text-xs text-gray-500'>
                        {booking.car.seating_capacity} • {booking.car.transmission}
                      </p>
                    </div>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>
                  {booking.pickupDate.split('T')[0] } to {booking.returnDate.split('T')[0]}
                </td>

                <td className='p-3'>{booking.price} Rs. /day</td>

                <td className='p-3 max-md:hidden'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-xs'>offline</span>
                </td>

                <td className='p-3'>
                  {booking.status==='pending'?(
                    <select value={booking.status} className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>
                      <option value="pending">pending</option>
                      <option value="cancelled">cancelled</option>
                      <option value="confirmed">confirmed</option>
                    </select>
                  ):(
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status==='confirmed'?'bg-green-100 text-green-500':'bg-red-100 text-red-500'}`}>{booking.status}</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default ManageBookings
