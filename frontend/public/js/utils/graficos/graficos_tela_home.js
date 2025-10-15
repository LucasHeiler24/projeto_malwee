import construirGrafico from "../../graphics/construir_grafico.js";

import {
    formatarDataParaOsGraficos,
    vetCoresParaOsGraficos,
    vetCoresParaOsGraficos2
} from "../../helpers/helpers.js";

function construirGraficoQuantidadeMetrosProduzidosEmCadaDiaDoMes(htmlChartGrafico, dadosMetros, variavelDados) {
    if (variavelDados)
        variavelDados.destroy();

    let data = {
        labels: dadosMetros.map((dados) => formatarDataParaOsGraficos(dados.diaDoMes)),
        datasets: [{
            label: "Quantidade de metros produzido",
            data: dadosMetros.map((dados) => dados.somaPorDia),
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
    variavelDados = construirGrafico(options, data, htmlChartGrafico, 'pie');
}

function construirGraficoQuantidadeTotalTempoSetupEmCadaDiaDoMes(htmlChartGrafico, dadosSetup, variavelDados) {

    if (variavelDados)
        variavelDados.destroy();

    let data = {
        labels: dadosSetup.map((dados) => formatarDataParaOsGraficos(dados.dia_do_mes)),
        datasets: [{
            label: "Quantidade de tempo de setup",
            data: dadosSetup.map((dados) => dados.total_tempo_setup),
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

    variavelDados = construirGrafico(options, data, htmlChartGrafico, 'doughnut');
}

export {
    construirGraficoQuantidadeMetrosProduzidosEmCadaDiaDoMes,
    construirGraficoQuantidadeTotalTempoSetupEmCadaDiaDoMes
}