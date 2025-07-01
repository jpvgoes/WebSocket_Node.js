//código que interage com o servidor - camada mais interna

import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou com o ID:", socket.id);

  socket.on("selecionar_documento", (nomeDocumento) => {
    console.log(nomeDocumento);
    socket.join(nomeDocumento); //o cliente entra na sala com nome do documento
  });

  socket.on("texto_editor", (texto, nomeDocumento) => {
    //console.log("Texto recebido: ", texto);
    //socket.broadcast.emit("texto_editor_clientes", texto);
    socket.to(nomeDocumento).emit("texto_editor_clientes", texto); // se a sala for JavaScript, envia o texto para todos os clientes conectados a essa sala
  });

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
