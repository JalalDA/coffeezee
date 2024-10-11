import React, { useEffect, useState } from 'react'
import './signin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const login = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST}/auth/login`, {
                email,
                password
            })
            console.log({response});
            if(response.status === 200){
                localStorage.setItem("token", response.data?.token)
            }
            if(response.status === 200){
                navigate("/")
            }
        } catch (error) {
            console.log({ error });
            alert(error?.response?.data?.msg)
        }
        setIsLoading(false)
    }


    const [isLogin, setIsLogin] = useState(false)
    //ini akan di eksekusi ketika website pertama kali di load
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLogin(true)
        }
    }, [])

    useEffect(()=>{
        isLogin && navigate("/")
    }, [isLogin])
    return (
        <div className="container">
            <div className="gambar">
                <img className="signin_image" src="/images/signin_image.png" alt="sign in img" />
            </div>
            <div className="form">
                <div className="top">
                    <div className="logo">
                        <img src="/images/logo.svg" alt="logoimg" />
                        <span>Coffe Shop</span>
                    </div>
                    <button className="button-signup">Sign Up</button>
                </div>
                <h2 style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#6A4029" }}>Login
                </h2>
                <form action="">
                    <div className="form-input">
                        <label for="">Email Address</label>
                        <input className='input-signin' onChange={e => {
                            setEmail(e.target.value)
                        }} type="text" placeholder="Enter your email address . . ." />
                    </div>
                    <div className="form-input">
                        <label for="">Password</label>
                        <input className='input-signin' onChange={e=>{
                            setPassword(e.target.value)
                        }} type="password" placeholder="Enter your password  . . ." />
                    </div>

                    <div className="forgot">Forgot Password?</div>
                    <div onClick={login} className="btn-login cursor-pointer">{isLoading ? "loading. . . " : "Login"}</div>
                    <div id="btn-google" className="btn-google">
                        <img src="/images/google-icon.svg" alt="googleImge" />
                        Login With Google
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin