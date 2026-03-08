import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import DeletarCategoria from "./components/categorias/deletarcategoria/DeletarCategoria"
import FormCategoria from "./components/categorias/formcategoria/FormCategoria"
import ListarCategorias from "./components/categorias/listarcategorias/ListarCategorias"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto"
import FormProduto from "./components/produtos/formproduto/FormProduto"
import ListarProdutos from "./components/produtos/listarprodutos/ListarProdutos"
import ListarProdutosSaudaveis from "./components/produtos/listarprodutossaudaveis/ListarProdutosSaudaveis"
import { AuthProvider } from "./contexts/AuthContext"
import Cadastro from "./pages/cadastro/Cadastro"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Perfil from "./pages/perfil/Perfil"

function App() {
	return (
		<>
			<AuthProvider>
				<ToastContainer />
				<BrowserRouter>
					<Navbar />
					<div className="min-h-[80vh] bg-slate-100">
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/home" element={<Home />} />
							<Route path="/cadastro" element={<Cadastro />} />
							<Route path="/Login" element={<Login />} />
							<Route path="/categorias" element={<ListarCategorias />} />
							<Route path="/cadastrarcategoria" element={<FormCategoria />} />
							<Route path="/atualizarcategoria/:id" element={<FormCategoria />} />
							<Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
							<Route path="/produtos" element={<ListarProdutos />} />
							<Route path="/cadatrarproduto" element={<FormProduto />} />
							<Route path="/atualizarproduto/:id" element={<FormProduto />} />
							<Route path="/deletarproduto/:id" element={<DeletarProduto />} />
							<Route
								path="/produtossaudaveis"
								element={<ListarProdutosSaudaveis />}
							/>
							<Route path="/Perfil" element={<Perfil />} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

export default App
