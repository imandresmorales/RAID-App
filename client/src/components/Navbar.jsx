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
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 text-white rounded">
        Logout
      </button>

    </>
  )
}

export default Navbar