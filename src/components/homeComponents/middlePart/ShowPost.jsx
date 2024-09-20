import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import profileImg from "../../../assets/defaultImage/avatar.png"
import { formatDistance, subDays } from 'date-fns'
import { Dot } from '../../../svg/Dots';
import { Like } from '../../../svg/Like';
import { Comment } from '../../../svg/Comment';
import { Share } from '../../../svg/Share';
import Reacts from './emojiForLikeButton/Reacts';
import { useSelector } from 'react-redux';
import Feeling from '../../../svg/Feeling';
import { Media } from '../../../svg/Media';
import EmojiPicker from 'emoji-picker-react';
import { Cross } from '../../../svg/Cross';

const ShowPost = ({ post }) => {
    const userInfo = useSelector((state) => state.registration.userInfo)

    const [showEmojis, setShowEmojis] = useState(false); //for react button
    const [emojiPicker, setEmojiPicker] = useState(false); //for imojiPicker components Implement 
    const [cursorPosition, setCursorPosition] = useState("")
    const [commentText, setCommentText] = useState("")
    const [commentImage, setCommentImage] = useState("")
    const [commentImgError, setCommentImgError] = useState("")

    const textRef = useRef(null) //for comment box input focus
    const emojiPickerRef = useRef(null);
    const fileRef = useRef(null) // for comment image

    const handleEmoji = ({ emoji }, e) => {
        // e.stopPropagation();
        textRef.current.focus();
        const cursorPos = textRef.current.selectionStart ?? 0;
        const start = commentText.substring(0, cursorPos);
        const end = commentText.substring(cursorPos);
        const finalText = start + emoji + end;
        setCommentText(finalText);
        setCursorPosition(start.length + emoji.length);
    };

    // Set the cursor position after emoji is inserted
    useEffect(() => {
        if (textRef.current && cursorPosition !== undefined) {
            textRef.current.selectionEnd = cursorPosition;
        }
    }, [cursorPosition]);

    // Close the emoji picker if a click happens outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) && !event.target.closest(".emoji-btn")) {
                setEmojiPicker(false); // Close the picker if clicked outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleImage = (e) => {
        const img = e.target.files[0]
        if (img.type !== "image/jpeg" &&
            img.type !== "image/jpg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp" &&
            img.type !== "image/gip") {
            setCommentImgError("select wrong image file");
            return
        } else if (img.size > 1024 * 1024 * 5) {
            setCommentImgError("file size is too large. please select a photo under 5 mb");
            return
        }
        const renderFiles = new FileReader()
        renderFiles.readAsDataURL(img)
        renderFiles.onload = (finishedRead) => {
            setCommentImage(finishedRead.target.result)
        }

    }
    console.log(commentImage);

    if (!post || !post.user) {
        return null; // or render some fallback UI
    }


    return (

        <div className='w-full shadow-md rounded-md px-3 py-5 mb-5'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-3'>
                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                        <Link to={`/profile/${post.user.userName}`}>
                            <img
                                className='w-full h-full object-cover'
                                src={post.user.profilePicture || profileImg}
                                alt="profileImg" />
                        </Link>
                    </div>
                    <div>
                        <h4 className='font-gilroyMedium text-base '>{post.user.userName}</h4>
                        <p className='font-gilroyNormal text-sm text-secondary_color'>{formatDistance(post.createdAt, new Date())}</p>
                    </div>
                </div>
                <div className='text-blue cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-hober_clr ease-linear transition-all duration-100'>
                    <Dot />
                </div>
            </div>
            <>
                {post.background ?
                    <div className='h-[350px] flex items-center justify-center mt-5 overflow-y-scroll px-5 pb-5'
                        style={{
                            backgroundImage: `url(${post.background})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                        <h4 className='font-gilroyMedium text-3xl text-white '>{post.text}</h4>
                    </div>
                    :
                    <h4 className='font-gilroyMedium text-xl text-black my-5'>{post.text}</h4>
                }
                {post.image && post.image.length &&
                    <>
                        <div className={`relative w-full h-full ${post.image.length === 2 ? "grid grid-cols-2 gap-2" : post.image.length === 3 ? "grid grid-cols-2 gap-2" : post.image.length === 4 ? "grid grid-cols-2 gap-2" : post.image.length >= 5 && "grid grid-cols-2 gap-2"}`}>
                            {post.image.slice(0, 4).map((item, index) => (
                                <img key={index} src={item.url} alt="postImage" className={`object-cover w-full h-full ${post.image.length === 3 ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3" : post.image.length === 4 && "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3"}`} />
                            ))}

                            {post.image.length >= 5 &&
                                <div className='absolute bottom-[100px] right-[150px] w-20 h-20 bg-white text-black rounded-full flex items-center justify-center'>
                                    <h5 className='font-gilroyBold text-5xl'>+{post.image.length - 4}</h5>
                                </div>
                            }
                        </div>
                    </>
                }
            </>

            <div className='text-end my-2 font-gilroyMedium mr-2'>
                <span>12 comments</span>
            </div>

            <div className="relative flex justify-around items-center bg-white text-text_color py-3  border-t border-b border-hober_clr mt-2">

                <button
                    onMouseEnter={() => setShowEmojis(true)}
                    onMouseLeave={() => setShowEmojis(false)}
                    className="flex items-center justify-center gap-x-2 px-4 py-2 hover:bg-hober_clr transition-colors duration-300 rounded-lg">
                    <span className="my-like-icon-class">
                        <Like />
                    </span>
                    <span className="font-gilroyMedium">Like</span>
                </button>

                <div
                    className={`absolute  left-3 -top-[42px] bg-transparent  transition-all duration-300 ${showEmojis ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                    onMouseEnter={() => setShowEmojis(true)}
                    onMouseLeave={() => setShowEmojis(false)}
                >
                    {/* Demo Emojis - Replace with your custom emojis */}
                    <span className="">
                        <Reacts />
                    </span>
                </div>

                <button onClick={() => textRef.current.focus()} className="flex items-center justify-center gap-x-2 px-4 py-2 hover:bg-hober_clr transition-colors duration-300 rounded-lg">
                    <span className="my-comment-icon-class">
                        <Comment />
                    </span>
                    <span className="font-gilroyMedium">Comment</span>
                </button>

                <button className="flex items-center justify-center gap-x-2 px-4 py-2 hover:bg-hober_clr transition-colors duration-300 rounded-lg">
                    <span className="my-share-icon-class">
                        <Share />
                    </span>
                    <span className="font-gilroyMedium">Share</span>
                </button>
            </div>

            <div className="relative flex items-center bg-white p-2 rounded-full  w-full border border-hober_clr">
                {/* Profile Picture */}
                <img
                    src={userInfo.profilePicture || profileImg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3"
                />

                {/* Input Field */}
                <input
                    type="file"
                    accept='image/jpeg,image/jpg,image/png,image/webp,image/gip'
                    ref={fileRef}
                    hidden
                    onChange={handleImage}
                />
                <input
                    ref={textRef}
                    type="text"
                    placeholder={`Comment as ${userInfo.userName}`}
                    className="bg-transparent w-full text-text_color font-gilroyNormal placeholder:text-text_color focus:outline-none"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}

                />

                {/* Icon Set */}
                <div className="flex items-center space-x-4">
                    {/* Replace with your own icons */}
                    <div
                        className="relative flex items-center justify-center w-8 h-8 text-xl bg-transparent hover:bg-hober_clr rounded-full transition-all duration-200 cursor-pointer emoji-btn"


                    >
                        <div onClick={() => setEmojiPicker((prev) => !prev)}>

                            <Feeling />
                        </div>

                        <div ref={emojiPickerRef} className='absolute bottom-11 right-0'>
                            {emojiPicker && <EmojiPicker onEmojiClick={handleEmoji} />}
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-center w-8 h-8 text-xl bg-transparent hover:bg-hober_clr rounded-full transition-all duration-200 cursor-pointer"
                        onClick={() => fileRef.current.click()}
                    >
                        <Media />

                    </div>

                </div>
                {commentImgError && <div className='postError bg-blur absolute top-2 left-0 z-10 flex items-center justify-center  '>
                <div className='font-gilroySemibold text-lg text-red w-[85%]'>{commentImgError}</div>
                <button onClick={() => setCommentImgError("")} className='px-4 py-2 bg-blue text-input_color font-gilroySemiBold text-base  rounded-full'>Try Again</button>

            </div>}
            </div>
            {commentImage &&
                <div className='relative w-36 h-36 mt-5 ml-2 rounded-sm overflow-hidden'>
                    <img className='w-full h-full object-cover' src={commentImage} alt="comment" />
                    <div onClick={() => setCommentImage("")} className='absolute top-1 right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blur hover:scale-110 transition-all duration-150 ease-in-out'>
                        <Cross />
                    </div>

                </div>
            }

        </div>

    )
}

export default ShowPost





