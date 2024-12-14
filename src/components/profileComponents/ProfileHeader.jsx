import React, { useRef, useState } from 'react'
import avater from '../../assets/defaultImage/avatar.png'
import { Camera } from '../../svg/Camera'
import ProfilePicture from './profilePictureUploads'
import Friends from './userDetails/friends/Friends'

const ProfileHeader = ({ profile, profileVisitor,imageData, userInfo, nickName }) => {

    const [visible, setVisible] = useState(false)
    const uploadPhoto = useRef(null)
    


    return (

        <>
            {visible && <ProfilePicture setVisible={setVisible} uploadPhoto={uploadPhoto} imageData={imageData} userInfo={userInfo}/>}

            <div className=" relative flex flex-col md:flex-row md:gap-x-2 justify-between items-center p-4  bg-hober_clr z-20">
                {/* Profile Picture */}
                <div className="md:absolute md:-top-7 md:left-4 -mt-28 sm:-mt-32 md:-mt-0 md:-ml-0">
                    <div className="relative">
                        <div 
                        ref={uploadPhoto} 
                        style={{backgroundImage:`url(${profile?.profilePicture || avater})`, backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"}} 
                        className='w-32 h-32 sm:w-44 sm:h-44 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md object-cover'>
                       
                        </div>
                        {profileVisitor ?
                            ""
                            :
                            <div onClick={() => setVisible(true)} className='absolute bottom-[1px] sm:bottom-[6px] md:bottom-[1px] right-[6px] sm:right-[14px] md:right-[6px] w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-input_color'>

                                <Camera />
                            </div>
                        }
                    </div>
                </div>

                <div className=" md:ml-36 md:-mt-3 flex items-center gap-x-2 md:block">
                    <h1 className="text-black font-gilroyExtraBold text-lg sm:text-xl md:text-2xl">{profile?.fName + " " + profile?.lName}</h1>
                    <p className="text-secondary_color font-gilroyMedium text-base sm:text-lg">({nickName})</p>

                </div>

                <div className='flex flex-col gap-y-5'>
                    {profileVisitor && <Friends friendShips={profile?.friendShip} profileId={profile?._id}/>}
                <div className='flex items-center gap-x-4 sm:gap-x-8 md:gap-x-3 mt-2 md:-mt-4 '>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='font-gilroyBold text-xs sm:text-sm '>Friends</h2>
                        <h5 className='font-gilroyBold text-base sm:text-lg '>10K</h5>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='font-gilroyBold text-xs sm:text-sm'>Posts</h2>

                        <h5 className='font-gilroyBold text-base sm:text-lg'>{profile?.wonPost?.length?.toString().padStart(2, 0)}</h5>

                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='font-gilroyBold text-xs sm:text-sm'>Followers</h2>
                        <h5 className='font-gilroyBold text-base sm:text-lg'>10K</h5>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='font-gilroyBold text-xs sm:text-sm'>Following</h2>
                        <h5 className='font-gilroyBold text-base sm:text-lg'>10K</h5>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='font-gilroyBold text-xs sm:text-sm'>Photos</h2>
                        <h5 className='font-gilroyBold text-base sm:text-lg'>{imageData ? imageData?.length?.toString().padStart(2, 0) : "0"}</h5>
                    </div>

                </div>
                </div>
            </div>

        </>



    )
}

export default ProfileHeader
