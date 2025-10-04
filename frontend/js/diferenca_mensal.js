import { formatarDatas, getDadosDiferencaMensal, formater } from "./helpers.js"

window.onload = function () {

    let primeiraData;
    let segundaData;

    let graficoTotalMetrosNosMeses;
    let graficoTotalTempoProducaoNosMeses;
    let graficoLinhaTotalMetrosNosMeses;
    let graficoLinhaTotalTempoProduzidoNosMeses;


    async function pegarOsDadosPelaDataInseridaUsuario() {
        return (primeiraData && segundaData && primeiraData != segundaData) ? await getDadosDiferencaMensal(primeiraData, segundaData) : undefined
    }

    const graficoBarraDiferencaMensalMetrosProduzidos = document.getElementById('graficoBarraDiferencaMensalMetrosProduzidos');
    function construirGraficoTotalMetrosProduzidosNoMes(totalMetrosMes1, totalMetrosMes2) {

        if (graficoTotalMetrosNosMeses)
            graficoTotalMetrosNosMeses.destroy();

        graficoTotalMetrosNosMeses = new Chart(graficoBarraDiferencaMensalMetrosProduzidos, {
            type: 'bar',
            data: {
                labels: [primeiraData, segundaData],
                datasets: [{
                    label: "Total metros produzido",
                    data: [totalMetrosMes1, totalMetrosMes2],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    display: true
                }
            }
        })

    }

    const graficoBarraDiferencaMensalTempoProduzidos = document.getElementById('graficoBarraDiferencaMensalTempoProduzidos');
    function construirGraficoTotalTempoProduzidosNoMes(totalTempoMes1, totalTempoMes2) {

        if (graficoTotalTempoProducaoNosMeses)
            graficoTotalTempoProducaoNosMeses.destroy();

        graficoTotalTempoProducaoNosMeses = new Chart(graficoBarraDiferencaMensalTempoProduzidos, {
            type: 'bar',
            data: {
                labels: [primeiraData, segundaData],
                datasets: [{
                    label: "Total tempo produzido",
                    data: [totalTempoMes1, totalTempoMes2],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    display: true
                }
            }
        })

    }


    const graficoLinhaDiferencaMensalMetrosProduzidos = document.getElementById('graficoLinhaDiferencaMensalMetrosProduzidos');

    function construirGraficoLinhaDosDadosEntreOsMeses(arrayTotalTempoProduzidoDados1, arrayTotalTempoProduzidoDados2) {

        if (graficoLinhaTotalTempoProduzidoNosMeses)
            graficoLinhaTotalTempoProduzidoNosMeses.destroy();

        graficoLinhaTotalTempoProduzidoNosMeses = new Chart(graficoLinhaDiferencaMensalMetrosProduzidos, {
            type: 'line',
            data: {
                labels: arrayTotalTempoProduzidoDados1.map((dados) => dados.data_producao),
                datasets: [
                    {
                        label: `Mês ${primeiraData}`,
                        data: arrayTotalTempoProduzidoDados1.map((dados) => dados.tempo_producao),
                        borderWidth: 1
                    },
                    {
                        label: `Mês ${segundaData}`,
                        data: arrayTotalTempoProduzidoDados2.map((dados) => dados.tempo_producao),
                        borderWidth: 1
                    }
                ]
            }
        })
    }


    const graficoLinhaMetrosProduzidosPorTarefa = document.getElementById('graficoLinhaMetrosProduzidosPorTarefa');
    function construirGraficoLinhaTotalMetrosPorNumeroTarefa(arrayTotalMetros1, arrayTotalMetros2) {

        if (graficoLinhaTotalMetrosNosMeses)
            graficoLinhaTotalMetrosNosMeses.destroy();

        graficoLinhaTotalMetrosNosMeses = new Chart(graficoLinhaMetrosProduzidosPorTarefa, {
            type: 'line',
            data: {
                labels: arrayTotalMetros1.map((dados) => dados.numero_tarefa),
                datasets: [
                    {
                        label: `Mês ${primeiraData}`,
                        data: arrayTotalMetros1.map((dados) => dados.total_metros),
                        borderWidth: 1
                    },
                    {
                        label: `Mês ${segundaData}`,
                        data: arrayTotalMetros2.map((dados) => dados.total_metros),
                        borderWidth: 1
                    }
                ]
            }
        })
    }

    function separarDadosParaOsGraficos(arrayDados) {
        construirGraficoTotalMetrosProduzidosNoMes(arrayDados.totalSomaMetrosMes1, arrayDados.totalSomaMetrosMes2);
        construirGraficoTotalTempoProduzidosNoMes(arrayDados.totalSomaTempoProducao1, arrayDados.totalSomaTempoProducao2);
        construirGraficoLinhaDosDadosEntreOsMeses(arrayDados.vetTempoProducao1, arrayDados.vetTempoProducao2);
        construirGraficoLinhaTotalMetrosPorNumeroTarefa(arrayDados.vetNumTarefaMes2, arrayDados.vetNumTarefaMes1);
    }

    (async () => {

        document.getElementById('inPrimeiroMes').addEventListener('change', async function () {
            primeiraData = formatarDatas(this.value.split('-'));
            let dados = await pegarOsDadosPelaDataInseridaUsuario();
            console.log(dados);
            return (!dados) ? undefined : separarDadosParaOsGraficos(dados);
        });


        document.getElementById('inSegundoMes').addEventListener('change', async function () {
            segundaData = formatarDatas(this.value.split('-'));
            let dados = await pegarOsDadosPelaDataInseridaUsuario();
            console.log(dados);
            return (!dados) ? undefined : separarDadosParaOsGraficos(dados);
        });

    })()
}