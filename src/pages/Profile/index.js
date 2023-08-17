import { useContext, useState } from "react"
import SideBar from "../../componnets/SideBar"
import Title from "../../componnets/Title"
import avatar from "../../assests/avatar.png"
import "./profile.css"

import { AuthContext } from "../../contexts/auth"
import { FiSettings, FiUpload } from "react-icons/fi"


import { db, storage } from "../../services/firebaseConection"
import { doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

import { toast } from "react-toastify"


export default function Profile(){
   const {user, setUser, storageUser, logout} = useContext(AuthContext);

   const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
   const [imageAvatar, setImageAvatar] = useState(null)
   const [nome, setNome] = useState(user && user.nome)
   const [email, setEmail] = useState(user && user.email)

   async function handleLogOut(){
      await logout();
   }

   function handelFile(e){
      if(e.target.files[0]){
         const image = e.target.files[0];

         if(image.type === "image/jpeg" || image.type === "image/png"){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(image))
         }else{
            alert("Envie uma imagem PNG ou JPEG")
            setImageAvatar(null);
            return;
         }
      }
   }

   async function  handleUpload(){
      const currentUid = user.uid;

      const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.nome}`)

      const uploadTask = uploadBytes(uploadRef, imageAvatar)
      .then((snapshot) => {
         
         getDownloadURL(snapshot.ref).then( async (downloadURL) => {
            let urlFoto = downloadURL;

            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
               avatarUrl: urlFoto,
               nome: nome,
            })
            .then(() => {
               let data = {
                  ...user,
                  nome: nome,
                  avatarUrl: urlFoto,
               }
               setUser(data)
               storageUser(data)
               toast.success("Atualizado com sucesso!")
            })
         })
      })

   }

   async function handleSubmit(e){
      e.preventDefault();

      if(imageAvatar === null && nome !== '' ){
         const docref = doc(db, "users", user.uid)
         await updateDoc(docref, {
            nome: nome,
         })
         .then(() => {
            let data = {
               ...user,
               nome: nome,
            }
            setUser(data)
            storageUser(data)
            toast.success("Atualizado com sucesso!")
         })
      }else if(nome !== '' && imageAvatar !== null){
         handleUpload()
      }
   }

   return(
      <div className="profile" >
         <SideBar/>

         <div className="content" >
            <Title name="Minha conta" >
               <FiSettings size={24} />
            </Title>

            <div className="containers" > 
               <form className="form-profile" onSubmit={handleSubmit} >
                  <label className="label-avatar">
                     <span>
                        <FiUpload size={25} color="#FFF" />
                     </span>

                     <input type="file" accept="image/*" onChange={handelFile} /> <br/>
                     {avatarUrl === null ? (
                        <img src={avatar} alt="Foto de perfil" width={250} height={250} />
                     ) : (
                        <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                     )}

                  </label>

                  <label>Nome</label>
                  <input 
                  type="text" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                  />

                  <label>Email</label>
                  <input 
                  type="text" 
                  value={email} 
                  disabled={true} 
                  />
              
                  <button type="submit" >Salvar</button>
               </form>
            </div>

            <div className="containers" >
               <button className="logout-btn" onClick={handleLogOut} >Sair</button>                 
            </div>
         </div>

      </div>
   )
}