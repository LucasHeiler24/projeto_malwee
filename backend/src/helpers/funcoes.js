//vetores de cadas tipo de tecido
let vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

function somarTotalMetrosPorTiposDeTecidosNoMes(dados){
    const somaDeMetrosProduzidosPorTipoTecido = [];

    //Faço um for para cada tipo de tecido
    for (let i = 0; i < 6; i++) {

        /**
         * Faço um reduce aonde eu pego pelo tipo de tecido vindos do banco com o índice de cada
         * tipo de tecido do vetor que estou iterando, onde verefica se o índice é igual e somo
         * os metros produzidos por esse tipo de tecido
         */
        
        let qtdMetrosProduzidosPorTiposTecidos = dados.reduce((somaMetrosPorTecido, regitros) => {

            if(regitros.tipo_tecido == i && regitros.tarefa_completa == 'TRUE')
                somaMetrosPorTecido += regitros.metros_produzidos;

            return somaMetrosPorTecido;
        }, 0);

        somaDeMetrosProduzidosPorTipoTecido.push(
            {
                tipo_tecido: vetTiposTecidos[i],
                qtd_metros_produzidos: qtdMetrosProduzidosPorTiposTecidos
            }
        );
    }

    return somaDeMetrosProduzidosPorTipoTecido;
}

function pegarTotalDeMetrosPorDiaPeloMes(vetDadosDeCadaDiaDoMes, vetDatas) {

    let vetTotalMetrosPorDiaDoMes = [];
    
    /**
     * 
     * Aqui eu faço um for aonde itero sobre cada data vindos do vetor como parâmetro
     * onde faço um reduce que verfica se a data é igual aos dados vindos do banco
     * e somo com a quantidade de metros produzidos nesse dia
     * 
     */
    for(let i=0; i<vetDatas.length; i++){
        let somaMetrosPorDia = vetDadosDeCadaDiaDoMes.reduce((somaTotalMetros, regitros) => {
            if(regitros.data_historico.split(' ')[0] == vetDatas[i] && regitros.tarefa_completa == 'TRUE')
                somaTotalMetros += regitros.metros_produzidos;

            return somaTotalMetros;
        }, 0);

        vetTotalMetrosPorDiaDoMes.push(
            {
                diaDoMes: vetDatas[i],
                somaPorDia: somaMetrosPorDia
            }
        )

    }

    return vetTotalMetrosPorDiaDoMes;
}

function pegarTotalDeMetrosPorDiaEProduPeloMes(numerosTarefa, vetDadosDeCadaDiaDoMes) {

    let vetTotalENumeroTarefa = [];
    for (let i = 0; i < numerosTarefa.length; i++) {

        /**
         * 
         * Aqui eu faço um for em cada número de tarefa dos registros do banco
         * onde faço um reduce que é um objeto onde caso bate com o número de tarefa dos
         * registros do banco eu pego o id do registro e também pego a quantidade de metros produzidos
         * e tempo de producao
         *
         */

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

        //E adiciono no vetor o objeto os dados de cada número de tarefa
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

        /**
         * 
         * Aqui eu itero sobre cada data vindos como parâmetro e faço um reduce
         * onde verifico cada data de cada registro do banco de dados se bate com a data
         * sobre que estou iterando e também se a tarefa foi completa se for somo esse tempo de produção
         * dessa tarefa
         * 
         */

        let id_dado;
        let dadosProducao = arrayDados.reduce((somaProducao, dados) => {
            if (dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE') {
                id_dado = dados.id_dado;
                somaProducao += dados.tempo_de_producao;
            }
            return somaProducao;
        }, 0);

        //Adiciono no vetor a soma do tempo de produção de cada data
        vetTotalTempoProducaoPorDia.push({
            id: id_dado,
            data_historico: arrayDatas[i],
            tempo_producao: dadosProducao
        });
    }

    return vetTotalTempoProducaoPorDia;
}



function somarTotalDeMetrosProduzidosNoMes(arrayDados) {

    /**
     * 
     * Aqui eu somo a quantidade de metros produzidos no mês
     * onde faço um reduce que calculo a quantidade de metros e verefico se
     * a tarefa foi completada
     * 
     */

    return arrayDados.reduce((somaTotalMetrosMes, dados) => {
        if (dados.tarefa_completa == 'TRUE')
            somaTotalMetrosMes += dados.metros_produzidos;
        return somaTotalMetrosMes;
    }, 0);

}

function somarTotalDeTempoProducaoNoMes(arrayDados) {

    /**
     * 
     * Aqui eu faço um reduce que pego cada tempo de produção desse mês
     * e verefico se essa tarefa foi completada
     * 
     */

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

        /**
         * 
         * Aqui eu faço um for aonde verefico se o número de tarefa dos dados
         * do mês 1 for igual ao mês 2 e adiciono no vetor a quantidade de metros que foi
         * produzida no mês 1 e o número de tarefa desse mês e faço isso também com o
         * 2 mês 
         * 
         */

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


function somarTempoDeSetupPorCadaDiaDoMes(arrayDados, arrayDatas){


    let vetSomaDeTempoSetupPorDiaDoMes = [];

    for(let i=0; i<arrayDatas.length; i++){

        let somaTempoSetup = arrayDados.reduce((somaSetup, dados) => {
            if(dados.data_historico.split(' ')[0] == arrayDatas[i] && dados.tarefa_completa == 'TRUE')
                somaSetup += dados.tempo_de_setup;
            
            return somaSetup;
        }, 0);

        vetSomaDeTempoSetupPorDiaDoMes.push(
            {
                data_historico: arrayDatas[i],
                tempo_de_setup: somaTempoSetup
            }
        );

    }

    return vetSomaDeTempoSetupPorDiaDoMes;

}

function somarTotalTempoSetupNoMes(arrayDados){

    return arrayDados.reduce((somaTotalTempoSetup, dados) => {
        if(dados.tarefa_completa == 'TRUE')
            somaTotalTempoSetup += dados.tempo_de_setup;
        
        return somaTotalTempoSetup;
    }, 0)

}


function removerDupliados(arrayRemover) {
    return arrayRemover.filter((dados, index) => arrayRemover.indexOf(dados) === index);
}

export {
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
    calcularTotalTempoSetupDeCadaTarefaNoMes,
    somarTotalMetrosPorTiposDeTecidosNoMes,
    somarTempoDeSetupPorCadaDiaDoMes,
    somarTotalTempoSetupNoMes
}
