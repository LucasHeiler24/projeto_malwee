const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

function funcaoDashboardCalcularVelocidadeMediaPorProducao(arrayDados, arrayDatas) {

    let vetCalcularVelocidadeMediaPorProducao = [];
    for (let i = 0; i < vetTiposTecidos.length; i++) {
        for (let j = 0; j < arrayDatas.length; j++) {

            let dadosTiposTecido = arrayDados.reduce((objectDados, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.total_metros_produzidos_dois_turnos += dados.metros_produzidos;
                    objectDados.total_tempo_producao_dois_turnos += dados.tempo_de_producao;
                }
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.total_metros_produzidos_primeiro_turno += dados.metros_produzidos;
                    objectDados.total_tempo_producao_primeiro_turno += dados.tempo_de_producao;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.total_metros_produzidos_segundo_turno += dados.metros_produzidos;
                    objectDados.total_tempo_producao_segundo_turno += dados.tempo_de_producao;
                }

                return objectDados;
            }, {
                total_metros_produzidos_dois_turnos: 0,
                total_metros_produzidos_primeiro_turno: 0,
                total_metros_produzidos_segundo_turno: 0,

                total_tempo_producao_dois_turnos: 0,
                total_tempo_producao_primeiro_turno: 0,
                total_tempo_producao_segundo_turno: 0
            })

            vetCalcularVelocidadeMediaPorProducao.push(
                {
                    data_historico: arrayDatas[j],
                    tipo_tecido: vetTiposTecidos[i],
                    total_metros_produzidos: dadosTiposTecido.total_metros_produzidos_dois_turnos,
                    total_tempo_producao: dadosTiposTecido.total_tempo_producao_dois_turnos,

                    total_mvp_no_dia_dois_turnos: (dadosTiposTecido.total_metros_produzidos_dois_turnos == 0) ? 0 : (dadosTiposTecido.total_metros_produzidos_dois_turnos / dadosTiposTecido.total_tempo_producao_dois_turnos).toFixed(2),
                    total_mvp_no_dia_primeiro_turno: (dadosTiposTecido.total_metros_produzidos_dois_turnos == 0) ? 0 : (dadosTiposTecido.total_metros_produzidos_primeiro_turno / dadosTiposTecido.total_tempo_producao_primeiro_turno).toFixed(2),
                    total_mvp_no_dia_segundo_turno: (dadosTiposTecido.total_metros_produzidos_dois_turnos == 0) ? 0 : (dadosTiposTecido.total_metros_produzidos_segundo_turno / dadosTiposTecido.total_tempo_producao_segundo_turno).toFixed(2)
                }
            )
        }
    }

    for (let i = 0; i < arrayDatas.length; i++) {
        const velocidadeMediaNoDia = vetCalcularVelocidadeMediaPorProducao.reduce((objectVMP, dados) => {
            if (arrayDatas[i] == dados.data_historico) {
                objectVMP.soma_total_metros_produzidos += dados.total_metros_produzidos;
                objectVMP.soma_total_tempo_producao += dados.total_tempo_producao;
            }
            return objectVMP;
        }, {
            soma_total_metros_produzidos: 0,
            soma_total_tempo_producao: 0,
        });

        vetCalcularVelocidadeMediaPorProducao.push({
            mvp_no_dia: (velocidadeMediaNoDia.soma_total_metros_produzidos == 0) ? 0 :
                (velocidadeMediaNoDia.soma_total_metros_produzidos / velocidadeMediaNoDia.soma_total_tempo_producao).toFixed(2)
        })
    }

    const vetTotalMetrosProduzidos = vetCalcularVelocidadeMediaPorProducao.map((dados) => dados.total_metros_produzidos);
    const vetTotalTempoProducao = vetCalcularVelocidadeMediaPorProducao.map((dados) => dados.total_tempo_producao);

    // vetCalcularVelocidadeMediaPorProducao.push({
    //     vmp_periodo:
    //         (velocidadeMediaPeriodo.soma_total_metros_produzidos == 0) ? 0
    //             : (velocidadeMediaPeriodo.soma_total_metros_produzidos / velocidadeMediaPeriodo.soma_total_tempo_producao)
    // });
    return vetCalcularVelocidadeMediaPorProducao;
}

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
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.somaTotalMetrosProduzidosCompletosPrimeiroTurno += dados.metros_produzidos;
                    objectDados.somaTotalTempoProduzidosCompletosPrimeiroTurno += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupCompletosPrimeiroTurno += dados.tempo_de_setup;
                    objectDados.total_tarefas_completas_primeiro_turno += 1;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.data_historico.split(' ')[0] == vetDatas[j] && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.somaTotalMetrosProduzidosCompletosSegundoTurno += dados.metros_produzidos;
                    objectDados.somaTotalTempoProduzidosCompletosSegundoTurno += dados.tempo_de_producao;
                    objectDados.somaTotalTempoSetupCompletosSegundoTurno += dados.tempo_de_setup;
                    objectDados.total_tarefas_completas_segundo_turno += 1;
                }

                return objectDados;
            }, {
                total_tarefas_completas: 0,
                total_tarefas_completas_primeiro_turno: 0,
                total_tarefas_completas_segundo_turno: 0,

                somaTotalMetrosProduzidosCompletos: 0,
                somaTotalTempoProducaoCompletos: 0,
                somaTotalTempoSetupCompletos: 0,

                somaTotalMetrosProduzidosCompletosPrimeiroTurno: 0,
                somaTotalTempoProduzidosCompletosPrimeiroTurno: 0,
                somaTotalTempoSetupCompletosPrimeiroTurno: 0,

                somaTotalMetrosProduzidosCompletosSegundoTurno: 0,
                somaTotalTempoProduzidosCompletosSegundoTurno: 0,
                somaTotalTempoSetupCompletosSegundoTurno: 0,
            });

            vetTotaisDados.push({
                tipo_tecido: vetTiposTecidos[i],
                data_historico: vetDatas[j],

                media_totais_metros_completos: (dadosTiposTecido.somaTotalMetrosProduzidosCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosCompletos / dadosTiposTecido.total_tarefas_completas).toFixed(2),
                media_totais_metros_completos_primeiro_turno: (dadosTiposTecido.somaTotalMetrosProduzidosCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_completas_primeiro_turno).toFixed(2),
                media_totais_metros_completos_segundo_turno: (dadosTiposTecido.somaTotalMetrosProduzidosCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalMetrosProduzidosCompletosSegundoTurno / dadosTiposTecido.total_tarefas_completas_segundo_turno).toFixed(2),

                media_totais_tempo_producao_completos: (dadosTiposTecido.somaTotalTempoProducaoCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProducaoCompletos / dadosTiposTecido.total_tarefas_completas).toFixed(2),
                media_totais_tempo_producao_completos_primeiro_turno: (dadosTiposTecido.somaTotalTempoProduzidosCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProduzidosCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_completas_primeiro_turno).toFixed(2),
                media_totais_tempo_producao_completos_segundo_turno: (dadosTiposTecido.somaTotalTempoProduzidosCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoProduzidosCompletosSegundoTurno / dadosTiposTecido.total_tarefas_completas_segundo_turno).toFixed(2),

                media_totais_tempo_setup_completos: (dadosTiposTecido.somaTotalTempoSetupCompletos == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupCompletos / dadosTiposTecido.total_tarefas_completas).toFixed(2),
                media_totais_tempo_setup_completos_primeiro_turno: (dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno / dadosTiposTecido.total_tarefas_completas_primeiro_turno).toFixed(2),
                media_totais_tempo_setup_completos_segundo_turno: (dadosTiposTecido.somaTotalTempoSetupCompletosSegundoTurno == 0) ? 0 : (dadosTiposTecido.somaTotalTempoSetupCompletosSegundoTurno / dadosTiposTecido.total_tarefas_completas_segundo_turno).toFixed(2),

                dados_totais_metros_completos_primeiro_turno: dadosTiposTecido.somaTotalMetrosProduzidosCompletosPrimeiroTurno,
                dados_totais_tempo_producao_completos_primeiro_turno: dadosTiposTecido.somaTotalTempoProduzidosCompletosPrimeiroTurno,
                dados_totais_tempo_setup_completos_primeiro_turno: dadosTiposTecido.somaTotalTempoSetupCompletosPrimeiroTurno,

                dados_totais_metros_completos_segundo_turno: dadosTiposTecido.somaTotalMetrosProduzidosCompletosSegundoTurno,
                dados_totais_tempo_producao_completos_segundo_turno: dadosTiposTecido.somaTotalTempoProduzidosCompletosSegundoTurno,
                dados_totais_tempo_setup_completos_segundo_turno: dadosTiposTecido.somaTotalTempoSetupCompletosSegundoTurno,

                dados_totais_metros_completos: dadosTiposTecido.somaTotalMetrosProduzidosCompletos,
                dados_totais_tempo_producao_completos: dadosTiposTecido.somaTotalTempoProducaoCompletos,
                dados_totais_tempo_setup_completos: dadosTiposTecido.somaTotalTempoSetupCompletos,
            })
        }

    }

    const somaTotalMetrosProduzidosNoPeriodo = vetTotaisDados.reduce((soma, dados) => {
        soma.total_metros_produzidos_no_periodo += dados.dados_totais_metros_completos;
        soma.total_tempo_producao_produzidos_no_periodo += dados.dados_totais_tempo_producao_completos;
        soma.total_tempo_setup_produzidos_no_periodo += dados.dados_totais_tempo_setup_completos;
        return soma;
    }, {
        total_metros_produzidos_no_periodo: 0,
        total_tempo_producao_produzidos_no_periodo: 0,
        total_tempo_setup_produzidos_no_periodo: 0
    });

    vetTotaisDados.push({
        total_metros_produzidos_no_periodo: somaTotalMetrosProduzidosNoPeriodo.total_metros_produzidos_no_periodo,
        eficiencia_bruta_no_periodo: (somaTotalMetrosProduzidosNoPeriodo.total_tempo_producao_produzidos_no_periodo == 0) ? 0 : (somaTotalMetrosProduzidosNoPeriodo.total_tempo_producao_produzidos_no_periodo /
            (somaTotalMetrosProduzidosNoPeriodo.total_tempo_producao_produzidos_no_periodo + somaTotalMetrosProduzidosNoPeriodo.total_tempo_setup_produzidos_no_periodo))
    });

    return vetTotaisDados;

}

