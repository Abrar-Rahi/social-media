import React from 'react'
import LeftAuth from '../../components/registration/LeftAuth'
import RegistrationIcon from '../../svg/RegistrationIcon'
import FormReg from '../../components/registration/FormReg'
import { Helmet } from 'react-helmet-async'
import Logreg from '../../components/login/LogReg'
import LoginIcon from '../../svg/LoginIcon'
import LoginIconSecond from '../../svg/LoginIconSecond'

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='flex gap-x-7 justify-center items-center lg:h-screen py-5 lg:py-0  relative'>
                <div className='hidden lg:block w-96 h-40 rounded-full bg-purple-100 absolute top-0 -left-40'></div>
                <div className='hidden lg:block w-96 h-40 rounded-full bg-purple-100 absolute top-24 -left-10'></div>



                <div className='hidden lg:block lg:w-[40%] xl:w-[45%] z-10'>

                    <LeftAuth regImg={<LoginIcon />} title="Login For Access" description="Connect with ease! Log in Chat Barta account and join Our world. Your gateway to a vibrant online community awaits.Skip the hassle of creating yet another account! Sign in effortlessly through Chat Barta and dive into a world of connectivity. Your journey begins with just a tap." />
                </div>
                <div className='w-full lg:w-[50%] xl:w-[45%]'>
                    <div className='flex justify-center lg:hidden'>
                        <LoginIcon />
                    </div>
                    <div className='lg:flex lg:justify-center hidden'>
                        <LoginIconSecond />
                    </div>

                    <Logreg />
                </div>
            </div>
        </>
    )
}

export default Login