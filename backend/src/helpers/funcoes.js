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

        let id_dado;
        let totais_tempo_metros = vetDadosDeCadaDiaDoMes.reduce((somaPorTarefa, dados) => {
            if (dados.numero_da_tarefa == numerosTarefa[i] && dados.tarefa_completa == 'TRUE') {
                id_dado = dados.id_dado;
                somaPorTarefa.metros += dados.metros_produzidos;
                somaPorTarefa.tempo_producao += dados.tempo_de_producao;
            }
            return somaPorTarefa;
        }, {
            metros: 0,
            tempo_producao: 0
        });

        vetTotalENumeroTarefa.push({
            id: id_dado,
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

        let id_dado;
        let dadosProducao = arrayDados.reduce((somaProducao, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                id_dado = dados.id_dado;
                somaProducao += dados.tempo_de_producao;
            }
            return somaProducao;
        }, 0);

        vetTotalTempoProducaoPorDia.push({
            id: id_dado,
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

function encontrarNumeroTarefasIguaisEmDoisMeses(array1, array2) {

    const vetNumTarefaMes1 = [];
    const vetNumTarefaMes2 = []
    for (let i = 0; i < array1.length; i++) {

        array2.filter((dados) => {
            if (dados.numero_tarefa == array1[i].numero_tarefa) {
                vetNumTarefaMes1.push(
                    {
                        numero_tarefa: dados.numero_tarefa,
                        total_metros: dados.total_metros_da_tarefa
                    }
                );
                vetNumTarefaMes2.push(
                    {
                        numero_tarefa: array1[i].numero_tarefa,
                        total_metros: array1[i].total_metros_da_tarefa
                    }
                )
            }
        })

    }

    return { vetNumTarefaMes1, vetNumTarefaMes2 };

}


function encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses(array1, array2) {

    let vetTempoProducao1 = [];
    let vetTempoProducao2 = [];

    for (let i = 0; i < array1.length; i++) {

        array2.filter((dados) => {
            if (dados.data_historico.split('-')[2] === array1[i].data_historico.split('-')[2]) {
                vetTempoProducao1.push(
                    {
                        data_producao: dados.data_historico,
                        tempo_producao: dados.tempo_producao
                    }
                )
                vetTempoProducao2.push(
                    {
                        data_producao: array1[i].data_historico,
                        tempo_producao: array1[i].tempo_producao
                    }
                )
            }
        })
    }

    return { vetTempoProducao1, vetTempoProducao2 }

}

function calcularOTempoDeSetupDasDatasDeUmMes(arrayDados, arrayDatas) {

    let vetCalcularTempoSetup = [];

    for (let i = 0; i < arrayDatas.length; i++) {

        let somaTempoSetupDeCadaData = arrayDados.reduce((soma, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE')
                soma += dados.tempo_de_setup;

            return soma;
        }, 0);

        vetCalcularTempoSetup.push({
            dia_do_mes: arrayDatas[i],
            total_tempo_setup: somaTempoSetupDeCadaData
        });
    }

    return vetCalcularTempoSetup;
}

function totalTarefasENaoCompletasNoMes(arrayDados) {
    return arrayDados.reduce((totalTarefas, dados) => {
        (dados.tarefa_completa == 'TRUE') ? totalTarefas.total_tarefas_completas++ : totalTarefas.total_tarefas_nao_completas++

        return totalTarefas;
    }, {
        total_tarefas_completas: 0,
        total_tarefas_nao_completas: 0
    })

}

function calcularTotalTempoSetupDeCadaTarefaNoMes(arrayDados, arrayNumeroTarefa) {

    let vetTotalTempoSetupDoNumeroTarefa = [];
    for (let i = 0; i < arrayNumeroTarefa.length; i++) {

        let somaTotalSetup = arrayDados.reduce((somaTotalTempoSetup, dados) => {
            if (dados.numero_da_tarefa == arrayNumeroTarefa[i] && dados.tarefa_completa == 'TRUE')
                somaTotalTempoSetup += dados.tempo_de_setup;
            return somaTotalTempoSetup;
        }, 0);

        vetTotalTempoSetupDoNumeroTarefa.push({
            numero_tarefa: arrayNumeroTarefa[i],
            total_tempo_setup: somaTotalSetup
        });

    }

    return vetTotalTempoSetupDoNumeroTarefa;
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
    encontrarNumeroTarefasIguaisEmDoisMeses,
    encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses,
    removerDupliados,
    calcularOTempoDeSetupDasDatasDeUmMes,
    totalTarefasENaoCompletasNoMes,
    calcularTotalTempoSetupDeCadaTarefaNoMes
}
