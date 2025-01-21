import React from 'react'
import { Link } from 'react-router-dom'
import avater from "../../../assets/defaultImage/avatar.png"
import { useNavigate } from 'react-router-dom';
import { useAcceptFriendReqMutation, useDeleteFriendReqMutation } from '../../../features/api/authApi';
import { divide } from 'lodash';

const RightFriendPart = ({ getAllFriends, refetch }) => {

    const navigate = useNavigate()
    const [acceptFriendReq] = useAcceptFriendReqMutation()
    const [deleteFriendReq] = useDeleteFriendReqMutation()

    const handleRedirect = (userName)=>{
        navigate(`/profile/${userName}`)
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

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-gilroyBold text-title_color text-xl">Friend Request</h3>
                <Link
                    to="/friends"
                    className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-black transition duration-300 ease-out border border-black rounded-full group"
                >
                    <span className="absolute inset-0 w-full h-full bg-black transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0"></span>
                    <span className="absolute inset-0 w-full h-full border border-black rounded-full"></span>
                    <span className="relative text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        See All
                    </span>
                </Link>
            </div>

            {getAllFriends?.request?.length > 0 ?  getAllFriends?.request?.map((friend) => (

                <div key={friend?._id} className='flex flex-col gap-y-4'>

                    <div className='flex xl:flex-col xl:gap-2 2xl:flex-row items-center gap-x-4 p-2.5 bg-hober_clr rounded-lg shadow-md shadow-shadow'>
                        <div onClick={()=>handleRedirect(friend?.userName)} className='w-14 h-14 bg-secondary_color rounded-full flex items-center justify-center cursor-pointer overflow-hidden'>
                            <span className='text-white font-gilroyBold text-lg'>
                                <img
                                    src={friend?.profilePicture || avater}
                                    alt="User"
                                    className="w-full h-full object-cover "
                                />
                            </span>
                        </div>
                        <div onClick={()=>handleRedirect(friend?.userName)} className='flex-1 cursor-pointer'>
                            <h3 className='font-gilroyMedium text-title_color text-lg'>{friend?.fName} {friend?.lName}</h3>
                            <p className='font-gilroyNormal text-sm text-secondary_color'>1 hour ago</p>
                        </div>
                        <div className='flex 2xl:flex-col items-center gap-2'>
                            <button onClick={()=>handleAcceptFriendReq(friend?._id)} className='px-4 py-1.5 bg-green rounded-full text-white font-gilroyMedium text-base hover:bg-green1  transition-all ease-linear duration-150'>
                                Confirm
                            </button>
                            <button onClick={() => handleDeleteFriendReq(friend?._id)} className='px-4 py-1.5 bg-red rounded-full text-white font-gilroyMedium text-base hover:bg-red1 transition-all ease-linear duration-150'>
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            )) : 
            <div className='font-gilroySemiBold text-base text-black'>
                There is No Friend Request Right Now
            </div>
            }

        </div>
    )
}

export default RightFriendPart