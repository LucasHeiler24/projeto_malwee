const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

function funcaoDashboardProducaoTotalPorTecido(dadosBd, vetDatas) {

    const vetTotaisDados = [];

    for (let i = 0; i < vetTiposTecidos.length; i++) {
        for (let j = 0; j < vetDatas.length; j++) {

            let dadosTiposTecido = dadosBd.reduce((objectDados, dados) => {
                if (dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.somaTotalMetrosProduzidosCompletos += dados.metros_produzidos;
                    objectDados.somaTotalTempoProducaoCompletos += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupCompletos += dados.tempo_de_setup;
                    objectDados.total_tarefas_completas += 1;
                }
                if (dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE') {
                    objectDados.somaTotalMetrosProduzidosNaoCompletos += dados.metros_produzidos;
                    objectDados.somaTotalTempoProducaoNaoCompletos += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupNaoCompletos += dados.tempo_de_setup;
                    objectDados.total_tarefas_nao_completas += 1;
                }
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.somaTotalMetrosProduzidosCompletosPrimeiroTurno += dados.metros_produzidos;
                    objectDados.somaTotalTempoProduzidosCompletosPrimeiroTurno += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupCompletosPrimeiroTurno += dados.tempo_de_setup;
                    objectDados.total_tarefas_completas_primeiro_turno += 1;
                }
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE') {
                    objectDados.somaTotalMetrosProduzidosNaoCompletosPrimeiroTurno += dados.metros_produzidos;
                    objectDados.somaTotalTempoProduzidosNaoCompletosPrimeiroTurno += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupNaoCompletosPrimeiroTurno += dados.tempo_de_setup;
                    objectDados.total_tarefas_nao_completas_primeiro_turno += 1;
                }
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.somaTotalMetrosProduzidosCompletosSegundoTurno += dados.metros_produzidos;
                    objectDados.somaTotalTempoProduzidosCompletosSegundoTurno += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupCompletosSegundoTurno += dados.tempo_de_setup;
                    objectDados.total_tarefas_completas_segundo_turno += 1;
                }
                if (parseInt(dados.data_historico.split(' ')[1].split('-')[0]) >= 14 && dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE') {
                    objectDados.somaTotalMetrosProduzidosNaoCompletosSegundoTurno += dados.metros_produzidos;
                    objectDados.somaTotalTempoProduzidosNaoCompletosSegundoTurno += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupNaoCompletosSegundoTurno += dados.tempo_de_setup;
                    objectDados.total_tarefas_nao_completas_segundo_turno += 1;
                }
                return objectDados;
            }, {
                total_tarefas_completas: 0,
                total_tarefas_nao_completas: 0,
                total_tarefas_completas_primeiro_turno: 0,
                total_tarefas_completas_segundo_turno: 0,
                total_tarefas_nao_completas_primeiro_turno: 0,
                total_tarefas_nao_completas_segundo_turno: 0,

                somaTotalMetrosProduzidosCompletos: 0,
                somaTotalTempoProducaoCompletos: 0,
                somaTotalTempoSetupCompletos: 0,

                somaTotalMetrosProduzidosNaoCompletos: 0,
                somaTotalTempoProducaoNaoCompletos: 0,
                somaTotalTempoSetupNaoCompletos: 0,

                somaTotalMetrosProduzidosCompletosPrimeiroTurno: 0,
                somaTotalTempoProduzidosCompletosPrimeiroTurno: 0,
                somaTotalTempoSetupCompletosPrimeiroTurno: 0,

                somaTotalMetrosProduzidosNaoCompletosPrimeiroTurno: 0,
                somaTotalTempoProduzidosNaoCompletosPrimeiroTurno: 0,
                somaTotalTempoSetupNaoCompletosPrimeiroTurno: 0,

                somaTotalMetrosProduzidosCompletosSegundoTurno: 0,
                somaTotalTempoProduzidosCompletosSegundoTurno: 0,
                somaTotalTempoSetupCompletosSegundoTurno: 0,

                somaTotalMetrosProduzidosNaoCompletosSegundoTurno: 0,
                somaTotalTempoProduzidosNaoCompletosSegundoTurno: 0,
                somaTotalTempoSetupNaoCompletosSegundoTurno: 0
            });

            vetTotaisDados.push({
                tipo_tecido: vetTiposTecidos[i],
                data_historico: vetDatas[j],

                media_totais_metros_completos: (dadosTiposTecido.somaTotalMetrosProduzidosCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosCompletos / dadosTiposTecido.total_tarefas_completas).toFixed(2),
                media_totais_metros_nao_completos: (dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletos / dadosTiposTecido.total_tarefas_nao_completas).toFixed(2),
                media_totais_metros_completos_primeiro_turno: (dadosTiposTecido.somaTotalMetrosProduzidosCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_completas_primeiro_turno).toFixed(2),
                media_totais_metros_nao_completos_primeiro_turno: (dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_nao_completas_primeiro_turno).toFixed(2),
                media_totais_metros_completos_segundo_turno: (dadosTiposTecido.somaTotalMetrosProduzidosCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosCompletosSegundoTurno / dadosTiposTecido.total_tarefas_completas_segundo_turno).toFixed(2),
                media_totais_metros_nao_completos_segundo_turno: (dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletosSegundoTurno / dadosTiposTecido.total_tarefas_nao_completas_segundo_turno).toFixed(2),

                media_totais_tempo_producao_completos: (dadosTiposTecido.somaTotalTempoProducaoCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProducaoCompletos / dadosTiposTecido.total_tarefas_completas).toFixed(2),
                media_totais_tempo_producao_nao_completos: (dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProducaoNaoCompletos / dadosTiposTecido.total_tarefas_nao_completas).toFixed(2),
                media_totais_tempo_producao_completos_primeiro_turno: (dadosTiposTecido.somaTotalTempoProduzidosCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProduzidosCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_completas_primeiro_turno).toFixed(2),
                media_totais_tempo_producao_nao_completos_primeiro_turno: (dadosTiposTecido.somaTotalTempoProduzidosNaoCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProduzidosNaoCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_nao_completas_primeiro_turno).toFixed(2),
                media_totais_tempo_producao_completos_segundo_turno: (dadosTiposTecido.somaTotalTempoProduzidosCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProduzidosCompletosSegundoTurno / dadosTiposTecido.total_tarefas_completas_segundo_turno).toFixed(2),
                media_totais_tempo_producao_nao_completos_segundo_turno: (dadosTiposTecido.somaTotalTempoProduzidosNaoCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProduzidosNaoCompletosSegundoTurno / dadosTiposTecido.total_tarefas_nao_completas_segundo_turno).toFixed(2),

                media_totais_tempo_setup_completos: (dadosTiposTecido.somaTotalTempoSetupCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupCompletos / dadosTiposTecido.total_tarefas_completas).toFixed(2),
                media_totais_tempo_setup_nao_completos: (dadosTiposTecido.somaTotalTempoSetupNaoCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupNaoCompletos / dadosTiposTecido.total_tarefas_nao_completas).toFixed(2),
                media_totais_tempo_setup_completos_primeiro_turno: (dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_completas_primeiro_turno).toFixed(2),
                media_totais_tempo_setup_nao_completos_primeiro_turno: (dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_nao_completas_primeiro_turno).toFixed(2),
                media_totais_tempo_setup_completos_segundo_turno: (dadosTiposTecido.somaTotalTempoSetupCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupCompletosSegundoTurno / dadosTiposTecido.total_tarefas_completas_segundo_turno).toFixed(2),
                media_totais_tempo_setup_nao_completos_segundo_turno: (dadosTiposTecido.somaTotalTempoSetupNaoCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupNaoCompletosSegundoTurno / dadosTiposTecido.total_tarefas_nao_completas_segundo_turno).toFixed(2),

                dados_totais_metros_completos_primeiro_turno: dadosTiposTecido.somaTotalMetrosProduzidosCompletosPrimeiroTurno,
                dados_totais_metros_nao_completos_primeiro_turno: dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletosPrimeiroTurno,
                dados_totais_tempo_producao_completos_primeiro_turno: dadosTiposTecido.somaTotalTempoProduzidosCompletosPrimeiroTurno,

                dados_totais_tempo_producao_nao_completos_primeiro_turno: dadosTiposTecido.somaTotalTempoProduzidosNaoCompletosPrimeiroTurno,
                dados_totais_tempo_setup_completos_primeiro_turno: dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno,
                dados_totais_tempo_setup_nao_completos_primeiro_turno: dadosTiposTecido.somaTotalTempoSetupNaoCompletosPrimeiroTurno,

                dados_totais_metros_completos_segundo_turno: dadosTiposTecido.somaTotalMetrosProduzidosCompletosSegundoTurno,
                dados_totais_metros_nao_completos_segundo_turno: dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletosSegundoTurno,
                dados_totais_tempo_producao_completos_segundo_turno: dadosTiposTecido.somaTotalTempoProduzidosCompletosSegundoTurno,

                dados_totais_tempo_producao_nao_completos_segundo_turno: dadosTiposTecido.somaTotalTempoProduzidosNaoCompletosSegundoTurno,
                dados_totais_tempo_setup_completos_segundo_turno: dadosTiposTecido.somaTotalTempoSetupCompletosSegundoTurno,
                dados_totais_tempo_setup_nao_completos_segundo_turno: dadosTiposTecido.somaTotalTempoSetupNaoCompletosSegundoTurno,

                dados_totais_metros_completos: dadosTiposTecido.somaTotalMetrosProduzidosCompletos,
                dados_totais_tempo_producao_completos: dadosTiposTecido.somaTotalTempoProducaoCompletos,
                dados_totais_tempo_setup_completos: dadosTiposTecido.somaTotalTempoSetupCompletos,

                dados_totais_metros_nao_completos: dadosTiposTecido.somaTotalMetrosProduzidosNaoCompletos,
                dados_totais_tempo_producao_nao_completos: dadosTiposTecido.somaTotalTempoProducaoNaoCompletos,
                dados_totais_tempo_setup_nao_completos: dadosTiposTecido.somaTotalTempoSetupNaoCompletos
            })
        }

    }

    return vetTotaisDados;

}

function funcoesDashboardContarTarefaSobrasDeRolo(dados, arrayDatas) {

    let vetTarefasSobraDeRolo = [];

    for (let i = 0; i < vetTiposTecidos.length; i++) {
        for (let j = 0; j < arrayDatas.length; j++) {
            let objectDadosTarefasCompletas = dados.reduce((objectDados, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'TRUE' && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE') {
                    objectDados.qtd_sobra_de_rolo_nao_completadas += 1
                }
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'FALSE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_nao_sobra_de_rolo_completadas += 1
                }
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'TRUE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_sobra_de_rolo_completadas += 1
                }
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'FALSE' && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE') {
                    objectDados.qtd_nao_sobra_de_rolo_nao_completas += 1
                }

                return objectDados;
            }, {
                qtd_sobra_de_rolo_nao_completadas: 0,
                qtd_nao_sobra_de_rolo_completadas: 0,

                qtd_sobra_de_rolo_completadas: 0,
                qtd_nao_sobra_de_rolo_nao_completas: 0
            });

            vetTarefasSobraDeRolo.push({
                data_historico: arrayDatas[j],
                tipo_tecido: vetTiposTecidos[i],

                qtd_sobra_de_rolo_nao_completadas: objectDadosTarefasCompletas.qtd_sobra_de_rolo_nao_completadas,
                qtd_nao_sobra_de_rolo_completadas: objectDadosTarefasCompletas.qtd_nao_sobra_de_rolo_completadas,
                qtd_sobra_de_rolo_completadas: objectDadosTarefasCompletas.qtd_sobra_de_rolo_completadas,
                qtd_nao_sobra_de_rolo_nao_completas: objectDadosTarefasCompletas.qtd_nao_sobra_de_rolo_nao_completas
            })
        }
    }
    return vetTarefasSobraDeRolo;
}

