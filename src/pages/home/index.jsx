import React from 'react'
import { Helmet } from 'react-helmet-async'
import LeftPart from '../../components/homeComponents/leftPart'
import MiddlePart from '../../components/homeComponents/middlePart'
import ReAuth from '../../components/reAutentication'
import { useSelector } from 'react-redux'

const Home = ({setPostVisible}) => {
  const userInfo = useSelector((state)=> state.registration.userInfo)
  return (
    <>

      <Helmet>
        <title>Home</title>
      </Helmet>
      {userInfo.varified == false &&
       <ReAuth userInfo={userInfo}/>
      }
      
        <div>
          <MiddlePart setPostVisible={setPostVisible}/>
        </div>
      
    </>
  )
}

export default Home