import e from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { text } from "stream/consumers";

const app = e();

const PORT = 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

// console.log(diretorioPublico);
app.use(e.static(diretorioPublico));

const servidorHttp = http.createServer(app);

servidorHttp.listen(3000, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});

const io = new Server(servidorHttp);

io.on("connection", (socket) => {
  console.log("Um cliente se conectou com o ID:", socket.id);
});
