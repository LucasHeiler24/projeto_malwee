import alterarDatasAnteriores from "../helpers/funcao_alterar_dias/alterar_datas_anteriores.js";
import alterarDatasPosteriores from "../helpers/funcao_alterar_dias/alterar_datas_posteriores.js";
import {
    funcaoDashboardCalcularVelocidadeMediaPorProducao,
    funcaoDashboardProducaoTotalPorTecido,
    funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido,
    funcoesDashboardContarTarefasCompletas,
    funcoesDashboardContarTarefaSobrasDeRolo,
    funcoesDashboardVariantesPorTipoTecido
} from "../helpers/funcoes_dashboard/functions_dashboard.js";
import { funcoesDashboardMetrosCalcularMediaNasDatas } from "../helpers/funcoes_dashboard/functions_dashboard_metros.js";
import { removerDuplicados } from "../helpers/funcoes_gerais/helpers.js";
import getDadosPelaDataBd from "../helpers/get_dados_das_datas/get_dados_das_datas_bd.js";
import { pegarDadosMesEAnoEscolhido } from "../models/EntidadeDados.js";

const controllerGetDadosSemanaisOuQuinzenaisPosteriores = async (request, response) => {

    const data = request.params.data;
    const tipoAnalise = request.params.type;

    const vetDatas = alterarDatasPosteriores(data, tipoAnalise);
    const dados = await getDadosPelaDataBd(vetDatas);

    const dadosTotais = funcaoDashboardProducaoTotalPorTecido(dados, vetDatas);
    const dadosSobraDeRolo = funcoesDashboardContarTarefaSobrasDeRolo(dados, vetDatas);
    // const dadosTotaisTarefasCompletasOuNao = funcoesDashboardContarTarefasCompletas(dados, vetDatas);
    // const dadosTotaisTipoSaida = funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido(dados, vetDatas);
    // const mediaMetrosProduzidos = funcoesDashboardMetrosCalcularMediaNasDatas(dados, vetDatas);

    return response.json({
        dadosTotais,
        dadosSobraDeRolo,
        // dadosTotaisTarefasCompletasOuNao,
        // dadosTotaisTipoSaida,
        // mediaMetrosProduzidos,
    });
}

const controllerGetDadosSemanaisOuQuinzenaisAnteriores = async (request, response) => {

    const data = request.params.data;
    const tipoAnalise = request.params.type;

    const vetDatas = alterarDatasAnteriores(data, tipoAnalise);
    const dados = await getDadosPelaDataBd(vetDatas);

    const dadosTotais = funcaoDashboardProducaoTotalPorTecido(dados, vetDatas);
    const dadosSobraDeRolo = funcoesDashboardContarTarefaSobrasDeRolo(dados, vetDatas);
    // const dadosTotaisTarefasCompletasOuNao = funcoesDashboardContarTarefasCompletas(dados, vetDatas);
    // const dadosTotaisTipoSaida = funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido(dados, vetDatas);
    // const mediaMetrosProduzidos = funcoesDashboardMetrosCalcularMediaNasDatas(dados, vetDatas);

    return response.json({
        dadosTotais,
        dadosSobraDeRolo,
        // dadosTotaisTarefasCompletasOuNao,
        // dadosTotaisTipoSaida,
        // mediaMetrosProduzidos,
    });
}

const controllerGetDadosDiario = async (request, response) => {

    const data = request.params.data;

    try {

        const dados = await pegarDadosMesEAnoEscolhido(data);

        // const dadosTotais = funcaoDashboardProducaoTotalPorTecido(dados, [data]);
        // const dadosSobraDeRolo = funcoesDashboardContarTarefaSobrasDeRolo(dados, [data]);
        const dadosVMPPorTecido = funcaoDashboardCalcularVelocidadeMediaPorProducao(dados, [data]);
        // const dadosTotaisTarefasCompletasOuNao = funcoesDashboardContarTarefasCompletas(dados, [data]);
        // const dadosTotaisTipoSaida = funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido(dados, [data]);
        // const mediaMetrosProduzidos = funcoesDashboardMetrosCalcularMediaNasDatas(dados, [data]);
        //const variantesPorTipoTecido = funcoesDashboardVariantesPorTipoTecido(dados, [data]);

        //return response.json(variantesPorTipoTecido);
        return response.json({
            // dadosTotais,
            // dadosSobraDeRolo,
            dadosVMPPorTecido
            // dadosTotaisTarefasCompletasOuNao,
            // dadosTotaisTipoSaida,
            // mediaMetrosProduzidos,
        });

    }
    catch (e) {
        return response.json(e);
    }

}

const controllerGetDadosMensal = async (request, response) => {

    const data = request.params.data;

    try {
        const dados = await pegarDadosMesEAnoEscolhido(data);
        const vetDatas = removerDuplicados(dados.map((dados) => dados.data_historico.split(' ')[0])).sort();

        const dadosTotais = funcaoDashboardProducaoTotalPorTecido(dados, vetDatas);
        const dadosSobraDeRolo = funcoesDashboardContarTarefaSobrasDeRolo(dados, vetDatas);
        // const dadosTotaisTarefasCompletasOuNao = funcoesDashboardContarTarefasCompletas(dados, vetDatas);
        // const dadosTotaisTipoSaida = funcoesDashboardContarQuantidadeTipoDeSaidaDeCadaTecido(dados, vetDatas);
        // const mediaMetrosProduzidos = funcoesDashboardMetrosCalcularMediaNasDatas(dados, vetDatas);

        return response.json({
            dadosTotais,
            dadosSobraDeRolo,
            // dadosTotaisTarefasCompletasOuNao,
            // dadosTotaisTipoSaida,
            // mediaMetrosProduzidos,
        });
    }
    catch (e) {
        return response.json(e);
    }

}

export {
    controllerGetDadosSemanaisOuQuinzenaisPosteriores,
    controllerGetDadosSemanaisOuQuinzenaisAnteriores,
    controllerGetDadosDiario,
    controllerGetDadosMensal
};