import CatalogoProdutos from '../../components/catalogoprodutos/CatalogoProdutos'
import ListarProdutosSaudaveis from '../../components/produtos/listarprodutossaudaveis/ListarProdutosSaudaveis'
import ModalProduto from '../../components/produtos/modalproduto/ModalProduto'

function Home() {
	return (
		<>
			{/* HERO */}
			<section className="min-h-[88vh] bg-white flex items-center relative overflow-hidden">

				{/* Faixa decorativa no topo */}
				<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-600 via-yellow-400 to-red-600" />

				{/* Gradiente de fundo */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_100%_50%,rgba(220,38,38,0.07),transparent)] pointer-events-none" />

				<div className="container mx-auto px-8 lg:px-16">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

						{/* Coluna Esquerda */}
						<div className="pt-12">

							{/* Label */}
							<div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-6">
								<span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
								<span className="text-xs font-medium tracking-widest uppercase text-red-600">
									Delivery & Alimentação Saudável
								</span>
							</div>

							{/* Título */}
							<h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
								Seu prato{' '}
								<span className="italic text-red-600 relative inline-block">
									favorito
									<span className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-linear-to-r from-yellow-400 to-red-600 rounded-full" />
								</span>
								,<br />
								a qualquer hora
							</h1>

							{/* Subtítulo */}
							<p className="text-lg text-gray-500 font-light leading-relaxed max-w-md mb-10">
								Refeições saborosas entregues na sua porta.
								Descubra produtos e visualize 
								o NutriScore do que você consome.
							</p>

							{/* CTA */}
							<div className="flex items-center">
								<ModalProduto />
							</div>

							{/* Stats */}
							<div className="flex gap-10 mt-12 pt-8 border-t border-gray-100">
								<div className='flex flex-col items-center'>
									<p className="text-3xl font-black text-red-600 leading-none mb-1">500+</p>
									<p className="text-xs tracking-widest uppercase text-gray-400">Pratos disponíveis</p>
								</div>
								<div className='flex flex-col items-center'>
									<p className="text-3xl font-black text-red-600 leading-none mb-1">98%</p>
									<p className="text-xs tracking-widest uppercase text-gray-400">Satisfação</p>
								</div>
								<div className='flex flex-col items-center'>
									<p className="text-3xl font-black text-red-600 leading-none mb-1">A–E</p>
									<p className="text-xs tracking-widest uppercase text-gray-400">NutriScore</p>
								</div>
							</div>
						</div>

						{/* Coluna Direita — Imagem */}
						<div className="flex justify-center items-center py-12">
							<div className="relative flex justify-center items-center">

								{/* Círculo externo pontilhado */}
								<div className="absolute w-130 h-130 rounded-full border border-dashed border-red-200 animate-spin" style={{ animationDuration: '30s' }} />

								{/* Círculo interno */}
								<div className="absolute w-115 h-115 rounded-full border border-red-100 bg-linear-to-br from-red-50 to-yellow-50" />

								{/* Imagem circular */}
								<div className="relative z-10 w-95 h-95 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-red-100">
									<img
										src="https://ik.imagekit.io/vzr6ryejm/food/home.png?updatedAt=1729652804741"
										alt="Prato em destaque"
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
									/>
								</div>

								{/* Badge 1 */}
								<div className="absolute top-[1%] right-[-4%] z-20 flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-lg shadow-black/10 animate-bounce" style={{ animationDuration: '3s' }}>
									<span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
									<span className="text-xs font-semibold text-gray-800 whitespace-nowrap">Alimentação Saudável</span>
								</div>

								{/* Badge 2 */}
								<div className="absolute bottom-[12%] left-[-4%] z-20 flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-lg shadow-black/10 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
									<span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
									<span className="text-xs font-semibold text-gray-800 whitespace-nowrap">Entrega Rápida</span>
								</div>

								{/* Pontos decorativos */}
								<div className="absolute top-[10%] -left-3 grid grid-cols-4 gap-2 opacity-20">
									{Array.from({ length: 16 }).map((_, i) => (
										<div key={i} className="w-1 h-1 rounded-full bg-red-600" />
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
					<div className="w-px h-8 bg-linear-to-b from-red-500 to-transparent animate-pulse" />
					<span className="text-[10px] tracking-widest uppercase text-gray-300">scroll</span>
				</div>
			</section>

			<CatalogoProdutos />

			<div className="pb-12">
				<ListarProdutosSaudaveis />
			</div>
		</>
	)
}

export default Home