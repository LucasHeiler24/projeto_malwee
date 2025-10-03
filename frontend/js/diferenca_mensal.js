import { formatarDatas, getDadosDiferencaMensal } from "./helpers.js"

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
    function construirGraficoLinhaDosDadosEntreOsMeses(arrayTotalTempoProduzidoDados1, arrayTotalTempoProduzidoDados2){
        if(graficoLinhaTotalTempoProduzidoNosMeses)
        graficoLinhaTotalTempoProduzidoNosMeses.destroy();

        const tempoProducaoDado1 = arrayTotalTempoProduzidoDados1.map((dados) => dados.tempo_producao);
        const tempoProducaoDado2 = arrayTotalTempoProduzidoDados2.map((dados) => dados.tempo_producao);

        let tamMaximoDados;

        (tempoProducaoDado1.length > tempoProducaoDado2.length) ? tamMaximoDados = true
        : tamMaximoDados = false;
    
        let vet = [];
        if(tamMaximoDados){
            arrayTotalTempoProduzidoDados1.forEach((dados, index) => {
                vet.push(dados.data_historico);
                
                if(index < arrayTotalTempoProduzidoDados2.length){
                    vet.push(arrayTotalTempoProduzidoDados2[index].data_historico);
                }

            });
        }
        if(!tamMaximoDados){
            arrayTotalTempoProduzidoDados2.forEach((dados, index) => {
                vet.push(dados.data_historico);
                
                if(index < arrayTotalTempoProduzidoDados1.length){
                    vet.push(arrayTotalTempoProduzidoDados1[index].data_historico);
                }
            });
        }
        
        graficoLinhaTotalTempoProduzidoNosMeses = new Chart(graficoLinhaDiferencaMensalMetrosProduzidos, {
                type: 'line',
                data: {
                    labels: vet,
                    datasets: [
                        {
                            label: "Total tempo produzido por dia",
                            data: tempoProducaoDado1,
                            fill: false
                        },
                        {
                            label: "Total tempo produzido por dia",
                            data: tempoProducaoDado2,
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                display: false
                            }
                        },
                        y: {
                            ticks: {
                                display: false
                            }
                        }
                    }
                }
            })    
    } 

    function separarDadosParaOsGraficos(arrayDados) {
        construirGraficoTotalMetrosProduzidosNoMes(arrayDados.totalSomaMetrosMes1, arrayDados.totalSomaMetrosMes2);
        construirGraficoTotalTempoProduzidosNoMes(arrayDados.totalSomaTempoProducao1, arrayDados.totalSomaTempoProducao2);
        construirGraficoLinhaDosDadosEntreOsMeses(arrayDados.vetTotalMetrosPorDiaTempoProduzido1, arrayDados.vetTotalMetrosPorDiaTempoProduzido2);
        
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