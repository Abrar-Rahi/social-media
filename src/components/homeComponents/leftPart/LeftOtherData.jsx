import React, { useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SettingOption from './settingOption'
import OutSideClick from '../../../functions/click'

const LeftOtherData = ({ data }) => {

    const IconData = data.icon
    
    const [settingPopup,setSettingPopup] = useState(false)
    const clickOutside = useRef(null)
    const pageRoute = useLocation()

    OutSideClick(clickOutside, ()=>{
        setSettingPopup(false)
    })

    return (
        <>
            {data.title == "Settings" ?
                <div className='relative '>
                    <div onClick={()=>setSettingPopup(true)} className={`flex w-12 h-12 lg:h-auto items-center justify-center lg:justify-normal lg:gap-x-2 lg:mb-8 group hover:bg-black cursor-pointer lg:px-6 lg:py-3 rounded-full lg:w-auto lg:mx-auto transition-all ease-linear duration-300 ${settingPopup && 'bg-black cursor-not-allowed'}`}>
                        <div className={`group-hover:text-white transition-all ease-linear duration-300 ${settingPopup && 'text-white'}`}>
                            <IconData />
                        </div>
                        <div className='hidden lg:block'>
                            <p className={`font-giloryMedium text-lg text-black group-hover:text-white transition-all ease-linear duration-300 ${settingPopup && 'text-white'}`}>{data.title}</p>
                        </div>
                    </div>
                    {settingPopup && <div ref={clickOutside} className='absolute top-[52px] left-[-136px] lg:-left-[10px] '><SettingOption/></div>}
                </div>
                :
    
            <NavLink to={data.to}>
                <div className={`flex w-12 h-12 lg:h-auto items-center justify-center lg:justify-normal lg:gap-x-2 lg:mb-8 group hover:bg-black cursor-pointer lg:px-6 lg:py-3 rounded-full lg:w-auto lg:mx-auto transition-all ease-linear duration-300 ${pageRoute.pathname === data.to ? "bg-black" : ""}`}>
                    <div className={`group-hover:text-white transition-all ease-linear duration-300 ${pageRoute.pathname === data.to ? "text-white" : ""}`}>
                        <IconData />
                    </div>
                    <div className='hidden lg:block'>
                        <p className={`font-giloryMedium text-lg text-black group-hover:text-white transition-all ease-linear duration-300 ${pageRoute.pathname === data.to ? "text-white" : ""}`}>{data.title}</p>
                    </div>
                </div>
            </NavLink>
    }
        </>
    )
}

export default LeftOtherData