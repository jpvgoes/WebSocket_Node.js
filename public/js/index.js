import "./socket-front-index.js"; //quando a pessoa entra no index.html ela ativa esse script que ativa esse arquivo que busca os documentos do servidor
import { emitirAdicionarDocumento } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const botaoAdicionar = document.getElementById("botao-adicionar");
const inputNomeDocumento = document.getElementById("input-documento");

function adicionarDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `
    <a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action" id="documento-${nomeDocumento}">
    ${nomeDocumento}
    </a>
    `;
}
function removerLinkDocumento(nomeDocumento) {
  const documento = document.getElementById(`documento-${nomeDocumento}`);
  listaDocumentos.removeChild(documento);
}

// ou submit se fosse o formulário
botaoAdicionar.addEventListener("click", function (e) {
  e.preventDefault();
  const nomeDocumento = inputNomeDocumento.value;
  if (nomeDocumento) {
    emitirAdicionarDocumento(nomeDocumento);
    inputNomeDocumento.value = "";
  }
});

export { adicionarDocumento, removerLinkDocumento };
