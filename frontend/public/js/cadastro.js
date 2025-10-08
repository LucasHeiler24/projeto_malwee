import { createFlashMessage } from "./helpers/helpers.js";

window.onload = function () {


    const form = document.querySelector('form');
    const divFlashMessage = document.getElementById('flashMessage');
    divFlashMessage.style.display = 'none';

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        let idMatricula = this.matricula.value.trim();
        let fullName = this.usuario.value.trim();
        let passwordUser = this.senha.value.trim();

        if (!idMatricula || !fullName || !passwordUser) return createFlashMessage('Preencher os dados corretamente', 'error', divFlashMessage);
        if (fullName.indexOf(' ') == -1) return createFlashMessage('Informe seu nome completo', 'error', divFlashMessage);
        if (passwordUser.length < 6) return createFlashMessage('Informe uma senha de pelo menos 6 caracteres', 'error', divFlashMessage);


        try {

            const response = await fetch('http://localhost:8000/user/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        id_matricula: idMatricula,
                        nome_usuario: fullName,
                        senha_usuario: passwordUser
                    }
                )
            });

            const status = await response.json();

            if (status.status != 201) return createFlashMessage(status.message, 'error', divFlashMessage);

            createFlashMessage(status.message, 'success', divFlashMessage);

            setTimeout(() => { window.location.href = './login.html' }, 3000);

        }
        catch (e) {
            console.log(e);
        }

    })

}