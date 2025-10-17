import alterarDatasAnteriores from "../helpers/funcao_alterar_dias/alterar_datas_anteriores.js";
import alterarDatasPosteriores from "../helpers/funcao_alterar_dias/alterar_datas_posteriores.js";
import getDadosPelaDataBd from "../helpers/get_dados_das_datas/get_dados_das_datas_bd.js";

const controllerGetDadosSemanaisOuQuinzenaisPosteriores = async (request, response) => {

    const data = request.params.data;
    const tipoAnalise = request.params.type;

    const vetDatas = alterarDatasPosteriores(data, tipoAnalise);
    const dados = await getDadosPelaDataBd(vetDatas);

    return response.json(dados);

}

const controllerGetDadosSemanaisOuQuinzenaisAnteriores = async (request, response) => {

    const data = request.params.data;
    const tipoAnalise = request.params.type;

    const vetDatas = alterarDatasAnteriores(data, tipoAnalise);
    const dados = await getDadosPelaDataBd(vetDatas);

    return response.json(dados);

}

export {
    controllerGetDadosSemanaisOuQuinzenaisPosteriores,
    controllerGetDadosSemanaisOuQuinzenaisAnteriores
};