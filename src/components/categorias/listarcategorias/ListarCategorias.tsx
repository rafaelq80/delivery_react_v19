import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import { AuthContext } from '../../../contexts/AuthContext'
import type Categoria from '../../../models/Categoria'
import { listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import CardCategorias from '../cardcategorias/CardCategorias'

function ListarCategorias() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [categorias, setCategorias] = useState<Categoria[]>([])

	const { usuario, handleLogout, isLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarCategorias() {
		try {

			setIsLoading(true)

			await listar(`/categorias`, setCategorias, {
				headers: { Authorization: token },
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
			navigate('/login')
		}
	}, [token])

	useEffect(() => {
		buscarCategorias()
	}, [categorias.length])

	return (
		<>
			{isLoading && (
				<div className="flex justify-center py-8">
					<SyncLoader color="#dc2626" size={32} />
				</div>
			 ) }

			<div className="flex justify-center">
				<div className="mx-6 px-4 my-4 container flex flex-col">
					{categorias.length === 0 && (
						<span className="text-3xl text-center my-8">
							Nenhuma categoria foi encontrada
						</span>
					)}

					<div className="container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{categorias.map((categoria) => (
							<CardCategorias
								key={categoria.id}
								categoria={categoria}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarCategorias
