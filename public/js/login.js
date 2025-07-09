import { loginUsuario } from "./socket-front-login.js";

const formulario = document.getElementById("form-login");
const usuarioInput = document.getElementById("input-usuario");
const senhaInput = document.getElementById("input-senha");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = usuarioInput.value;
  const senha = senhaInput.value;

  loginUsuario({ usuario, senha });
});
