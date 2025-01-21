import React from 'react'
import { useSelector } from 'react-redux'
import profileImg from "../../../assets/defaultImage/avatar.png"
import { formatDistance } from 'date-fns'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'

const ShowPostGridMode = ({ post }) => {
    const userInfo = useSelector((state) => state.userInformation.userInfo)
    
    
    return (
        <>
            {post?.image !== null &&
                <div className="w-[48%] h-[250px]  overflow-hidden object-cover">

                    <div className='flex items-center gap-x-2 mb-2'>
                        <div className='w-9 h-9 rounded-full overflow-hidden'>
                            <Link to={`/profile/${post?.user?.userName}`}>
                                <img
                                    className='w-full h-full object-cover'
                                    src={post?.user?.profilePicture || profileImg}
                                    alt="profileImg" />
                            </Link>
                        </div>
                        <div >
                           <h4 className='font-gilroyMedium text-xs text-black'>{post?.user?.fName}</h4>
                            {/* <p className='font-gilroyNormal text-xs text-secondary_color'>{formatDistance(post?.createdAt, new Date(), { addSuffix: true })}</p> */}
                            <p className='font-gilroyNormal text-xs text-secondary_color'>{format(post?.createdAt, "MMMM d 'at' h:mm a")}</p>
                        </div>
                    </div>

                    {post?.image && post?.image?.length &&
                        <>
                            <div className={`relative w-full h-full ${post?.image?.length === 2 ? "grid grid-cols-2 gap-2" : post?.image?.length === 3 ? "grid grid-cols-2 gap-2" : post?.image?.length === 4 ? "grid grid-cols-2 gap-2" : post?.image?.length >= 5 && "grid grid-cols-2 gap-2"}`}>
                                {post?.image?.slice(0, 4).map((item, index) => (
                                    <img key={index} src={item.url} alt="postImage" className={`object-cover w-full h-full ${post?.image?.length === 3 ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3" : post?.image?.length === 4 && "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3"}`} />
                                ))}
                            </div>
                        </>
                    }

                </div>
            }
        </>
    )
}

export default ShowPostGridMode