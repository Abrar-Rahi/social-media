import React from 'react'
import reactEmoji from './reactEmoji'

const Reacts = ({handleReact}) => {
  return (
    <div className='flex items-center gap-x-0 sm:gap-x-2'>
        {reactEmoji.map((react,i)=>(
            <img onClick={()=>handleReact(react.name)} key={i} src={react.image} alt="reacts" className='w-11 scale-[1.5] hover:scale-[1.9] transition-all duration-150 cursor-pointer'/>
        ))}
    </div>
  )
}

export default Reacts