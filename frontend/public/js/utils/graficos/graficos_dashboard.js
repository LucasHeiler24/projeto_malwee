import chartJs from "../../graphics/Chart.js"
import { coresGraficosBarrasProducao, coresGraficosDuasBarras, coresGraficosDuasBarrasSobrados, coresGrafiposPizzaTiposTecidos, formatarValores } from "../../helpers/funcoes_gerais/funcoes.js";

function constuirGraficoMediaPorTipoTecido(
    dados,
    htmlCanvas,
    dadosGraficoMediaPorTecido,
    htmlPorcentagemMaior,
    htmlMetrosMaior,
    htmlPorcentagemMenor,
    htmlMetrosMenor,
    filtroDado
) {

    if (dadosGraficoMediaPorTecido) dadosGraficoMediaPorTecido.destroy();

    const dadosParaOsGraficos = dados.filter((dados) => dados.media != 0);
    let numerosMedia = dadosParaOsGraficos.map((dados) => parseFloat(dados.media));
    let somaTotalMedia = numerosMedia.reduce((soma, dados) => { return soma += dados }, 0);

    let maior = 0;
    let menor = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < numerosMedia.length; i++) {
        if (maior < numerosMedia[i])
            maior = numerosMedia[i];
        if (menor > numerosMedia[i])
            menor = numerosMedia[i];
    }

    if (menor != Number.MAX_SAFE_INTEGER && maior != 0) {
        if (filtroDado == "0") {
            htmlPorcentagemMaior.innerHTML = `${((maior * 100) / somaTotalMedia).toFixed(2)} %`;
            htmlPorcentagemMenor.innerHTML = `${((menor * 100) / somaTotalMedia).toFixed(2)} %`;
            htmlMetrosMaior.innerHTML = `${maior} m`;
            htmlMetrosMenor.innerHTML = `${menor} m`;
        }
        if (filtroDado == "1" || filtroDado == "2") {
            htmlPorcentagemMaior.innerHTML = `${((maior * 100) / somaTotalMedia).toFixed(2)} %`;
            htmlPorcentagemMenor.innerHTML = `${((menor * 100) / somaTotalMedia).toFixed(2)} %`;
            htmlMetrosMaior.innerHTML = `${maior} min`;
            htmlMetrosMenor.innerHTML = `${menor} min`;
        }
    }

    console.log(htmlMetrosMaior)
    let data = {
        labels: dadosParaOsGraficos.map((dados) => dados.tipo_tecido),
        datasets: [{
            label: "Teve a média",
            data: numerosMedia,
            backgroundColor: coresGrafiposPizzaTiposTecidos
        }]
    }

    let options = {
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }

    return chartJs(data, options, htmlCanvas, 'pie');
}

function construirGraficoTotalProducaoPorTecido(
    dados,
    htmlCanvasGrafico,
    variavelChartJsTotalProducao,
    htmlPorcentagemMaior,
    htmlMetrosMaior,
    htmlPorcentagemMenor,
    htmlMetrosMenor,
    htmlTitleTotalProducao,
    filtroDado
) {
    if (variavelChartJsTotalProducao) variavelChartJsTotalProducao.destroy();

    const dadosParaOsGraficos = dados.filter((dados) => dados.total != 0);
    let numerosTotaisProducao = dadosParaOsGraficos.map((dados) => parseFloat(dados.total));
    let somaTotalProducao = numerosTotaisProducao.reduce((soma, dados) => { return soma += dados }, 0);

    console.log(numerosTotaisProducao);
    let maior = 0;
    let menor = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < numerosTotaisProducao.length; i++) {
        if (maior < numerosTotaisProducao[i])
            maior = numerosTotaisProducao[i];
        if (menor > numerosTotaisProducao[i])
            menor = numerosTotaisProducao[i];
    }

    if (menor != Number.MAX_SAFE_INTEGER && maior != 0) {
        if (filtroDado == "0") {
            htmlTitleTotalProducao.innerHTML = `Totais metros produzidos ${formatarValores.format(somaTotalProducao)} m`;
            htmlPorcentagemMaior.innerHTML = `${((maior * 100) / somaTotalProducao).toFixed(2)} %`;
            htmlPorcentagemMenor.innerHTML = `${((menor * 100) / somaTotalProducao).toFixed(2)} %`;
            htmlMetrosMaior.innerHTML = `${formatarValores.format(maior)} m`;
            htmlMetrosMenor.innerHTML = `${formatarValores.format(menor)} m`;
        }
        if (filtroDado == "1") {
            htmlTitleTotalProducao.innerHTML = `Totais tempo produção ${formatarValores.format(somaTotalProducao)} min`;
            htmlPorcentagemMaior.innerHTML = `${((maior * 100) / somaTotalProducao).toFixed(2)} %`;
            htmlPorcentagemMenor.innerHTML = `${((menor * 100) / somaTotalProducao).toFixed(2)} %`;
            htmlMetrosMaior.innerHTML = `${formatarValores.format(maior)} min`;
            htmlMetrosMenor.innerHTML = `${formatarValores.format(menor)} min`;
        }
        if (filtroDado == "2") {
            htmlTitleTotalProducao.innerHTML = `Totais tempo setup ${formatarValores.format(somaTotalProducao)} min`;
            htmlPorcentagemMaior.innerHTML = `${((maior * 100) / somaTotalProducao).toFixed(2)} %`;
            htmlPorcentagemMenor.innerHTML = `${((menor * 100) / somaTotalProducao).toFixed(2)} %`;
            htmlMetrosMaior.innerHTML = `${formatarValores.format(maior)} min`;
            htmlMetrosMenor.innerHTML = `${formatarValores.format(menor)} min`;
        }
    }

    let data = {
        labels: dadosParaOsGraficos.map((dados) => dados.tipo_tecido),
        datasets: [{
            label: "Total",
            data: numerosTotaisProducao,
            backgroundColor: coresGrafiposPizzaTiposTecidos
        }]
    }

    let options = {
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }

    return chartJs(data, options, htmlCanvasGrafico, 'pie');
}

