import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init"
import { getAuth, createUserWithEmailAndPassword,  signOut,onAuthStateChanged, signInWithEmailAndPassword,  GoogleAuthProvider , signInWithPopup, getIdToken, updateProfile } from "firebase/auth";


initializeFirebase();

const useFirebase = () =>{
    const[user, setUser] = useState({});
    const[isLoading, setIsloading] = useState(true);
    const[authError, setAuthError] = useState(' ')
    const[admin, setAdmin] = useState(false);
    const[token, setToken] = useState('')


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    
    const registerUser = (email, password, name, history) =>{
        setIsloading(true);
        console.log(name)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setAuthError('');
            const newUser = {email, displayName : name};
            setUser(newUser);

            // save user to the database
            saveUser(email,name, 'POST')

             // send name to firebase after creation
             updateProfile(auth.currentUser, {
                displayName: name
              }).then(() => { 
              }).catch((error) => { 
              }); 
            history.replace('/');
        })
        .catch((error) => {
            setAuthError(error.message);
        })
        .finally(()=> setIsloading(false));
    }

    const loginUser = ( email, password, location, history) =>{
        setIsloading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination  = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('')
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(()=> setIsloading(false));
        }

    const signInWithGoogle = (location, history) =>{
        setIsloading(true);
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            saveUser(user.email, user.displayName, 'PUT')
            setAuthError('');
            const destination  = location?.state?.from || '/';
                history.replace(destination);
        }).catch((error) => {
            setAuthError(error.message);
        })
        .finally(()=> setIsloading(false));

    }

// observe user state
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              getIdToken(user)
                .then(idToken => {
                    setToken(idToken)
                })
            } else {
             setUser({})
            }
            setIsloading(false)
          });
          return () => unsubscribe;
    },[auth])

    useEffect(()=>{
        fetch(`https://damp-falls-81233.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    },[user.email])

    const logout =() => {
        setIsloading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=> setIsloading(false));   
    }

    const saveUser = (email, displayName, method) =>{
        const user ={email, displayName}
        fetch('https://damp-falls-81233.herokuapp.com/users', {
            method : method,
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        .then()
    }

    return{
        user,
        admin,
        token,
        registerUser,
        isLoading,
        loginUser,
        logout,
        authError,
        signInWithGoogle
    }
}
export default useFirebase;