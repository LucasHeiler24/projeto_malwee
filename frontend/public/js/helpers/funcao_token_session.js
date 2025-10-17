import verificarToken from "../requests/usuario/token_jwt.js";

export default async function verificarTokenUsuario(token) {
    const validTokenSession = await verificarToken(token);
    if (validTokenSession.status == 400) return window.location.href = './login.html';

    if (!sessionStorage.getItem('id')) {
        sessionStorage.setItem('nome', validTokenSession.nome);
        sessionStorage.setItem('id', validTokenSession.id);
    }
}