import chartJs from "../../graphics/Chart.js";
import { coresGrafiposPizzaTiposTecidos } from "../../helpers/funcoes_gerais/funcoes.js";

function construirGraficoMediaProducao(
    dados,
    htmlCanvasGrafico,
    variavelChart
) {

    if (variavelChart) variavelChart.destroy();

    let data = {
        labels: dados.map((dados) => new Date(`${dados.data_historico} 00:00:00`).toLocaleDateString()),
        datasets: [{
            label: "Teve a média",
            data: dados.map((dados) => dados.media),
            backgroundColor: coresGrafiposPizzaTiposTecidos
        }]
    }

    let options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return chartJs(data, options, htmlCanvasGrafico, 'doughnut');
}

function construirGraficoTotalMetrosProduzidos(
    dados,
    htmlCanvasGrafico,
    variavelChart
) {

    console.log(dados);
    if (variavelChart) variavelChart.destroy();

    let data = {
        labels: dados.map((dados) => new Date(`${dados.data_historico} 00:00:00`).toLocaleDateString()),
        datasets: [
            {
                label: 'Total metros produzidos no dia',
                data: dados.map((dados) => dados.total),
                backgroundColor: coresGrafiposPizzaTiposTecidos[0]
            },
            {
                label: 'Total metros produzidos no 1° Turno',
                data: dados.map((dados) => dados.total_primeiro_turno),
                backgroundColor: coresGrafiposPizzaTiposTecidos[1]
            },
            {
                label: 'Total metros produzidos no 2° Turno',
                data: dados.map((dados) => dados.total_segundo_turno),
                backgroundColor: coresGrafiposPizzaTiposTecidos[2]
            }
        ]
    }

    let options = {
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                border: {
                    display: false
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }

    return chartJs(data, options, htmlCanvasGrafico, 'bar');

}

export {
    construirGraficoMediaProducao,
    construirGraficoTotalMetrosProduzidos
}