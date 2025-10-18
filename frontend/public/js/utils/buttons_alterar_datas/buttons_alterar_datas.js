import { formatarDatasAnoEMes, formatarDatasParaAmericano } from "../../helpers/funcoes_gerais/funcoes.js"
import { getDadosDiarios, getDadosDiasSemanalQuinzenal, getDadosMensais } from "../../requests/graphics/requests_dashboard.js";

export default async function getDadosPelasDatasEscolhidasHoje(tipoPeriodo, tipoTempo) {
    //const dataHoje = formatarDatasParaAmericano(new Date().toLocaleDateString().split('/'));
    let dateNow = new Date("2025-07-15 00:00:00");

    switch (tipoPeriodo) {
        case "ontem":
            return await getDadosDiarios(formatarDatasParaAmericano(new Date(dateNow.setDate(dateNow.getDate() - 1)).toLocaleDateString().split('/')));
        case "hoje":
            return await getDadosDiarios(formatarDatasParaAmericano(dateNow.toLocaleDateString().split('/')));
        case "semanal":
            return await getDadosDiasSemanalQuinzenal(formatarDatasParaAmericano(dateNow.toLocaleDateString().split('/')), tipoPeriodo, tipoTempo);
        case "quinzenal":
            return await getDadosDiasSemanalQuinzenal(formatarDatasParaAmericano(dateNow.toLocaleDateString().split('/')), tipoPeriodo, tipoTempo);
        case "mensal":
            return await getDadosMensais(formatarDatasAnoEMes(dateNow.toLocaleDateString().split('/')));
    }
}