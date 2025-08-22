import React, { useRef } from 'react'
import { X } from 'lucide-react';
const AddRiskFormModal = ({ closeRiskPage, onCreateRisk }) => {
  const riskModalRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const statusRef = useRef()
  const probabilityRef = useRef()
  const impactRef = useRef()
  const categoryRef = useRef()

  const createRisk = (e) => {
    e.preventDefault()

    const newRisk = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      status: statusRef.current.value,
      probability: probabilityRef.current.value,
      impact: impactRef.current.value,
      category: categoryRef.current.value
    }
    onCreateRisk(newRisk)
  }

  const onCloseForm = (e) => {
    if (riskModalRef.current === e.target) {
      closeRiskPage()
    }
  }
  return (
    <>
      <div ref={riskModalRef} onClick={onCloseForm} className='fixed inset-0 bg-gray-100 bg-opacity-10 backdrop-blur-sm flex justify-center items-center'>
        <div className='flex flex-col gap-5 text-black'>
          <div className='relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6'>
            <button onClick={closeRiskPage} className='absolute top-3 right-3 text-gray-500 hover:text-black'><X size={30} /></button>
            <form className="w-full flex flex-col justify-start" onSubmit={createRisk}>
              <h4 className='font-medium text-sm'>Add New Risk</h4>
              <div className="mt-4">
                <label htmlFor="title">Title</label>
                <input ref={titleRef} className='w-full px-4 py-3 border border-gray-300 text-black rounded-md mb-5 mt-2' placeholder='Enter the risk title' type="text" required />
                <label htmlFor="description">Description</label>
                <textarea ref={descriptionRef} name="description" className='px-3 py-3 rounded-md w-full border border-gray-300' placeholder="Enter project description" rows={2} id="project-description"></textarea>
                <label htmlFor="status">Status</label>
                <select ref={statusRef} className='px-3 py-3 rounded-md w-full  border border-gray-300' name="status" id="status">
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
                <div className='flex mt-2 gap-4'>
                  <div className='w-1/2'>
                    <label htmlFor="probability">Probability(1-5)</label>
                    <select ref={probabilityRef} className='px-3 py-3 rounded-md w-full border border-gray-300' name="probability" id="probability">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>

                  <div className='w-1/2'>
                    <label htmlFor="impact">Impact(1-5)</label>
                    <select ref={impactRef} className='px-3 py-3 rounded-md w-full border border-gray-300' name="impact" id="impact">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
                <label htmlFor="category">Category</label>
                <input ref={categoryRef} className='w-full px-4 py-3 border border-gray-300 text-black rounded-md mb-5 mt-2' placeholder='Enter category type' type="text" required />
                <div className='mt-2 flex justify-end gap-2'>
                  <button className='bg-white text-black shadow rounded-sm px-4 py-2' type='button' onClick={closeRiskPage}>Cancel</button>
                  <button className='bg-black text-white shadow rounded-sm px-4 py-2' type='submit' >Create Risk</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRiskFormModal