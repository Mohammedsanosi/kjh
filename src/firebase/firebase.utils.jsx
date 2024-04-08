import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyBRMPf0o1mhMtbQM6rpG4_5GrM68gWb9_U",
    authDomain: "hotels-ly.firebaseapp.com",
    projectId: "hotels-ly",
    storageBucket: "hotels-ly.appspot.com",
    messagingSenderId: "253693016231",
    appId: "1:253693016231:web:f9f8d95640cd31c33a4382",
    measurementId: "G-MC71RDVFKQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', userAuth.uid);

    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.error('Error creating user document', error.message);
        }
    }

    return userDocRef;
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
};

export default app;



// import React, { useEffect, useState } from "react";
// import {  onSnapshot } from 'firebase/firestore';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./App.css";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Homepage from "./homepage/homepage.component";
// import Reserv from "./Components/reservation/reservation";
// import SignIn from "./Components/sign-in/sign-in";
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
// import Header from "./Components/header/Header";
// import SignUp from "./Components/sign-up/sign-up";

// const App = () => {
//  const [CurrentUser, setCurrentUser] = useState(null);
//  const [isLoggedIn, setIsloggedIn] = useState(false);
//  const [showSignUp, setShowSignUp] = useState(false);
//  const navigate = useNavigate();

//  useEffect(() => {
//     const unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
//       if (user) {
//         const userDocRef = await createUserProfileDocument(user);
//         const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
//           if (snapshot.exists()) {
//             setCurrentUser({
//               id: snapshot.id,
//               ...snapshot.data(),
//             });
//             setIsloggedIn(true);
//             navigate('/');
//           }
//         });
//         return () => unsubscribe();
//       } else {
//         setCurrentUser(null);
//         setIsloggedIn(false);
//         navigate('/signin')
        
//       }
     
//     });
//     return () => unsubscribeFromAuth();
//  }, [navigate]);

//  useEffect(() => {
//   if (showSignUp) {
//       navigate('/signup');
//   }
// }, [showSignUp, navigate]);



//  return (
//   <div>
//   {!isLoggedIn ? (
//     <Routes>
//           {showSignUp ? (
//             <Route path="/signup" element={<SignUp />} />
//           ) : (
//             <Route path="/signin" element={<SignIn onSignUpClick={() => setShowSignUp(true)}/>} />
//           )}
//         </Routes>
//   ) : (
//   <div>
//       <Header CurrentUser={CurrentUser} />
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/reserv" element={<Reserv />} />
//       </Routes>
//     </div>
//   )}
// </div>
//  );
// };

// export default App;