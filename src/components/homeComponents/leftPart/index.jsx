import React from 'react'
import LeftProfile from './LeftProfile'
import LeftOtherData from './LeftOtherData'
import { LeftData } from './Data'

const LeftPart = () => {
    return (
        <>
            <div>
                <LeftProfile />
            </div>
            <div className='mt-10'>
                {LeftData.map((item, index) => (

                    <LeftOtherData key={index} data={item} />
                ))}

            </div>
        </>
    )
}

export default LeftPart