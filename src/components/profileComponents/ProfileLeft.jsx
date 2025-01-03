import React from 'react'
import PhotosShow from './PhotosShow'
import UserInfoDetails from './userDetails'
import FriendList from './FriendList'

const ProfileLeft = ({imageData, imageLoading,userDetails,profileVisitor, setNickName, friends}) => {
  return (
    <div>
      <div className='w-full rounded-md bg-white shadow-md p-2 mb-3'>
        <UserInfoDetails userDetails={userDetails} profileVisitor={profileVisitor} setNickName={setNickName}/>
      </div>
      <div className='w-full rounded-md bg-white shadow-md p-2 mb-3'>
        <PhotosShow imageData={imageData} imageLoading={imageLoading}/>
      </div>

      <div className='w-full rounded-md bg-white shadow-md p-2 mb-3'>
        <FriendList friends={friends} imageLoading={imageLoading}/>
      </div>
    </div>
  )
}

export default ProfileLeft