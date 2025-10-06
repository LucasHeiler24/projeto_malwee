import {
    getQuantidadeMetrosPorTecido,
    getQuantidadeMetrosProduzidoPorDia,
    getTotalTempoSetupPorDiaDoMes
} from "./requests/fetch_para_o_backend.js"

import { formater, vetCoresParaOsGraficos, vetCoresParaOsGraficos2 } from "./helpers/helpers.js";

import construirGrafico from "./graphics/construir_grafico.js";

window.onload = function () {

    let graficoPizzaMetrosProduzidos;
    let graficoRoscaTempoSetup;

    const graficoPizzaTotalMetrosProduzidosPorMes = document.getElementById('graficoPizzaTotalMetrosProduzidosPorMes');

    function construirGraficoPorMesesDeMetrosPorDia(qtdMetrosPorTarefaProduzidoMes) {

        if (graficoPizzaMetrosProduzidos)
            graficoPizzaMetrosProduzidos.destroy();

        let data = {
            labels: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.diaDoMes),
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
            labels: arrayDadosPorSetup.map((dados) => dados.dia_do_mes),
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

    (async () => {

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