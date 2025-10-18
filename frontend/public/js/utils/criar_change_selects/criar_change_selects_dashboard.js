import { extrairDadosParaOGraficoMediaPorTipoTecido } from "../../extrair_dados/extrair_dados_dashboard.js";

let dadosGraficoMediaTiposTecidos;
function criarChangeGraficoMediaTiposTecidosNosSelectDashboard(
    dados,
    htmlSelectTipoDado,
    htmlSelectDatas,
    htmlSelectTipoTurno,
    htmlCheckboxTecido
) {
    dadosGraficoMediaTiposTecidos = [...dados];
    let data = dadosGraficoMediaTiposTecidos[0].data_historico;
    let tipoDado = "0";
    let turno = "0";
    let tarefasCompletas = true;

    htmlSelectTipoDado.addEventListener('change', function () {
        tipoDado = this.value;
        extrairDadosParaOGraficoMediaPorTipoTecido(dadosGraficoMediaTiposTecidos, data, this.value, turno, tarefasCompletas);
    });

    htmlSelectDatas.addEventListener('change', function () {
        data = this.value;
        extrairDadosParaOGraficoMediaPorTipoTecido(dadosGraficoMediaTiposTecidos, this.value, tipoDado, turno, tarefasCompletas);
    });

    htmlSelectTipoTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosParaOGraficoMediaPorTipoTecido(dadosGraficoMediaTiposTecidos, data, tipoDado, this.value, tarefasCompletas);
    });

    htmlCheckboxTecido.addEventListener('click', function () {
        tarefasCompletas = this.checked;
        extrairDadosParaOGraficoMediaPorTipoTecido(dadosGraficoMediaTiposTecidos, data, tipoDado, turno, tarefasCompletas);
    });
}

export {
    criarChangeGraficoMediaTiposTecidosNosSelectDashboard
}