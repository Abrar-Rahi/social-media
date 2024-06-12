import React from 'react'

const Gender = ({formik, errors,touched}) => {
  return (
    <>
    <div className='flex items-center gap-x-3 mb-7 font-gilroyNormal'>
            <p>Gender :</p>
            <div>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete='off'
                type="radio"
                name="gender"
                value="male"
                id="Male" />
              <label htmlFor="Male" >Male</label>
            </div>
            <div>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete='off'
                type="radio"
                name="gender"
                value="female"
                id="Female" />
              <label htmlFor="Female" >Female</label>
            </div>
            <div className='text-red font-gilroyNormal'>
              {errors.gender && touched.gender && <p >{errors.gender}</p>}
            </div>

          </div>
    </>
  )
}

export default Gender