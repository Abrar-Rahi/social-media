import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { findUser } from '../../validation'
import { useMatchUserMutation } from '../../features/api/authApi'

const FindPassword = ({setLoading,setError,error, setUserInfo,setVisible}) => {

    const [matchUser] = useMatchUserMutation()

    const initialState = {
        email : ""
    }
    const formik = useFormik({
        initialValues : initialState,
        validationSchema : findUser,
        onSubmit : ()=>{
            findUserResult()
        }
    })

    const findUserResult = async ()=>{
       try {
        setLoading(true)
        const result = await matchUser(formik.values.email).unwrap()
        setUserInfo(result);
        setError("")
        setVisible(1)
       } catch (error) {
        setError(error.data.message);
       }
    }

    const {errors, touched} = formik
  return (
    <div className='w-auto h-auto px-20 py-10 bg-white rounded-lg shadow-lg'>
                    <h3 className='font-gilroySemiBold text-xl text-black'>Find Your Account</h3>
                    <div className='w-full h-[1px] bg-hober_clr my-3'></div>
                    <p className='font-gilroyNormal text-sm text-black'>Please Enter Your Email to Find Your Account</p>

                   <form onSubmit={formik.handleSubmit}>
                   <input
                        className='w-full px-2 py-3 font-gilroyNormal text-sm border border-cyan-100 rounded-lg my-5 outline-none'
                        placeholder='Enter Your Email Here'
                        type="email"
                        name='email'
                        autoComplete='off'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                         />
                         {errors.email && touched.email && <p className='font-gilroyNormal text-sm text-red'>{errors.email}</p>}
                         
                         {error && <p className='font-gilroyNormal text-sm text-red'>{error}</p>}

                    <div className='w-full h-[1px] bg-hober_clr my-3'></div>
                    <div className='flex items-center justify-center gap-2 mt-5'>
                        <Link to={"/login"} className='px-4 py-2 bg-black text-white rounded-lg font-gilroyMedium text-base'>Cancle</Link>
                        <button type='submit' className='px-4 py-2 bg-primary_color rounded-lg font-gilroyMedium text-base text-white'>Search</button>
                    </div>
                   </form>
                </div>
  )
}

export default FindPassword