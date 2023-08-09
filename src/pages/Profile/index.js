import { useContext, useState } from "react"
import SideBar from "../../componnets/SideBar"
import Title from "../../componnets/Title"
import avatar from "../../assests/avatar.png"
import "./profile.css"

import { AuthContext } from "../../contexts/auth"

import { FiSettings, FiUpload } from "react-icons/fi"


export default function Profile(){
   const {user, setUser, storageUser} = useContext(AuthContext);
   const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
   return(
      <div className="profile" >
         <SideBar/>

         <div className="content" >
            <Title name="Minha conta" >
               <FiSettings size={24} />
            </Title>

            <div className="container-profile" > 
               <form className="form-profile" >
                  <label className="label-avatar">
                     <span>
                        <FiUpload size={25} color="#FFF" />
                     </span>

                     <input type="file" accept="image/*" /> <br/>
                     {avatarUrl === null ? (
                        <img src={avatar} alt="Foto de perfil" width={250} height={250} />
                     ) : (
                        <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                     )}

                  </label>

                  <label>Nome</label>
                  <input type="text" placeholder="Seu nome" />

                  <label>Email</label>
                  <input type="text" placeholder="teste@teste.com" disabled={true} />
              
                  <button type="submit" >Salvar</button>
               </form>
            </div>

            <div className="container-profile" >
               <button className="logout-btn" >Sair</button>                 
            </div>
         </div>

      </div>
   )
}