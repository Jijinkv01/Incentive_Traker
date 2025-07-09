import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/UserAuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true });
  }
  return (
    <div>
      <nav className="w-full bg-white shadow-md px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <h1 className="text-2xl sm:text-2xl font-bold text-gray-800">
            <Link to="/"> Alina Trading </Link>
          </h1>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 border w-25 h-10 flex justify-center items-center bg-green-400 cursor-pointer">
            <Link to={"/recordes"}>Records</Link> 
          </h1>

          {/* Logout Button */}
          <button
              onClick={handleLogout}
            className="bg-red-500 text-white px-2 py-2 rounded-md text-sm sm:text-base  hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar