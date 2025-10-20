import { extratDadosGraficoMediaMetrosProduzidos } from "../../extrair_dados/extrair_dados_dashboard_metros.js";

function criarChangeSelectsDashboardAbaMetrosProduzidos(
    dados,
    datas,
    htmlSelectTurno,
    htmlCheckBox
){

    let turno = "0";
    let completos = true;

    htmlSelectTurno.addEventListener('change', function(){
        turno = this.value;
        extratDadosGraficoMediaMetrosProduzidos(
            dados,
            datas,
            this.value,
            completos
        )
    });
    
    htmlCheckBox.addEventListener('click', function(){
        completos = this.checked;
        extratDadosGraficoMediaMetrosProduzidos(
            dados,
            datas,
            turno,
            this.checked
        )
    });

}

export {
    criarChangeSelectsDashboardAbaMetrosProduzidos
}