import {
  anoAtual,
  anteriorMesAtual,
  formatarDataParaOsGraficos,
  mesAtual,
  proximoMesAtual,
  vetCoresParaOsGraficos,
  vetCoresParaOsGraficos2,
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
  getQuantidadeTempoDeProducaoPorDia,
  getQuantidadeMetrosPorTecido,
  getTotalTempoSetupPorNumeroTarefaNoMes,
  getTotalTarefasCompletasENaoCompletas,
  getTotalTempoSetupDeCadaDiaDoMes
} from "./requests/fetch_para_o_backend.js";

import construirGrafico from "./graphics/construir_grafico.js";

window.onload = function () {
  let grafico1;
  let grafico2;
  let grafico3;
  let graficoPizzaTotalTipoTecido;
  let graficoBarraTarefasCompletasOuNao;
  let graficoLinhaTotalTempoSetupPorNumeroTarefa;
  let grafioLinhaTotalTempoSetupPorDiaDoMes;

  let dadosPrimeiroGraficoLinha;
  let dadosPrimeiroGraficoBarra;
  let dadosGraficoPizzaTotalTipoTecido;
  let dadosGraficoTarefasCompletasOuNao;
  let dadosGraficoTotalTempoSetupPorNumeroTarefa;
  let dadosGraficoTotalTempoSetupPorDiaDoMes;

  let mesSelecionadoUser = mesAtual;
  let mesAnteriorUser = anteriorMesAtual;
  let mesProximoUser = proximoMesAtual;
  let anoAtualUser = anoAtual;

  const btnDiminuirMes = $("#btnDiminuirMes");
  const btnAumentarMes = $("#btnAumentarMes");
  const btnDiminuirAno = $("#btnDiminuirAno");
  const btnAumentarAno = $("#btnAumentarAno");

  async function getDadosDosGraficos() {
    dadosPrimeiroGraficoLinha = await getQuantidadeTempoDeProducaoPorDia(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosPrimeiroGraficoBarra = await getQuantidadeMetrosProduzidoPorTarefaNoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosGraficoPizzaTotalTipoTecido = await getQuantidadeMetrosPorTecido(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosGraficoTotalTempoSetupPorNumeroTarefa = await getTotalTempoSetupPorNumeroTarefaNoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosGraficoTarefasCompletasOuNao = await getTotalTarefasCompletasENaoCompletas(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosGraficoTotalTempoSetupPorDiaDoMes = await getTotalTempoSetupDeCadaDiaDoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    )
  }

  function chamarConstrucaoDosGraficos() {
    construirGraficoPorMetrosProduzidosPorNumTarefa();
    construirGraficoPorTempoProduzidoPorNumTarefa();
    construirGraficoLinhaPorTempoProduzido();
    criarGraficoPizzaTotalTipoTecidoNoMes();
    construirGraficoBarraTarefasCompletasOuNaoCompletas();
    construirGraficoLinhaTotalTempoSetupPorNumeroTarefa();
    construirGraficoLinhaDeTempoDeSetupPorDiaDoMes();
  }

  const anoSelecionado = $("#anoSelecionado");
  btnAumentarAno.click(async function () {
    anoAtualUser = aumentarAno(anoAtualUser, anoSelecionado);

    await getDadosDosGraficos();

    chamarConstrucaoDosGraficos();
  });


  btnDiminuirAno.click(async function () {
    anoAtualUser = diminuirAno(anoAtualUser, anoSelecionado);

    await getDadosDosGraficos();

    chamarConstrucaoDosGraficos();
  });

  const mesSelecionado = $("#mesSelecionado");

  async function mudarMesSelecionado(operacao) {
    let meses = operandoMes(mesAnteriorUser, mesSelecionadoUser, mesProximoUser, mesSelecionado, operacao);

    mesAnteriorUser = meses.mesAnteriorUser;
    mesSelecionadoUser = meses.mesSelecionadoUser;
    mesProximoUser = meses.mesProximoUser;

    await getDadosDosGraficos();

    chamarConstrucaoDosGraficos();
  }

  btnDiminuirMes.click(function () {
    let meses = operacaoDiminuirMes({ mesAnteriorUser, mesSelecionadoUser, mesProximoUser });

    mesAnteriorUser = meses.mesAnteriorUser;
    mesSelecionadoUser = meses.mesSelecionadoUser;
    mesProximoUser = meses.mesProximoUser;

    mudarMesSelecionado("-");
  });

  btnAumentarMes.click(function () {
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
      labels: dadosPrimeiroGraficoBarra.map((dados) => formatarDataParaOsGraficos(dados.data_historico)),
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

  const graficoPizzaTotalTipoProduzido = document.getElementById('graficoPizzaTotalTipoProduzido');
  function criarGraficoPizzaTotalTipoTecidoNoMes() {

    if (graficoPizzaTotalTipoTecido)
      graficoPizzaTotalTipoTecido.destroy();

    console.log(dadosGraficoPizzaTotalTipoTecido);
    let data = {
      labels: dadosGraficoPizzaTotalTipoTecido.map((dados) => dados.tipo_tecido),
      datasets: [{
        label: "Quantidade de metros produzido",
        data: dadosGraficoPizzaTotalTipoTecido.map((dados) => dados.qtd_metros_produzidos),
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
    graficoPizzaTotalTipoTecido = construirGrafico(options, data, graficoPizzaTotalTipoProduzido, 'pie');

  }

  const graficoBarraTarefasCompletas = document.getElementById('graficoBarraTarefasCompletas');
  function construirGraficoBarraTarefasCompletasOuNaoCompletas() {

    if (graficoBarraTarefasCompletasOuNao) graficoBarraTarefasCompletasOuNao.destroy();

    let data = {
      labels: ['Tarefas completas', 'Tarefas não completas'],
      datasets: [{
        label: ['Tarefas completas', 'Tarefas não completas'],
        data: [dadosGraficoTarefasCompletasOuNao.total_tarefas_completas,
        dadosGraficoTarefasCompletasOuNao.total_tarefas_nao_completas],
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
        tooltip:{
          callbacks:{
            label: (itenTooltip) => {
              return `${itenTooltip.label}: ${itenTooltip.raw}`;
            }
          } 

        }
      }
    }

    graficoBarraTarefasCompletasOuNao = construirGrafico(options, data, graficoBarraTarefasCompletas, 'bar');
  }

  const graficoLinhaTempoSetupPorTarefa = document.getElementById('graficoLinhaTempoSetupPorTarefa');
  function construirGraficoLinhaTotalTempoSetupPorNumeroTarefa() {

    if (graficoLinhaTotalTempoSetupPorNumeroTarefa) graficoLinhaTotalTempoSetupPorNumeroTarefa.destroy();

    let data = {
      labels: dadosGraficoTotalTempoSetupPorNumeroTarefa.map((dados) => dados.numero_tarefa),
      datasets: [{
        label: `Total tempo setup`,
        data: dadosGraficoTotalTempoSetupPorNumeroTarefa.map((dados) => dados.total_tempo_setup),
        borderWidth: 1,
        backgroundColor: vetCoresParaOsGraficos,
        borderColor: vetCoresParaOsGraficos[4]
      }]
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

    graficoLinhaTotalTempoSetupPorNumeroTarefa = construirGrafico(options, data, graficoLinhaTempoSetupPorTarefa, 'line');
  }


  const graficoBarraTempoSetupPorDiaDoMes = document.getElementById('graficoBarraTempoSetupPorDiaDoMes');
  function construirGraficoLinhaDeTempoDeSetupPorDiaDoMes(){

    if(grafioLinhaTotalTempoSetupPorDiaDoMes)
        grafioLinhaTotalTempoSetupPorDiaDoMes.destroy();


    let data = {
      labels: dadosGraficoTotalTempoSetupPorDiaDoMes.map((dados) => formatarDataParaOsGraficos(dados.data_historico)),
      datasets: [
        {
          label: "Total de tempo de setup",
          data: dadosGraficoTotalTempoSetupPorDiaDoMes.map((dados) => dados.tempo_de_setup),
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

    grafioLinhaTotalTempoSetupPorDiaDoMes = construirGrafico(options, data, graficoBarraTempoSetupPorDiaDoMes, 'bar');
  }

  (async () => {
    await getDadosDosGraficos();

    chamarConstrucaoDosGraficos();

    mudarMesSelecionado();
    anoSelecionado.text(anoAtual);
  })();
};
