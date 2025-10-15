function formatarDatas(dataFormatar) {
    return dataFormatar[0] + '-' + dataFormatar[1];
}

const formater = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
});

const formatarDataParaOsGraficos = (date) => {
    let vetDataFatiada = date?.split('-');
    if (!vetDataFatiada) return;

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

function filterRegistrosPorId(arrayRegistros, idRegistro) {
    return arrayRegistros.find((dados) => dados.id_dado == parseInt(idRegistro));
}

function filtrarRegistrosTempoSetupPorDia(arrayDados, data) {
    return arrayDados.find((dados) => dados.dia_do_mes == data);
}

function createFlashMessage(sText, sType, divFlash) {
    divFlash.style.display = 'flex';

    if (sType == 'error') {
        divFlash.style = `background: rgb(192, 29, 0);`;
        divFlash.innerHTML = `<p>${sText}</p>`;
        return setTimeout(() => { divFlash.style.display = 'none' }, 3000);
    }

    divFlash.style = `background: rgb(38, 163, 13);`;
    divFlash.innerHTML = `<p>${sText}</p>`;
}

function separarDados(arrayDados1, arrayDados2) {
    if (!arrayDados1) return;

    let dadosParaOsGraficos = [];
    let dadosParaOsGraficos2 = [];
    let qtdExtrairDados = parseInt(arrayDados1?.length / 21);

    let controle = 0;
    for (let i = 0; i < qtdExtrairDados; i++) {
        let nums = [];
        let num2 = [];
        for (let j = controle; j < 21 + controle; j++) {
            nums.push(arrayDados1[j]);
            num2.push(arrayDados2[j]);
        }
        controle += 21;
        dadosParaOsGraficos.push(nums);
        dadosParaOsGraficos2.push(num2);
    }

    if (!arrayDados1[controle + 1]) return { dadosParaOsGraficos, dadosParaOsGraficos2 };

    let nums = [];
    let nums2 = [];
    for (let n = controle; n < arrayDados1?.length; n++) {
        nums.push(arrayDados1[n]);
        nums2.push(arrayDados2[n]);
    }
    dadosParaOsGraficos.push(nums);
    dadosParaOsGraficos2.push(nums2);

    return { dadosParaOsGraficos, dadosParaOsGraficos2 }
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
    formatarDatasEntreOsMeses,
    filterRegistrosPorId,
    createFlashMessage,
    separarDados,
    filtrarRegistrosTempoSetupPorDia
};