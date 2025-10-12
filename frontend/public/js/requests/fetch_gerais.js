const URL_API = "http://localhost:8000/dados";
async function getQuantidadeMetrosPorTecido(sAno, sMes) {

    try {

        const response = await fetch(`
        ${URL_API}/dados-total-metros-produzidos-por-tecido/mes/${sMes}/ano/${sAno}`,
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

async function getValidToken(sToken) {

    try {

        const response = await fetch(`
            http://localhost:8000/user/token/${sToken}
        `);

        return await response.json();

    }
    catch (e) {
        return e;
    }

}

export { getQuantidadeMetrosPorTecido, getValidToken }