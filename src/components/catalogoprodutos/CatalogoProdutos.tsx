import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import AuthContext from "../../contexts/AuthContext";
import { listar } from "../../services/Services";
import { ToastAlerta } from "../../utils/ToastAlerta";
import CardProdutos from "../produtos/cardprodutos/CardProdutos";

import type Categoria from "../../models/Categoria";
import type Produto from "../../models/Produto";

function CatalogoProdutos() {
  const navigate = useNavigate();
  const { usuario, handleLogout, isLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Busca categorias e produtos
  async function carregarDados() {
    try {
      setIsLoading(true);
      await listar("/categorias", setCategorias, { headers: { Authorization: token } });
      await listar("/produtos", setProdutos, { headers: { Authorization: token } });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        setError("Erro ao buscar dados");
        ToastAlerta("Erro ao buscar os dados", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // 🔹 Redireciona se não houver login
  useEffect(() => {
    if (!token) {
      if (!isLogout) ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    } else {
      carregarDados();
    }
  }, [token]);

  // 🔹 Filtra produtos pela categoria
  const produtosFiltrados =
    categoriaSelecionada === null
      ? produtos
      : produtos.filter((p) => p.categoria?.id === categoriaSelecionada);

  // 🔹 Ordena pelo NutriScore
  const ordenarPorNutriscore = (lista: Produto[]) => {
    const ordem: Record<string, number> = { A: 1, B: 2, C: 3, D: 4, E: 5 };
    return [...lista].sort((a, b) => {
      const aKey = (a.nutriscore ?? "E") as string;
      const bKey = (b.nutriscore ?? "E") as string;
      return (ordem[aKey] ?? 6) - (ordem[bKey] ?? 6);
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* 🔸 Cabeçalho de categorias */}
      <div className="relative bg-linear-to-r from-red-500 via-red-600 to-rose-600 shadow-xl overflow-hidden">
        {/* Efeitos decorativos no header */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-8">
          

          {/* Botões de categorias */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCategoriaSelecionada(null)}
              className={`group relative w-28 h-28 rounded-2xl font-semibold transition-all duration-300 overflow-hidden
              ${
                categoriaSelecionada === null
                  ? "bg-white text-red-600 shadow-2xl scale-110 ring-4 ring-red-300"
                  : "bg-white/90 text-red-700 hover:bg-white hover:shadow-xl hover:scale-105"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-red-50 to-rose-50 opacity-50" />
              <div className="relative flex flex-col items-center justify-center h-full gap-2">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="text-sm font-bold">Todos</span>
              </div>
              {categoriaSelecionada === null && (
                <div className="absolute inset-0 border-2 border-red-400 rounded-2xl animate-pulse" />
              )}
            </button>

            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSelecionada(cat.id)}
                className={`group relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 overflow-hidden
                ${
                  categoriaSelecionada === cat.id
                    ? "bg-white text-red-600 shadow-2xl scale-110 ring-4 ring-red-300"
                    : "bg-white/90 text-red-700 hover:bg-white hover:shadow-xl hover:scale-105"
                }`}
              >
                <div className="absolute inset-0 bg-linear-to-br from-red-50 to-rose-50 opacity-50" />
                <div className="relative flex flex-col items-center justify-center gap-2">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110 
                    ${categoriaSelecionada === cat.id ? 'bg-red-100' : 'bg-red-50'}`}>
                    <img 
                      src={cat.icone} 
                      alt={cat.descricao} 
                      className="w-10 h-10 object-contain filter drop-shadow-md" 
                    />
                  </div>
                  <p className="text-sm font-bold text-center px-1 leading-tight">{cat.descricao}</p>
                </div>
                {categoriaSelecionada === cat.id && (
                  <div className="absolute inset-0 border-2 border-red-400 rounded-2xl animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔸 Conteúdo */}
      <div className="container mx-auto px-8 py-12">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="mb-6">
              <SyncLoader color="#ef4444" size={20} />
            </div>
            <p className="text-gray-600 text-lg font-medium animate-pulse">Carregando produtos...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-center text-red-600 text-xl font-semibold">{error}</p>
            <p className="text-gray-500 mt-2">Tente novamente mais tarde</p>
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-center text-gray-700 text-2xl font-bold mb-2">
              Nenhum produto encontrado
            </p>
            <p className="text-gray-500 text-lg">
              {categoriaSelecionada !== null ? "Tente selecionar outra categoria" : "Adicione produtos ao catálogo"}
            </p>
          </div>
        ) : (
          <>
            {/* Header dos resultados */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {categoriaSelecionada === null ? "Todos os Produtos" : categorias.find(c => c.id === categoriaSelecionada)?.descricao}
                </h3>
                <p className="text-gray-600 mt-1">
                  {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
              </div>
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {ordenarPorNutriscore(produtosFiltrados).map((produto) => (
                <CardProdutos key={produto.id} produto={produto} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CatalogoProdutos;