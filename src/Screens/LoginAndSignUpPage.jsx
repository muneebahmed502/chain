import React, { useState } from 'react';
import './LoginAndSignUpPage.css';
import {useNavigate } from "react-router-dom"
import { Registered } from '../Config/firebase';
import { login } from '../Config/firebase';

const LoginAndSignUpPage = () => {
    const navigate = useNavigate()
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpName,setSignUpName] = useState('')
  const [signUpEmail,setSignUpEmail] = useState('')
  const [signUpPassword,setSignUpPassword] = useState('')
  const [signInEmail,setSignInEmail] = useState('')
  const [signInPassword,setSignInPassword] = useState('')

  const toggleForm = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  async function signup() {
    try {
        if ( !signUpName ||!signUpEmail || !signUpPassword ){
            alert('please  fill all the inputs!')
        return
        }
        await Registered({signUpName,signUpEmail,signUpPassword})
        
        // navigate('/login')
       } catch(e) {
        alert(e.message)
       }
  }

  async function signin(){
    try{
      if ( !signInEmail || !signInPassword ){
        alert('please  fill all the inputs!')
    return
    }
    await login({signInEmail,signInPassword})
     // Check if the logged-in user is an admin
     if (signInEmail === 'admin@gmail.com' && signInPassword === 'admin123') {
        navigate('/AdminDashboard');  // Redirect to Admin Dashboard
      } else {
        navigate('/');  // Redirect to the Home page (or user dashboard)
      }
    } catch(e){
      alert(e.message)
    }
  }



  return (
    <div className="main">
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        {/* Sign Up Form */}
        <div className="signUp">
          <form>
            <h1>Create Account</h1>
            <input value={signUpName} onChange={(e) => setSignUpName(e.target.value)} type="text" placeholder="Enter Your Name" />
            <input value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} type="email" placeholder="Enter Your Email" />
            <input value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} type="password" placeholder="Enter Your Password" />
            <button onClick={signup} type="button">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="signIn">
          <form>
            <h1>Sign In</h1>
            <input value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} type="email" placeholder="Enter Your Email" />
            <input value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} type="password" placeholder="Enter Your Password" />
            <button onClick={signin} type="button">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-Container">
          <div className="overlay">
            <div className="overlay-Left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button onClick={toggleForm} className="sign-In">
                Sign In
              </button>
            </div>
            <div className="overlay-Right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button onClick={toggleForm} className="sign-Up">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignUpPage;
