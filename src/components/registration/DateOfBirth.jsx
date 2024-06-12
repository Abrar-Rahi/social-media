import React from 'react'

const DateOfBirth = ({ formik,years, months,dates,ageError }) => {
    return (
        <>
            <div className={ageError ? 'flex gap-x-2 lg:gap-x-5 text-gilroyNormal' : 'flex gap-x-2 lg:gap-x-5 mb-5 text-gilroyNormal'}>

                <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    name='bYear'
                    value={formik.values.bYear}
                    className='w-1/3 px-2 lg:px-4 py-2 border border-purple-100 rounded-md'>
                    <option>Year</option>
                    {years.map((item, index) => (

                        <option key={index}>{item}</option>
                    ))}

                </select>

                <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    name='bMonth'
                    value={formik.values.bMonth}
                    className='w-1/3 px-2 lg:px-4 py-2 border border-purple-100 rounded-md'>
                    <option >Month</option>
                    {months.map((item, index) => (

                        <option key={index}>{item}</option>
                    ))}
                </select>

                <select
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete='off'
                    name='bDay'
                    value={formik.values.bDay}
                    className='w-1/3 px-2 lg:px-4 py-2 border border-purple-100 rounded-md'>
                    <option>Day</option>
                    {dates.map((item, index) => (

                        <option key={index}>{item}</option>
                    ))}
                </select>

            </div>
            <div className='text-red font-gilroyNormal'>
                {ageError && <p >{ageError}</p> }
            </div>
        </>
    )
}

export default DateOfBirth