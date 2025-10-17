export default async function registroUsuario({ nome, matricula, senha }) {

    try {

        const response = await fetch('http://localhost:8000/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_matricula: matricula, nome_usuario: nome, senha_usuario: senha })
        });

        return await response.json();
    }
    catch (e) {
        return e;
    }

}