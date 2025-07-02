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

async function connectToDatabase() {
  // Connect the client to the server (only once)
  try {
    await client.connect();
    const db = client.db("alura-websockets");
    const documentosColecao = db.collection("documentos");

    return documentosColecao;
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

const documentosColecao = await connectToDatabase();

export default documentosColecao;
