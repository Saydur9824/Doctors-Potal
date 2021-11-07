import { useEffect, useState } from "react";
import initializeFirebase from "../Pages/Login/Login/Firebase/firebase.init"
import { getAuth, createUserWithEmailAndPassword,  signOut,onAuthStateChanged, signInWithEmailAndPassword,  GoogleAuthProvider , signInWithPopup, updateProfile } from "firebase/auth";


initializeFirebase();

const useFirebase = () =>{
    const[user, setUser] = useState({});
    const[isLoading, setIsloading] = useState(true);
    const[authError, setAuthError] = useState(' ')

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
            setAuthError('');
        }).catch((error) => {
            setAuthError(error.message);
        })
        .finally(()=> setIsloading(false));

    }

// observe user state
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            } else {
             setUser({})
            }
            setIsloading(false)
          });
          return () => unsubscribe;
    },[])

    const logout =() => {
        setIsloading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally(()=> setIsloading(false));
          
    }


    return{
        user,
        registerUser,
        isLoading,
        loginUser,
        logout,
        authError,
        signInWithGoogle

    }
}
export default useFirebase;