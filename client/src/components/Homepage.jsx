import React from 'react'
import { Link } from 'react-router-dom';
const Homepage = () => {
  return (
    <>
      <div className='flex flex-col mx-auto justify-center items-center min-h-64 bg-blue-100'>
        <h1 className='text-6xl leading-tight font-mono'>The<strong className='text-[#4d73ffd8]'>Log</strong></h1>
        <p className='text-lg leading-relaxed font-mono text-gray-400'>Helps you track and manage your project's RAID elements efficiently</p>
        <Link to="/auth">
          <button className='bg-black rounded-sm px-4 py-2 mt-4 font-mono text-white'>Get Started Free</button>
        </Link>

      </div>

      {/* Section two */}
      <div className='py-10 px-10'>
        <h2 className='text-4xl font-mono text-center mb-4'>Stay in control of every project detail</h2>
        <p className='text-center font-mono mb-8 text-gray-400'>Understand and manage the key components of RAID with simple, clear tracking.</p>

        <div className="flex flex-wrap justify-center gap-6 mx-auto">
          {
            [
              {
                title: "Risk Management",
                desc: "Track potential threats that could impact your project's success.",
              },
              {
                title: "Assumptions",
                desc: "Document what you're assuming to be true, so everyone stays aligned.",
              },
              {
                title: "Issues",
                desc: "Log real-time problems affecting your project’s delivery.",
              },
              {
                title: "Dependencies",
                desc: "Keep track of external or internal items your project depends on.",
              }
            ].map((card, id) => (
              <div className='w-64 p-6 rounded-lg shadow hover:shadow-md transition' key={id}>
                <h3 className='text-xl font-bold mb-2 text-center'>{card.title}</h3>
                <p className='text-sm text-gray-700'>{card.desc}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Homepage