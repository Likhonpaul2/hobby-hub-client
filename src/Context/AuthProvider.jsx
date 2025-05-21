import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup,signOut, updateProfile} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


// create google provider for pop up sign in 
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading]= useState(true);


    // sign in with google 
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // email and password sign in 
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // signout 
    const signOutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    // reset password 
    const resetPasswordEmail = (email)=>{
        setLoading(true);
        return sendPasswordResetEmail(auth,email)
    }

    // update user profile 
    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL });
    }

    // holding user state 
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        signOutUser,
        resetPasswordEmail,
        updateUserProfile
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;