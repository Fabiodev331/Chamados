import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './dashboard.css';

import SideBar from '../../componnets/SideBar';

export default function Dashboard(){
   const {logout} = useContext(AuthContext);

   async function handleLogOut(){
      await logout();
   }
   return(
      <div>
         <SideBar/>
         
         <h1>Dashboard</h1>
         <button onClick={handleLogOut} >Sair</button>
      </div>
   )
}