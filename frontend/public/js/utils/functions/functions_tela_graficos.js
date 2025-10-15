import { formater } from "../../helpers/helpers.js";
import { utilsConstruirGraficoVariantesEmTipoTecido, utilsGraficoTotalTipoTecido } from "../graficos/graficos_tela_graficos.js";
import { utilsSelectNumerosTarefasGraficoTipoTecido } from "../selects/selects_tela_grafico.js";

function contruirSelectNumerosTarefasParaTiposTecidos(
    arrayDados1,
    arrayDados2,
    selectNumerosTarefaTipoTecido,
    graficoLinhaVariantePorTipoTecido,
    graficoDadosPorTipoTecido
) {
    if (arrayDados1.length < 21) {
        utilsSelectNumerosTarefasGraficoTipoTecido([arrayDados1], selectNumerosTarefaTipoTecido);
        return graficoLinhaVariantePorTipoTecido = utilsConstruirGraficoVariantesEmTipoTecido(arrayDados1, arrayDados2, graficoDadosPorTipoTecido, graficoLinhaVariantePorTipoTecido);
    }
    let { dadosParaOsGraficos, dadosParaOsGraficos2 } = separarDados(arrayDados1, arrayDados2);

    utilsSelectNumerosTarefasGraficoTipoTecido(dadosParaOsGraficos, selectNumerosTarefaTipoTecido);

    graficoLinhaVariantePorTipoTecido = utilsConstruirGraficoVariantesEmTipoTecido(dadosParaOsGraficos[0], dadosParaOsGraficos2[0], graficoDadosPorTipoTecido, graficoLinhaVariantePorTipoTecido);
    selectNumerosTarefaTipoTecido.addEventListener('change', function () {
        graficoLinhaVariantePorTipoTecido = utilsConstruirGraficoVariantesEmTipoTecido(dadosParaOsGraficos[parseInt(this.value)],
            dadosParaOsGraficos2[parseInt(this.value)],
            graficoDadosPorTipoTecido, graficoLinhaVariantePorTipoTecido);
    })

    return graficoLinhaVariantePorTipoTecido;
}

function mudarDadosGraficoTipoTecido(selectNumerosTarefaTipoTecido, tipoFiltro, dados, colocarDadosMediaETotalSobreTiposTecidos, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido) {
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

function mudarDadosParaDatas(selectNumerosTarefaTipoTecido, tipoFiltro, dados, colocarDadosMediaETotalSobreTiposTecidos, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido) {
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
    selectNumerosTarefaTipoTecido,
    tipoFiltro,
    dados,
    filtroPosicao,
    graficoPizzaTotalTipoProduzido,
    graficoPizzaTotalTipoTecido,
    colocarDadosMediaETotalSobreTiposTecidos,
    titleGrafico,
    graficoLinhaVariantePorTipoTecido,
    graficoDadosPorTipoTecido
) {
    let filtroTipoDado;
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
            graficoLinhaVariantePorTipoTecido = contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
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
            graficoLinhaVariantePorTipoTecido = contruirSelectNumerosTarefasParaTiposTecidos(dados[filtroPosicao].numero_da_tarefa, dados[filtroPosicao].total_por_tarefa_tempo_producao, selectNumerosTarefaTipoTecido, graficoLinhaVariantePorTipoTecido, graficoDadosPorTipoTecido);
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
                selectNumerosTarefaTipoTecido,
                graficoLinhaVariantePorTipoTecido,
                graficoDadosPorTipoTecido
            );
            break;
    }
    return { filtroTipoDado, graficoPizzaTotalTipoTecido, graficoLinhaVariantePorTipoTecido };
}

export {
    mudarDadosParaDatas,
    mudarDadosGraficoTipoTecido,
    contruirSelectNumerosTarefasParaTiposTecidos,
    onchangeMudarTipoDeDado
}