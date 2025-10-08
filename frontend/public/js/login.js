import { createFlashMessage } from "./helpers/helpers.js";

window.onload = function(){

    const form = document.querySelector('form');
    const flashMessage = document.getElementById('flashMessage');
    flashMessage.style.display = 'none';

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const id_matricula = this.matricula.value.trim();
        const senha_usuario = this.senha.value.trim();

        if(!id_matricula || !senha_usuario) return createFlashMessage('Preencher os dados corretamente', 'error', flashMessage);

        try{

            const response = await fetch('http://localhost:8000/user/store', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    { 
                        id_matricula,
                        senha_usuario
                    }
                )
            });

            const status = await response.json();

            if(status.status == 400) return createFlashMessage(status.message, 'error', flashMessage);

            localStorage.setItem('token', status.token);
            return window.location.href = './index.html';
        }
        catch(e){
            console.log(e);
        }
    })

}