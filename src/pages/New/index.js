import { useState, useEffect, useContext } from 'react';
import "./new.css"
import SideBar from '../../componnets/SideBar';
import Title from '../../componnets/Title';
import { AuthContext } from '../../contexts/auth';

import { FiPlusCircle} from 'react-icons/fi';

import { db } from '../../services/firebaseConection';
import { collection, getDoc, getDocs, doc, addDoc, updateDoc  } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { useNavigate, useParams } from 'react-router-dom';

export default function New(){
   const { user } = useContext(AuthContext);
   const { id } = useParams()
	 const navigate = useNavigate()

   const [customers, setCustomers] = useState([])
   const [loadCustomers, setLoadCustomers] = useState(true);
   const [customersSelected,setCustomersSelected] = useState(0)

   const [complemento, setComplemento] = useState('')
   const [assunto, setAssunto] = useState('Suporte')
   const [status, setStatus] = useState('Aberto')
   const [idCustomer, setIdCustomer] = useState(false)


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

            if(id){
               loadId(lista)
            }
         })
         .catch((error) => {
            toast.error("Erro ao buscar clientes", error)
            setLoadCustomers(false)
            setCustomers([ { id: '1', nomeFantasia: 'FREELA'  } ])
         })
      }
      loadCustomers();
   }, [id])

   async function loadId(lista){
      const docRef = doc(db, "chamados", id)
      await getDoc(docRef)
      .then((snapshot) => {
         setAssunto(snapshot.data().assunto)
         setStatus(snapshot.data().status)
         setComplemento(snapshot.data().complemento)

         let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
         setCustomersSelected(index)
         setIdCustomer(true)
      })
      .catch((error) => {
         toast.error("Erro ao editar")
         setIdCustomer(false)
      })
   }

   function handleOptionChange(e){
      setStatus(e.target.value)
   }

   function handleChangeSelect(e){
      setAssunto(e.target.value)
   }

   function handleChangeCustomers(e){
      setCustomersSelected(e.target.value)
   }

   async function handleRegister(e){
      e.preventDefault();

      if(idCustomer){
         const docRef = doc(db, "chamados", id)
         await updateDoc(docRef, {
            cliente: customers[customersSelected].nomeFantasia,
            clienteId: customers[customersSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
         })
				 .then(() => {
					toast.info("Chamado atualizado com sucesso!")
					setCustomersSelected(0)
					setComplemento('')
					navigate("/dashboard")
				 })
				 .catch(() => {
					toast.error("Ops erro ao atualizar esse chamado")
				 })
         return;
      }

      await addDoc(collection(db, "chamados"), {
         created: new Date(),
         cliente: customers[customersSelected].nomeFantasia,
         clienteId: customers[customersSelected].id,
         assunto: assunto,
         status: status,
         complemento: complemento,
         userId: user.uid
      })
      .then(() => {
         toast.success("Chamado registrado")
         setComplemento('')
         setCustomersSelected(0)
				 navigate("/dashboard")
      })
      .catch((error) => {
         toast.error("Ops erro ao registar")
      })
   }

   return(
      <div className='tickets' >
         <SideBar/>

         <div className="content" >
            <Title name={id ? "Editando chamado" : "Novo chamado"} >
               <FiPlusCircle size={24} />
            </Title>

           <div className="containers">
            <form className="form-profile" onSubmit={handleRegister}>
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

                  <button type='submit'>{id ? "Atualizar" : "Registar"}</button>
            </form>

           </div>
         </div>
          
      </div>
   )
}