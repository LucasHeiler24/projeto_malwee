import storeUsuario from "./requests/usuario/login.js";
import flashMessage from "./utils/flash_messages/flash_message.js";
import validationLogin from "./validations/login.js";

window.onload = function () {

    const form = document.querySelector('form');
    const flashMessageLogin = document.getElementById("flashMessageLogin");
    flashMessageLogin.style.display = 'none';

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const matriculaUser = this.matriculaUser.value.trim();
        const senhaUser = this.senhaUser.value.trim();

        const statusLogin = validationLogin({ matricula: matriculaUser, senha: senhaUser });
        if (statusLogin) return flashMessage(flashMessageLogin, statusLogin.message, 'error');

        const statusStore = await storeUsuario({ matricula: matriculaUser, senha: senhaUser });

        if (statusStore.status == 400) return flashMessage(flashMessageLogin, statusStore.message, 'error');

        sessionStorage.setItem('token', statusStore.token);
        return window.location.href = './dashboard.html';
    })

}