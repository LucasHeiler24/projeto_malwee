import { formatarDatas, getDadosDiferencaMensal } from "./helpers.js"

window.onload = function () {

    let primeiraData;
    let segundaData;

    let graficoTotalMetrosNosMeses;
    let graficoTotalTempoProducaoNosMeses;

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

    function separarDadosParaOsGraficos(arrayDados) {
        construirGraficoTotalMetrosProduzidosNoMes(arrayDados.totalSomaMetrosMes1, arrayDados.totalSomaMetrosMes2);
        construirGraficoTotalTempoProduzidosNoMes(arrayDados.totalSomaTempoProducao1, arrayDados.totalSomaTempoProducao2);
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