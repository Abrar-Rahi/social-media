import React, { useRef } from 'react'
import OutSideClick from '../../../functions/click'
import MenuItem from './MenuItem'
import { EditPost } from '../../../svg/EditPost'
import { PinPost } from '../../../svg/PinPost'
import { SavePost } from '../../../svg/SavePost'
import { Download } from '../../../svg/Download'
import { EnterFullScreen } from '../../../svg/EnterFullScreen'
import { Trash } from '../../../svg/Trash'
import { useSavePostsMutation } from '../../../features/api/authApi'

const PostMenu = ({ setShowMenu, postUserId, userId, postImeges, postId, saveCheckPost, setSaveCheckPost  }) => {

  const menuRef = useRef(null)
  const [SavePosts] = useSavePostsMutation()

  OutSideClick(menuRef, () => {
    setShowMenu(false)
  })

  const handleSavePost = ()=>{
    SavePosts(postId)
    if(saveCheckPost){
      setSaveCheckPost(false)
    }else{
      setSaveCheckPost(false)
    }
  }

  return (
    <div>
      <div ref={menuRef} className='absolute top-10 right-2 w-[200px] sm:w-[300px] bg-white shadow-md px-3 py-5 z-10 '>
        {postUserId === userId &&
          <>
            <MenuItem icon={PinPost} title='Pin Post' />
            <MenuItem icon={EditPost} title='Edit Post' />
          </>
        }
        <div onClick={handleSavePost}>
          {saveCheckPost ?
          <MenuItem icon={SavePost} title='UnSave Post' />
          :
          <MenuItem icon={SavePost} title='Save Post' />
          }
        </div>
        {postImeges && postImeges.length &&
          <>
            <MenuItem icon={Download} title='Download' />
            <MenuItem icon={EnterFullScreen} title='Enter Full Screen' />
          </>
        }
        {postUserId === userId && <MenuItem icon={Trash} title='Remove post' />}

      </div>
    </div>
  )
}

export default PostMenu