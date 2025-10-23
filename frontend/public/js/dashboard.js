import {
    receberDadosSelecionadosPorDataGraficoMediaMetrosProduzidos,
    receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos
} from "./dashboard_metros.js";
import {
    extrairDadosGraficoMetrosVsSetup,
    extrairDadosGraficoProdutividade,
    extrairDadosGraficosEficienciaSetup,
    extrairDadosParaGraficosTarefasCompletas,
    extrairDadosParaGraficoTipoSaida,
    extrairDadosParaOGraficoMediaPorTipoTecido,
    extrairDadosParaOGraficoQuantidadeDeTiras,
    extrairDadosParaOGraficoSobraDeRolo,
    extrairDadosParaOGraficoTotalProducao,
} from "./extrair_dados/extrair_dados_dashboard.js";

import verificarTokenUsuario from "./helpers/funcao_token_session.js";
import { removerDuplicados } from "./helpers/funcoes_gerais/funcoes.js";
import separarDatasNosDados from "./helpers/separar_dados_grandes/separar_dados_datas.js";
import separarDadosGrandesGraficos from "./helpers/separar_dados_grandes/separar_dados_grandes.js";
import separarDadosEmPartesDeDatas from "./helpers/separar_dados_grandes/separar_dados_por_datas.js";

import addOuvinteNosButtonsAlterarData from "./utils/buttons_alterar_datas/adicionar_ouvinte.js";
import getDadosPelasDatasEscolhidasHoje from "./utils/buttons_alterar_datas/buttons_alterar_datas.js";
import construirCardEficienciaSetup from "./utils/card-dashboard/card-dashboard-eficiencia-setup.js";

import {
    criarChangeGraficoMediaTiposTecidosNosSelectDashboard,
    criarChangeGraficoTotalProducaoPorTecidoNosSelectDashboard,
    criarChangeSelectsGraficoEficienciaSetup,
    criarChangeSelectsGraficoMetrosVsSetup,
    criarChangeSelectsGraficoProdutividade,
    criarChangeSelectsGraficoQuantidadeDeTiras,
    criarChangeSelectsGraficoSobraDeRoloDashboard,
    criarChangeSelectsGraficoTarefasCompletas,
    criarChangeSelectsGraficoTipoSaida
} from "./utils/criar_change_selects/criar_change_selects_dashboard.js";

import flashMessage from "./utils/flash_messages/flash_message.js";

import {
    construirGraficoMetrosVsSetup,
    construirGraficoQuantidadeDeTiras,
    construirGraficosProdutividade,
    construirGraficoTipoSaida,
    construirGraficoTotalProducaoPorTecido,
    constuirGraficoMediaPorTipoTecido,
    constuirGraficoTarefaCompleta,
    contruirGraficoSobraDeRolo
} from "./utils/graficos/graficos_dashboard.js";

import {
    selectsDashboardConstruirSelectDatas,
    selectsDashboardConstruirSelectsIndexComoPosicaoNoArray,
    selectsDashboardGraficosGrandesSelectData
} from "./utils/selects_dashboard/selects_dashboard.js";

function receberDadosSelecionadosPorDataGraficoQuantidadeDeTirasPorTecido(dadosParaOsGraficos) {

    let arrayDatas = [];
    for (let i = 0; i < dadosParaOsGraficos.length; i++) {
        arrayDatas.push(dadosParaOsGraficos[i][0].data_historico);
    }

    selectsDashboardConstruirSelectsIndexComoPosicaoNoArray(document.getElementById('inSelectSelecionarDataTipoTecidoGraficoQuantidadeDeTiras'), arrayDatas)

    criarChangeSelectsGraficoQuantidadeDeTiras(
        dadosParaOsGraficos,
        document.getElementById('inSelectSelecionarDataTipoTecidoGraficoQuantidadeDeTiras'),
        document.getElementById('inSelectSelecionarTipoTecidoGraficoQuantidadeDeTiras'),
        document.getElementById('inCheckBoxGraficoQuantidadeDeTiras')
    );

    extrairDadosParaOGraficoQuantidadeDeTiras(
        dadosParaOsGraficos,
        "0",
        0,
        true
    );
}

