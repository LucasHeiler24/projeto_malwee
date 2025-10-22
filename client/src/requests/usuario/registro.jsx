const formRegistroSubmitted = async ({id_matricula, nome_user, senha_user}) => {
    
    try{
        const response = await fetch('http://localhost:8000/user/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    id_matricula: id_matricula,
                    nome_usuario: nome_user,
                    senha_usuario: senha_user
                }
            )
        });

        const {status, message} = await response.json();

        return (status != 201) ? {type: 'error', message} : {type: 'success', message}
    }
    catch(e){
        return {type: 'success', message: e};
    }  
}

export default formRegistroSubmitted;