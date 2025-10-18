import { dashboardConstruirGraficosMediaPorTipoTecidoProduzidos } from "../dashboard.js";
import { removerDuplicados } from "../helpers/funcoes_gerais/funcoes.js";
import { selectsDashboardConstruirSelectDatas } from "../utils/selects_dashboard/selects_dashboard.js";

function extrairDashboardSepararDatasTotaisProduzidosPorTipoTecido(
    dadosParaOsGraficos,
    inSelectDataTotalPorTecido,
    inSelectMediaDataTipoTecido
) {
    const vetDatas = removerDuplicados(dadosParaOsGraficos.map((dados) => dados.data_historico));
    selectsDashboardConstruirSelectDatas(inSelectDataTotalPorTecido, vetDatas);
    selectsDashboardConstruirSelectDatas(inSelectMediaDataTipoTecido, vetDatas);
}

function extrairDadosParaOGraficoMediaPorTipoTecido(
    dadosParaOsGraficos,
    filtroData,
    filtroDado,
    filtroTurno,
    filtrarTarefasCompletas
) {

    const dadosFiltradosNaData = dadosParaOsGraficos.filter((dados) => dados.data_historico == filtroData)

    let dadosFiltradosDado;
    switch (filtroDado) {
        case "0":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0")
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos };
                    if (filtroTurno == "1")
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos_primeiro_turno };
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos_segundo_turno };
                }
                if (filtroTurno == "0")
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_nao_completos };
                if (filtroTurno == "1")
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_nao_completos_primeiro_turno };
                return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_nao_completos_segundo_turno };
            });
            break;
        case "1":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0")
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos };
                    if (filtroTurno == "1")
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos_primeiro_turno };
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos_segundo_turno };
                }
                if (filtroTurno == "0")
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_nao_completos };
                if (filtroTurno == "1")
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_nao_completos_primeiro_turno };
                return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_nao_completos_segundo_turno };
            });
            break;
        case "2":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0")
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos };
                    if (filtroTurno == "1")
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos_primeiro_turno };
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos_segundo_turno };
                }
                if (filtroTurno == "0")
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_nao_completos };
                if (filtroTurno == "1")
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_nao_completos_primeiro_turno };
                return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_nao_completos_segundo_turno };
            });
            break;
    }

    dashboardConstruirGraficosMediaPorTipoTecidoProduzidos(dadosFiltradosDado);
}

export {
    extrairDashboardSepararDatasTotaisProduzidosPorTipoTecido,
    extrairDadosParaOGraficoMediaPorTipoTecido
}