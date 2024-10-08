import React, { useRef } from 'react'
import MiddleHeader from './MiddleHeader'
import { LiveIcon } from '../../../svg/Live'
import { Media } from '../../../svg/Media'
import Feeling from '../../../svg/Feeling'
import ShowPost from './ShowPost'

const MiddlePart = ({setPostVisible, posts}) => {

  const inputFocus = useRef(null)
  const handleVisible = ()=>{
    setPostVisible(true)
    inputFocus.current.blur()
  }

  return (
    <>
        <div className='mt-10'>
            <div className='px-5 py-6 bg-hober_clr rounded-xl'>
                <div className='flex items-center gap-x-2'>
                  <div className='w-12 h-12 bg-secondary_color rounded-full'></div>
                  <div className='w-[95%] '>
                    <input 
                    onClick={handleVisible}
                    ref={inputFocus} 
                    type="text" 
                    placeholder="What's On Your Mind" 
                    className='px-5 py-3 w-full rounded-full outline-none font-gilroyNormal text-base cursor-pointer hover:bg-cyan-100'
                    />
                  </div>
                </div>
                <div className='w-full h-px bg-white my-5'></div>
                <div className='flex items-center justify-around'>
                  <div className='flex items-center gap-x-2 cursor-pointer'>
                      <div>  <LiveIcon/>  </div>
                      <h4 className='font-gilroySemiBold'>Live Video</h4>
                  </div>
                  <div className='flex items-center gap-x-2 cursor-pointer'>
                      <div>  <Media/>  </div>
                      <h4 className='font-gilroySemiBold '>Media/Gallery</h4>
                  </div>
                  <div className='flex items-center gap-x-2 cursor-pointer'>
                      <div>  <Feeling/>  </div>
                      <h4 className='font-gilroySemiBold'>Activites</h4>
                  </div>
                  
                </div>
            </div>
            <div className='mt-10'>
            {posts?.map((item,index)=>(
              <ShowPost key={index} post={item}/>
            ))}
            </div>
        </div>
    </>
  )
}

export default MiddlePart