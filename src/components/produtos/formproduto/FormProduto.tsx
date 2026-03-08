import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Categoria from "../../../models/Categoria"
import type Produto from "../../../models/Produto"
import { atualizar, cadastrar, listar } from "../../../services/Services"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import {
	formularioValido,
	validarCampoProduto,
	validarFormularioProduto,
} from "../../../validations/ValidacaoProduto"
import { NumericFormat } from "react-number-format"

function FormProduto() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const [categorias, setCategorias] = useState<Categoria[]>([])

	const [erros, setErros] = useState<Record<string, string>>({})

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		descricao: "",
		icone: "",
	})

	const [produto, setProduto] = useState<Produto>({} as Produto)

	const { id } = useParams<{ id: string }>()

	const { usuario, handleLogout, isLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarProdutoPorId(id: string) {
		try {
			await listar(`/produtos/${id}`, setProduto, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			} else {
				ToastAlerta("Produto não Encontrado!", "erro")
				retornar()
			}
		}
	}

	async function buscarCategoriaPorId(id: string) {
		try {
			await listar(`/categorias/${id}`, setCategoria, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			} else {
				ToastAlerta("Categoria não Encontrada!", "erro")
				retornar()
			}
		}
	}

	async function buscarCategorias() {
		try {
			await listar(`/categorias`, setCategorias, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout()
			}
		}
	}

	useEffect(() => {
		if (token === "") {
			if (!isLogout) {
				ToastAlerta("Você precisa estar logado!", "info")
			}
			navigate("/")
		}
	}, [token])

	useEffect(() => {
		buscarCategorias()
		if (id !== undefined) {
			buscarProdutoPorId(id)
			setIsEditing(true)
		}
	}, [id])

	useEffect(() => {
		if (categoria.id !== 0) {
			setProduto((prevState) => ({
				...prevState,
				categoria: categoria,
				usuario: usuario,
			}))
		}
	}, [categoria])

	function handleCategoriaChange(e: ChangeEvent<HTMLSelectElement>) {
		const selectedId = e.target.value
		if (selectedId) {
			buscarCategoriaPorId(selectedId)

			const erro = validarCampoProduto("categoria", selectedId)
			setErros((prev) => ({ ...prev, categoria: erro }))
		}
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { type, value, name } = e.target

		let valor: string | number = value

		switch (type) {
			case "number":
			case "range":
				valor = value === "" ? "" : parseFloat(Number(value).toFixed(2))
				break
			default:
				if (name === "preco" && !isNaN(Number(value)) && value !== "") {
					valor = parseFloat(Number(value).toFixed(2))
				} else {
					valor = value
				}
		}

		setProduto((prevState) => ({
			...prevState,
			[name]: valor,
		}))

		const erro = validarCampoProduto(name, valor.toString())
		setErros((prev) => ({ ...prev, [name]: erro }))
	}

	function retornar() {
		navigate("/produtos")
	}

	async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const errosValidacao = validarFormularioProduto(produto)
		setErros(errosValidacao)

		if (!formularioValido(errosValidacao)) {
			ToastAlerta("Por favor, corrija os erros no formulário", "erro")
			return
		}

		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/produtos`, produto, setProduto, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta("Produto atualizado com sucesso", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
					ToastAlerta("Erro ao atualizar o Produto!", "erro")
				}
			}
		} else {
			try {
				await cadastrar(`/produtos`, produto, setProduto, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta("Produto cadastrado com sucesso", "sucesso")
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
					ToastAlerta("Erro ao cadastrar o Produto!", "erro")
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	const categoriaSelecionado = produto.categoria?.id > 0

	return (
		<div
			className={
				isEditing
					? "container flex flex-col mx-auto items-center"
					: "flex flex-col bg-white rounded-2xl overflow-hidden"
			}
		>
			{/* Header */}
			<h1 className="text-4xl text-center my-4">
				{isEditing ? "Editar Produto" : "Cadastrar Produto"}
			</h1>

			{/* Form Container */}
			<div className={isEditing ? "flex flex-col w-1/2 gap-4 mb-8" : "px-8 py-6"}>
				<form
					className={
						isEditing
							? "bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"
							: "flex flex-col gap-4"
					}
					onSubmit={gerarNovoProduto}
				>
					{/* Nome */}
					<div className="flex flex-col gap-2">
						<label htmlFor="nome" className="text-sm font-semibold text-gray-700">
							Produto
						</label>
						<input
							id="nome"
							value={produto.nome || ""}
							onChange={atualizarEstado}
							type="text"
							placeholder="Insira aqui o nome do Produto"
							name="nome"
							required
							className={`border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all ${
								erros.nome
									? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
									: "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
							}`}
						/>
						{erros.nome && <span className="text-red-500 text-xs">{erros.nome}</span>}
					</div>

					{/* Preço */}
					<div className="flex flex-col gap-2">
						<label htmlFor="preco" className="text-sm font-semibold text-gray-700">
							Preço do Produto
						</label>
						<NumericFormat
							id="preco"
							name="preco"
							value={produto.preco}
							onValueChange={(values) => {
								setProduto({
									...produto,
									preco: values.floatValue ?? 0,
								})
								const erro = validarCampoProduto("preco", (values.floatValue ?? 0).toString())
								setErros((prev) => ({ ...prev, preco: erro }))
							}}
							thousandSeparator="."
							decimalSeparator=","
							decimalScale={2}
							fixedDecimalScale
							prefix="R$ "
							placeholder="Adicione aqui o preço do Produto"
							required
							className={`border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all ${
								erros.preco
									? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
									: "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
							}`}
						/>
						{erros.preco && <span className="text-red-500 text-xs">{erros.preco}</span>}
					</div>

					{/* Foto */}
					<div className="flex flex-col gap-2">
						<label htmlFor="foto" className="text-sm font-semibold text-gray-700">
							URL da Foto
						</label>
						<input
							type="text"
							id="foto"
							name="foto"
							placeholder="Insira a URL da foto do produto"
							className={`border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all ${
								erros.foto
									? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
									: "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
							}`}
							required
							value={produto.foto || ""}
							onChange={atualizarEstado}
						/>
						{erros.foto && <span className="text-red-500 text-xs">{erros.foto}</span>}
					</div>

					{/* Categoria */}
					<div className="flex flex-col gap-2">
						<label htmlFor="categoria" className="text-sm font-semibold text-gray-700">
							Categoria
						</label>
						<select
							name="categoria"
							id="categoria"
							className={`border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-all ${
								erros.categoria
									? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
									: "border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
							}`}
							onChange={handleCategoriaChange}
							value={produto.categoria?.id || ""}
						>
							<option value="" disabled>
								Selecione uma Categoria
							</option>
							{categorias.map((categoria) => (
								<option key={categoria.id} value={categoria.id}>
									{categoria.descricao}
								</option>
							))}
						</select>
						{erros.categoria && (
							<span className="text-red-500 text-xs">{erros.categoria}</span>
						)}
					</div>

					{/* Botão Submit */}
					<div className="flex justify-center pt-3">
						<button
							type="submit"
							disabled={!categoriaSelecionado || isLoading}
							className="flex justify-center rounded disabled:bg-slate-200 bg-red-600 
                    hover:bg-red-900 text-white font-bold w-1/2 mx-auto py-2"
						>
							{isLoading ? (
								<ClipLoader color="#991b1b" size={24} />
							) : isEditing ? (
								"Atualizar"
							) : (
								"Cadastrar"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormProduto