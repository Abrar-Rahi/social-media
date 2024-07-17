import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { signIN } from '../../validation'
import { useLoggedInUserMutation } from '../../features/api/authApi'
import { ToastContainer, toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import {logInUsers} from "../../features/users/userSlice"



const initialState = {
    email: "",
    password: "",
}

const Logreg = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [loggedInUser, { isLoading }] = useLoggedInUserMutation()

    const login = async () => {
        let logInMutation = await loggedInUser({
            email: formik.values.email,
            password: formik.values.password,
        })
        if (logInMutation?.data) {
            toast.success(logInMutation.data?.message);
            const {message , ...rest} = logInMutation.data
            console.log(rest);
            localStorage.setItem("user", JSON.stringify(rest))
            dispatch(logInUsers(rest))
            setTimeout(() => {
                navigate("/")
            }, 2000);
        } else if (logInMutation?.error) {
           return toast.error(logInMutation.error?.data?.message);
        }
    }

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: signIN,
        onSubmit: () => {

            login()
            formik.resetForm()
        }
    })

    const { errors, touched } = formik



    return (

        <div className='w-full rounded-md lg:shadow-md px-5 md:px-16 lg:px-10 lg:py-5 box-boreder'>
            <div>
                <form onSubmit={formik.handleSubmit}>

                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'
                        name='email'
                        value={formik.values.email}
                        type='email'
                        className={errors.email && touched.email ? 'w-full px-4 py-2 border border-red rounded-md' : 'w-full px-4 py-2 border border-purple-100 rounded-md mb-5'} placeholder='Enter Your Email' />
                    {errors.email && touched.email && <p className='text-red font-gilroyNormal'>{errors.email}</p>}

                    <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete='off'
                        name='password'
                        value={formik.values.password}
                        type='password'
                        className={errors.password && touched.password ? 'w-full px-4 py-2 rounded-md border border-red' : 'w-full px-4 py-2 border border-purple-100 rounded-md mb-7'}
                        placeholder='Password' />

                    {errors.password && touched.password && <p className='text-red font-gilroyNormal'>{errors.password}</p>}


                    <div className='text-center mb-5'>
                        {isLoading ?
                            <button disabled type='submit' className='px-10 py-2 bg-text_color rounded-xl font-gilroyMedium text-white'>
                                <BeatLoader color='#fff' size={8}/>
                            </button>
                            :
                            <button type='submit' className='px-10 py-2 bg-text_color rounded-xl font-gilroyMedium text-white'>Login</button>
                        }

                    </div>
                    <div className='flex items-center justify-between gap-x-3'>
                    <p className='font-gilroyNormal text-center'>Don't Have An Account ? <Link className='font-gilroySemiBold text-blue underline' to={"/registration"}>Sign UP</Link>
                    </p>

                     <Link className='font-gilroySemiBold text-blue underline' to={"/forgetPassword"}>Forget Password?</Link>
                    
                    </div>
                </form>
            </div>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    )
}

export default Logreg