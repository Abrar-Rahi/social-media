import React from 'react'
import { Media } from '../../../svg/Media'
import Feeling from '../../../svg/Feeling'
import { Friends } from '../../../svg/Friends'

const PostAddToYourPost = ({imgPopup,setImgPopupt}) => {
  return (
    <div>
        <div className='border border-title_color rounded-md px-4 py-3 flex items-center justify-between'>
           <h4 className='font-gilroyBold text-base text-black'>Add To Your Post</h4>
           <div className='flex items-center gap-x-7 text-black'>
              <div onClick={()=> setImgPopupt(true)} className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all ease-linear duration-100 cursor-pointer ${imgPopup && "bg-black text-white"}`}>
                 <Media/>
              </div>
              <div className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-hober_clr transition-all ease-linear duration-100 cursor-pointer'>
                 <Feeling/>
              </div>
              <div className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-hober_clr transition-all ease-linear duration-100 cursor-pointer'>
                 <Friends/>
              </div>
           </div>
        </div>
    </div>
  )
}

export default PostAddToYourPost