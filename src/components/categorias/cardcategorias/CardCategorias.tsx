import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'

interface CardCategoriaProps {
	categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriaProps) {
	return (
		<div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-2">
			{/* Gradient Header with animated background */}
			<div className="relative h-20 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 overflow-hidden">
				{/* Animated decorative elements */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
				<div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
				<div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
				
				{/* Header content */}
				<div className="relative h-full flex items-center justify-between px-6">
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 bg-white rounded-full animate-pulse" />
						<h3 className="text-white font-bold text-lg tracking-wide drop-shadow-lg uppercase">
							Categoria
						</h3>
					</div>
					<div className="flex gap-1">
						<div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
						<div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
						<div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-6">
				<div className="flex items-center gap-4 mb-6">
					{/* Icon Display with glow effect */}
					<div className="relative flex-shrink-0">
						<div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
						<div className="relative w-20 h-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl flex items-center justify-center shadow-lg border-2 border-amber-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
							{categoria.icone ? (
								typeof categoria.icone === 'string' && categoria.icone.startsWith('http') ? (
									<img
										src={categoria.icone}
										alt={`Ícone da Categoria ${categoria.descricao}`}
										className="w-12 h-12 object-contain"
									/>
								) : (
									<span className="text-4xl filter drop-shadow-md">{categoria.icone}</span>
								)
							) : (
								<span className="text-4xl filter drop-shadow-md">📁</span>
							)}
						</div>
					</div>

					{/* Description */}
					<div className="flex-1 min-w-0">
						<p className="text-2xl font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
							{categoria.descricao}
						</p>
						<div className="flex items-center gap-2 mt-2">
							<div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
							<p className="text-sm text-gray-500 font-medium">
								ID: {categoria.id}
							</p>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

				{/* Action Buttons */}
				<div className="flex gap-3">
					<Link
						to={`/atualizarcategoria/${categoria.id}`}
						className="flex-1"
					>
						<button className="relative w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 overflow-hidden group/btn">
							<span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
							<span className="relative flex items-center justify-center gap-2">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								Editar
							</span>
						</button>
					</Link>

					<Link
						to={`/deletarcategoria/${categoria.id}`}
						className="flex-1"
					>
						<button className="relative w-full px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 overflow-hidden group/btn">
							<span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
							<span className="relative flex items-center justify-center gap-2">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
								Deletar
							</span>
						</button>
					</Link>
				</div>
			</div>

			{/* Hover effect border with gradient */}
			<div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-300 transition-all pointer-events-none" />
			
			{/* Corner accent */}
			<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
		</div>
	)
}

export default CardCategorias