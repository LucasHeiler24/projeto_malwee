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

window.onload = function () {

    let graficoPizzaMetrosProduzidos;
    let graficoRoscaTempoSetup;

    const graficoPizzaTotalMetrosProduzidosPorMes = document.getElementById('graficoPizzaTotalMetrosProduzidosPorMes');

    function construirGraficoPorMesesDeMetrosPorDia(qtdMetrosPorTarefaProduzidoMes) {

        console.log(qtdMetrosPorTarefaProduzidoMes);
        if (graficoPizzaMetrosProduzidos)
            graficoPizzaMetrosProduzidos.destroy();

        let data = {
            labels: qtdMetrosPorTarefaProduzidoMes.map((dados) => formatarDataParaOsGraficos(dados.diaDoMes)),
            datasets: [{
                label: "Quantidade de metros produzido",
                data: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.somaPorDia),
                borderWidth: 1,
                backgroundColor: vetCoresParaOsGraficos
            }]
        }
        let options = {
            scales: {
                y: {
                    grid: {
                        display: false
                    },
                    display: false
                },
                x: {
                    grid: {
                        display: false
                    },
                    display: false
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    },
                    position: 'right'
                }
            }
        }
        graficoPizzaMetrosProduzidos = construirGrafico(options, data, graficoPizzaTotalMetrosProduzidosPorMes, 'pie');

    }

    const graficoRoscaTotalTempoSetupPorMes = document.getElementById('graficoRoscaTotalTempoSetupPorMes');
    function contruirGraficoRoscaPorTempoDeSetup(arrayDadosPorSetup) {

        if (graficoRoscaTempoSetup)
            graficoRoscaTempoSetup.destroy();

        let data = {
            labels: arrayDadosPorSetup.map((dados) => formatarDataParaOsGraficos(dados.dia_do_mes)),
            datasets: [{
                label: "Quantidade de tempo de setup",
                data: arrayDadosPorSetup.map((dados) => dados.total_tempo_setup),
                borderWidth: 1,
                backgroundColor: vetCoresParaOsGraficos2
            }]
        }

        let options = {
            scales: {
                y: {
                    grid: {
                        display: false
                    },
                    display: false
                },
                x: {
                    grid: {
                        display: false
                    },
                    display: false
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff'
                    },
                    position: 'right'
                }
            }
        }

        graficoRoscaTempoSetup = construirGrafico(options, data, graficoRoscaTotalTempoSetupPorMes, 'doughnut');
    }

    const divCards = $('#cards');

    function construirCardsDeTipoDeTecido(arrayDadosTiposTecidos) {
        console.log(arrayDadosTiposTecidos)
        divCards.empty();

        arrayDadosTiposTecidos.forEach(dados => {

            divCards.append(`
            
                <div class="card">

                    <div class="card-header">
                        <h1>${dados.tipo_tecido}</h1>
                    </div>

                    <div class="card-body">
                        <h1>${formater.format(dados.qtd_metros_produzidos)}</h1>
                    </div>

                </div>

            `)

        });
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

        console.log(qtdMetrosPorDiaProduzido);
        construirGraficoPorMesesDeMetrosPorDia(qtdMetrosPorDiaProduzido);
        contruirGraficoRoscaPorTempoDeSetup(qtdDeDiaTempoSetup);

        construirCardsDeTipoDeTecido(qtdMetrosPorTipoTecido);
    })()

}