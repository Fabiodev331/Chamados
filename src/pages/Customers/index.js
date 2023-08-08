import SideBar from "../../componnets/SideBar"
import Title from "../../componnets/Title"

import { FiUser } from "react-icons/fi"

export default function Customers(){
   return(
      <div className="customers" >
         <SideBar/>

         <div className="content" >
            <Title name="Clientes" >
               <FiUser size={24} />
            </Title>
         </div>

      </div>
   )
}