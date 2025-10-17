import { formatarDatasParaAmericano } from "../../helpers/funcoes_gerais/funcoes.js"
import { getDadosDiasPosterioresSemanalQuinzenal } from "../../requests/graphics/requests_dashboard.js";

export default async function getDadosPelasDatasEscolhidasHoje(tipoPeriodo, tipoTempo) {
    //const dataHoje = formatarDatasParaAmericano(new Date().toLocaleDateString().split('/'));
    const dataHoje = "2025-07-15";

    switch (tipoPeriodo) {
        case "ontem":
            break;
        case "hoje":
            break;
        case "semanal":
            return (tipoTempo == "anterior") ?
                "" : await getDadosDiasPosterioresSemanalQuinzenal(dataHoje, tipoPeriodo);
        case "quinzenal":
            break;
        case "mensal":
            break;
    }
}