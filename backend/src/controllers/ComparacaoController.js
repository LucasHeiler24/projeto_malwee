import alterarDatasAnteriores from "../helpers/funcao_alterar_dias/alterar_datas_anteriores.js";
import alterarDatasPosteriores from "../helpers/funcao_alterar_dias/alterar_datas_posteriores.js";
import {
    funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo,
     funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo,
     funcaoComparacaoSetupEProducaoPorDiaNoPeriodo
} from "../helpers/funcoes_comparacao/functions_comparacao.js";
import { removerDuplicados } from "../helpers/funcoes_gerais/helpers.js";
import getDadosPelaDataBd from "../helpers/get_dados_das_datas/get_dados_das_datas_bd.js";
import { pegarDadosMesEAnoEscolhido } from "../models/EntidadeDados.js";

const controllerComparacaoDiaria = async (request, response) => {

    const data1 = request.params.data1;
    const data2 = request.params.data2;

    const dadosDiarios1 = await pegarDadosMesEAnoEscolhido(data1);
    const dadosDiarios2 = await pegarDadosMesEAnoEscolhido(data2);

    const dadosSetupProducao1 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosDiarios1, [data1]);
    const dadosSetupProducao2 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosDiarios2, [data2]);
    const dadosVariacaoEntreOPeriodo = funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo(dadosSetupProducao1, dadosSetupProducao2)

    const dadosDisponibilidade1 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosDiarios1, [data1]);
    const dadosDisponibilidade2 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosDiarios2, [data2]);

    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo,
        dadosDisponibilidade1,
        dadosDisponibilidade2
    })
}

const controllerComparacaoAnterior = async (request, response) => {
    
    const data1 = request.params.data1;
    const data2 = request.params.data2;
    const type = request.params.type;

    const vetDatas1 = alterarDatasAnteriores(data1, type);
    const vetDatas2 = alterarDatasAnteriores(data2, type);

    const dadosDatas1 = await getDadosPelaDataBd(vetDatas1);
    const dadosDatas2 = await getDadosPelaDataBd(vetDatas2);

    const dadosSetupProducao1 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosDatas1, vetDatas1);
    const dadosSetupProducao2 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosDatas2, vetDatas2);
    const dadosVariacaoEntreOPeriodo = funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo(dadosSetupProducao1, dadosSetupProducao2)


    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo
    })

}

const controllerComparacaoPosterior = async (request, response) => {
    
    const data1 = request.params.data1;
    const data2 = request.params.data2;
    const type = request.params.type;

    const vetDatas1 = alterarDatasPosteriores(data1, type);
    const vetDatas2 = alterarDatasPosteriores(data2, type);

    const dadosDatas1 = await getDadosPelaDataBd(vetDatas1);
    const dadosDatas2 = await getDadosPelaDataBd(vetDatas2);

    const dadosSetupProducao1 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosDatas1, vetDatas1);
    const dadosSetupProducao2 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosDatas2, vetDatas2);
    const dadosVariacaoEntreOPeriodo = funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo(dadosSetupProducao1, dadosSetupProducao2)

    const dadosDisponibilidade1 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosDatas1, vetDatas1);
    const dadosDisponibilidade2 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosDatas2, vetDatas2);

    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo
    });
}

const controllerComparacaoMensal = async (request, response) => {
    
    const data1 = request.params.data1;
    const data2 = request.params.data2;

    const dadosMensais1 = await pegarDadosMesEAnoEscolhido(data1);
    const dadosMensais2 = await pegarDadosMesEAnoEscolhido(data2);

    let datasMes1 = removerDuplicados(dadosMensais1.map((dados) => dados.data_historico.split(' ')[0]));
    let datasMes2 = removerDuplicados(dadosMensais2.map((dados) => dados.data_historico.split(' ')[0]));

    const dadosSetupProducao1 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosMensais1, datasMes1);
    const dadosSetupProducao2 = funcaoComparacaoSetupEProducaoPorDiaNoPeriodo(dadosMensais2, datasMes2);
    const dadosVariacaoEntreOPeriodo = funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo(dadosSetupProducao1, dadosSetupProducao2)

    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo
    });
}

export {
    controllerComparacaoDiaria,
    controllerComparacaoAnterior,
    controllerComparacaoPosterior,
    controllerComparacaoMensal
}