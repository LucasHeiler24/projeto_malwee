const URL_API = "http://localhost:8000/dados"
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

async function getQuantidadeMetrosProduzidoPorDia(sAno, sMes) {
    try {

        const response = await fetch(`
        ${URL_API}/dados-total-metros-produzidos-por-dia-durante-o-mes/mes/${sMes}/ano/${sAno}`,
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

async function getDadosDiferencaMensal(dateMes1, dateMes2) {

    try {

        const response = await fetch(`
            ${URL_API}/dados-diferenca-mensal/date1/${dateMes1}/date2/${dateMes2}
        `);

        return await response.json();

    }
    catch (e) {
        return e;
    }

}


function formatarDatas(dataFormatar) {
    return dataFormatar[0] + '-' + dataFormatar[1];
}

const formater = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
});

let anoAtual = new Date().getFullYear();
let getMesAtual = new Date().getMonth();

const vetMeses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

let proximoMesAtual = getMesAtual + 1;
let mesAtual = getMesAtual;
let anteriorMesAtual = getMesAtual - 1;

export {
    getQuantidadeMetrosPorTecido,
    getQuantidadeMetrosProduzidoPorDia,
    getQuantidadeMetrosProduzidoPorTarefaNoMes,
    getQuantidadeTempoDeProducaoPorDia,
    getRegistrosHistoricoMesEscolhido,
    getDadosDiferencaMensal,
    formater,
    anoAtual, getMesAtual, vetMeses, proximoMesAtual, anteriorMesAtual, mesAtual,
    formatarDatas
};