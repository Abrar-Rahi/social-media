import React, { useState } from 'react'
import { Moon } from "../../../../svg/Moon"
import { Logout } from "../../../../svg/Logout"
import DisplayPopup from './DisplayPopup'
import { useDispatch } from 'react-redux'
import { logOutUsers } from '../../../../features/users/userSlice'
import { useNavigate } from 'react-router-dom'

const SettingOption = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [displayPopup, setDisplayPopup] = useState(false)
  const [logOutPopup, setLogOutPopupPopup] = useState(false)

  if(displayPopup){
    return <DisplayPopup setDisplayPopup={setDisplayPopup}/>
  }

  const handleLogOut = ()=>{
    localStorage.removeItem("user")
    dispatch(logOutUsers())
    navigate("/login")
  }

  return (
    <>
      
        <div className={`w-[200px] px-2.5 py-6 rounded-md shadow-md shadow-shadow bg-white ${logOutPopup && "border border-red"}`}>
          {logOutPopup ? 
          <>
          <h4 className='font-gilroyBold text-base text-red'>Are You Sure You Want To Logout?</h4>
          <div className='flex items-center justify-evenly mt-5'>
            <button onClick={handleLogOut} className='px-4 py-1.5 rounded-lg bg-red font-gilroyBold text-base'>Yes</button>
            <button className='px-4 py-1.5 rounded-lg bg-green font-gilroyBold text-base' onClick={()=> setLogOutPopupPopup(false)}>No</button>
          </div>
          </>
        :
        
          <div>
            <ul >
              <li onClick={() => setDisplayPopup(true)} className='flex items-center gap-x-2 group mb-6'>
                <div className='bg-white-100 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer'> <Moon /> </div>
                <div className='font-gilroyBold text-base group-hover:text-title_color duration-150 transition-all ease-linear cursor-pointer'>Display & Accessability</div>
              </li>
              <li onClick={()=>setLogOutPopupPopup(true)} className='flex items-center gap-x-2 group'>
                <div className='bg-white-100 rounded-full w-8 h-8 flex justify-center items-center  cursor-pointer'><Logout /></div>
                <div className='font-gilroyBold text-base group-hover:text-title_color duration-150 transition-all ease-linear cursor-pointer'>Logout</div>
              </li>
            </ul>
          </div>
        }
        </div>
      
    </>
  )
}

export default SettingOption