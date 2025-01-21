import React from 'react'
import { PuffLoader } from 'react-spinners'

const Activate = ({type, head, text, loading}) => {
  return (
    <div>
        <div className='fixed top-0 left-0 w-full h-screen bg-blur z-20 flex justify-center items-center'>
            <div className='w-[400px] p-4 rounded-md shadow-lg shadow-shadow text-center bg-white'>
                  <h3 className={`${type === "success" ? "text-green" : "text-red"} font-gilroyMedium text-lg `}>{head}</h3>
                  <h5 className='font-gilroyNormal text-base text-black my-2'>{text}</h5>
                  <PuffLoader className='m-auto mt-2' color='#21d997' loading={loading} size={40}/>
            </div>
        </div>
    </div>
  )
}

export default Activate