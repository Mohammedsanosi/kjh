import React, { useState ,useEffect  } from "react";
import { auth, createUserProfileDocument ,handleGoogleSignIn } from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import {useNavigate} from "react-router-dom"
import './sign-up.css';

const SignUp = () => {

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [city, setCity] = useState('');
   const navigate =useNavigate() ;
    
   


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmedPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await createUserProfileDocument(user, { displayName, city });
          
            // Reset form fields
            setDisplayName('');
            setEmail('');
            setPassword('');
            setConfirmedPassword('');
            setCity('');
            navigate('/')
        } catch (error) {
            alert(error,"error");
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmedPassword(value);
                break;
            case 'displayName':
                setDisplayName(value);
                break;
            case 'city':
                setCity(value);
                break;
            default:
                break;
        }
    }

    return (
       <div className="container">
       <div className="sign-up">
            <h2 className="Title">I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className="sign-up-form" onSubmit={handleSubmit}>

                <label className="label">الاسم</label>
                <input type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
<br/>
                <label className="label">المدينة</label>
                <input type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
<br/>
                <label className="label">البريد الالكتروني</label>
                <input type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
<br/>
                <label className="label">كلمة المرور</label>
                <input type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
<br/>
                <label className="label">تأكيد كلمة المرور</label>
                <input type="password"
                    name="confirmPassword"
                    value={confirmedPassword}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
                <input type="submit" />
            </form>
            
        </div>
        </div>
    );
}

export default SignUp;
