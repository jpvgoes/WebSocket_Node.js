//código que interage com o servidor - camada mais interna
// obs: depois criar pastas de operações de socket para documentos e usuarios

import {
  adicionarDocumento,
  deletaDocumento,
  encontrarDocumento,
  encontraTodosDocumentos,
  updateDocumento,
} from "./db/documentosdb.js";
import { cadastrar_usuario, encontrar_usuario } from "./db/usuariosdb.js";
import io from "./servidor.js";
import autenticarUsuario from "./utils/autenticarUsuario.js";
import gerarJwt from "./utils/gerarJwt.js";

io.on("connection", (socket) => {
  console.log("Um cliente se conectou com o ID:", socket.id);

  // (R)EAD
  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await encontraTodosDocumentos();

    console.log(documentos);
    devolverDocumentos(documentos);
  });

  // (C)REATE
  socket.on("adicionar_documento", async (nomeDocumento) => {
    const documentoExiste = await encontrarDocumento(nomeDocumento);

    if (documentoExiste) {
      console.log(`Documento ${nomeDocumento} já existe`);
      socket.emit("documento_existente", nomeDocumento);
      return;
    }

    const resultado = await adicionarDocumento(nomeDocumento);
    console.log(resultado);

    if (resultado.acknowledged) {
      io.emit("adicionar_documento_interface", nomeDocumento);
    }
  });

  // (R)EAD
  //socket para selecionar o documento e enviar o texto para o cliente
  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento); //o cliente entra na sala com nome do documento
    const documento = await encontrarDocumento(nomeDocumento);
    console.log(documento);
    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  // (U)PDATE
  //socket para receber o texto do editor e enviar para os outros clientes conectados
  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await updateDocumento(nomeDocumento, texto);
    console.log(atualizacao);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto); // se a sala for JavaScript, envia o texto para todos os clientes conectados a essa sala
    }
  });

  // (D)ELETE
  socket.on("excluir_documento", async (nomeDocumento) => {
    const resultado = await deletaDocumento(nomeDocumento);
    console.log(resultado);
    if (resultado.acknowledged) {
      io.emit("documento_excluir_sucesso", nomeDocumento);
    }
  });

  socket.on("cadastrar_usuario", async (dados) => {
    const usuarioExiste = await encontrar_usuario(dados.usuario);
    if (usuarioExiste) {
      socket.emit("cadastro_erro", "Usuário já existe");
      return;
    }
    const resultado = await cadastrar_usuario(dados);
    if (resultado.acknowledged) {
      socket.emit("cadastro_sucesso");
    } else {
      socket.emit("cadastro_erro", "Erro ao cadastrar usuário");
    }
  });

  socket.on("autenticar_usuario", async ({ usuario, senha }) => {
    const usuarioExiste = await encontrar_usuario(usuario);
    const autenticado = usuarioExiste
      ? autenticarUsuario(usuarioExiste, senha)
      : false;
    console.log(autenticado);
    if (autenticado) {
      const tokenJwt = gerarJwt(usuario);
      console.log(tokenJwt);
      socket.emit("autenticar_sucesso", tokenJwt);
    } else {
      socket.emit("autenticar_erro", "Erro ao autenticar usuário");
    }
  });

  //socket para desconexão
  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
