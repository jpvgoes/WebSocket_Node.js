import { scryptSync, timingSafeEqual } from "crypto";

function autenticarUsuario(usuario, senhaDigitada) {
  const hashTeste = scryptSync(senhaDigitada, usuario.sal, 64);
  const hashReal = Buffer.from(usuario.hash, "hex");

  return timingSafeEqual(hashTeste, hashReal);
}

export default autenticarUsuario;
