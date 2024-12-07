import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftPart from './homeComponents/leftPart'
import MiddleHeader from './homeComponents/middlePart/MiddleHeader'
import RightPart from './homeComponents/rightPart'

const RootLayout = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-[1fr,3fr] xl:grid-cols-[1fr,2fr,1fr] gap-5 pt-7 lg:pt-10 px-5 lg:px-10'>
            <div className='hidden lg:block'>
                <LeftPart />
            </div>

            <div>
                <div className='sticky top-0 left-0 z-50'>
                  <MiddleHeader />
                </div>

                <Outlet />
            </div>
            <div className='hidden xl:block'> <RightPart /> </div>
        </div>
    )
}

export default RootLayout