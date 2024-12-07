import React from 'react'
import ProfileInfoOption from './ProfileInfoOption'

const UserInfoDetails = ({userDetails,profileVisitor, setNickName}) => {
  return (
    <div className=''>
        <h1 className='font-gilroyBold text-black text-lg mb-2'>Infos</h1>
        <div className=''>
            <ProfileInfoOption userDetails={userDetails} profileVisitor={profileVisitor} setNickName={setNickName}/>
        </div>
    </div>
  )
}

export default UserInfoDetails