import User from "../models/User.js";
import fs from 'fs'

import imagekit from "../config/imgKit.js";
import Car from "../models/cars.js";
import Booking from "../models/Booking.js";
export const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { role: "owner" })

        res.json({ success: true, message: "Now you can list cars" })

    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}

export const addCar = async (req, res) => {
    try {
        const { _id } = req.user
        let car = JSON.parse(req.body.carData)
        const imgFile = req.file;

        const fileBuffer = fs.readFileSync(imgFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imgFile.originalname,
            folder: '/cars'
        })

        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [

                { width: "1280" },
                { quality: 'auto' },
                { format: 'webp' },

            ]
        })

        const img = optimizedImageUrl
        await Car.create({ ...car, owner: _id, image: img })

        res.json({ success: true, message: "car added" })



    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}

export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user
        const cars = await Car.find({ owner: _id })
        res.json({ success: true, cars })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}

export const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId } = req.body
        const car = await Car.findById(carId)

        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }
        car.isAvailable = !car.isAvailable
        await car.save()
        res.json({ success: true, message: "Availabilty Toggled" })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}

export const updateUserName = async (req, res) => {
    try {
        const { name } = req.body

        if (!name || name.trim().length < 2) {
            return res.json({
                success: false,
                message: "Name must be at least 2 characters"
            })
        }

        const { _id } = req.user   // ✅ FIXED

        const user = await User.findByIdAndUpdate(
            _id,
            { name },
            { new: true }
        )

        res.json({
            success: true,
            message: "Name updated successfully",
            user
        })

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId } = req.body
        const car = await Car.findById(carId)

        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }
        car.owner = null
        car.isAvailable = false
        await car.save()
        res.json({ success: true, message: "Car Removed" })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}
export const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user


        if (role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" })
        }
        const cars = await Car.find({ owner: _id })

        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 })

        const pendingBooking = await Booking.find({ owner: _id, status: "pending" })
        const completedBooking = await Booking.find({ owner: _id, status: "confirmed" })

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)

        const dashBoardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBooking.length,
            completedBookings: completedBooking.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue

        }

        res.json({ success: true, dashBoardData })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}

export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user
        const imgFile = req.file;

        const fileBuffer = fs.readFileSync(imgFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imgFile.originalname,
            folder: '/users'
        })

        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [

                { width: "400" },
                { quality: 'auto' },
                { format: 'webp' },

            ]
        })

        const image=optimizedImageUrl
        await User.findByIdAndUpdate(_id,{image})

        res.json({ success: true, message:"Image Updated" })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }

}



