import React from 'react'
import { Moon } from '../../../../svg/Moon'
import { BackIcon } from '../../../../svg/BackIcon'

const DisplayPopup = ({setDisplayPopup}) => {
    return (
        <div className='w-[200px] px-2.5 py-6 rounded-md shadow-md bg-white'>
            <div className='flex items-center mb-3'>
                <div onClick={()=> setDisplayPopup(false)} className='hover:text-secondary_color'>
                    <BackIcon />
                </div>
                <h3 className='font-gilroyBold text-lg'>Display Mood</h3>
            </div>
            <div className='flex gap-x-3'>
                <div className=' bg-input_color w-8 h-8 text-base rounded-full flex items-center justify-center'> <Moon /> </div>
                <div className='w-10/12'>
                    <h4 className='font-gilroySemiBold text-base'>Dark Mood</h4>
                    <p className='font-gilroyNormal text-sm text-secondary_color'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div className='font-gilroyMedium text-base flex flex-col  gap-y-3 ml-11 mt-2 '>
                <div className='flex items-center gap-x-6 bg-secondary_color text-white w-[85px] px-3 py-[6px] rounded-lg'>
                    <label htmlFor="dark" className='cursor-pointer'>ON</label>
                    <input type="radio" name="darkMood" id="dark" className='cursor-pointer' />
                </div>
                <div className='flex items-center gap-x-[18.5px] bg-input_color w-[85px] px-3 py-[6px] rounded-lg'>
                    <label htmlFor="white" className='cursor-pointer'>OFF</label>
                    <input type="radio" name="darkMood" id="white" className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default DisplayPopup