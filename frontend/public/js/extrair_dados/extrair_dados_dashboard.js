import {
    dashboardConstruirCardsEficienciaSetup,
    dashboardConstruirGraficoMetrosVsSetup,
    dashboardConstruirGraficoProdutividade,
    dashboardConstruirGraficosMediaPorTipoTecidoProduzidos,
    dashboardConstruirGraficoSobraDeRolo,
    dashboardConstruirGraficoTipoTecido,
    dashboardContruirGraficosTarefasCompletas,
    dashboardContruirGraficoTotalProducaoPorTecido
} from "../dashboard.js";
import calcularEficienciaSetup from "../utils/calcular_eficiencia_setup/calcular_eficiencia_setup.js";
import calcularProdutividade from "../utils/calcular_produtividade/calcular_produtividade.js";

function extrairDadosParaOGraficoMediaPorTipoTecido(
    dadosParaOsGraficos,
    filtroData,
    filtroDado,
    filtroTurno,
    filtrarTarefasCompletas,
    htmlTitleGrafico
) {
    const dadosFiltradosNaData = dadosParaOsGraficos.filter((dados) => dados.data_historico == filtroData)

    let dadosFiltradosDado;
    switch (filtroDado) {
        case "0":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0") {
                        htmlTitleGrafico.textContent = "Média metros produzidos completados";
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos };
                    }
                    if (filtroTurno == "1") {
                        htmlTitleGrafico.textContent = "Média metros produzidos completados 1° Turno";
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos_primeiro_turno };
                    }
                    htmlTitleGrafico.textContent = "Média metros produzidos completados 2° Turno";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos_segundo_turno };
                }
                if (filtroTurno == "0") {
                    htmlTitleGrafico.textContent = "Média metros produzidos não completados";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_nao_completos };
                }
                if (filtroTurno == "1") {
                    htmlTitleGrafico.textContent = "Média metros produzidos não completados 1° Turno";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_nao_completos_primeiro_turno };
                }
                htmlTitleGrafico.textContent = "Média metros produzidos não completados 2° Turno";
                return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_nao_completos_segundo_turno };
            });
            break;
        case "1":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0") {
                        htmlTitleGrafico.textContent = "Média tempo produção completados";
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos };
                    }
                    if (filtroTurno == "1") {
                        htmlTitleGrafico.textContent = "Média tempo produção completados 1° Turno";
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos_primeiro_turno };
                    }
                    htmlTitleGrafico.textContent = "Média tempo produção completados 2° Turno";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos_segundo_turno };
                }
                if (filtroTurno == "0") {
                    htmlTitleGrafico.textContent = "Média tempo produção não completados";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_nao_completos };
                }
                if (filtroTurno == "1") {
                    htmlTitleGrafico.textContent = "Média tempo produção não completados 1° Turno";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_nao_completos_primeiro_turno };
                }
                htmlTitleGrafico.textContent = "Média tempo produção não completados 2° Turno";
                return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_nao_completos_segundo_turno };
            });
            break;
        case "2":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0") {
                        htmlTitleGrafico.textContent = "Média tempo setup completados";
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos };
                    }
                    if (filtroTurno == "1") {
                        htmlTitleGrafico.textContent = "Média tempo setup completados 1° Turno";
                        return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos_primeiro_turno };
                    }
                    htmlTitleGrafico.textContent = "Média tempo setup completados 2° Turno";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos_segundo_turno };
                }
                if (filtroTurno == "0") {
                    htmlTitleGrafico.textContent = "Média tempo setup não completados";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_nao_completos };
                }
                if (filtroTurno == "1") {
                    htmlTitleGrafico.textContent = "Média tempo setup não completados 1° Turno";
                    return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_nao_completos_primeiro_turno };
                }
                htmlTitleGrafico.textContent = "Média tempo setup não completados 2° Turno";
                return { tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_nao_completos_segundo_turno };
            });
            break;
    }

    dashboardConstruirGraficosMediaPorTipoTecidoProduzidos(
        dadosFiltradosDado,
        filtroDado
    );
}

