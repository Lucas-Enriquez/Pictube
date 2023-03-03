'use client'
import { useSession } from "next-auth/react"

import { signIn } from "next-auth/react";
import loginPageStyles from './login-page.module.scss'
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle, VscLoading } from "../../utils";


const Login = () => {
  const {status} = useSession();

  const router = useRouter()


  const responseGoogle = () => {
    signIn("google", {callbackUrl: '/'})
  }

  useEffect(() => {
    if(status === 'authenticated') {
      router.push('/')
    }
  }, [status])
  
  return (
    <>
      <div className={loginPageStyles.loginContainer}>
        <div className={loginPageStyles.backgroundVideoContainer}>
        <video autoPlay loop controls={false} muted src="./assets/pictube.mp4" className={loginPageStyles.backgroundVideo} />
        </div>
        <div className={loginPageStyles.backgroundOverlay}>
          <div className={loginPageStyles.logoContainer}>
            <Image width="100" height="100" className={loginPageStyles.logo} src="/assets/logo1.png" alt="pictube logo"/>
            { status === 'loading' || status === 'authenticated' ? (
              <VscLoading size={"20px"} className="spinnerAnimation"/>
            ) : 
              (<button className={loginPageStyles.googleButton} onClick={() => responseGoogle()}><FcGoogle/>Sign in with Google</button>)
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default Login