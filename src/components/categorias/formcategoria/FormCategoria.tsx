import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import AuthContext from '../../../contexts/AuthContext'
import type Categoria from '../../../models/Categoria'
import { atualizar, cadastrar, listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import {
	formularioValido,
	validarCampoCategoria,
	validarFormularioCategoria,
} from '../../../validations/ValidacaoCategoria'

function FormCategoria() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const [erros, setErros] = useState<Record<string, string>>({})

	const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

	const { id } = useParams<{ id: string }>()

	const { usuario, handleLogout, isLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarPorId(id: string) {
		try {
			await listar(`/categorias/${id}`, setCategoria, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Categoria não Encontrada!', 'erro')
				retornar()
			}
		}
	}

	useEffect(() => {
		if (token === '') {
			if (!isLogout) {
				ToastAlerta('Você precisa estar logado!', 'info')
			}
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
			setIsEditing(true)
		}
	}, [id])

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target

		setCategoria({
			...categoria,
			[name]: value,
		})

		const erro = validarCampoCategoria(name, value)
		setErros((prev) => ({ ...prev, [name]: erro }))
	}

	function retornar() {
		navigate('/categorias')
	}

	async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const errosValidacao = validarFormularioCategoria(categoria)
		setErros(errosValidacao)

		if (!formularioValido(errosValidacao)) {
			ToastAlerta('Por favor, corrija os erros no formulário', 'erro')
			return
		}

		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/categorias`, categoria, setCategoria, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Categoria atualizada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao atualizar a Categoria!', 'erro')
				}
			}
		} else {
			try {
				await cadastrar(`/categorias`, categoria, setCategoria, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Categoria cadastrada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao cadastrar a Categoria!', 'erro')
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	return (
		<div className="container flex flex-col mx-auto items-center">
			{/* Header */}
			<h1 className="text-4xl text-center my-8">
				{isEditing ? 'Editar Categoria' : 'Cadastrar Categoria'}
			</h1>

			{/* Form Container */}
			<div className="flex flex-col w-full max-w-2xl gap-4 mb-8">
				<form
					className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
					onSubmit={gerarNovaCategoria}
				>
					{/* Descrição */}
					<div className="flex flex-col gap-2 mb-5">
						<label htmlFor="descricao" className="text-sm font-semibold text-gray-700">
							Descrição
						</label>
						<input
							type="text"
							id="descricao"
							name="descricao"
							placeholder="Insira aqui a descrição da categoria"
							className={`border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all ${
								erros.descricao
									? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
									: "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
							}`}
							required
							value={categoria.descricao || ''}
							onChange={atualizarEstado}
						/>
						{erros.descricao && (
							<span className="text-red-500 text-xs">{erros.descricao}</span>
						)}
					</div>

					{/* Ícone */}
					<div className="flex flex-col gap-2 mb-6">
						<label htmlFor="icone" className="text-sm font-semibold text-gray-700">
							Ícone
						</label>
						<input
							type="text"
							id="icone"
							name="icone"
							placeholder="Insira aqui o ícone da categoria (ex: 🛒, 📱, 🏠)"
							className={`border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all ${
								erros.icone
									? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
									: "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
							}`}
							required
							value={categoria.icone || ''}
							onChange={atualizarEstado}
						/>
						{erros.icone && (
							<span className="text-red-500 text-xs">{erros.icone}</span>
						)}
					</div>

					{/* Botão Submit */}
					<div className="flex justify-center pt-3">
						<button
							type="submit"
							className="flex justify-center items-center rounded bg-gradient-to-r 
								from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold 
								w-1/2 mx-auto py-2.5 transition-all duration-200 active:scale-95"
						>
							{isLoading ? (
								<ClipLoader color="#ffffff" size={20} />
							) : (
								<span>{isEditing ? 'Atualizar' : 'Cadastrar'}</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormCategoria