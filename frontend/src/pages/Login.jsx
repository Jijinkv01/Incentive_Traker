import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/UserAuthContext'


const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { login } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!username) return setError("Username is Required")
        if (!password) return setError("Password is Required")
        setUsername("")
        setPassword("")
        setError("")
        try {
            const res = await axios.post("https://incentive-traker-backend.onrender.com/login", { username, password })
            const userData = res.data.user;
            login(userData); // pass only the user object
            localStorage.setItem("user", JSON.stringify(userData));

            if (res.data.success) {
                alert(res.data.message);
                navigate("/", { replace: true });
            }

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Login error');
        }

    }
    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1508780709619-79562169bc64')`,
            }}
        >
            <form onSubmit={handleLogin} className="w-[90%] sm:w-96 md:w-[400px] bg-white bg-opacity-20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-md flex flex-col gap-10">
                <h2 className="text-2xl font-bold text-center text-black">Login</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border"
                />
                {error && (
                    <p className='text-red-400 flex justify-center'>{error}</p>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Login
                </button>
                <p className="text-center text-sm text-black">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline font-medium"> Create one </Link>
                </p>
            </form>

        </div>
    )
}

export default Login
