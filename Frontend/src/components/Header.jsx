import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion } from "framer-motion"

const Header = () => {

  const [pickupLoc, setPickupLoc] = useState('')
  const { pickupDate, returnDate, setPickupDate, setReturnDate, navigate } = useAppContext()

  const handleSearch = (e) => {
    e.preventDefault()

    navigate(
      '/cars?pickupLocation=' +
      pickupLoc +
      '&pickupDate=' +
      pickupDate +
      '&returnDate=' +
      returnDate
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video1.mp4" type="video/mp4" />
      </motion.video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 px-4 -mt-32">

        {/* TITLE */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white text-4xl md:text-5xl font-semibold drop-shadow-lg"
        >
          Luxury cars on rent
        </motion.h1>

        {/* SEARCH CARD */}
        <motion.form
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl
           w-full max-w-5xl bg-white/90 backdrop-blur-md shadow-xl"
        >

          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 flex-1">

            {/* LOCATION */}
            <select
              required
              value={pickupLoc}
              onChange={(e) => setPickupLoc(e.target.value)}
              className="outline-none cursor-pointer"
            >
              <option value="">Pickup Location</option>

              {cityList.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}

            </select>

            <p className="text-sm text-gray-500">
              {pickupLoc ? pickupLoc : "Please Select Location"}
            </p>

            {/* PICKUP DATE */}
            <div className="flex flex-col gap-1">
              <label>Pickup Date</label>

              <input
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="outline-none text-sm cursor-pointer"
                required
              />

            </div>

            {/* RETURN DATE */}
            <div className="flex flex-col gap-1">
              <label>Return Date</label>

              <input
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                type="date"
                className="outline-none text-sm cursor-pointer"
                required
              />

            </div>

          </div>

          {/* SEARCH BUTTON */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-9 py-3 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
          >

            <img src={assets.search_icon} alt="search" className="brightness-300" />

            Search

          </motion.button>

        </motion.form>

      </div>

    </div>
  )
}

export default Header