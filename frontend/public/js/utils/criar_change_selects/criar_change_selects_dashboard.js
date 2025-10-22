import { extrairDadosGraficoMetrosVsSetup, extrairDadosGraficoProdutividade, extrairDadosGraficosEficienciaSetup, extrairDadosParaGraficosTarefasCompletas, extrairDadosParaGraficoTipoSaida, extrairDadosParaOGraficoMediaPorTipoTecido, extrairDadosParaOGraficoQuantidadeDeTiras, extrairDadosParaOGraficoSobraDeRolo, extrairDadosParaOGraficoTotalProducao } from "../../extrair_dados/extrair_dados_dashboard.js";

function criarChangeGraficoMediaTiposTecidosNosSelectDashboard(
    dados,
    htmlSelectTipoDado,
    htmlSelectDatas,
    htmlSelectTipoTurno,
    htmlCheckboxTecido,
    htmlH1TitleGrafico
) {
    let data = dados[0].data_historico;
    let tipoDado = "0";
    let turno = "0";
    let tarefasCompletas = true;

    htmlSelectTipoDado.addEventListener('change', function () {
        tipoDado = this.value;
        extrairDadosParaOGraficoMediaPorTipoTecido(
            dados,
            data,
            this.value,
            turno,
            tarefasCompletas,
            htmlH1TitleGrafico
        );
    });

    htmlSelectDatas.addEventListener('change', function () {
        data = this.value;
        extrairDadosParaOGraficoMediaPorTipoTecido(
            dados,
            this.value,
            tipoDado,
            turno,
            tarefasCompletas,
            htmlH1TitleGrafico
        );
    });

    htmlSelectTipoTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosParaOGraficoMediaPorTipoTecido(
            dados,
            data,
            tipoDado,
            this.value,
            tarefasCompletas,
            htmlH1TitleGrafico
        );
    });

    htmlCheckboxTecido.addEventListener('click', function () {
        tarefasCompletas = this.checked;
        extrairDadosParaOGraficoMediaPorTipoTecido(
            dados,
            data,
            tipoDado,
            turno,
            tarefasCompletas,
            htmlH1TitleGrafico
        );
    });
}

function criarChangeGraficoTotalProducaoPorTecidoNosSelectDashboard(
    dados,
    htmlSelectTipoDado,
    htmlSelectData,
    htmlSelectTurno,
    htmlCheckBoxTarefasCompletas,
    htmlTitleH1ProducaoPorTecido
) {

    let data = dados[0].data_historico;
    let turno = "0";
    let tipoDado = "0";
    let tarefasCompletas = true;

    htmlSelectTipoDado.addEventListener('change', function () {
        tipoDado = this.value;
        extrairDadosParaOGraficoTotalProducao(
            dados,
            data,
            this.value,
            turno,
            tarefasCompletas,
            htmlTitleH1ProducaoPorTecido
        )
    });

    htmlSelectData.addEventListener('change', function () {
        data = this.value;
        extrairDadosParaOGraficoTotalProducao(
            dados,
            this.value,
            tipoDado,
            turno,
            tarefasCompletas,
            htmlTitleH1ProducaoPorTecido
        )
    });

    htmlSelectTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosParaOGraficoTotalProducao(
            dados,
            data,
            tipoDado,
            this.value,
            tarefasCompletas,
            htmlTitleH1ProducaoPorTecido
        )
    });

    htmlCheckBoxTarefasCompletas.addEventListener('click', function () {
        tarefasCompletas = this.checked;
        extrairDadosParaOGraficoTotalProducao(
            dados,
            data,
            tipoDado,
            turno,
            this.checked,
            htmlTitleH1ProducaoPorTecido
        )
    })

}

