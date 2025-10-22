const store = async ({id_matricula, senha_usuario}) => {

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
        })

        const status = await response.json();
        console.log(status);
        return (status.status) ? {type: 'error', message: "Credênciais inválidas!"} : {type: 'success', message: status.token}  
    }
    catch(e){
        return {type: 'error', message: e};
    }   
}

export default store;