import React from 'react'
import LeftProfile from './LeftProfile'
import LeftOtherData from './LeftOtherData'
import { LeftData } from './Data'

const LeftPart = () => {
    return (
        <>
            <div className='flex flex-col gap-y-10'>
                <div>
                    <LeftProfile />
                </div>
                <div className='lg:mx-auto'>
                    {LeftData.map((item, index) => (

                        <LeftOtherData key={index} data={item} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default LeftPart