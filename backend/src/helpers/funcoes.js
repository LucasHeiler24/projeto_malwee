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

function separarPorNumeroTarefaDeCadaDiaDoMes(vetDadosDeCadaDiaDoMes) {

    let vetNumTarefaEValorDeCadaTarefa = [];
    for (let i = 0; i < vetDadosDeCadaDiaDoMes.length; i++) {

        let vetNumTarefaPorMes = [];
        let indiceTarefa = 0;

        for (let j = 0; j < vetDadosDeCadaDiaDoMes[i].length; j++) {
            if (vetDadosDeCadaDiaDoMes[i][indiceTarefa].numero_da_tarefa != vetDadosDeCadaDiaDoMes[i][j].numero_da_tarefa || j == 0) {
                vetNumTarefaPorMes.push(vetDadosDeCadaDiaDoMes[i][j].numero_da_tarefa);
                indiceTarefa = j;
            }

        }
        vetNumTarefaEValorDeCadaTarefa.push(vetNumTarefaPorMes);
    }

    return vetNumTarefaEValorDeCadaTarefa;
}

function pegarTotalDeMetrosPorDiaPeloMes(vetNumTarefaEValorDeCadaTarefa, vetDadosDeCadaDiaDoMes) {

    let vetTotalMetrosPorNumTarefa = [];
    for (let i = 0; i < vetNumTarefaEValorDeCadaTarefa.length; i++) {
        let vetTotalENumeroTarefa = [];
        let data_historico;
        for (let j = 0; j < vetNumTarefaEValorDeCadaTarefa[i].length; j++) {
            let existe = vetTotalENumeroTarefa.find((dados) => {
                return dados.numero_tarefa == vetNumTarefaEValorDeCadaTarefa[i][j];
            });

            if (!existe) {
                let somaTarefa = vetDadosDeCadaDiaDoMes[i].reduce((somaPorTarefa, dados) => {
                    data_historico = dados.data_historico.split(' ')[0];
                    if (vetNumTarefaEValorDeCadaTarefa[i][j] == dados.numero_da_tarefa && dados.tarefa_completa == 'TRUE') {
                        somaPorTarefa += dados.metros_produzidos;
                    }
                    return somaPorTarefa;
                }, 0);

                vetTotalENumeroTarefa.push({
                    data_historico,
                    numero_tarefa: vetNumTarefaEValorDeCadaTarefa[i][j],
                    total_metros_da_tarefa: somaTarefa
                });
            }
        }
        vetTotalMetrosPorNumTarefa.push(vetTotalENumeroTarefa);
    }

    return vetTotalMetrosPorNumTarefa;
}

function removerDupliados(arrayRemover) {
    return arrayRemover.filter((dados, index) => arrayRemover.indexOf(dados) === index);
}

export {
    separarDiasDifrentesEntreDatasVetor,
    separarPorNumeroTarefaDeCadaDiaDoMes,
    pegarTotalDeMetrosPorDiaPeloMes,
    removerDupliados
}