import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou com o ID:", socket.id);

  socket.on("texto_editor", (texto) => {
    //console.log("Texto recebido: ", texto);
    socket.broadcast.emit("texto_editor_clientes", texto);
  });
});
