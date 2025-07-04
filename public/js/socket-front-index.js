import { adicionarDocumento, removerLinkDocumento } from "./index.js";

const socket = io();

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    adicionarDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nomeDocumento) {
  socket.emit("adicionar_documento", nomeDocumento);
}

socket.on("documento_existente", (nomeDocumento) => {
  alert(`Documento com o nome "${nomeDocumento}" já existe.`);
});

socket.on("adicionar_documento_interface", (nomeDocumento) => {
  adicionarDocumento(nomeDocumento);
});

socket.on("documento_excluir_sucesso", (nomeDocumento) => {
  removerLinkDocumento(nomeDocumento);
});

export { emitirAdicionarDocumento };
