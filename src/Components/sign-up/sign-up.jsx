import React, { useState} from "react";
import { auth, createUserProfileDocument} from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import {useNavigate} from "react-router-dom"
import './sign-up.css';
import blue from "../icon/blue.png" ;

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
       <div className="container-signup">
       <div className="sign-up">
       <div className='logo-container'>
            <img src={blue} alt='logo' className='logo-image' />
            </div>

            <h2 className="signup-title">إنشاء <span className="span-color"> حساب</span> </h2>
            
           
            <form className="sign-up-form" onSubmit={handleSubmit}>

                <label className="form-input-label">الاسم</label>
                <input type="name"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    className="form-input-signup"
                    pattern="[A-Za-z\u0621-\u064A ]+"  // This pattern allows English and Arabic letters and spaces
    title="Please enter letters only."
                    required
                />
<br/>
<label className="form-input-label">المدينة</label>
<input type="text"
    name="city"
    value={city}
    onChange={handleChange}
    className="form-input-signup"
    pattern="[A-Za-z\u0621-\u064A ]+"  // This pattern allows English and Arabic letters and spaces
    title="Please enter letters only."
    required
/>
<br/>
                <label className="form-input-label">البريد الالكتروني</label>
                <input type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
<br/>
                <label className="form-input-label">كلمة المرور</label>
                <input type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
<br/>
                <label className="form-input-label">تأكيد كلمة المرور</label>
                <input type="password"
                    name="confirmPassword"
                    value={confirmedPassword}
                    onChange={handleChange}
                    className="form-input-signup"
                    required
                />
                <button type="submit" className="signup-button">تسجيل</button>
            </form>
            
        </div>
        </div>
    );
}

export default SignUp;
