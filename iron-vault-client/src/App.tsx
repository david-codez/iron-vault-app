import React, { useState, useEffect } from 'react'
import Login from './components/login'
import NavBar from './components/Nav'
import { GymMember } from './lib/User'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from './features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from './app/store'
import './App.css';
import Dashboard from './components/Dashboard'
import SignUp from './components/signup'
import { ToastContainer } from 'react-toastify'
import Auth from './pages/Auth'
import Messages from './pages/Messages'



function App(props: any) {
  const [user, setUser] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e: any) => {
    setIsLoggedIn(false)
    setUser(undefined)
    dispatch(logout())
    dispatch(reset())
    
    navigate('/auth')
  }


  useEffect(() => {
    if(!user) {
      if(localStorage.user) {
        setUser(JSON.parse(localStorage.user))
        console.log(user)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        navigate('/auth')
      }
      
    }

 
  }, [user,navigate, isLoggedIn, setIsLoggedIn, setUser])

  return (
    <>

          <div className='container'>

            <div className='navbar-div'>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            </div>

  
            <div className='routes-div'>
              <Routes>
                <Route path='/' element={<Dashboard user={user} />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/messages' element={<Messages />} />
              </Routes>
            </div>
          </div>
          
      <ToastContainer />
    </>

   

  )
}


export default App;
