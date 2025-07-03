import documentosColecao from "./dbConnect.js";

//encontra o documento na lista de documentos
function encontrarDocumento(nome) {
  return documentosColecao.findOne({ nome: nome });
}

function updateDocumento(nomeDocumento, texto) {
  return documentosColecao.updateOne(
    { nome: nomeDocumento },
    { $set: { texto: texto } }
  );
}

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

export {
  encontrarDocumento,
  updateDocumento,
  encontraTodosDocumentos,
  adicionarDocumento,
};
