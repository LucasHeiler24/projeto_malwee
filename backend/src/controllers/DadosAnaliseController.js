import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";

import {
    removerDupliados,
    calcularQuantidadeTempoProducaoPorDia,
    calcularOTempoDeSetupDasDatasDeUmMes,
    somarTotalMetrosPorTiposDeTecidosNoMes,
    pegarTotalDeMetrosPorDiaPeloMes,
    formatarDatasParaAmericanas
} from "../helpers/funcoes.js";

import { funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes, totalMetrosPorDiaPorNumeroTarefa } from "../helpers/funcoes_analise.js";


const analisePorPeriodoSemanal = async function (request, response) {

    const vetSomarSeteDiasNaData = [];

    for (let i = 1; i <= 8; i++) {
        const data = new Date(request.params.date);
        vetSomarSeteDiasNaData.push(
            data.setDate(data.getDate() + i)
        )
    }

    let vetDatasSomadas = [];
    for (let i = 0; i < vetSomarSeteDiasNaData.length; i++) {
        vetDatasSomadas.push(formatarDatasParaAmericanas(new Date(vetSomarSeteDiasNaData[i]).toLocaleDateString().split('/')));
    }

    let dadosSemanais = [];

    for (let i = 0; i < vetDatasSomadas.length; i++) {
        let dados = await pegarDadosMesEAnoEscolhido(vetDatasSomadas[i]);

        if (dados.length != 0) dadosSemanais.push(...dados);
    }

    let totalMetrosProduzidosPorTipoTecidoNaSemana = funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dadosSemanais);
    let totalMetrosPorDiaNaSemana = pegarTotalDeMetrosPorDiaPeloMes(dadosSemanais, vetDatasSomadas);
    let totalTempoProducaoPorDiaNaSemana = calcularQuantidadeTempoProducaoPorDia(dadosSemanais, vetDatasSomadas);
    let totalTempoSetupPorDiaNaSemana = calcularOTempoDeSetupDasDatasDeUmMes(dadosSemanais, vetDatasSomadas);

    let numeroTarefas = removerDupliados(dadosSemanais.map((dados) => dados.numero_da_tarefa));
    let {
        vetTotalMetrosPorNumeroTarefaNosDias,
        vetTotalTempoProducaoPorNumeroTarefaNosDias,
        vetTotalTempoSetupPorNumeroTarefaNosDias } = totalMetrosPorDiaPorNumeroTarefa(dadosSemanais, numeroTarefas, vetDatasSomadas);


    return response.json({
        totalMetrosProduzidosPorTipoTecidoNaSemana,
        totalMetrosPorDiaNaSemana,
        totalTempoProducaoPorDiaNaSemana,
        totalTempoSetupPorDiaNaSemana,
        vetTotalMetrosPorNumeroTarefaNosDias,
        vetTotalTempoProducaoPorNumeroTarefaNosDias,
        vetTotalTempoSetupPorNumeroTarefaNosDias
    });
}

const analisePorPeriodoQuinzenal = async function (request, response) {

    const vetSomarSeteDiasNaData = [];

    for (let i = 1; i <= 16; i++) {
        const data = new Date(request.params.date);
        vetSomarSeteDiasNaData.push(
            data.setDate(data.getDate() + i)
        )
    }

    let vetDatasSomadas = [];
    for (let i = 0; i < vetSomarSeteDiasNaData.length; i++) {
        vetDatasSomadas.push(formatarDatasParaAmericanas(new Date(vetSomarSeteDiasNaData[i]).toLocaleDateString().split('/')));
    }

    let dadosSemanais = [];

    for (let i = 0; i < vetDatasSomadas.length; i++) {
        let dados = await pegarDadosMesEAnoEscolhido(vetDatasSomadas[i]);

        if (dados.length != 0) dadosSemanais.push(...dados);
    }

    let totalMetrosProduzidosPorTipoTecidoNaSemana = funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dadosSemanais);
    let totalMetrosPorDiaNaSemana = pegarTotalDeMetrosPorDiaPeloMes(dadosSemanais, vetDatasSomadas);
    let totalTempoProducaoPorDiaNaSemana = calcularQuantidadeTempoProducaoPorDia(dadosSemanais, vetDatasSomadas);
    let totalTempoSetupPorDiaNaSemana = calcularOTempoDeSetupDasDatasDeUmMes(dadosSemanais, vetDatasSomadas);

    let numeroTarefas = removerDupliados(dadosSemanais.map((dados) => dados.numero_da_tarefa));
    let {
        vetTotalMetrosPorNumeroTarefaNosDias,
        vetTotalTempoProducaoPorNumeroTarefaNosDias,
        vetTotalTempoSetupPorNumeroTarefaNosDias } = totalMetrosPorDiaPorNumeroTarefa(dadosSemanais, numeroTarefas, vetDatasSomadas);


    return response.json({
        totalMetrosProduzidosPorTipoTecidoNaSemana,
        totalMetrosPorDiaNaSemana,
        totalTempoProducaoPorDiaNaSemana,
        totalTempoSetupPorDiaNaSemana,
        vetTotalMetrosPorNumeroTarefaNosDias,
        vetTotalTempoProducaoPorNumeroTarefaNosDias,
        vetTotalTempoSetupPorNumeroTarefaNosDias
    });
}

