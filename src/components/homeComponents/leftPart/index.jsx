import React from 'react'
import LeftProfile from './LeftProfile'
import LeftOtherData from './LeftOtherData'
import { LeftData } from './Data'

const LeftPart = () => {
  return (
    <>
      <div className="fixed top-0 left-[40px] lg:w-[22%] xl:w-[22%] w-full max-w-lg mx-auto bg-white shadow-lg h-full rounded-lg p-6 flex flex-col items-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-y-3">
          <LeftProfile />
        </div>

        {/* Data Section */}
        <div className="mt-8">
          {LeftData.map((item, index) => (
            <LeftOtherData key={index} data={item} />
          ))}
        </div>
      </div>


    </>
  )
}

export default LeftPart