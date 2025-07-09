import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_CONNECTION_STRING; // adicione a sua url com a senha para se conectar ao mongoDB no arquivo .env

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let documentosColecao;
let usuariosColecao;

try {
  // Connect the client to the server (only once)
  await client.connect();
  const db = client.db("alura-websockets");
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection("usuarios");
} catch (error) {
  console.error("Erro ao conectar ao banco de dados:", error);
  throw error;
}

export { documentosColecao, usuariosColecao };
