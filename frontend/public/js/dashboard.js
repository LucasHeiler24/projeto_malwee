import verificarTokenUsuario from "./helpers/funcao_token_session.js";

window.onload = function () {

    const tokenSession = sessionStorage.getItem('token');
    if (!tokenSession) return window.location.href = './login.html';

    (async () => {
        await verificarTokenUsuario(tokenSession);

        document.getElementById('saudacaoUsuario').textContent = `Olá ${sessionStorage.getItem('nome')}`
    })()
}