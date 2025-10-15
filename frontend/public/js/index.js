import {
    formatarDataParaOsGraficos,
    formater,
    vetCoresParaOsGraficos,
    vetCoresParaOsGraficos2
} from "./helpers/helpers.js";

import construirGrafico from "./graphics/construir_grafico.js";

import {
    getQuantidadeMetrosProduzidoPorDia,
    getTotalTempoSetupPorDiaDoMes
} from "./requests/fetch_home.js";

import { getQuantidadeMetrosPorTecido, getValidToken } from "./requests/fetch_gerais.js";
import { construirGraficoQuantidadeMetrosProduzidosEmCadaDiaDoMes, construirGraficoQuantidadeTotalTempoSetupEmCadaDiaDoMes } from "./utils/graficos/graficos_tela_home.js";
import { construirCardsMetrosProduzidosPorTipoTecidoNoMes } from "./utils/cards/cards_home.js";

window.onload = function () {

    let graficoPizzaMetrosProduzidos;
    let graficoRoscaTempoSetup;

    const graficoPizzaTotalMetrosProduzidosPorMes = document.getElementById('graficoPizzaTotalMetrosProduzidosPorMes');

    function construirGraficoPorMesesDeMetrosPorDia(qtdMetrosPorTarefaProduzidoMes) {
        return construirGraficoQuantidadeMetrosProduzidosEmCadaDiaDoMes(
            graficoPizzaTotalMetrosProduzidosPorMes, qtdMetrosPorTarefaProduzidoMes, graficoPizzaMetrosProduzidos);
    }

    const graficoRoscaTotalTempoSetupPorMes = document.getElementById('graficoRoscaTotalTempoSetupPorMes');
    function contruirGraficoRoscaPorTempoDeSetup(arrayDadosPorSetup) {
        return construirGraficoQuantidadeTotalTempoSetupEmCadaDiaDoMes(
            graficoRoscaTotalTempoSetupPorMes, arrayDadosPorSetup, graficoRoscaTempoSetup);
    }

    const divCards = $('#cards');

    function construirCardsDeTipoDeTecido(arrayDadosTiposTecidos) {
        return construirCardsMetrosProduzidosPorTipoTecidoNoMes(arrayDadosTiposTecidos, divCards);
    }

    function dividirCookies() {
        const separarCookie = document.cookie.split(';');
        const separarDadosCookieNomeUser = separarCookie[1].split('=');

        document.getElementById('nomeUser').textContent = `Olá ${separarDadosCookieNomeUser[1].split(' ')[0]}`;
    }

    (async () => {
        const separarCookie = document.cookie.split(';');
        const separarDadosCookieToken = separarCookie[0].split('=');

        const token = separarDadosCookieToken[1];
        if (!token) return window.location.href = './login.html';

        const situacaoToken = await getValidToken(token);

        if (situacaoToken.status != 200) return window.location.href = './login.html';

        document.cookie = `nome=${situacaoToken.nome}; SameSite=None; Secure; max-age=3600;`;
        document.cookie = `id=${situacaoToken.id}; SameSite=None; Secure; max-age=3600;`;

        dividirCookies();

        let ultimoMes = "08";
        let ultimoAno = "2025";

        const qtdMetrosPorTipoTecido = await getQuantidadeMetrosPorTecido(ultimoAno, ultimoMes);
        const qtdMetrosPorDiaProduzido = await getQuantidadeMetrosProduzidoPorDia(ultimoAno, ultimoMes);
        const qtdDeDiaTempoSetup = await getTotalTempoSetupPorDiaDoMes(ultimoAno, ultimoMes);

        construirGraficoPorMesesDeMetrosPorDia(qtdMetrosPorDiaProduzido);
        contruirGraficoRoscaPorTempoDeSetup(qtdDeDiaTempoSetup);

        construirCardsDeTipoDeTecido(qtdMetrosPorTipoTecido);
    })()

}