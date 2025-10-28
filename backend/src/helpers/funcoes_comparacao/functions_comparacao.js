function funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(arrayDados, arrayDatas){

    let vetDadosSetupProducaoPorDiaNoPeriodo = [];
    for(let i=0; i<arrayDatas.length; i++){

        let objectDadosSetupProducao = arrayDados.reduce((object, dados) => {
            if(parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
            dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ){
                object.tempo_setup_primeiro_turno += dados.tempo_de_setup;
                object.tempo_producao_primeiro_turno += dados.tempo_de_producao;
                object.metros_produzidos_primeiro_turno += dados.metros_produzidos;
            }

            if(parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
            dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'
            ){
                object.tempo_setup_segundo_turno += dados.tempo_de_setup;
                object.tempo_producao_segundo_turno += dados.tempo_de_producao;
                object.metros_produzidos_segundo_turnos += dados.metros_produzidos;
            }

            if(dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE'){
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

function funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo(arrayDados1, arrayDados2){

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
    let maiorSetup;
    let menorProduzido;

    maiorSetup = (totalSetupEProducaoEntreOPeriodo1.total_setup_data1 < totalSetupEProducaoEntreOPeriodo2.total_setup_data2) ?
    `O segundo período teve um aumento de setup` : `O primeiro período teve um aumento de setup`

    menorProduzido = (totalSetupEProducaoEntreOPeriodo1.total_setup_data1 < totalSetupEProducaoEntreOPeriodo2.total_setup_data2) ? 
    `O segundo período teve um aumento de produção` : `O primeiro período teve um aumento de produção`

    return [{
        variacao_de_setup: Math.abs(calcSetup),
        variacao_de_producao: Math.abs(calcProducao),
        periodo_setup: maiorSetup,
        periodo_producao: menorProduzido
    }]
}

const vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pan', 'Punho New', 'Punho San', 'Punho Elan'
    ];


function funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(arrayDados, arrayDatas){

    let vetDadosDisponibilidadeEntreOsTecidos = [];
    for(let i=0; i<arrayDatas.length; i++){
        for(let j=0; j<vetTiposTecidos.length; j++){
            let objectDisponibilidade = arrayDados.reduce((object, dados) => {

                if(parseInt(dados.data_historico.split(' ')[1].split(':')[0]) < 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tipo_tecido == j && dados.tarefa_completa == 'TRUE'
                ){
                    object.total_setup_primeiro_turno += dados.tempo_de_setup;
                    object.total_producao_primeiro_turno += dados.tempo_de_producao;
                }

                if(parseInt(dados.data_historico.split(' ')[1].split(':')[0]) >= 14 &&
                dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tipo_tecido == j && dados.tarefa_completa == 'TRUE'
                ){
                    object.total_setup_segundo_turno += dados.tempo_de_setup;
                    object.total_producao_segundo_turno += dados.tempo_de_producao;
                }

                if(dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tipo_tecido == j && dados.tarefa_completa == 'TRUE'){
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
                tipo_tecido: vetTiposTecidos[j],
                ...objectDisponibilidade
            })
        }
    }

    let separarPorVetoresTiposDeTecidos = [];

    for(let i=0; i<vetTiposTecidos.length; i++){
        separarPorVetoresTiposDeTecidos.push(
            vetDadosDisponibilidadeEntreOsTecidos.filter((dados) => dados.tipo_tecido == vetTiposTecidos[i])
        )
    }

    return separarPorVetoresTiposDeTecidos;
}

export {
    funcaoComparacaoSetupEProducaoPorDiaNoPeriodo,
    funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo,
    funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo
}