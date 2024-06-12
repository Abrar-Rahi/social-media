import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../pages/login'

const LoggedInUser = () => {
    const userInfo = useSelector((state) => state.registration.userInfo)
    
  return userInfo ? <Outlet/> : <Login/>
}

export default LoggedInUser