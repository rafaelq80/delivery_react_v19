import type Produto from '../models/Produto'

/**
 * Valida um campo individual do formulário de produto
 * @param name - Nome do campo a ser validado
 * @param value - Valor do campo
 * @returns String com mensagem de erro ou string vazia se válido
 */
export function validarCampoProduto(name: string, value: string): string {
	switch (name) {
		case "nome":
			if (!value.trim()) return "Nome do produto é obrigatório"
			if (value.length < 3) return "Nome deve ter pelo menos 3 caracteres"
			if (value.length > 100) return "Nome não pode exceder 100 caracteres"
			return ""

		case "preco":
			if (!value.trim()) return "Preço é obrigatório"
			const preco = parseFloat(value)
			if (isNaN(preco)) return "Preço deve ser um número válido"
			if (preco <= 0) return "Preço deve ser maior que zero"
			return ""

		case "foto":
			if (!value.trim()) return "Foto é obrigatória"
			try {
				new URL(value)
				return ""
			} catch {
				return "URL da foto inválida"
			}

		case "categoria":
			if (!value || value === "0") return "Categoria é obrigatória"
			return ""

		default:
			return ""
	}
}

/**
 * Valida todo o formulário de produto
 * @param produto - Objeto produto com os dados do formulário
 * @returns Objeto com erros por campo (vazio se não houver erros)
 */
export function validarFormularioProduto(produto: Produto): Record<string, string> {
	const erros: Record<string, string> = {}

	erros.nome = validarCampoProduto("nome", produto.nome || "")
	erros.preco = validarCampoProduto("preco", produto.preco?.toString() || "")
	erros.foto = validarCampoProduto("foto", produto.foto || "")
	erros.categoria = validarCampoProduto("categoria", produto.categoria?.id?.toString() || "")

	// Remove campos sem erro
	Object.keys(erros).forEach(key => {
		if (erros[key] === "") delete erros[key]
	})

	return erros
}

/**
 * Verifica se o formulário tem algum erro
 * @param erros - Objeto com os erros do formulário
 * @returns true se não houver erros, false caso contrário
 */
export function formularioValido(erros: Record<string, string>): boolean {
	return Object.keys(erros).length === 0
}