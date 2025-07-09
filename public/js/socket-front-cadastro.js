const socket = io("ws://localhost:3000");

function cadastrarUsuario(dados) {
  socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () => {
  alert("Usuário cadastrado com sucesso!");
});

socket.on("cadastro_erro", (Erro) => {
  alert(Erro);
});

export { cadastrarUsuario };