function criarChangeSelectsGraficoSobraDeRoloDashboard(
    dadosParaOsGraficos,
    htmlSelectTipoDeTecido,
    htmlSelectData,
    htmlCheckboxCompletas
) {

    let data = dadosParaOsGraficos[0].data_historico;
    let tipoTecido = "Todos";
    let completos = true;

    htmlSelectTipoDeTecido.addEventListener('change', function () {
        tipoTecido = this.value;
        console.log(tipoTecido)
        extrairDadosParaOGraficoSobraDeRolo(
            dadosParaOsGraficos,
            data,
            this.value,
            completos
        )
    });

    htmlSelectData.addEventListener('change', function () {
        data = this.value;
        extrairDadosParaOGraficoSobraDeRolo(
            dadosParaOsGraficos,
            this.value,
            tipoTecido,
            completos
        );
    });

    htmlCheckboxCompletas.addEventListener('click', function () {
        completos = this.checked;
        extrairDadosParaOGraficoSobraDeRolo(
            dadosParaOsGraficos,
            data,
            tipoTecido,
            this.checked
        )
    })
}

function criarChangeSelectsGraficoTarefasCompletas(
    dadosParaOsGraficos,
    htmlSelectTipoTecido,
    htmlSelectData
) {

    let data = dadosParaOsGraficos[0].data_historico;
    let tipoTecido = "Todos";

    htmlSelectTipoTecido.addEventListener('change', function () {
        tipoTecido = this.value;
        extrairDadosParaGraficosTarefasCompletas(
            dadosParaOsGraficos,
            data,
            this.value
        );
    });

    htmlSelectData.addEventListener('change', function () {
        data = this.value;
        extrairDadosParaGraficosTarefasCompletas(
            dadosParaOsGraficos,
            this.value,
            tipoTecido
        );
    });
}

function criarChangeSelectsGraficoTipoSaida(
    dadosParaOsGraficos,
    htmlSelectTipoTecido,
    htmlSelectData,
    htmlSelectTurno,
    htmlCheckboxCompletas,
    htmlTitleGrafico
) {
    let tipoTecido = "Meia Malha"
    let data = 0;
    let turno = "0";
    let completas = true;

    htmlSelectTipoTecido.addEventListener('change', function () {
        tipoTecido = this.value;
        extrairDadosParaGraficoTipoSaida(
            dadosParaOsGraficos,
            this.value,
            data,
            turno,
            completas,
            htmlTitleGrafico
        )
    });

    htmlSelectData.addEventListener('change', function () {
        data = this.value;
        extrairDadosParaGraficoTipoSaida(
            dadosParaOsGraficos,
            tipoTecido,
            this.value,
            turno,
            completas,
            htmlTitleGrafico
        )
    });

    htmlSelectTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosParaGraficoTipoSaida(
            dadosParaOsGraficos,
            tipoTecido,
            data,
            this.value,
            completas,
            htmlTitleGrafico
        )
    });

    htmlCheckboxCompletas.addEventListener('click', function () {
        completas = this.checked;
        extrairDadosParaGraficoTipoSaida(
            dadosParaOsGraficos,
            tipoTecido,
            data,
            turno,
            this.checked,
            htmlTitleGrafico
        )
    })

}

function criarChangeSelectsGraficoMetrosVsSetup(
    dados,
    htmlTipoTecido,
    htmlData,
    htmlTipoTurno,
    htmlCheckboxCompletas,
    htmlTitleGrafico
) {

    let tipoTecido = "Meia Malha";
    let data = 0;
    let turno = "0";
    let completos = true;

    htmlTipoTecido.addEventListener('change', function () {
        tipoTecido = this.value;
        extrairDadosGraficoMetrosVsSetup(
            dados,
            this.value,
            data,
            turno,
            completos,
            htmlTitleGrafico
        )
    });

    htmlData.addEventListener('change', function () {
        data = this.value;
        extrairDadosGraficoMetrosVsSetup(
            dados,
            tipoTecido,
            this.value,
            turno,
            completos,
            htmlTitleGrafico
        )
    });

    htmlTipoTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosGraficoMetrosVsSetup(
            dados,
            tipoTecido,
            data,
            this.value,
            completos,
            htmlTitleGrafico
        )
    });

    htmlCheckboxCompletas.addEventListener('click', function () {
        completos = this.checked;
        extrairDadosGraficoMetrosVsSetup(
            dados,
            tipoTecido,
            data,
            turno,
            this.checked,
            htmlTitleGrafico
        )
    });

}

