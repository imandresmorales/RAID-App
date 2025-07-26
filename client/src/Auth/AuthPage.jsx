import React, { useState } from 'react'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin')
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" })


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = activeTab === "signup" ? formData.fullName : 'User';
    const action = activeTab == "signin" ? 'Login' : 'SignUp';

    setFormData({ fullName: '', email: '', password: '' });
  }
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
                <input type='text' name='fullName' placeholder='Your Name' value={formData.name} onChange={handleChange} required className='w-full border px-3 py-2 rounded mb-4' />
              )
            }

            <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required className='w-full border px-3 py-2 rounded mb-4' />
            <input type='text' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required className='w-full border px-3 py-2 rounded mb-4' />
            <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>{activeTab === 'signin' ? 'Sign In' : 'Sign Up'}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthPage