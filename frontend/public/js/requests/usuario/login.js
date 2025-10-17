export default async function storeUsuario({ matricula, senha }) {

    try {

        const response = await fetch('http://localhost:8000/user/store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_matricula: matricula, senha_usuario: senha })
        });

        return await response.json();

    }
    catch (e) {
        return e;
    }

}