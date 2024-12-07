import React, { useEffect, useRef, useState } from 'react'
import Feeling from '../../../svg/Feeling'
import EmojiPicker from 'emoji-picker-react'
import postbg from './postbg'


const PostEmojiPicker = ({ postText, setPostText, changePart, imgBackground, setImgBackground }) => {

    const [emojiPicker, setEmojiPicker] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const [bgOptionShow, setBgOptionShow] = useState(false)
    const textRef = useRef(null)
    const bgRef = useRef(null)

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

    let handleBackground = (index) => {
        bgRef.current.style.backgroundImage = `url(${postbg[index]})`
        setImgBackground(postbg[index])
        bgRef.current.classList.add("bgPost")
        textRef.current.focus()
    }
    let handleRemoveBackground = () => {
        bgRef.current.style.backgroundImage = ""
        setImgBackground("")
        bgRef.current.classList.remove("bgPost")
        textRef.current.focus()
    }
    return (
        <div className={`${changePart ? "flex  justify-between" : ""}`}>

            <div ref={bgRef} className={`${changePart ? 'w-11/12 min-h-24  mt-2 ' : 'min-h-24  mt-2'}`}>
                <textarea
                    onChange={(e) => setPostText(e.target.value)}
                    value={postText} ref={textRef}
                    placeholder="What's On Your Mind"
                    className="w-full outline-none resize-none p-3 font-gilroyNormal text-lg bg-transparent"
                    style={{
                        paddingTop: `${imgBackground ? Math.abs(textRef.current.value.length * 0.1 - 25) : "0"}%`
                    }}
                ></textarea>
            </div>

            {changePart ?
                <div className=''>

                    <div className=' relative'>
                        <div onClick={() => setEmojiPicker((prev) => !prev)} className='cursor-pointer'>
                            <Feeling />
                        </div>
                        <div className='absolute top-7 -right-48 z-10 '>
                            {emojiPicker && <EmojiPicker onEmojiClick={handleEmoji} />}
                        </div>
                    </div>
                </div>
                :
                <>

                    <div className='flex items-center justify-between my-3 px-2'>
                        <div className='flex items-center gap-1 flex-wrap'>
                            <div onClick={() => setBgOptionShow((prev) => !prev)} className='w-6 h-6 sm:w-9 sm:h-9 bg-gradient-to-r from-red via-blue to-green font-gilroySemiBold text-xs sm:text-base text-white rounded-md flex items-center justify-center cursor-pointer'>Pp</div>
                            {bgOptionShow &&
                                <>
                                    <div onClick={() => handleRemoveBackground()} className='w-6 h-6 sm:w-9 sm:h-9 rounded-md cursor-pointer bg-hober_clr'></div>
                                    {postbg.map((item, index) => (
                                        <img onClick={() => handleBackground(index)} className='w-6 h-6 sm:w-9 sm:h-9 rounded-md cursor-pointer' key={index} src={item} alt="post bg" />
                                    ))}
                                </>
                            }

                        </div>

                        <div className=' relative'>
                            <div onClick={() => setEmojiPicker((prev) => !prev)} className='cursor-pointer'>
                                <Feeling />
                            </div>
                            <div className='absolute bottom-7 -right-6 xl:-right-48'>
                                {emojiPicker && <EmojiPicker onEmojiClick={handleEmoji} />}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default PostEmojiPicker