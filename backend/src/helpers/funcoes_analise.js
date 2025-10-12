import { removerDupliados, formatarValor } from "./funcoes.js";

function totalMetrosPorDiaPorNumeroTarefa(arrayDados, arrayNumerosTarefas, arrayDatas) {

    let vetTotalMetrosPorNumeroTarefaNosDias = [];
    let vetTotalTempoProducaoPorNumeroTarefaNosDias = [];
    let vetTotalTempoSetupPorNumeroTarefaNosDias = [];

    for (let i = 0; i < arrayNumerosTarefas.length; i++) {
        let vetTotalMetrosNoDiaPorNumeroTarefa = [];
        let vetTotalTempoProducaoNoDiaPorNumeroTarefa = [];
        let vetTotalTempoSetupNoDiaPorNumeroTarefa = [];

        for (let j = 0; j < arrayDatas.length; j++) {

            let somaTotalNumeroTarefaNoDia = arrayDados.reduce((soma, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.numero_da_tarefa == arrayNumerosTarefas[i] && dados.tarefa_completa == 'TRUE') {
                    soma.somaTotalMetrosProduzidos += dados.metros_produzidos
                    soma.somaTotalTempoDeProducao += dados.tempo_de_producao
                    soma.somaTotalTempoSetup += dados.tempo_de_setup
                }
                return soma;
            }, {
                somaTotalMetrosProduzidos: 0,
                somaTotalTempoDeProducao: 0,
                somaTotalTempoSetup: 0
            });

            vetTotalMetrosNoDiaPorNumeroTarefa.push({
                numero_tarefa: arrayNumerosTarefas[i],
                data_tarefa: arrayDatas[j],
                total_metros_numero_tarefa: somaTotalNumeroTarefaNoDia.somaTotalMetrosProduzidos
            });
            vetTotalTempoProducaoNoDiaPorNumeroTarefa.push({
                numero_tarefa: arrayNumerosTarefas[i],
                data_tarefa: arrayDatas[j],
                total_tempo_producao_numero_tarefa: somaTotalNumeroTarefaNoDia.somaTotalTempoDeProducao
            });
            vetTotalTempoSetupNoDiaPorNumeroTarefa.push({
                numero_tarefa: arrayNumerosTarefas[i],
                data_tarefa: arrayDatas[j],
                total_tempo_setup_numero_tarefa: somaTotalNumeroTarefaNoDia.somaTotalTempoSetup
            });
        }

        vetTotalMetrosPorNumeroTarefaNosDias.push(...vetTotalMetrosNoDiaPorNumeroTarefa);
        vetTotalTempoProducaoPorNumeroTarefaNosDias.push(...vetTotalTempoProducaoNoDiaPorNumeroTarefa);
        vetTotalTempoSetupPorNumeroTarefaNosDias.push(...vetTotalTempoSetupNoDiaPorNumeroTarefa);
    }

    return {
        vetTotalMetrosPorNumeroTarefaNosDias,
        vetTotalTempoProducaoPorNumeroTarefaNosDias,
        vetTotalTempoSetupPorNumeroTarefaNosDias
    };

}

//vetores de cadas tipo de tecido
let vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

function funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dados) {
    const somaDeMetrosProduzidosPorTipoTecido = [];

    //Faço um for para cada tipo de tecido
    for (let i = 0; i < 6; i++) {

        /**
         * Faço um reduce aonde eu pego pelo tipo de tecido vindos do banco com o índice de cada
         * tipo de tecido do vetor que estou iterando, onde verefica se o índice é igual e somo
         * os metros produzidos por esse tipo de tecido
         */

        let qtdMetrosProduzidosPorTiposTecidos = dados.reduce((somaMetrosPorTecido, regitros) => {

            if (regitros.tipo_tecido == i && regitros.tarefa_completa == 'TRUE') {
                somaMetrosPorTecido.total_metros_por_tipo_tecido += regitros.metros_produzidos;
                somaMetrosPorTecido.data_metros_por_tecido.push(regitros.data_historico.split(' ')[0]);
            }

            return somaMetrosPorTecido;
        }, {
            total_metros_por_tipo_tecido: 0,
            data_metros_por_tecido: [],
            total_por_dia: []
        });

        let removerDuplicatosDatas = removerDupliados(qtdMetrosProduzidosPorTiposTecidos.data_metros_por_tecido);

        let totalMetrosPorTecidoPorDia = [];
        let maiorMetrosPorDia = 0;
        let menorMetrosPorDia = Number.MAX_SAFE_INTEGER;
        let dataMaior;
        let dataMenor;

        for (let j = 0; j < removerDuplicatosDatas.length; j++) {
            totalMetrosPorTecidoPorDia.push(
                dados.reduce((somaTotalPorTipoTecido, registros) => {
                    if (registros.tipo_tecido == i
                        && registros.data_historico.split(' ')[0] == removerDuplicatosDatas[j]
                        && registros.tarefa_completa == 'TRUE') {
                        somaTotalPorTipoTecido += registros.metros_produzidos
                    }

                    return somaTotalPorTipoTecido;
                }, 0)
            )

            if (totalMetrosPorTecidoPorDia[j] > maiorMetrosPorDia) {
                maiorMetrosPorDia = totalMetrosPorTecidoPorDia[j];
                dataMaior = removerDuplicatosDatas[j]
            };

            if (totalMetrosPorTecidoPorDia[j] < menorMetrosPorDia) {
                menorMetrosPorDia = totalMetrosPorTecidoPorDia[j];
                dataMenor = removerDuplicatosDatas[j]
            }
        }

        somaDeMetrosProduzidosPorTipoTecido.push(
            {
                tipo_tecido: vetTiposTecidos[i],
                qtd_metros_produzidos: qtdMetrosProduzidosPorTiposTecidos.total_metros_por_tipo_tecido,
                data_metros: removerDuplicatosDatas,
                total_por_dia: totalMetrosPorTecidoPorDia,
                data_maior_valor: dataMaior,
                total_metros_maior: formatarValor.format(maiorMetrosPorDia),
                data_menor_valor: dataMenor,
                total_metros_menor: formatarValor.format(menorMetrosPorDia),
                media_diaria: formatarValor.format(qtdMetrosProduzidosPorTiposTecidos.total_metros_por_tipo_tecido / removerDuplicatosDatas.length)
            }
        );
    }

    return somaDeMetrosProduzidosPorTipoTecido;
}

export {
    totalMetrosPorDiaPorNumeroTarefa,
    funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes
}