import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import { AuthContext } from '../../../contexts/AuthContext'
import type Produto from '../../../models/Produto'
import { listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import CardProdutos from '../cardprodutos/CardProdutos'

function ListarProdutos() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [produtos, setProdutos] = useState<Produto[]>([])

	const { usuario, handleLogout, isLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarProdutos() {
		try {
			setIsLoading(true)

			await listar('/produtos/saudaveis/all', setProdutos, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
		}finally {
            setIsLoading(false)
        }
	}

	useEffect(() => {
		if (token === '') {
			if (!isLogout) {
				ToastAlerta("Você precisa estar logado!", "info")
			}
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		buscarProdutos()
	}, [produtos.length])

	return (
		<>
			<div className="bg-red-500 py-4">
				<div className='text-2xl text-white text-bold mx-4'>Produtos Saudáveis</div>
			</div>

			{isLoading && (
				<div className="flex flex-col items-center justify-center py-8 gap-4">
					<SyncLoader color="#dc2626" size={20} />
					<p className="text-gray-600 text-lg font-medium animate-pulse">Carregando produtos saudáveis...</p>
				</div>
				
			 ) }

			<div className="flex justify-center bg-slate-100">
				<div className="mx-8 my-4 container flex flex-col">
					{produtos.length === 0 && (
						<span className="text-3xl text-center my-8">
							Nenhum produto foi encontrado
						</span>
					)}

					<div className="container my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
						{produtos
							.sort((a, b) => {
								const scoreOrder = { A: 1, B: 2, C: 3, D: 4, E: 5 }
								const scoreA = scoreOrder[a.nutriscore?.toUpperCase() as keyof typeof scoreOrder] || 999
								const scoreB = scoreOrder[b.nutriscore?.toUpperCase() as keyof typeof scoreOrder] || 999
								return scoreA - scoreB
							})
							.map((produto) => (
								<CardProdutos key={produto.id} produto={produto} />
							))}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarProdutos
