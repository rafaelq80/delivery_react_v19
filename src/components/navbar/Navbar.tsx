import { MagnifyingGlassIcon, BellIcon, ListIcon } from "@phosphor-icons/react";
import { type ReactNode, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    handleLogout();
    ToastAlerta("Usuário desconectado!", "info");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <header className="w-full bg-red-600 text-white shadow-lg shadow-red-900/20 sticky top-0 z-50">

        {/* Faixa superior decorativa */}
        <div className="h-0.5 w-full bg-linear-to-r from-red-700 via-yellow-400 to-red-700" />

        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            <Link
              to="/home"
              className="shrink-0 transition-all duration-300 hover:scale-105 hover:brightness-110"
            >
              <img
                src="https://ik.imagekit.io/vzr6ryejm/food/logo_food_delivery_3.png"
                alt="Logo"
                className="h-9 w-auto"
              />
            </Link>

            {/* Barra de Pesquisa */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative flex items-center">
                <input
                  className="w-full h-10 rounded-full pl-5 pr-12 bg-white text-red-600 placeholder-black border border-white focus:outline-none focus:bg-white focus:border-white transition-all duration-300 text-sm"
                  type="search"
                  placeholder="Pesquisar produto..."
                  id="busca"
                  name="busca"
                />
                <button
                  type="button"
                  className="absolute right-1.5 bg-yellow-400 hover:bg-yellow-300 rounded-full w-7 h-7 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                >
                  <MagnifyingGlassIcon size={15} weight="bold" className="text-red-700" />
                </button>
              </div>
            </div>

            {/* Nav Links — Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { to: "/produtos", label: "Produtos" },
                { to: "/categorias", label: "Categorias" },
                { to: "/cadastrarcategoria", label: "Cadastrar Categoria" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="relative px-3 py-1.5 text-sm font-medium text-white/85 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  {label}
                  <span className="absolute bottom-0.5 left-3 right-3 h-px bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
              ))}

              <button
                onClick={logout}
                className="px-3 py-1.5 text-sm font-medium text-white/85 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Sair
              </button>
            </nav>

            {/* Avatar + Ícones */}
            <div className="flex items-center gap-3 shrink-0">

              {/* Notificação */}
              <button className="hidden md:flex relative w-9 h-9 items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200">
                <BellIcon size={20} weight="bold" className="text-white/80" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full border border-red-600" />
              </button>

              {/* Divider */}
              <div className="hidden md:block w-px h-6 bg-white/20" />

              {/* Avatar */}
              <Link to="/perfil" className="group flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={usuario.foto}
                    alt={usuario.nome}
                    className="w-9 h-9 rounded-full object-cover border-2 border-yellow-400/70 group-hover:border-yellow-400 group-hover:scale-105 transition-all duration-300 shadow-md"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-red-600" />
                </div>
                <div className="hidden xl:block">
                  <p className="text-xs font-semibold text-white leading-none">{usuario.nome?.split(' ')[0]}</p>
                  <p className="text-[12px] text-yellow-200 mt-0.5">Ver perfil</p>
                </div>
              </Link>

              {/* Menu mobile */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                <ListIcon size={20} weight="bold" className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-red-700">
            <div className="container mx-auto px-6 py-3 flex flex-col gap-1">
              <div className="relative flex items-center mb-2">
                <input
                  className="w-full h-9 rounded-full pl-4 pr-10 bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:bg-white/20 text-sm"
                  type="search"
                  placeholder="Pesquisar produto..."
                />
                <button className="absolute right-1.5 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center">
                  <MagnifyingGlassIcon size={13} weight="bold" className="text-red-700" />
                </button>
              </div>
              {[
                { to: "/produtos", label: "Produtos" },
                { to: "/categorias", label: "Categorias" },
                { to: "/cadastrarcategoria", label: "Cadastrar Categoria" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={logout}
                className="px-3 py-2 text-sm text-white/85 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-left"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </header>
    );
  }

  return <>{component}</>;
}

export default Navbar;