function receberDadosSelecionadosPorDataGraficoEficienciaSetup(dadosParaOsGraficos) {
    let datas = separarDatasNosDados(dadosParaOsGraficos);
    let dadosSeparadosEmDatas = separarDadosEmPartesDeDatas(dadosParaOsGraficos, datas);
    if (dadosSeparadosEmDatas.length != 1) {
        dadosSeparadosEmDatas = separarDadosGrandesGraficos(dadosSeparadosEmDatas);
    }

    selectsDashboardGraficosGrandesSelectData(
        document.getElementById("inSelectGraficoDataEficienciaSetup"),
        dadosSeparadosEmDatas
    );

    criarChangeSelectsGraficoEficienciaSetup(
        dadosSeparadosEmDatas,
        document.getElementById('inSelectGraficoTipoTecidoEficienciaSetup'),
        document.getElementById('inSelectGraficoDataEficienciaSetup'),
        document.getElementById('inSelectGraficoTurnoEficienciaSetup'),
        document.getElementById('inCheckBoxGraficoEficienciaSetup'),
        document.getElementById('titleGraficoEficienciaSetup')
    );

    extrairDadosGraficosEficienciaSetup(
        dadosSeparadosEmDatas,
        0,
        "Meia Malha",
        "0",
        true,
        document.getElementById('titleGraficoEficienciaSetup')
    );
}

function receberDadosSelecionadosPorDataGraficoProdutividade(dadosParaOsGraficos) {
    let datas = separarDatasNosDados(dadosParaOsGraficos);
    let dadosSeparadosEmDatas = separarDadosEmPartesDeDatas(dadosParaOsGraficos, datas);
    if (dadosSeparadosEmDatas.length != 1) {
        dadosSeparadosEmDatas = separarDadosGrandesGraficos(dadosSeparadosEmDatas);
    }

    selectsDashboardGraficosGrandesSelectData(
        document.getElementById("inSelectGraficoDataProdutividade"),
        dadosSeparadosEmDatas
    );

    criarChangeSelectsGraficoProdutividade(
        dadosSeparadosEmDatas,
        document.getElementById('inSelectGraficoTipoTecidoProdutividade'),
        document.getElementById('inSelectGraficoDataProdutividade'),
        document.getElementById('inSelectGraficoTurnoProdutividade'),
        document.getElementById('inCheckBoxGraficoProdutividade'),
        document.getElementById('titleGraficoProdutividade')
    );

    extrairDadosGraficoProdutividade(
        dadosSeparadosEmDatas,
        0,
        "Meia Malha",
        "0",
        true,
        document.getElementById('titleGraficoProdutividade')
    );
}

function receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup(dadosParaOsGraficos) {
    let datas = separarDatasNosDados(dadosParaOsGraficos);
    let dadosSeparadosEmDatas = separarDadosEmPartesDeDatas(dadosParaOsGraficos, datas);
    if (dadosSeparadosEmDatas.length != 1) {
        dadosSeparadosEmDatas = separarDadosGrandesGraficos(dadosSeparadosEmDatas);
    }

    selectsDashboardGraficosGrandesSelectData(
        document.getElementById("inSelectGraficoDataMetrosVsSetup"),
        dadosSeparadosEmDatas
    );

    criarChangeSelectsGraficoMetrosVsSetup(
        dadosSeparadosEmDatas,
        document.getElementById('inSelectGraficoTipoTecidoMetrosVsSetup'),
        document.getElementById('inSelectGraficoDataMetrosVsSetup'),
        document.getElementById('inSelectGraficoTurnoMetrosVsSetup'),
        document.getElementById('inCheckBoxGraficoMetrosVsSetup'),
        document.getElementById('titleGraficoMetrosVsSetup')
    );

    extrairDadosGraficoMetrosVsSetup(
        dadosSeparadosEmDatas,
        "Meia Malha",
        0,
        "0",
        true,
        document.getElementById('titleGraficoMetrosVsSetup')
    )

}

function receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido(dadosParaOsGraficos) {
    let dadosSeparados = dadosParaOsGraficos;
    if (dadosParaOsGraficos.length != 1) {
        dadosSeparados = separarDadosGrandesGraficos(dadosParaOsGraficos);
    }

    selectsDashboardGraficosGrandesSelectData(
        document.getElementById("inSelectGraficoTipoSaidaDatas"),
        dadosSeparados
    );

    criarChangeSelectsGraficoTipoSaida(
        dadosSeparados,
        document.getElementById("inSelectGraficoTipoDeSaidaTipoTecido"),
        document.getElementById('inSelectGraficoTipoSaidaDatas'),
        document.getElementById('inSelectGraficoTipoSaidaTurno'),
        document.getElementById("inCheckBoxGraficoTipoSaida"),
        document.getElementById('titleGraficoTipoSaida')
    );

    extrairDadosParaGraficoTipoSaida(
        dadosSeparados,
        "Meia Malha",
        0,
        "0",
        true,
        document.getElementById('titleGraficoTipoSaida')
    )
}

function receberDadosSelecionadosPorDataGraficoTarefasCompletas(dadosParaOsGraficos) {
    selectsDashboardConstruirSelectDatas(
        document.getElementById('inSelectSelecionarDataTipoTecidoGraficoTarefasCompletas'),
        removerDuplicados(dadosParaOsGraficos.map((dados) => dados.data_historico))
    );

    criarChangeSelectsGraficoTarefasCompletas(
        dadosParaOsGraficos,
        document.getElementById('inSelectSelecionarTipoTecidoGraficoTarefasCompletas'),
        document.getElementById('inSelectSelecionarDataTipoTecidoGraficoTarefasCompletas')
    )

    extrairDadosParaGraficosTarefasCompletas(
        dadosParaOsGraficos,
        dadosParaOsGraficos[0].data_historico,
        "Todos"
    )
}

function receberDadosSelecionadosPorDataGraficoSobraDeRolo(dadosParaOsGraficos) {
    selectsDashboardConstruirSelectDatas(
        document.getElementById('inSelectSelecionarDataTipoTecidoGraficoSobraDeRolo'),
        removerDuplicados(dadosParaOsGraficos.map((dados) => dados.data_historico))
    );

    criarChangeSelectsGraficoSobraDeRoloDashboard(
        dadosParaOsGraficos,
        document.getElementById('inSelectSelecionarTipoTecidoGraficoSobraDeRolo'),
        document.getElementById('inSelectSelecionarDataTipoTecidoGraficoSobraDeRolo'),
        document.getElementById('inCheckBoxGraficoSobraDeRoloPorTecido')
    );

    extrairDadosParaOGraficoSobraDeRolo(
        dadosParaOsGraficos,
        dadosParaOsGraficos[0].data_historico,
        "Todos",
        true
    );
}

function receberDadosSelecionadosPorDataGraficoTotaisProducao(dadosParaOsGraficos) {
    selectsDashboardConstruirSelectDatas(document.getElementById('inSelectMediaDataTipoTecido'), removerDuplicados(dadosParaOsGraficos.map((dados) => dados.data_historico)));
    selectsDashboardConstruirSelectDatas(document.getElementById('inSelectDataTotalPorTecido'), removerDuplicados(dadosParaOsGraficos.map((dados) => dados.data_historico)));

    criarChangeGraficoMediaTiposTecidosNosSelectDashboard(
        dadosParaOsGraficos,
        document.getElementById('inSelectMediaTipoTecido'),
        document.getElementById('inSelectMediaDataTipoTecido'),
        document.getElementById('inSelectMediaTurnoTipoTecido'),
        document.getElementById("inCheckBoxGraficoMediaTiposTecidos"),
        document.getElementById('titleGraficoMediaTecido')
    );

    criarChangeGraficoTotalProducaoPorTecidoNosSelectDashboard(
        dadosParaOsGraficos,
        document.getElementById('inSelectTotalPorTecido'),
        document.getElementById('inSelectDataTotalPorTecido'),
        document.getElementById('inSelectTurnoTotalPorTecido'),
        document.getElementById('inCheckBoxGraficoMediaTotalProducaoPorTecido'),
        document.getElementById('titleGraficoTotalProducaoPorTecido')
    )

    extrairDadosParaOGraficoMediaPorTipoTecido(
        dadosParaOsGraficos,
        dadosParaOsGraficos[0].data_historico,
        "0",
        "0",
        true,
        document.getElementById('titleGraficoMediaTecido')
    );

    extrairDadosParaOGraficoTotalProducao(
        dadosParaOsGraficos,
        dadosParaOsGraficos[0].data_historico,
        "0",
        "0",
        true,
        document.getElementById('titleGraficoTotalProducaoPorTecido')
    )
}

