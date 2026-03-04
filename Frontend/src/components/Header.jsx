import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'

const Header = () => {

  const [pickupLoc, setPickupLoc] = useState('')

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>

      <h1 className='mt-13 text-4xl md:text-5xl font-semibold'>Luxury cars on rent</h1>

      <form className='flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-lg md:rounded-full w-full max-w-xs md:max-w-5xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]' action="">

        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-4 flex-1'>

          <select
            required
            value={pickupLoc}
            onChange={(e) => setPickupLoc(e.target.value)}
            className='outline-none'
          >
            <option value="">Pickup Location</option>
            {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>

          <p className='px-1 text-sm text-gray-500 whitespace-nowrap'>
            {pickupLoc ? pickupLoc : 'Please Select Location'}
          </p>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              type="date"
              id='pickup-date'
              min={new Date().toISOString().split('T')[0]}
              className='text-sm text-gray-500 outline-none'
              required
            />
          </div>

          <div className='flex flex-col items-start gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id='return-date'
              className='text-sm text-gray-500 outline-none'
              required
            />
          </div>
        </div>

        <button className='flex items-center justify-center gap-1 px-9 py-3 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer w-full md:w-auto'>
          <img src={assets.search_icon} alt="searchIcon" className='brightness-300' />
          Search
        </button>

      </form>


      <img src={assets.main1} alt="car" />

    </div>
  )
}

export default Header
