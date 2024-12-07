import React, { useEffect } from 'react'
import { useState } from 'react'
import { Job } from '../../../svg/Job'
import { Location } from '../../../svg/Location'
import { Learning } from '../../../svg/Learning'
import { Love } from '../../../svg/Love'
import { Instagram } from '../../../svg/Instagram'
import EditBio from './EditBio'
import { useUpdateDetailsMutation } from '../../../features/api/authApi'
import EditDetails from './EditDetails'
import { useDispatch, useSelector } from 'react-redux'
import { logInUsers } from '../../../features/users/userSlice'

const ProfileInfoOption = ({ userDetails, profileVisitor, setNickName }) => {

    const [details, setDetails] = useState(userDetails)

    const iniatialInfo = {
        bio: details?.bio ? details?.bio : "",
        otherName: details?.otherName ? details?.otherName : "",
        job: details?.job ? details?.job : "",
        workPlace: details?.workPlace ? details?.workPlace : "",
        currentCity: details?.currentCity ? details?.currentCity : "",
        collage: details?.collage ? details?.collage : "",
        highSchool: details?.highSchool ? details?.highSchool : "",
        homeTown: details?.homeTown ? details?.homeTown : "",
        relationShip: details?.relationShip ? details?.relationShip : "",
        instagram: details?.instagram ? details?.instagram : "",
    }
    const [userInformation, setUserInformation] = useState(iniatialInfo)
    const [editBioOption, setEditBioOption] = useState(false)
    const [updateDetails] = useUpdateDetailsMutation()
    const [loading, setLoading] = useState(false)
    const [max, setMax] = useState(30)
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userInformation.userInfo)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInformation({ ...userInformation, [name]: value })
        setMax(30 - e.target.value.length)
    }

    useEffect(() => {
        setDetails(userDetails)
        setUserInformation(userDetails)
    }, [userDetails])

    const handleUpdateInfos = async () => {
        try {
            setLoading(true)
            const result = await updateDetails({ userInformation }).unwrap()
            setDetails(result);
            setNickName(result.otherName)
            dispatch(logInUsers({...userInfo, nickName : result.otherName}))
            localStorage.setItem("user", JSON.stringify({...userInfo, nickName : result.otherName}))
            setLoading(false)
            setEditBioOption(false)
            
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='flex flex-col gap-y-2'>

            <div >
                <div className='flex flex-col gap-y-3'>
                    <p className='font-gilroyMedium text-base text-black text-center'>
                        {details?.bio && details.bio}
                    </p>

                    {!profileVisitor &&
                        <button onClick={() => setEditBioOption(true)} className='w-full py-2 bg-hober_clr text-black text-sm font-gilroySemiBold rounded-lg mb-2'>
                            {details?.bio ? "Edit Bio" : "Add Bio"}
                        </button>
                    }
                </div>
                {editBioOption &&
                    <div >
                        <EditBio  setEditBioOption={setEditBioOption} info={userInformation} handleChange={handleChange} name={"bio"} max={max} handleUpdateInfos={handleUpdateInfos} loading={loading} placeholder="Edit Bio"/>
                    </div>
                }
            </div>

            <div className='flex items-center gap-x-2'>
                <div>
                    <Job />
                </div>
                <div className='font-gilroyNormal text-sm'>
                    {details?.job && details?.workPlace ?
                        <span>As a <b>{details?.job}</b> at <b>{details?.workPlace}</b></span>
                        :
                        details?.job && !details?.workPlace ?
                            <span>As a <b>{details?.job}</b></span>
                            :

                            !details?.job && details?.workPlace ?
                                <span>Work's at <b>{details?.workPlace}</b></span>
                                :
                                "Work Place and Job"
                    }
                </div>
            </div>

            <div className='flex items-center gap-x-2'>
                <div>
                    <Location />
                </div>
                <div className='font-gilroyNormal text-sm'>
                    {details?.currentCity ?
                        <span>Lives in <b>{details?.currentCity}</b></span>
                        :
                        "Current City"
                    }
                </div>
            </div>

            <div className='flex items-center gap-x-2'>
                <div>
                    <Learning />
                </div>
                <div className='font-gilroyNormal text-sm'>
                    {details?.collage ?
                        <span>Studied at <b>{details?.collage}</b></span>
                        :
                        "Add Collage"
                    }
                </div>
            </div>

            <div className='flex items-center gap-x-2'>
                <div>
                    <Learning />
                </div>
                <div className='font-gilroyNormal text-sm'>
                    {details?.highSchool ?
                        <span>Studied at <b>{details?.highSchool}</b></span>
                        :
                        "Add School"
                    }
                </div>
            </div>

            <div className='flex items-center gap-x-2'>
                <div>
                    <Location />
                </div>
                <div className='font-gilroyNormal text-sm'>
                    {details?.homeTown ?
                        <span>Home Town <b>{details?.homeTown}</b></span>
                        :
                        "Add Home Town"
                    }
                </div>
            </div>

            <div className='flex items-center gap-x-2'>
                <div>
                    <Love />
                </div>
                <div className='font-gilroyNormal text-sm'>
                    {details?.relationShip ?
                        <span>{details?.relationShip}</span>
                        :
                        "Add Relationship"
                    }
                </div>
            </div>

            <div className='flex items-center gap-x-2'>
                <div>
                    <Instagram />
                </div>
                <div className='font-gilroyNormal text-sm'>
                    {details?.instagram ?
                        <span>{details?.instagram}</span>
                        :
                        "Add Instagram"
                    }
                </div>
            </div>
            {!profileVisitor &&
            <div>
                {
                    !details?.workPlace &&  !details?.job && !details?.otherName && !details?.currentCity && !details?.collage && !details?.highSchool && !details?.homeTown && !details?.relationShip && !details?.instagram ? 

                    <button onClick={()=>setVisible(true)} className='w-full py-2 bg-hober_clr text-black text-sm font-gilroySemiBold rounded-lg mb-2'>
                        Add Details
                    </button>
                    :
                    <button onClick={()=>setVisible(true)} className='w-full py-2 bg-hober_clr text-black text-sm font-gilroySemiBold rounded-lg mb-2'>
                        Edit Details
                    </button>

                }
                </div>
            }
            { visible && <EditDetails visible={visible} setVisible={setVisible} details={details} info={userInformation} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading}/>}
        </div>
    )
}

export default ProfileInfoOption