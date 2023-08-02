import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import avatarImg from '../../assests/avatar.png';
import {FiHome, FiUser, FiSettings} from 'react-icons/fi';
import "./sidebar.css";

export default function SideBar(){
   const {user} = useContext(AuthContext);

   return(
      <div className="sidebar" >
         <div>
            <img src={ user.avatarUrl === null ? avatarImg : user.avatarUrl } alt='Foto de perfil' />
            
            <Link to="/dashboard" >
               <FiHome color='#FFF' size={24} />
               Chamados
            </Link>

            <Link to="/cusrtomers" >
               <FiUser color='#FFF' size={24} />
               Clientes
            </Link>

            <Link to="/profile" >
               <FiSettings color='#FFF' size={24} />
               Perfil
            </Link>
         </div>
      </div>
   )
}