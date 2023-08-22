import { useState } from 'react';
import "./new.css"

import SideBar from '../../componnets/SideBar';
import Title from '../../componnets/Title';

import { FiPlusCircle} from 'react-icons/fi';

export default function New(){
   const [customers, setCustomers] = useState([])

   const [complemento, setComplemento] = useState('')
   const [assunto, setAssunto] = useState('Suporte')
   const [status, setStatus] = useState('Aberto')


   function handleOptionChange(e){
      setStatus(e.target.value)
   }

   return(
      <div className='tickets' >
         <SideBar/>

         <div className="content" >
            <Title name="Novo chamado" >
               <FiPlusCircle size={24} />
            </Title>

           <div className="containers">
            <form className="form-profile">
               <label>Clientes</label>
               <select>
                  <option key={1} value={1}>Restaurante 01</option>
                  <option key={2} value={2}>Restaurante 02</option>
               </select>

               <label>Assuntos</label>
               <select>
                  <option value="Suporte">Suporte</option>
                  <option value="Visita Tecnica">Visita Tecnica</option>
                  <option value="Financeiro">Financeiro</option>
               </select>

               <label>Status</label>
               <div className='status'>
                  <input
                  type="radio"
                  name="radio"
                  value="Aberto"
                  onChange={handleOptionChange}
                  checked={status === "Aberto"}
                  />
                  <span>Em aberto</span>

                  <input
                  type="radio"
                  name="radio"
                  value="Progresso"
                  onChange={handleOptionChange}
                  checked={status === "Progresso"}
                  />
                  <span>Progresso</span>

                  <input
                  type="radio"
                  name="radio"
                  value="Atendido"
                  onChange={handleOptionChange}
                  checked={status === "Atendido"}
                  />
                  <span>Atendido</span>
               </div>

               <label>Complemento</label>
                  <textarea
                     type="text"
                     placeholder='Descreva seu problema (opcional)'
                     value={complemento}
                     onChange={(e) => setComplemento(e.target.value)}
                  />

                  <button type='submit'>Registar</button>
            </form>

           </div>
         </div>
          
      </div>
   )
}