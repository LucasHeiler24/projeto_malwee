export default function separarDadosEmPartesDeDatas(dados, arrayDatas) {
    let vetDadosPorDatas = [];

    for (let i = 0; i < arrayDatas.length; i++) {
        vetDadosPorDatas.push(
            dados.filter((dados) => dados.data_historico == arrayDatas[i])
        )
    }

    return vetDadosPorDatas;
}