import React from 'react'
import { Link } from 'react-router-dom'
import { useResetCodeMutation } from '../../features/api/authApi'
import { toast } from 'react-toastify'

const ResetPassword = ({userInfo,setSuccess,success,setError,error,setVisible,setLoading}) => {

    const [resetCode] = useResetCodeMutation()

    const handleResetCodeSent = async ()=>{
      try {
        const result = await resetCode(userInfo.email).unwrap()
        setLoading(true)
        setSuccess(result.message);
        setError("")
        toast.success("jdlkjashdlkjhd")
        setTimeout(()=>{
          setVisible(2)
          setSuccess("")
        },3000)

      } catch (error) {
        setError(error.data.message);
      }
      
      
    }

  return (
    <div className='w-auto h-auto px-20 py-10 bg-white rounded-lg shadow-lg'>
                    <h3 className='font-gilroySemiBold text-xl text-black'>Reset Password</h3>
                    <div className='w-full h-[1px] bg-hober_clr my-3'></div>
                    <p className='font-gilroyNormal text-sm text-black w-80'>How Do You Want To Receive The Code To Reset Your Password?</p>

                    <div className='w-12 h-12 bg-red rounded-full mx-auto mt-5 mb-2 overflow-hidden'>
                      <img src={userInfo.profilePicture} className='w-full h-full object-cover' alt="profilePicture" />
                    </div>

                    <div className='flex items-center justify-center gap-3'>
                    <input type="radio" defaultChecked={true} />
                    <p className='font-gilroyMedium text-lg'>{userInfo.email}</p>
                    </div>

                    {success && <p className='mx-auto font-gilroyNormal text-sm text-green my-3'>{success}</p>}

                    {error && <p className='mx-auto font-gilroyNormal text-sm text-red my-3'>{error}</p>}

                    <div className='flex items-center justify-center gap-x-3 mt-5'>
                        <Link className='px-4 py-2 bg-black text-white rounded-lg font-gilroyMedium text-base' to={"/login"}>Not You?</Link>

                        <button onClick={handleResetCodeSent} className='px-4 py-2 bg-primary_color rounded-lg font-gilroyMedium text-base text-white'>Continue</button>
                    </div>
                   
                </div>
  )
}

export default ResetPassword