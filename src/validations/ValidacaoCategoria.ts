import type Categoria from '../models/Categoria'

/**
 * Valida um campo individual do formulário de categoria
 * @param name - Nome do campo a ser validado
 * @param value - Valor do campo
 * @returns String com mensagem de erro ou string vazia se válido
 */
export function validarCampoCategoria(name: string, value: string): string {
	switch (name) {
		case "descricao":
			if (!value.trim()) return "Descrição da categoria é obrigatória"
			if (value.length < 3) return "Descrição deve ter pelo menos 3 caracteres"
			if (value.length > 100) return "Descrição não pode exceder 100 caracteres"
			return ""

		case "icone":
			if (!value.trim()) return "Foto é obrigatória"
			try {
				new URL(value)
				return ""
			} catch {
				return "URL do ícone inválida"
			}

		default:
			return ""
	}
}

/**
 * Valida todo o formulário de categoria
 * @param categoria - Objeto categoria com os dados do formulário
 * @returns Objeto com erros por campo (vazio se não houver erros)
 */
export function validarFormularioCategoria(categoria: Categoria): Record<string, string> {
	const erros: Record<string, string> = {}

	erros.descricao = validarCampoCategoria("descricao", categoria.descricao || "")
	erros.icone = validarCampoCategoria("icone", categoria.icone || "")

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