import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios'

const Profile = () => {
    const token = localStorage.getItem('token')
    const [profile, setProfile] = useState({})
    const getProfile = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/user/profile`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            setProfile(response?.data?.dataUser)
        } catch (error) {
            console.log({error});
        }
    }


    useEffect(()=>{
        getProfile()
    }, [])
    return (
        <div>
            <Navbar />
            {/* profile */}
            <div className="">
                <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:px-28 md:py-14 p-4">
                    <div className="w-full md:w-1/4 h-[400px] shadow-xl flex flex-col items-center justify-center p-8 gap-4 rounded-md">
                        <img src={profile?.img || "/images/profile.png"} alt="profile img" className='rounded-full object-cover' />
                        <div className="text-xl font-bold">{profile?.username}</div>
                        <div className="text-md">{profile?.email}</div>
                    </div>
                    <div className="w-full md:w-3/4 h-[400px] p-8 gap-4 rounded-md shadow-xl">
                        <div className="flex items-center justify-between">
                            <div className="text-lg text-gray-500 font-bold">Contacts</div>
                            <div className="text-lg">Icon Pen</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className='flex items-start flex-col gap-2 justify-start'>
                                <label className='text-gray-500' htmlFor="email-address">Email Address :</label>
                                <input defaultValue={profile?.email || ""} id='email-address' type="text" className='w-full outline-none border-b-2 border-black' />
                            </div>
                            <div className='flex items-start flex-col gap-2 justify-start'>
                                <label className='text-gray-500' htmlFor="email-address">Mobile Number :</label>
                                <input id='email-address' type="text" className='w-full outline-none border-b-2 border-black' />
                            </div>
                            <div className='flex items-start flex-col gap-2 justify-start'>
                                <label className='text-gray-500' htmlFor="email-address">Delivery Address :</label>
                                <input id='email-address' type="text" className='w-full outline-none border-b-2 border-black' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-12 px-28 py-14">
                    <div className="w-3/4 h-20 bg-green-500"></div>
                    <div className="w-1/4 h-20 bg-blue-500"></div>
                </div>
            </div>
        </div>
    )
}

export default Profile