import React, { useEffect, useRef, useState } from 'react'
import { SearchIcon } from '../../../svg/SearchIcon'

const SearchBox = () => {
    let inputBox = useRef(null)
    let [iconView,setIconView] = useState(true)

    useEffect(() => {
        inputBox.current.focus()
    },[])
    return (
        <div className='max-h-[70vh] min-h-[400px] box-border bg-white  w-auto shadow-xl rounded-sm '>
            <div className='flex items-center gap-1  border border-secondary_color  py-2 px-4 rounded-full'>
                {iconView &&
                <div onClick={ ()=> inputBox.current.focus()} className='text-secondary_color cursor-pointer'> <SearchIcon /> </div>
                }
                <div>
                    <input ref={inputBox}  type="text" placeholder='Search' className='focus:outline-none font-gilroyNormal' onFocus={()=> setIconView(false)} onBlur={()=> setIconView(true)} />
                </div>
            </div>
            <h3>Recent Searches</h3>
        </div>
    )
}

export default SearchBox