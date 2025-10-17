import alterarDatasAnteriores from "../helpers/funcao_alterar_dias/alterar_datas_anteriores.js";
import alterarDatasPosteriores from "../helpers/funcao_alterar_dias/alterar_datas_posteriores.js";
import { funcaoDashboardProducaoTotalPorTecido } from "../helpers/funcoes_dashboard/functions_dashboard.js";
import getDadosPelaDataBd from "../helpers/get_dados_das_datas/get_dados_das_datas_bd.js";
import { pegarDadosMesEAnoEscolhido } from "../models/EntidadeDados.js";

const controllerGetDadosSemanaisOuQuinzenaisPosteriores = async (request, response) => {

    const data = request.params.data;
    const tipoAnalise = request.params.type;

    const vetDatas = alterarDatasPosteriores(data, tipoAnalise);
    const dados = await getDadosPelaDataBd(vetDatas);

    const dadosTotais = funcaoDashboardProducaoTotalPorTecido(dados, vetDatas);
    return response.json(dadosTotais);
}

const controllerGetDadosSemanaisOuQuinzenaisAnteriores = async (request, response) => {
    
    const data = request.params.data;
    const tipoAnalise = request.params.type;
    
    const vetDatas = alterarDatasAnteriores(data, tipoAnalise);
    const dados = await getDadosPelaDataBd(vetDatas);
    
    const dadosTotais = funcaoDashboardProducaoTotalPorTecido(dados, vetDatas);
    return response.json(dadosTotais);
}

const controllerGetDadosDiario = async (request, response) => {

    const data = request.params.data;

    try{

        const dados = await pegarDadosMesEAnoEscolhido(data);
        return response.json(funcaoDashboardProducaoTotalPorTecido(dados, [data]));

    }
    catch(e){
        return response.json(e);
    }

}

const controllerGetDadosMensal = async (request, response) => {

    const data = request.params.data;

    try{
        const dados = await pegarDadosMesEAnoEscolhido(data);
        const vetDatas = dados.map((dados) => dados.data_historico.split(' ')[0]);

        return response.json(vetDatas);
        //return response.json(funcaoDashboardProducaoTotalPorTecido(dados));
    }
    catch(e){
        return response.json(e);
    }

}

export {
    controllerGetDadosSemanaisOuQuinzenaisPosteriores,
    controllerGetDadosSemanaisOuQuinzenaisAnteriores,
    controllerGetDadosDiario,
    controllerGetDadosMensal
};