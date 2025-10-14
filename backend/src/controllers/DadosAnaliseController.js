import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";

import {
    removerDupliados,
    calcularQuantidadeTempoProducaoPorDia,
    calcularOTempoDeSetupDasDatasDeUmMes,
    somarTotalMetrosPorTiposDeTecidosNoMes,
    pegarTotalDeMetrosPorDiaPeloMes,
    formatarDatasParaAmericanas,
    formatarDatas
} from "../helpers/funcoes.js";

import
{
    funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes,
    funcaoAnaliseTotalMetrosNosDias,
    funcaoAnaliseDiferencasEntreDatasMetrosTotais,
    funcaoAnaliseDiferencasEntreDatasTotalProducao,
    funcaoAnaliseDiferencasEntreDatasTotalSetup,
} from "../helpers/funcoes_analise.js";


const analisePorPeriodoSemanal = async function (request, response) {

    let vetSomarSeteDiasNaData;

    for (let i = 1; i <= 9; i++) {
        const data = new Date(request.params.date);
        const data2 = new Date(data);
        let formatarDatas2 = formatarDatas.format(new Date(data2.setDate(data2.getDate() + i))).split(' ')[0];

        if(formatarDatas2 == "sábado,")
            vetSomarSeteDiasNaData.push(
                data.setDate(data.getDate() + (i + 2))
            )
        else if(formatarDatas2 == "domingo,")
            vetSomarSeteDiasNaData.push(
                data.setDate(data.getDate() + (i + 1))
            )
        else vetSomarSeteDiasNaData.push(
            data.setDate(data.getDate() + (i))
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

    let removerDatasDuplicadas = removerDupliados(vetDatasSomadas);
    let totalMetrosProduzidosPorTipoTecidoNaSemana = funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dadosSemanais);
    let totalMetrosPorDiaNaSemana = funcaoAnaliseTotalMetrosNosDias(dadosSemanais, removerDatasDuplicadas);
    let totalTempoProducaoPorDiaNaSemana = calcularQuantidadeTempoProducaoPorDia(dadosSemanais, removerDatasDuplicadas);
    let totalTempoSetupPorDiaNaSemana = calcularOTempoDeSetupDasDatasDeUmMes(dadosSemanais, removerDatasDuplicadas);

    let diferencaDatasMetrosProduzidos = funcaoAnaliseDiferencasEntreDatasMetrosTotais(totalMetrosPorDiaNaSemana);
    let diferencaDatasTempoProducao = funcaoAnaliseDiferencasEntreDatasTotalProducao(totalTempoProducaoPorDiaNaSemana);
    let diferencaDatasTempoSetup = funcaoAnaliseDiferencasEntreDatasTotalSetup(totalTempoSetupPorDiaNaSemana);

    return response.json(
        {
            totalMetrosProduzidosPorTipoTecidoNaSemana,
            totalMetrosPorDiaNaSemana,
            totalTempoProducaoPorDiaNaSemana,
            totalTempoSetupPorDiaNaSemana,
            diferencaDatasMetrosProduzidos,
            diferencaDatasTempoProducao,
            diferencaDatasTempoSetup
        });

}

const analisePorPeriodoQuinzenal = async function (request, response) {

    const vetSomarSeteDiasNaData = [];

    for (let i = 1; i <= 16; i++) {
        const data = new Date(request.params.date);
        const data2 = new Date(data);
        let formatarDatas2 = formatarDatas.format(new Date(data2.setDate(data2.getDate() + i))).split(' ')[0];
       
        if(formatarDatas2 == "sábado,")
            vetSomarSeteDiasNaData.push(
                data.setDate(data.getDate() + (i + 2))
            )
        else if(formatarDatas2 == "domingo,")
            vetSomarSeteDiasNaData.push(
                data.setDate(data.getDate() + (i + 1))
            )
        else vetSomarSeteDiasNaData.push(
            data.setDate(data.getDate() + (i))
        )

        console.log(data2);
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

    let removerDatasDuplicadas = removerDupliados(vetDatasSomadas);
    let totalMetrosProduzidosPorTipoTecidoNaSemana = funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dadosSemanais);
    let totalMetrosPorDiaNaSemana = funcaoAnaliseTotalMetrosNosDias(dadosSemanais, removerDatasDuplicadas);
    let totalTempoProducaoPorDiaNaSemana = calcularQuantidadeTempoProducaoPorDia(dadosSemanais, removerDatasDuplicadas);
    let totalTempoSetupPorDiaNaSemana = calcularOTempoDeSetupDasDatasDeUmMes(dadosSemanais, removerDatasDuplicadas);

    let diferencaDatasMetrosProduzidos = funcaoAnaliseDiferencasEntreDatasMetrosTotais(totalMetrosPorDiaNaSemana);
    let diferencaDatasTempoProducao = funcaoAnaliseDiferencasEntreDatasTotalProducao(totalTempoProducaoPorDiaNaSemana);
    let diferencaDatasTempoSetup = funcaoAnaliseDiferencasEntreDatasTotalSetup(totalTempoSetupPorDiaNaSemana);


    return response.json(
        {
            totalMetrosProduzidosPorTipoTecidoNaSemana,
            totalMetrosPorDiaNaSemana,
            totalTempoProducaoPorDiaNaSemana,
            totalTempoSetupPorDiaNaSemana,
            diferencaDatasMetrosProduzidos,
            diferencaDatasTempoProducao,
            diferencaDatasTempoSetup
        });
}

const analisePorPeriodoMensal = async function (request, response) {

    const vetSomarSeteDiasNaData = [];

    for (let i = 1; i <= 31; i++) {
        const data = new Date(request.params.date);
        const data2 = new Date(data);
        let formatarDatas2 = formatarDatas.format(new Date(data2.setDate(data2.getDate() + i))).split(' ')[0];

        if(formatarDatas2 == "sábado,")
            vetSomarSeteDiasNaData.push(
                data.setDate(data.getDate() + (i + 2))
            )
        else if(formatarDatas2 == "domingo,")
            vetSomarSeteDiasNaData.push(
                data.setDate(data.getDate() + (i + 1))
            )
        else vetSomarSeteDiasNaData.push(
            data.setDate(data.getDate() + (i))
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

    let removerDatasDuplicadas = removerDupliados(vetDatasSomadas);
    let totalMetrosProduzidosPorTipoTecidoNaSemana = funcaoAnaliseTotalMetrosPorTiposDeTecidosNoMes(dadosSemanais);
    let totalMetrosPorDiaNaSemana = funcaoAnaliseTotalMetrosNosDias(dadosSemanais, removerDatasDuplicadas);
    let totalTempoProducaoPorDiaNaSemana = calcularQuantidadeTempoProducaoPorDia(dadosSemanais, removerDatasDuplicadas);
    let totalTempoSetupPorDiaNaSemana = calcularOTempoDeSetupDasDatasDeUmMes(dadosSemanais, removerDatasDuplicadas);

    let diferencaDatasMetrosProduzidos = funcaoAnaliseDiferencasEntreDatasMetrosTotais(totalMetrosPorDiaNaSemana);
    let diferencaDatasTempoProducao = funcaoAnaliseDiferencasEntreDatasTotalProducao(totalTempoProducaoPorDiaNaSemana);
    let diferencaDatasTempoSetup = funcaoAnaliseDiferencasEntreDatasTotalSetup(totalTempoSetupPorDiaNaSemana);

    return response.json(
        {
            totalMetrosProduzidosPorTipoTecidoNaSemana,
            totalMetrosPorDiaNaSemana,
            totalTempoProducaoPorDiaNaSemana,
            totalTempoSetupPorDiaNaSemana,
            diferencaDatasMetrosProduzidos,
            diferencaDatasTempoProducao,
            diferencaDatasTempoSetup
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

        return response.json({
            totalMetrosProduzidosPorTipoTecidoNaSemana,
            totalMetrosPorDiaNaSemana,
            totalTempoProducaoPorDiaNaSemana,
            totalTempoSetupPorDiaNaSemana
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