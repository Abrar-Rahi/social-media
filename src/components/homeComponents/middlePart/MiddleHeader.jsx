import React, { useRef, useState } from 'react'
import { SearchIcon } from "../../../svg/SearchIcon"
import SearchBox from './SearchBox'
import OutSideClick from '../../../functions/click'
import { LeftData } from '../leftPart/Data'
import { Link, useLocation, useParams } from 'react-router-dom'
import LeftOtherData from '../leftPart/LeftOtherData'
import { useSelector } from 'react-redux'

const MiddleHeader = () => {

    const userInfo = useSelector((state) => state.userInformation.userInfo)

    const location = useLocation()
    const {userName} = useParams()
    
    const profileRouteName = ()=>{
        if(location.pathname === "/"){
            return "News Feed"
        }else if(location.pathname === "/message"){
            return "Message"
        }else if(location.pathname === "/friends"){
            return "Friends"
        }else if(location.pathname === "/media"){
            return "Media"
        }else if(location.pathname.startsWith("/profile") || userName){
            return "Profile"
        }else{
            return "404"
        }
    }

    let [viewSbox, setViewSbox] = useState(false)
    let clickOutside = useRef(null)

    OutSideClick(clickOutside, () => {
        setViewSbox(false)
    })



    return (
        <>
            <div className='flex items-center justify-between bg-white md:px-3 py-8 '>
                <div className='w-3/5 hidden lg:block font-gilroyBold text-2xl'>{profileRouteName()}</div>
                <Link to={'/profile'}>
                <div className='w-14 h-14 md:w-20 md:h-20 rounded-full bg-cyan-100 lg:hidden cursor-pointer' style={{ backgroundImage: `url(${userInfo?.profilePicture})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div></Link>
                <div className='w-4/6 flex flex-wrap sm:justify-between gap-1 lg:hidden'>
                    {LeftData.map((item,index)=>(
                        <LeftOtherData key={index} data={item} />
                    ))}
                </div>
                <div  className='relative lg:w-2/5 '>
                    {!viewSbox ?
                    <div onClick={() => setViewSbox(true)} className='flex items-center justify-center lg:justify-normal lg:gap-1  border border-secondary_color w-12 h-12 md:w-16 md:h-16 lg:h-auto lg:w-full lg:py-2 lg:px-4 rounded-full cursor-pointer'>
                        <div className='text-secondary_color '> <SearchIcon /> </div>
                        
                        <div>
                            <input type="text" placeholder='Search' className='focus:outline-none w-full font-gilroyNormal hidden lg:block bg-transparent cursor-pointer' />
                        </div>
                        
                    </div>
                    :
                    <div onClick={() => setViewSbox(true)} className='hidden  lg:flex items-center justify-center lg:justify-normal lg:gap-1  border border-white w-9 h-9 lg:h-auto lg:w-full lg:py-2 lg:px-4 rounded-full'>
                        <div className='text-white '> <SearchIcon /> </div>
                        
                        <div>
                            <input type="text" placeholder='Search' className='focus:outline-none w-full font-gilroyNormal hidden lg:block bg-transparent' />
                        </div>
                        
                    </div>
                    }
                    <div  className='absolute  right-0 lg:top-0 lg:left-[-13px] xl:-left-36' ref={clickOutside}>
                        {viewSbox && <SearchBox />}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MiddleHeader