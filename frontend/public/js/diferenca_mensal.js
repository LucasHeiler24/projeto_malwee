import construirGrafico from "./graphics/construir_grafico.js";
import { formatarDataParaOsGraficos, formatarDatas, formatarDatasEntreOsMeses, formater, vetCoresParaOsGraficos2 } from "./helpers/helpers.js";
import { getDadosDiferencaMensal } from "./requests/fetch_para_o_backend.js";

window.onload = function () {

    let primeiraData;
    let segundaData;

    let graficoTotalMetrosNosMeses;
    let graficoTotalTempoProducaoNosMeses;
    let graficoBarraTotalTempoSetupNosMeses;
    let graficoLinhaTotalMetrosNosMeses;
    let graficoLinhaTotalTempoProduzidoNosMeses;

    async function pegarOsDadosPelaDataInseridaUsuario() {
        return (primeiraData && segundaData && primeiraData != segundaData) ? await getDadosDiferencaMensal(primeiraData, segundaData) : undefined
    }

    const graficoBarraDiferencaMensalMetrosProduzidos = document.getElementById('graficoBarraDiferencaMensalMetrosProduzidos');
    function construirGraficoTotalMetrosProduzidosNoMes(totalMetrosMes1, totalMetrosMes2) {

        if (graficoTotalMetrosNosMeses)
            graficoTotalMetrosNosMeses.destroy();

        let data = {
            labels: [formatarDatasEntreOsMeses(primeiraData), formatarDatasEntreOsMeses(segundaData)],
            datasets: [{
                label: "Total metros produzido",
                data: [totalMetrosMes1, totalMetrosMes2],
                borderWidth: 1,
                backgroundColor: ['#1a2fa8', '#d6bb24']
            }]
        }

        let options = {
            scales: {
                y: {
                    display: false
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
        graficoTotalMetrosNosMeses = construirGrafico(options, data, graficoBarraDiferencaMensalMetrosProduzidos, 'bar')
    }

    const graficoBarraDiferencaMensalTempoProduzidos = document.getElementById('graficoBarraDiferencaMensalTempoProduzidos');
    function construirGraficoTotalTempoProduzidosNoMes(totalTempoMes1, totalTempoMes2) {

        if (graficoTotalTempoProducaoNosMeses)
            graficoTotalTempoProducaoNosMeses.destroy();

        let data = {
            labels: [formatarDatasEntreOsMeses(primeiraData), formatarDatasEntreOsMeses(segundaData)],
            datasets: [{
                label: "Total tempo produzido",
                data: [totalTempoMes1, totalTempoMes2],
                borderWidth: 1,
                backgroundColor: ['#35ddb9ff', '#0071ceff']
            }]
        }

        let options = {
            scales: {
                y: {
                    display: false
                }
            },
            plugins: {
                display: true,
                legend: {
                    display: false
                }
            }
        }
        graficoTotalTempoProducaoNosMeses = construirGrafico(options, data, graficoBarraDiferencaMensalTempoProduzidos, 'bar');

    }


    const graficoLinhaDiferencaMensalMetrosProduzidos = document.getElementById('graficoLinhaDiferencaMensalMetrosProduzidos');
    function construirGraficoLinhaDosDadosEntreOsMeses(arrayTotalTempoProduzidoDados1, arrayTotalTempoProduzidoDados2) {

        if (graficoLinhaTotalTempoProduzidoNosMeses)
            graficoLinhaTotalTempoProduzidoNosMeses.destroy();

        let data = {
            labels: arrayTotalTempoProduzidoDados1.map((dados) => formatarDatasEntreOsMeses(dados.data_producao)),
            datasets: [
                {
                    label: `Mês ${formatarDatasEntreOsMeses(primeiraData)}`,
                    data: arrayTotalTempoProduzidoDados1.map((dados) => dados.tempo_producao),
                    borderWidth: 1
                },
                {
                    label: `Mês ${formatarDatasEntreOsMeses(segundaData)}`,
                    data: arrayTotalTempoProduzidoDados2.map((dados) => dados.tempo_producao),
                    borderWidth: 1
                }
            ]
        }

        let options = {
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function () {
                            return '';
                        },
                        label: function (itemToltip) {
                            return `${itemToltip.dataset.label} produziu: ${formater.format(itemToltip.raw)}`;
                        }
                    }
                }
            }
        }
        graficoLinhaTotalTempoProduzidoNosMeses = construirGrafico(options, data, graficoLinhaDiferencaMensalMetrosProduzidos, 'line');
    }


    const graficoLinhaMetrosProduzidosPorTarefa = document.getElementById('graficoLinhaMetrosProduzidosPorTarefa');
    function construirGraficoLinhaTotalMetrosPorNumeroTarefa(arrayTotalMetros1, arrayTotalMetros2) {

        if (graficoLinhaTotalMetrosNosMeses)
            graficoLinhaTotalMetrosNosMeses.destroy();

        let data = {
            labels: arrayTotalMetros1.map((dados) => dados.numero_tarefa),
            datasets: [
                {
                    label: `Mês ${formatarDatasEntreOsMeses(primeiraData)}`,
                    data: arrayTotalMetros1.map((dados) => dados.total_metros),
                    borderWidth: 1
                },
                {
                    label: `Mês ${formatarDatasEntreOsMeses(segundaData)}`,
                    data: arrayTotalMetros2.map((dados) => dados.total_metros),
                    borderWidth: 1
                }
            ]
        }
        graficoLinhaTotalMetrosNosMeses = construirGrafico(null, data, graficoLinhaMetrosProduzidosPorTarefa, 'line');
    }

    const graficoBarraDiferencaMensalTempoSetup = document.getElementById('graficoBarraDiferencaMensalTempoSetup');
    function construirGraficoBarraTempoSetupNosMeses(totalMetrosMes1, totalMetrosMes2){

        if(graficoBarraTotalTempoSetupNosMeses)
            graficoBarraTotalTempoSetupNosMeses.destroy();

    
        let data = {
            labels: [formatarDatasEntreOsMeses(primeiraData), formatarDatasEntreOsMeses(segundaData)],
            datasets: [{
                label: "Total tempo setup",
                data: [totalMetrosMes1, totalMetrosMes2],
                borderWidth: 1,
                backgroundColor: vetCoresParaOsGraficos2
            }]
        }

        let options = {
            scales: {
                y: {
                    display: false
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

        graficoBarraTotalTempoSetupNosMeses = construirGrafico(options, data, graficoBarraDiferencaMensalTempoSetup, 'bar');
    }

    function separarDadosParaOsGraficos(arrayDados) {
        construirGraficoTotalMetrosProduzidosNoMes(arrayDados.totalSomaMetrosMes1, arrayDados.totalSomaMetrosMes2);
        construirGraficoTotalTempoProduzidosNoMes(arrayDados.totalSomaTempoProducao1, arrayDados.totalSomaTempoProducao2);
        construirGraficoLinhaDosDadosEntreOsMeses(arrayDados.vetTempoProducao1, arrayDados.vetTempoProducao2);
        construirGraficoLinhaTotalMetrosPorNumeroTarefa(arrayDados.vetNumTarefaMes1, arrayDados.vetNumTarefaMes2);
        construirGraficoBarraTempoSetupNosMeses(arrayDados.totalSomaTempoSetupMes1, arrayDados.totalSomaTempoSetupMes2);
    }

    (async () => {

        document.getElementById('inPrimeiroMes').addEventListener('change', async function () {
            primeiraData = formatarDatas(this.value.split('-'));
            let dados = await pegarOsDadosPelaDataInseridaUsuario();
            return (!dados) ? undefined : separarDadosParaOsGraficos(dados);
        });


        document.getElementById('inSegundoMes').addEventListener('change', async function () {
            segundaData = formatarDatas(this.value.split('-'));
            let dados = await pegarOsDadosPelaDataInseridaUsuario();
            return (!dados) ? undefined : separarDadosParaOsGraficos(dados);
        });

    })()
}