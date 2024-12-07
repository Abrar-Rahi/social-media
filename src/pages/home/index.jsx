import React from 'react'
import { Helmet } from 'react-helmet-async'
import LeftPart from '../../components/homeComponents/leftPart'
import MiddlePart from '../../components/homeComponents/middlePart'
import ReAuth from '../../components/reAutentication'
import { useSelector } from 'react-redux'
import ShowPost from '../../components/homeComponents/middlePart/ShowPost'

const Home = ({ setPostVisible, posts }) => {
  const userInfo = useSelector((state) => state.userInformation.userInfo)

  return (
    <>

      <Helmet>
        <title>Home</title>
      </Helmet>
      {userInfo.varified == false &&
        <ReAuth userInfo={userInfo} />
      }

      <div className='mt-10'>
        <MiddlePart setPostVisible={setPostVisible} posts={posts} />
      </div>
      <div className='mt-10'>
            {posts?.map((item,index)=>(
              <ShowPost key={index} post={item}/>
            ))}
            </div>

    </>
  )
}

export default Home