function funcoesDashboardContarTarefasCompletas(dados, arrayDatas) {

    let vetTotalTarefasCompletas = [];

    for (let i = 0; i < vetTiposTecidos.length; i++) {
        for (let j = 0; j < arrayDatas.length; j++) {

            let objectDadosTotalTarefas = dados.reduce((objectTarefas, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE')
                    objectTarefas.total_tarefas_completas += 1;

                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE')
                    objectTarefas.total_tarefas_nao_completas += 1;

                return objectTarefas;
            }, {
                total_tarefas_completas: 0,
                total_tarefas_nao_completas: 0
            });

            vetTotalTarefasCompletas.push({
                tipo_tecido: vetTiposTecidos[i],
                data_historico: arrayDatas[j],
                total_tarefas_completas: objectDadosTotalTarefas.total_tarefas_completas,
                total_tarefas_nao_completas: objectDadosTotalTarefas.total_tarefas_nao_completas
            })

        }
    }

    return vetTotalTarefasCompletas;

}

function funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido(dados, arrayDatas) {

    let vetTotaisTipoSaida = [];
    let vetOrganizarPorDatas = [];

    for (let i = 0; i < vetTiposTecidos.length; i++) {
        for (let j = 0; j < arrayDatas.length; j++) {
            let objetoDadosTipoSaida = dados.reduce((objectDados, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tipo_saida == 0 && dados.tarefa_completa == 'TRUE')
                    objectDados.qtd_tipo_saida_rolinho_completo += 1;
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tipo_saida == 1 && dados.tarefa_completa == 'TRUE')
                    objectDados.qtd_tipo_saida_fraudado_completo += 1;
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tipo_saida == 0 && dados.tarefa_completa == 'FALSE')
                    objectDados.qtd_tipo_saida_rolinho_nao_completo += 1;
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tipo_saida == 1 && dados.tarefa_completa == 'FALSE')
                    objectDados.qtd_tipo_saida_fraudado_nao_completo += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.tipo_saida == 0 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE')
                    objectDados.qtd_tipo_saida_rolinho_nao_completo_primeiro_turno += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.tipo_saida == 1 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE')
                    objectDados.qtd_tipo_saida_fraudado_nao_completo_primeiro_turno += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.tipo_saida == 0 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE')
                    objectDados.qtd_tipo_saida_rolinho_completo_primeiro_turno += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.tipo_saida == 1 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE')
                    objectDados.qtd_tipo_saida_fraudado_completo_primeiro_turno += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.tipo_saida == 0 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE')
                    objectDados.qtd_tipo_saida_rolinho_nao_completo_segundo_turno += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.tipo_saida == 1 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'FALSE')
                    objectDados.qtd_tipo_saida_fraudado_nao_completo_segundo_turno += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.tipo_saida == 0 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE')
                    objectDados.qtd_tipo_saida_rolinho_completo_segundo_turno += 1;
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.tipo_saida == 1 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE')
                    objectDados.qtd_tipo_saida_fraudado_completo_segundo_turno += 1;

                return objectDados;
            }, {
                qtd_tipo_saida_rolinho_completo: 0,
                qtd_tipo_saida_fraudado_completo: 0,
                qtd_tipo_saida_rolinho_nao_completo: 0,
                qtd_tipo_saida_fraudado_nao_completo: 0,

                qtd_tipo_saida_rolinho_completo_primeiro_turno: 0,
                qtd_tipo_saida_rolinho_nao_completo_primeiro_turno: 0,

                qtd_tipo_saida_fraudado_completo_primeiro_turno: 0,
                qtd_tipo_saida_fraudado_nao_completo_primeiro_turno: 0,

                qtd_tipo_saida_rolinho_completo_segundo_turno: 0,
                qtd_tipo_saida_rolinho_nao_completo_segundo_turno: 0,

                qtd_tipo_saida_fraudado_completo_segundo_turno: 0,
                qtd_tipo_saida_fraudado_nao_completo_segundo_turno: 0,
            });
            vetTotaisTipoSaida.push({
                tipo_tecido: vetTiposTecidos[i],
                data_historico: arrayDatas[j],

                qtd_tipo_saida_rolinho_completo: objetoDadosTipoSaida.qtd_tipo_saida_rolinho_completo,
                qtd_tipo_saida_fraudado_completo: objetoDadosTipoSaida.qtd_tipo_saida_fraudado_completo,
                qtd_tipo_saida_rolinho_nao_completo: objetoDadosTipoSaida.qtd_tipo_saida_rolinho_nao_completo,
                qtd_tipo_saida_fraudado_nao_completo: objetoDadosTipoSaida.qtd_tipo_saida_fraudado_nao_completo,

                qtd_tipo_saida_rolinho_completo_primeiro_turno: objetoDadosTipoSaida.qtd_tipo_saida_rolinho_completo_primeiro_turno,
                qtd_tipo_saida_fraudado_completo_primeiro_turno: objetoDadosTipoSaida.qtd_tipo_saida_fraudado_completo_primeiro_turno,

                qtd_tipo_saida_rolinho_nao_completo_primeiro_turno: objetoDadosTipoSaida.qtd_tipo_saida_rolinho_nao_completo_primeiro_turno,
                qtd_tipo_saida_fraudado_nao_completo_primeiro_turno: objetoDadosTipoSaida.qtd_tipo_saida_fraudado_nao_completo_primeiro_turno,

                qtd_tipo_saida_rolinho_completo_segundo_turno: objetoDadosTipoSaida.qtd_tipo_saida_rolinho_completo_segundo_turno,
                qtd_tipo_saida_fraudado_completo_segundo_turno: objetoDadosTipoSaida.qtd_tipo_saida_fraudado_completo_segundo_turno,

                qtd_tipo_saida_rolinho_nao_completo_segundo_turno: objetoDadosTipoSaida.qtd_tipo_saida_rolinho_nao_completo_segundo_turno,
                qtd_tipo_saida_fraudado_nao_completo_segundo_turno: objetoDadosTipoSaida.qtd_tipo_saida_fraudado_nao_completo_segundo_turno
            })
        }
    }

    for (let i = 0; i < arrayDatas.length; i++) {
        vetOrganizarPorDatas.push(
            vetTotaisTipoSaida.filter((dados) => dados.data_historico == arrayDatas[i])
        )
    }

    return vetOrganizarPorDatas;
}

export {
    funcaoDashboardProducaoTotalPorTecido,
    funcoesDashboardContarTarefaSobrasDeRolo,
    funcoesDashboardContarTarefasCompletas,
    funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido
}