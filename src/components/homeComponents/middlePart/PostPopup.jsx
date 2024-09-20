import React, { useEffect, useRef, useState } from 'react'
import { CircleCloseIcon } from '../../../svg/CircleClose'
import PostAddToYourPost from './PostAddToYourPost'
import profileImg from "../../../assets/defaultImage/avatar.png"
import PostEmojiPicker from './PostEmojiPicker'
import PostImageViewer from './PostImageViewer'
import OutSideClick from '../../../functions/click'
import { useCreatePostMutation, useUploadImageMutation } from '../../../features/api/authApi'
import { useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import PostError from './PostError'
import dataURItoBlob from '../../../helpers/dataURItoBlob'

const PostPopup = ({ setPostVisible }) => {

    const [createPost] = useCreatePostMutation()
    const [uploadImage] = useUploadImageMutation()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const userInfo = useSelector((state) => state.registration.userInfo)

    const [postText, setPostText] = useState("")
    const [image, setImage] = useState([])
    const [imgPopup, setImgPopupt] = useState(false)
    const [imgBackground, setImgBackground] = useState("")
    const postPopupRef = useRef(null)

    OutSideClick(postPopupRef, () => {
        setPostVisible(false)
    })

    let handlePostSubmission = async () => {
        try {
            let response;
            setLoading(true)
            if (imgBackground) {
                response = await createPost({
                    type: null,
                    image: null,
                    text: postText,
                    background: imgBackground,
                    user: userInfo.id,
                    token: userInfo.token
                }).unwrap()
            }
            else if (image && image.length) {
                const postImage = image.map((item) => dataURItoBlob(item))
                const path = `${userInfo.userName}/post_images`
                let formData = new FormData()
                formData.append("path", path)
                postImage.forEach((img) => {
                    formData.append("file", img)
                })
                const responseImage = await uploadImage({
                    formData,
                    path,
                    token: userInfo.token
                }).unwrap()

                response = await createPost({
                    type: null,
                    image: responseImage,
                    text: postText,
                    background: null,
                    user: userInfo.id,
                    token: userInfo.token
                }).unwrap()

            }
            else if (postText) {
                response = await createPost({
                    type: null,
                    image: null,
                    text: postText,
                    background: null,
                    user: userInfo.id,
                    token: userInfo.token
                }).unwrap()
            } else {
                setError("please choose a file");
                setLoading(false)
                return
            }

            if (response.status === "done") {

                setLoading(false)
                setPostText("")
                setImgBackground("")
                setPostVisible(false)

            }

        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }


    return (
        <div className='w-full h-screen bg-blur z-20 absolute top-0 left-0 flex items-center justify-center'>
            <div ref={postPopupRef} className='relative w-2/6 bg-white shadow-md rounded-lg'>
                {error && <PostError error={error} setError={setError} />}
                <div className='border-b border-title_color p-5  relative'>
                    <h3 className='font-gilroyBold text-lg text-black text-center'>CreatePost</h3>
                    <div onClick={() => setPostVisible(false)} className='absolute top-5 right-4 cursor-pointer'>
                        <CircleCloseIcon />
                    </div>
                </div>
                <div className=' px-3 py-5'>
                    <div className='flex items-center gap-x-2'>
                        <img src={userInfo.profilePicture || profileImg} className='w-10 h-10 bg-secondary_color rounded-full' />
                        <h4 className='font-gilroyBold text-lg'>{userInfo.userName}</h4>
                    </div>
                    {imgPopup ?
                        <>
                            <PostImageViewer postText={postText} setPostText={setPostText} image={image} setImage={setImage} imgPopup={imgPopup} setImgPopupt={setImgPopupt} setError={setError} />
                            <div>
                                <PostAddToYourPost imgPopup={imgPopup} setImgPopupt={setImgPopupt} />
                            </div>
                        </>
                        :
                        <>
                            <PostEmojiPicker postText={postText} setPostText={setPostText} imgBackground={imgBackground} setImgBackground={setImgBackground} />
                            <div>
                                <PostAddToYourPost imgPopup={imgPopup} setImgPopupt={setImgPopupt} />
                            </div>
                        </>
                    }
                    <div className='w-full text-center mt-3'>
                        {postText == "" && (!imgPopup) ?
                            <button disabled className='py-2 bg-hober_clr w-full font-gilroySemiBold text-lg rounded-md cursor-not-allowed'>Post</button>
                            :
                            loading == true ?
                                <button className='py-2 bg-hober_clr w-full font-gilroySemiBold text-lg rounded-md hover:bg-black transition-all ease-linear duration-100 hover:text-white'>
                                    <PulseLoader size={5} color='#5093f3' />
                                </button>
                                :

                                <button onClick={handlePostSubmission} className='py-2 bg-hober_clr w-full font-gilroySemiBold text-lg rounded-md hover:bg-black transition-all ease-linear duration-100 hover:text-white'>Post</button>


                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPopup