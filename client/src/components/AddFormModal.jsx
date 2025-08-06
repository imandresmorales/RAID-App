import React, { useRef } from 'react'
import { X } from 'lucide-react';
const AddFormModal = ({ onClose, onCreate }) => {
  const modalRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose()
    }
  }

  // Create Project function
  const createProject = (e) => {
    e.preventDefault()

    const newProject = {
      name: titleRef.current.value,
      description: descRef.current.value,
    }
    onCreate(newProject)
  }
  return (
    <>
      <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg- gray-100 bg-opacity-10 backdrop-blur-sm flex justify-center items-center '>
        <div className='mt-5 flex flex-col gap-5 text-black'>
          <button onClick={onClose} className='place-self-end'><X size={30} /></button>
          <div className='flex flex-col items-center px-20 py-10 gap-5 bg-white shadow-2xl mx-4 rounded-xl'>
            <form onSubmit={createProject}>
              <h4 className='font-medium text-sm'>Create New Project</h4>
              <input ref={titleRef} className='w-full px-4 py-3 border border-gray-300 text-black rounded-md mb-5 mt-4' type="text" placeholder='Project Title' required />
              <textarea ref={descRef} name="description" className='px-3 py-3 rounded-md w-full border' placeholder="Enter project description" rows={3} id="project-description"></textarea>
              <div className='mt-2 flex justify-end gap-2'>
                <button className='bg-white text-black shadow rounded-sm px-4 py-2'>Cancel</button>
                <button className='bg-black text-white shadow rounded-sm px-4 py-2' type='submit' >Create Project</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddFormModal