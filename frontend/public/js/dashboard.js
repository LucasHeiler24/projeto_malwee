import {
    extrairDadosParaOGraficoMediaPorTipoTecido,
    extrairDashboardSepararDatasTotaisProduzidosPorTipoTecido
} from "./extrair_dados/extrair_dados_dashboard.js";

import verificarTokenUsuario from "./helpers/funcao_token_session.js";

import addOuvinteNosButtonsAlterarData from "./utils/buttons_alterar_datas/adicionar_ouvinte.js";

import {
    criarChangeGraficoMediaTiposTecidosNosSelectDashboard
} from "./utils/criar_change_selects/criar_change_selects_dashboard.js";

import { constuirGraficoMediaPorTipoTecido } from "./utils/graficos/graficos_dashboard.js";

function receberDadosSelecionadosPorData(dadosParaOsGraficos) {
    extrairDashboardSepararDatasTotaisProduzidosPorTipoTecido(
        dadosParaOsGraficos,
        document.getElementById('inSelectMediaDataTipoTecido'),
        document.getElementById('inSelectDataTotalPorTecido')
    );

    criarChangeGraficoMediaTiposTecidosNosSelectDashboard(
        dadosParaOsGraficos,
        document.getElementById('inSelectMediaTipoTecido'),
        document.getElementById('inSelectMediaDataTipoTecido'),
        document.getElementById('inSelectMediaTurnoTipoTecido'),
        document.getElementById("inCheckBoxGraficoMediaTiposTecidos")
    );

    console.log(dadosParaOsGraficos);
    extrairDadosParaOGraficoMediaPorTipoTecido(
        dadosParaOsGraficos,
        dadosParaOsGraficos[0].data_historico,
        "0",
        "0",
        true
    );
}

let dadosGraficoMediaPorTecido = null;
function dashboardConstruirGraficosMediaPorTipoTecidoProduzidos(dados) {
    dadosGraficoMediaPorTecido = constuirGraficoMediaPorTipoTecido(dados, document.getElementById('canvasGraficoTotalMediaDeCadaTecido'), dadosGraficoMediaPorTecido);
}

window.onload = function () {
    const tokenSession = sessionStorage.getItem('token');
    if (!tokenSession) return window.location.href = './login.html';

    (async () => {
        await verificarTokenUsuario(tokenSession);

        document.getElementById('saudacaoUsuario').textContent = `Olá ${sessionStorage.getItem('nome')}`

        const btnAlterarData = document.querySelectorAll('.btnAlterarDatas');
        const htmlCheckboxTipoTempo = document.getElementById('checkboxTipoTempo');
        const divTempoDatas = document.getElementById('divTempoDatas');
        divTempoDatas.style.display = 'none';
        addOuvinteNosButtonsAlterarData(btnAlterarData, divTempoDatas, htmlCheckboxTipoTempo);
    })()
}

export {
    receberDadosSelecionadosPorData,
    dashboardConstruirGraficosMediaPorTipoTecidoProduzidos
}