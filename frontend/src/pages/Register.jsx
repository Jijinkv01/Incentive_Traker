import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import axiosInstance from '../api'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleRegister = async(e) => {
        e.preventDefault()
        if(!username){
           return setError("Username is Required")
        }
        if(!password){
           return setError("Passwod is Required")
        }
        setError("")
        setUsername("")
        setPassword("")

        try {
            const res = await axiosInstance.post("/register",{username, password})
            console.log(username, password)
            if(res.data.success){
                alert(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || 'Something went wrong')
        }
    }

  return (
    <div
            className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1508780709619-79562169bc64')`,
            }}
        >
            <form onSubmit={handleRegister} className="w-[90%] sm:w-96 md:w-[400px] bg-white bg-opacity-20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-md flex flex-col gap-10">
                <h2 className="text-2xl font-bold text-center text-black">Register</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="Username"
                    className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border"
                />
                
                <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password"
                    className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border"
                />
                {error && (
                    <p className='text-red-500 flex justify-center'>{error}</p>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Signup
                </button>
                <p className="text-center text-sm text-black">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium"> Login here </Link>
                </p>
            </form>

        </div>
  )
}

export default Register
