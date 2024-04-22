import React from 'react';
import {auth,provider} from '../../firebase-config'
import '../Auth/Auth.css'
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie'




const cookies = new Cookies();

const Auth = (props) => {
    const {setIsAuth} = props;                // The destructuring assignment const {setIsAuth} = props; extracts the setIsAuth function from the props object and assigns it to a local constant variable named setIsAuth

  const signInWithGoogle = async ()=>{

    try {
      const result =  await signInWithPopup(auth,provider);
      cookies.set("auth-token" ,result.user.refreshToken);   // we want to user logged into the page even if he referesh it or leave the page 
      setIsAuth(true);
      console.log(result);            
      
    } catch (error) {
      console.log(error);
      
    }


  }


  return (
    <div className="auth-container">
      <p className="sign-in-text">Sign In with Google to continue</p>
      <button className="google-sign-in-btn" onClick={signInWithGoogle}>Sign In With Google </button>
    </div>
  )
} 

export default Auth ;