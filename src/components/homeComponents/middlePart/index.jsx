import React, { useRef } from 'react'
import MiddleHeader from './MiddleHeader'
import { LiveIcon } from '../../../svg/Live'
import { Media } from '../../../svg/Media'
import Feeling from '../../../svg/Feeling'
import ShowPost from './ShowPost'
import { useSelector } from 'react-redux'

const MiddlePart = ({ setPostVisible, posts }) => {
  const userInfo = useSelector((state) => state.userInformation.userInfo)

  const inputFocus = useRef(null)
  const handleVisible = () => {
    setPostVisible(true)
    inputFocus.current.blur()
  }

  return (
    <>
      <div className=''>
        <div className='px-2 sm:px-5 py-6 bg-hober_clr rounded-xl'>
          <div className='flex items-center gap-x-2'>
            <div
              className='w-12 h-12 bg-secondary_color rounded-full'
              style={{ backgroundImage: `url(${userInfo.profilePicture})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
            ></div>
            <div className='w-[90%] '>
              <input
                onClick={handleVisible}
                ref={inputFocus}
                type="text"
                placeholder="What's On Your Mind"
                className='px-5 py-3 w-full rounded-full outline-none font-gilroyNormal text-sm sm:text-base cursor-pointer hover:bg-cyan-100 bg-white'
              />
            </div>
          </div>
          <div className='w-full h-px bg-white my-5'></div>
          <div className='flex items-center justify-between text-secondary_color'>
            <div className='flex items-center gap-x-1 sm:gap-x-2 cursor-pointer'>
              <div>  <LiveIcon />  </div>
              <h4 className='font-gilroySemiBold text-sm sm:text-base'>Live Video</h4>
            </div>
            <div className='flex items-center gap-x-1 sm:gap-x-2 cursor-pointer'>
              <div>  <Media />  </div>
              <h4 className='font-gilroySemiBold text-sm sm:text-base'>Gallery</h4>
            </div>
            <div className='flex items-center gap-x-1 sm:gap-x-2 cursor-pointer'>
              <div>  <Feeling />  </div>
              <h4 className='font-gilroySemiBold text-sm sm:text-base'>Activites</h4>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default MiddlePart