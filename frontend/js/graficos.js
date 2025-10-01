import { getQuantidadeMetrosProduzidoPorTarefaNoMes } from "./helpers.js"

window.onload = function () {

    const graficoNumMetrosTarefa = document.getElementById('graficoLinhaTotal');
    const graficoBarTempoProduzido = document.getElementById('graficoBarTempoProduzido');

    function construirGraficoPorMetrosProduzidosPorNumTarefa(qtdMetrosPorTarefaProduzidoMes){

        new Chart(graficoNumMetrosTarefa, {
            type: 'bar',
                data: {
                labels: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.numero_tarefa),
                datasets: [{
                    label: "Quantidade de metros produzido",
                    data: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.total_metros_mes),
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
            }
        });

    }

    function construirGraficoPorTempoProduzidoPorNumTarefa(qtdMetrosPorTarefaProduzidoMes){

        new Chart(graficoBarTempoProduzido, {
            type: 'line',
                data: {
                labels: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.numero_tarefa),
                datasets: [{
                    label: "Tempo produzido produzido",
                    data: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.total_tempo_producao),
                    borderWidth: 1
                }]
                },
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
            }
        });

    }

    (async () => {

        let ultimoMes = "08";
        let ultimoAno = "2025";

        const qtdMetrosPorTarefaProduzidoMes = await getQuantidadeMetrosProduzidoPorTarefaNoMes("2025", "08");

        construirGraficoPorMetrosProduzidosPorNumTarefa(qtdMetrosPorTarefaProduzidoMes);
        construirGraficoPorTempoProduzidoPorNumTarefa(qtdMetrosPorTarefaProduzidoMes);

    })()

}