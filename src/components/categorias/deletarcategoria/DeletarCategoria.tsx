import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import { deletar, listar } from "../../../services/Services";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type Categoria from "../../../models/Categoria";

function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState(false);

  const { usuario, handleLogout, isLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Categoria não encontrada!", "erro");
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

  async function deletarCategoria() {
    setIsLoading(true);
    try {
      await deletar(`/categorias/${id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Categoria apagada com sucesso!", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao excluir a categoria!", "erro");
        retornar();
      }
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl text-center my-4">
          Excluir Categoria
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Tem certeza que deseja remover esta categoria?
          Esta ação não pode ser desfeita.
        </p>

        {/* Card da Categoria */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 mb-8">
          <p className="text-black text-sm font-semibold mb-2">
            Categoria a ser removida:
          </p>
          <p className="text-black text-2xl font-bold break-words">
            {categoria.descricao || 'Carregando...'}
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
            onClick={deletarCategoria}
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

export default DeletarCategoria;