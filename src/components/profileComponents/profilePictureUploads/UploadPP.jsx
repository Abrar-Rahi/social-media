import React, { useRef } from 'react'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { CircleCloseIcon } from '../../../svg/CircleClose'
import { Plus } from '../../../svg/Plus'
import { Minus } from '../../../svg/Minus'
import getCroppedImg from '../../../helpers/getCropprdImage'
import { useDispatch, useSelector } from 'react-redux'
import { useCreatePostMutation, useUploadImageMutation, useUploadProfilePictureMutation } from '../../../features/api/authApi'
import { BeatLoader } from 'react-spinners'
import { logInUsers } from '../../../features/users/userSlice'

const UploadPP = ({ setImage, UploadPopupRef, image, uploadPhoto, setVisible }) => {

    const [text, setText] = useState("")
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [loading, setLoading] = useState(false)
    const [cropedAreaPixels, setCropedAreaPixels] = useState(null)
    const [uploadImage] = useUploadImageMutation()
    const [uploadProfilePicture] = useUploadProfilePictureMutation()
    const [createPost] = useCreatePostMutation()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userInformation.userInfo)

    const zoomRef = useRef(null)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {

        setCropedAreaPixels(croppedAreaPixels)
    }, [])

    const handleZoomIn = () => {
        zoomRef.current.stepUp()
        setZoom(zoomRef.current.value)
    }
    const handleZoomOut = () => {
        zoomRef.current.stepDown()
        setZoom(zoomRef.current.value)
    }

    const handleCropedImage = useCallback(async (show) => {
        try {
            const croppedImage = await getCroppedImg(image, cropedAreaPixels)
            if (show) {
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setImage(croppedImage);
            } else {
                return croppedImage
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [cropedAreaPixels])

    const handleUploadPP = async () => {
        try {
            setLoading(true)
            const img = await handleCropedImage()
            const blob = await fetch(img).then((b) => b.blob())
            const path = `${userInfo.userName.replace(/\s+/g, "_")}/profile_picture`
            const formData = new FormData()
            formData.append('path', path)
            formData.append('file', blob)
            const resProfilePic = await uploadImage({ formData, path }).unwrap();
            const uploadProfile = await uploadProfilePicture({ url: resProfilePic[0].url }).unwrap();
            if (uploadProfile.status === "done") {
                setLoading(false)
                const profilePicPost = await createPost({
                    type: "profilePicture",
                    image: resProfilePic,
                    text,
                    background: null,
                    user: userInfo.id,
                    token: userInfo.token
                }).unwrap()

                if (profilePicPost.status === "done") {
                    setLoading(false)
                    uploadPhoto.current.style.backgroundImage = `url(${resProfilePic[0].url})`
                    localStorage.setItem('user', JSON.stringify({...userInfo, profilePicture: resProfilePic[0].url}))
                    dispatch(logInUsers({...userInfo, profilePicture: resProfilePic[0].url}))
                    setVisible(false)
                    setImage("")
                }
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div ref={UploadPopupRef} className='relative w-2/6 h-[800px] bg-white shadow-md rounded-lg p-5'>
            <div className='border-b border-white-100 p-5  relative'>
                <h3 className='font-gilroyBold text-lg text-black text-center'>Upload Your Photo</h3>
                <div onClick={() => setImage("")} className='absolute top-5 right-4 cursor-pointer'>
                    <CircleCloseIcon />
                </div>
            </div>
            <textarea
                className='w-full h-32 outline-none mt-3 border border-white-100 p-2 resize-none font-gilroyNormal text-black placeholder:font-gilroyNormal mb-4'
                placeholder={`what's on your mind`}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className='profileCropper flex items-center justify-center relative w-full h-[400px]'>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    cropShape='round'
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>

            <div className='flex items-center justify-center gap-x-4 mt-6'>
                {/* Zoom In Button */}
                <div
                    onClick={handleZoomIn}
                    className='w-9 h-9 bg-hober_clr rounded-full flex items-center justify-center cursor-pointer hover:bg-white-100 shadow-lg transition duration-150 ease-in-out transform hover:scale-110'
                >
                    <Plus className="text-xl text-black" />
                </div>

                {/* Zoom Slider */}
                <div className='w-[70%]'>
                    <input
                        type="range"
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                        value={zoom}
                        ref={zoomRef}
                        min={1}
                        max={3}
                        step={0.2}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                    <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: #4f46e5; /* Change thumb color */
                cursor: pointer;
            }
            input[type="range"]{
                appearance: none;
                width:100%;
                height: 4px;
                background : #ececec
            }
         
        `}</style>
                </div>

                {/* Zoom Out Button */}
                <div
                    onClick={handleZoomOut}
                    className='w-9 h-9 bg-hober_clr rounded-full flex items-center justify-center cursor-pointer hover:bg-white-100 shadow-lg transition duration-150 ease-in-out transform hover:scale-110'
                >
                    <Minus className="text-xl text-black" />
                </div>
            </div>

            <div className='flex items-center justify-end gap-x-3 mt-7'>
                <button disabled={loading} onClick={() => handleCropedImage("show")} className='py-2 px-4 bg-red text-white font-gilroyMedium text-base rounded-md cursor-pointer'>Crop Image</button>
               
                    <button  onClick={() => handleUploadPP()} className={`py-2 px-4 bg-blue text-white font-gilroyMedium text-base rounded-md cursor-pointer ${loading && "cursor-wait"}`}>
                        {loading ? <BeatLoader color='#fff' size={5} /> : "Upload"}
                    </button>
                
            </div>

        </div>

    )
}

export default UploadPP