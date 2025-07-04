//codigo que se comunica com o socket -  camada intermediária

import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io("ws://localhost:3000");

function selecionarDocumento(nomeDocumento) {
  socket.emit("selecionar_documento", nomeDocumento, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

function emitirDeletarDocumento(nomeDocumento) {
  socket.emit("excluir_documento", nomeDocumento);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

socket.on("documento_excluir_sucesso", (nomeDocumento) => {
  alertarERedirecionar(nomeDocumento);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

export { emitirTextoEditor, selecionarDocumento, emitirDeletarDocumento };
