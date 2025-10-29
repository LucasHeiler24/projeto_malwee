function funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(arrayDados, arrayDatas) {

    let vetDadosSetupProducaoPorDiaNoPeriodo = [];
    for (let i = 0; i < arrayDatas.length; i++) {

        let objectDadosSetupProducao = arrayDados.reduce((object, dados) => {
            if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ) {
                object.tempo_setup_primeiro_turno += dados.tempo_de_setup;
                object.tempo_producao_primeiro_turno += dados.tempo_de_producao;
                object.metros_produzidos_primeiro_turno += dados.metros_produzidos;
            }

            if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ) {
                object.tempo_setup_segundo_turno += dados.tempo_de_setup;
                object.tempo_producao_segundo_turno += dados.tempo_de_producao;
                object.metros_produzidos_segundo_turnos += dados.metros_produzidos;
            }

            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                object.tempo_setup_dois_turnos += dados.tempo_de_setup;
                object.tempo_producao_dois_turnos += dados.tempo_de_producao;
                object.metros_produzidos_dois_turno += dados.metros_produzidos;
            }

            return object;
        }, {
            tempo_setup_dois_turnos: 0,
            tempo_setup_primeiro_turno: 0,
            tempo_setup_segundo_turno: 0,

            tempo_producao_dois_turnos: 0,
            tempo_producao_primeiro_turno: 0,
            tempo_producao_segundo_turno: 0,

            metros_produzidos_dois_turno: 0,
            metros_produzidos_primeiro_turno: 0,
            metros_produzidos_segundo_turnos: 0,
        })

        vetDadosSetupProducaoPorDiaNoPeriodo.push(
            {
                data_historico: arrayDatas[i],
                ...objectDadosSetupProducao
            }
        )

    }

    return vetDadosSetupProducaoPorDiaNoPeriodo;

}

function funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo(arrayDados1, arrayDados2) {

    let totalSetupEProducaoEntreOPeriodo1 = arrayDados1.reduce((object, dados) => {
        object.total_setup_data1 += dados.tempo_setup_dois_turnos;
        object.total_producao_data1 += dados.tempo_producao_dois_turnos;
        object.total_metros_produzidos_data1 += dados.metros_produzidos_dois_turno;

        return object;
    }, {
        total_setup_data1: 0,
        total_producao_data1: 0,
        total_metros_produzidos_data1: 0
    })

    let totalSetupEProducaoEntreOPeriodo2 = arrayDados2.reduce((object, dados) => {
        object.total_setup_data2 += dados.tempo_setup_dois_turnos;
        object.total_producao_data2 += dados.tempo_producao_dois_turnos;
        object.total_metros_produzidos_data2 += dados.metros_produzidos_dois_turno;

        return object;
    }, {
        total_setup_data2: 0,
        total_producao_data2: 0,
        total_metros_produzidos_data2: 0
    });

    let calcSetup = totalSetupEProducaoEntreOPeriodo1.total_setup_data1 - totalSetupEProducaoEntreOPeriodo2.total_setup_data2;
    let calcProducao = totalSetupEProducaoEntreOPeriodo1.total_producao_data1 - totalSetupEProducaoEntreOPeriodo2.total_producao_data2;
    let maiorSetupPeriodo;
    let menorProducaoPeriodo;

    maiorSetupPeriodo = (totalSetupEProducaoEntreOPeriodo1.total_setup_data1 < totalSetupEProducaoEntreOPeriodo2.total_setup_data2) ?
        true : false

    menorProducaoPeriodo = (totalSetupEProducaoEntreOPeriodo1.total_setup_data1 < totalSetupEProducaoEntreOPeriodo2.total_setup_data2) ?
        true : false

    let calcVariacaoPeriodoSetup;
    let calcVariacaoPeriodoProducao;
    let textVariacaoPeriodoSetup;
    let textVariacaoPeriodoProducao;

    if(maiorSetupPeriodo){
        textVariacaoPeriodoSetup = "O segundo período teve uma variação de produção de";
        calcVariacaoPeriodoSetup = (Math.abs(((calcSetup - totalSetupEProducaoEntreOPeriodo2.total_setup_data2) / totalSetupEProducaoEntreOPeriodo2.total_setup_data2) * 100)).toFixed(2)
    }
    if(!maiorSetupPeriodo){
        textVariacaoPeriodoSetup = "O primeiro período teve uma variação de produção de";
        calcVariacaoPeriodoSetup = (Math.abs(((calcSetup - totalSetupEProducaoEntreOPeriodo2.total_setup_data2) / totalSetupEProducaoEntreOPeriodo2.total_setup_data2) * 100)).toFixed(2)
    }
    if(menorProducaoPeriodo){
        textVariacaoPeriodoProducao = "O segundo período teve uma variação de produção de";
        calcVariacaoPeriodoProducao = (Math.abs(((calcProducao - totalSetupEProducaoEntreOPeriodo1.total_producao_data1) / totalSetupEProducaoEntreOPeriodo1.total_producao_data1) * 100)).toFixed(2)
    }
    if(!menorProducaoPeriodo){
        textVariacaoPeriodoProducao = "O primeiro período teve uma variação de produção de";
        calcVariacaoPeriodoProducao = (Math.abs(((calcProducao - totalSetupEProducaoEntreOPeriodo2.total_producao_data2) / totalSetupEProducaoEntreOPeriodo2.total_producao_data2) * 100)).toFixed(2)
    }

    return [{
        textVariacaoPeriodoSetup,
        textVariacaoPeriodoProducao,
        porcentagem_da_variacao_setup: calcVariacaoPeriodoSetup,
        porcentagem_da_variacao_producao: calcVariacaoPeriodoProducao
    }]
}

function funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(arrayDados, arrayDatas) {

    let vetDadosDisponibilidadeEntreOsTecidos = [];
    for (let i = 0; i < arrayDatas.length; i++) {
        let objectDisponibilidade = arrayDados.reduce((object, dados) => {

            if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ) {
                object.total_setup_primeiro_turno += dados.tempo_de_setup;
                object.total_producao_primeiro_turno += dados.tempo_de_producao;
            }

            if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ) {
                object.total_setup_segundo_turno += dados.tempo_de_setup;
                object.total_producao_segundo_turno += dados.tempo_de_producao;
            }

            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                object.total_setup_dois_turnos += dados.tempo_de_setup;
                object.total_producao_dois_turnos += dados.tempo_de_producao;
            }

            return object;
        }, {
            total_producao_dois_turnos: 0,
            total_producao_primeiro_turno: 0,
            total_producao_segundo_turno: 0,

            total_setup_dois_turnos: 0,
            total_setup_primeiro_turno: 0,
            total_setup_segundo_turno: 0,
        })

        vetDadosDisponibilidadeEntreOsTecidos.push({
            data_historico: arrayDatas[i],

            disponibilidade_dois_turnos:
                (objectDisponibilidade.total_producao_dois_turnos == 0) ? 0 :
                    (((objectDisponibilidade.total_producao_dois_turnos) / ((17 * 3600) - objectDisponibilidade.total_setup_dois_turnos)) * 100).toFixed(2),

            disponibilidade_primeiro_turno:
                (objectDisponibilidade.total_producao_primeiro_turno == 0) ? 0 :
                    (((objectDisponibilidade.total_producao_primeiro_turno) / ((17 * 3600) - objectDisponibilidade.total_setup_primeiro_turno)) * 100).toFixed(2),

            disponibilidade_segundo_turno:
                (objectDisponibilidade.total_producao_segundo_turno == 0) ? 0 :
                    (((objectDisponibilidade.total_producao_segundo_turno) / ((17 * 3600) - objectDisponibilidade.total_setup_segundo_turno)) * 100).toFixed(2)
        })
    }

    return vetDadosDisponibilidadeEntreOsTecidos;
}

function funcaoComparacaoTaxaDeProducao(arrayDados, arrayDatas) {

    let vetDadosTaxaDeProducao = [];
    for (let i = 0; i < arrayDatas.length; i++) {
        let objectDadosSetupProducao = arrayDados.reduce((object, dados) => {
            if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ) {
                object.tempo_producao_primeiro_turno += dados.tempo_de_producao;
                object.metros_produzidos_primeiro_turno += dados.metros_produzidos;
            }

            if (parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ) {
                object.tempo_producao_segundo_turno += dados.tempo_de_producao;
                object.metros_produzidos_segundo_turnos += dados.metros_produzidos;
            }

            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                object.tempo_producao_dois_turnos += dados.tempo_de_producao;
                object.metros_produzidos_dois_turno += dados.metros_produzidos;
            }

            return object;
        }, {
            tempo_producao_dois_turnos: 0,
            tempo_producao_primeiro_turno: 0,
            tempo_producao_segundo_turno: 0,

            metros_produzidos_dois_turno: 0,
            metros_produzidos_primeiro_turno: 0,
            metros_produzidos_segundo_turnos: 0,
        })

        vetDadosTaxaDeProducao.push(
            {
                data_historico: arrayDatas[i],

                taxa_de_producao_dois_turnos:
                    (objectDadosSetupProducao.metros_produzidos_dois_turno == 0) ? 0 :
                        (objectDadosSetupProducao.metros_produzidos_dois_turno / objectDadosSetupProducao.tempo_producao_dois_turnos).toFixed(2),

                taxa_de_producao_primeiro_turnos:
                    (objectDadosSetupProducao.metros_produzidos_primeiro_turno == 0) ? 0 :
                        (objectDadosSetupProducao.metros_produzidos_primeiro_turno / objectDadosSetupProducao.tempo_producao_primeiro_turno).toFixed(2),

                taxa_de_producao_segundo_turnos:
                    (objectDadosSetupProducao.metros_produzidos_segundo_turnos == 0) ? 0 :
                        (objectDadosSetupProducao.metros_produzidos_segundo_turnos / objectDadosSetupProducao.tempo_producao_segundo_turno).toFixed(2)
            }
        )

    }

    return vetDadosTaxaDeProducao;

}

export {
    funcaoComparacaoSetupEProducaoPorDiaNoPeriodo,
    funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo,
    funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo,
    funcaoComparacaoTaxaDeProducao
}