const analisePorPeriodoMensal = async function (request, response) {

    const vetSomarSeteDiasNaData = [];

    for (let i = 1; i <= 31; i++) {
        const data = new Date(request.params.date);
        vetSomarSeteDiasNaData.push(
            data.setDate(data.getDate() + i)
        )
    }

    let vetDatasSomadas = [];
    for (let i = 0; i < vetSomarSeteDiasNaData.length; i++) {
        vetDatasSomadas.push(formatarDatasParaAmericanas(new Date(vetSomarSeteDiasNaData[i]).toLocaleDateString().split('/')));
    }

    let dadosSemanais = [];

    for (let i = 0; i < vetDatasSomadas.length; i++) {
        let dados = await pegarDadosMesEAnoEscolhido(vetDatasSomadas[i]);

        if (dados.length != 0) dadosSemanais.push(...dados);
    }

    let totalMetrosProduzidosPorTipoTecidoNaSemana = funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dadosSemanais);
    let totalMetrosPorDiaNaSemana = pegarTotalDeMetrosPorDiaPeloMes(dadosSemanais, vetDatasSomadas);
    let totalTempoProducaoPorDiaNaSemana = calcularQuantidadeTempoProducaoPorDia(dadosSemanais, vetDatasSomadas);
    let totalTempoSetupPorDiaNaSemana = calcularOTempoDeSetupDasDatasDeUmMes(dadosSemanais, vetDatasSomadas);

    let numeroTarefas = removerDupliados(dadosSemanais.map((dados) => dados.numero_da_tarefa));
    let {
        vetTotalMetrosPorNumeroTarefaNosDias,
        vetTotalTempoProducaoPorNumeroTarefaNosDias,
        vetTotalTempoSetupPorNumeroTarefaNosDias } = totalMetrosPorDiaPorNumeroTarefa(dadosSemanais, numeroTarefas, vetDatasSomadas);


    return response.json({
        totalMetrosProduzidosPorTipoTecidoNaSemana,
        totalMetrosPorDiaNaSemana,
        totalTempoProducaoPorDiaNaSemana,
        totalTempoSetupPorDiaNaSemana,
        vetTotalMetrosPorNumeroTarefaNosDias,
        vetTotalTempoProducaoPorNumeroTarefaNosDias,
        vetTotalTempoSetupPorNumeroTarefaNosDias
    });
}

const analisePorPeriodoDiario = async function (request, response) {
    const data = request.params.date;

    try {

        const dadosDiario = await pegarDadosMesEAnoEscolhido(data);

        let totalMetrosProduzidosPorTipoTecidoNaSemana = funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dadosDiario);
        let totalMetrosPorDiaNaSemana = pegarTotalDeMetrosPorDiaPeloMes(dadosDiario, [data]);
        let totalTempoProducaoPorDiaNaSemana = calcularQuantidadeTempoProducaoPorDia(dadosDiario, [data]);
        let totalTempoSetupPorDiaNaSemana = calcularOTempoDeSetupDasDatasDeUmMes(dadosDiario, [data]);

        let numeroTarefas = removerDupliados(dadosDiario.map((dados) => dados.numero_da_tarefa));
        let {
            vetTotalMetrosPorNumeroTarefaNosDias,
            vetTotalTempoProducaoPorNumeroTarefaNosDias,
            vetTotalTempoSetupPorNumeroTarefaNosDias } = totalMetrosPorDiaPorNumeroTarefa(dadosDiario, numeroTarefas, [data]);

        return response.json({
            totalMetrosProduzidosPorTipoTecidoNaSemana,
            totalMetrosPorDiaNaSemana,
            totalTempoProducaoPorDiaNaSemana,
            totalTempoSetupPorDiaNaSemana,
            vetTotalMetrosPorNumeroTarefaNosDias,
            vetTotalTempoProducaoPorNumeroTarefaNosDias,
            vetTotalTempoSetupPorNumeroTarefaNosDias
        });

    }
    catch (e) {
        return response.json();
    }

}


export {
    analisePorPeriodoSemanal,
    analisePorPeriodoQuinzenal,
    analisePorPeriodoMensal,
    analisePorPeriodoDiario
};