function contruirGraficoSobraDeRolo(
    dados,
    htmlCanvasGrafico,
    variavelChart
) {
    if (variavelChart) variavelChart.destroy();

    let data = {
        labels: [dados[0].tipo_tecido],
        datasets: [
            {
                label: 'Total sobrado',
                data: [dados[0].qtd_sobra_de_rolo_completa],
                backgroundColor: coresGraficosDuasBarrasSobrados[0]

            },
            {
                label: 'Total não sobrado',
                data: [dados[0].qtd_nao_sobra_de_rolo_completa],
                backgroundColor: coresGraficosDuasBarrasSobrados[1]
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

function constuirGraficoTarefaCompleta(
    dados,
    htmlCanvasGrafico,
    variavelChart
) {

    if (variavelChart) variavelChart.destroy();


    let data = {
        labels: [dados[0].tipo_tecido],
        datasets: [
            {
                label: 'Total sobrado',
                data: [dados[0].total_tarefas_completas],
                backgroundColor: coresGraficosDuasBarrasSobrados[0]
            },
            {
                label: 'Total não sobrado',
                data: [dados[0].total_tarefas_nao_completas],
                backgroundColor: coresGraficosDuasBarrasSobrados[1]
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

function construirGraficoTipoSaida(
    dados,
    htmlCanvasGrafico,
    variavelChart
) {

    if (variavelChart) variavelChart.destroy();

    let data = {
        labels: dados.map((dados) => new Date(`${dados.data_historico} 00:00:00`).toLocaleDateString()),
        datasets: [
            {
                label: 'Total tipo rolinho',
                data: dados.map((dados) => dados.tipo_rolinho),
                backgroundColor: coresGraficosDuasBarras[0]
            },
            {
                label: 'Total tipo fraudado',
                data: dados.map((dados) => dados.tipo_fraudado),
                backgroundColor: coresGraficosDuasBarras[1]
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

function construirGraficoMetrosVsSetup(
    dados,
    htmlCanvasGrafico,
    variavelChart
) {

    if (variavelChart) variavelChart.destroy();

    return new Chart(htmlCanvasGrafico, {
        data: {
            datasets: [
                {
                    type: 'line',
                    label: 'Total tempo setup',
                    data: dados.map((dados) => dados.setup_totais),
                    fill: false,
                    backgroundColor: coresGraficosBarrasProducao[1],
                    borderColor: coresGraficosBarrasProducao[1]
                },
                {
                    type: 'bar',
                    label: 'Total metros produzidos',
                    data: dados.map((dados) => dados.metros_totais),
                    backgroundColor: coresGraficosBarrasProducao[0]
                }
            ],
            labels: dados.map((dados) => new Date(`${dados.data_historico} 00:00:00`).toLocaleDateString()),
        },

    })

}

function construirGraficosProdutividade(
    dados,
    htmlCanvasGrafico,
    variavelChart
) {

    if (variavelChart) variavelChart.destroy();
    console.log(dados);

    let data = {
        labels: dados.map((dados) => new Date(`${dados.data_historico} 00:00:00`).toLocaleDateString()),
        datasets: [
            {
                label: 'Produtividade m/min',
                data: dados.map((dados) => parseFloat(dados.produtividade)),
                backgroundColor: coresGraficosBarrasProducao[2]
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
    constuirGraficoMediaPorTipoTecido,
    construirGraficoTotalProducaoPorTecido,
    contruirGraficoSobraDeRolo,
    constuirGraficoTarefaCompleta,
    construirGraficoTipoSaida,
    construirGraficoMetrosVsSetup,
    construirGraficosProdutividade
}