import e from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = e();

const PORT = 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

// console.log(diretorioPublico);
app.use(e.static(diretorioPublico));

const servidorHttp = http.createServer(app);
const servidorHttp2 = http.createServer(app);

servidorHttp.listen(3000, () => {
  console.log(
    `Servidor escutando em http://localhost:${PORT}/login/index.html`
  );
});

servidorHttp2.listen(5000, () =>
  console.log(`Servidor escutando na porta 5000`)
);

const io = new Server(servidorHttp, {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:5001"],
  },
});

export default io;
