import { useState } from "react"
import SideBar from "../../componnets/SideBar"
import Title from "../../componnets/Title"
import "./customers.css"

import { db } from "../../services/firebaseConection"
import { addDoc, collection } from "firebase/firestore"

import { FiUser } from "react-icons/fi"
import { toast } from "react-toastify"

export default function Customers(){
   const [nome, setNome] = useState('')
   const [cnpj, setCnpj] = useState('')
   const [endereco, setEndereco] = useState('')

   async function handleSubmit(e){
      e.preventDefault();
      
      if(nome !== '' && cnpj !== '' && endereco !== ''){
         await addDoc(collection(db, "customers"), {
            nomeFantasia: nome,
            cnpj: cnpj,
            endereco: endereco 
         })
         .then(() => {
            setNome('')
            setCnpj('')
            setEndereco('')
            toast.success('Cadastrado com sucesso!')
         })
         .catch((error) => {
            console.log(error)
            toast.error('Error ao cadastrar!')
         })

      }else{
         toast.error('Digite todos os campos!')
      }
   }

   return(
      <div className="customers" >
         <SideBar/>

         <div className="content" >
            <Title name="Clientes" >
               <FiUser size={24} />
            </Title>

            <div className="containers" >
               <form className="form-profile" onSubmit={handleSubmit}>

                  <label>Nome</label>
                  <input 
                  type="text"
                  placeholder="Nome da empresa" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  />

                  <label>CNPJ</label>
                  <input 
                  type="text"
                  placeholder="Digite o CNPJ" 
                  value={cnpj} 
                  onChange={(e) => setCnpj(e.target.value)} 
                  />

                  <label>Endereço</label>
                  <input 
                  type="text"
                  placeholder="Endereço da empresa" 
                  value={endereco} 
                  onChange={(e) => setEndereco(e.target.value)} 
                  />

                  <button type="submit" >
                     Cadastrar
                  </button>

               </form>
            </div>

         </div>

      </div>
   )
}