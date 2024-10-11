import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigation = useNavigate()
    const [isLogin, setIsLogin] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    //ini akan di eksekusi ketika website pertama kali di load
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLogin(true)
        }
    }, [])
    return (
        <div className='w-full flex items-center justify-between p-8'>
            <div className="logo font-bold text-lg">Coffeezee</div>
            <div className="navigasi flex items-center justify-center gap-x-8 list-none">
                <li>Home</li>
                <li>Product</li>
                <li>Your Cart</li>
                <li>History</li>
            </div>
            {
                isLogin ?
                    <div onClick={()=>{
                        setShowProfile(!showProfile)
                    }} className="h-10 w-10 relative bg-yellow-500 rounded-full cursor-pointer">
                        {
                            showProfile &&
                            <div className="absolute flex flex-col items-start justify-start gap-4 bg-white shadow-md -left-16 top-6 p-4 rounded-md">
                                <Link className='text-xs' to={"/profile"}>Profile</Link>
                                <div onClick={()=>{
                                    localStorage.removeItem("token")
                                    window.location.reload()
                                }} className="text-xs">Logout</div>
                            </div>
                        }
                    </div> :
                    <div className="authentikasi flex items-center gap-x-4">
                        <button onClick={() => {
                            navigation("/signin")
                        }} className='px-8 py-2 items-center justify-center shadow-md rounded-md'>Sign In</button>
                        <div onClick={() => {
                            navigation("/signup")
                        }} className='px-8 py-2  cursor-pointer items-center justify-center bg-orange-950 text-white rounded-md'>Sign Up</div>
                    </div>
            }
        </div>
    )
}

export default Navbar