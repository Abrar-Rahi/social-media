import React, { useEffect, useRef, useState } from 'react'
import { CircleCloseIcon } from '../../../svg/CircleClose'
import OutSideClick from '../../../functions/click'
import { PlusCircle } from '../../../svg/PlusCircle'
import UploadPP from './UploadPP'
import PostError from '../../homeComponents/middlePart/PostError'

const ProfilePicture = ({ setVisible, uploadPhoto, imageData, userInfo }) => {

    const [image, setImage] = useState("")
    const [error, setError] = useState("")
    const UploadPopupRef = useRef(null)
    const fileRef = useRef(null)

    OutSideClick(UploadPopupRef, () => {
        setVisible(false)
    })

    useEffect(() => {
        const addClass = document.body
        if (setVisible) {
            addClass.classList.add("no-scroll")
        } else {
            addClass.classList.remove("no-scroll")
        }
        return () => {
            addClass.classList.remove("no-scroll")
        }
    }, [setVisible])


    const handleImage = (e) => {
        const img = e.target.files[0]
        if (img.type !== "image/jpeg" &&
            img.type !== "image/jpg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp" &&
            img.type !== "image/gip") {
            setError("select wrong image file");
            return
        } else if (img.size > 1024 * 1024 * 5) {
            setError("file size is too large. please select a photo under 5 mb");
            return
        }
        const renderFiles = new FileReader()
        renderFiles.readAsDataURL(img)
        renderFiles.onload = (finishedRead) => {
            setImage(finishedRead.target.result)
        }

    }

    return (
        <div>
            <div className='w-full h-screen bg-blur z-50 fixed top-0 left-0 flex items-center justify-center'>

                {image ? <UploadPP setImage={setImage} UploadPopupRef={UploadPopupRef} image={image} uploadPhoto={uploadPhoto} setVisible={setVisible} />
                    :
                    <div ref={UploadPopupRef} className='relative w-[75%] md:w-4/6 lg:w-3/6 bg-white shadow-md shadow-shadow rounded-lg'>
                        <div className='border-b border-title_color p-5  relative'>
                            <h3 className='font-gilroyBold text-lg text-black text-center'>Upload Your Photo</h3>
                            <div onClick={() => setVisible(false)} className='absolute top-5 right-4 cursor-pointer text-black'>
                                <CircleCloseIcon />
                            </div>
                        </div>
                        <div >
                        <div onClick={() => fileRef.current.click()} className='flex items-center gap-x-3 mx-auto justify-center py-2 bg-blue w-1/3 my-4 text-white font-gilroyMedium text-lg rounded-md cursor-pointer '>
                            <PlusCircle />
                            <button className='hidden sm:block'>Upload Photo</button>
                            <input
                                type="file"
                                accept='image/jpeg,image/jpg,image/png,image/webp,image/gip'
                                ref={fileRef}
                                className='hidden'
                                onChange={handleImage}
                            />
                        </div>
                        <div className='overflow-y-auto p-4 h-[400px]'>
                            <div className='font-gilroySemiBold text-black text-base'>
                                <span>Total Profile Picture's</span> ({imageData.filter((img) => img.asset_folder === `${userInfo.userName.replace(/\s+/g, "_")}/profile_picture`).length})
                            </div>
                            <div className='grid grid-cols-4 gap-3 mt-3'>
                            {
                            imageData.filter((img) => img.asset_folder === `${userInfo.userName.replace(/\s+/g, "_")}/profile_picture`).map((files)=>(
                                <img onClick={()=>setImage(files.secure_url)} key={files.asset_id} src={files.secure_url
                                } alt="profile Picture" className='w-full h-full object-cover cursor-pointer'/>
                            ))
                            }
                            </div>

                            <div className='font-gilroySemiBold text-black text-base mt-6'>
                                <span>Other Picture's</span> ({imageData.filter((img) => img.asset_folder !== `${userInfo.userName.replace(/\s+/g, "_")}/profile_picture`).length})
                            </div>
                            <div className='grid grid-cols-4 gap-3 mt-3'>
                            {
                            imageData.filter((img) => img.asset_folder !== `${userInfo.userName.replace(/\s+/g, "_")}/profile_picture`).map((files)=>(
                                <img onClick={()=>setImage(files.secure_url)} key={files.asset_id} src={files.secure_url
                                } alt="profile Picture" className='w-full h-full object-cover cursor-pointer'/>
                                
                            ))
                            }
                            </div>
                        </div>
                        </div>
                        {error && <PostError error={error} setError={setError} />}
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfilePicture