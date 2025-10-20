import { formatarValores } from "../../helpers/funcoes_gerais/funcoes.js";

export default function construirCardEficienciaSetup(dados, htmlDiv) {

    htmlDiv.innerHTML = "";
    dados.forEach(dadosKpi => {

        htmlDiv.innerHTML += `
            <div class="card-eficiencia-setup">
                <div class="card-eficiencia-setup-header">
                    <h4>Data: ${new Date(`${dadosKpi.data_historico} 00:00:00`).toLocaleDateString()}</h4>
                </div>
                <div class="card-eficiencia-setup-body">
                    <div class="card-dados">
                        <div class="card-dados-metros">
                            <h4>Metros produzidos</h4>
                            <p>${formatarValores.format(dadosKpi.metros_totais)} m</p>
                        </div>
                        <div class="card-dados-tempo-setup">
                            <h4>Total setup</h4>
                            <p>${formatarValores.format(dadosKpi.setup_totais)} min</p>
                        </div>
                    </div>
                    <div class="card-dados-eficiencia-setup">
                        <div class="card-eficiencia-setup">
                            <h4>Eficiência setup</h4>
                            <h1>${formatarValores.format(dadosKpi.eficiencia_setup)} min/m</h1>
                        </div>
                    </div>
                </div>
            </div>  
        `;

    });

}