import React from 'react'
import { Helmet } from 'react-helmet-async'
import LeftPart from '../../components/homeComponents/leftPart'
import MiddlePart from '../../components/homeComponents/middlePart'

const Home = () => {
  return (
    <>

      <Helmet>
        <title>Home</title>
      </Helmet>
       
        <div className=''>
          <MiddlePart/>
        </div>
      
    </>
  )
}

export default Home