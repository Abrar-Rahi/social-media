import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { newPassword } from '../../validation'
import { useChangePasswordMutation } from '../../features/api/authApi'
import { ToastContainer, toast } from 'react-toastify'

const NewPassword = ({ userInfo, setSuccess, success, setError, error, setVisible, setLoading }) => {

    let navigate = useNavigate()

    const [changePassword] = useChangePasswordMutation()


    const initialState = {
        password: ""
    }
    const formik = useFormik({
        initialValues: initialState,
        validationSchema: newPassword,
        onSubmit: () => {
            passChange()

        }
    })

    const passChange = async () => {
        try {
            setLoading(true)
            const result = await changePassword({ email: userInfo.email, password: formik.values.password }).unwrap()

            setSuccess(result.message);
            setError("")
            toast.success("successFully change your password. now Login again with your new password")
            setTimeout(() => {
                navigate("/login")
            }, 3000)

        } catch (error) {
            setError(error.data.message);
        }
    }

    const { errors, touched } = formik
    return (
        <div className='w-auto h-auto px-20 py-10 bg-white rounded-lg shadow-lg'>
            <h3 className='font-gilroySemiBold text-xl text-black'>Create New Password</h3>
            <div className='w-full h-[1px] bg-hober_clr my-3'></div>
            <p className='font-gilroyNormal text-sm text-black'>Please Enter The New Strong Password</p>

            <form onSubmit={formik.handleSubmit}>
                <input
                    className='w-full px-2 py-3 font-gilroyNormal text-sm border border-cyan-100 rounded-lg my-5 outline-none'
                    placeholder='Enter Your New Password Here'
                    type="text"
                    name="password"
                    autoComplete='off'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {errors.password && touched.password && <p className='font-gilroyNormal text-sm text-red'>{errors.password}</p>}

                {success && <p className='mx-auto font-gilroyNormal text-sm text-green my-3'>{success}</p>}

                {error && <p className='mx-auto font-gilroyNormal text-sm text-red my-3'>{error}</p>}

                <div className='flex items-center justify-center gap-2 mt-5'>
                    <Link to={"/login"} className='px-4 py-2 bg-black text-white rounded-lg font-gilroyMedium text-base'>Cancle</Link>
                    <button type='submit' className='px-4 py-2 bg-primary_color rounded-lg font-gilroyMedium text-base text-white'>Continue</button>
                </div>
            </form>
            <div className='z-40'>
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

export default NewPassword