import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth,signInWithGoogle } from '../../firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onSignUpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          navigate('/');
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
        <div className='container'>
            <div className='signin'>
                <h2>I already have an account</h2>
                <div className='group'>
                    <form onSubmit={handleSubmit}>
                        <label className='form-input-label'>Email</label>
                        <input
                            name='email'
                            type='email'
                            value={email}
                            onChange={handleChange}
                            required
                            className='form-input'
                            autoComplete='current-email'
                        />
                        <label className='form-input-label'>Password</label>
                        <input
                            name='password'
                            type='password'
                            value={password}
                            onChange={handleChange}
                            required
                            className='form-input'
                            autoComplete='current-password'
                        />
                        <button type='submit'>Login</button>
                        <hr />
                        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
                        <button type='button' onClick={onSignUpClick}>I don't have an account</button>
                        <p>or <span onClick={goToSignUp}>Sign Up</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignIn;