import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import './dashboard.css';

import SideBar from '../../componnets/SideBar';
import Title from '../../componnets/Title';

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConection';

const listRef = collection(db, "chamados")

export default function Dashboard(){
   const [listaChamados, setListaChamados] = useState([])
   const [loading, setLoading] = useState(true)
   const [isEmpty, setIsEmpty] = useState(false)

   useEffect(() => {
      async function loadingChamados(){
         const q = query(listRef, orderBy('created', 'desc'), limit(10));
         
         const querySnapshot = await getDocs(q)
         await updateState(querySnapshot)

         setLoading(false)
      }

      loadingChamados();

      return () => {

      }
   }, [])

   async function updateState(querySnapshot){
      const isCollectionEmpty = querySnapshot.size === 0;

      if(!isCollectionEmpty){
         let lista = [];

         querySnapshot.forEach((doc) => {
            lista.push({
               id: doc.id,
               assunto: doc.data().assunto,
               cliente: doc.data().cliente,
               clienteId: doc.data().clienteId,
               created: doc.data().created,
               status: doc.data(). status,
               complemento: doc.data().complemento
            })
         })

         setListaChamados(listaChamados => [...listaChamados, ...lista])
      }
      else{
         setIsEmpty(true)
      }
   }

   return(
      <div className='dashboard' >
         <SideBar/>

         <div className="content" >
            <Title name="Tickets" >
               <FiMessageSquare size={24} />
            </Title>

            <>
               {
                  listaChamados.length === 0 ? (
                     <div className='containers notickets'>
                        <span>Nenhum chamado encontrado...</span>
                        <Link to='/new' className='new' >
                           <FiPlus size={24} color='#FFF' />
                           Novo chamado
                        </Link>
                     </div>
                  ) : (
                     <>
                     <Link to='/new' className='new' >
                        <FiPlus size={24} color='#FFF' />
                        Novo chamado
                     </Link>
                     
                     <table>
                        <thead>
                           <tr>
                              <th scope='col'>Clientes</th>
                              <th scope='col'>Assunto</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Cadastrado em</th>
                              <th scope='col'>#</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td data-label='Cliente'>Restaurante 01</td>
                              <td data-label='Assunto'>Suporte</td>
                              <td data-label='Status'>
                                 <span className='badge' style={{backgroundColor: '#999'}}>
                                    Em aberto
                                 </span>
                              </td>
                              <td data-label='Cadastrado'>21/08/2023</td>
                              <td data-label='#'>
                                 <button className='action' style={{backgroundColor: '#3583f6'}}>
                                    <FiSearch size={17} color='#FFF'/>
                                 </button>
                                 <button className='action' style={{backgroundColor: '#f6a935'}}>
                                    <FiEdit2 size={17} color='#FFF'/>
                                 </button>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                     </>
                  )
               }

               
            </>
           
         </div>
         
      </div>
   )
}