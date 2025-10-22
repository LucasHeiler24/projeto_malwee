import { coresGrafiposPizzaTiposTecidos, formatarValores } from "../../helpers/funcoes_gerais/funcoes.js";

function funcaoConstruirCardMediaMetrosProduzidos(dados, htmlDiv) {
    let totalMedia = dados.reduce((soma, dados) => {
        return soma += dados.media;
    }, 0);

    htmlDiv.innerHTML = "";
    dados.forEach((dados, i) => {
        htmlDiv.innerHTML += `
            <div class="card-media-metros">
                <div class="background-cor-card" style="background:${coresGrafiposPizzaTiposTecidos[i]}">${((dados.media * 100) / totalMedia).toFixed(2)}%</div>
                <h5>${formatarValores.format(dados.media)}</h5>
            </div>
        `;
    });
}

export {
    funcaoConstruirCardMediaMetrosProduzidos,
}