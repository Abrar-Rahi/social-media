import React from 'react'
import avater from "../../assets/defaultImage/avatar.png"
import StringWithEllipsis from '../homeComponents/middlePart/StringWithEllipsis';
import { useCancelFriendReqMutation } from '../../features/api/authApi';

const FriendsCard = ({ friend, type, refetch }) => {

    const [cancleFriendReq] = useCancelFriendReqMutation()

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

    return (
        <div className="p-4 rounded-md shadow-md font-gilroyNormal">
            {/* Image Section */}
            <div className="w-full h-48 overflow-hidden rounded-md">
                <img
                    src={friend?.profilePicture || avater} // Replace this with the actual image URL
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* User Info Section */}
            <div className="text-center mt-2">
                <div className="text-lg font-semibold">
                    <StringWithEllipsis text={friend?.userName || "no name"} maxLength={15} />
                </div>
                <p className="text-sm text-gray-400">52 mutual friends</p>
            </div>

            {/* Buttons Section */}
            {type === "friendRequest" ?
                <div className="font-gilroyMedium text-white flex flex-col gap-2 text-base mt-2">
                    <button className="bg-green py-2 rounded-md ">
                        Confirm
                    </button>
                    <button className="bg-red py-2 rounded-md ">
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