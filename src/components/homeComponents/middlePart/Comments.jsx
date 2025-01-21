import React from 'react';
import avatarImage from '../../../assets/defaultImage/avatar.png';
import TimeAgo from './TimeAgo';

const Comments = ({ comment }) => {

  return (
    <div className="my-4">
      <div className="flex gap-x-3 items-start">
        {/* User Avatar */}
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img
            src={comment.commentedBy.profilePicture || avatarImage}
            alt={`${comment.commentedBy.userName}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <div className="bg-input_color px-4 py-2 rounded-lg">
            <h4 className="text-sm font-gilroyBold text-black font-medium">
              {comment.commentedBy.userName}
            </h4>
            <p className="text-base font-gilroyNormal text-black mt-1 mb-2">
              {comment?.comment}
            </p>
            {comment?.image && (
              <img
                src={comment.image}
                alt="Comment attachment"
                className="w-full max-w-[250px] h-auto object-fill rounded-md mt-2"
              />
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center gap-x-3 ml-16 font-gilroyNormal mt-1 text-black'>
        <div className='text-sm font-gilroyNormal text-black'><TimeAgo timestamp={comment.commentedAt} /> </div>
        <div>like</div>
        <div>reple</div>
      </div>
    </div>
  );
};

export default Comments;