function funcoesDashboardContarTarefaSobrasDeRolo(dados, arrayDatas) {

    let vetTarefasSobraDeRolo = [];

    for (let i = 0; i < vetTiposTecidos.length; i++) {
        for (let j = 0; j < arrayDatas.length; j++) {
            let objectDadosTarefasCompletas = dados.reduce((objectDados, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'FALSE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_nao_sobra_de_rolo_completadas += 1;
                }
                if (dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'TRUE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_sobra_de_rolo_completadas += 1;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'TRUE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_sobra_de_rolo_primeiro_turno_completas += 1;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'TRUE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_sobra_de_rolo_segundo_turno_completas += 1;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'FALSE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_nao_sobra_de_rolo_primeiro_turno_completas += 1;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.data_historico.split(' ')[0] == arrayDatas[j] && dados.sobra_de_rolo == 'FALSE' && dados.tipo_tecido == i && dados.tarefa_completa == 'TRUE') {
                    objectDados.qtd_nao_sobra_de_rolo_segundo_turno_completas += 1;
                }

                return objectDados;
            }, {
                qtd_nao_sobra_de_rolo_completadas: 0,
                qtd_sobra_de_rolo_completadas: 0,

                qtd_sobra_de_rolo_primeiro_turno_completas: 0,
                qtd_nao_sobra_de_rolo_primeiro_turno_completas: 0,

                qtd_sobra_de_rolo_segundo_turno_completas: 0,
                qtd_nao_sobra_de_rolo_segundo_turno_completas: 0,
            });

            vetTarefasSobraDeRolo.push({
                data_historico: arrayDatas[j],
                tipo_tecido: vetTiposTecidos[i],
                ...objectDadosTarefasCompletas
            })
        }
    }

    const indiceSobraDeRolo = vetTarefasSobraDeRolo.reduce((soma, dados) => {
        return soma += dados.qtd_sobra_de_rolo_completadas;
    }, 0);

    vetTarefasSobraDeRolo.push({ indice_sobra_de_rolo: ((indiceSobraDeRolo / 100) * 100).toFixed(2) })

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

function funcoesDashboardVariantesPorTipoTecido(arrayDados, arrayDatas) {

    let vetVariantesEmCadaDia = [];
    for (let i = 0; i < arrayDatas.length; i++) {
        let vetVariantesPorTecido = [];
        for (let j = 0; j < vetTiposTecidos.length; j++) {
            let objectTiposTecidos = arrayDados.reduce((objectTiposTecidos, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tipo_tecido == j && dados.tarefa_completa == 'TRUE')
                    objectTiposTecidos.total_metros_tecidos_dois_turnos += dados.metros_produzidos;

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 && dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tipo_tecido == j && dados.tarefa_completa == 'TRUE')
                    objectTiposTecidos.total_metros_tecidos_primeiro_turno += dados.metros_produzidos;

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 && dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tipo_tecido == j && dados.tarefa_completa == 'TRUE')
                    objectTiposTecidos.total_metros_tecido_segundo_turno += dados.metros_produzidos;

                return objectTiposTecidos;
            }, {
                total_metros_tecidos_dois_turnos: 0,
                total_metros_tecidos_primeiro_turno: 0,
                total_metros_tecido_segundo_turno: 0
            });

            vetVariantesPorTecido.push(
                {
                    tipo_tecido: vetTiposTecidos[j],
                    data_historico: arrayDatas[i],
                    total_metros_tecidos_dois_turnos: objectTiposTecidos.total_metros_tecidos_dois_turnos,
                    total_metros_tecidos_primeiro_turno: objectTiposTecidos.total_metros_tecidos_primeiro_turno,
                    total_metros_tecido_segundo_turno: objectTiposTecidos.total_metros_tecido_segundo_turno
                }
            );
        }

        let totalTempoProducaoNoDia = arrayDados.reduce((soma, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE')
                soma += dados.tempo_de_producao;
            return soma;
        }, 0);

        vetVariantesEmCadaDia.push({
            tempo_producao_no_dia: totalTempoProducaoNoDia,
            ...vetVariantesPorTecido
        });
    }

    return vetVariantesEmCadaDia;
}

export {
    funcaoDashboardProducaoTotalPorTecido,
    funcoesDashboardContarTarefaSobrasDeRolo,
    funcoesDashboardContarTarefasCompletas,
    funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido,
    funcoesDashboardVariantesPorTipoTecido,
    funcaoDashboardCalcularVelocidadeMediaPorProducao
}