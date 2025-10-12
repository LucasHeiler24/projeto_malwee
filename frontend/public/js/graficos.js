import {
  anoAtual,
  anteriorMesAtual,
  formatarDataParaOsGraficos,
  formatarDatas,
  mesAtual,
  proximoMesAtual,
  separarDados,
  vetCoresParaOsGraficos,
  vetCoresParaOsGraficos2,
  formater
} from "./helpers/helpers.js";

import {
  aumentarAno,
  diminuirAno,
  operacaoAumentarMes,
  operacaoDiminuirMes,
  operandoMes,
} from "./helpers/funcoes_alterar_mes_ano.js";


import construirGrafico from "./graphics/construir_grafico.js";

import {
  getQuantidadeMetrosProduzidoPorTarefaNoMes,
  getTotalTarefasCompletasENaoCompletas,
  getTotalTempoSetupDeCadaDiaDoMes,
  getQuantidadeTempoDeProducaoPorDia
} from "./requests/fetch_graficos.js";

import { getQuantidadeMetrosPorTecido, getValidToken } from "./requests/fetch_gerais.js";

window.onload = function () {
  let grafico1;
  let grafico2;
  let graficoPizzaTotalTipoTecido;
  let graficoBarraTarefasCompletasOuNao;
  let grafioLinhaTotalTempoSetupPorDiaDoMes;
  let graficoLinhaPorVariantePorSetup;
  let graficoLinhaVariantePorTempoProducao;

  let dadosPrimeiroGraficoLinha;
  let dadosPrimeiroGraficoBarra;
  let dadosGraficoPizzaTotalTipoTecido;
  let dadosGraficoTarefasCompletasOuNao;
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
    )
    dadosPrimeiroGraficoBarra = await getQuantidadeMetrosProduzidoPorTarefaNoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosGraficoPizzaTotalTipoTecido = await getQuantidadeMetrosPorTecido(
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
    criarGraficoPizzaTotalTipoTecidoNoMes();
    construirGraficoBarraTarefasCompletasOuNaoCompletas();
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


  function constuirSelectDosDiasTempoProducao(htmlSelect, arrayDados) {
    htmlSelect.innerHTML = "";
    arrayDados?.forEach((dados) => {
      htmlSelect.innerHTML += `
        <option value="${dados.dia_do_mes}">${dados.dia_do_mes}</option>
      `;
    });
  }

  function construirSelectDosNumerosTarefasTempoProducao(htmlSelect, arrayDados) {
    htmlSelect.innerHTML = "";
    arrayDados?.forEach((dados, index) => {
      htmlSelect.innerHTML += `
        <option value="${index}">${dados}</option>
      `;
    });
  }

  function separarDadosParaOGraficoVariantesTempoProducao(arrayDados1, arrayDados2) {
    const selectNumeroTarefasTempoProducao = document.getElementById('inSelectFiltroPorNumerosTarefasTempoProducao');

    let vetNumeroTarefaFiltrar = [];
    for (let i = 0; i < arrayDados2.length; i++) {
      vetNumeroTarefaFiltrar.push(`De ${arrayDados2[i][0]} - até ${arrayDados2[i][arrayDados2[i].length - 1]}`);
    }

    construirSelectDosNumerosTarefasTempoProducao(selectNumeroTarefasTempoProducao, vetNumeroTarefaFiltrar);

    construirGraficoVarianteEMediaTempoProducao(arrayDados1[0], arrayDados2[0]);
    selectNumeroTarefasTempoProducao.onchange = function () {
      let dados1 = arrayDados1[parseInt(this.value)];
      let dados2 = arrayDados2[parseInt(this.value)];

      construirGraficoVarianteEMediaTempoProducao(dados1, dados2);
    }
  }

  function constuirGraficoMediaEVariantesTempoProducao(arrayDados) {
    if (!arrayDados[0]) return;

    const selectDiasTempoProducao = document.getElementById('inSelectFiltrarDataTempoProducaoGerarGrafico');

    constuirSelectDosDiasTempoProducao(selectDiasTempoProducao, arrayDados);

    const { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados[0].total_por_registro_no_mes, arrayDados[0].numero_da_tarefa);

    document.getElementById('dataContentTempoProducao').textContent = `Data escolhida: ${formatarDataParaOsGraficos(arrayDados[0].dia_do_mes)}`
    document.getElementById('totalTempoProducaoPorDia').textContent = `Total tempo produção: ${formater.format(arrayDados[0].total_tempo_producao)}`
    document.getElementById('mediaTempoProducaoPorDia').textContent = `Média de produção: ${arrayDados[0].media_tempo_setup_no_dia}`

    separarDadosParaOGraficoVariantesTempoProducao(dadosParaOsGraficos, dadosParaOsGraficos2);

    selectDiasTempoProducao.onchange = function () {
      let dados = filtrarRegistrosTempoSetupPorDia(arrayDados, this.value);
      const { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(dados.total_por_registro_no_mes, dados.numero_da_tarefa);

      document.getElementById('dataContentTempoProducao').textContent = `Data escolhida: ${formatarDataParaOsGraficos(dados.dia_do_mes)}`
      document.getElementById('totalTempoProducaoPorDia').textContent = `Total tempo produção: ${formater.format(dados.total_tempo_producao)}`
      document.getElementById('mediaTempoProducaoPorDia').textContent = `Média de produção: ${dados.media_tempo_setup_no_dia}`

      separarDadosParaOGraficoVariantesTempoProducao(dadosParaOsGraficos, dadosParaOsGraficos2);
    }
  }

  const graficoTempoProducaoEmUmDia = document.getElementById('graficoTempoProducaoEmUmDia');
  function construirGraficoVarianteEMediaTempoProducao(arrayDados1, arradyDados2) {
    if (graficoLinhaVariantePorTempoProducao) graficoLinhaVariantePorTempoProducao.destroy();

    let data = {
      labels: arrayDados1,
      datasets: [{
        label: `Tempo produção ocorrido`,
        data: arradyDados2,
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

    graficoLinhaVariantePorTempoProducao = construirGrafico(options, data, graficoTempoProducaoEmUmDia, 'line');
  }

  const graficoNumMetrosTarefa = document.getElementById("graficoLinhaTotalTempoTarefa");
  const graficoBarTempoProduzido = document.getElementById("graficoBarTempoProduzido");

  function construirGraficoPorMetrosProduzidosPorNumTarefa() {
    constuirGraficoMediaEVariantesTempoProducao(dadosPrimeiroGraficoBarra.vetTotalTempoProducaoVariantesEMedia);
    if (grafico1) grafico1.destroy();

    let data = {
      labels: dadosPrimeiroGraficoBarra.vetTotalMetrosPorDiaTempoProduzido.map((dados) => formatarDataParaOsGraficos(dados.data_historico)),
      datasets: [
        {
          label: "Quantidade de tempo de produção",
          data: dadosPrimeiroGraficoBarra.vetTotalMetrosPorDiaTempoProduzido.map((dados) => dados.tempo_producao),
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
        tooltip: {
          callbacks: {
            label: (itenTooltip) => {
              return `${itenTooltip.label}: ${itenTooltip.raw}`;
            }
          }

        }
      }
    }

    graficoBarraTarefasCompletasOuNao = construirGrafico(options, data, graficoBarraTarefasCompletas, 'bar');
  }

  function construirSelectsDinamicosPorData(arrayDados, htmlSelect) {
    htmlSelect.innerHTML = "";
    arrayDados.forEach(dados => {
      htmlSelect.innerHTML += `
            <option value="${dados.dia_do_mes}">${dados.dia_do_mes}</option>
        `;
    });
  }

  function construirSelectDinamicoPorNumeroTarefa(arrayDados, htmlSelect) {
    htmlSelect.innerHTML = "";
    arrayDados.forEach((dados, index) => {
      htmlSelect.innerHTML += `
          <option value="${index}">Até ${dados}</option>
        `;
    })
  }

  function filtrarRegistrosTempoSetupPorDia(arrayDados, data) {
    return arrayDados.find((dados) => dados.dia_do_mes == data);
  }

  const graficoTempoSetupEmUmDia = document.getElementById('graficoTempoSetupEmUmDia');
  const selectFiltrarPorTarefa = document.getElementById('inSelectFiltroPorNumerosTarefasTempoSetup');
  function construirGraficoVariantePorTempoSetup(arrayDados1, arrayDados2) {
    if (!arrayDados2) return;

    let { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados1, arrayDados2);

    let vet = [];
    for (let i = 0; i < dadosParaOsGraficos2?.length; i++) {
      if (dadosParaOsGraficos2[i][0])
        vet.push(dadosParaOsGraficos2[i][0] + '-' + dadosParaOsGraficos2[i][dadosParaOsGraficos2[i].length - 1]);
    }

    construirSelectDinamicoPorNumeroTarefa(vet, selectFiltrarPorTarefa);

    construirGraficoPorTempoSetup(dadosParaOsGraficos[0], dadosParaOsGraficos2[0]);
    document.getElementById('inSelectFiltroPorNumerosTarefasTempoSetup').onchange = function () {
      let dados1 = dadosParaOsGraficos[parseInt(this.value)]?.map((dados) => dados);
      let dados2 = dadosParaOsGraficos2[parseInt(this.value)]?.map((dados) => dados);

      construirGraficoPorTempoSetup(dados1, dados2);
    }
  }

  function construirGraficoPorTempoSetup(arrayDados1, arradyDados2) {
    if (graficoLinhaPorVariantePorSetup) graficoLinhaPorVariantePorSetup.destroy();

    let data = {
      labels: arrayDados1,
      datasets: [{
        label: `Tempo setup ocorrido`,
        data: arradyDados2,
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

    graficoLinhaPorVariantePorSetup = construirGrafico(options, data, graficoTempoSetupEmUmDia, 'line');
  }

  function construirGraficoVarianteTempoSetup(mediaEVariantesPorDiaSetup) {
    if (mediaEVariantesPorDiaSetup.length == 0) return;
    const inSelectFiltrarDataGerarGrafico = document.getElementById("inSelectFiltrarDataGerarGrafico");

    construirSelectsDinamicosPorData(mediaEVariantesPorDiaSetup, inSelectFiltrarDataGerarGrafico);

    let dataSelecionadaTempoSetup = mediaEVariantesPorDiaSetup[0].dia_do_mes;
    let dadosFiltrados = filtrarRegistrosTempoSetupPorDia(mediaEVariantesPorDiaSetup, dataSelecionadaTempoSetup);

    document.getElementById('dataContentTempoSetup').textContent = `Data escolhido: ${formatarDataParaOsGraficos(dadosFiltrados.dia_do_mes)}`;
    document.getElementById('totalTempoSetupPorDia').textContent = `Total tempo setup: ${formater.format(dadosFiltrados.total_tempo_setup)}`;
    document.getElementById('mediaTempoSetupPorDia').textContent = `Média setup: ${dadosFiltrados.media_tempo_setup_no_dia}`;

    construirGraficoVariantePorTempoSetup(dadosFiltrados.total_por_registro_no_mes, dadosFiltrados.numero_da_tarefa);
    inSelectFiltrarDataGerarGrafico.onchange = function () {
      dataSelecionadaTempoSetup = this.value;
      let dadosFiltrados = filtrarRegistrosTempoSetupPorDia(mediaEVariantesPorDiaSetup, dataSelecionadaTempoSetup);

      document.getElementById('dataContentTempoSetup').textContent = `Data escolhida: ${formatarDataParaOsGraficos(dadosFiltrados.dia_do_mes)}`;
      document.getElementById('totalTempoSetupPorDia').textContent = `Total tempo setup: ${formater.format(dadosFiltrados.total_tempo_setup)}`;
      document.getElementById('mediaTempoSetupPorDia').textContent = `Média setup: ${dadosFiltrados.media_tempo_setup_no_dia}`;

      construirGraficoVariantePorTempoSetup(dadosFiltrados.total_por_registro_no_mes, dadosFiltrados.numero_da_tarefa);
    }
  }


  const graficoBarraTempoSetupPorDiaDoMes = document.getElementById('graficoBarraTempoSetupPorDiaDoMes');
  function construirGraficoLinhaDeTempoDeSetupPorDiaDoMes() {

    if (grafioLinhaTotalTempoSetupPorDiaDoMes)
      grafioLinhaTotalTempoSetupPorDiaDoMes.destroy();


    const mediaEVariantesPorDiaSetup = dadosGraficoTotalTempoSetupPorDiaDoMes.mediaEVariantesPorDiaSetup;

    construirGraficoVarianteTempoSetup(mediaEVariantesPorDiaSetup);

    let data = {
      labels: dadosGraficoTotalTempoSetupPorDiaDoMes.somaTotalTempoSetupPorDiaDoMes.map((dados) => formatarDataParaOsGraficos(dados.data_historico)),
      datasets: [
        {
          label: "Total de tempo de setup",
          data: dadosGraficoTotalTempoSetupPorDiaDoMes.somaTotalTempoSetupPorDiaDoMes.map((dados) => dados.tempo_de_setup),
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
    const separarCookie = document.cookie.split(';');
    const separarDadosCookieToken = separarCookie[0].split('=');

    const token = separarDadosCookieToken[1];
    if (!token) return window.location.href = './login.html';

    const situacaoToken = await getValidToken(token);

    if (situacaoToken.status != 200) return window.location.href = './login.html';

    const separarDadosCookieNomeUser = separarCookie[1].split('=');

    document.getElementById('nomeUser').textContent = `Olá ${separarDadosCookieNomeUser[1].split(' ')[0]}`;

    await getDadosDosGraficos();

    chamarConstrucaoDosGraficos();

    mudarMesSelecionado();
    anoSelecionado.text(anoAtual);
  })();
};
