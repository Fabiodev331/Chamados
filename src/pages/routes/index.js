import { Routes, Route } from "react-router-dom";

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Dashboard from "../Dashboard";
import Profile from "../Profile";
import Customers from "../Customers";

import Private from "./Private";

function RoutesApp(){
   return(
      <Routes>
         <Route path="/" element={ <SignIn/> } />
         <Route path="/register" element={ <SignUp/> } />

         <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
         <Route path="/profile" element={ <Private> <Profile/> </Private> } />
         <Route path="/customers" element={ <Private> <Customers/> </Private> } />
      </Routes>
   )
}

export default RoutesApp;