import { Routes, Route } from "react-router-dom";

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Dashboard from "../Dashboard";

import Private from "./Private";

function RoutesApp(){
   return(
      <Routes>
         <Route path="/" element={ <SignIn/> } />
         <Route path="/register" element={ <SignUp/> } />

         <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
      </Routes>
   )
}

export default RoutesApp;