import { useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";
import { useNavigate } from 'react-router-dom';

import React from 'react'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth')
  }
  return (
    <>
      <nav className="max-w-7xl mx-auto flex flex-row justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-mono">The<strong className="text-[#4d73ffd8]">Log</strong></h2>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 text-white font-mono text-base rounded">
          Logout
        </button>
      </nav>
    </>
  )
}

export default Navbar