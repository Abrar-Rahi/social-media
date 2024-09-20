import React from 'react'
import { Link } from 'react-router-dom'
import textReduce from '../../../functions/textReduce'

const RightFriendPart = () => {
    const fullName = "Abrar Bin Enayet rahi"
    const reduceName = textReduce(fullName, 21)
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-gilroyBold text-title_color text-xl">Friend Request</h3>
                <Link
                    to="/friend"
                    className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-black transition duration-300 ease-out border border-black rounded-full group"
                >
                    <span className="absolute inset-0 w-full h-full bg-black transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0"></span>
                    <span className="absolute inset-0 w-full h-full border border-black rounded-full"></span>
                    <span className="relative text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        See All
                    </span>
                </Link>
            </div>


            <div className='flex flex-col gap-y-4'>

                <div className='flex xl:flex-col xl:gap-2 2xl:flex-row items-center gap-x-4 p-2.5 bg-hober_clr rounded-lg shadow-md '>
                    <div className='w-14 h-14 bg-secondary_color rounded-full flex items-center justify-center'>
                        <span className='text-white font-gilroyBold text-lg'>A</span>
                    </div>
                    <div className='flex-1'>
                        <h3 className='font-gilroyMedium text-title_color text-lg'>{reduceName}</h3>
                        <p className='font-gilroyNormal text-sm text-secondary_color'>1 hour ago</p>
                    </div>
                    <div className='flex 2xl:flex-col items-center gap-2'>
                        <button className='px-4 py-1.5 bg-green rounded-full text-white font-gilroyMedium text-base hover:bg-green1  transition-all ease-linear duration-150'>
                            Confirm
                        </button>
                        <button className='px-4 py-1.5 bg-red rounded-full text-white font-gilroyMedium text-base hover:bg-red1 transition-all ease-linear duration-150'>
                            Delete
                        </button>
                    </div>
                </div>
                
                <div className='flex xl:flex-col xl:gap-2 2xl:flex-row items-center gap-x-4 p-2.5 bg-hober_clr rounded-lg shadow-md '>
                    <div className='w-14 h-14 bg-secondary_color rounded-full flex items-center justify-center'>
                        <span className='text-white font-gilroyBold text-lg'>A</span>
                    </div>
                    <div className='flex-1'>
                        <h3 className='font-gilroyMedium text-title_color text-lg'>{reduceName}</h3>
                        <p className='font-gilroyNormal text-sm text-secondary_color'>1 hour ago</p>
                    </div>
                    <div className='flex 2xl:flex-col items-center gap-2'>
                        <button className='px-4 py-1.5 bg-green rounded-full text-white font-gilroyMedium text-base hover:bg-green1  transition-all ease-linear duration-150'>
                            Confirm
                        </button>
                        <button className='px-4 py-1.5 bg-red rounded-full text-white font-gilroyMedium text-base hover:bg-red1 transition-all ease-linear duration-150'>
                            Delete
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RightFriendPart