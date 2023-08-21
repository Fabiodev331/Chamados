import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import './dashboard.css';

import SideBar from '../../componnets/SideBar';
import Title from '../../componnets/Title';

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Dashboard(){

   return(
      <div className='dashboard' >
         <SideBar/>

         <div className="content" >
            <Title name="Tickets" >
               <FiMessageSquare size={24} />
            </Title>

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

                     <tr>
                        <td data-label='Cliente'>Restaurante 02</td>
                        <td data-label='Assunto'>Atualização</td>
                        <td data-label='Status'>
                           <span className='badge' style={{backgroundColor: '#999'}}>
                              Fechado
                           </span>
                        </td>
                        <td data-label='Cadastrado'>20/08/2023</td>
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
           
         </div>
         
      </div>
   )
}