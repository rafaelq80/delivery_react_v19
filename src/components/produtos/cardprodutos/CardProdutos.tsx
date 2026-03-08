import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type Produto from '../../../models/Produto'
import { formatarMoeda } from '../../../utils/FormatarMoeda'

interface CardProdutoProps {
	produto: Produto
}

function CardProdutos({ produto }: CardProdutoProps) {
	return (
		<div className="group relative flex flex-col rounded-2xl overflow-hidden justify-between bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
			{/* Action Bar */}
			<div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 bg-gradient-to-b from-black/30 to-transparent">
				<div className="flex gap-2">
					<Link to={`/atualizarproduto/${produto.id}`}>
						<div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-200 shadow-md">
							<PencilIcon size={20} weight="duotone" />
						</div>
					</Link>

					<Link to={`/deletarproduto/${produto.id}`}>
						<div className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md">
							<TrashIcon size={20} weight="duotone" />
						</div>
					</Link>
				</div>

				<button 
					onClick={() => console.log('curtir')}
					className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 hover:bg-white transition-all duration-200 shadow-md group/like"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						fill="#ff0000"
						viewBox="0 0 256 256"
						className="h-5 w-5 fill-red-500 group-hover/like:fill-red-600 group-hover/like:scale-110 transition-all"
					>
						<path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
					</svg>
					<span className="text-sm font-semibold text-gray-700">00</span>
				</button>
			</div>

			{/* Image Container */}
			<div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
				<img
					src={produto.foto}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					alt={produto.nome}
				/>
				
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			{/* Content */}
			<div className="flex flex-col p-5">
				{/* Product Name */}
				<div className="min-h-12 flex items-center justify-center mb-3">
					<h2 className="text-base font-semibold text-gray-800 text-center uppercase tracking-wide line-clamp-2">
						{produto.nome}
					</h2>
				</div>

				{/* Price */}
				<div className="mb-4">
					<h3 className="text-3xl text-center font-bold text-gray-900 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text">
						{formatarMoeda(produto.preco)}
					</h3>
				</div>

				{/* Nutri-Score */}
				<div className="mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-inner">
					<div className="flex items-center gap-2 mb-2">
						<div className="w-2 h-2 rounded-full bg-red-500" />
						<h6 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
							Classificação Nutri-Score
						</h6>
					</div>
					<div
						className={`text-sm font-bold p-3 rounded-lg text-center shadow-md transition-all hover:scale-105 ${
							produto.nutriscore === 'A'
								? 'bg-gradient-to-r from-green-900 to-green-800 text-white'
								: produto.nutriscore === 'B'
								? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
								: produto.nutriscore === 'C'
								? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
								: produto.nutriscore === 'D'
								? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
								: produto.nutriscore === 'E'
								? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
								: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
						}`}
					>
						{produto.nutriscore === 'A'
							? 'A - Muito Saudável'
							: produto.nutriscore === 'B'
							? 'B - Saudável'
							: produto.nutriscore === 'C'
							? 'C - Moderado'
							: produto.nutriscore === 'D'
							? 'D - Pouco Saudável'
							: produto.nutriscore === 'E'
							? 'E - Não Saudável'
							: 'Não Classificado'}
					</div>
				</div>

				{/* Category */}
				{produto.categoria && (
					<div className="flex items-center justify-center gap-2 mb-4">
						<div className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full border border-gray-300">
							<p className="text-xs font-medium text-gray-700">
								<span className="text-gray-500">Categoria:</span>{' '}
								<span className="font-semibold">{produto.categoria?.descricao}</span>
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Buy Button */}
			<button
				className="w-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 font-bold text-base py-4 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
				onClick={() => console.log('Comprar')}
			>
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					className="h-5 w-5 group-hover/btn:scale-110 transition-transform" 
					viewBox="0 0 20 20" 
					fill="currentColor"
				>
					<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
				</svg>
				<span>Comprar Agora</span>
			</button>

			{/* Hover Border Effect */}
			<div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-200 transition-colors pointer-events-none" />
		</div>
	)
}

export default CardProdutos