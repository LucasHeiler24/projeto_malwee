import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";

import {
    calcularQuantidadeTempoProducaoPorDia,
    removerDupliados
} from "../helpers/funcoes.js";

import {
    calcualarTotalMetrosProduzidosPorTipoTecidoPorDia,
    calcularMediaEVariantesDeTempoDeProducao,
    calcularMediaEVariantesDeTempoSetupPorDia,
    calcularTotalTempoSetupDeCadaTarefaNoMes,
    separarPorDiaDoMesMetrosProduzidos,
    somarTempoDeSetupPorCadaDiaDoMes,
    totalTarefasENaoCompletasNoMes
} from "../helpers/funcoes_grafico.js";

const totalMetrosPorNumeroTarefaPorMesPorDia = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        let vetDadosDeCadaDiaDoMes = dados.map((registros) => registros.data_historico.split(' ')[0]);

        let remover = removerDupliados(vetDadosDeCadaDiaDoMes);

        let vetTotalMetrosPorDiaTempoProduzido = calcularQuantidadeTempoProducaoPorDia(dados, remover);

        let vetTotalTempoProducaoVariantesEMedia = calcularMediaEVariantesDeTempoDeProducao(dados, remover);

        return response.json({ vetTotalMetrosPorDiaTempoProduzido, vetTotalTempoProducaoVariantesEMedia });
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

        let vetDatas = removerDupliados(dados.map((registros) => registros.data_historico.split(' ')[0]));
        let vetDadosMetrosProduzidosNoMes = separarPorDiaDoMesMetrosProduzidos(dados, vetDatas);

        return response.json(vetDadosMetrosProduzidosNoMes);
    }
    catch (e) {
        return response.json(e);
    }

}

const totalTarefasCompletasENaoCompletasNoMes = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {
        return response.json(totalTarefasENaoCompletasNoMes(await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`)));
    }
    catch (e) {
        return response.json(e);
    }

}


const totalTempoSetupPorNumeroTarefa = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const vetNumeroTarefasNoMes = dados.map((dados) => dados.numero_da_tarefa);
        const removerDuplicadosNumeroTarefa = removerDupliados(vetNumeroTarefasNoMes);

        return response.json(calcularTotalTempoSetupDeCadaTarefaNoMes(dados, removerDuplicadosNumeroTarefa));
    }
    catch (e) {
        return response.json(e);
    }

}


const calcularTempoSetupPorDiaDoMes = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const vetDeCadaDiaDoMes = dados.map((dados) => dados.data_historico.split(' ')[0]);

        const removerDatasDuplicadas = removerDupliados(vetDeCadaDiaDoMes);

        const somaTotalTempoSetupPorDiaDoMes = somarTempoDeSetupPorCadaDiaDoMes(dados, removerDatasDuplicadas);
        const mediaEVariantesPorDiaSetup = calcularMediaEVariantesDeTempoSetupPorDia(dados, removerDatasDuplicadas);

        return response.json({ somaTotalTempoSetupPorDiaDoMes, mediaEVariantesPorDiaSetup });
    }
    catch (e) {
        return response.json(e);
    }

}

const totalMetrosPorTipoTecidoNoMes = async function (request, response) {

    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        const datasNosMes = dados.map((dados) => dados.data_historico.split(' ')[0]);
        const removerDatasDuplicadas = removerDupliados(datasNosMes);

        const vet = calcualarTotalMetrosProduzidosPorTipoTecidoPorDia(dados, removerDatasDuplicadas);

        return response.json(vet);
    }
    catch (e) {
        response.json(e);
    }
}

export {
    totalMetrosPorNumeroTarefaPorMesPorDia,
    totalMetrosPorNumeroTarefaPorMes,
    totalTarefasCompletasENaoCompletasNoMes,
    totalTempoSetupPorNumeroTarefa,
    calcularTempoSetupPorDiaDoMes,
    totalMetrosPorTipoTecidoNoMes
}