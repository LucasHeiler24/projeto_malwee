import construirGrafico from "../../graphics/construir_grafico.js";
import { formatarDataParaOsGraficos, vetCoresParaOsGraficos, vetCoresParaOsGraficos2 } from "../../helpers/helpers.js";

function utilsConstruirGraficoBarraTempoSetupDeCadaDiaDoMes(dadosSetup, graficoBarraTempoSetupPorDiaDoMes, grafioLinhaTotalTempoSetupPorDiaDoMes) {
    if (grafioLinhaTotalTempoSetupPorDiaDoMes) grafioLinhaTotalTempoSetupPorDiaDoMes.destroy();

    let data = {
        labels: dadosSetup.map((dados) => formatarDataParaOsGraficos(dados.data_historico)),
        datasets: [
            {
                label: "Total de tempo de setup",
                data: dadosSetup.map((dados) => dados.tempo_de_setup),
                borderWidth: 1,
                backgroundColor: vetCoresParaOsGraficos
            }
        ]
    }

    let options = {
        scales: {
            y: {
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            display: true,
            legend: {
                display: false,
                labels: {
                    color: Chart.defaults.color = '#fff'
                }
            }
        }
    }

    return construirGrafico(options, data, graficoBarraTempoSetupPorDiaDoMes, 'bar');
}

function utilsConstruirGraficoPorTempoSetup(dados1, dados2, graficoTempoSetupEmUmDia, graficoLinhaPorVariantePorSetup) {
    if (graficoLinhaPorVariantePorSetup) graficoLinhaPorVariantePorSetup.destroy();

    let data = {
        labels: dados1,
        datasets: [{
            label: `Tempo setup ocorrido`,
            data: dados2,
            borderWidth: 1,
            backgroundColor: vetCoresParaOsGraficos2,
            borderColor: ['#fff']
        }]
    }

    let options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (itemTooltip) => {
                        return `Tarefa N°${itemTooltip[0].label}`
                    }
                }
            }
        }

    }
    return construirGrafico(options, data, graficoTempoSetupEmUmDia, 'line');
}

function utilsConstruirGraficoTarefasCompletasENaoCompletas({ total_tarefas_completas, total_tarefas_nao_completas }, graficoBarraTarefasCompletas, graficoBarraTarefasCompletasOuNao) {
    if (graficoBarraTarefasCompletasOuNao) graficoBarraTarefasCompletasOuNao.destroy();

    let data = {
        labels: ['Tarefas completas', 'Tarefas não completas'],
        datasets: [{
            label: ['Tarefas completas', 'Tarefas não completas'],
            data: [total_tarefas_completas,
                total_tarefas_nao_completas],
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
    return construirGrafico(options, data, graficoBarraTarefasCompletas, 'bar');
}

function utilsGraficoTotalTipoTecido(arrayDados1, arrayDados2, graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido) {
    if (graficoPizzaTotalTipoTecido) graficoPizzaTotalTipoTecido.destroy();

    let data = {
        labels: arrayDados1,
        datasets: [{
            label: "Quantidade",
            data: arrayDados2,
            borderWidth: 1,
            backgroundColor: vetCoresParaOsGraficos,
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
    return construirGrafico(options, data, graficoPizzaTotalTipoProduzido, 'pie');
}

function utilsGraficoVariantesMetrosProduzidos(arrayDados1, arrayDados2, graficoMetrosProduzidosEmUmDia, graficoLinhaVariantePorMetrosProduzidos) {
    if (graficoLinhaVariantePorMetrosProduzidos) graficoLinhaVariantePorMetrosProduzidos.destroy();

    let data = {
        labels: arrayDados1,
        datasets: [{
            label: `Metros produzido`,
            data: arrayDados2,
            borderWidth: 1,
            backgroundColor: vetCoresParaOsGraficos2,
            borderColor: ['#fff']
        }]
    }

    let options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (itemTooltip) => {
                        return `Tarefa N°${itemTooltip[0].label}`
                    }
                }
            }
        }
    }
    return construirGrafico(options, data, graficoMetrosProduzidosEmUmDia, 'line');
}

function utilsConstruirGraficoMetrosProduzidosNoMes(dadosPrimeiroGraficoLinha, graficoNumMetrosTarefa, graficoMetrosProduzidosPorDiaNoMes) {
    if (graficoMetrosProduzidosPorDiaNoMes) graficoMetrosProduzidosPorDiaNoMes.destroy();

    let data = {
        labels: dadosPrimeiroGraficoLinha.map((dados) => dados.dia_do_mes),
        datasets: [
            {
                label: "Total produzido por tarefa",
                data: dadosPrimeiroGraficoLinha.map((dados) => dados.total_metros_produzidos),
                borderWidth: 1,
                backgroundColor: vetCoresParaOsGraficos
            },
        ]
    }

    let options = {
        plugins: {
            legend: {
                display: false,
                position: "top",
                labels: {
                    textAlign: "center",
                    fontSize: 10,
                },
            },
        },
    }

    return construirGrafico(options, data, graficoNumMetrosTarefa, 'bar');
}

function utilsContruirGraficoMetrosProduzidosPorNumeroTarefa(dados, graficoBarTempoProduzido, graficoBarraTempoProduzidoPorDiaNoMes) {
    if (graficoBarraTempoProduzidoPorDiaNoMes) graficoBarraTempoProduzidoPorDiaNoMes.destroy();

    let data = {
        labels: dados.map((dados) => formatarDataParaOsGraficos(dados.data_historico)),
        datasets: [
            {
                label: "Quantidade de tempo de produção",
                data: dados.map((dados) => dados.tempo_producao),
                borderWidth: 1,
                backgroundColor: vetCoresParaOsGraficos
            },
        ],
    }
    let options = {
        scales: {
            y: {
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            display: true,
            legend: {
                display: false,
                labels: {
                    color: Chart.defaults.color = '#fff'
                }
            }
        }
    }

    return construirGrafico(options, data, graficoBarTempoProduzido, 'bar');
}

function utilsGraficoVariantesEmTempoDeProducao(arrayDados1, arrayDados2, graficoTempoProducaoEmUmDia, graficoLinhaVariantePorTempoProducao) {
    if (graficoLinhaVariantePorTempoProducao) graficoLinhaVariantePorTempoProducao.destroy();

    let data = {
        labels: arrayDados1,
        datasets: [{
            label: `Tempo produção ocorrido`,
            data: arrayDados2,
            borderWidth: 1,
            backgroundColor: vetCoresParaOsGraficos2,
            borderColor: ['#fff']
        }]
    }

    let options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (itemTooltip) => {
                        return `Tarefa N°${itemTooltip[0].label}`
                    }
                }
            }
        }
    }

    return construirGrafico(options, data, graficoTempoProducaoEmUmDia, 'line');
}

function utilsConstruirGraficoVariantesEmTipoTecido(arrayDados1, arrayDados2, htmlCanvasGrafico, variavelChart) {
    if (variavelChart) variavelChart.destroy();

    let data = {
        labels: arrayDados1,
        datasets: [{
            label: `Ocorrido`,
            data: arrayDados2,
            borderWidth: 1,
            backgroundColor: vetCoresParaOsGraficos2,
            borderColor: ['#fff']
        }]
    }

    let options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (itemTooltip) => {
                        return `Tarefa N°${itemTooltip[0].label}`
                    }
                }
            }
        }
    }

    return construirGrafico(options, data, htmlCanvasGrafico, 'line');
}

export {
    utilsConstruirGraficoBarraTempoSetupDeCadaDiaDoMes,
    utilsConstruirGraficoPorTempoSetup,
    utilsConstruirGraficoTarefasCompletasENaoCompletas,
    utilsGraficoTotalTipoTecido,
    utilsGraficoVariantesMetrosProduzidos,
    utilsConstruirGraficoMetrosProduzidosNoMes,
    utilsContruirGraficoMetrosProduzidosPorNumeroTarefa,
    utilsGraficoVariantesEmTempoDeProducao,
    utilsConstruirGraficoVariantesEmTipoTecido
}