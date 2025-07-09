import { usuariosColecao } from "./dbConnect.js";

function encontrar_usuario(usuario) {
  return usuariosColecao.findOne({ usuario: usuario });
}

function cadastrar_usuario({ usuario, senha }) {
  return usuariosColecao.insertOne({ usuario, senha });
}

export { cadastrar_usuario, encontrar_usuario };
