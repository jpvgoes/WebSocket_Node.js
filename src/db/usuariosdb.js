import { usuariosColecao } from "./dbConnect.js";
import criarHashESalSenha from "../utils/criarHashESalSenha.js";

function encontrar_usuario(usuario) {
  return usuariosColecao.findOne({ usuario: usuario });
}

function cadastrar_usuario({ usuario, senha }) {
  const { hash, sal } = criarHashESalSenha(senha);

  return usuariosColecao.insertOne({ usuario, hash, sal }); //
}

export { cadastrar_usuario, encontrar_usuario };
