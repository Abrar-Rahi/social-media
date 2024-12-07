import React, { useState } from 'react'
import { PlusCircle } from '../../../svg/PlusCircle'
import EditBio from './EditBio'
import { EditPost } from '../../../svg/EditPost'

const Details = ({ text ,placeholder,value, icon, info, handleChange, handleUpdateInfos, loading, name,relation }) => {
    const [show,setShow]=useState(false)
    const Icon = ()=>{
        return icon
    }
    return (
        <div>
           
            <div className=''>
                {value ? 
                <div className='flex items-center justify-between'>
                    <div  className='flex items-center gap-x-1 '>
                    <div className='text-secondary_color '>
                        <Icon />
                    </div>
                    <p className='font-gilroyMedium text-secondary_color '>{value}</p>
                </div>
                    <div onClick={()=>setShow(true)} className='text-secondary_color cursor-pointer'>
                    <EditPost/>
                    </div>
                </div>
            :
            
                <div onClick={()=>setShow(true)} className='flex items-center gap-x-1 '>
                    <div className='text-secondary_color cursor-pointer'>
                        <PlusCircle />
                    </div>
                    <p className='font-gilroyMedium text-secondary_color cursor-pointer'>Edit {text}</p>
                </div>
            }
                {show && 
                <div>
                    <EditBio placeholder={placeholder}  setShow={setShow} info={info} handleChange={handleChange} handleUpdateInfos={handleUpdateInfos} loading={loading} name={name} detail relation={relation}/>
                </div>
                }
            </div>
        </div>
    )
}

export default Details