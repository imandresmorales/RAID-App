import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk, registerThunk } from '../reducers/authReducer'
import { useNavigate } from 'react-router-dom'

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('signin')
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" })

  const { loading, error, isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard')
    }
  }, [loading, isAuthenticated, navigate])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeTab === 'signup') {
        await dispatch(registerThunk(formData)).unwrap();
        console.log("Registration successful");
      } else {
        await dispatch(loginThunk(formData)).unwrap();
        console.log("Login successful");
      }

      setFormData({ fullName: '', email: '', password: '' });

    } catch (err) {
      console.log("Register/Login failed:", err);
    }
  };
  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen bg-gray-200'>
        <div className='bg-white p-8 shadow-md rounded-lg w-full max-w-md'>
          <div className='flex justify-center mb-6'>
            <button onClick={() => setActiveTab('signin')} className={` w-full px-4 py-2 rounded-1-md ${activeTab == 'signin' ? 'bg-white text-black' : 'bg-gray-300 text-white'}`}>Sign In</button>
            <button onClick={() => setActiveTab('signup')} className={` w-full px-4 py-2 rounded-r-md ${activeTab == 'signup' ? 'bg-white text-black' : 'bg-gray-300 text-white'}`}>Sign Up</button>
          </div>

          <form onSubmit={handleSubmit}>
            {
              activeTab == 'signup' && (
                <input type='text' name='fullName' placeholder='Your Name' value={formData.fullName} onChange={handleChange} required className='w-full border px-3 py-2 rounded mb-4' />
              )
            }

            <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required className='w-full border px-3 py-2 rounded mb-4' />
            <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required className='w-full border px-3 py-2 rounded mb-4' />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'> {loading ? 'Processing...' : activeTab === 'signin' ? 'Sign In' : 'Sign Up'}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthPage