import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import './signup.css';
import logo from '../../assests/logo.png';

import { AuthContext } from "../../contexts/auth";

export default function SignUp(){
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] =useState('');
   const { signUp, loadingAuth } = useContext(AuthContext);

   async function handleSignUp(e){
      e.preventDefault();

      if(name !== '' && email !== '' && password !== ''){
         await signUp(email, password, name);
      }
   }

   return(
      <div className="container" >
         <div className="login" >
            <div className="login-logo" >
               <img src={logo} alt="Logo chamados" />
            </div>

            <form onSubmit={handleSignUp} >
               <h1>Nova conta</h1>

               <input 
               type="text"
               placeholder="Name"
               value={name}
               onChange={(text) => setName(text.target.value) }
               />

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
                  {loadingAuth? "Carregando..." : "Cadastrar"}
               </button>
               
                            
            </form>

            <Link to="/" >Já uma conta? Entrar</Link>
         </div>
      </div>
   )
}