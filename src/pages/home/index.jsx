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
      <div className='grid grid-cols-[1fr,2fr,1fr] gap-5 pt-10 px-10'>
        <div className='shadow-lg'>
          <LeftPart/>
        </div>
        <div>
          <MiddlePart/>
        </div>
        <div>right part</div>
      </div>
    </>
  )
}

export default Home