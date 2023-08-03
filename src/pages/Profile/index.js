
import SideBar from "../../componnets/SideBar"
import Title from "../../componnets/Title"

import { FiSettings } from "react-icons/fi"

export default function Profile(){
   return(
      <div>
         <SideBar/>

         <div className="content" >
            <Title name="Minha conta" >
               <FiSettings size={24} />
            </Title>
         </div>

      </div>
   )
}