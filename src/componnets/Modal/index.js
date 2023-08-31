import { FiX } from "react-icons/fi"
import "./modal.css"

export default function Modal(){
   return(
      <div className="modal">
         <div className="container-modal">
            <button className="btn-modal">
               <FiX size={22} color="#FFF"/>
               Fechar
            </button>

            <main>
               <h2>Detalhes do chamado</h2>
               <div className="row-modal">
                  <span>
                     Cliente: <i>Mercado</i>
                  </span>
               </div>
            </main>
         </div>
      </div>
   )
}