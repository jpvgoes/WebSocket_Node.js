import "./socket-front-index.js"; //quando a pessoa entra no index.html ela ativa esse script que ativa esse arquivo que busca os documentos do servidor
import { emitirAdicionarDocumento } from "./socket-front-index.js";
import { excluirCookie, obterCookies } from "./utils/cookies.js";

const tokenJwt = obterCookies("tokenJwt");
console.log(tokenJwt);

const listaDocumentos = document.getElementById("lista-documentos");
const botaoAdicionar = document.getElementById("botao-adicionar");
const botaoLogout = document.getElementById("botao-logout");
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

botaoLogout.addEventListener("click", (e) => {
  excluirCookie("tokenJwt");
  alert("Usuário deslogado com sucesso!");
  window.location.href = "/login/index.html";
});

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
