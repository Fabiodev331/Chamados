import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import './signin.css';
import logo from '../../assests/logo.png';

import { AuthContext } from "../../contexts/auth";


export default function SignIn(){
   const [email, setEmail] = useState('');
   const [password, setPassword] =useState('');
   const { signIn, loadingAuth } = useContext(AuthContext);

   function handleSignIn(e){
      e.preventDefault();
   
      if(email !== '' && password !== ''){
         signIn(email, password); 
      }
   }


   return(
      <div className="container" >
         <div className="login" >
            <div className="login-logo" >
               <img src={logo} alt="Logo chamados" />
            </div>

            <form onSubmit={handleSignIn} >
               <h1>Entrar</h1>

               <input 
               type="text"
               placeholder="email@gmail.com"
               value={email}
               onChange={(text) => setEmail(text.target.value) }
               />

               <input 
               type="password"
               placeholder="******"
               value={password}
               onChange={(text) => setPassword(text.target.value) }
               />  

               <button>
                  {loadingAuth ? "Carregando..." : "Acessar"}
               </button>             
            </form>

            <Link to="/register" >Criar uma conta</Link>
         </div>
      </div>
   )
}