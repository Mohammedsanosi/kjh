import React, { useEffect, useState } from "react";
import {  onSnapshot } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import Homepage from "./homepage/homepage.component";
import SignIn from "./Components/sign-in/sign-in";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import Header from "./Components/header/Header";
import SignUp from "./Components/sign-up/sign-up";
import Details from "./Components/reservation/details";
import Reserv from "./Components/reservation/reserv";
import Invoice from "./Components/reservation/Invoce";
import MyAccount from './Components/my-account/myaccount'



const App = () => {
 const [CurrentUser, setCurrentUser] = useState(null);
 const [isLoggedIn, setIsloggedIn] = useState(false);
 const [isLoading, setIsloading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userDocRef = await createUserProfileDocument(user);
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
          if (snapshot.exists() && !isLoggedIn) {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            });
            setIsloggedIn(true);
            navigate('/');
          }
        });
        setIsloading(false)
        return () => unsubscribe();
      } else {
        setCurrentUser(null);
        setIsloggedIn(false);
        setIsloading(false)
      }
      
    });
    return () => unsubscribeFromAuth();
 }, [navigate]);

const PrivateRoutes = () => isLoggedIn ? <Outlet/> : <Navigate to="/signin"/>


return(
  <div>
  <Header CurrentUser={CurrentUser} />
  {isLoading ? "Loading ..." : <Routes>
      <Route path="/signin" element={<SignIn  />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/details" element={<Details />} exact/>
          <Route path="/reserv" element={<Reserv />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/my-account" element={<MyAccount CurrentUser={CurrentUser} />} />
          
        
      </Route>
      
  </Routes>}
  </div>
)
}

export default App ;