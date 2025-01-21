import React from 'react'

const PostError = ({error, setError}) => {
  return (
    <div className='postError  h-full bg-blur absolute top-0 left-0 z-50 flex flex-col gap-y-3 items-center justify-center border-2 border-red p-5'>
        <div className='font-gilroySemibold text-lg text-red'>{error}</div>
        <button onClick={()=> setError(false)} className='px-4 py-2 bg-blue text-input_color font-gilroySemiBold text-base  rounded-full'>Try Again</button>

    </div>
  )
}

export default PostError