function dashboardConstruirCardsEficienciaSetup(dados) {
    construirCardEficienciaSetup(dados, document.getElementById('kpiEficienciaSetup'));
}

let dadosGraficosProdutividade = null;
function dashboardConstruirGraficoProdutividade(dados) {
    dadosGraficosProdutividade = construirGraficosProdutividade(
        dados,
        document.getElementById('canvasGraficoProdutividade'),
        dadosGraficosProdutividade
    )
}

let dadosGraficosMetrosVsSetup = null;
function dashboardConstruirGraficoMetrosVsSetup(dados) {
    dadosGraficosMetrosVsSetup = construirGraficoMetrosVsSetup(
        dados,
        document.getElementById('canvasGraficoMetrosVsSetup'),
        dadosGraficosMetrosVsSetup
    )
}

let dadosGraficosTipoSaida = null;
function dashboardConstruirGraficoTipoTecido(dados) {
    dadosGraficosTipoSaida = construirGraficoTipoSaida(
        dados,
        document.getElementById('canvasGraficoTipoSaida'),
        dadosGraficosTipoSaida
    )
}

let dadosGraficoTarefasCompletas = null;
function dashboardContruirGraficosTarefasCompletas(dados) {
    dadosGraficoTarefasCompletas = constuirGraficoTarefaCompleta(
        dados,
        document.getElementById('canvasGraficoTarefasCompletas'),
        dadosGraficoTarefasCompletas
    )
}

let dadosGraficoSobraDeRolo = null;
function dashboardConstruirGraficoSobraDeRolo(dados) {
    if (dados.length == 0) return;
    dadosGraficoSobraDeRolo = contruirGraficoSobraDeRolo(
        dados,
        document.getElementById('canvasGraficoSobraDeRolo'),
        dadosGraficoSobraDeRolo
    )
}

let dadosGraficoMediaPorTecido = null;
function dashboardConstruirGraficosMediaPorTipoTecidoProduzidos(dados, filtroDado) {
    dadosGraficoMediaPorTecido = constuirGraficoMediaPorTipoTecido(
        dados,
        document.getElementById('canvasGraficoTotalMediaDeCadaTecido'),
        dadosGraficoMediaPorTecido,
        document.getElementById('porcentagemGraficoMediaMaiorMedia'),
        document.getElementById('metrosGraficoMaiorMedia'),
        document.getElementById('porcentagemGraficoMediaMenorMedia'),
        document.getElementById('metrosGraficoMenorMedia'),
        filtroDado
    );
}

let dadosGraficosTotalProducao = null;
function dashboardContruirGraficoTotalProducaoPorTecido(dados, filtroDado) {
    dadosGraficosTotalProducao = construirGraficoTotalProducaoPorTecido(
        dados,
        document.getElementById("canvasGraficoTotalProducaoPorTecido"),
        dadosGraficosTotalProducao,
        document.getElementById('porcentagemMaiorFooterGraficoTotalPorTecido'),
        document.getElementById('totalMaiorFooterGraficoProducaoPorTecido'),
        document.getElementById('porcentagemMenorFooterGraficoTotalPorTecido'),
        document.getElementById('totalMenorFooterGraficoProducaoPorTecido'),
        document.getElementById('titleFooterGraficoTotalProducaoPorTecido'),
        filtroDado
    )
}

let dadosGraficosQuantidadeDeTiras = null;
function dashboardConstruirGraficoQuantidadeDeTirasPorTecido(dados) {

    dadosGraficosQuantidadeDeTiras = construirGraficoQuantidadeDeTiras(
        dados,
        document.getElementById('canvasGraficoQuantidadeDeTiras'),
        dadosGraficosQuantidadeDeTiras
    )

}

