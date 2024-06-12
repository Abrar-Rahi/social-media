import React from 'react'

const LeftOtherData = ({ data }) => {

    const IconData = data.icon

    return (
        <div>
            <div className='flex items-center gap-x-2 mb-8 group hover:bg-black cursor-pointer px-6 py-3 rounded-full w-3/4 mx-auto transition-all ease-linear duration-300'>
                <div className='group-hover:text-white transition-all ease-linear duration-300'>
                    <IconData />
                </div>
                <div>
                    <p className='font-giloryMedium text-lg text-black group-hover:text-white transition-all ease-linear duration-300'>{data.title}</p>
                </div>
            </div>
        </div>
    )
}

export default LeftOtherData