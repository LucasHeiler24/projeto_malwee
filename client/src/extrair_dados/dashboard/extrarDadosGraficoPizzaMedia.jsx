const extrairDadosGraficoPizzaMedia = (dados, tipoMedia, tipoData, tipoTurno) => {

    const filtrarDadosPorData = dados.filter((dados) => dados.data_historico == tipoData);

    const tirarDadosZerados = filtrarDadosPorData.filter((dados) => dados.media_totais_metros_completos != 0);

    let dadosFiltrados;
    switch(tipoMedia){
        case "0":
            if(tipoTurno == "0")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos}
                })
            if(tipoTurno == "1")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos_primeiro_turno}
                })
            if(tipoTurno == "2")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_metros_completos_segundo_turno}
                })
            break;
        case "1":
            if(tipoTurno == "0")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos}
                })
            if(tipoTurno == "1")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos_primeiro_turno}
                })
            if(tipoTurno == "2")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_producao_completos_segundo_turno}
                })
            break;
        case "2":
            if(tipoTurno == "0")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos}
                })
            if(tipoTurno == "1")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos_primeiro_turno}
                })
            if(tipoTurno == "2")
                dadosFiltrados = tirarDadosZerados.map((dados) => {
                    return {tipo_tecido: dados.tipo_tecido, media: dados.media_totais_tempo_setup_completos_segundo_turno}
                })
    }
    return dadosFiltrados;
}

export default extrairDadosGraficoPizzaMedia;