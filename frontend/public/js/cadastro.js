window.onload = function() {


    const form = document.querySelector('form');
    const divFlashMessage = document.getElementById('flashMessage');
    divFlashMessage.style.display = 'none';
    
    function createFlashMessage(sText, sType){
        divFlashMessage.style.display = 'flex';
        
        if(sType == 'error'){
            divFlashMessage.style = `background: rgb(192, 29, 0);`;
            divFlashMessage.innerHTML = `<p>${sText}</p>`;
            return setTimeout(() => {divFlashMessage.style.display = 'none'}, 3000);
        }
        
        divFlashMessage.style = `background: rgb(38, 163, 13);`;
        divFlashMessage.innerHTML = `<p>${sText}</p>`;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        let idMatricula = this.cadastroMatricula.value.trim();
        let fullName = this.cadastroNome.value.trim();
        let passwordUser = this.cadastroSenha.value.trim();

        if(!idMatricula || !fullName || !passwordUser) return createFlashMessage('Preencher os dados corretamente', 'error');
        if(passwordUser.length < 6) return createFlashMessage('Informe uma senha de pelo menos 6 caracteres', 'error');

        try{

            const response = await fetch('http://localhost:8000/user/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    { 
                        id_matricula: idMatricula,
                        nome_usuario: fullName,
                        senha_usuario: passwordUser
                    }
                )
            });

            const status = await response.json();

            if(status.status != 201) return createFlashMessage(status.message, 'error');
            
            createFlashMessage(status.message, 'success');

            setTimeout(() => {window.location.href = './login.html'}, 3000);

        }
        catch(e){
            console.log(e);
        }

    })

}