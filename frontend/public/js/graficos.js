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
  formater,
  filtrarRegistrosTempoSetupPorDia
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
  getTotalTarefasCompletasENaoCompletas,
  getTotalTempoSetupDeCadaDiaDoMes,
  getQuantidadeTempoDeProducaoPorDia,
  getDadosTiposTecidosParaATelaGrafico
} from "./requests/fetch_graficos.js";

import { getValidToken } from "./requests/fetch_gerais.js";

import {
  utilsConstruirGraficoBarraTempoSetupDeCadaDiaDoMes,
  utilsConstruirGraficoMetrosProduzidosNoMes,
  utilsConstruirGraficoPorTempoSetup,
  utilsConstruirGraficoTarefasCompletasENaoCompletas,
  utilsConstruirGraficoVariantesEmTipoTecido,
  utilsContruirGraficoMetrosProduzidosPorNumeroTarefa,
  utilsGraficoTotalTipoTecido,
  utilsGraficoVariantesEmTempoDeProducao,
  utilsGraficoVariantesMetrosProduzidos
} from "./utils/graficos/graficos_tela_graficos.js";

import {
  utilsMostrarSelectNumeroTarefaMetrosProduzidos,
  utilsSelectDataTipoTecido,
  utilsSelectDinamicoPorNumeroTarefa,
  utilsSelectDosDiasTempoProducao,
  utilsSelectDosNumerosTarefasTempoProducao,
  utilsSelectMetrosProduzidos,
  utilsSelectNumerosTarefasGraficoTipoTecido,
  utilsSelectsDinamicosPorData,
  utilsSelectTipos,
  utilsSelectTiposTecidos
} from "./utils/selects/selects_tela_grafico.js";

