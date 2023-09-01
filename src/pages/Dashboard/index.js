import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import './dashboard.css';

import SideBar from '../../componnets/SideBar';
import Title from '../../componnets/Title';

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConection';

import { format } from 'date-fns';
import Modal from "../../componnets/Modal"

const listRef = collection(db, "chamados")

export default function Dashboard() {
	const [listaChamados, setListaChamados] = useState([])
	const [loading, setLoading] = useState(true)
	const [isEmpty, setIsEmpty] = useState(false)
	const [lastDocs, setLastDocs] = useState()
	const [loadingMore, setLoadingMore] = useState(false)

	const [showModal, setShoeModal] = useState(false)
	const [detail, setDetail] = useState()


	useEffect(() => {
		async function loadingChamados() {
			const q = query(listRef, orderBy('created', 'desc'), limit(5));

			const querySnapshot = await getDocs(q)
			setListaChamados([])
			await updateState(querySnapshot)
			setLoading(false)
		}
		loadingChamados();

		return () => { }
	}, [])

	async function updateState(querySnapshot) {
		const isCollectionEmpty = querySnapshot.size === 0;

		if (!isCollectionEmpty) {
			let lista = [];

			querySnapshot.forEach((doc) => {
				lista.push({
					id: doc.id,
					assunto: doc.data().assunto,
					cliente: doc.data().cliente,
					clienteId: doc.data().clienteId,
					created: doc.data().created,
					createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
					status: doc.data().status,
					complemento: doc.data().complemento
				})
			})
			const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
			setLastDocs(lastDoc)
			setListaChamados(listaChamados => [...listaChamados, ...lista])
		}
		else {
			setIsEmpty(true)
		}
		setLoadingMore(false)
	}

	async function handleMore() {
		setLoadingMore(true)
		const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5));
		const querySnapshot = await getDocs(q)
		await updateState(querySnapshot)
	}

	function handleModal(item){
		setShoeModal(true)
		setDetail(item)

	}

	if (loading) {
		return (
			<div>
				<SideBar />

				<div className="content" >
					<Title name="Tickets" >
						<FiMessageSquare size={24} />
					</Title>
					<div className='containers notickets'>
						<span>Buscando chamados...</span>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='dashboard' >
			<SideBar />

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
											<th scope='col'></th>
										</tr>
									</thead>
									<tbody>
										{listaChamados.map((item, index) => {
											return (
												<tr>
													<td data-label='Cliente'>{item.cliente}</td>
													<td data-label='Assunto'>{item.assunto}</td>
													<td data-label='Status'>
														<span className='badge' style={{ backgroundColor: item.status === "Aberto" ? "#83bf02" : '#999' }}>
															{item.status}
														</span>
													</td>
													<td data-label='Cadastrado'>{item.createdFormat}</td>
													<td data-label='#'>
														<button className='action' style={{ backgroundColor: '#3583f6' }} onClick={() => handleModal(item)}>
															<FiSearch size={17} color='#FFF' />
														</button>
														<Link to={`/new/${item.id}`} className='action' style={{ backgroundColor: '#f6a935' }}>
															<FiEdit2 size={17} color='#FFF' />
														</Link>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>

								{loadingMore && <h4 className='text-buscar'>Buscando mais chamados...</h4>}
								{!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
							</>
						)
					}


				</>

			</div>

			{showModal && (
				<Modal
					item={detail}
					close={() => setShoeModal(false)}
				/>
			)}

		</div>
	)
}