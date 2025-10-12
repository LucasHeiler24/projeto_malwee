//vetores de cadas tipo de tecido
let vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

function somarTotalMetrosPorTiposDeTecidosNoMes(dados) {
    const somaDeMetrosProduzidosPorTipoTecido = [];

    //Faço um for para cada tipo de tecido
    for (let i = 0; i < 6; i++) {

        /**
         * Faço um reduce aonde eu pego pelo tipo de tecido vindos do banco com o índice de cada
         * tipo de tecido do vetor que estou iterando, onde verefica se o índice é igual e somo
         * os metros produzidos por esse tipo de tecido
         */

        let qtdMetrosProduzidosPorTiposTecidos = dados.reduce((somaMetrosPorTecido, regitros) => {

            if (regitros.tipo_tecido == i && regitros.tarefa_completa == 'TRUE')
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
    for (let i = 0; i < vetDatas.length; i++) {
        let somaMetrosPorDia = vetDadosDeCadaDiaDoMes.reduce((somaTotalMetros, regitros) => {
            if (regitros.data_historico.split(' ')[0] == vetDatas[i] && regitros.tarefa_completa == 'TRUE')
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

function somarTotalTempoSetupNoMes(arrayDados) {

    return arrayDados.reduce((somaTotalTempoSetup, dados) => {
        if (dados.tarefa_completa == 'TRUE')
            somaTotalTempoSetup += dados.tempo_de_setup;

        return somaTotalTempoSetup;
    }, 0)

}

function removerDupliados(arrayRemover) {
    return arrayRemover.filter((dados, index) => arrayRemover.indexOf(dados) === index);
}

function formatarDatasParaAmericanas(date) {
    return `${date[2]}-${date[1]}-${date[0]}`;
}

const formatarValor = new Intl.NumberFormat('pt-BR', {
    style: "decimal"
});


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

export {
    pegarTotalDeMetrosPorDiaEProduPeloMes,
    pegarTotalDeMetrosPorDiaPeloMes,
    somarTotalDeMetrosProduzidosNoMes,
    somarTotalDeTempoProducaoNoMes,
    removerDupliados,
    calcularQuantidadeTempoProducaoPorDia,
    calcularOTempoDeSetupDasDatasDeUmMes,
    somarTotalMetrosPorTiposDeTecidosNoMes,
    somarTotalTempoSetupNoMes,
    formatarDatasParaAmericanas,
    formatarValor
}
