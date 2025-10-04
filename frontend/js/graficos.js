import {
  anoAtual,
  anteriorMesAtual,
  mesAtual,
  proximoMesAtual,
  vetCoresParaOsGraficos,
} from "./helpers/helpers.js";

import {
  aumentarAno,
  diminuirAno,
  operacaoAumentarMes,
  operacaoDiminuirMes,
  operandoMes,
} from "./helpers/funcoes_alterar_mes_ano.js";

import {
  getQuantidadeMetrosProduzidoPorTarefaNoMes,
  getQuantidadeTempoDeProducaoPorDia
} from "./requests/fetch_para_o_backend.js";

import construirGrafico from "./graphics/construir_grafico.js";

window.onload = function () {
  let grafico1;
  let grafico2;
  let grafico3;

  let dadosPrimeiroGraficoLinha;
  let dadosPrimeiroGraficoBarra;

  let mesSelecionadoUser = mesAtual;
  let mesAnteriorUser = anteriorMesAtual;
  let mesProximoUser = proximoMesAtual;
  let anoAtualUser = anoAtual;

  const btnDiminuirMes = $("#btnDiminuirMes");
  const btnAumentarMes = $("#btnAumentarMes");
  const btnDiminuirAno = $("#btnDiminuirAno");
  const btnAumentarAno = $("#btnAumentarAno");

  const anoSelecionado = $("#anoSelecionado");

  btnAumentarAno.click(async function () {
    anoAtualUser = aumentarAno(anoAtualUser, anoSelecionado);

    dadosPrimeiroGraficoLinha = await getQuantidadeTempoDeProducaoPorDia(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosPrimeiroGraficoBarra = await getQuantidadeMetrosProduzidoPorTarefaNoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );

    construirGraficoPorMetrosProduzidosPorNumTarefa();
    construirGraficoPorTempoProduzidoPorNumTarefa();
    construirGraficoLinhaPorTempoProduzido();
  });

  btnDiminuirAno.click(async function () {
    anoAtualUser = diminuirAno(anoAtualUser, anoSelecionado);

    dadosPrimeiroGraficoLinha = await getQuantidadeTempoDeProducaoPorDia(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosPrimeiroGraficoBarra = await getQuantidadeMetrosProduzidoPorTarefaNoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );

    construirGraficoPorMetrosProduzidosPorNumTarefa();
    construirGraficoPorTempoProduzidoPorNumTarefa();
    construirGraficoLinhaPorTempoProduzido();
  });

  const mesSelecionado = $("#mesSelecionado");

  async function mudarMesSelecionado(operacao) {
    let meses = operandoMes(mesAnteriorUser, mesSelecionadoUser, mesProximoUser, mesSelecionado, operacao);

    mesAnteriorUser = meses.mesAnteriorUser;
    mesSelecionadoUser = meses.mesSelecionadoUser;
    mesProximoUser = meses.mesProximoUser;

    dadosPrimeiroGraficoLinha = await getQuantidadeTempoDeProducaoPorDia(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosPrimeiroGraficoBarra = await getQuantidadeMetrosProduzidoPorTarefaNoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );

    console.log(dadosPrimeiroGraficoBarra);

    construirGraficoPorMetrosProduzidosPorNumTarefa();
    construirGraficoPorTempoProduzidoPorNumTarefa();
    construirGraficoLinhaPorTempoProduzido();
  }

  btnDiminuirMes.click(async function () {
    let meses = operacaoDiminuirMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser });

    mesAnteriorUser = meses.mesAnteriorUser;
    mesSelecionadoUser = meses.mesSelecionadoUser;
    mesProximoUser = meses.mesProximoUser;

    mudarMesSelecionado("-");
  });

  btnAumentarMes.click(async function () {
    let meses = operacaoAumentarMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser });

    mesAnteriorUser = meses.mesAnteriorUser;
    mesSelecionadoUser = meses.mesSelecionadoUser;
    mesProximoUser = meses.mesProximoUser;

    mudarMesSelecionado("+");
  });

  const graficoNumMetrosTarefa = document.getElementById("graficoLinhaTotalTempoTarefa");
  const graficoBarTempoProduzido = document.getElementById("graficoBarTempoProduzido");
  const graficoLinhaTotalTempoTarefa = document.getElementById("graficoLinhaTempoProduzidoPorTarefa");

  function construirGraficoPorMetrosProduzidosPorNumTarefa() {
    if (grafico1) grafico1.destroy();

    let data = {
      labels: dadosPrimeiroGraficoBarra.map((dados) => dados.data_historico),
      datasets: [
        {
          label: "Quantidade de tempo de produção",
          data: dadosPrimeiroGraficoBarra.map((dados) => dados.tempo_producao),
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
    grafico1 = construirGrafico(options, data, graficoBarTempoProduzido, 'bar');
  }

  function construirGraficoPorTempoProduzidoPorNumTarefa() {
    if (grafico2) grafico2.destroy();

    let data = {
      labels: dadosPrimeiroGraficoLinha.map((dados) => dados.numero_tarefa),
      datasets: [
        {
          label: "Total produzido por tarefa",
          data: dadosPrimeiroGraficoLinha.map((dados) => dados.total_metros_da_tarefa),
          borderWidth: 1,
          backgroundColor: vetCoresParaOsGraficos,
          borderColor: vetCoresParaOsGraficos[4]
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

    grafico2 = construirGrafico(options, data, graficoNumMetrosTarefa, 'line');
  }

  function construirGraficoLinhaPorTempoProduzido() {
    if (grafico3) grafico3.destroy();

    let data = {
      labels: dadosPrimeiroGraficoLinha.map((dados) => dados.numero_tarefa),
      datasets: [
        {
          label: "Tempo produzido por tarefa",
          data: dadosPrimeiroGraficoLinha.map((dados) => dados.tempo_producao),
          borderWidth: 1,
          backgroundColor: vetCoresParaOsGraficos,
          borderColor: vetCoresParaOsGraficos[4]
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
      }
    }
    grafico3 = construirGrafico(options, data, graficoLinhaTotalTempoTarefa, 'line');
  }

  (async () => {
    dadosPrimeiroGraficoBarra = await getQuantidadeMetrosProduzidoPorTarefaNoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosPrimeiroGraficoLinha = await getQuantidadeTempoDeProducaoPorDia(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );

    construirGraficoPorMetrosProduzidosPorNumTarefa();
    construirGraficoPorTempoProduzidoPorNumTarefa();
    construirGraficoLinhaPorTempoProduzido();

    mudarMesSelecionado();
    anoSelecionado.text(anoAtual);
  })();
};
