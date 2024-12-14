import React, { useRef } from 'react'
import OutSideClick from '../../../functions/click'
import MenuItem from './MenuItem'
import { EditPost } from '../../../svg/EditPost'
import { PinPost } from '../../../svg/PinPost'
import { SavePost } from '../../../svg/SavePost'
import { Download } from '../../../svg/Download'
import { EnterFullScreen } from '../../../svg/EnterFullScreen'
import { Trash } from '../../../svg/Trash'

const PostMenu = ({setShowMenu,postId,userId,postImeges}) => {
    const menuRef = useRef(null)
    OutSideClick(menuRef, ()=>{
        setShowMenu(false) 
    })
  return (
    <div>
        <div ref={menuRef} className='absolute top-10 right-2 w-[200px] sm:w-[300px] bg-white shadow-md px-3 py-5 z-10 '>
            {postId === userId &&
            <>
            <MenuItem icon={PinPost} title='Pin Post'/> 
            <MenuItem icon={EditPost} title='Edit Post'/>
            </>
            } 
            <MenuItem icon={SavePost} title='Save Post'/> 
            {postImeges && postImeges.length &&
            <>
            <MenuItem icon={Download} title='Download'/> 
            <MenuItem icon={EnterFullScreen} title='Enter Full Screen'/> 
            </>
            }
            {postId === userId && <MenuItem icon={Trash} title='Remove post'/>}
             
        </div>
    </div>
  )
}

export default PostMenu