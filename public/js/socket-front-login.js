import { definirCookie } from "./utils/cookies.js";

const socket = io("ws://localhost:3000");

function loginUsuario(dados) {
  socket.emit("autenticar_usuario", dados);
}
socket.on("autenticar_sucesso", (tokenJwt) => {
  definirCookie("tokenJwt", tokenJwt);
  alert("Usuário autenticado com sucesso!");
  window.location.href = "/";
});
socket.on("autenticar_erro", (Erro) => alert(Erro));

export { loginUsuario };
