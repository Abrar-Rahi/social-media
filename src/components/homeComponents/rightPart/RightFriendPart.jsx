import React from 'react'
import { Link } from 'react-router-dom'
import textReduce from '../../../functions/textReduce'

const RightFriendPart = () => {
    const fullName = "Abrar Bin Enayet rahi"
    const reduceName = textReduce(fullName,21)
    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h3 className='font-gilroyBold text-xl'>Friend Request</h3>
                <Link to={"/friend"} className='px-6 py-1.5 border border-black rounded-full hover:bg-black hover:text-white ease-linear transition-all duration-100 font-semibold text-base'>See All</Link>
            </div>

            <div className='flex flex-col gap-y-4'>

            <div className='flex items-center gap-x-2'>
                <div className='w-12 h-12 bg-secondary_color rounded-full'></div>
                <div className='w-40'>
                    <h3 className='font-gilroyMedium text-base'>{reduceName}</h3>
                    <p className='font-gilroyNormal text-sm text-secondary_color'>1 hour ago</p>
                </div>
                <div className='flex items-center gap-2 ml-auto'>
                    <button className='px-4 py-1.5 bg-black rounded-full font-gilroyMedium text-base text-white'>Confirm</button>
                    <button className='px-4 py-1.5 bg-red rounded-full font-gilroyMedium text-base text-white'>Delete</button>
                </div>
            </div>
            <div className='flex items-center gap-x-2'>
                <div className='w-12 h-12 bg-secondary_color rounded-full'></div>
                <div className='w-40'>
                    <h3 className='font-gilroyMedium text-base'>{reduceName}</h3>
                    <p className='font-gilroyNormal text-sm text-secondary_color'>1 hour ago</p>
                </div>
                <div className='flex items-center gap-2 ml-auto'>
                    <button className='px-4 py-1.5 bg-black rounded-full font-gilroyMedium text-base text-white'>Confirm</button>
                    <button className='px-4 py-1.5 bg-red rounded-full font-gilroyMedium text-base text-white'>Delete</button>
                </div>
            </div>
            </div>

        </div>
    )
}

export default RightFriendPart