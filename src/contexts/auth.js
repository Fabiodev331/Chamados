import { useState, useEffect, createContext } from "react";
import { db, auth } from '../services/firebaseConection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({}); 

function AuthProvider({children}){
   const [user, setUser] = useState(null);
   const [loadingAuth, setLoadingAuth] = useState(false);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect( ()=> {
      async function loadUser(){
         const storageUser = localStorage.getItem("@chamados")

         if(storageUser){
            setUser(JSON.parse(storageUser))
            setLoading(false)
         }

         setLoading(false);
      }
      loadUser();
   }, [])

   async function signIn(email, password){
      setLoadingAuth(true);

      await signInWithEmailAndPassword(auth, email, password)
      .then( async (value) => {
         let uid = value.user.uid;

         const docref = doc(db, "users", uid);
         const docsnap = await getDoc(docref)

         let data = {
            uid: uid,
            nome: docsnap.data().nome,
            email: value.user.email,
            avatarUrl: docsnap.data().avatarUrl
         }
         setUser(data);
         storageUser(data);
         setLoadingAuth(false);
         toast.success("bem vindo(a) de volta!")
         navigate("/dashboard")
      })
      .catch((error) => {
         toast.error("ops... algo deu errado");
         console.log(error)
         setLoadingAuth(false);
      })

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
            toast.success("Seja bem vindo(a)!")
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

   async function logout(){
      signOut(auth);
      localStorage.removeItem("@chamados");
      setUser(null);
   }

   return(
      <AuthContext.Provider
      value={{ 
         signed: !!user,
         user,
         signIn,
         signUp,
         logout,
         loadingAuth,
         loading,
         storageUser,
         setUser
      }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider;