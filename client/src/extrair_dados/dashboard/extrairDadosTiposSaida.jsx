import { separarDadosPorVetores } from "../../helpers/funcoes";

const extrairDadosTiposSaida = ({dados, tipoData, tipoTecido, tipoTurno}) => {
    const dadosFiltradosPorTecido = separarDadosPorVetores(dados[parseInt(tipoTecido)]);
    const dadosFiltradosPorDatas = dadosFiltradosPorTecido[parseInt(tipoData)];
    
    let dadosFiltrados;
    switch(tipoTurno){
        case '0':
            dadosFiltrados = dadosFiltradosPorDatas.map((dados) => {
                return {
                    data_historico: dados.data_historico,
                    tipo_tecido: dados.tipo_tecido,
                    qtd_rolinho: dados.qtd_tipo_saida_rolinho_completo,
                    qtd_fraldado: dados.qtd_tipo_saida_fraudado_completo
                }
            })
            break;
        case '1':
            dadosFiltrados = dadosFiltradosPorDatas.map((dados) => {
                return {
                    data_historico: dados.data_historico,
                    tipo_tecido: dados.tipo_tecido,
                    qtd_rolinho: dados.qtd_tipo_saida_rolinho_completo_primeiro_turno,
                    qtd_fraldado: dados.qtd_tipo_saida_fraudado_completo_primeiro_turno
                }
            })
            break;
        case '2':
            dadosFiltrados = dadosFiltradosPorDatas.map((dados) => {
                return {
                    data_historico: dados.data_historico,
                    tipo_tecido: dados.tipo_tecido,
                    qtd_rolinho: dados.qtd_tipo_saida_rolinho_completo_segundo_turno,
                    qtd_fraldado: dados.qtd_tipo_saida_fraudado_completo_segundo_turno
                }
            })
            break;
    }

    return dadosFiltrados;
}

export default extrairDadosTiposSaida;