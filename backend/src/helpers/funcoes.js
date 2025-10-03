function separarDiasDifrentesEntreDatasVetor(arrayDados) {

    let qtdDiasDiferentes = 0;
    let posProximoDiaDferente = 0;
    let vetIndiceDosDiasDiferentes = [];

    for (let i = 0; i < arrayDados.length; i++) {
        if (arrayDados[posProximoDiaDferente].data_historico.split(' ')[0] != arrayDados[i].data_historico.split(' ')[0] || i == 0) {
            qtdDiasDiferentes++;
            vetIndiceDosDiasDiferentes.push(i);
            posProximoDiaDferente = i;
        }
    }

    const vetDadosDeCadaDiaDoMes = [];

    for (let i = 0; i < qtdDiasDiferentes; i++) {
        vetDadosDeCadaDiaDoMes.push(
            arrayDados.filter((registros) => {
                return registros.data_historico.split(' ')[0] == arrayDados[vetIndiceDosDiasDiferentes[i]].data_historico.split(' ')[0]
            })
        );
    }

    return vetDadosDeCadaDiaDoMes;
}

function pegarTotalDeMetrosPorDiaPeloMes(vetDadosDeCadaDiaDoMes) {

    let vetTotalENumeroTarefa = [];
    for (let i = 0; i < vetDadosDeCadaDiaDoMes.length; i++) {

        let existe = vetTotalENumeroTarefa.find((dados, j) => {
            return dados.data_historico == vetDadosDeCadaDiaDoMes[i][j].data_historico.split(' ')[0];
        });

        if (!existe) {
            let data_historico = vetDadosDeCadaDiaDoMes[i][0].data_historico.split(' ')[0];

            let somaTempoProducao = vetDadosDeCadaDiaDoMes[i].reduce((somaProducao, dados) => {
                if (dados.tarefa_completa == 'TRUE') {
                    somaProducao += dados.tempo_de_producao;
                }
                return somaProducao;
            }, 0);

            vetTotalENumeroTarefa.push({
                data_historico,
                tempo_producao: somaTempoProducao
            });
        }
    }

    return vetTotalENumeroTarefa;
}

function pegarTotalDeMetrosPorDiaEProduPeloMes(numerosTarefa, vetDadosDeCadaDiaDoMes) {

    let vetTotalENumeroTarefa = [];
    for (let i = 0; i < numerosTarefa.length; i++) {

        let totais_tempo_metros = vetDadosDeCadaDiaDoMes.reduce((somaPorTarefa, dados) => {
            if (dados.numero_da_tarefa == numerosTarefa[i] && dados.tarefa_completa == 'TRUE') {
                somaPorTarefa.metros += dados.metros_produzidos;
                somaPorTarefa.tempo_producao += dados.tempo_de_producao;
            }
            return somaPorTarefa;
        }, {
            metros: 0,
            tempo_producao: 0
        });

        vetTotalENumeroTarefa.push({
            numero_tarefa: numerosTarefa[i],
            total_metros_da_tarefa: totais_tempo_metros.metros,
            tempo_producao: totais_tempo_metros.tempo_producao
        });

    }

    return vetTotalENumeroTarefa;
}

function calcularQuantidadeTempoProducaoPorDia(arrayDados, arrayDatas) {

    let vetTotalTempoProducaoPorDia = [];
    for (let i = 0; i < arrayDatas.length; i++) {

        let dadosProducao = arrayDados.reduce((somaProducao, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE')
                somaProducao += dados.tempo_de_producao;
            return somaProducao;
        }, 0);

        vetTotalTempoProducaoPorDia.push({
            data_historico: arrayDatas[i],
            tempo_producao: dadosProducao
        });
    }

    return vetTotalTempoProducaoPorDia;
}



function somarTotalDeMetrosProduzidosNoMes(arrayDados) {
    return arrayDados.reduce((somaTotalMetrosMes, dados) => {
        if (dados.tarefa_completa == 'TRUE')
            somaTotalMetrosMes += dados.metros_produzidos;
        return somaTotalMetrosMes;
    }, 0);

}

function somarTotalDeTempoProducaoNoMes(arrayDados) {
    return arrayDados.reduce((somaTotalProducaoMes, dados) => {
        if (dados.tarefa_completa == 'TRUE')
            somaTotalProducaoMes += dados.tempo_de_producao;
        return somaTotalProducaoMes;
    }, 0);

}


function removerDupliados(arrayRemover) {
    return arrayRemover.filter((dados, index) => arrayRemover.indexOf(dados) === index);
}

export {
    separarDiasDifrentesEntreDatasVetor,
    pegarTotalDeMetrosPorDiaPeloMes,
    pegarTotalDeMetrosPorDiaEProduPeloMes,
    calcularQuantidadeTempoProducaoPorDia,
    somarTotalDeMetrosProduzidosNoMes,
    somarTotalDeTempoProducaoNoMes,
    removerDupliados
}