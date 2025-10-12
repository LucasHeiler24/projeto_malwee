import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";

import {
    calcularQuantidadeTempoProducaoPorDia,
    pegarTotalDeMetrosPorDiaEProduPeloMes,
    removerDupliados,
    somarTotalDeMetrosProduzidosNoMes,
    somarTotalDeTempoProducaoNoMes,
    somarTotalTempoSetupNoMes
} from "../helpers/funcoes.js";

import {
    encontrarDiasIguaisEmTempoDeProducaoEmDoisMeses,
    encontrarNumeroTarefasIguaisEmDoisMeses,
    encontrarNumeroTarefasIguaisEmDoisMesesEntreTempoSetup
} from "../helpers/funcoes_diferenca.js";

//controller para a diferença mensal
const diferencaMensalEntreDoisMeses = async function (request, response) {

    const date1 = request.params.date1;
    const date2 = request.params.date2;

    try {

        //conecto com meu banco de dados
        const dadosDate1 = await pegarDadosMesEAnoEscolhido(`${date1}`);
        const dadosDate2 = await pegarDadosMesEAnoEscolhido(`${date2}`);

        let numeroTarefaMes1 = dadosDate1.map((dados) => dados.numero_da_tarefa);
        let removerNumerosDuplicados = removerDupliados(numeroTarefaMes1);

        let { vetNumeroTarefasETempoSetupMes1, vetNumeroTarefasETempoSetupMes2 } = encontrarNumeroTarefasIguaisEmDoisMesesEntreTempoSetup(removerNumerosDuplicados, dadosDate1, dadosDate2);

        //total soma metros de cada mês
        let totalSomaMetrosMes1 = somarTotalDeMetrosProduzidosNoMes(dadosDate1);
        let totalSomaMetrosMes2 = somarTotalDeMetrosProduzidosNoMes(dadosDate2);

        //total soma tempo produção de cada mês
        let totalSomaTempoProducao1 = somarTotalDeTempoProducaoNoMes(dadosDate1);
        let totalSomaTempoProducao2 = somarTotalDeTempoProducaoNoMes(dadosDate2);

        let totalSomaTempoSetupMes1 = somarTotalTempoSetupNoMes(dadosDate1);
        let totalSomaTempoSetupMes2 = somarTotalTempoSetupNoMes(dadosDate2);

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
            totalSomaTempoSetupMes1,
            totalSomaTempoSetupMes2,
            vetNumTarefaMes1,
            vetNumTarefaMes2,
            vetTempoProducao1,
            vetTempoProducao2,
            vetNumeroTarefasETempoSetupMes1,
            vetNumeroTarefasETempoSetupMes2
        })
    }
    catch (e) {
        return response.json(e);
    }

}

export { diferencaMensalEntreDoisMeses }