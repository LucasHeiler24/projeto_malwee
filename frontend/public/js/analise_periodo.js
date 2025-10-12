import construirGrafico from "./graphics/construir_grafico.js";

import {
    vetCoresParaOsGraficos2,
    formater,
    formatarDataParaOsGraficos
} from "./helpers/helpers.js";

import { getDadosDiarios, getDadosMestral, getDadosQuinzenal, getDadosSemanal } from "./requests/fetch_analise.js";

import { getValidToken } from "./requests/fetch_gerais.js";

window.onload = function () {
    let arrayDadosRegistros;

    let graficoBarraMetrosPorDiaNoPeriodo;
    let graficoBarraMetrosPorTecidoPorDiaNoPeriodo;

    async function verificarTipoDeAnalise(sData, tipoFiltroAnalise) {
        if (!sData || !tipoFiltroAnalise) return;

        switch (tipoFiltroAnalise) {
            case '-1':
                return;
            case '0':
                return await getDadosDiarios(sData);
            case '1':
                return await getDadosSemanal(sData);
            case '2':
                return await getDadosQuinzenal(sData);
            case '3':
                return await getDadosMestral(sData);
        }

    }

    const graficoLinhaTotalTipoTecido = document.getElementById('graficoLinhaTotalMetrosPorDiaPorAnalise');
    function construirGraficoBarraMetrosPorDia(arrayDados) {
        if (graficoBarraMetrosPorDiaNoPeriodo) graficoBarraMetrosPorDiaNoPeriodo.destroy();

        let data = {
            labels: arrayDados.map((dados) => formatarDataParaOsGraficos(dados.diaDoMes)),
            datasets: [{
                label: ['Soma total dos metros produzidos por dia'],
                data: arrayDados.map((dados) => formater.format(dados.somaPorDia)),
                backgroundColor: vetCoresParaOsGraficos2,
            }]
        }

        let options = {
            scales: {
                y: {
                    grid: {
                        display: false
                    },
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (itenTooltip) => {
                            return `${itenTooltip.label}: ${itenTooltip.raw}`;
                        }
                    }

                }
            }
        }
        graficoBarraMetrosPorDiaNoPeriodo = construirGrafico(options, data, graficoLinhaTotalTipoTecido, 'bar');
    }

    const graficoLinhaTotalMetrosPorTipoTecidoPorDiaPorAnalise = document.getElementById('graficoLinhaTotalMetrosPorTipoTecidoPorDiaPorAnalise');
    function construirGraficoTotalMetrosPorTipoTecido(arrayDados) {
        if (graficoBarraMetrosPorTecidoPorDiaNoPeriodo) graficoBarraMetrosPorTecidoPorDiaNoPeriodo.destroy();


        graficoBarraMetrosPorTecidoPorDiaNoPeriodo = construirGrafico(options, data, graficoLinhaTotalMetrosPorTipoTecidoPorDiaPorAnalise, 'line');

    }

    function chamarFuncoesParaConstruirGraficos(arrayDados) {
        construirGraficoBarraMetrosPorDia(arrayDados.totalMetrosPorDiaNaSemana);
        construirGraficoTotalMetrosPorTipoTecido(arrayDados.totalMetrosProduzidosPorTipoTecidoNaSemana);
    }

    (async () => {
        const separarCookie = document.cookie.split(';');
        const separarDadosCookieToken = separarCookie[0].split('=');

        const token = separarDadosCookieToken[1];
        if (!token) return window.location.href = './login.html';

        const situacaoToken = await getValidToken(token);

        if (situacaoToken.status != 200) return window.location.href = './login.html';

        const separarDadosCookieNomeUser = separarCookie[1].split('=');

        document.getElementById('nomeUser').textContent = `Olá ${separarDadosCookieNomeUser[1].split(' ')[0]}`;

        let tipoFiltroAnalise;
        let dataSelecionada;
        document.getElementById('inDate').addEventListener('change', async function () {
            dataSelecionada = this.value;
            arrayDadosRegistros = await verificarTipoDeAnalise(dataSelecionada, tipoFiltroAnalise);
            return (!arrayDadosRegistros) ? null : chamarFuncoesParaConstruirGraficos(arrayDadosRegistros)
        });

        document.getElementById('inSelectTypeFiltro').onchange = async function () {
            tipoFiltroAnalise = this.value;
            arrayDadosRegistros = await verificarTipoDeAnalise(dataSelecionada, tipoFiltroAnalise);
            return (!arrayDadosRegistros) ? null : chamarFuncoesParaConstruirGraficos(arrayDadosRegistros)
        }

    })()
}