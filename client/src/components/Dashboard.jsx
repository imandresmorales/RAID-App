import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject, fetchProjects } from '../reducers/projectReducer'
const Dashboard = () => {
  const dispatch = useDispatch()
  const { items: projects = [], loading, error } = useSelector(state => state.projects);



  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteProject(id))
  }
  return (
    <>
      <Navbar />
      {
        loading ? <p>Loading</p> : (
          projects.map(project => (
            <div key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          ))
        )
      }

    </>
  )
}

export default Dashboard