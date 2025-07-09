import jwt from "jsonwebtoken";

function gerarJwt(usuario) {
  const tokenJwt = jwt.sign({ usuario }, process.env.SEGREDO_JWT, {
    expiresIn: "1h",
  });

  return tokenJwt;
}

export default gerarJwt;
