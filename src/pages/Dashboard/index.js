import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './dashboard.css';

import SideBar from '../../componnets/SideBar';
import Title from '../../componnets/Title';

import { FiPhone } from 'react-icons/fi';

export default function Dashboard(){
   const {logout} = useContext(AuthContext);

   async function handleLogOut(){
      await logout();
   }
   return(
      <div>
         <SideBar/>

         <div className="content" >
            <Title name="Chamados" >
               <FiPhone size={24} />
            </Title>

            
            <button onClick={handleLogOut} >Sair da conta</button>
         </div>
         
      </div>
   )
}