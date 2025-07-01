//código que interage com o servidor - camada mais interna

import io from "./servidor.js";

const documentos = [
  {
    nome: "JavaScript",
    texto: "texto de javascript...",
  },
  {
    nome: "Node",
    texto: "texto de node...",
  },
  {
    nome: "Socket.io",
    texto: "texto de socket.io...",
  },
];

io.on("connection", (socket) => {
  console.log("Um cliente se conectou com o ID:", socket.id);

  //socket para selecionar o documento e enviar o texto para o cliente
  socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento); //o cliente entra na sala com nome do documento
    const documento = encontrarDocumento(nomeDocumento);
    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  //socket para receber o texto do editor e enviar para os outros clientes conectados
  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    const documento = encontrarDocumento(nomeDocumento);

    if (documento) {
      documento.texto = texto;
    }

    socket.to(nomeDocumento).emit("texto_editor_clientes", texto); // se a sala for JavaScript, envia o texto para todos os clientes conectados a essa sala
  });

  //socket para desconexão
  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

//encontra o documento na lista de documentos
function encontrarDocumento(nome) {
  const documento = documentos.find((documento) => {
    return documento.nome === nome;
  });

  return documento;
}
