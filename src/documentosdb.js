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

export { encontrarDocumento, updateDocumento };
