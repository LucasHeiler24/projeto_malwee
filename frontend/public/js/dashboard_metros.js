import { extratDadosGraficoMediaMetrosProduzidos } from "./extrair_dados/extrair_dados_dashboard_metros.js";
import { removerDuplicados } from "./helpers/funcoes_gerais/funcoes.js";
import { criarChangeSelectsDashboardAbaMetrosProduzidos } from "./utils/criar_change_selects/criar_change_selects_dashboard_metros.js";
import { construirGraficoMediaProducao } from "./utils/graficos/grafico_dashboard_aba_metros.js";

function receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos(dadosParaOsGraficos){
    const arrayDatas =removerDuplicados(dadosParaOsGraficos.map((dados) => dados.data_historico));

    let dadosGraficos = [];
    for(let i=0; i<arrayDatas.length; i++){
        dadosGraficos.push(
            ...dadosParaOsGraficos.filter((dados) => dados.data_historico == arrayDatas[i])
        )
    }

    criarChangeSelectsDashboardAbaMetrosProduzidos(
        dadosGraficos,
        arrayDatas,
        document.getElementById('inSelectGraficoPizzaTotaisTurno'),
        document.getElementById('inCheckBoxGraficoPizzaTotaisMetrosTarefasCompletas')
    )

    extratDadosGraficoMediaMetrosProduzidos(
        dadosGraficos,
        arrayDatas,
        "0",
        true
    );

}

let dadosGraficosMediaTotalMetrosProduzidos = null;
function dashboardConstruirGraficoMediaMetrosProduzidos(dados){
    dadosGraficosMediaTotalMetrosProduzidos = construirGraficoMediaProducao(
        dados,
        document.getElementById('canvasGraficoMediaMetros'),
        dadosGraficosMediaTotalMetrosProduzidos
    )
}

export {
    receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos,
    dashboardConstruirGraficoMediaMetrosProduzidos
}