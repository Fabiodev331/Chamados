import { useState, useEffect, useContext } from 'react';
import "./new.css"
import SideBar from '../../componnets/SideBar';
import Title from '../../componnets/Title';
import { AuthContext } from '../../contexts/auth';

import { FiPlusCircle} from 'react-icons/fi';

import { db } from '../../services/firebaseConection';
import { collection, getDoc, getDocs, doc  } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function New(){
   const [customers, setCustomers] = useState([])
   const [loadCustomers, setLoadCustomers] = useState(true);
   const [customersSelected,setCustomersSelected] = useState(0)

   const [complemento, setComplemento] = useState('')
   const [assunto, setAssunto] = useState('Suporte')
   const [status, setStatus] = useState('Aberto')
   const { user } = useContext(AuthContext);

   useEffect(() => {
      async function loadCustomers(){
         const querySnapshot = await getDocs(collection(db, "customers"))
         .then((snapshot) => {
            let lista = [];

            snapshot.forEach((doc) => {
               lista.push({
                  id: doc.id,
                  nomeFantasia: doc.data().nomeFantasia
               })
            })
            if(snapshot.docs.size === 0){
               toast.error("Nenhuma empresa encontada!")
               setCustomers([ { id: '1', nomeFantasia: 'FREELA'  } ])
               setLoadCustomers(false)
            }
            setCustomers(lista)
            setLoadCustomers(false)
         })
         .catch((error) => {
            toast.error("Erro ao buscar clientes", error)
            setLoadCustomers(false)
            setCustomers([ { id: '1', nomeFantasia: 'FREELA'  } ])
         })
      }
      loadCustomers();
   }, [])


   function handleOptionChange(e){
      setStatus(e.target.value)
      console.log(e.target.value)
   }

   function handleChangeSelect(e){
      setAssunto(e.target.value)
      console.log(e.target.value)
   }

   function handleChangeCustomers(e){
      setCustomersSelected(e.target.value)
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
               {
                  loadCustomers ? (
                     <input type='text' disabled={true} value="Carregando..." />
                  ) : (
                     <select value={customersSelected} onChange={handleChangeCustomers}>
                        {customers.map((item, index) => {
                           return(
                              <option key={index} value={index}>
                                 {item.nomeFantasia}
                              </option>
                           )
                        })}
                     </select>
                  )
               }

               <label>Assuntos</label>
               <select value={assunto} onChange={handleChangeSelect}>
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