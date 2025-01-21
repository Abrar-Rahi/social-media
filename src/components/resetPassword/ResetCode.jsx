import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { userCode } from '../../validation'
import { useVerifyResetCodeMutation } from '../../features/api/authApi'

const ResetCode = ({ userInfo, setSuccess, success, setError, error, setVisible, setLoading }) => {
    const [verifyResetCode] = useVerifyResetCodeMutation()
    const initialState = {
        code: ""
    }
    const formik = useFormik({
        initialValues: initialState,
        validationSchema: userCode,
        onSubmit: () => {
            verifySecretCode()
        }
    })

    const verifySecretCode = async () => {
        try {
            setLoading(true)
            const result = await verifyResetCode({ email: userInfo.email, resetCode: formik.values.code }).unwrap()
            setSuccess(result.message);
            setError("")
            setTimeout(()=>{
                setVisible(3)
                setSuccess("")
              },3000)
        } catch (error) {
            setError(error.data.message);
        }
    }

    const { errors, touched } = formik
    return (
        <div className='w-auto h-auto px-20 py-10 bg-white rounded-lg shadow-lg shadow-shadow'>
            <h3 className='font-gilroySemiBold text-xl text-black'>Code Varification</h3>
            <div className='w-full h-[1px] bg-hober_clr my-3'></div>
            <p className='font-gilroyNormal text-sm text-black'>Please Enter code that been sent your email</p>

            <form onSubmit={formik.handleSubmit}>
                <input
                    className='w-full px-2 py-3 font-gilroyNormal text-sm border border-cyan-100 rounded-lg my-5 outline-none'
                    placeholder='Enter Your The Code Here'
                    type="text"
                    name='code'
                    autoComplete='off'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.code}
                />
                {errors.code && touched.code && <p className='font-gilroyNormal text-sm text-red'>{errors.code}</p>}

                {success && <p className='mx-auto font-gilroyNormal text-sm text-green my-3'>{success}</p>}

                {error && <p className='mx-auto font-gilroyNormal text-sm text-red my-3'>{error}</p>}

                <div className='w-full h-[1px] bg-hober_clr my-3'></div>
                <div className='flex items-center justify-center gap-2 mt-5'>
                    <Link to={"/login"} className='px-4 py-2 bg-black text-white rounded-lg font-gilroyMedium text-base'>Cancle</Link>
                    <button type='submit' className='px-4 py-2 bg-primary_color rounded-lg font-gilroyMedium text-base text-white'>Next</button>
                </div>
            </form>
        </div>
    )
}

export default ResetCode