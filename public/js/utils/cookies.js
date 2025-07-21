function definirCookie(nome, valor) {
  document.cookie = `${nome}=${valor}; path=/`;
}

function obterCookies(chave1) {
  const cookies = document.cookie;
  const cookiesArray = cookies.split(";");
  const cookie = cookiesArray.find((cookie) => cookie.includes(chave1));
  return cookie ? cookie.split("=")[1] : null;
}

function excluirCookie(chave1) {
  document.cookie = `${chave1}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export { definirCookie, obterCookies, excluirCookie };
