import React from 'react'
import avater from "../../../assets/defaultImage/avatar.png"
import { useNavigate } from 'react-router-dom'

const FriendContact = ({ getAllFriends }) => {
    const navigate = useNavigate()

    const handleRedirect = (userName)=>{
        navigate(`/profile/${userName}`)
    }
    return (
        <div class="p-4 ">

            <div class="flex items-center justify-between">
                <h3 class="font-gilroyBold text-lg text-black">Contacts</h3>
            </div>

            {getAllFriends?.friends?.length > 0 ? getAllFriends?.friends?.map((friend) => (
               <div key={friend?._id} onClick={()=>handleRedirect(friend?.userName)}>
                <ul class="mt-4 space-y-3 cursor-pointer text-black">
                    <li class="flex items-center space-x-3">
                        <div class="relative">
                            <img
                                src={friend?.profilePicture || avater}
                                alt="Profile"
                                class="w-10 h-10 rounded-full"
                            />

                            <span class="absolute bottom-0 right-0 w-3 h-3 bg-green1 border-2 border-line_color rounded-full"></span>
                        </div>

                        <p class="font-gilroySemiBold text-base">{friend?.fName} {friend?.lName}</p>
                    </li>
                </ul>
               </div>
            )) :
                <div className='font-gilroySemiBold text-base text-black'>
                    There is No Friend In Your List
                </div>
            }
           


        </div>

    )
}

export default FriendContact