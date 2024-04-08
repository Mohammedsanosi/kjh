import React, { useEffect, useState } from "react";
import {  onSnapshot } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./homepage/homepage.component";
import Reserv from "./Components/reservation/reservation";
import SignIn from "./Components/sign-in/sign-in";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import Header from "./Components/header/Header";
import SignUp from "./Components/sign-up/sign-up";

const App = () => {
 const [CurrentUser, setCurrentUser] = useState(null);
 const [isLoggedIn, setIsloggedIn] = useState(false);
 const [showSignUp, setShowSignUp] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userDocRef = await createUserProfileDocument(user);
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists()) {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            });
            setIsloggedIn(true);
            navigate('/');
          }
        });
        return () => unsubscribe();
      } else {
        setCurrentUser(null);
        setIsloggedIn(false);
        navigate('/signin')
        
      }
     
    });
    return () => unsubscribeFromAuth();
 }, [navigate]);

 useEffect(() => {
  if (showSignUp) {
      navigate('/signup');
  }
}, [showSignUp, navigate]);



return(
  <div>
  <Header CurrentUser={CurrentUser} />
    <Routes>
      { !isLoggedIn ? (
        <Route path="/signin" element={<SignIn  />} />
      ) : (
        <Route path="/" element={<Homepage />} />
        
      )}
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </div>
)
}

export default App ;