import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Camera } from '../../svg/Camera'
import { Media } from '../../svg/Media'
import { Upload } from '../../svg/Upload'
import OutSideClick from '../../functions/click'
import defaultCover from '../../assets/defaultImage/defaultcover.jpg'
import PostError from '../homeComponents/middlePart/PostError'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../helpers/getCropprdImage'
import { useCreatePostMutation, useUploadCoverPictureMutation, useUploadImageMutation } from '../../features/api/authApi'
import { useSelector,useDispatch } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { logInUsers } from '../../features/users/userSlice'
import OldCoverPic from './OldCoverPic'

const CoverPic = ({ coverImage, profileVisitor,imageData }) => {
    const [editPopup, setEditPopup] = useState(false)
    const [coverPic, setCoverPic] = useState("")
    const [chooseCoverPopup, setChooseCoverPopup] = useState(false)
    const [width, setWidth] = useState()
    const [error, setError] = useState("")
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [cropedAreaPixels, setCropedAreaPixels] = useState(null)
    const [uploadImage] = useUploadImageMutation()
    const [uploadCoverPicture] = useUploadCoverPictureMutation()
    const [createPost] = useCreatePostMutation()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userInformation.userInfo)
    const [loading, setLoading] = useState(false)

    const editRef = useRef(null)
    const chooseCover = useRef(null)
    const coverWidth = useRef(null)
    const uploadPhoto = useRef(null)

    OutSideClick(editRef, () => {
        setEditPopup(false)
    })

    useEffect(()=>{
        if(coverPic){
            setEditPopup(false) 
        }
    },[coverPic])

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCropedAreaPixels(croppedAreaPixels)
    }, [])

    const handleCoverImage = (e) => {
        const img = e.target.files[0]
        if (img.type !== "image/jpeg" &&
            img.type !== "image/jpg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp" &&
            img.type !== "image/gip") {
            setError("Select wrong image file");
            return
        } else if (img.size > 1024 * 1024 * 5) {
            setError("File size is too large. please select a photo under 5 mb");
            return
        }
        const renderFiles = new FileReader()
        renderFiles.readAsDataURL(img)
        renderFiles.onload = (finishedRead) => {
            setCoverPic(finishedRead.target.result)
        }

    }

    useEffect(() => {
        setWidth(coverWidth.current.clientWidth)
    }, [window.innerWidth])

    const handleCropedImage = useCallback(async (show) => {
        try {
            const croppedImage = await getCroppedImg(coverPic, cropedAreaPixels)
            if (show) {
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setCoverPic(croppedImage);
            } else {
                return croppedImage
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [cropedAreaPixels])

    const handleUploadCover = async () => {
        try {
            setLoading(true)
            const img = await handleCropedImage()
            const blob = await fetch(img).then((b) => b.blob())
            const path = `${userInfo.userName.replace(/\s+/g, "_")}/cover_picture`
            const formData = new FormData()
            formData.append('path', path)
            formData.append('file', blob)
            const resCoverPic = await uploadImage({ formData, path }).unwrap();
            const uploadCover = await uploadCoverPicture({ url: resCoverPic[0].url }).unwrap();
            if (uploadCover.status === "done") {
                setLoading(false)
                const coverPicPost = await createPost({
                    type: "coverPicture",
                    image: resCoverPic,
                    text: null,
                    background: null,
                    user: userInfo.id,
                    token: userInfo.token
                }).unwrap()

                if (coverPicPost.status === "done") {
                    setLoading(false)
                    uploadPhoto.current.style.backgroundImage = `url(${resCoverPic[0].url})`
                    localStorage.setItem('user', JSON.stringify({ ...userInfo, coverPicture: resCoverPic[0].url }))
                    dispatch(logInUsers({ ...userInfo, coverPicture: resCoverPic[0].url }))
                    // setVisible(false)
                    setCoverPic("")
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <div ref={coverWidth} className='relative'>

                <div
                    ref={uploadPhoto}
                    style={{ backgroundImage: `url(${coverImage || defaultCover})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                    className='w-full h-60 sm:h-96 rounded-t-md object-cover'
                >

                </div>
                {coverPic &&
                    <div className='coverCropper w-full'>
                        <Cropper
                            image={coverPic}
                            crop={crop}
                            zoom={zoom}
                            aspect={width / 384}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            objectFit='horizontal-cover'
                        />
                    </div>
                }

                {profileVisitor ?

                    " "
                    :
                    <>

                        <div onClick={() => setEditPopup(true)} className='flex items-center gap-x-2 text-black font-gilroyNormal bg-white absolute top-2 right-2 sm:top-5 sm:right-5 px-4 py-2 rounded-md cursor-pointer hover:bg-hober_clr duration-150 transition-all'>
                            <Camera />
                            <span className='hidden sm:block'>Edit Cover Photo</span>
                        </div>
                        {editPopup &&
                            <div ref={editRef} className=' w-56 bg-white absolute top-[50px] right-2 sm:top-[60px] sm:right-5 rounded-md'>

                                <div onClick={()=>setChooseCoverPopup(true)} className='flex items-center gap-x-2 cursor-pointer text-black font-gilroyNormal hover:bg-black hover:text-white py-3 px-3 duration-150 transition-all ease-linear'>
                                    <Media />
                                    <span>Choose Photo</span>
                                </div>

                                <div onClick={() => chooseCover.current.click()} className='flex items-center gap-x-2 cursor-pointer text-black font-gilroyNormal hover:bg-black hover:text-white py-3 px-3 duration-150 transition-all ease-linear'>
                                    <Upload />
                                    <span>Upload Photo</span>
                                    <input
                                        type="file"
                                        accept='image/jpeg,image/jpg,image/png,image/webp,image/gip'
                                        ref={chooseCover}
                                        className='hidden'
                                        onChange={handleCoverImage}
                                    />
                                </div>
                            </div>
                        }
                        {coverPic &&
                            <div className='flex items-center justify-center gap-x-2 bg-white absolute top-5 right-5 px-4 py-2 rounded-md'>

                                <button onClick={() => handleUploadCover()} className={`px-4 py-2 bg-blue text-white font-gilroyMedium text-base rounded-md cursor-pointer ${loading && "cursor-wait"}`}>
                                    {loading ? <BeatLoader color='#fff' size={8} /> : "Save"}
                                </button>

                                {/* <button onClick={() => handleUploadCover()} className='px-4 py-2 bg-blue font-gilroyMedium text-base rounded-lg'>Save</button> */}

                                <button onClick={() => setCoverPic("")} className='px-4 py-2 bg-red font-gilroyMedium text-base rounded-lg'>Cancle</button>
                            </div>
                        }
                        {error && <PostError error={error} setError={setError} />}
                    </>
                }


            </div>
            {chooseCoverPopup && <OldCoverPic setChooseCoverPopup={setChooseCoverPopup} imageData={imageData} userInfo={userInfo} setCoverPic={setCoverPic}/>}
            
        </div>
    )
}

export default CoverPic