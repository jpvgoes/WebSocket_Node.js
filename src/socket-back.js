//código que interage com o servidor - camada mais interna

import {
  adicionarDocumento,
  deletaDocumento,
  encontrarDocumento,
  encontraTodosDocumentos,
  updateDocumento,
} from "./documentosdb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou com o ID:", socket.id);

  // (R)EAD
  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await encontraTodosDocumentos();

    console.log(documentos);
    devolverDocumentos(documentos);
  });

  // (C)REATE
  socket.on("adicionar_documento", async (nomeDocumento) => {
    const documentoExiste = await encontrarDocumento(nomeDocumento);

    if (documentoExiste) {
      console.log(`Documento ${nomeDocumento} já existe`);
      socket.emit("documento_existente", nomeDocumento);
      return;
    }

    const resultado = await adicionarDocumento(nomeDocumento);
    console.log(resultado);

    if (resultado.acknowledged) {
      io.emit("adicionar_documento_interface", nomeDocumento);
    }
  });

  // (R)EAD
  //socket para selecionar o documento e enviar o texto para o cliente
  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento); //o cliente entra na sala com nome do documento
    const documento = await encontrarDocumento(nomeDocumento);
    console.log(documento);
    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  // (U)PDATE
  //socket para receber o texto do editor e enviar para os outros clientes conectados
  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await updateDocumento(nomeDocumento, texto);
    console.log(atualizacao);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto); // se a sala for JavaScript, envia o texto para todos os clientes conectados a essa sala
    }
  });

  // (D)ELETE
  socket.on("excluir_documento", async (nomeDocumento) => {
    const resultado = await deletaDocumento(nomeDocumento);
    console.log(resultado);
    if (resultado.acknowledged) {
      io.emit("documento_excluir_sucesso", nomeDocumento);
    }
  });

  //socket para desconexão
  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
