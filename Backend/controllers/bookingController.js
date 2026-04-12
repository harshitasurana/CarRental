import Booking from "../models/Booking.js"
import Car from "../models/cars.js"
import fs from 'fs'
import imagekit from '../config/imgKit.js'

const checkAvailability = async (car, pickupDate, returnDate) => {
    const booking = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate }
    })
    return booking.length === 0

}

export const checkAvailabilityofCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body
        const cars = await Car.find({
            location,
            isAvailable: true
        })

        const availableCarPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)

            return { ...car._doc, isAvailable: isAvailable }

        })

        let availableCars = await Promise.all(availableCarPromises)
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({ success: true, availableCars })

    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}

export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user

        // ✅ OLD DATA (kept same but safe)
        const car = req.body?.car
        const pickupDate = req.body?.pickupDate
        const returnDate = req.body?.returnDate
        const phone = req.body?.phone

        // ✅ NEW FILES
        const aadharFile = req.files?.aadhar?.[0]
        const licenseFile = req.files?.license?.[0]

        // ✅ VALIDATION
        if (!car || !pickupDate || !returnDate) {
            return res.json({ success: false, message: "Missing booking data" })
        }

        if (!aadharFile || !licenseFile) {
            return res.json({ success: false, message: "Documents required" })
        }

        // 🔥 UPLOAD AADHAR
        const aadharBuffer = fs.readFileSync(aadharFile.path)

        const aadharUpload = await imagekit.upload({
            file: aadharBuffer,
            fileName: aadharFile.originalname,
            folder: '/documents/aadhar'
        })

        const aadharUrl = imagekit.url({
            path: aadharUpload.filePath,
            transformation: [
                { width: "600" },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        })

        // 🔥 UPLOAD LICENSE
        const licenseBuffer = fs.readFileSync(licenseFile.path)

        const licenseUpload = await imagekit.upload({
            file: licenseBuffer,
            fileName: licenseFile.originalname,
            folder: '/documents/license'
        })

        const licenseUrl = imagekit.url({
            path: licenseUpload.filePath,
            transformation: [
                { width: "600" },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        })

        // ✅ EXISTING LOGIC (UNCHANGED)
        const isAvailable = await checkAvailability(car, pickupDate, returnDate)

        if (!isAvailable) {
            return res.json({ success: false, message: "Car is not available" })
        }

        const carData = await Car.findById(car)

        const pick = new Date(pickupDate)
        const returned = new Date(returnDate)
        const noOfDays = Math.ceil((returned - pick) / (1000 * 60 * 60 * 24))

        const price = carData.pricePerDay * noOfDays

        // ✅ SAVE WITH NEW DATA
        await Booking.create({
            car,
            owner: carData.owner,
            user: _id,
            pickupDate,
            returnDate,
            price,
            phone,
            aadhar: aadharUrl,
            license: licenseUrl
        })

        res.json({ success: true, message: "Booking Created" })

    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}

export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user

        const booking = await Booking.find({ user: _id }).populate
            ("car").sort({ createdAt: -1 })

        res.json({ success: true, booking })
    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message })
    }
}
export const getOwnerBookings = async (req, res) => {
    try {

        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const booking = await Booking.find({ owner: req.user._id })
            .populate('car user')
            .select("-user.password")
            .sort({ createdAt: -1 });

        res.json({ success: true, booking });

    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message });
    }
};

export const changeBookingStatus = async (req, res) => {
    try {

        const { _id } = req.user

        const {bookingId,status}=req.body

        const booking = await Booking.findById(bookingId)
        if(booking.owner.toString()!==_id.toString()){
            return res.json({ success: false, message:"Unauthorized" })
        }

        booking.status=status
        await booking.save()



        res.json({ success: true, message:"Status Updated" });

    } catch (err) {
        console.log(err.message);
        res.json({ success: false, message: err.message });
    }
};