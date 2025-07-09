import { documentosColecao } from "./dbConnect.js";

//encontra o documento na lista de documentos
function encontrarDocumento(nome) {
  return documentosColecao.findOne({ nome: nome });
}

//update no documento
function updateDocumento(nomeDocumento, texto) {
  return documentosColecao.updateOne(
    { nome: nomeDocumento },
    { $set: { texto: texto } }
  );
}

//encontra todos os documentos
function encontraTodosDocumentos() {
  return documentosColecao.find({}).toArray();
}

//adicionar documento
function adicionarDocumento(nomeDocumento) {
  return documentosColecao.insertOne({
    nome: nomeDocumento,
    texto: "",
  });
}

function deletaDocumento(nomeDocumento) {
  return documentosColecao.deleteOne({ nome: nomeDocumento });
}

export {
  encontrarDocumento,
  updateDocumento,
  encontraTodosDocumentos,
  adicionarDocumento,
  deletaDocumento,
};
