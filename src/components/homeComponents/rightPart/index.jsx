import React from 'react'
import RightFriendPart from './RightFriendPart'
import Storise from './Storise'
import { useGetAllFriendsQuery } from '../../../features/api/authApi';
import FriendContact from './FriendContact';

const RightPart = () => {

  const { data: getAllFriends, refetch } = useGetAllFriendsQuery();
  
  return (
    <div className='fixed top-0 right-0 xl:w-[25%] w-full max-w-md  mx-auto bg-white shadow-lg shadow-shadow h-full rounded-lg p-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-secondary_color scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
    <div>
        <RightFriendPart getAllFriends={getAllFriends} refetch={refetch}/>
    </div>
    <div className='mt-8'>
        <Storise/>
    </div>

    <div className='mt-8'>
        <FriendContact getAllFriends={getAllFriends}/>
    </div>
    </div>
  )
}

export default RightPart