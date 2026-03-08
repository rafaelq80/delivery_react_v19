import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
    id: number;
    nome: string;
    preco: number;
    nutriscore: string;
    foto: string;
    categoria: Categoria;
    usuario: Usuario;
}