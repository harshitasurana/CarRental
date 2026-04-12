import React, { useEffect, useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const SideBar = () => {
    const { user, axios, fetchUser } = useAppContext()
    const location = useLocation()
    const [image, setImage] = useState('')
    const [name, setName] = useState(user?.name || '')
    const [isEditingName, setIsEditingName] = useState(false)
    

    useEffect(() => {
        setName(user?.name || '')
    }, [user])

    const updateImage = async () => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            const { data } = await axios.post('/api/owner/update-image', formData)
            if (data.success) {
                fetchUser()
                toast.success(data.message)
                setImage('')
            } else {
                toast.error(data.message)
            }
        } catch (err) {
             toast.error(err.message)
        }
        

    }

    const updateName = async () => {
        try {
            const { data } = await axios.post('/api/owner/update-name', { name })

            if (data.success) {
                fetchUser()
                toast.success(data.message)
                setIsEditingName(false)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8
max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>

            <div className='group relative'>
                <label htmlFor="image">
                    <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={image ? URL.createObjectURL(image) : user?.image || "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww"} alt="" />
                    <input type="file" id='image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
                    <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-blatk/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
                        <img src={assets.edit_icon} alt="" />
                    </div>
                </label>
            </div>
            {image && (
                <button className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer'onClick={updateImage}>Save <img src={assets.check_icon} width={13} alt=""  /> </button>
            )}

            <div className='mt-2 text-base max-md:hidden text-center'>
                {isEditingName ? (
                    <div className='flex flex-col items-center gap-1'>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border px-2 py-1 rounded text-sm'
                        />
                        <button
                            onClick={updateName}
                            className='text-primary text-xs'
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <p
                        onClick={() => setIsEditingName(true)}
                        className='cursor-pointer'
                    >
                        {user?.name}
                    </p>
                )}
            </div>

            <div className='w-full'>
                {ownerMenuLinks.map((link, index) => (
                    <NavLink key={index} to={link.path} className={`w-full relative flex items-center gap2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}>
                        <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="car icon" />
                        <span className='max-md:hidden'>{link.name}</span>

                        <div className={`${link.path === location.pathname && 'bg-primary'} w-1.5 h-8 rounded-l right-0 absolute`}></div>
                    </NavLink>
                ))}

            </div>

        </div>
    )
}

export default SideBar
