import { extrairDadosGraficoMediaMetrosProduzidos, extrairDadosGraficoTotaisMetrosProduzidos } from "../../extrair_dados/extrair_dados_dashboard_metros.js";

function criarChangeSelectsDashboardAbaMetrosProduzidos(
    dados,
    htmlSelectTurno,
    htmlCheckBox
) {

    let turno = "0";
    let completos = true;

    htmlSelectTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosGraficoMediaMetrosProduzidos(
            dados,
            this.value,
            completos
        )
    });

    htmlCheckBox.addEventListener('click', function () {
        completos = this.checked;
        extrairDadosGraficoMediaMetrosProduzidos(
            dados,
            turno,
            this.checked
        )
    });

}

function criarChangeSelectsDashboardAbaMetrosProduzidosMetrosTotais(
    dados,
    htmlSelectData,
    htmlCheckBoxCompletos
) {

    let data = 0;
    let completos = true;

    htmlSelectData.addEventListener('change', function () {
        data = this.value;

        extrairDadosGraficoTotaisMetrosProduzidos(
            dados,
            this.value,
            completos
        )
    });

    htmlCheckBoxCompletos.addEventListener('click', function () {
        completos = this.checked;

        extrairDadosGraficoTotaisMetrosProduzidos(
            dados,
            data,
            this.checked
        )
    })

}

export {
    criarChangeSelectsDashboardAbaMetrosProduzidos,
    criarChangeSelectsDashboardAbaMetrosProduzidosMetrosTotais
}