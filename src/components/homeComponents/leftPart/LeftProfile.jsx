import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const LeftProfile = () => {
    const userInfo = useSelector((state) => state.userInformation.userInfo)

    return (
        <>
            <div
                className='w-28 h-28 rounded-full bg-cyan-100 mx-auto'
                style={{ backgroundImage: `url(${userInfo.profilePicture})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
                
            <div className='text-center mt-3'>
                <Link to={'/profile'} className='font-gilroySemiBold text-xl text-black mt-2'>{userInfo.userName}</Link>
                <p className='font-gilroyNormal text-base text-black'>{userInfo.email}</p>
            </div>
        </>
    )
}

export default LeftProfile