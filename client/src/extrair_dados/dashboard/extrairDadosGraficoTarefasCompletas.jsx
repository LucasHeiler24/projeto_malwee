const extrairDadosGraficoTarefasCompletas = ({dados, tipoData, tipoTecido}) => {
    return dados.filter((dados) => {
        if(dados.data_historico == tipoData && dados.tipo_tecido == tipoTecido)
            return dados;
    });
}

export default extrairDadosGraficoTarefasCompletas;