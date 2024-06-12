import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const NotLogInUser = () => {
    const userInfo = useSelector((state) => state.registration.userInfo)
    
  return userInfo ? <Navigate to={'/'}/> : <Outlet/>
}

export default NotLogInUser