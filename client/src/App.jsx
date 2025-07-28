import AuthPage from "./Auth/AuthPage";
import HomePage from "./components/Homepage"
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'

function App() {

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
