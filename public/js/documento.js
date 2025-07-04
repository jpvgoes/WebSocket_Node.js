//código que interage com o html - camda mais externa

import {
  emitirDeletarDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-document.js";

const parametrosUrl = new URLSearchParams(window.location.search); // pega os parametros da url
const nomeDocumento = parametrosUrl.get("nome");
const tituloDocumento = document.getElementById("titulo-documento");
const textoEditor = document.getElementById("editor-texto"); // pega elemento do html
const botaoexcluir = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";
selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
  // adiciona um evento ao elemento
  emitirTextoEditor({ texto: textoEditor.value, nomeDocumento });
});

botaoexcluir.addEventListener("click", (e) => {
  if (
    confirm(`Tem certeza de que deseja excluir o documento ${nomeDocumento}?`)
  ) {
    emitirDeletarDocumento(nomeDocumento);
  }
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluido com sucesso`);
    window.location.href = "/";
  }
}

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export { atualizaTextoEditor, alertarERedirecionar };
