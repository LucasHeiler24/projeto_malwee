import alterarDatasAnteriores from "../helpers/funcao_alterar_dias/alterar_datas_anteriores.js";
import getDadosPelaDataBd from "../helpers/get_dados_das_datas/get_dados_das_datas_bd.js";
import { pegarDadosMesEAnoEscolhido } from "../models/EntidadeDados.js";

const todosRegistrosDiario = async (request, response) => {
    const data = request.params.data;

    try{
        return response.json(await pegarDadosMesEAnoEscolhido(data));
    }
    catch(e){
        return e;
    }

}

const todosRegistrosSemanaisOuQuinzenaisPosterior = async (request, response) => {

    const data = request.params.data;
    const tipoAnalise = request.params.type;

    try{
        const vetDatas = alterarDatasAnteriores(data, tipoAnalise);
        return response.json(await getDadosPelaDataBd(vetDatas));

    }
    catch(e){
        return e;
    }

}

const todosRegistrosSemanaisOuQuinzenaisAnteriores = async (request, response) => {

    const data = request.params.data;
    const tipoAnalise = request.params.type;

    
    try{
        const vetDatas = alterarDatasAnteriores(data, tipoAnalise);
        return response.json(await getDadosPelaDataBd(vetDatas));

    }
    catch(e){
        return e;
    }

}

const todosRegistrosMensal = async (request, response) => {
    const data = request.params.data;

    try{
        return response.json(await pegarDadosMesEAnoEscolhido(data));
    }
    catch(e){
        return e;
    }

}

export {
    todosRegistrosDiario,
    todosRegistrosSemanaisOuQuinzenaisPosterior,
    todosRegistrosSemanaisOuQuinzenaisAnteriores,
    todosRegistrosMensal
}