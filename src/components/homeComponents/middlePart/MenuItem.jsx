import React from 'react'

const MenuItem = ({icon,title}) => {
    const Icon = icon
  return (
    <div>
        <div className='flex items-center gap-x-2 mb-3 cursor-pointer'>
           <Icon/>
           <p className='font-gilroyNormal text-base text-secondary_color'>{title}</p>
        </div>
    </div>
  )
}

export default MenuItem