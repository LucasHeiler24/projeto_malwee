import { getQuantidadeMetrosPorTecido, getQuantidadeMetrosProduzidoPorDia, formater } from "./helpers.js"

window.onload = function () {

    const graficoLinhaTotalPorMesPizza = document.getElementById('graficoLinhaTotalPorMesPizza');

    function construirGraficoPorMesesDeMetrosPorDia(qtdMetrosPorTarefaProduzidoMes) {

        new Chart(graficoLinhaTotalPorMesPizza, {
            type: 'pie',
            data: {
                labels: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.diaDoMes),
                datasets: [{
                    label: "Quantidade de metros produzido",
                    data: qtdMetrosPorTarefaProduzidoMes.map((dados) => dados.somaPorDia),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }

    const divCards = $('#cards');

    function construirCardsDeTipoDeTecido(arrayDadosTiposTecidos) {
        console.log(arrayDadosTiposTecidos)
        divCards.empty();

        arrayDadosTiposTecidos.forEach(dados => {

            divCards.append(`
            
                <div class="card">

                    <div class="card-header">
                        <h1>${dados.tipo_tecido}</h1>
                    </div>

                    <div class="card-body">
                        <h1>${formater.format(dados.qtd_metros_produzidos)}</h1>
                    </div>

                </div>

            `)

        });
    }

    (async () => {

        let ultimoMes = "08";
        let ultimoAno = "2025";

        const qtdMetrosPorTipoTecido = await getQuantidadeMetrosPorTecido(ultimoAno, ultimoMes);
        const qtdMetrosPorDiaProduzido = await getQuantidadeMetrosProduzidoPorDia(ultimoAno, ultimoMes);

        console.log(qtdMetrosPorDiaProduzido);
        construirGraficoPorMesesDeMetrosPorDia(qtdMetrosPorDiaProduzido);
        construirCardsDeTipoDeTecido(qtdMetrosPorTipoTecido);
    })()

}