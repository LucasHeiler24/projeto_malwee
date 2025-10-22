import { dashboardConstruirGraficoMediaMetrosProduzidos, dashboardContruirGraficosTotaisMetrosProduzidos } from "../dashboard_metros.js";
import { removerDuplicados } from "../helpers/funcoes_gerais/funcoes.js";

function extrairDadosGraficoMediaMetrosProduzidos(
    arrayDados,
    filtroTurno,
    filtroCompletos
) {

    let dadosFiltradosMediaMetros;
    if (filtroCompletos) {
        switch (filtroTurno) {
            case "0":
                dadosFiltradosMediaMetros = arrayDados.map((dados) => {
                    return { data_historico: dados.data_historico, media: parseFloat(dados.media_dois_turnos_completos_completos) }
                });
                break;
            case "1":
                dadosFiltradosMediaMetros = arrayDados.map((dados) => {
                    return { data_historico: dados.data_historico, media: parseFloat(dados.media_produzido_primeiro_turno_completos) }
                });
                break;
            case "2":
                dadosFiltradosMediaMetros = arrayDados.map((dados) => {
                    return { data_historico: dados.data_historico, media: parseFloat(dados.media_produzido_segundo_turno_completos) }
                });
                break;
        }
    }
    if (!filtroCompletos) {
        switch (filtroTurno) {
            case "0":
                dadosFiltradosMediaMetros = arrayDados.map((dados) => {
                    return { data_historico: dados.data_historico, media: parseFloat(dados.media_registro_turnos_nao_completos) }
                });
                break;
            case "1":
                dadosFiltradosMediaMetros = arrayDados.map((dados) => {
                    return { data_historico: dados.data_historico, media: parseFloat(dados.media_registro_primeiro_turno_nao_completos) }
                });
                break;
            case "2":
                dadosFiltradosMediaMetros = arrayDados.map((dados) => {
                    return { data_historico: dados.data_historico, media: parseFloat(dados.media_registro_segundo_turno_nao_completos) }
                });
                break;
        }
    }

    dashboardConstruirGraficoMediaMetrosProduzidos(dadosFiltradosMediaMetros);
}

function extrairDadosGraficoTotaisMetrosProduzidos(
    arrayDados,
    filtroData,
    filtroCompletos
) {

    let dadosFiltradosPorData = arrayDados[filtroData];

    let dadosFiltradosMediaMetros;
    (filtroCompletos) ?
        dadosFiltradosMediaMetros = dadosFiltradosPorData.map((dados) => {
            return {
                data_historico: dados.data_historico, total: parseFloat(dados.total_produzido_dois_turnos_completos),
                total_primeiro_turno: parseFloat(dados.total_produzido_primeiro_turno_completos), total_segundo_turno: parseFloat(dados.total_produzido_segundo_turno_completos)
            }
        }) :
        dadosFiltradosMediaMetros = dadosFiltradosPorData.map((dados) => {
            return {
                data_historico: dados.data_historico, total: parseFloat(dados.total_dois_turnos_nao_completos),
                total_primeiro_turno: parseFloat(dados.total_primeiro_turno_nao_completos), total_segundo_turno: parseFloat(dados.total_segundo_turno_nao_completos)
            }
        })

    console.log(dadosFiltradosMediaMetros);
    dashboardContruirGraficosTotaisMetrosProduzidos(dadosFiltradosMediaMetros);
}

export {
    extrairDadosGraficoMediaMetrosProduzidos,
    extrairDadosGraficoTotaisMetrosProduzidos
}