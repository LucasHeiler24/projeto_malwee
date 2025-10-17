export default async function verificarToken(token) {

    try {

        const response = await fetch(`http://localhost:8000/user/token/${token}`);
        return await response.json();
    }
    catch (e) {
        return e;
    }

}