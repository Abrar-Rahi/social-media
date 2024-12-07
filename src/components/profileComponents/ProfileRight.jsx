import React, { useState } from 'react'
import MiddlePart from '../homeComponents/middlePart'
import ProfilePostView from './ProfilePostView'
import ShowPost from '../homeComponents/middlePart/ShowPost';
import ShowPostGridMode from '../homeComponents/middlePart/ShowPostGridMode';

const ProfileRight = ({ posts, setPostVisible, profile ,profileVisitor}) => {
    const [viewMode, setViewMode] = useState('list');
    return (
        <div>
            {profileVisitor ? "" : 
            <div className='mb-5'>
                <MiddlePart setPostVisible={setPostVisible} posts={posts} />
            </div>
            }
            <div>
                <ProfilePostView viewMode={viewMode} setViewMode={setViewMode} profile={profile} />
            </div>
            {viewMode === 'list' ?
                <div>
                    {profile?.wonPost && profile?.wonPost?.length ?

                        <div className='mt-5'>
                            {profile?.wonPost?.map((item) => (
                                <ShowPost key={item._id} post={item} />
                            ))}
                        </div>
                        :
                        <h2 className='font-gilroySemiBold text-xl text-center my-5'>There is No Post Available</h2>
                    }
                </div>
                :
                <div>
                    {profile?.wonPost && profile?.wonPost?.length ?
                        <div className='mt-5 flex flex-wrap gap-y-8 items-center justify-between bg-white p-2 rounded-md'>
                            {profile?.wonPost?.map((item) => (
                                <ShowPostGridMode key={item._id} post={item} />
                            ))}
                        </div>
                        :
                        <h2 className='font-gilroySemiBold text-xl text-center my-5'>There is No Post Available</h2>
                    }
                </div>
            }

        </div>
    )
}

export default ProfileRight