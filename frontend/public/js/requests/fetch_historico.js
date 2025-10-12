const URL_API = "http://localhost:8000/dados";
async function getRegistrosHistoricoMesEscolhido(sAno, sMes) {
    try {

        const response = await fetch(`
        ${URL_API}/dados-por-mes/mes/${sMes}/ano/${sAno}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

        return await response.json();

    }
    catch (e) {
        return e;
    }
}

export { getRegistrosHistoricoMesEscolhido }