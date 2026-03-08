import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { deletar, listar } from "../../../services/Services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Produto from "../../../models/Produto";

function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto>({} as Produto);
  const [isLoading, setIsLoading] = useState(false);

  const { usuario, handleLogout, isLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar o produto!", "erro");
        retornar();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      if (!isLogout) ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id) buscarPorId(id);
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);
    try {
      await deletar(`/produtos/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Produto excluído com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao excluir o produto!", "erro");
      }
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  function retornar() {
    navigate("/produtos");
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl text-center my-4">
          Excluir Produto
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Tem certeza que deseja remover este produto?
          Esta ação não pode ser desfeita.
        </p>

        {/* Card do Produto */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 mb-8">
          <p className="text-black text-sm font-semibold mb-2">
            Produto a ser removido:
          </p>
          <p className="text-black text-2xl font-bold break-words">
            {produto.nome || 'Carregando...'}
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={retornar}
            className="flex-1 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg transition duration-200"
          >
            Não
          </button>

          <button
            type="button"
            onClick={deletarProduto}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition duration-200 h-12"
          >
            {isLoading ? (
              <ClipLoader
                color="#ffffff"
                size={24}
              />
            ) : (
              <span>Sim, Excluir</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;