function extrairDadosParaOGraficoTotalProducao(
    dadosParaOsGraficos,
    filtroData,
    filtroDado,
    filtroTurno,
    filtrarTarefasCompletas,
    htmlTitleGrafico
) {
    const dadosFiltradosNaData = dadosParaOsGraficos.filter((dados) => dados.data_historico == filtroData)

    let dadosFiltradosDado;
    switch (filtroDado) {
        case "0":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0") {
                        htmlTitleGrafico.textContent = "Total metros produzidos completados";
                        return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_completos };
                    }
                    if (filtroTurno == "1") {
                        htmlTitleGrafico.textContent = "Total metros produzidos completados 1° Turno";
                        return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_completos_primeiro_turno };
                    }
                    htmlTitleGrafico.textContent = "Total metros produzidos completados 2° Turno";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_completos_segundo_turno };
                }
                if (filtroTurno == "0") {
                    htmlTitleGrafico.textContent = "Total metros produzidos não completados";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_nao_completos };
                }
                if (filtroTurno == "1") {
                    htmlTitleGrafico.textContent = "Total metros produzidos não completados 1° Turno";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_nao_completos_primeiro_turno };
                }
                htmlTitleGrafico.textContent = "Total metros produzidos não completados 2° Turno";
                return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_nao_completos_segundo_turno };
            });
            break;
        case "1":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0") {
                        htmlTitleGrafico.textContent = "Total tempo produção completados";
                        return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_completos };
                    }
                    if (filtroTurno == "1") {
                        htmlTitleGrafico.textContent = "Total tempo produção completados 1° Turno";
                        return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_completos_primeiro_turno };
                    }
                    htmlTitleGrafico.textContent = "Total tempo produção completados 2° Turno";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_completos_segundo_turno };
                }
                if (filtroTurno == "0") {
                    htmlTitleGrafico.textContent = "Total tempo produção não completados";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_nao_completos };
                }
                if (filtroTurno == "1") {
                    htmlTitleGrafico.textContent = "Total tempo produção não completados 1° Turno";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_nao_completos_primeiro_turno };
                }
                htmlTitleGrafico.textContent = "Total tempo produção não completados 2° Turno";
                return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_nao_completos_segundo_turno };
            });
            break;
        case "2":
            dadosFiltradosDado = dadosFiltradosNaData.map((dados) => {
                if (filtrarTarefasCompletas) {
                    if (filtroTurno == "0") {
                        htmlTitleGrafico.textContent = "Total tempo setup completados";
                        return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_completos };
                    }
                    if (filtroTurno == "1") {
                        htmlTitleGrafico.textContent = "Total tempo setup completados 1° Turno";
                        return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_completos_primeiro_turno };
                    }
                    htmlTitleGrafico.textContent = "Total tempo setup completados 2° Turno";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_completos_segundo_turno };
                }
                if (filtroTurno == "0") {
                    htmlTitleGrafico.textContent = "Total tempo setup não completados";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_nao_completos };
                }
                if (filtroTurno == "1") {
                    htmlTitleGrafico.textContent = "Total tempo setup não completados 1° Turno";
                    return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_nao_completos_primeiro_turno };
                }
                htmlTitleGrafico.textContent = "Total tempo setup não completados 2° Turno";
                return { tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_nao_completos_segundo_turno };
            });
            break;
    }

    dashboardContruirGraficoTotalProducaoPorTecido(
        dadosFiltradosDado,
        filtroDado
    );
}

function extrairDadosParaOGraficoSobraDeRolo(
    dados,
    filtroData,
    filtroTipoTecido,
    filtroTarefaCompleta
) {

    const dadosData = dados.filter((dados) => dados.data_historico == filtroData);

    let dadosParaOsGraficos;
    if (filtroTipoTecido != "Todos") {
        const dadosFiltroTipoTecido = dadosData.filter((dados) => dados.tipo_tecido == filtroTipoTecido);

        (filtroTarefaCompleta) ?
            dadosParaOsGraficos = dadosFiltroTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    qtd_sobra_de_rolo_completa: dados.qtd_sobra_de_rolo_completadas,
                    qtd_nao_sobra_de_rolo_completa: dados.qtd_nao_sobra_de_rolo_completadas
                }
            }) :
            dadosParaOsGraficos = dadosFiltroTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    qtd_sobra_de_rolo_completa: dados.qtd_sobra_de_rolo_nao_completadas,
                    qtd_nao_sobra_de_rolo_completa: dados.qtd_nao_sobra_de_rolo_nao_completas
                }
            });

        return dashboardConstruirGraficoSobraDeRolo(dadosParaOsGraficos);
    }

    (filtroTarefaCompleta) ?
        dadosParaOsGraficos = dadosData.reduce((objectDados, dados) => {
            objectDados.qtd_sobra_de_rolo_completadas += dados.qtd_sobra_de_rolo_completadas;
            objectDados.qtd_sobra_de_rolo_nao_completadas += dados.qtd_sobra_de_rolo_nao_completadas;
            return objectDados;
        }, {
            qtd_sobra_de_rolo_completa: 0,
            qtd_nao_sobra_de_rolo_completa: 0,
            tipo_tecido: 'Todos'
        }) :
        dadosParaOsGraficos = dadosData.reduce((objectDados, dados) => {
            objectDados.qtd_sobra_de_rolo_completa += dados.qtd_nao_sobra_de_rolo_completadas;
            objectDados.qtd_nao_sobra_de_rolo_completa += dados.qtd_nao_sobra_de_rolo_nao_completas;
            return objectDados;
        }, {
            qtd_sobra_de_rolo_completa: 0,
            qtd_nao_sobra_de_rolo_completa: 0,
            tipo_tecido: 'Todos'
        });

    return dashboardConstruirGraficoSobraDeRolo([dadosParaOsGraficos]);
}

function extrairDadosParaGraficosTarefasCompletas(
    dadosParaOsGraficos,
    filtroTipoData,
    filtroTipoTecido
) {

    const dadosFiltradosData = dadosParaOsGraficos.filter((dados) => dados.data_historico == filtroTipoData);

    if (filtroTipoTecido != "Todos")
        return dashboardContruirGraficosTarefasCompletas(dadosFiltradosData.filter((dados) => dados.tipo_tecido == filtroTipoTecido));

    let dadosFiltradosTipoTecido = dadosFiltradosData.reduce((objectDados, dados) => {
        objectDados.total_tarefas_completas += dados.total_tarefas_completas;
        objectDados.total_tarefas_nao_completas += dados.total_tarefas_nao_completas;
        return objectDados;
    }, {
        total_tarefas_completas: 0,
        total_tarefas_nao_completas: 0,
        tipo_tecido: 'Todos'
    });

    return dashboardContruirGraficosTarefasCompletas([dadosFiltradosTipoTecido]);

}

function extrairDadosParaGraficoTipoSaida(
    dados,
    tipoTecido,
    tipoData,
    tipoTurno,
    tipoCompletos,
    htmlTitleGrafico
) {

    const dadosFiltradosPorData = dados[tipoData];
    const dadosFiltradosPorTipoTecido = dadosFiltradosPorData.filter((dados) => dados.tipo_tecido == tipoTecido);
    htmlTitleGrafico.textContent = `Quantidade tipo de saida de ${tipoTecido}`;

    let dadosFiltradosPorTurno;
    if (tipoTurno == "0") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    tipo_rolinho: dados.qtd_tipo_saida_rolinho_completo,
                    tipo_fraudado: dados.qtd_tipo_saida_fraudado_completo
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    tipo_rolinho: dados.qtd_tipo_saida_rolinho_nao_completo,
                    tipo_fraudado: dados.qtd_tipo_saida_fraudado_nao_completo
                }
            })
    }
    if (tipoTurno == "1") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    tipo_rolinho: dados.qtd_tipo_saida_rolinho_completo_primeiro_turno,
                    tipo_fraudado: dados.qtd_tipo_saida_fraudado_completo_primeiro_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    tipo_rolinho: dados.qtd_tipo_saida_rolinho_nao_completo_primeiro_turno,
                    tipo_fraudado: dados.qtd_tipo_saida_fraudado_nao_completo_primeiro_turno
                }
            })
    }
    if (tipoTurno == "2") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    tipo_rolinho: dados.qtd_tipo_saida_rolinho_completo_segundo_turno,
                    tipo_fraudado: dados.qtd_tipo_saida_fraudado_completo_segundo_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    tipo_rolinho: dados.qtd_tipo_saida_rolinho_nao_completo_segundo_turno,
                    tipo_fraudado: dados.qtd_tipo_saida_fraudado_nao_completo_segundo_turno
                }
            })
    }

    dashboardConstruirGraficoTipoTecido(dadosFiltradosPorTurno);

}