window.onload = function () {
  let graficoBarraTempoProduzidoPorDiaNoMes = null;
  let graficoMetrosProduzidosPorDiaNoMes = null;
  let graficoPizzaTotalTipoTecido = null;
  let graficoBarraTarefasCompletasOuNao = null
  let grafioLinhaTotalTempoSetupPorDiaDoMes = null;
  let graficoLinhaPorVariantePorSetup = null;
  let graficoLinhaVariantePorTempoProducao = null;
  let graficoLinhaVariantePorTipoTecido = null;
  let graficoLinhaVariantePorMetrosProduzidos = null;

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

  const graficoDadosPorTipoTecido = document.getElementById('graficoDadosPorTipoTecido');
  const graficoTempoProducaoEmUmDia = document.getElementById('graficoTempoProducaoEmUmDia');
  const graficoNumMetrosTarefa = document.getElementById("graficoLinhaTotalTempoTarefa");
  const graficoBarTempoProduzido = document.getElementById("graficoBarTempoProduzido");
  const graficoMetrosProduzidosEmUmDia = document.getElementById('graficoMetrosProduzidosEmUmDia');
  const graficoBarraTempoSetupPorDiaDoMes = document.getElementById('graficoBarraTempoSetupPorDiaDoMes');
  const graficoTempoSetupEmUmDia = document.getElementById('graficoTempoSetupEmUmDia');
  const graficoBarraTarefasCompletas = document.getElementById('graficoBarraTarefasCompletas');
  const graficoPizzaTotalTipoProduzido = document.getElementById('graficoPizzaTotalTipoProduzido');

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
    constuirGraficoMediaEVariantesTempoProducao(
      dadosPrimeiroGraficoBarra.vetTotalTempoProducaoVariantesEMedia,
      dadosPrimeiroGraficoBarra.vetTotalMetrosPorDiaTempoProduzido
    );
    construirGraficoPorTempoProduzidoPorNumTarefa();
    graficoBarraTarefasCompletasOuNao = utilsConstruirGraficoTarefasCompletasENaoCompletas({
      total_tarefas_completas: dadosGraficoTarefasCompletasOuNao.total_tarefas_completas,
      total_tarefas_nao_completas: dadosGraficoTarefasCompletasOuNao.total_tarefas_nao_completas,
    }, graficoBarraTarefasCompletas, graficoBarraTarefasCompletasOuNao);
    construirGraficoVarianteTempoSetup(dadosGraficoTotalTempoSetupPorDiaDoMes.mediaEVariantesPorDiaSetup, dadosGraficoTotalTempoSetupPorDiaDoMes.somaTotalTempoSetupPorDiaDoMes);
    construirSelectDatasParaTipoTecido();
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

  function contruirSelectNumerosTarefasParaTiposTecidos(
    arrayDados1,
    arrayDados2,
    graficoLinhaVariantePorTipoTecido,
    graficoDadosPorTipoTecido
  ) {
    if (arrayDados1.length < 21) {
        utilsSelectNumerosTarefasGraficoTipoTecido([arrayDados1], selectNumerosTarefaTipoTecido);
        return graficoLinhaVariantePorTipoTecido = utilsConstruirGraficoVariantesEmTipoTecido(arrayDados1, arrayDados2, graficoDadosPorTipoTecido, graficoLinhaVariantePorTipoTecido);
    }
    const selectNumerosTarefaTipoTecido = document.getElementById('inSelectDadosPorTarefaTiposTecidos');
    let { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados1, arrayDados2);

    utilsSelectNumerosTarefasGraficoTipoTecido(dadosParaOsGraficos, selectNumerosTarefaTipoTecido);

    graficoLinhaVariantePorTipoTecido = utilsConstruirGraficoVariantesEmTipoTecido(dadosParaOsGraficos[0], dadosParaOsGraficos2[0], graficoDadosPorTipoTecido, graficoLinhaVariantePorTipoTecido);
    
    selectNumerosTarefaTipoTecido.addEventListener('change', function () {
        graficoLinhaVariantePorTipoTecido = utilsConstruirGraficoVariantesEmTipoTecido(dadosParaOsGraficos[parseInt(this.value)],
            dadosParaOsGraficos2[parseInt(this.value)],
            graficoDadosPorTipoTecido, graficoLinhaVariantePorTipoTecido);
    })
  }

  function mudarDadosGraficoTipoTecido(tipoFiltro, dados, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido) {
    switch (tipoFiltro) {
        case "0":
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados[0].total_metros_por_tecido)}`,
                    dataTecido: dados[0].data_tipo_tecido,
                    totalMedia: `Média metros produzidos no dia: ${dados[0].media_total_metros_no_dia_produzido}`
                }
            )
            return contruirSelectNumerosTarefasParaTiposTecidos(dados[0].numero_da_tarefa, dados[0].total_por_tarefa, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
        case "1":
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total produção no dia: ${formater.format(dados[0].total_tempo_producao)}`,
                    dataTecido: dados[0].data_tipo_tecido,
                    totalMedia: `Média produção no dia: ${dados[0].media_total_tempo_producao_no_dia}`
                }
            )
            return contruirSelectNumerosTarefasParaTiposTecidos(dados[0].numero_da_tarefa, dados[0].total_por_tarefa_tempo_producao, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
        case "2":
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total setup no dia: ${formater.format(dados[0].total_tempo_setup)}`,
                    dataTecido: dados[0].data_tipo_tecido,
                    totalMedia: `Média setup no dia: ${dados[0].media_total_tempo_setup_no_dia}`
                }
            )
            return contruirSelectNumerosTarefasParaTiposTecidos(dados[0].numero_da_tarefa, dados[0].total_por_tarefa_tempo_setup, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
    }
  }

    function mudarDadosParaDatas(tipoFiltro, dados, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido) {
      switch (tipoFiltro) {
        case "0":
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados.total_metros_por_tecido)}`,
                    dataTecido: dados.data_tipo_tecido,
                    totalMedia: `Média metros produzidos no dia: ${dados.media_total_metros_no_dia_produzido}`
                }
            )
            return contruirSelectNumerosTarefasParaTiposTecidos(dados.numero_da_tarefa, dados.total_por_tarefa, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
        case "1":
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total produção no dia: ${formater.format(dados.total_tempo_producao)}`,
                    dataTecido: dados.data_tipo_tecido,
                    totalMedia: `Média produção no dia: ${dados.media_total_tempo_producao_no_dia}`
                }
            )
            return contruirSelectNumerosTarefasParaTiposTecidos(dados.numero_da_tarefa, dados.total_por_tarefa_tempo_producao, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
        case "2":
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total setup no dia: ${formater.format(dados.total_tempo_setup)}`,
                    dataTecido: dados.data_tipo_tecido,
                    totalMedia: `Média setup no dia: ${dados.media_total_tempo_setup_no_dia}`
                }
            )
            return contruirSelectNumerosTarefasParaTiposTecidos(dados.numero_da_tarefa, dados.total_por_tarefa_tempo_setup, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
    }
  }

    function onchangeMudarTipoDeDado(
        tipoFiltro,
        dados,
        filtroPosicao,
        graficoPizzaTotalTipoProduzido,
        graficoPizzaTotalTipoTecido,
        titleGrafico,
        graficoLinhaVariantePorTipoTecido,
        graficoDadosPorTipoTecido
    ) {
    switch (tipoFiltro) {
        case "0":
            filtroTipoDado = "0";
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados[filtroPosicao].total_metros_por_tecido)}`,
                    dataTecido: dados[filtroPosicao].data_tipo_tecido,
                    totalMedia: `Média metros produzidos no dia: ${dados[filtroPosicao].media_total_metros_no_dia_produzido}`
                }
            );
            graficoPizzaTotalTipoTecido = utilsGraficoTotalTipoTecido(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_metros_por_tecido), graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido);
            titleGrafico.textContent = "Gráfico total metros produzidos por tipo de tecido no mês"
            graficoLinhaVariantePorTipoTecido = contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
            break;
        case "1":
            filtroTipoDado = "1";
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total produção no dia: ${formater.format(dados[filtroPosicao].total_tempo_producao)}`,
                    dataTecido: dados[filtroPosicao].data_tipo_tecido,
                    totalMedia: `Média produção no dia: ${dados[filtroPosicao].media_total_tempo_producao_no_dia}`
                }
            )
            graficoPizzaTotalTipoTecido = utilsGraficoTotalTipoTecido(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_producao), graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido);
            titleGrafico.textContent = "Gráfico total produção por tipo de tecido no mês"
            graficoLinhaVariantePorTipoTecido = contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa_tempo_producao, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
            break;
        case "2":
            filtroTipoDado = "2";
            colocarDadosMediaETotalSobreTiposTecidos(
                {
                    totalMetrosPorTecido: `Total setup no dia: ${formater.format(dados[filtroPosicao].total_tempo_setup)}`,
                    dataTecido: dados[filtroPosicao].data_tipo_tecido,
                    totalMedia: `Média setup no dia: ${dados[filtroPosicao].media_total_tempo_setup_no_dia}`
                }
            )
            graficoPizzaTotalTipoTecido = utilsGraficoTotalTipoTecido(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_setup), graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido);
            titleGrafico.textContent = "Gráfico total setup por tipo de tecido no mês"
            graficoLinhaVariantePorTipoTecido = contruirSelectNumerosTarefasParaTiposTecidos(
                dados[filtroPosicao].numero_da_tarefa,
                dados[filtroPosicao].total_por_tarefa_tempo_setup,
                graficoLinhaVariantePorTipoTecido,
                graficoDadosPorTipoTecido
            );
            break;
    }
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

    const titleGrafico = document.getElementById('titleGraficoPizza');

    utilsSelectTiposTecidos(selectTipoDadosTecidos);
    utilsSelectTipos(selectTipoTecido);
    utilsSelectDataTipoTecido(selectDatasTiposTecido, datasTiposTecidos);

    let dados = dadosGraficoTipoTecidoPorDiaDoMes[0];

    colocarDadosMediaETotalSobreTiposTecidos(
      {
        totalMetrosPorTecido: `Total metros produzidos no dia: ${formater.format(dados[filtroPosicao].total_metros_por_tecido)}`,
        dataTecido: dados[filtroPosicao].data_tipo_tecido,
        totalMedia: `Média metros produzidos no dia: ${dados[filtroPosicao].media_total_metros_no_dia_produzido}`
      }
    )

    graficoPizzaTotalTipoTecido = utilsGraficoTotalTipoTecido(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_metros_por_tecido), graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido);
    graficoLinhaVariantePorTipoTecido = contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);


    selectTipoTecido.onchange = function () {
      let vetDadosTipoTecido;
      for (let i = 0; i < dadosGraficoTipoTecidoPorDiaDoMes.length; i++) {
        vetDadosTipoTecido = dados.filter((dados) => dados.tipo_tecido == this.value);
        filtroPosicao = dados.findIndex((dados) => dados.tipo_tecido == this.value);
      }

      graficoLinhaVariantePorTipoTecido = mudarDadosGraficoTipoTecido(filtroTipoDado, vetDadosTipoTecido, colocarDadosMediaETotalSobreTiposTecidos, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
    }

    selectDatasTiposTecido.onchange = function () {
      dados = dadosGraficoTipoTecidoPorDiaDoMes[parseInt(this.value)];

      switch (filtroTipoDado) {
        case "0":
          titleGrafico.textContent = "Gráfico total metros produzidos por tipo de tecido no mês"
          graficoPizzaTotalTipoTecido = utilsGraficoTotalTipoTecido(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_metros_por_tecido), graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido);
          break;
        case "1":
          titleGrafico.textContent = "Gráfico total produção por tipo de tecido no mês"
          graficoPizzaTotalTipoTecido = utilsGraficoTotalTipoTecido(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_producao), graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido);
          break;
        case "2":
          titleGrafico.textContent = "Gráfico total setup por tipo de tecido no mês"
          graficoPizzaTotalTipoTecido = utilsGraficoTotalTipoTecido(dados.map((dados) => dados.tipo_tecido), dados.map((dados) => dados.total_tempo_setup), graficoPizzaTotalTipoProduzido, graficoPizzaTotalTipoTecido);
          break;
      }

      graficoLinhaVariantePorTipoTecido = mudarDadosParaDatas(filtroTipoDado, dados[filtroPosicao], colocarDadosMediaETotalSobreTiposTecidos, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);

    }

    selectTipoDadosTecidos.addEventListener('change', function (e) {
      let { dado1, dado2, dado3 } = onchangeMudarTipoDeDado(
        e.target.value,
        dados,
        filtroPosicao,
        graficoPizzaTotalTipoProduzido,
        graficoPizzaTotalTipoTecido,
        colocarDadosMediaETotalSobreTiposTecidos,
        titleGrafico,
        graficoLinhaVariantePorTipoTecido,
        graficoDadosPorTipoTecido
      );

      filtroTipoDado = dado1;
      graficoPizzaTotalTipoTecido = dado2;
      graficoLinhaVariantePorTipoTecido = dado3;
    });


  }

  function colocarDadosMediaETotalSobreTiposTecidos({ totalMetrosPorTecido, dataTecido, totalMedia }) {
    document.getElementById('totalTipoTecido').textContent = `${totalMetrosPorTecido}`;
    document.getElementById('totalDataTipoTecido').textContent = `${formatarDataParaOsGraficos(dataTecido)}`;
    document.getElementById('mediaTipoTecido').textContent = `${totalMedia}`;
  }

  function separarDadosParaOGraficoVariantesTempoProducao(arrayDados1, arrayDados2) {
    const selectNumeroTarefasTempoProducao = document.getElementById('inSelectFiltroPorNumerosTarefasTempoProducao');

    utilsSelectDosNumerosTarefasTempoProducao(selectNumeroTarefasTempoProducao, arrayDados1);

    graficoLinhaVariantePorTempoProducao = utilsGraficoVariantesEmTempoDeProducao(arrayDados1[0], arrayDados2[0], graficoTempoProducaoEmUmDia, graficoLinhaVariantePorTempoProducao);
    selectNumeroTarefasTempoProducao.onchange = function () {
      let dados1 = arrayDados1[parseInt(this.value)];
      let dados2 = arrayDados2[parseInt(this.value)];

      graficoLinhaVariantePorTempoProducao = utilsGraficoVariantesEmTempoDeProducao(dados1, dados2, graficoTempoProducaoEmUmDia, graficoLinhaVariantePorTempoProducao);
    }
  }

  function constuirGraficoMediaEVariantesTempoProducao(arrayDados, arrayDados2) {
    if (!arrayDados[0]) return;

    graficoBarraTempoProduzidoPorDiaNoMes = utilsContruirGraficoMetrosProduzidosPorNumeroTarefa(arrayDados2, graficoBarTempoProduzido, graficoBarraTempoProduzidoPorDiaNoMes);
    const selectDiasTempoProducao = document.getElementById('inSelectFiltrarDataTempoProducaoGerarGrafico');

    utilsSelectDosDiasTempoProducao(selectDiasTempoProducao, arrayDados);

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

  function construirSelectNumeroTarefaMetrosProduzidos(arrayDados1, arrayDados2) {
    const { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados1, arrayDados2);

    const inSelectFiltroPorNumerosTarefasMetrosProduzidos = document.getElementById('inSelectFiltroPorNumerosTarefasMetrosProduzidos');
    utilsMostrarSelectNumeroTarefaMetrosProduzidos(dadosParaOsGraficos, inSelectFiltroPorNumerosTarefasMetrosProduzidos);

    graficoLinhaVariantePorMetrosProduzidos = utilsGraficoVariantesMetrosProduzidos(dadosParaOsGraficos[0], dadosParaOsGraficos2[0], graficoMetrosProduzidosEmUmDia, graficoLinhaVariantePorMetrosProduzidos);
    inSelectFiltroPorNumerosTarefasMetrosProduzidos.onchange = function () {
      let dados1 = dadosParaOsGraficos[parseInt(this.value)];
      let dados2 = dadosParaOsGraficos2[parseInt(this.value)];

      graficoLinhaVariantePorMetrosProduzidos = utilsGraficoVariantesMetrosProduzidos(dados1, dados2, graficoMetrosProduzidosEmUmDia, graficoLinhaVariantePorMetrosProduzidos);
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
    const vetDataMetrosProduzidos = dadosPrimeiroGraficoLinha.map((dados) => dados.dia_do_mes);

    const inSelectDatasMetrosProduzidos = document.getElementById('inSelectDatasMetrosProduzidos');
    utilsSelectMetrosProduzidos(vetDataMetrosProduzidos, inSelectDatasMetrosProduzidos);

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

    graficoMetrosProduzidosPorDiaNoMes = utilsConstruirGraficoMetrosProduzidosNoMes(dadosPrimeiroGraficoLinha, graficoNumMetrosTarefa, graficoMetrosProduzidosPorDiaNoMes);
  }

  const selectFiltrarPorTarefa = document.getElementById('inSelectFiltroPorNumerosTarefasTempoSetup');

  function construirGraficoVariantePorTempoSetup(arrayDados1, arrayDados2) {
    if (!arrayDados2) return;

    let { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados1, arrayDados2);

    utilsSelectDinamicoPorNumeroTarefa(dadosParaOsGraficos, selectFiltrarPorTarefa);

    graficoLinhaPorVariantePorSetup = utilsConstruirGraficoPorTempoSetup(dadosParaOsGraficos[0], dadosParaOsGraficos2[0], graficoTempoSetupEmUmDia, graficoLinhaPorVariantePorSetup);
    selectFiltrarPorTarefa.onchange = function () {
      let dados1 = dadosParaOsGraficos[parseInt(this.value)]?.map((dados) => dados);
      let dados2 = dadosParaOsGraficos2[parseInt(this.value)]?.map((dados) => dados);

      graficoLinhaPorVariantePorSetup = utilsConstruirGraficoPorTempoSetup(dados1, dados2, graficoTempoSetupEmUmDia, graficoLinhaPorVariantePorSetup);
    }
  }

  function construirGraficoVarianteTempoSetup(mediaEVariantesPorDiaSetup, dadosGraficoTotalTempoSetupPorDiaDoMes) {
    if (mediaEVariantesPorDiaSetup.length == 0) return;
    grafioLinhaTotalTempoSetupPorDiaDoMes = utilsConstruirGraficoBarraTempoSetupDeCadaDiaDoMes(dadosGraficoTotalTempoSetupPorDiaDoMes, graficoBarraTempoSetupPorDiaDoMes, grafioLinhaTotalTempoSetupPorDiaDoMes);

    const inSelectFiltrarDataGerarGrafico = document.getElementById("inSelectFiltrarDataGerarGrafico");

    utilsSelectsDinamicosPorData(mediaEVariantesPorDiaSetup, inSelectFiltrarDataGerarGrafico);

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
