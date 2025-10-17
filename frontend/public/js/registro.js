import validationRegistro from "./validations/registro.js";
import flashMessage from "./utils/flash_messages/flash_message.js";
import registroUsuario from "./requests/usuario/registro.js";

window.onload = function () {

    const form = document.querySelector('form');
    const flashMessageRegistro = document.getElementById('flashMessageRegistro');
    flashMessageRegistro.style.display = 'none';

    form.addEventListener('submit', async function (e) {

        e.preventDefault();

        const nomeUser = this.nomeUser.value.trim();
        const matriculaUser = this.matriculaUser.value.trim();
        const senhaUser = this.senhaUser.value.trim();

        let statusRegistro = validationRegistro({ nome: nomeUser, matricula: matriculaUser, senha: senhaUser });
        if (statusRegistro) return flashMessage(flashMessageRegistro, statusRegistro.message, 'error');

        let statusCreate = await registroUsuario({ nome: nomeUser, matricula: matriculaUser, senha: senhaUser });

        console.log(statusCreate);
        if (statusCreate.status != 201) return flashMessage(flashMessageRegistro, statusCreate.message, 'error')

        flashMessage(flashMessageRegistro, statusCreate.message, 'sucesso');
        window.location.href = './login.html';
    })

}