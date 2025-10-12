const URL_API = "http://localhost:8000/dados";
async function getQuantidadeMetrosProduzidoPorDia(sAno, sMes) {
    try {

        const response = await fetch(`
        ${URL_API}/dados-total-metros-produzidos-por-dia-durante-o-mes/mes/${sMes}/ano/${sAno}`,
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

async function getTotalTempoSetupPorDiaDoMes(ano, mes) {

    try {

        const response = await fetch(`
           ${URL_API}/dados-total-tempo-setup-de-cada-dia-do-mes/mes/${mes}/ano/${ano} 
        `);

        return await response.json();
    }
    catch (e) {
        return e;
    }

}


export {
    getQuantidadeMetrosProduzidoPorDia,
    getTotalTempoSetupPorDiaDoMes
}