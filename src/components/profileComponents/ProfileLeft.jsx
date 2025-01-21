import React from 'react'
import PhotosShow from './PhotosShow'
import UserInfoDetails from './userDetails'
import FriendList from './FriendList'

const ProfileLeft = ({imageData, imageLoading,userDetails,profileVisitor, setNickName, friends}) => {
  return (
    <div>
      <div className='w-full rounded-md bg-white shadow-md shadow-shadow p-2 mb-3 text-black'>
        <UserInfoDetails userDetails={userDetails} profileVisitor={profileVisitor} setNickName={setNickName}/>
      </div>
      <div className='w-full rounded-md bg-white shadow-md shadow-shadow p-2 mb-3 text-black'>
        <PhotosShow imageData={imageData} imageLoading={imageLoading}/>
      </div>

      <div className='w-full rounded-md bg-white shadow-md shadow-shadow p-2 mb-3 text-black'>
        <FriendList friends={friends} imageLoading={imageLoading}/>
      </div>
    </div>
  )
}

export default ProfileLeft