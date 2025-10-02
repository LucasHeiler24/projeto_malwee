import {
    getQuantidadeMetrosProduzidoPorTarefaNoMes,
    getQuantidadeTempoDeProducaoPorDia,
    formater,
    anoAtual,
    proximoMesAtual,
    anteriorMesAtual,
    mesAtual
} from "./helpers.js";

import {
    aumentarAno,
    diminuirAno,
    operandoMes,
    operacaoDiminuirMes,
    operacaoAumentarMes
} from "./helpers/funcoes_alterar_mes_ano.js";


window.onload = function () {

    let dadosRegistrosNoBanco;

    let mesSelecionadoUser = mesAtual;
    let mesAnteriorUser = anteriorMesAtual;
    let mesProximoUser = proximoMesAtual;
    let anoAtualUser = anoAtual;

    const btnDiminuirMes = $('#btnDiminuirMes');
    const btnAumentarMes = $('#btnAumentarMes');
    const btnDiminuirAno = $('#btnDiminuirAno');
    const btnAumentarAno = $('#btnAumentarAno');

    const anoSelecionado = $('#anoSelecionado');

    btnAumentarAno.click(async function () {
        anoAtualUser = aumentarAno(anoAtualUser, anoSelecionado);
        dadosRegistrosNoBanco = await getRegistrosHistoricoMesEscolhido(anoAtualUser, (mesSelecionadoUser + 1).toString().padStart(2, 0));
        construirCardsHistoricos();
    });


    btnDiminuirAno.click(async function () {
        anoAtualUser = diminuirAno(anoAtualUser, anoSelecionado);
        dadosRegistrosNoBanco = await getRegistrosHistoricoMesEscolhido(anoAtualUser, (mesSelecionadoUser + 1).toString().padStart(2, 0));
        construirCardsHistoricos();
    })

    const mesSelecionado = $('#mesSelecionado');

    async function mudarMesSelecionado(operacao) {
        let meses = operandoMes(mesAnteriorUser, mesSelecionadoUser, mesProximoUser, mesSelecionado, operacao);

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        dadosRegistrosNoBanco = await getRegistrosHistoricoMesEscolhido(anoAtualUser, (mesSelecionadoUser + 1).toString().padStart(2, 0));
    }

    btnDiminuirMes.click(async function () {
        let meses = operacaoDiminuirMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser })

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        construirCardsHistoricos(await mudarMesSelecionado('-'));
    });

    btnAumentarMes.click(async function () {
        let meses = operacaoAumentarMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser })

        mesAnteriorUser = meses.mesAnteriorUser;
        mesSelecionadoUser = meses.mesSelecionadoUser;
        mesProximoUser = meses.mesProximoUser;

        construirCardsHistoricos(await mudarMesSelecionado('+'));
    });

    const graficoNumMetrosTarefa = document.getElementById('graficoLinhaTotalTempoTarefa');
    const graficoBarTempoProduzido = document.getElementById('graficoBarTempoProduzido');
    const graficoLinhaTotalTempoTarefa = document.getElementById('graficoLinhaTempoProduzidoPorTarefa');

    function construirGraficoPorMetrosProduzidosPorNumTarefa(qtdMetrosPorTarefaProduzidoMes) {

        new Chart(graficoBarTempoProduzido, {
            type: 'bar',
            data: {
                labels: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.data_historico),
                datasets: [{
                    label: "Quantidade de metros produzido",
                    data: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.tempo_producao),
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
        });

    }

    function construirGraficoPorTempoProduzidoPorNumTarefa(qtdMetrosPorTarefaProduzidoMes) {

        new Chart(graficoNumMetrosTarefa, {
            type: 'line',
            data: {
                labels: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.numero_tarefa),
                datasets: [
                    {
                        label: "Total produzido por tarefa",
                        data: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.total_metros_da_tarefa),
                        borderWidth: 1
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            textAlign: 'center',
                            fontSize: 10
                        }
                    }
                }
            }
        });

    }

    function construirGraficoLinhaPorTempoProduzido(qtdTempoProduzidoPorTarefa) {
        new Chart(graficoLinhaTotalTempoTarefa, {
            type: 'line',
            data: {
                labels: qtdTempoProduzidoPorTarefa.map((dados) => dados.numero_tarefa),
                datasets: [
                    {
                        label: "Tempo produzido por tarefa",
                        data: qtdTempoProduzidoPorTarefa.map((dados) => dados.tempo_producao),
                        borderWidth: 1
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            textAlign: 'center',
                            fontSize: 10
                        }
                    }
                }
            }
        });
    }

    (async () => {


        const qtdMetrosPorTarefaProduzidoMes = await getQuantidadeMetrosProduzidoPorTarefaNoMes("2025", "05");
        const qtdTempoProduzidaPorDia = await getQuantidadeTempoDeProducaoPorDia("2025", "05");

        construirGraficoPorMetrosProduzidosPorNumTarefa(qtdMetrosPorTarefaProduzidoMes);
        construirGraficoPorTempoProduzidoPorNumTarefa(qtdTempoProduzidaPorDia);
        construirGraficoLinhaPorTempoProduzido(qtdTempoProduzidaPorDia);

    })()

}