import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth,signInWithGoogle } from '../../firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';
import "./sign-in.css" ;
import blue from "../icon/blue.png" ;
import { FcGoogle } from "react-icons/fc";

const SignIn = ({ onSignUpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          
        } catch (error) {
          alert("Error signing in: " + error.message);
        }
     };

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                console.log("Email state updated to:", value); // Log email state update
                break;
            case 'password':
                setPassword(value);
                console.log("Password state updated to:", value); // Log password state update
                break;
            default : break;
        }
    };
    
    const handleGoogleSignIn = () => {
        signInWithGoogle();
    };
    const goToSignUp = () => {
        navigate('/signup');
     };
    
    return(
        <div className='container-login'>
            <div className='signin'>
            <div className='logo-container'>
            <img src={blue} alt='logo' className='logo-image' />
            </div>
            <h1 className='login-title'><span className='span-color'>تسجيل </span>دخول </h1>
                
                    <form onSubmit={handleSubmit}>
                        <label className='form-input-label'>البريد الإلكتروني</label>
                        <input
                            name='email'
                            type='email'
                            value={email}
                            onChange={handleChange}
                            required
                            className='form-input'
                            autoComplete='current-email'
                        />
                        <label className='form-input-label'>كلمة المرور</label>
                        <input
                            name='password'
                            type='password'
                            value={password}
                            onChange={handleChange}
                            required
                            className='form-input'
                            autoComplete='current-password'
                        />
                        <button type='submit' className='login-button'>تسجيل الدخول</button>
                        <hr />
                        <button onClick={handleGoogleSignIn} className="google-signin-button"> <FcGoogle className='google-signin-icon' />Sign In with Google</button>
                        <p  >I don't have an account  <span className='span' onClick={goToSignUp}>Sign Up</span></p>
                        
                    </form>
                </div>
            </div>
        
    )
};

export default SignIn;