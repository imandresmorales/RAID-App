import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject, fetchProjects, createProject } from '../reducers/projectReducer'
import AddFormModal from './AddFormModal'
const Dashboard = () => {
  const dispatch = useDispatch()
  const { items: projects = [], loading } = useSelector(state => state.projects);

  // Show form modal state
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteProject(id))
  }

  const handleCreateProject = (projectData) => {
    dispatch(createProject(projectData))
    setShowModal(false)
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4">
        <div className=' flex justify-between items-center mt-6'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
            <p className="text-gray-600">Manage your project</p>
          </div>
          <button onClick={() => setShowModal(true)} className='text-white bg-black font-medium rounded-md text-sm px-4 py-2'>New Project</button>
          {showModal && <AddFormModal onClose={() => setShowModal(false)} onCreate={handleCreateProject} />}
        </div>
        {

          loading ? (<p>Loading</p>) : projects && projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id}>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-80">
              <p className="text-lg text-gray-600 font-medium ">Click New project button to add one</p>
            </div>
          )
        }
      </main>
    </>
  )
}

export default Dashboard