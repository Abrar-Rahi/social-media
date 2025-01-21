import React, { useEffect, useRef } from 'react'
import { CircleCloseIcon } from '../../svg/CircleClose'
import OutSideClick from '../../functions/click'

const OldCoverPic = ({ setChooseCoverPopup, imageData, userInfo, setCoverPic }) => {
  const editRef = useRef(null)

  OutSideClick(editRef, () => {
    setChooseCoverPopup(false)
  })

  useEffect(() => {
    const addClass = document.body
    if (setChooseCoverPopup) {
      addClass.classList.add("no-scroll")
    } else {
      addClass.classList.remove("no-scroll")
    }
    return () => {
      addClass.classList.remove("no-scroll")
    }
  }, [setChooseCoverPopup])

  return (
    <div className='w-full h-screen bg-blur z-50 fixed top-0 left-0 flex items-center justify-center'>
      <div ref={editRef} className='relative  w-[75%] md:w-4/6 lg:w-3/6 xl:w-2/6 bg-white shadow-md shadow-shadow rounded-lg'>
        <div className='border-b border-title_color p-5  relative'>
          <h3 className='font-gilroyBold text-lg text-black text-center'>Select Your Photo</h3>
          <div onClick={() => setChooseCoverPopup(false)} className='absolute top-5 right-4 cursor-pointer text-black'>
            <CircleCloseIcon />
          </div>
        </div>
        <div className='overflow-y-auto p-4 h-[400px]'>
          <div className='font-gilroySemiBold text-black text-base'>
            <span>Total Cover Picture's</span> ({imageData.filter((img) => img.asset_folder === `${userInfo.userName.replace(/\s+/g, "_")}/cover_picture`).length})
          </div>
          <div className='grid grid-cols-4 gap-3 mt-3'>
            {
              imageData.filter((img) => img.asset_folder === `${userInfo.userName.replace(/\s+/g, "_")}/cover_picture`).map((files) => (
                <img onClick={() => { setCoverPic(files.secure_url), setChooseCoverPopup(false) }} key={files.asset_id} src={files.secure_url
                } alt="cover Picture" className='w-full h-full object-cover cursor-pointer' />
              ))
            }
          </div>
        <div className='font-gilroySemiBold text-black text-base mt-6'>
          <span>Other Picture's</span> ({imageData.filter((img) => img.asset_folder !== `${userInfo.userName.replace(/\s+/g, "_")}/cover_picture`).length})
        </div>
        <div className='grid grid-cols-4 gap-3 mt-3'>
          {
            imageData.filter((img) => img.asset_folder !== `${userInfo.userName.replace(/\s+/g, "_")}/cover_picture`).map((files) => (
              <img onClick={() => { setCoverPic(files.secure_url), setChooseCoverPopup(false) }} key={files.asset_id} src={files.secure_url
              } alt="cover Picture" className='w-full h-full object-cover cursor-pointer' />

            ))
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default OldCoverPic