const extrairDadosGraficoSobraRolo = (dados, tipoTecido, tipoData, tipoTurno) => {
    const dadosFiltradosPorData = dados.filter((dados) => dados.data_historico == tipoData);
    const dadosFilterTecido = dadosFiltradosPorData.filter((dados) => dados.tipo_tecido == tipoTecido);

    let dadosSobraDeRolo;
    switch(tipoTurno){
        case "0":
            dadosSobraDeRolo = dadosFilterTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    sobra_de_rolo: dados.qtd_sobra_de_rolo_completadas,
                    nao_sobra_de_rolo: dados.qtd_nao_sobra_de_rolo_completadas
                }
            })
            break;
        case "1":
            dadosSobraDeRolo = dadosFilterTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    sobra_de_rolo: dados.qtd_sobra_de_rolo_primeiro_turno_completas,
                    nao_sobra_de_rolo: dados.qtd_nao_sobra_de_rolo_primeiro_turno_completas
                }
            })
            break;
        case "2":
            dadosSobraDeRolo = dadosFilterTecido.map((dados) => {
                return {
                    tipo_tecido: dados.tipo_tecido,
                    sobra_de_rolo: dados.qtd_sobra_de_rolo_segundo_turno_completas,
                    nao_sobra_de_rolo: dados.qtd_nao_sobra_de_rolo_segundo_turno_completas
                }
            })
            break;
    }

    return dadosSobraDeRolo;
}

export default extrairDadosGraficoSobraRolo;