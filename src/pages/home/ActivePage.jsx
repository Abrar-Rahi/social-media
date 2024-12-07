import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import LeftPart from '../../components/homeComponents/leftPart'
import MiddlePart from '../../components/homeComponents/middlePart'
import Activate from './Activate'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useVarifiedUserMutation } from '../../features/api/authApi'
import { logInUsers } from '../../features/users/userSlice'

const ActivePage = () => {
    const [varifiedUser] = useVarifiedUserMutation()
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState("")
    const [error,setError] = useState("")
    const {token} = useParams()
    const userInfo = useSelector((state)=> state.registration.userInfo)
    console.log(userInfo);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        activeUser()
    },[])
    
    const activeUser = async ()=>{
        try {
           setLoading(true) 
           let result = await varifiedUser({token, userToken: userInfo.token}).unwrap()
           setSuccess(result.message);
           setError("")
           localStorage.setItem("user", JSON.stringify({...userInfo, varified: true}))
           dispatch(logInUsers({...userInfo, varified: true}))
           setTimeout(()=>{
             setSuccess("")
              navigate("/")
           },3000)
        } catch (error) {
            setError(error.data.message);
            setLoading(false)
            setTimeout(()=>{
                navigate("/")
             },3000)
        }
    }
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {success && 
       <Activate type = "success" head="Account Activate Successfull" text={success} loading={loading}/>
      }
      {error && 
       <Activate type = "error" head="Account Activate Invalid" text={error} loading={loading}/>
      }
        <div>
          <MiddlePart/>
        </div>
      
    </>
  )
}

export default ActivePage