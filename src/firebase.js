
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {toast} from 'react-toastify'
const firebaseConfig = {
  apiKey: "AIzaSyCrGKd_CIhbBHLFD0m2aXn2J7j3lwNc6tc",
  authDomain: "netflix-clone-cfed1.firebaseapp.com",
  projectId: "netflix-clone-cfed1",
  storageBucket: "netflix-clone-cfed1.appspot.com",
  messagingSenderId: "542615231371",
  appId: "1:542615231371:web:a4e327c6826112cbc9ad8e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user= res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })

    } catch (error) {
        console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '));
      
    }

}
const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    
        
    }
}
const logOut = ()=>signOut(auth);

export {auth,db,login,signup,logOut}