import React from 'react'

const LeftAuth = ({title,description,regImg}) => {
  return (
    <div>
        <div className='z-10'> {regImg}</div>
        <h1 className='font-gilroyBold lg:text-3xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl text-primary_color'>{title}</h1>
        <p className='font-gilroyNormal lg:text-base xl:text-xl text-text_color mt-3'>{description}</p>
    </div>
  )
}

export default LeftAuth