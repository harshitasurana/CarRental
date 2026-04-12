import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Verification = () => {
    const { id } = useParams()
    const location = useLocation()
    const state = location.state || {}   // ✅ FIXED (no crash on refresh)
    const navigate = useNavigate()
    const { axios } = useAppContext()

    const [aadhar, setAadhar] = useState(null)
    const [license, setLicense] = useState(null)
    const [aadharPreview, setAadharPreview] = useState(null)
    const [licensePreview, setLicensePreview] = useState(null)
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [generatedOtp, setGeneratedOtp] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [loading, setLoading] = useState(false)

    // 🚨 Handle missing data (VERY IMPORTANT)
    if (!state?.pickupDate || !state?.returnDate) {
        return (
            <div className="mt-20 text-center">
                <h2 className="text-xl font-semibold">Missing Booking Data</h2>
                <p className="text-gray-500 mt-2">Please select dates again</p>
                <button 
                    onClick={() => navigate('/cars')}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded"
                >
                    Go Back
                </button>
            </div>
        )
    }

    // 📱 Send OTP
    const sendOtp = () => {
        if (!/^[6-9]\d{9}$/.test(phone)) {
            return toast.error("Enter valid 10-digit phone number")
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000)
        setGeneratedOtp(otpCode.toString())
        setOtpSent(true)

        console.log("OTP:", otpCode) // simulated

        toast.success("OTP sent (check console)")
    }

    // 🚗 Submit booking
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!otpSent) {
            return toast.error("Please verify phone with OTP")
        }

        if (otp !== generatedOtp) {
            return toast.error("Invalid OTP")
        }

        if (!aadhar || !license) {
            return toast.error("Upload all documents")
        }

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append('car', id)
            formData.append('pickupDate', state.pickupDate)
            formData.append('returnDate', state.returnDate)
            formData.append('phone', phone)
            formData.append('aadhar', aadhar)
            formData.append('license', license)

            const { data } = await axios.post('/api/bookings/create', formData)

            if (data.success) {
                toast.success("Verification Done & Car Booked 🚗")
                navigate('/my-bookings')
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='px-6 md:px-20 mt-16 mb-20'>
            <h1 className='text-3xl font-bold mb-6'>Verify Your Documents</h1>

            <form onSubmit={handleSubmit} className='space-y-6 max-w-md shadow-lg p-6 rounded-xl'>

                {/* 📱 Phone */}
                <div>
                    <label className='block mb-1'>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='border p-2 w-full rounded'
                        required
                    />

                    <button
                        type="button"
                        onClick={sendOtp}
                        className="mt-2 bg-gray-200 px-3 py-1 rounded"
                    >
                        Send OTP
                    </button>
                </div>

                {/* 🔐 OTP */}
                {otpSent && (
                    <div>
                        <label className='block mb-1'>Enter OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>
                )}

                {/* 📄 Aadhar */}
                <div>
                    <label className='block mb-1'>Aadhar Card</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            setAadhar(file)
                            setAadharPreview(URL.createObjectURL(file))
                        }}
                        required
                    />
                    {aadharPreview && (
                        <img src={aadharPreview} className="h-24 mt-2 rounded" />
                    )}
                </div>

                {/* 🪪 License */}
                <div>
                    <label className='block mb-1'>Driving License</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            setLicense(file)
                            setLicensePreview(URL.createObjectURL(file))
                        }}
                        required
                    />
                    {licensePreview && (
                        <img src={licensePreview} className="h-24 mt-2 rounded" />
                    )}
                </div>

                {/* 🚗 Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className='w-full bg-primary hover:bg-primary-dull text-white py-3 rounded-xl'
                >
                    {loading ? "Processing..." : "Submit & Book"}
                </button>
            </form>
        </div>
    )
}

export default Verification