import e from "express";
import url from "url";
import path from "path";

const app = e();

const PORT = 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");

// console.log(diretorioPublico);
app.use(e.static(diretorioPublico));

app.listen(3000, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
