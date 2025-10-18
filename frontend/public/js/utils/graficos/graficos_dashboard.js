import chartJs from "../../graphics/Chart.js"

function constuirGraficoMediaPorTipoTecido(dados, htmlCanvas, dadosGraficoMediaPorTecido) {

    if (dadosGraficoMediaPorTecido) dadosGraficoMediaPorTecido.destroy();

    let data = {
        labels: dados.map((dados) => dados.tipo_tecido),
        datasets: [{
            label: "Teve a média",
            data: dados.map((dados) => parseFloat(dados.media))
        }]
    }

    let options = {
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }

    return chartJs(data, options, htmlCanvas, 'pie');
}

export {
    constuirGraficoMediaPorTipoTecido
}