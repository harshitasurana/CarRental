import express from 'express'
import { protect } from '../middleware/auth.js'
import { changeBookingStatus, checkAvailabilityofCar, createBooking, getOwnerBookings, getUserBookings } from '../controllers/bookingController.js'
import upload from '../middleware/multer.js' 
const bookingRouter=express.Router()

bookingRouter.post('/check-availability',checkAvailabilityofCar)
bookingRouter.post(
  '/create',
  upload.fields([
    { name: 'aadhar', maxCount: 1 },
    { name: 'license', maxCount: 1 }
  ]),
  protect,
  createBooking
)

bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/owner',protect,getOwnerBookings)
bookingRouter.post('/change-status',protect,changeBookingStatus)

export default bookingRouter