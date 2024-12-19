import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserProfileQuery, useImageListMutation } from '../../features/api/authApi'
import { Helmet } from 'react-helmet-async'
import CoverPic from '../../components/profileComponents/CoverPic'
import ProfileHeader from '../../components/profileComponents/ProfileHeader'
import ProfileLeft from '../../components/profileComponents/ProfileLeft'
import ProfileRight from '../../components/profileComponents/ProfileRight'
import { useMediaQuery } from 'react-responsive'

const ProfilePage = ({posts,setPostVisible}) => {
  const userInfo = useSelector((state) => state.userInformation.userInfo)
  const navigate = useNavigate()
  const { userName } = useParams()
  const user = userName === undefined ? userInfo.userName : userName
  const { data: profile } = useGetUserProfileQuery(user)
  const [imageList,{data: imageData, error: imageError, isLoading:imageLoading}] = useImageListMutation()

  const path = `${user.replace(/\s+/g, "_")}/*`
  const sort = 'desc'
  const max = 30
  const topProfileHeight = useRef(null)
  const leftProfileHeight = useRef(null)
  const [nickName,setNickName] = useState()
  const [height,setHeight] = useState()
  const [leftHeight,setLeftHeight] = useState()
  const [scroll,setScroll] = useState()

  const ScrollResponsive = useMediaQuery({
    query: '(min-width: 1620px)'
  })

  const getScroll = ()=>{
    setScroll(window.scrollY);
  }

  useEffect(()=>{
    setHeight(topProfileHeight.current.clientHeight);
    setLeftHeight(leftProfileHeight.current.clientHeight);
    window.addEventListener("scroll", getScroll, {passive:true})

    return ()=>{
      window.removeEventListener("scroll", getScroll, {passive:true})
    }
    
  },[scroll])
  
  useEffect(() => {
    if (profile && profile.ok === false) {
      navigate("/")
    }else{
      imageList({path,sort,max})
    }
    setNickName(profile?.details?.otherName)
  }, [profile])


  const profileVisitor = profile?._id !== userInfo.id ? true : false ;

  


  return (
    <>
      <Helmet>
        <title>{`${profile?.fName} profile`}</title>
      </Helmet>


      <div ref={topProfileHeight}>
       
      <div>
        <CoverPic coverImage={profile?.coverPicture} profileVisitor={profileVisitor} imageData={imageData?.resources}/>
      </div>
        <ProfileHeader profile={profile} posts={posts} profileVisitor={profileVisitor} imageData={imageData?.resources} userInfo={userInfo} nickName={nickName}/>
       
      </div>

      <div className={` 3xl:grid 3xl:grid-cols-[2fr,3fr] 3xl:gap-x-4 my-5 ${
       ScrollResponsive && scroll >= height && leftHeight > 1000 ? "scrollFixed showLess" : ScrollResponsive && scroll >= height && leftHeight < 1000 && "scrollFixed showMore"
      }`}>
        <div className='profileLeft' ref={leftProfileHeight}>
          <ProfileLeft imageData={imageData} imageLoading={imageLoading} userDetails={profile?.details} profileVisitor={profileVisitor} setNickName={setNickName} friends={profile?.friends}/>
        </div>
        <div className='profileRight'>
          <ProfileRight setPostVisible={setPostVisible} posts={posts} profile={profile} profileVisitor={profileVisitor}/>
        </div>
      </div>
    </>
  )
}

export default ProfilePage