export {
    receberDadosSelecionadosPorDataGraficoTotaisProducao,
    dashboardConstruirGraficosMediaPorTipoTecidoProduzidos,
    dashboardContruirGraficoTotalProducaoPorTecido,
    receberDadosSelecionadosPorDataGraficoSobraDeRolo,
    dashboardConstruirGraficoSobraDeRolo,
    receberDadosSelecionadosPorDataGraficoTarefasCompletas,
    dashboardContruirGraficosTarefasCompletas,
    receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido,
    dashboardConstruirGraficoTipoTecido,
    receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup,
    dashboardConstruirGraficoMetrosVsSetup,
    receberDadosSelecionadosPorDataGraficoProdutividade,
    dashboardConstruirGraficoProdutividade,
    receberDadosSelecionadosPorDataGraficoEficienciaSetup,
    dashboardConstruirCardsEficienciaSetup,
    receberDadosSelecionadosPorDataGraficoQuantidadeDeTirasPorTecido,
    dashboardConstruirGraficoQuantidadeDeTirasPorTecido
}


window.onload = function () {
    const tokenSession = sessionStorage.getItem('token');
    if (!tokenSession) return window.location.href = './login.html';

    const spinner = document.getElementById('openSpinner');
    spinner.style.display = 'none';
    const modalPersonalizarData = document.getElementById("modalDataPersonalizar");
    modalPersonalizarData.style.display = 'none';

    function abrirModalPersonalizarData() {
        modalPersonalizarData.style.display = 'flex';

        const divFlashMessage = document.getElementById('divFlashMessage');

        document.getElementById('btnPersonalizarData').addEventListener('click', async function () {
            spinner.style.display = 'flex';
            const dataSelecionada = document.getElementById('inDataPersonalizar').value;
            const inSelectDataPersonalizar = document.getElementById('inSelectDataPersonalizar').value;
            let tipoTempo;
            document.getElementById('inCheckBoxDataPersonalizar').checked ? tipoTempo = "posterior" : tipoTempo = "anterior"

            if (dataSelecionada == "") return flashMessage(divFlashMessage, 'Selecione uma data!', 'error');

            modalPersonalizarData.style.display = 'none';
            const { dadosTotais, dadosSobraDeRolo, dadosTotaisTarefasCompletasOuNao, dadosTotaisTipoSaida } = await getDadosPelasDatasEscolhidasHoje(inSelectDataPersonalizar, tipoTempo, dataSelecionada);
            spinner.style.display = 'none';
            receberDadosSelecionadosPorDataGraficoTotaisProducao(dadosTotais);
            receberDadosSelecionadosPorDataGraficoSobraDeRolo(dadosSobraDeRolo);
            receberDadosSelecionadosPorDataGraficoTarefasCompletas(dadosTotaisTarefasCompletasOuNao);
            receberDadosSelecionadosPorDataGraficoTipoSaidaPorTecido(dadosTotaisTipoSaida);
            receberDadosSelecionadosPorDataGraficoMetrosProduzidosVsSetup(dadosTotais);
            receberDadosSelecionadosPorDataGraficoProdutividade(dadosTotais);
            receberDadosSelecionadosPorDataGraficoEficienciaSetup(dadosTotais);
            receberDadosSelecionadosPorDataGraficoMediaMetrosProduzidos(mediaMetrosProduzidos);
            receberDadosSelecionadosPorDataGraficoTotaisMetrosProduzidos(mediaMetrosProduzidos);

            return modalPersonalizarData.style.display = 'none';
        })

        document.getElementById('btnFecharModalPersonalizar').addEventListener('click', () => modalPersonalizarData.style.display = 'none');
    }

    (async () => {
        // await verificarTokenUsuario(tokenSession);

        // document.getElementById('saudacaoUsuario').textContent = `Olá ${sessionStorage.getItem('nome')}`;

        // const btnAlterarData = document.querySelectorAll('.btnAlterarDatas');
        // const htmlCheckboxTipoTempo = document.getElementById('checkboxTipoTempo');
        // const divTempoDatas = document.getElementById('divTempoDatas');
        // const spinner = document.getElementById('openSpinner');
        // divTempoDatas.style.display = 'none';

        // addOuvinteNosButtonsAlterarData(btnAlterarData, divTempoDatas, htmlCheckboxTipoTempo, spinner);

        // document.getElementById('btnPersonalizarTempo').addEventListener('click', () => abrirModalPersonalizarData())
    })()
}