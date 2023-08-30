import { Routes, Route } from "react-router-dom";

import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Dashboard from "../Dashboard";
import Profile from "../Profile";
import Customers from "../Customers";
import New from "../New";

import Private from "./Private";

function RoutesApp(){
   return(
      <Routes>
         <Route path="/" element={ <SignIn/> } />
         <Route path="/register" element={ <SignUp/> } />

         <Route path="/dashboard" element={ <Private> <Dashboard/> </Private> } />
         <Route path="/profile" element={ <Private> <Profile/> </Private> } />
         <Route path="/customers" element={ <Private> <Customers/> </Private> } />
         <Route path="/new" element={ <Private> <New/> </Private> } />
         <Route path="/new/:id" element={ <Private> <New/> </Private> } />
      </Routes>
   )
}

export default RoutesApp;