//código que interage com o servidor - camada mais interna

import { encontrarDocumento, updateDocumento } from "./documentosdb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou com o ID:", socket.id);

  //socket para selecionar o documento e enviar o texto para o cliente
  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento); //o cliente entra na sala com nome do documento
    const documento = await encontrarDocumento(nomeDocumento);
    console.log(documento);
    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  //socket para receber o texto do editor e enviar para os outros clientes conectados
  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await updateDocumento(nomeDocumento, texto);
    console.log(atualizacao);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto); // se a sala for JavaScript, envia o texto para todos os clientes conectados a essa sala
    }
  });

  //socket para desconexão
  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
