import React, { useRef } from 'react'
import PostEmojiPicker from './PostEmojiPicker'
import { CircleCloseIcon } from '../../../svg/CircleClose'
import { Media } from '../../../svg/Media'
import { Cross } from '../../../svg/Cross'

const PostImageViewer = ({ postText, setPostText, image, setImage, imgPopup, setImgPopupt, setError }) => {
    const fileRef = useRef(null)

    const handleImage = (e) => {
        let file = Array.from(e.target.files);
        file.forEach((img) => {
            if (img.type !== "image/jpeg" &&
                img.type !== "image/jpg" &&
                img.type !== "image/png" &&
                img.type !== "image/webp" &&
                img.type !== "image/gip") {
                file = file.filter((item) => item.name !== img.name)
                setError("select wrong image file");
                return
            } else if (img.size > 1024 * 1024 * 5) {
                file = file.filter((item) => item.name !== img.name)
                setError("file size is too large. please select a photo under 5 mb");
                return
            }
            const renderFiles = new FileReader()
            renderFiles.readAsDataURL(img)
            renderFiles.onload = (renderImage) => {
                setImage((images) => [...images, renderImage.target.result])
            }
        })
    }
    return (
        <div>
            <PostEmojiPicker postText={postText} setPostText={setPostText} changePart />
            <div className='w-full h-96 border border-title_color bg-blur my-5 rounded-lg p-2'>
                <div className='border border-title_color w-full h-full bg-hober_clr rounded-lg '>
                    <input
                        type="file"
                        multiple
                        accept='image/jpeg,image/jpg,image/png,image/webp,image/gip'
                        ref={fileRef}
                        className='hidden'
                        onChange={handleImage}
                    />
                    {image && image.length ?


                        <div className={`relative w-full h-full  overflow-y-scroll rounded-lg ${image.length === 2 ? "grid grid-cols-2 gap-2" : image.length === 3 ? "grid grid-cols-2 gap-2" : image.length === 4 ? "grid grid-cols-2 gap-2" : image.length >= 5 && "grid grid-cols-2 gap-2"}`}>
                            {image.slice(0, 4).map((item, index) => (
                                <img key={index} src={item} alt="image" className={`object-cover w-full h-full ${image.length === 3 ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3" : image.length === 4 && "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3"}`} />
                            ))}

                            <div onClick={() => setImage([])} className='absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer '>
                                <Cross width={17} height={17}/>
                            </div>
                            <div onClick={() => fileRef.current.click()} className='absolute top-3 left-3 px-2 py-1.5 bg-green1 rounded-lg flex items-center gap-x-2 cursor-pointer'>
                                <div>
                                    <Media />
                                </div>
                                <h3 className='font-gilroyBold text-sm '>Add Photos/Video</h3>
                            </div>
                            {image.length >= 5 &&
                                <div className='absolute -bottom-10 right-20 w-20 h-20 bg-white text-black rounded-full flex items-center justify-center'>
                                    <h5 className='font-gilroyBold text-5xl'>+{image.length - 4}</h5>
                                </div>
                            }
                        </div>

                        :
                        <div className='relative flex items-center justify-center h-full'>
                            <div onClick={() => setImgPopupt(false)} className='absolute top-2 right-2 cursor-pointer text-black'>
                                <CircleCloseIcon />
                            </div>
                            <div onClick={() => fileRef.current.click()} className='flex flex-col items-center cursor-pointer text-black'>
                                <div className='w-10 h-10 bg-black text-white rounded-full flex items-center justify-center'>
                                    <Media />
                                </div>
                                <h4 className='font-gilroySemiBold text-lg'>Add Photos/Videos</h4>
                                <p className='font-gilroymedium text-sm'>or drug and drop</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PostImageViewer