function extrairDadosGraficoMetrosVsSetup(
    dados,
    tipoFiltroTecido,
    tipoFiltroData,
    tipoTurno,
    tipoCompletos,
    htmlTitleGrafico
) {

    const dadosFiltradosPorData = dados[tipoFiltroData];
    const dadosFiltradosPorTipoTecido = dadosFiltradosPorData.filter((dados) => dados.tipo_tecido == tipoFiltroTecido);
    htmlTitleGrafico.textContent = `Metros totais vs Setup totais por dia, tecido: ${tipoFiltroTecido}`;

    let dadosFiltradosPorTurno;
    if (tipoTurno == "0") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos,
                    setup_totais: dados.dados_totais_tempo_setup_completos
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos,
                    setup_totais: dados.dados_totais_tempo_setup_nao_completos
                }
            })
    }
    if (tipoTurno == "1") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos_primeiro_turno,
                    setup_totais: dados.dados_totais_tempo_setup_completos_primeiro_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos_primeiro_turno,
                    setup_totais: dados.dados_totais_tempo_setup_nao_completos_primeiro_turno
                }
            })
    }
    if (tipoTurno == "2") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos_segundo_turno,
                    setup_totais: dados.dados_totais_tempo_setup_completos_segundo_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos_segundo_turno,
                    setup_totais: dados.dados_totais_tempo_setup_nao_completos_segundo_turno
                }
            })
    }

    dashboardConstruirGraficoMetrosVsSetup(dadosFiltradosPorTurno);
}

function extrairDadosGraficoProdutividade(
    dados,
    tipoData,
    tipoTecido,
    tipoTurno,
    tipoCompletos,
    htmlTitleGrafico
) {
    const dadosFiltradosPorData = dados[tipoData];
    const dadosFiltradosPorTipoTecido = dadosFiltradosPorData.filter((dados) => dados.tipo_tecido == tipoTecido);
    htmlTitleGrafico.textContent = `Produtividade do tecido: ${tipoTecido}`;

    let dadosFiltradosPorTurno;
    if (tipoTurno == "0") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos,
                    producao_totais: dados.dados_totais_tempo_producao_completos
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos,
                    producao_totais: dados.dados_totais_tempo_producao_nao_completos
                }
            })
    }
    if (tipoTurno == "1") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos_primeiro_turno,
                    producao_totais: dados.dados_totais_tempo_producao_completos_primeiro_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos_primeiro_turno,
                    producao_totais: dados.dados_totais_tempo_producao_nao_completos_primeiro_turno
                }
            })
    }
    if (tipoTurno == "2") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos_segundo_turno,
                    producao_totais: dados.dados_totais_tempo_producao_completos_segundo_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos_segundo_turno,
                    producao_totais: dados.dados_totais_tempo_producao_nao_completos_segundo_turno
                }
            })
    }

    dashboardConstruirGraficoProdutividade(calcularProdutividade(dadosFiltradosPorTurno));
}

function extrairDadosGraficosEficienciaSetup(
    dados,
    tipoData,
    tipoTecido,
    tipoTurno,
    tipoCompletos,
    htmlTitleGrafico
) {
    const dadosFiltradosPorData = dados[tipoData];
    const dadosFiltradosPorTipoTecido = dadosFiltradosPorData.filter((dados) => dados.tipo_tecido == tipoTecido);
    htmlTitleGrafico.textContent = `Eficiência setup do tecido: ${tipoTecido}`;

    let dadosFiltradosPorTurno;
    if (tipoTurno == "0") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos,
                    setup_totais: dados.dados_totais_tempo_setup_completos
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos,
                    setup_totais: dados.dados_totais_tempo_setup_nao_completos
                }
            })
    }
    if (tipoTurno == "1") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos_primeiro_turno,
                    setup_totais: dados.dados_totais_tempo_setup_completos_primeiro_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos_primeiro_turno,
                    setup_totais: dados.dados_totais_tempo_setup_nao_completos_primeiro_turno
                }
            })
    }
    if (tipoTurno == "2") {
        (tipoCompletos) ?
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_completos_segundo_turno,
                    setup_totais: dados.dados_totais_tempo_setup_completos_segundo_turno
                }
            }) :
            dadosFiltradosPorTurno = dadosFiltradosPorTipoTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    data_historico: dados.data_historico,
                    metros_totais: dados.dados_totais_metros_nao_completos_segundo_turno,
                    setup_totais: dados.dados_totais_tempo_setup_nao_completos_segundo_turno
                }
            })
    }

    dashboardConstruirCardsEficienciaSetup(calcularEficienciaSetup(dadosFiltradosPorTurno));
}

export {
    extrairDadosParaOGraficoMediaPorTipoTecido,
    extrairDadosParaOGraficoTotalProducao,
    extrairDadosParaOGraficoSobraDeRolo,
    extrairDadosParaGraficosTarefasCompletas,
    extrairDadosParaGraficoTipoSaida,
    extrairDadosGraficoMetrosVsSetup,
    extrairDadosGraficoProdutividade,
    extrairDadosGraficosEficienciaSetup
}