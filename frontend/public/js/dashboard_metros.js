import { extrairDadosGraficoMediaMetrosProduzidos, extrairDadosGraficoTotaisMetrosProduzidos } from "./extrair_dados/extrair_dados_dashboard_metros.js";
import separarDadosGrandesGraficos from "./helpers/separar_dados_grandes/separar_dados_grandes.js";
import separarDadosGrandesGraficosTotais from "./helpers/separar_dados_grandes/separar_dados_totais.js";
import { funcaoConstruirCardMediaMetrosProduzidos } from "./utils/card-dashboard/card-dashboard-metros-grafico-pizza.js";
import { criarChangeSelectsDashboardAbaMetrosProduzidos, criarChangeSelectsDashboardAbaMetrosProduzidosMetrosTotais } from "./utils/criar_change_selects/criar_change_selects_dashboard_metros.js";
import { construirGraficoMediaProducao, construirGraficoTotalMetrosProduzidos } from "./utils/graficos/grafico_dashboard_aba_metros.js";
import { selectsDashboardGraficosGrandesSelectData } from "./utils/selects_dashboard/selects_dashboard.js";

function receberDadosSelecionadosPorDataGraficoMediaMetrosProduzidos(dadosParaOsGraficos) {
    criarChangeSelectsDashboardAbaMetrosProduzidos(
        dadosParaOsGraficos,
        document.getElementById('inSelectGraficoPizzaTotaisTurno'),
        document.getElementById('inCheckBoxGraficoPizzaTotaisMetrosTarefasCompletas')
    )

    extrairDadosGraficoMediaMetrosProduzidos(
        dadosParaOsGraficos,
        "0",
        true
    );
}

function receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos(dadosParaOsGraficos) {

    const dadosSeparados = separarDadosGrandesGraficosTotais(dadosParaOsGraficos);
    selectsDashboardGraficosGrandesSelectData(document.getElementById('inSelectGraficoTotaisMetrosProduzidosDatas'), dadosSeparados);

    criarChangeSelectsDashboardAbaMetrosProduzidosMetrosTotais(
        dadosSeparados,
        document.getElementById('inSelectGraficoTotaisMetrosProduzidosDatas'),
        document.getElementById('inCheckBoxGraficoPizzaTotaisMetrosTarefasCompletas2')
    );

    extrairDadosGraficoTotaisMetrosProduzidos(
        dadosSeparados,
        0,
        true
    )

}

let dadosGraficosTotalMetrosProduzidos = null;
function dashboardContruirGraficosTotaisMetrosProduzidos(dados) {
    dadosGraficosTotalMetrosProduzidos = construirGraficoTotalMetrosProduzidos(
        dados,
        document.getElementById('canvasGraficoTotaisMetrosProduzidos'),
        dadosGraficosTotalMetrosProduzidos
    )
}

let dadosGraficosMediaTotalMetrosProduzidos = null;
function dashboardConstruirGraficoMediaMetrosProduzidos(dados) {
    dadosGraficosMediaTotalMetrosProduzidos = construirGraficoMediaProducao(
        dados,
        document.getElementById('canvasGraficoMediaMetros'),
        dadosGraficosMediaTotalMetrosProduzidos
    )
    funcaoConstruirCardMediaMetrosProduzidos(dados, document.getElementById("cardsMediaMetrosProduzidos"))
}

export {
    receberDadosSelecionadosPorDataGraficoMediaMetrosProduzidos,
    dashboardConstruirGraficoMediaMetrosProduzidos,
    receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos,
    dashboardContruirGraficosTotaisMetrosProduzidos
}