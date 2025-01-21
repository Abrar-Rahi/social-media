import React, { useEffect, useRef } from 'react'
import { CircleCloseIcon } from '../../../svg/CircleClose'
import OutSideClick from '../../../functions/click'
import Details from './Details'
import { Job } from '../../../svg/Job'
import { Location } from '../../../svg/Location'
import { Learning } from '../../../svg/Learning'
import { CircleProfileIcon } from '../../../svg/Circleprofile'
import { Love } from '../../../svg/Love'
import { Instagram } from '../../../svg/Instagram'

const EditDetails = ({ visible, setVisible, details, info, handleChange, handleUpdateInfos, loading }) => {

    const UploadPopupRef = useRef(null)

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

    return (
        <>
            <div className='w-full h-screen bg-blur z-50 fixed top-0 left-0 flex items-center justify-center'>
                <div ref={UploadPopupRef} className='relative w-[75%] md:w-3/6 xl:w-2/6  bg-white z-100 shadow-md shadow-shadow rounded-lg'>
                    <div className='border-b border-title_color p-5 flex items-center justify-between'>
                        <h3 className='font-gilroyBold text-lg text-black text-center '>Customise Your Details</h3>
                        <div onClick={() => setVisible(false)} className=' cursor-pointer'>
                            <CircleCloseIcon />
                        </div>
                    </div>
                    <div className='m-4'>
                        <h3 className='font-gilroyBold text-base m-1'>Job & Work Place</h3>
                        <div className='flex flex-col gap-y-2 '>
                            <Details text='Work Place' placeholder="Add Work Place" value={details?.workPlace} icon={<Job />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='workPlace'/>

                            <Details text='Job' placeholder="Add Job" value={details?.job} icon={<Job />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='job'/>
                        </div>
                    </div>

                    <div className='m-4'>
                        <h3 className='font-gilroyBold text-base m-1'>Other Name</h3>
                        <div>
                            <Details text='Other Name' placeholder="Add Other Name" value={details?.otherName} icon={<CircleProfileIcon />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='otherName'/>
                        </div>
                    </div>

                    <div className='m-4'>
                        <h3 className='font-gilroyBold text-base m-1'>Location</h3>
                        <div className='flex flex-col gap-y-2'>
                            <Details text='Current City' placeholder="Add Current City" value={details?.currentCity} icon={<Location />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='currentCity'/>

                            <Details text='Home Town' placeholder="Add Home Town" value={details?.homeTown} icon={<Location />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='homeTown'/>
                        </div>
                    </div>

                    <div className='m-4'>
                        <h3 className='font-gilroyBold text-base  m-1'>Education</h3>
                        <div className='flex flex-col gap-y-2'>
                            <Details text='High School' placeholder="Add High School" value={details?.highSchool} icon={<Learning />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='highSchool'/>

                            <Details text='Collage' placeholder="Add Collage" value={details?.collage} icon={<Learning />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='collage'/>
                        </div>
                    </div>

                    <div className='m-4'>
                        <h3 className='font-gilroyBold text-base  m-1'>Relationship</h3>
                        <div className='flex flex-col gap-y-2'>
                            <Details text='RelationShip' placeholder="Add RelationShip" value={details?.relationShip} icon={<Love />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='relationShip' relation/>
                        </div>
                    </div>

                    <div className='m-4'>
                        <h3 className='font-gilroyBold text-base  m-1'>Instagram</h3>
                        <div className='flex flex-col gap-y-2'>
                            <Details text='Instagram' placeholder="Add Instagram" value={details?.instagram} icon={<Instagram />} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name='instagram'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditDetails