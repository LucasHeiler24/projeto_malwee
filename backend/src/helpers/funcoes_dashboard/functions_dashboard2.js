const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];

function funcaoDashboardTempoMedioDeSetup(arrayDados, arrayDatas) {

    let vetTempoMedioSetup = [];
    for (let i = 0; i < arrayDatas.length; i++) {
        for (let j = 0; j < vetTiposTecidos.length; j++) {
            let objectTempoMedioSetup = arrayDados.reduce((objectDados, dados) => {
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
                    dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_setup_primeiro_turno += dados.tempo_de_setup;
                    objectDados.qtd_tarefas_primeiro_turno += 1;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
                    dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_setup_segundo_turno += dados.tempo_de_setup;
                    objectDados.qtd_tarefas_segundo_turno += 1;
                }

                if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_setup_dois_turnos += dados.tempo_de_setup;
                    objectDados.qtd_tarefas_dois_turnos += 1;
                }
                return objectDados;
            }, {
                total_setup_dois_turnos: 0,
                total_setup_primeiro_turno: 0,
                total_setup_segundo_turno: 0,

                qtd_tarefas_dois_turnos: 0,
                qtd_tarefas_primeiro_turno: 0,
                qtd_tarefas_segundo_turno: 0
            });

            vetTempoMedioSetup.push({
                data_historico: arrayDatas[i],
                tipo_tecido: vetTiposTecidos[j],
                media_setup_dois_turnos:
                    (objectTempoMedioSetup.total_setup_dois_turnos == 0) ? 0 :
                        (objectTempoMedioSetup.total_setup_dois_turnos / objectTempoMedioSetup.qtd_tarefas_dois_turnos).toFixed(2),
                media_setup_primeiro_turno:
                    (objectTempoMedioSetup.total_setup_primeiro_turno == 0) ? 0 :
                        (objectTempoMedioSetup.total_setup_primeiro_turno / objectTempoMedioSetup.qtd_tarefas_primeiro_turno).toFixed(2),
                media_setup_segundo_turno:
                    (objectTempoMedioSetup.total_setup_segundo_turno == 0) ? 0 :
                        (objectTempoMedioSetup.total_setup_segundo_turno / objectTempoMedioSetup.qtd_tarefas_segundo_turno).toFixed(2)
            })
        }
    }

    let separarMediaSetupPorDatasETiposTecidos = [];
    for (let i = 0; i < vetTiposTecidos.length; i++) {
        separarMediaSetupPorDatasETiposTecidos.push(
            vetTempoMedioSetup.filter((dados) => {
                if (dados.tipo_tecido == vetTiposTecidos[i])
                    return { ...dados }
            })
        )
    }

    return separarMediaSetupPorDatasETiposTecidos;
}

function funcaoDashboardMetrosVsTempoSetup(arrayDados, arrayDatas) {

    let vetTempoMetrosVsSetup = [];
    for (let i = 0; i < arrayDatas.length; i++) {
        for (let j = 0; j < vetTiposTecidos.length; j++) {
            let objectTempoMetrosVsSetup = arrayDados.reduce((objectDados, dados) => {
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
                    dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_metros_produzidos_primeiro_turno += dados.metros_produzidos;
                    objectDados.total_tempo_setup_primeiro_turno += dados.tempo_de_setup;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
                    dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_metros_produzidos_segundo_turno += dados.metros_produzidos;
                    objectDados.total_tempo_setup_segundo_turno += dados.tempo_de_setup;
                }

                if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_metros_produzidos_dois_turnos += dados.metros_produzidos;
                    objectDados.total_tempo_setup_dois_turnos += dados.tempo_de_setup;
                }
                return objectDados;
            }, {
                total_metros_produzidos_dois_turnos: 0,
                total_metros_produzidos_primeiro_turno: 0,
                total_metros_produzidos_segundo_turno: 0,

                total_tempo_setup_dois_turnos: 0,
                total_tempo_setup_primeiro_turno: 0,
                total_tempo_setup_segundo_turno: 0
            });

            vetTempoMetrosVsSetup.push({
                data_historico: arrayDatas[i],
                tipo_tecido: vetTiposTecidos[j],
                ...objectTempoMetrosVsSetup
            })
        }
    }
    let separarMetrosProduzidosVsSetup = [];
    for (let i = 0; i < vetTiposTecidos.length; i++) {
        separarMetrosProduzidosVsSetup.push(
            vetTempoMetrosVsSetup.filter((dados) => {
                if (dados.tipo_tecido == vetTiposTecidos[i])
                    return { ...dados }
            })
        )
    }

    return separarMetrosProduzidosVsSetup;
}

