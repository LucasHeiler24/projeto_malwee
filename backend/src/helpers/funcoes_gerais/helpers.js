const formatarDatasAmericanas = (sData) => { return sData[2] + '-' + sData[1] + '-' + sData[0] }

const removerDuplicados = (vetDados) => {
    return vetDados.filter((dados, index) => vetDados.indexOf(dados) == index);
} 

export {
    formatarDatasAmericanas,
    removerDuplicados
}