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
const coresGrafiposPizzaTiposTecidos = ['#E90020', '#55BC00', '#740ECC', '#1D097D', '#292732', '#BF6000']
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