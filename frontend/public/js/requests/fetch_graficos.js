const URL_API = "http://localhost:8000/dados";
async function getQuantidadeTempoDeProducaoPorDia(sAno, sMes) {
    try {

        const response = await fetch(`
        ${URL_API}/dados-total-metros-por-numero-da-tarefa-do-mes/mes/${sMes}/ano/${sAno}`,
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


async function getQuantidadeMetrosProduzidoPorTarefaNoMes(sAno, sMes) {
    try {

        const response = await fetch(`
        ${URL_API}/dados-total-tempo-producao-por-dia-durante-o-mes/mes/${sMes}/ano/${sAno}`,
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


async function getTotalTempoSetupPorNumeroTarefaNoMes(sAno, sMes) {

    try {

        const response = await fetch(`
            ${URL_API}/dados-total-tempo-setup-por-numero-tarefa/mes/${sMes}/ano/${sAno}    
        `);

        return await response.json();

    }
    catch (e) {
        return e;
    }

}


async function getTotalTarefasCompletasENaoCompletas(sAno, sMes) {

    try {

        const response = await fetch(`
            ${URL_API}/dados-total-tarefas-completas-e-nao-completas/mes/${sMes}/ano/${sAno}    
        `);

        return await response.json();

    }
    catch (e) {
        return e;
    }

}


async function getTotalTempoSetupDeCadaDiaDoMes(sAno, sMes) {

    try {

        const response = await fetch(`
            ${URL_API}/dados-total-tempo-setup-por-dia-do-mes/mes/${sMes}/ano/${sAno}
        `);

        return await response.json();

    }
    catch (e) {
        return e;
    }

}

export {
    getQuantidadeMetrosProduzidoPorTarefaNoMes,
    getQuantidadeTempoDeProducaoPorDia,
    getTotalTarefasCompletasENaoCompletas,
    getTotalTempoSetupDeCadaDiaDoMes,
    getTotalTempoSetupPorNumeroTarefaNoMes,
}