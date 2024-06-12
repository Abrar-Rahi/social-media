import React from 'react'
import LeftAuth from '../../components/registration/LeftAuth'
import RegistrationIcon from '../../svg/RegistrationIcon'
import FormReg from '../../components/registration/FormReg'
import { Helmet } from 'react-helmet-async'

const Registration = () => {
  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <div className='flex gap-x-7 justify-center items-center lg:h-screen py-5 lg:py-0  relative'>
        <div className='hidden lg:block w-96 h-40 rounded-full bg-purple-100 absolute top-0 -left-40'></div>
        <div className='hidden lg:block w-96 h-40 rounded-full bg-purple-100 absolute top-24 -left-10'></div>

        <div className='hidden lg:block lg:w-[40%] xl:w-[45%] z-10'>

          <LeftAuth regImg={<RegistrationIcon />} title="Start with Chat Barta" description="Ready to join the online community? Create your account quickly and easily with Chat Barta sign-up. Unlock access to endless connections, updates, and shared experiences. Your digital presence starts here, where every click leads to new opportunities. Join us today and let your voice be heard across the virtual landscape." />
        </div>
        <div className='w-full lg:w-[50%] xl:w-[45%]'>
          <div className='flex justify-center lg:hidden'>
            <RegistrationIcon />
          </div>
          <FormReg />
        </div>
      </div>
    </>
  )
}

export default Registration