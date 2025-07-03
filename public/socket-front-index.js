import { adicionarDocumento } from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    adicionarDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nomeDocumento) {
  socket.emit("adicionar_documento", nomeDocumento);
}

socket.on("adicionar_documento_interface", (nomeDocumento) => {
  adicionarDocumento(nomeDocumento);
});

export { emitirAdicionarDocumento };
