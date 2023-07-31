import { Routes, Route } from "react-router-dom";

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Dashboard from "../Dashboard";

function RoutesApp(){
   return(
      <Routes>
         <Route path="/" element={ <SignIn/> } />
         <Route path="/register" element={ <SignUp/> } />

         <Route path="/dashboard" element={ <Dashboard/> } />
      </Routes>
   )
}

export default RoutesApp;