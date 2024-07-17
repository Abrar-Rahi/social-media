import React, { useState } from 'react'
import { useReVarificationMutation } from '../../features/api/authApi'

const ReAuth = ({userInfo}) => {
    const [reVarification] = useReVarificationMutation()
    const [success,setSuccess] = useState("")
    const [error,setError] = useState("")

    let resendEmailVarification = async ()=>{
        try {
            const result = await reVarification(userInfo.token).unwrap()
            setSuccess(result.message);
        } catch (error) {
            setError(error.data.message);
        }
    }

  return (
    <div>
        <div className='w-full p-4 mt-5 shadow-lg bg-hober_clr rounded-md'>
             <h5 className='font-gilroyNormal text-base'>Please Go to your Email and varify your Account. If you re send varify email please 
             <span onClick={resendEmailVarification} className='text-blue hover:underline cursor-pointer ml-1'>Click Here</span>
             </h5>
             {success && <p className='font-gilroyNormal text-base text-green'>{success}</p>}
             {error && <p className='font-gilroyNormal text-base text-red'>{error}</p>}
        </div>
    </div>
  )
}

export default ReAuth