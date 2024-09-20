import React from 'react'
import RightFriendPart from './RightFriendPart'
import Storise from './Storise'

const RightPart = () => {
  return (
    <div className='fixed top-0 right-0 xl:w-[25%] w-full max-w-md  mx-auto bg-white shadow-lg h-full rounded-lg p-6'>
    <div>
        <RightFriendPart/>
    </div>
    <div className='mt-8'>
        <Storise/>
    </div>
    </div>
  )
}

export default RightPart