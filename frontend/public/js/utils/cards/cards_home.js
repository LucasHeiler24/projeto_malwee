import { formater } from "../../helpers/helpers.js";

function construirCardsMetrosProduzidosPorTipoTecidoNoMes(arrayDadosTiposTecidos, htmlCards) {
    htmlCards.empty();
    arrayDadosTiposTecidos.forEach(dados => {
        htmlCards.append(`
            
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

export {
    construirCardsMetrosProduzidosPorTipoTecidoNoMes
}