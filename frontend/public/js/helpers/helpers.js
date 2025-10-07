function formatarDatas(dataFormatar) {
    return dataFormatar[0] + '-' + dataFormatar[1];
}

const formater = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
});

const formatarDataParaOsGraficos = (date) => {
    let vetDataFatiada = date.split('-');

    return `${vetDataFatiada[2]}/${vetDataFatiada[1]}/${vetDataFatiada[0]}`
}

const formatarDatasEntreOsMeses = (date) => {
    let vetDataFatiada = date.split('-');

    return `${vetDataFatiada[1]}/${vetDataFatiada[0]}`
}

let anoAtual = new Date().getFullYear();
let getMesAtual = new Date().getMonth();

const vetMeses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

let proximoMesAtual = getMesAtual + 1;
let mesAtual = getMesAtual;
let anteriorMesAtual = getMesAtual - 1;

let vetCoresParaOsGraficos = [
    '#35ddb9ff',
    '#0071ceff',
    '#1a2fa8',
    '#d6bb24',
    '#28d85dff',
    '#a02ad6ff',
    '#d82000ff'
];

let vetCoresParaOsGraficos2 = [
    '#d82000ff',
    '#0071ceff',
    '#28d85dff',
    '#35ddb9ff',
    '#d6bb24',
    '#1a2fa8',
    '#a02ad6ff'
];

function encontrarIndexRegistrosPeloTipoTecido(arrayRegistros, textoUser) {
    return arrayRegistros.findIndex((dados) => {
        return dados.toLowerCase().includes(textoUser.toLowerCase())
    });
}

function filterRegistrosPeloTipoTecido(arrayRegistros, indexTipo) {
    return arrayRegistros.filter((dados) => {
        return dados.tipo_tecido == indexTipo;
    })
}

function filterRegistrosPeloNumeroTarefa(arrayRegistros, numeroTarefa) {
    return arrayRegistros.filter((dados) => dados.numero_da_tarefa == parseInt(numeroTarefa));
}


export {
    formater,
    anoAtual,
    getMesAtual,
    vetMeses,
    proximoMesAtual,
    anteriorMesAtual,
    mesAtual,
    formatarDatas,
    vetCoresParaOsGraficos,
    vetCoresParaOsGraficos2,
    encontrarIndexRegistrosPeloTipoTecido,
    filterRegistrosPeloTipoTecido,
    filterRegistrosPeloNumeroTarefa,
    formatarDataParaOsGraficos,
    formatarDatasEntreOsMeses
};