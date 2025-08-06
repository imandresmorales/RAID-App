import AuthPage from "./Auth/AuthPage";
import HomePage from "./components/Homepage"
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useEffect } from "react";
import projectService from './services/project'
// import { useDispatch } from "react-redux";
// import { loginThunk } from "./reducers/authReducer"

function App() {
  // const dispatch = useDispatch()

  const token = localStorage.getItem('token');
  if (token) {
    projectService.setToken(token); // ✅ set it immediately
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
