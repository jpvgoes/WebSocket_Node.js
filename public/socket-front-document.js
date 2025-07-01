//codigo que se comunica com o socket -  camada intermediária

import { atualizaTextoEditor } from "./documento.js";

const socket = io("ws://localhost:3000");

function selecionarDocumento(nomeDocumento) {
  socket.emit("selecionar_documento", nomeDocumento, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

socket.on("disconnect", (motivo) => {
  console.log(`Servidor desconectado!
  Motivo: ${motivo}`);
});

export { emitirTextoEditor, selecionarDocumento };
