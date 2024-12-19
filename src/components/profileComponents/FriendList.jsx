import React, { useEffect, useState } from 'react'
import avater from '../../assets/defaultImage/avatar.png'
import StringWithEllipsis from '../homeComponents/middlePart/StringWithEllipsis'


const FriendList = ({ friends }) => {

    const friendCount = () => {
        const total_count = friends?.length || 0
        return total_count === 0 ? "Loading..." : `${total_count} Friends`
    }

    return (
        <div>
            <div>
                <div className='flex items-center justify-between'>
                    <h1 className='font-gilroyBold text-black text-lg'>Friends</h1>
                    {friends?.length > 4 &&
                        <button className='px-3 py-1.5 bg-blue text-white font-gilroyMedium text-sm rounded-lg'>
                            Show More
                        </button>}
                </div>
                <span className='font-gilroyNormal text-black text-sm'>
                    {friendCount()}
                </span>
            </div>


            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-4 mt-4 min-h-[300px] '>
                {friends?.length &&
                    friends?.slice(0, 4).map((friend) => (
                        <div key={friend?._id} className="flex flex-col ">
                            <img
                                src={friend.profilePicture || avater}
                                alt="photos"
                                className="w-full h-full object-cover"
                            />
                            <h4 className="font-gilroySemiBold text-base cursor-pointer mt-2">
                            <StringWithEllipsis text={friend?.userName} maxLength={15}/>
                                
                            </h4>
                        </div>
                    ))}
            </div>


        </div>
    )
}

export default FriendList