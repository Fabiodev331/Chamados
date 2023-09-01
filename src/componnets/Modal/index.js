import { FiX } from "react-icons/fi"
import "./modal.css"

export default function Modal({item, close}){
   return(
      <div className="modal">
         <div className="container-modal">
            <button className="btn-modal" onClick={close}>
               <FiX size={22} color="#FFF"/>
               Fechar
            </button>

            <main>
               <h2>Detalhes do chamado</h2>
               <div className="row-modal">
                  <span>
                     Cliente: <i>{item.cliente}</i>
                  </span>
               </div>
               <div className="row-modal">
                  <span>
                     Assunto: <i>{item.assunto}</i>
                  </span>
                  <span>
                     Cadastrado em: <i>{item.createdFormat}</i>
                  </span>
               </div>
               <div className="row-modal">
                  <span>
                     Status: 
                     <i className="status" style={{ backgroundColor: item.status === "Aberto" ? "#83bf02" : '#999' }}>
                        {item.status}
                     </i>
                  </span>
               </div>
               {item.complemento !== '' && (
                  <>
                  <h3>Complemento</h3>
                  <p>
                     {item.complemento}
                  </p>
               </>
               )}
            </main>
         </div>
      </div>
   )
}