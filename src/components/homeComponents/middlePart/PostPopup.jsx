import React, { useEffect, useRef, useState } from 'react'
import { CircleCloseIcon } from '../../../svg/CircleClose'
import PostAddToYourPost from './PostAddToYourPost'

import PostEmojiPicker from './PostEmojiPicker'
import PostImageViewer from './PostImageViewer'

const PostPopup = () => {

    const [postText, setPostText] = useState("")
    const [image, setImage] = useState([])
    const [imgPopup, setImgPopupt] = useState(false)




    return (
        <div className='w-full h-screen bg-blur z-20 absolute top-0 left-0 flex items-center justify-center'>
            <div className='w-2/6 bg-white shadow-md rounded-lg'>
                <div className='border-b border-title_color p-5  relative'>
                    <h3 className='font-gilroyBold text-lg text-black text-center'>CreatePost</h3>
                    <div className='absolute top-5 right-4 cursor-pointer'>
                        <CircleCloseIcon />
                    </div>
                </div>
                <div className=' px-3 py-5'>
                    <div className='flex items-center gap-x-2'>
                        <div className='w-10 h-10 bg-secondary_color rounded-full'></div>
                        <h4 className='font-gilroyBold text-lg'>Abrar Bin Enayet</h4>
                    </div>
                    {imgPopup ?
                        <>
                            <PostImageViewer postText={postText} setPostText={setPostText} image={image} setImage={setImage} imgPopup={imgPopup} setImgPopupt={setImgPopupt}/>
                            <div>
                                <PostAddToYourPost imgPopup={imgPopup} setImgPopupt={setImgPopupt}/>
                            </div>
                        </>
                        :
                        <>
                            <PostEmojiPicker postText={postText} setPostText={setPostText} />
                            <div>
                                <PostAddToYourPost imgPopup={imgPopup} setImgPopupt={setImgPopupt}/>
                            </div>
                        </>
                    }
                    <div className='w-full text-center mt-3'>
                        <button className='py-2 bg-hober_clr w-full font-gilroySemiBold text-lg rounded-md hover:bg-black transition-all ease-linear duration-100 hover:text-white'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPopup