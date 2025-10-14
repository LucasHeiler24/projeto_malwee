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
  getQuantidadeTempoDeProducaoPorDia,
  getDadosTiposTecidosParaATelaGrafico
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
  let graficoLinhaVariantePorTipoTecido;
  let graficoLinhaVariantePorMetrosProduzidos;

  let dadosPrimeiroGraficoLinha;
  let dadosPrimeiroGraficoBarra;
  let dadosGraficoTarefasCompletasOuNao;
  let dadosGraficoTotalTempoSetupPorDiaDoMes;
  let dadosGraficoTipoTecidoPorDiaDoMes;

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
    dadosGraficoTarefasCompletasOuNao = await getTotalTarefasCompletasENaoCompletas(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosGraficoTotalTempoSetupPorDiaDoMes = await getTotalTempoSetupDeCadaDiaDoMes(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
    dadosGraficoTipoTecidoPorDiaDoMes = await getDadosTiposTecidosParaATelaGrafico(
      anoAtualUser,
      (mesSelecionadoUser + 1).toString().padStart(2, 0)
    );
  }

  function chamarConstrucaoDosGraficos() {
    construirGraficoPorMetrosProduzidosPorNumTarefa();
    construirGraficoPorTempoProduzidoPorNumTarefa();
    construirGraficoBarraTarefasCompletasOuNaoCompletas();
    construirGraficoLinhaDeTempoDeSetupPorDiaDoMes();
    separarDadosParaTiposTecidosPorDiaDoMes();
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

  function construirSelectNumerosTarefasGraficoTipoTecido(arrayTarefas, selectNumerosTarefaTipoTecido) {
    selectNumerosTarefaTipoTecido.innerHTML = "";
    arrayTarefas.forEach((numeros, index) => {
      selectNumerosTarefaTipoTecido.innerHTML += `
        <option value="${index}">${arrayTarefas[index].join(', ')}</option>
        `;
    });
  }

  function contruirSelectNumerosTarefasParaTiposTecidos(arrayDados1, arrayDados2) {
    const selectNumerosTarefaTipoTecido = document.getElementById('inSelectDadosPorTarefaTiposTecidos');
    if (arrayDados1.length < 21) {
      construirSelectNumerosTarefasGraficoTipoTecido([arrayDados1], selectNumerosTarefaTipoTecido);
      return construirGraficoVariantesTipoTecido(arrayDados1, arrayDados2);
    }
    let { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados1, arrayDados2);

    construirSelectNumerosTarefasGraficoTipoTecido(dadosParaOsGraficos, selectNumerosTarefaTipoTecido);

    construirGraficoVariantesTipoTecido(dadosParaOsGraficos[0], dadosParaOsGraficos2[0]);
    selectNumerosTarefaTipoTecido.onchange = function () {
      construirGraficoVariantesTipoTecido(dadosParaOsGraficos[parseInt(this.value)], dadosParaOsGraficos2[parseInt(this.value)]);
    }
  }

  const graficoDadosPorTipoTecido = document.getElementById('graficoDadosPorTipoTecido');
  function construirGraficoVariantesTipoTecido(arrayDados1, arrayDados2) {
    if (graficoLinhaVariantePorTipoTecido) graficoLinhaVariantePorTipoTecido.destroy();

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

    graficoLinhaVariantePorTipoTecido = construirGrafico(options, data, graficoDadosPorTipoTecido, 'line');
  }

  function mudarDadosGraficoTipoTecido(tipoFiltro, dados) {
    switch (tipoFiltro) {
      case "0":
        colocarDadosMediaETotalSobreTiposTecidos(
          {
            totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados[0].total_metros_por_tecido)}`,
            dataTecido: dados[0].data_tipo_tecido,
            totalMedia: `Média metros produzidos no dia: ${dados[0].media_total_metros_no_dia_produzido}`
          }
        )
        return contruirSelectNumerosTarefasParaTiposTecidos(dados[0].numero_da_tarefa, dados[0].total_por_tarefa);
      case "1":
        colocarDadosMediaETotalSobreTiposTecidos(
          {
            totalMetrosPorTecido: `Total produção no dia: ${formater.format(dados[0].total_tempo_producao)}`,
            dataTecido: dados[0].data_tipo_tecido,
            totalMedia: `Média produção no dia: ${dados[0].media_total_tempo_producao_no_dia}`
          }
        )
        return contruirSelectNumerosTarefasParaTiposTecidos(dados[0].numero_da_tarefa, dados[0].total_por_tarefa_tempo_producao);
      case "2":
        colocarDadosMediaETotalSobreTiposTecidos(
          {
            totalMetrosPorTecido: `Total setup no dia: ${formater.format(dados[0].total_tempo_setup)}`,
            dataTecido: dados[0].data_tipo_tecido,
            totalMedia: `Média setup no dia: ${dados[0].media_total_tempo_setup_no_dia}`
          }
        )
        return contruirSelectNumerosTarefasParaTiposTecidos(dados[0].numero_da_tarefa, dados[0].total_por_tarefa_tempo_setup);
    }
  }

  function mudarDadosParaDatas(tipoFiltro, dados) {
    switch (tipoFiltro) {
      case "0":
        colocarDadosMediaETotalSobreTiposTecidos(
          {
            totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados.total_metros_por_tecido)}`,
            dataTecido: dados.data_tipo_tecido,
            totalMedia: `Média metros produzidos no dia: ${dados.media_total_metros_no_dia_produzido}`
          }
        )

        return contruirSelectNumerosTarefasParaTiposTecidos(dados.numero_da_tarefa, dados.total_por_tarefa);
      case "1":
        colocarDadosMediaETotalSobreTiposTecidos(
          {
            totalMetrosPorTecido: `Total produção no dia: ${formater.format(dados.total_tempo_producao)}`,
            dataTecido: dados.data_tipo_tecido,
            totalMedia: `Média produção no dia: ${dados.media_total_tempo_producao_no_dia}`
          }
        )

        return contruirSelectNumerosTarefasParaTiposTecidos(dados.numero_da_tarefa, dados.total_por_tarefa_tempo_producao);
      case "2":
        colocarDadosMediaETotalSobreTiposTecidos(
          {
            totalMetrosPorTecido: `Total setup no dia: ${formater.format(dados.total_tempo_setup)}`,
            dataTecido: dados.data_tipo_tecido,
            totalMedia: `Média setup no dia: ${dados.media_total_tempo_setup_no_dia}`
          }
        )

        return contruirSelectNumerosTarefasParaTiposTecidos(dados.numero_da_tarefa, dados.total_por_tarefa_tempo_setup);
    }
  }

  function construirSelectTiposTecidos(selectTipoDadosTecidos) {
    selectTipoDadosTecidos.innerHTML = `
        <option value="0">Filtrar por metros produzidos</option>
        <option value="1">Filtrar por tempo produção</option>
        <option value="2">Filtrar por tempo setup</option>
    `;
  }

  function construirSelectTipos(selectTipoTecido) {
    selectTipoTecido.innerHTML = `
       <option value="Meia Malha">Meia Malha</option>
        <option value="Cotton">Cotton</option>
        <option value="Punho Pun">Punho Pun</option>
        <option value="Punho New">Punho New</option>
        <option value="Punho San">Punho San</option>
        <option value="Punho Elan">Punho Elan</option>
    `;
  }

  function construirSelectDatasParaTipoTecido() {
    if (!dadosGraficoTipoTecidoPorDiaDoMes[0]) return;
    let filtroTipoDado = "0";
    let filtroPosicao = 0;

    let datasTiposTecidos = [];

    for (let i = 0; i < dadosGraficoTipoTecidoPorDiaDoMes.length; i++) {
      datasTiposTecidos.push(dadosGraficoTipoTecidoPorDiaDoMes[i][0].data_tipo_tecido);
    }

    const selectDatasTiposTecido = document.getElementById('inSelectDatasParaOTipoTecido');
    const selectTipoTecido = document.getElementById('inSelectTiposTecido');
    const selectTipoDadosTecidos = document.getElementById('inSelectTiposDadosParaTecido');

    construirSelectTiposTecidos(selectTipoDadosTecidos)
    construirSelectTipos(selectTipoTecido);

    selectDatasTiposTecido.innerHTML = "";
    datasTiposTecidos.forEach((datas, index) => {
      selectDatasTiposTecido.innerHTML += `
        <option value="${index}">${datas}</option>
      `;
    });

    let dados = dadosGraficoTipoTecidoPorDiaDoMes[0];

    colocarDadosMediaETotalSobreTiposTecidos(
      {
        totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados[filtroPosicao].total_metros_por_tecido)}`,
        dataTecido: dados[filtroPosicao].data_tipo_tecido,
        totalMedia: `Média metros produzidos no dia: ${dados[filtroPosicao].media_total_metros_no_dia_produzido}`
      }
    )

    criarGraficoPizzaTotalTipoTecidoNoMes(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_metros_por_tecido));
    contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa);

    selectTipoTecido.onchange = function () {
      let vetDadosTipoTecido;
      for (let i = 0; i < dadosGraficoTipoTecidoPorDiaDoMes.length; i++) {
        vetDadosTipoTecido = dados.filter((dados) => dados.tipo_tecido == this.value);
        filtroPosicao = dados.findIndex((dados) => dados.tipo_tecido == this.value);
      }

      mudarDadosGraficoTipoTecido(filtroTipoDado, vetDadosTipoTecido);
    }

    selectDatasTiposTecido.onchange = function () {
      dados = dadosGraficoTipoTecidoPorDiaDoMes[parseInt(this.value)];

      console.log(filtroTipoDado);
      switch (filtroTipoDado) {
        case "0":
          document.getElementById('titleGraficoPizza').textContent = "Gráfico total metros produzidos por tipo de tecido no mês"
          criarGraficoPizzaTotalTipoTecidoNoMes(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_metros_por_tecido));
          break;
        case "1":
          document.getElementById('titleGraficoPizza').textContent = "Gráfico total produção por tipo de tecido no mês"
          criarGraficoPizzaTotalTipoTecidoNoMes(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_producao));
          break;
        case "2":
          document.getElementById('titleGraficoPizza').textContent = "Gráfico total setup por tipo de tecido no mês"
          criarGraficoPizzaTotalTipoTecidoNoMes(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_setup));
          break;
      }

      mudarDadosParaDatas(filtroTipoDado, dados[filtroPosicao]);
    }

    selectTipoDadosTecidos.onchange = function () {
      switch (this.value) {
        case "0":
          filtroTipoDado = "0";
          colocarDadosMediaETotalSobreTiposTecidos(
            {
              totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados[filtroPosicao].total_metros_por_tecido)}`,
              dataTecido: dados[filtroPosicao].data_tipo_tecido,
              totalMedia: `Média metros produzidos no dia: ${dados[filtroPosicao].media_total_metros_no_dia_produzido}`
            }
          );
          criarGraficoPizzaTotalTipoTecidoNoMes(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_metros_por_tecido));
          document.getElementById('titleGraficoPizza').textContent = "Gráfico total metros produzidos por tipo de tecido no mês"
          return contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa);
        case "1":
          filtroTipoDado = "1";
          colocarDadosMediaETotalSobreTiposTecidos(
            {
              totalMetrosPorTecido: `Total produção no dia: ${formater.format(dados[filtroPosicao].total_tempo_producao)}`,
              dataTecido: dados[filtroPosicao].data_tipo_tecido,
              totalMedia: `Média produção no dia: ${dados[filtroPosicao].media_total_tempo_producao_no_dia}`
            }
          )
          criarGraficoPizzaTotalTipoTecidoNoMes(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_producao));
          document.getElementById('titleGraficoPizza').textContent = "Gráfico total produção por tipo de tecido no mês"
          return contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa_tempo_producao);
        case "2":
          filtroTipoDado = "2";
          colocarDadosMediaETotalSobreTiposTecidos(
            {
              totalMetrosPorTecido: `Total setup no dia: ${formater.format(dados[filtroPosicao].total_tempo_setup)}`,
              dataTecido: dados[filtroPosicao].data_tipo_tecido,
              totalMedia: `Média setup no dia: ${dados[filtroPosicao].media_total_tempo_setup_no_dia}`
            }
          )
          criarGraficoPizzaTotalTipoTecidoNoMes(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_setup));
          document.getElementById('titleGraficoPizza').textContent = "Gráfico total setup por tipo de tecido no mês"
          return contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa_tempo_setup);
      }
    }

  }

  function colocarDadosMediaETotalSobreTiposTecidos({ totalMetrosPorTecido, dataTecido, totalMedia }) {
    document.getElementById('totalTipoTecido').textContent = `${totalMetrosPorTecido}`;
    document.getElementById('totalDataTipoTecido').textContent = `${formatarDataParaOsGraficos(dataTecido)}`;
    document.getElementById('mediaTipoTecido').textContent = `${totalMedia}`;
  }

  function separarDadosParaTiposTecidosPorDiaDoMes() {
    if (!dadosGraficoTipoTecidoPorDiaDoMes[0]) return;
    construirSelectDatasParaTipoTecido();
  }

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
        <option value="${index}">${arrayDados[index].join(', ')}</option>
      `;
    });
  }

  function separarDadosParaOGraficoVariantesTempoProducao(arrayDados1, arrayDados2) {
    const selectNumeroTarefasTempoProducao = document.getElementById('inSelectFiltroPorNumerosTarefasTempoProducao');

    construirSelectDosNumerosTarefasTempoProducao(selectNumeroTarefasTempoProducao, arrayDados1);

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

  function construirGraficoMetrosProduzidosEmCadaDiaDoMes() {
    if (grafico2) grafico2.destroy();

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

    grafico2 = construirGrafico(options, data, graficoNumMetrosTarefa, 'bar');
  }

  function construirSelectMetrosProduzidos(vetDataMetrosProduzidos, inSelectDatasMetrosProduzidos) {

    inSelectDatasMetrosProduzidos.innerHTML = "";
    vetDataMetrosProduzidos.forEach((datas, index) => {
      inSelectDatasMetrosProduzidos.innerHTML += `
        <option value="${index}">${datas}</option>
      `;
    });

  }

  function construirMostrarSelectNumeroTarefaMetrosProduzidos(dadosParaOsGraficos, inSelectFiltroPorNumerosTarefasMetrosProduzidos) {

    inSelectFiltroPorNumerosTarefasMetrosProduzidos.innerHTML = "";
    dadosParaOsGraficos.forEach((numeros, index) => {
      inSelectFiltroPorNumerosTarefasMetrosProduzidos.innerHTML += `
        <option value="${index}">${dadosParaOsGraficos[index].join(', ')}</option>
      `;
    });

  }

  const graficoMetrosProduzidosEmUmDia = document.getElementById('graficoMetrosProduzidosEmUmDia');
  function construirGraficoVariantesMetrosProduzidos(arrayDados1, arrayDados2) {
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

    graficoLinhaVariantePorMetrosProduzidos = construirGrafico(options, data, graficoMetrosProduzidosEmUmDia, 'line');
  }

  function construirSelectNumeroTarefaMetrosProduzidos(arrayDados1, arrayDados2) {
    const { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados1, arrayDados2);

    const inSelectFiltroPorNumerosTarefasMetrosProduzidos = document.getElementById('inSelectFiltroPorNumerosTarefasMetrosProduzidos');
    construirMostrarSelectNumeroTarefaMetrosProduzidos(dadosParaOsGraficos, inSelectFiltroPorNumerosTarefasMetrosProduzidos);

    construirGraficoVariantesMetrosProduzidos(dadosParaOsGraficos[0], dadosParaOsGraficos2[0]);

    inSelectFiltroPorNumerosTarefasMetrosProduzidos.onchange = function () {
      let dados1 = dadosParaOsGraficos[parseInt(this.value)];
      let dados2 = dadosParaOsGraficos2[parseInt(this.value)];

      construirGraficoVariantesMetrosProduzidos(dados1, dados2);
    }
  }

  function colocarValoresVariantesMetrosProduzidos({ dataDia, totalMetrosProduzidos, mediaMetrosProduzidos, picoProducao, menorProducao }) {
    document.getElementById('dataContentMetrosProduzidos').textContent = dataDia;
    document.getElementById('totalMetrosProduzidosPorDia').textContent = totalMetrosProduzidos;
    document.getElementById('mediaMetrosProduzidosPorDia').textContent = mediaMetrosProduzidos;
    document.getElementById('picoMetrosProduzidos').textContent = picoProducao;
    document.getElementById('menorMetrosProduzidos').textContent = menorProducao;
  }

  function construirGraficoPorTempoProduzidoPorNumTarefa() {
    if (!dadosPrimeiroGraficoLinha[0]) return;
    console.log(dadosPrimeiroGraficoLinha);
    const vetDataMetrosProduzidos = dadosPrimeiroGraficoLinha.map((dados) => dados.dia_do_mes);

    const inSelectDatasMetrosProduzidos = document.getElementById('inSelectDatasMetrosProduzidos');
    construirSelectMetrosProduzidos(vetDataMetrosProduzidos, inSelectDatasMetrosProduzidos);

    construirSelectNumeroTarefaMetrosProduzidos(dadosPrimeiroGraficoLinha[0].numero_da_tarefa, dadosPrimeiroGraficoLinha[0].total_por_registro_no_mes);
    colocarValoresVariantesMetrosProduzidos({
      dataDia: `Data escolhida: ${formatarDataParaOsGraficos(dadosPrimeiroGraficoLinha[0].dia_do_mes)}`,
      totalMetrosProduzidos: `Total produzido no dia: ${formater.format(dadosPrimeiroGraficoLinha[0].total_metros_produzidos)}`,
      mediaMetrosProduzidos: `Média no dia: ${dadosPrimeiroGraficoLinha[0].media_tempo_metros_no_dia}`,
      picoProducao: `Tarefa ${dadosPrimeiroGraficoLinha[0].numero_tarefa_maior_metros}: ${dadosPrimeiroGraficoLinha[0].maior_metros_no_dia}`,
      menorProducao: `Tarefa ${dadosPrimeiroGraficoLinha[0].numero_tarefa_menor_metros}: ${dadosPrimeiroGraficoLinha[0].menor_metros_no_dia}`
    });

    inSelectDatasMetrosProduzidos.onchange = function () {
      let dados = dadosPrimeiroGraficoLinha[parseInt(this.value)];

      colocarValoresVariantesMetrosProduzidos({
        dataDia: `Data escolhida: ${formatarDataParaOsGraficos(dados.dia_do_mes)}`,
        totalMetrosProduzidos: `Total produzido no dia: ${formater.format(dados.total_metros_produzidos)}`,
        mediaMetrosProduzidos: `Média no dia: ${dados.media_tempo_metros_no_dia}`,
        picoProducao: `Tarefa ${dados.numero_tarefa_maior_metros}: ${dados.maior_metros_no_dia}`,
        menorProducao: `Tarefa ${dados.numero_tarefa_menor_metros}: ${dados.menor_metros_no_dia}`
      });

      construirSelectNumeroTarefaMetrosProduzidos(dados.numero_da_tarefa, dados.total_por_registro_no_mes);
    }

    construirGraficoMetrosProduzidosEmCadaDiaDoMes();
  }

  const graficoPizzaTotalTipoProduzido = document.getElementById('graficoPizzaTotalTipoProduzido');
  function criarGraficoPizzaTotalTipoTecidoNoMes(arrayDados1, arrayDados2) {

    console.log(arrayDados1, arrayDados2)
    if (graficoPizzaTotalTipoTecido)
      graficoPizzaTotalTipoTecido.destroy();

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
          <option value="${index}">${arrayDados[index].join(', ')}</option>
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

    construirSelectDinamicoPorNumeroTarefa(dadosParaOsGraficos, selectFiltrarPorTarefa);

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

    document.getElementById('dataContentTempoSetup').textContent = `Data escolhida: ${formatarDataParaOsGraficos(dadosFiltrados.dia_do_mes)}`;
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
