import React from 'react'
import { useSelector } from 'react-redux'

const LeftProfile = () => {
    const userInfo = useSelector((state) => state.registration.userInfo)
    console.log(userInfo);
    return (
        <>
            <div className='w-28 h-28 rounded-full bg-cyan-100 mx-auto'></div>
            <div className='text-center mt-3'>
                <h3 className='font-gilroySemiBold text-xl text-black mt-2'>{userInfo.userName}</h3>
                <p className='font-gilroyNormal text-base text-black'>{userInfo.email}</p>
            </div>
        </>
    )
}

export default LeftProfile