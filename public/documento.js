//código que interage com o html - camda mais externa

import {
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-document.js";

const parametrosUrl = new URLSearchParams(window.location.search); // pega os parametros da url
const nomeDocumento = parametrosUrl.get("nome");
const tituloDocumento = document.getElementById("titulo-documento");
const textoEditor = document.getElementById("editor-texto"); // pega elemento do html

tituloDocumento.textContent = nomeDocumento || "Documento sem título";
selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
  // adiciona um evento ao elemento
  emitirTextoEditor(textoEditor.value, nomeDocumento);
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export { atualizaTextoEditor };
