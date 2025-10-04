import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";
import {
    separarDiasDifrentesEntreDatasVetor,
    pegarTotalDeMetrosPorDiaPeloMes,
    pegarTotalDeMetrosPorDiaEProduPeloMes,
    removerDupliados,
    calcularQuantidadeTempoProducaoPorDia,
    somarTotalDeMetrosProduzidosNoMes,
    somarTotalDeTempoProducaoNoMes,
    encontrarNumeroTarefasIguaisEmDoisMeses,
    encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses,
    calcularOTempoDeSetupDasDatasDeUmMes
} from "../helpers/funcoes.js";

//vetores de cadas tipo de tecido
let vetTiposTecidos =
    [
        'Meia Malha', 'Cotton', 'Punho Pun',
        'Punho New', 'Punho San', 'Punho Elan'
    ];

//Esse controller pega o total de producao feita por cada tipo de tecido
const dadosMesEscolhido = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const somaDeMetrosProduzidosPorTipoTecido = [];

        for (let i = 0; i < 6; i++) {
            let qtdDeMetrosProduzidos = 0;

            for (let j = 0; j < dados.length; j++) {
                if (dados[j].tipo_tecido == i && dados[j].tarefa_completa == 'TRUE')
                    qtdDeMetrosProduzidos += dados[j].metros_produzidos;
            }

            somaDeMetrosProduzidosPorTipoTecido.push(
                {
                    tipo_tecido: vetTiposTecidos[i],
                    qtd_metros_produzidos: qtdDeMetrosProduzidos
                }
            );
        }

        return response.json(somaDeMetrosProduzidosPorTipoTecido);
    }
    catch (e) {
        return response.json(e);
    }

}

const dadosDeCadaDiaDoMesQtdProduzida = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        let vetDadosDeCadaDiaDoMes = separarDiasDifrentesEntreDatasVetor(dados);

        let vetDadosMetrosPorDia = [];

        for (let i = 0; i < vetDadosDeCadaDiaDoMes.length; i++) {

            let existe = vetDadosMetrosPorDia.find((dados, j) => {
                return dados.diaDoMes == vetDadosDeCadaDiaDoMes[i][j].data_historico.split(' ')[0];
            });

            if (!existe) {
                let diaDoMes;
                let somaPorDia = vetDadosDeCadaDiaDoMes[i].reduce((somaDeCadaDia, dados) => {
                    diaDoMes = dados.data_historico.split(' ')[0];

                    if (dados.tarefa_completa == 'TRUE')
                        somaDeCadaDia += dados.metros_produzidos;

                    return somaDeCadaDia;
                }, 0);

                vetDadosMetrosPorDia.push({ diaDoMes, somaPorDia })
            }
        }

        return response.json({ vetDadosMetrosPorDia });

    }
    catch (e) {
        return response.json(e);
    }

}

const totalMetrosPorNumeroTarefaPorMesPorDia = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        let vetDadosDeCadaDiaDoMes = dados.map((registros) => registros.data_historico.split(' ')[0]);

        let remover = removerDupliados(vetDadosDeCadaDiaDoMes);

        let vetTotalMetrosPorDiaTempoProduzido = calcularQuantidadeTempoProducaoPorDia(dados, remover);

        return response.json(vetTotalMetrosPorDiaTempoProduzido);
    }
    catch (e) {
        response.json(e);
    }

}

const totalMetrosPorNumeroTarefaPorMes = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        let vetDadosDeCadaDiaDoMes = dados.map((registros) => registros.numero_da_tarefa);

        let remover = removerDupliados(vetDadosDeCadaDiaDoMes);

        let vetTotalMetrosPorNumTarefa = pegarTotalDeMetrosPorDiaEProduPeloMes(remover, dados);

        return response.json(vetTotalMetrosPorNumTarefa);
    }
    catch (e) {
        return response.json(e);
    }

}


const pegarTodosOsDadosDoMesSelecionado = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {
        return response.json(await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`));
    }
    catch (e) {
        return response.json(e);
    }

}



//controller para a diferença mensal
const diferencaMensalEntreDoisMeses = async function (request, response) {

    const date1 = request.params.date1;
    const date2 = request.params.date2;

    try {

        //conecto com meu banco de dados
        const dadosDate1 = await pegarDadosMesEAnoEscolhido(`${date1}`);
        const dadosDate2 = await pegarDadosMesEAnoEscolhido(`${date2}`);

        //total soma metros de cada mês
        let totalSomaMetrosMes1 = somarTotalDeMetrosProduzidosNoMes(dadosDate1);
        let totalSomaMetrosMes2 = somarTotalDeMetrosProduzidosNoMes(dadosDate2);

        //total soma tempo produção de cada mês
        let totalSomaTempoProducao1 = somarTotalDeTempoProducaoNoMes(dadosDate1);
        let totalSomaTempoProducao2 = somarTotalDeTempoProducaoNoMes(dadosDate2);

        //aqui eu pego de cada mês a quantidade de metros produzidos que cada número de tarefa fez 
        let vetDadosDeCadaDiaDoMes1 = dadosDate1.map((registros) => registros.numero_da_tarefa);
        let remover1 = removerDupliados(vetDadosDeCadaDiaDoMes1);
        let vetTotalMetrosPorNumTarefaMes1 = pegarTotalDeMetrosPorDiaEProduPeloMes(remover1, dadosDate1);

        let vetDadosDeCadaDiaDoMes2 = dadosDate2.map((registros) => registros.numero_da_tarefa);
        let remover2 = removerDupliados(vetDadosDeCadaDiaDoMes2);
        let vetTotalMetrosPorNumTarefaMes2 = pegarTotalDeMetrosPorDiaEProduPeloMes(remover2, dadosDate2);

        let { vetNumTarefaMes1, vetNumTarefaMes2 } = encontrarNumeroTarefasIguaisEmDoisMeses(vetTotalMetrosPorNumTarefaMes1, vetTotalMetrosPorNumTarefaMes2);

        //aqui eu pego em cada mês a quantidade de tempo de producao por número de tarefa fez
        let vetDadosDeCadaDiaDoMesPorProducao1 = dadosDate1.map((registros) => registros.data_historico.split(' ')[0]);
        let removerDataHistorico1 = removerDupliados(vetDadosDeCadaDiaDoMesPorProducao1);
        let vetTotalMetrosPorDiaTempoProduzido1 = calcularQuantidadeTempoProducaoPorDia(dadosDate1, removerDataHistorico1);

        let vetDadosDeCadaDiaDoMesPorProducao2 = dadosDate2.map((registros) => registros.data_historico.split(' ')[0]);
        let removerDataHistorico2 = removerDupliados(vetDadosDeCadaDiaDoMesPorProducao2);
        let vetTotalMetrosPorDiaTempoProduzido2 = calcularQuantidadeTempoProducaoPorDia(dadosDate2, removerDataHistorico2);

        let { vetTempoProducao1, vetTempoProducao2 } = encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses(vetTotalMetrosPorDiaTempoProduzido1, vetTotalMetrosPorDiaTempoProduzido2);

        return response.json({
            totalSomaMetrosMes1,
            totalSomaMetrosMes2,
            totalSomaTempoProducao1,
            totalSomaTempoProducao2,
            vetNumTarefaMes1,
            vetNumTarefaMes2,
            vetTempoProducao1,
            vetTempoProducao2
        })
    }
    catch (e) {
        return response.json(e);
    }

}

const totalTempoSetupPorDiaDoMesProduzido = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const vetDatasDoMes = dados.map((dados) => dados.data_historico.split(' ')[0]);
        const removerDatasDuplicadas = removerDupliados(vetDatasDoMes);

        const vetCalcularTempoSetup = calcularOTempoDeSetupDasDatasDeUmMes(dados, removerDatasDuplicadas);

        return response.json(vetCalcularTempoSetup);
    }
    catch (e) {
        return response.json(e);
    }

}

export {
    dadosMesEscolhido,
    dadosDeCadaDiaDoMesQtdProduzida,
    totalMetrosPorNumeroTarefaPorMesPorDia,
    totalMetrosPorNumeroTarefaPorMes,
    pegarTodosOsDadosDoMesSelecionado,
    diferencaMensalEntreDoisMeses,
    totalTempoSetupPorDiaDoMesProduzido
};