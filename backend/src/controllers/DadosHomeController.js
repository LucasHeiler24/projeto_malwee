import { pegarDadosMesEAnoEscolhido } from "../database/EntidadeDados.js";
import {
    calcularOTempoDeSetupDasDatasDeUmMes,
    pegarTotalDeMetrosPorDiaPeloMes,
    removerDupliados,
    somarTotalMetrosPorTiposDeTecidosNoMes
} from "../helpers/funcoes.js";

//Esse controller pega o total de producao feita por cada tipo de tecido
const dadosMesEscolhido = async function (request, response) {

    //aqui guarda os paramêtros passados na url
    const mes = request.params.mes;
    const ano = request.params.ano;

    try {

        //faço a conexão com o banco com parâmetros vindos na url
        const dados = await pegarDadosMesEAnoEscolhido(`${ano}-${mes}`);

        //retorno a soma de metros produzidos por tipo de tecido
        return response.json(somarTotalMetrosPorTiposDeTecidosNoMes(dados));
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

        //pego somente as datas vindos dos dados do banco
        let vetDadosDeCadaDiaDoMes = dados.map((registros) => registros.data_historico.split(' ')[0]);

        //removo as datas duplicadas
        let removerDatasDuplicadas = removerDupliados(vetDadosDeCadaDiaDoMes);

        //retorno o total de metros produzidos pelo dia do mês
        return response.json(pegarTotalDeMetrosPorDiaPeloMes(dados, removerDatasDuplicadas));

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
    totalTempoSetupPorDiaDoMesProduzido
}