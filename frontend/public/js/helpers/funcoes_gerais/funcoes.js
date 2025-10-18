const formatarDatasParaAmericano = (vetData) => { return vetData[2] + '-' + vetData[1] + '-' + vetData[0] };

const formatarDatasAnoEMes = (vetData) => { return vetData[2] + '-' + vetData[1] };

const removerDuplicados = (vetDados) => {
    return vetDados.filter((dados, index) => vetDados.indexOf(dados) == index);
}

export {
    formatarDatasParaAmericano,
    formatarDatasAnoEMes,
    removerDuplicados
}