function funcaoDashboardCalcularProdutividade(arrayDados, arrayDatas) {

    let vetProdutividade = [];
    for (let i = 0; i < arrayDatas.length; i++) {
        for (let j = 0; j < vetTiposTecidos.length; j++) {
            let objectProdutividade = arrayDados.reduce((objectDados, dados) => {
                if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_metros_produzidos_dois_turnos += dados.metros_produzidos;
                    objectDados.total_tempo_setup_dois_turnos += dados.tempo_de_setup;
                }
                return objectDados;
            }, {
                total_metros_produzidos_dois_turnos: 0,
                total_tempo_setup_dois_turnos: 0
            });

            vetProdutividade.push({
                data_historico: arrayDatas[i],
                tipo_tecido: vetTiposTecidos[j],
                ...objectProdutividade,
                produtividade_dois_turnos:
                    (objectProdutividade.total_metros_produzidos_dois_turnos == 0) ? 0 :
                        (objectProdutividade.total_metros_produzidos_dois_turnos / (17 - (objectProdutividade.total_tempo_setup_dois_turnos / 3600))).toFixed(2),
            })
        }
    }
    let separarProdutividade = [];
    for (let i = 0; i < vetTiposTecidos.length; i++) {
        separarProdutividade.push(
            vetProdutividade.filter((dados) => {
                if (dados.tipo_tecido == vetTiposTecidos[i])
                    return { ...dados }
            })
        )
    }

    return separarProdutividade;

}

function funcaoDashboardCalcularMetrosMediosPorTira(arrayDados, arrayDatas) {

    let vetMetrosMediosPorTira = [];
    for (let i = 0; i < arrayDatas.length; i++) {
        for (let j = 0; j < vetTiposTecidos.length; j++) {
            let objectMetrosMediosPorTira = arrayDados.reduce((objectDados, dados) => {
                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
                    dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_metros_produzidos_primeiro_turno += dados.metros_produzidos;
                    objectDados.qtd_tiras_primeiro_turno += dados.quantidade_de_tiras;
                }

                if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
                    dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_metros_produzidos_segundo_turno += dados.metros_produzidos;
                    objectDados.qtd_tiras_segundo_turno += dados.quantidade_de_tiras;
                }

                if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE' &&
                    dados.tipo_tecido == j) {
                    objectDados.total_metros_produzidos_dois_turnos += dados.metros_produzidos;
                    objectDados.qtd_tiras_dois_turnos += dados.quantidade_de_tiras;
                }
                return objectDados;
            }, {
                total_metros_produzidos_dois_turnos: 0,
                total_metros_produzidos_primeiro_turno: 0,
                total_metros_produzidos_segundo_turno: 0,

                qtd_tiras_dois_turnos: 0,
                qtd_tiras_primeiro_turno: 0,
                qtd_tiras_segundo_turno: 0
            });

            vetMetrosMediosPorTira.push({
                data_historico: arrayDatas[i],
                tipo_tecido: vetTiposTecidos[j],

                calc_mmt_dois_turnos:
                    (objectMetrosMediosPorTira.total_metros_produzidos_dois_turnos == 0) ? 0 :
                        (objectMetrosMediosPorTira.total_metros_produzidos_dois_turnos / objectMetrosMediosPorTira.qtd_tiras_dois_turnos).toFixed(2),

                calc_mmt_primeiro_turno:
                    (objectMetrosMediosPorTira.total_metros_produzidos_primeiro_turno == 0) ? 0 :
                        (objectMetrosMediosPorTira.total_metros_produzidos_primeiro_turno / objectMetrosMediosPorTira.qtd_tiras_primeiro_turno).toFixed(2),

                calc_mmt_segundo_turno:
                    (objectMetrosMediosPorTira.total_metros_produzidos_segundo_turno == 0) ? 0 :
                        (objectMetrosMediosPorTira.total_metros_produzidos_segundo_turno / objectMetrosMediosPorTira.qtd_tiras_segundo_turno).toFixed(2),

            })
        }
    }

    let separarMetrosMediosPorTira = [];
    for (let i = 0; i < vetTiposTecidos.length; i++) {
        separarMetrosMediosPorTira.push(
            vetMetrosMediosPorTira.filter((dados) => {
                if (dados.tipo_tecido == vetTiposTecidos[i])
                    return { ...dados }
            })
        )
    }

    return separarMetrosMediosPorTira;
}

export {
    funcaoDashboardTempoMedioDeSetup,
    funcaoDashboardMetrosVsTempoSetup,
    funcaoDashboardCalcularProdutividade,
    funcaoDashboardCalcularMetrosMediosPorTira
}