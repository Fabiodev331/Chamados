import { useState, useEffect, createContext } from "react";
import { db, auth } from '../services/firebaseConection';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({}); 

function AuthProvider({children}){
   const [user, setUser] = useState(null);
   const [loadingAuth, setLoadingAuth] = useState(false);
   const navigate = useNavigate();

   function signIn(email, password){
      console.log(email);
      console.log(password);
      alert("Logado!")

   }

   async function signUp(email, password, name){
      setLoadingAuth(true);

      await createUserWithEmailAndPassword(auth, email, password)
      .then( async (value) => {
         let uid = value.user.uid;

         await setDoc(doc(db, "users", uid), {
            nome: name,
            avatarUrl: null
         })
         .then( () => {
            let data = {
               uid: uid,
               nome: name,
               email: value.user.email,
               avatarUrl: null
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Seja bem vindo!")
            navigate("/dashboard")
         })
         
      })
      .catch((err) => {
         console.log(err);
         setLoadingAuth(false);
      })
   }

   function storageUser(data){
      localStorage.setItem("@chamados", JSON.stringify(data))
   }

   return(
      <AuthContext.Provider
      value={{ 
         signed: !!user,
         user,
         signIn,
         signUp,
         loadingAuth 
      }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider;