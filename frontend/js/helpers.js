const URL_API = "http://localhost:8000/dados"
async function getQuantidadeMetrosPorTecido(sAno, sMes) {

    try {

        const response = await fetch(`
        ${URL_API}/dados-total-metros-por-mes-produzidos/mes/${sMes}/ano/${sAno}`,
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

async function getQuantidadeMetrosProduzidoPorDia(sAno, sMes) {
    try {

        const response = await fetch(`
        ${URL_API}/dados-total-metros-por-dia-do-mes/mes/${sMes}/ano/${sAno}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

        const { vetDadosMetrosPorDia } = await response.json();

        return vetDadosMetrosPorDia;
    }
    catch (e) {
        return e;
    }
}

async function getQuantidadeMetrosProduzidoPorTarefaNoMes(sAno, sMes) {
    try {

        const response = await fetch(`
        ${URL_API}/dados-total-metros-por-tarefa-do-mes/mes/${sMes}/ano/${sAno}`,
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

const formater = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
});

export { 
    getQuantidadeMetrosPorTecido,
    getQuantidadeMetrosProduzidoPorDia,
    getQuantidadeMetrosProduzidoPorTarefaNoMes,
    getRegistrosHistoricoMesEscolhido,
    formater
 };