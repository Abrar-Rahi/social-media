import React, { useState } from 'react'
import { Moon } from "../../../../svg/Moon"
import { Logout } from "../../../../svg/Logout"
import DisplayPopup from './DisplayPopup'

const SettingOption = () => {

  const [displayPopup, setDisplayPopup] = useState(false)

  if(displayPopup){
    return <DisplayPopup setDisplayPopup={setDisplayPopup}/>
  }

  return (
    <>
      
        <div className='w-[200px] px-2.5 py-6 rounded-md shadow-md bg-white'>
          <div>
            <ul >
              <li onClick={() => setDisplayPopup(true)} className='flex items-center gap-x-2 group mb-6'>
                <div className='bg-white-100 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer'> <Moon /> </div>
                <div className='font-gilroyBold text-base group-hover:text-title_color duration-150 transition-all ease-linear cursor-pointer'>Display & Accessability</div>
              </li>
              <li className='flex items-center gap-x-2 group'>
                <div className='bg-white-100 rounded-full w-8 h-8 flex justify-center items-center  cursor-pointer'><Logout /></div>
                <div className='font-gilroyBold text-base group-hover:text-title_color duration-150 transition-all ease-linear cursor-pointer'>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      
    </>
  )
}

export default SettingOption