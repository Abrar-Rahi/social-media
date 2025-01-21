import React, { useState } from 'react'
import avater from "../../assets/defaultImage/avatar.png"
import StringWithEllipsis from '../homeComponents/middlePart/StringWithEllipsis';
import { useAcceptFriendReqMutation, useCancelFriendReqMutation, useDeleteFriendReqMutation } from '../../features/api/authApi';
import { useNavigate } from 'react-router-dom';

const FriendsCard = ({ friend, type, refetch }) => {

    
    const [cancleFriendReq] = useCancelFriendReqMutation()
    const [acceptFriendReq] = useAcceptFriendReqMutation()
    const [deleteFriendReq] = useDeleteFriendReqMutation()
    const navigate = useNavigate()


    const handleCancelFriendReq = async (profileId) => {
        try {
           const res = await cancleFriendReq(profileId).unwrap()
            if(res.message === "Friend request cancel"){
                refetch()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAcceptFriendReq = async (profileId) => {
        try {
           const res = await acceptFriendReq(profileId).unwrap()
           
            if(res.message === "accepted"){
                refetch()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteFriendReq = async (profileId) => {
        try {
           const res = await deleteFriendReq(profileId).unwrap()
            if(res.message === "Request deleted"){
                refetch()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRedirect = (userName)=>{
        navigate(`/profile/${userName}`)
    }

    return (
        <div className="p-4 rounded-md shadow-md shadow-shadow font-gilroyNormal">
            {/* Image Section */}
            <div onClick={()=>handleRedirect(friend?.userName)} className="w-full h-48 overflow-hidden rounded-md cursor-pointer">
                <img
                    src={friend?.profilePicture || avater} 
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* User Info Section */}
            <div className="text-center mt-2">
                <div onClick={()=>handleRedirect(friend?.userName)} className="text-lg font-semibold cursor-pointer">
                    <StringWithEllipsis text={friend?.userName || "no name"} maxLength={15} />
                </div>
                <p className="text-sm text-gray-400">52 mutual friends</p>
            </div>

            {/* Buttons Section */}
            {type === "friendRequest" ?
                <div className="font-gilroyMedium text-white flex flex-col gap-2 text-base mt-2">
                    <button onClick={()=>handleAcceptFriendReq(friend?._id)} className="bg-green py-2 rounded-md ">
                        Confirm
                    </button>
                    <button onClick={() => handleDeleteFriendReq(friend?._id)} className="bg-red py-2 rounded-md ">
                        Delete
                    </button>
                </div>
                :
                type === "sentRequest" ?
                    <div className="font-gilroyMedium text-white text-base text-center mt-2">
                        <button onClick={()=>handleCancelFriendReq(friend?._id)} className="bg-red p-2 rounded-md w-full">
                            Cancle Request
                        </button>
                    </div>
                    :
                    ""
            }


        </div>
    )
}

export default FriendsCard