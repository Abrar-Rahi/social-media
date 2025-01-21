import React, { useEffect, useRef, useState } from 'react'
import Followers from '../../../../svg/Followers';
import UnFollow from '../../../../svg/Unfollow';
import OutSideClick from '../../../../functions/click';
import Frequest from '../../../../svg/Frequest';
import Following from '../../../../svg/Following';
import { useAcceptFriendReqMutation, useAddFriendsMutation, useCancelFriendReqMutation, useDeleteFriendReqMutation, useFollowMutation, useUnFollowMutation, useUnFriendMutation } from '../../../../features/api/authApi';

const Friends = ({ friendShips, profileId }) => {

    const [friendShip, setFriendShip] = useState(friendShips)
    const [friendMenu, setFriendMenu] = useState(false)
    const [followMenu, setFollowMenu] = useState(false)
    const friendMenuRef = useRef(null)
    const followMenuRef = useRef(null)
    const [addFriends] = useAddFriendsMutation()
    const [cancleFriendReq] = useCancelFriendReqMutation()
    const [follow] = useFollowMutation()
    const [unFollow] = useUnFollowMutation()
    const [acceptFriendReq] = useAcceptFriendReqMutation()
    const [unFriend] = useUnFriendMutation()
    const [deleteFriendReq] = useDeleteFriendReqMutation()



    const handleAddFriend = async () => {
        try {
            await addFriends(profileId).unwrap()
            setFriendShip({ ...friendShip, following: true, request: true })
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancelFriendReq = async () => {
        try {
            await cancleFriendReq(profileId).unwrap()
            setFriendShip({ ...friendShip, following: false, request: false })
        } catch (error) {
            console.log(error);
        }
    }

    const handleFollow = async () => {
        try {
            await follow(profileId).unwrap()
            setFriendShip({ ...friendShip, following: true })
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnFollow = async () => {
        try {
            await unFollow(profileId).unwrap()
            setFriendShip({ ...friendShip, following: false })
            setFriendMenu(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleAcceptFriendReq = async () => {
        try {
            await acceptFriendReq(profileId).unwrap()
            setFriendShip({ ...friendShip, friend: true, following: true, request: false, requestReceived: false })
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnFriend = async () => {
        try {
            await unFriend(profileId).unwrap()
            setFriendShip({ ...friendShip, friend: false, following: false, request: false, requestReceived: false })
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteFriendReq = async () => {
        try {
            await deleteFriendReq(profileId).unwrap()
            setFriendShip({ ...friendShip, friend: false, following: false, request: false, requestReceived: false })
        } catch (error) {
            console.log(error);
        }
    }

    OutSideClick(friendMenuRef, () => {
        setFriendMenu(false)
    })
    OutSideClick(followMenuRef, () => {
        setFollowMenu(false)
    })

    useEffect(() => {
        setFriendShip(friendShips)
    }, [friendShips])

    return (
        <div className='flex items-center gap-x-1 mb-2 justify-end'>
            {friendShip?.friend ? (
                <div className="relative">
                    <div className="flex items-center justify-end gap-x-2 ">
                        <div onClick={() => setFriendMenu(true)} className="flex items-center bg-white text-black px-4 py-2 rounded-md cursor-pointer">
                            <Followers width={20} height={20} />
                            <span className="font-gilroyMedium text-base">Friends</span>
                        </div>
                        <div ref={friendMenuRef}>
                            {friendMenu && (
                                <div className="absolute top-12 right-0 w-56 bg-white shadow-md shadow-shadow rounded-md p-3">
                                    <div onClick={() => handleUnFriend()} className="flex items-center gap-x-1 text-black cursor-pointer hover:bg-white-100 px-3 py-2">
                                        <UnFollow width={18} height={18} />
                                        <span className="font-gilroyMedium text-sm">Unfriend</span>
                                    </div>
                                    
                                        <div onClick={() => handleUnFollow()} className="flex items-center gap-x-1 text-black cursor-pointer hover:bg-white-100 px-3 py-2">
                                            <UnFollow width={18} height={18} />
                                            <span className="font-gilroyMedium text-sm">Unfollow</span>
                                        </div>
                                   
                                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {!friendShip?.request && !friendShip?.requestReceived && (
                        <div className="flex items-center justify-end gap-x-2 ">
                            <div onClick={() => handleAddFriend()} className="flex items-center gap-x-1 bg-white text-black px-4 py-2 rounded-md cursor-pointer">
                                <Frequest width={20} height={20} />
                                <span className="font-gilroyMedium text-base">Add Friend</span>
                            </div>
                        </div>


                    )}
                </div>
            )}
            <div>
                {/* Request part start */}
                {friendShip?.request ? (
                    <div className="flex items-center justify-end gap-x-2 ">
                        <div onClick={() => handleCancelFriendReq()} className="flex items-center gap-x-1 bg-red text-white px-4 py-2 rounded-md cursor-pointer">
                            <UnFollow width={20} height={20} />
                            <span className="font-gilroyMedium text-base">Cancel Request</span>
                        </div>
                    </div>
                ) : (
                    friendShip?.requestReceived &&
                    <div className="flex items-center justify-end gap-x-2 ">
                        <div onClick={() => handleAcceptFriendReq()} className="flex items-center gap-x-1 bg-blue text-white px-4 py-1.5 rounded-md cursor-pointer">
                            <Followers width={20} height={20} />
                            <span className="font-gilroyMedium text-base">Confirm</span>
                        </div>
                        <div onClick={() => handleDeleteFriendReq()} className="flex items-center gap-x-1 bg-red text-white px-4 py-1.5 rounded-md cursor-pointer">
                            <UnFollow width={20} height={20} />
                            <span className="font-gilroyMedium text-base">Reject</span>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {friendShip?.following ?
                    <div className="flex items-center justify-end gap-x-2 relative">
                        <div onClick={() => setFollowMenu(true)} className="flex items-center gap-x-1 bg-white text-black px-4 py-2 rounded-md cursor-pointer">
                            <Following width={20} height={20} />
                            <span className="font-gilroyMedium text-base">Following</span>
                        </div>

                        {followMenu &&
                            <div ref={followMenuRef} className='absolute top-12 p-2 bg-white text-sm'>
                                <h3 className='font-gilroyNormal '>Are you sure! you want to unFollow him?</h3>
                                <div className='flex items-center justify-center gap-x-3 text-white my-1 font-gilroyNormal'>
                                    <button onClick={() => handleUnFollow()} className='bg-blue px-2 py-1 rounded-md '>Yes</button>
                                    <button onClick={() => setFollowMenu(false)} className='bg-red px-2 py-1 rounded-md'>No</button>
                                </div>
                            </div>}


                    </div>
                    :
                    <div className="flex items-center justify-end gap-x-2 ">
                        <div onClick={() => handleFollow()} className="flex items-center gap-x-1 bg-blue text-white px-4 py-2 rounded-md cursor-pointer">
                            <Frequest width={20} height={20} />
                            <span className="font-gilroyMedium text-base">Follow</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Friends