const formatarDatasParaAmericano = (vetData) => { return vetData[2] + '-' + vetData[1] + '-' + vetData[0] };

const formatarDatasAnoEMes = (vetData) => { return vetData[2] + '-' + vetData[1] };

const removerDuplicados = (vetDados) => {
    return vetDados.filter((dados, index) => vetDados.indexOf(dados) == index);
}

const formatarValores = new Intl.NumberFormat('pt-BR', {
    style: "decimal"
});

const coresGraficosDuasBarras = ['#37096D', '#01A21D'];
const coresGraficosDuasBarrasSobrados = ['#ED3D00', '#318EBC'];
const coresGrafiposPizzaTiposTecidos = [
    "#4F6D7A", "#C99156", "#E3AC93", "#A8D490", "#F4C476",
    "#73A16A", "#C27BA0", "#87CEFA", "#7B68EE", "#FFD700",
    "#B0C4DE", "#C71585", "#008080", "#FF4500", "#DAA520",
    "#98FB98", "#DDA0DD", "#8A2BE2", "#FF69B4", "#BDB76B",
    "#F08080", "#20B2AA", "#7FFFD4", "#6495ED", "#D2691E",
    "#9370DB", "#CD5C5C", "#00CED1", "#BA55D3", "#8B4513"
];
const coresGraficosBarrasProducao = ['#2FD644', '#DB0006', '#1C76BB']


export {
    formatarDatasParaAmericano,
    formatarDatasAnoEMes,
    removerDuplicados,
    formatarValores,
    coresGraficosDuasBarras,
    coresGraficosDuasBarrasSobrados,
    coresGrafiposPizzaTiposTecidos,
    coresGraficosBarrasProducao
}