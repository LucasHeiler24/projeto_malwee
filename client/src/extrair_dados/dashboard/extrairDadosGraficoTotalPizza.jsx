const extrairDadosGraficoTotalPizza = (dados, tipoData, tipoDado, tipoTurno) => {
    const filtrarPelaData = dados.filter((dados) => dados.data_historico == tipoData);

    const tirarDadosZerados = filtrarPelaData.filter((dados) => dados.dados_totais_metros_completos != 0);

    let dadosFiltrados;
    switch(tipoDado){
        case "0":
            if(tipoTurno == "0")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_completos}
                })
            if(tipoTurno == "1")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_completos_primeiro_turno}
                })
            if(tipoTurno == "2")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_metros_completos_segundo_turno}
                })
            break;
        case "1":
            if(tipoTurno == "0")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_completos}
                })
            if(tipoTurno == "1")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_completos_segundo_turno}
                })
            if(tipoTurno == "2")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_producao_completos_primeiro_turno}
                })
            break;
        case "2":
            if(tipoTurno == "0")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_completos}
                })
            if(tipoTurno == "1")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_completos_primeiro_turno}
                })
            if(tipoTurno == "2")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, total: dados.dados_totais_tempo_setup_completos_segundo_turno}
                })
    }
    return dadosFiltrados;

}

export default extrairDadosGraficoTotalPizza