import React, { useEffect, useRef, useState } from 'react'
import Feeling from '../../../svg/Feeling'
import EmojiPicker from 'emoji-picker-react'

const PostEmojiPicker = ({ postText, setPostText,changePart }) => {

    const [emojiPicker, setEmojiPicker] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const textRef = useRef(null)

    const handleEmoji = ({ emoji }) => {
        textRef.current.focus()
        const start = postText.substring(0, textRef.current.selectionStart)
        const end = postText.substring(textRef.current.selectionStart)
        const finalText = start + emoji + end
        setPostText(finalText)
        setCursorPosition(start.length + emoji.length)
    }

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition
    }, [cursorPosition])
    return (
        <>
        {changePart ?
        <div className='flex  justify-between'>
            <div className='w-11/12'>
                <textarea onChange={(e) => setPostText(e.target.value)} value={postText} ref={textRef} placeholder="What's On Your Mind" rows="3" className='w-full outline-none resize-none pt-3 font-gilroyNormal text-lg'></textarea>
            </div>
            <div className=' relative'>
                <div onClick={() => setEmojiPicker((prev) => !prev)} className='cursor-pointer'>
                    <Feeling />
                </div>
                <div className='absolute top-7 right-0 z-10'>
                    {emojiPicker && <EmojiPicker onEmojiClick={handleEmoji} />}
                </div>
            </div>
        </div>
        : 
        <>
            <div>
                <textarea onChange={(e) => setPostText(e.target.value)} value={postText} ref={textRef} placeholder="What's On Your Mind" rows="5" className='w-full outline-none resize-none pt-3 font-gilroyNormal text-lg'></textarea>
            </div>
            <div className='flex items-center justify-between my-3 px-2'>
                <div className='w-9 h-9 bg-gradient-to-r from-red via-blue to-green font-gilroySemiBold text-base text-white rounded-md flex items-center justify-center cursor-pointer'>Pp</div>

            <div className=' relative'>
                <div onClick={() => setEmojiPicker((prev) => !prev)} className='cursor-pointer'>
                    <Feeling />
                </div>
                <div className='absolute bottom-7 right-0'>
                    {emojiPicker && <EmojiPicker onEmojiClick={handleEmoji} />}
                </div>
            </div>
            </div>
        </>
        }
        </>
    )
}

export default PostEmojiPicker