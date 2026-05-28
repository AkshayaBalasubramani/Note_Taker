import React from 'react'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoutes from './components/ProtectedRoute'

//logout component to clear local storage and navigate to login page
function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

//new user registration and moving it to login page
function RegisterAndLogout(){
  //remove old access tokens
  localStorage.clear()
  return <Register />
}

//nvigation and its the root of the application
//by wrappind the route using protected tag will prevent it from being accessed without auth
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            } 
          />  
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
