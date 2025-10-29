import alterarDatasAnteriores from "../helpers/funcao_alterar_dias/alterar_datas_anteriores.js";
import alterarDatasPosteriores from "../helpers/funcao_alterar_dias/alterar_datas_posteriores.js";
import {
    funcaoComparacaoAumentoEDiminuicaoEntreOPeriodo,
    funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo,
    funcaoComparacaoSetupEProducaoPorDiaNoPeriodo,
    funcaoComparacaoTaxaDeProducao
} from "../helpers/funcoes_comparacao/functions_comparacao.js";
import { funcaoDashboardCalcularMetrosMediosPorTira, funcaoDashboardCalcularProdutividade } from "../helpers/funcoes_dashboard/functions_dashboard2.js";
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

    const dadosProdutividade1 = funcaoDashboardCalcularProdutividade(dadosDiarios1, [data1]);
    const dadosProdutividade2 = funcaoDashboardCalcularProdutividade(dadosDiarios2, [data2]);

    const dadosMetrosMediaPorTira1 = funcaoDashboardCalcularMetrosMediosPorTira(dadosDiarios1, [data1]);
    const dadosMetrosMediaPorTira2 = funcaoDashboardCalcularMetrosMediosPorTira(dadosDiarios2, [data2]);

    const dadosTaxaDeProducao1 = funcaoComparacaoTaxaDeProducao(dadosDiarios1, [data1]);
    const dadosTaxaDeProducao2 = funcaoComparacaoTaxaDeProducao(dadosDiarios2, [data2]);

    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo,
        dadosDisponibilidade1,
        dadosDisponibilidade2,
        dadosProdutividade1,
        dadosProdutividade2,
        dadosMetrosMediaPorTira1,
        dadosMetrosMediaPorTira2,
        dadosTaxaDeProducao1,
        dadosTaxaDeProducao2
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

    const dadosDisponibilidade1 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosDatas1, vetDatas1);
    const dadosDisponibilidade2 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosDatas2, vetDatas2);

    const dadosProdutividade1 = funcaoDashboardCalcularProdutividade(dadosDatas1, vetDatas1);
    const dadosProdutividade2 = funcaoDashboardCalcularProdutividade(dadosDatas2, vetDatas2);

    const dadosMetrosMediaPorTira1 = funcaoDashboardCalcularMetrosMediosPorTira(dadosDatas1, vetDatas1);
    const dadosMetrosMediaPorTira2 = funcaoDashboardCalcularMetrosMediosPorTira(dadosDatas2, vetDatas2);

    const dadosTaxaDeProducao1 = funcaoComparacaoTaxaDeProducao(dadosDatas1, vetDatas1);
    const dadosTaxaDeProducao2 = funcaoComparacaoTaxaDeProducao(dadosDatas2, vetDatas2);

    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo,
        dadosDisponibilidade1,
        dadosDisponibilidade2,
        dadosProdutividade1,
        dadosProdutividade2,
        dadosMetrosMediaPorTira1,
        dadosMetrosMediaPorTira2,
        dadosTaxaDeProducao1,
        dadosTaxaDeProducao2
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

    const dadosProdutividade1 = funcaoDashboardCalcularProdutividade(dadosDatas1, vetDatas1);
    const dadosProdutividade2 = funcaoDashboardCalcularProdutividade(dadosDatas2, vetDatas2);

    const dadosMetrosMediaPorTira1 = funcaoDashboardCalcularMetrosMediosPorTira(dadosDatas1, vetDatas1);
    const dadosMetrosMediaPorTira2 = funcaoDashboardCalcularMetrosMediosPorTira(dadosDatas2, vetDatas2);

    const dadosTaxaDeProducao1 = funcaoComparacaoTaxaDeProducao(dadosDatas1, vetDatas1);
    const dadosTaxaDeProducao2 = funcaoComparacaoTaxaDeProducao(dadosDatas2, vetDatas2);

    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo,
        dadosDisponibilidade1,
        dadosDisponibilidade2,
        dadosProdutividade1,
        dadosProdutividade2,
        dadosMetrosMediaPorTira1,
        dadosMetrosMediaPorTira2,
        dadosTaxaDeProducao1,
        dadosTaxaDeProducao2
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

    const dadosDisponibilidade1 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosMensais1, datasMes1);
    const dadosDisponibilidade2 = funcaoComparacaoDisponibilidadeEntreOsTecidosNoPeriodo(dadosMensais2, datasMes2);

    const dadosProdutividade1 = funcaoDashboardCalcularProdutividade(dadosMensais1, datasMes1);
    const dadosProdutividade2 = funcaoDashboardCalcularProdutividade(dadosMensais2, datasMes2);

    const dadosMetrosMediaPorTira1 = funcaoDashboardCalcularMetrosMediosPorTira(dadosMensais1, datasMes1);
    const dadosMetrosMediaPorTira2 = funcaoDashboardCalcularMetrosMediosPorTira(dadosMensais2, datasMes2);

    const dadosTaxaDeProducao1 = funcaoComparacaoTaxaDeProducao(dadosMensais1, datasMes1);
    const dadosTaxaDeProducao2 = funcaoComparacaoTaxaDeProducao(dadosMensais2, datasMes2);

    return response.json({
        dadosSetupProducao1,
        dadosSetupProducao2,
        dadosVariacaoEntreOPeriodo,
        dadosDisponibilidade1,
        dadosDisponibilidade2,
        dadosProdutividade1,
        dadosProdutividade2,
        dadosMetrosMediaPorTira1,
        dadosMetrosMediaPorTira2,
        dadosTaxaDeProducao1,
        dadosTaxaDeProducao2
    });
}

export {
    controllerComparacaoDiaria,
    controllerComparacaoAnterior,
    controllerComparacaoPosterior,
    controllerComparacaoMensal
}