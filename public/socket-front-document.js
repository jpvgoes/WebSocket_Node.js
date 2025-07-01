//codigo que se comunica com o socket -  camada intermediária

import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nomeDocumento) {
  socket.emit("selecionar_documento", nomeDocumento);
}

function emitirTextoEditor(texto, nomeDocumento) {
  socket.emit("texto_editor", texto, nomeDocumento);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

export { emitirTextoEditor, selecionarDocumento };