function criarChangeSelectsGraficoProdutividade(
    dados,
    htmlSelectTipoTecido,
    htmlSelectData,
    htmlSelectTurno,
    htmlCheckBoxTarefasCompletas,
    htmlTitleGrafico
) {

    let data = 0;
    let turno = "0";
    let tipoTecido = "Meia Malha"
    let completas = true;

    htmlSelectData.addEventListener('change', function () {
        data = this.value;
        extrairDadosGraficoProdutividade(
            dados,
            this.value,
            tipoTecido,
            turno,
            completas,
            htmlTitleGrafico
        )
    })

    htmlSelectTipoTecido.addEventListener('change', function () {
        tipoTecido = this.value;
        extrairDadosGraficoProdutividade(
            dados,
            data,
            this.value,
            turno,
            completas,
            htmlTitleGrafico
        )
    })

    htmlSelectTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosGraficoProdutividade(
            dados,
            data,
            tipoTecido,
            this.value,
            completas,
            htmlTitleGrafico
        )
    })

    htmlCheckBoxTarefasCompletas.addEventListener('click', function () {
        completas = this.checked;
        extrairDadosGraficoProdutividade(
            dados,
            data,
            tipoTecido,
            turno,
            this.checked,
            htmlTitleGrafico
        )
    })

}

function criarChangeSelectsGraficoEficienciaSetup(
    dados,
    htmlSelectTipoTecido,
    htmlSelectData,
    htmlSelectTurno,
    htmlCheckBoxTarefasCompletas,
    htmlTitleGrafico
) {

    let data = 0;
    let turno = "0";
    let tipoTecido = "Meia Malha"
    let completas = true;

    htmlSelectData.addEventListener('change', function () {
        data = this.value;
        extrairDadosGraficosEficienciaSetup(
            dados,
            this.value,
            tipoTecido,
            turno,
            completas,
            htmlTitleGrafico
        )
    })

    htmlSelectTipoTecido.addEventListener('change', function () {
        tipoTecido = this.value;
        extrairDadosGraficosEficienciaSetup(
            dados,
            data,
            this.value,
            turno,
            completas,
            htmlTitleGrafico
        )
    })

    htmlSelectTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosGraficosEficienciaSetup(
            dados,
            data,
            tipoTecido,
            this.value,
            completas,
            htmlTitleGrafico
        )
    })

    htmlCheckBoxTarefasCompletas.addEventListener('click', function () {
        completas = this.checked;
        extrairDadosGraficosEficienciaSetup(
            dados,
            data,
            tipoTecido,
            turno,
            this.checked,
            htmlTitleGrafico
        )
    })
}

function criarChangeSelectsGraficoQuantidadeDeTiras(
    dadosGraficos,
    htmlSelectData,
    htmlSelectTurno,
    htmlCheckboxCompletas
) {

    let data = 0;
    let turno = "0";
    let completas = true;

    htmlSelectData.addEventListener('change', function () {
        data = this.value;
        extrairDadosParaOGraficoQuantidadeDeTiras(
            dadosGraficos,
            turno,
            this.value,
            completas
        )
    })

    htmlSelectTurno.addEventListener('change', function () {
        turno = this.value;
        extrairDadosParaOGraficoQuantidadeDeTiras(
            dadosGraficos,
            this.value,
            data,
            completas
        )
    })

    htmlCheckboxCompletas.addEventListener('click', function () {
        completas = this.checked;
        extrairDadosParaOGraficoQuantidadeDeTiras(
            dadosGraficos,
            turno,
            data,
            this.value
        )
    })

}

export {
    criarChangeGraficoMediaTiposTecidosNosSelectDashboard,
    criarChangeGraficoTotalProducaoPorTecidoNosSelectDashboard,
    criarChangeSelectsGraficoSobraDeRoloDashboard,
    criarChangeSelectsGraficoTarefasCompletas,
    criarChangeSelectsGraficoTipoSaida,
    criarChangeSelectsGraficoMetrosVsSetup,
    criarChangeSelectsGraficoProdutividade,
    criarChangeSelectsGraficoEficienciaSetup,
    criarChangeSelectsGraficoQuantidadeDeTiras
}