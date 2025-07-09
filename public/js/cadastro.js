import { cadastrarUsuario } from "./socket-front-cadastro.js";

const formulario = document.getElementById("form-cadastro");
const usuarioInput = document.getElementById("input-usuario");
const senhaInput = document.getElementById("input-senha");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = usuarioInput.value;
  const senha = senhaInput.value;

  cadastrarUsuario({ usuario, senha });
});
