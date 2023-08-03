import SideBar from "../../componnets/SideBar"
import Title from "../../componnets/Title"

import { FiUser } from "react-icons/fi"

export default function Customers(){
   return(
      <div>
         <SideBar/>

         <div className="content" >
            <Title name="Clientes" >
               <FiUser size={24} />
            </Title>
         </div>

      </div>
   )
}