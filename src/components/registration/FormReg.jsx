import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signUP } from '../../validation'
import DateOfBirth from './DateOfBirth'
import Gender from './Gender'
import { useAddUserMutation } from '../../features/api/authApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners'

const initialState = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
}

const FormReg = () => {

  let navigate = useNavigate()
  const [ageError, setAgeError] = useState("")
  const [addUser, { isLoading }] = useAddUserMutation()

  const registration = async () => {
    let singUpMutation = await addUser({
      fName: formik.values.fName,
      lName: formik.values.lName,
      email: formik.values.email,
      password: formik.values.password,
      bYear: formik.values.bYear,
      bMonth: formik.values.bMonth,
      bDay: formik.values.bDay,
      gender: formik.values.gender,
    })
    if (singUpMutation?.data) {
      toast.success(singUpMutation.data?.message);
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } else if (singUpMutation?.error) {
      toast.error(singUpMutation.error?.data?.message);
    }
  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signUP,
    onSubmit: () => {

      const currentDate = new Date()
      const pecked_date = new Date(
        formik.values.bYear,
        formik.values.bMonth - 1,
        formik.values.bDay,
      )
      const underAge = new Date(1970 + 18, 0, 1)
      const overAge = new Date(1970 + 70, 0, 1)
      if (currentDate - pecked_date < underAge) {
        return setAgeError("you are not adult");
      } else if (currentDate - pecked_date > overAge) {
        return setAgeError("you are age out");
      }
      registration()
      formik.resetForm()
      setAgeError("")

    }
  })

  const { errors, touched } = formik

  const tempYear = new Date().getFullYear()
  const years = Array.from(new Array(105), (val, index) => tempYear - index)
  const months = Array.from(new Array(12), (val, index) => 1 + index)

  const days = () => {
    return new Date(formik.values.bYear, formik.values.bMonth, 0).getDate()
  }
  const dates = Array.from(new Array(days()), (val, index) => 1 + index)


  return (

    <div className='w-full rounded-md lg:shadow-md shadow-shadow px-5 md:px-16 lg:px-10 lg:py-5 box-boreder'>
      <div>
        <form onSubmit={formik.handleSubmit}>

          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete='off'
            name='fName'
            value={formik.values.fName}
            type='text'
            className={errors.fName && touched.fName ? 'w-full px-4 py-2 border border-red rounded-md ' : 'w-full px-4 py-2 border border-purple-100 rounded-md mb-5 '}
            placeholder='First Name' />
          <div className='text-red font-gilroyNormal'>
            {errors.fName && touched.fName && <p >{errors.fName}</p>}
          </div>

          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete='off'
            name='lName'
            value={formik.values.lName}
            type='text'
            className={errors.lName && touched.lName ? 'w-full  px-4 py-2 border border-red rounded-md' : 'w-full px-4 py-2 border border-purple-100 rounded-md mb-5 '}
            placeholder='Last Name' />

          <div className=' text-red font-gilroyNormal'>
            {errors.lName && touched.lName && <p >{errors.lName}</p>}
          </div>


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
            className={errors.password && touched.password ? 'w-full px-4 py-2 rounded-md border border-red' : 'w-full px-4 py-2 border border-purple-100 rounded-md mb-5'}
            placeholder='Password' />

          {errors.password && touched.password && <p className='text-red font-gilroyNormal'>{errors.password}</p>}

          <DateOfBirth formik={formik} years={years} months={months} dates={dates} ageError={ageError} />

          <Gender formik={formik} errors={errors} touched={touched} />

          <div className='text-center mb-5'>
            {isLoading ?
              <button disabled type='submit' className='px-10 py-2 bg-text_color rounded-xl font-gilroyMedium text-white'>
                <BeatLoader color='#fff' size={8} />
              </button>
              :
              <button type='submit' className='px-10 py-2 bg-text_color rounded-xl font-gilroyMedium text-white'>Submit</button>
            }
          </div>
          <p className='font-gilroyNormal text-center'>Already Have An Account ? <Link className='font-gilroySemiBold text-blue underline' to={"/login"}>Sign IN</Link></p>
        </form>

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
    </div>
  )
}

export default FormReg