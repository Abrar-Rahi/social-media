import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ForgotImg from '../../svg/ForgotImg'
import ForgotPassword from '../../components/resetPassword/FindPassword'
import ResetPassword from '../../components/resetPassword/ResetPassword'
import ResetCode from '../../components/resetPassword/ResetCode'
import NewPassword from '../../components/resetPassword/NewPassword'


const ForgetPassword = () => {

    const [visible, setVisible] = useState(0)
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()


    const renderComponent = () => {
        switch (visible) {
            case 0: return <ForgotPassword
                setLoading={setLoading}
                setError={setError}
                error={error}
                setUserInfo={setUserInfo}
                setVisible={setVisible}
            />

            case 1:
                if (userInfo) {
                    return <ResetPassword
                        userInfo={userInfo}
                        setSuccess={setSuccess}
                        success={success}
                        setError={setError}
                        error={error}
                        setVisible={setVisible}
                        setLoading={setLoading}
                    />
                }
                setVisible(0)
                return null
            case 2:
                if (userInfo) {
                    return <ResetCode
                        userInfo={userInfo}
                        setSuccess={setSuccess}
                        success={success}
                        setError={setError}
                        error={error}
                        setVisible={setVisible}
                        setLoading={setLoading} />
                }
                setVisible(0)
                return null
            case 3:
                if (userInfo) {
                    return <NewPassword
                        userInfo={userInfo}
                        setSuccess={setSuccess}
                        success={success}
                        setError={setError}
                        error={error}
                        setVisible={setVisible}
                        setLoading={setLoading} />
                }
                setVisible(0)
                return null


            default: return null

        }
    }

    return (
        <>
            <Helmet>
                <title>Forget Password</title>
            </Helmet>
            <div className='w-full h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-cyan-100 flex  items-center justify-center '>
                <div className='hidden lg:block'>
                    <ForgotImg />
                </div>
                {renderComponent()}
            </div>
        </>
    )
}

export default ForgetPassword