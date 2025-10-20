import chartJs from "../../graphics/Chart.js";
import { coresGrafiposPizzaTiposTecidos } from "../../helpers/funcoes_gerais/funcoes.js";

function construirGraficoMediaProducao(
    dados,
    htmlCanvasGrafico,
    variavelChart
){

    if(variavelChart) variavelChart.detroy();

    let data = {
        labels: dados.map((dados) => dados.data_historico),
        datasets: [{
            label: "Teve a média",
            data: dados.map((dados) => dados.total_media),
            backgroundColor: coresGrafiposPizzaTiposTecidos
        }]
    }

    let options = {
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }

    return chartJs(data, options, htmlCanvasGrafico, 'pie');
}
export {
    construirGraficoMediaProducao
}